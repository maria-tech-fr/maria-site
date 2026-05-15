'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'
import { z } from 'zod'
import { writeClient } from '../../sanity/writeClient'

/* ============================================================================
 * Schema
 * ============================================================================ */

export const contactFormSchema = z.object({
  nom: z.string().min(2, 'Votre nom est requis.').max(100),
  prenom: z.string().min(2, 'Votre prénom est requis.').max(100),
  telephone: z.string().max(40).optional().or(z.literal('')),
  email: z.string().email('Email invalide.').max(254),
  message: z.string().min(10, 'Votre message est trop court (min. 10 caractères).').max(2000),
  rgpdConsent: z
    .union([z.boolean(), z.literal('on'), z.literal('true')])
    .refine((v) => v === true || v === 'on' || v === 'true', {
      message: 'Le consentement est requis.',
    }),
  // Honeypot — doit être vide. Les bots remplissent.
  website: z.string().max(0).optional(),
})

export type ContactFormFields = z.infer<typeof contactFormSchema>

export type ContactSubmitState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<keyof ContactFormFields | 'website', string>>
    }

/* ============================================================================
 * Rate limit en mémoire (Map). Reset au redémarrage du serveur.
 * Pour un trafic faible c'est suffisant. Upgrader vers Upstash si besoin.
 * ============================================================================ */

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 min

const submissions = new Map<string, number[]>()

function isRateLimited(ipHash: string): boolean {
  const now = Date.now()
  const history = (submissions.get(ipHash) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (history.length >= RATE_LIMIT_MAX) return true
  history.push(now)
  submissions.set(ipHash, history)
  return false
}

/* ============================================================================
 * Resend optionnel
 * ============================================================================ */

async function sendEmailsIfConfigured(payload: {
  nom: string
  prenom: string
  email: string
  telephone: string
  message: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const to = process.env.CONTACT_EMAIL_TO
  const from = process.env.CONTACT_EMAIL_FROM
  if (!to || !from) return

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    // Email interne (équipe maria)
    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `📩 Nouveau contact : ${payload.prenom} ${payload.nom}`,
      text: [
        `Nouveau message reçu via le formulaire de contact.`,
        '',
        `Nom       : ${payload.prenom} ${payload.nom}`,
        `Email     : ${payload.email}`,
        `Téléphone : ${payload.telephone || '—'}`,
        '',
        'Message :',
        payload.message,
      ].join('\n'),
    })

    // Email confirmation (visiteur)
    await resend.emails.send({
      from,
      to: payload.email,
      subject: 'On a bien reçu votre message — maria',
      text: [
        `Bonjour ${payload.prenom},`,
        '',
        `Merci pour votre message — on revient vers vous sous 24 h ouvrées.`,
        '',
        `Récap de votre demande :`,
        payload.message,
        '',
        `À très vite,`,
        `L'équipe maria`,
      ].join('\n'),
    })
  } catch (err) {
    // On ne fait pas échouer la soumission si l'email échoue : Sanity reste la
    // source de vérité. On logue pour le monitoring.
    console.error('[contactActions] Resend send failed:', err)
  }
}

/* ============================================================================
 * Server action
 * ============================================================================ */

export async function submitContact(_prev: ContactSubmitState, formData: FormData): Promise<ContactSubmitState> {
  const raw = {
    nom: String(formData.get('nom') ?? '').trim(),
    prenom: String(formData.get('prenom') ?? '').trim(),
    telephone: String(formData.get('telephone') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    rgpdConsent: formData.get('rgpdConsent'),
    website: String(formData.get('website') ?? ''),
  }

  const parsed = contactFormSchema.safeParse(raw)
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>
    const fieldErrors: Record<string, string> = {}
    for (const [key, msgs] of Object.entries(flat)) {
      if (msgs && msgs[0]) fieldErrors[key] = msgs[0]
    }
    return {
      status: 'error',
      message: 'Certains champs sont incorrects.',
      fieldErrors: fieldErrors as ContactSubmitState extends { fieldErrors?: infer F }
        ? NonNullable<F>
        : never,
    }
  }

  // Honeypot — réponse silencieuse (HTTP 200) pour ne pas alerter le bot.
  if (parsed.data.website && parsed.data.website.length > 0) {
    // On simule un succès sans rien faire.
    redirect('/contact/merci')
  }

  // Rate limit par IP (hashée pour ne pas stocker en clair).
  const hdrs = await headers()
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'unknown'
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16)

  if (isRateLimited(ipHash)) {
    return {
      status: 'error',
      message: 'Trop de tentatives. Réessayez dans quelques minutes.',
    }
  }

  // Écriture Sanity (source de vérité).
  try {
    await writeClient.create({
      _type: 'messageContact',
      statut: 'a-lire',
      nom: parsed.data.nom,
      prenom: parsed.data.prenom,
      email: parsed.data.email,
      telephone: parsed.data.telephone || undefined,
      message: parsed.data.message,
      submittedAt: new Date().toISOString(),
      meta: {
        ip: ipHash,
        userAgent: hdrs.get('user-agent') ?? undefined,
        referer: hdrs.get('referer') ?? undefined,
      },
    })
  } catch (err) {
    console.error('[contactActions] Sanity create failed:', err)
    return {
      status: 'error',
      message: 'Une erreur technique est survenue. Réessayez ou contactez-nous directement par email.',
    }
  }

  // Email optionnel.
  await sendEmailsIfConfigured({
    nom: parsed.data.nom,
    prenom: parsed.data.prenom,
    email: parsed.data.email,
    telephone: parsed.data.telephone || '',
    message: parsed.data.message,
  })

  redirect('/contact/merci')
}
