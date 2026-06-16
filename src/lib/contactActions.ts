'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import ConfirmationVisiteurEmail from '../../emails/ConfirmationVisiteur'
import NotificationEquipeEmail from '../../emails/NotificationEquipe'
import { writeClient } from '../../sanity/writeClient'
import { contactFormSchema, type ContactSubmitState } from './contactSchema'
import { checkContactRateLimit } from './rateLimit'

/* ============================================================================
 * Envoi Resend (visiteur + équipe)
 *
 * Sans RESEND_API_KEY ou CONTACT_EMAIL_TO en env, on skippe silencieusement —
 * Sanity reste la source de vérité de toute façon. Une erreur d'envoi ne fait
 * jamais échouer la soumission côté visiteur.
 *
 * Headers d'expédition figés ici (cohérence marque) :
 *   - Visiteur : From "maria <contact@maria.tech>" / Reply-To contact@maria.tech
 *   - Équipe   : From "maria — formulaire <contact@maria.tech>" / Reply-To = visiteur
 * ============================================================================ */

const FROM_VISITEUR = 'maria <contact@maria.tech>'
const FROM_EQUIPE = 'maria — formulaire <contact@maria.tech>'
const REPLY_TO_VISITEUR = 'contact@maria.tech'

async function sendWithRetry<T>(fn: () => Promise<T>, retries = 1): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (retries <= 0) throw err
    console.warn('[contactActions] email send: retry after error:', err)
    await new Promise((r) => setTimeout(r, 1000))
    return sendWithRetry(fn, retries - 1)
  }
}

async function sendEmailsIfConfigured(payload: {
  nom: string
  prenom: string
  email: string
  telephone: string
  message: string
  submittedAt: string
  referer?: string
  userAgent?: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO
  if (!apiKey || !to) return

  try {
    const resend = new Resend(apiKey)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

    const htmlVisiteur = await render(
      ConfirmationVisiteurEmail({
        prenom: payload.prenom,
        message: payload.message,
        siteUrl,
      }),
    )
    const htmlEquipe = await render(
      NotificationEquipeEmail({
        prenom: payload.prenom,
        nom: payload.nom,
        email: payload.email,
        telephone: payload.telephone || undefined,
        message: payload.message,
        submittedAt: payload.submittedAt,
        referer: payload.referer,
        userAgent: payload.userAgent,
      }),
    )

    // Notification équipe (priorité : on veut être prévenu même si la conf
    // visiteur échoue derrière).
    await sendWithRetry(() =>
      resend.emails.send({
        from: FROM_EQUIPE,
        to,
        replyTo: payload.email,
        subject: `Nouveau message du formulaire — ${payload.prenom} ${payload.nom}`,
        html: htmlEquipe,
      }),
    )

    // Confirmation visiteur.
    await sendWithRetry(() =>
      resend.emails.send({
        from: FROM_VISITEUR,
        to: payload.email,
        replyTo: REPLY_TO_VISITEUR,
        subject: 'Votre message est bien arrivé chez maria',
        html: htmlVisiteur,
      }),
    )
  } catch (err) {
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

  // Valeurs à renvoyer dans l'état d'erreur pour ré-hydrater le formulaire.
  // On exclut le honeypot (`website`) qui doit rester vide côté UI.
  const values = {
    nom: raw.nom,
    prenom: raw.prenom,
    telephone: raw.telephone,
    email: raw.email,
    message: raw.message,
    rgpdConsent: raw.rgpdConsent === 'on' || raw.rgpdConsent === 'true',
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
      values,
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

  const rateLimit = await checkContactRateLimit(ipHash)
  if (rateLimit.limited) {
    return {
      status: 'error',
      message: 'Trop de tentatives. Réessayez dans quelques minutes.',
      values,
    }
  }

  const submittedAt = new Date().toISOString()
  const userAgent = hdrs.get('user-agent') ?? undefined
  const referer = hdrs.get('referer') ?? undefined

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
      submittedAt,
      meta: {
        ip: ipHash,
        userAgent,
        referer,
      },
    })
  } catch (err) {
    console.error('[contactActions] Sanity create failed:', err)
    return {
      status: 'error',
      message: 'Une erreur technique est survenue. Réessayez ou contactez-nous directement par email.',
      values,
    }
  }

  // Email optionnel — n'échoue jamais la soumission visiteur.
  await sendEmailsIfConfigured({
    nom: parsed.data.nom,
    prenom: parsed.data.prenom,
    email: parsed.data.email,
    telephone: parsed.data.telephone || '',
    message: parsed.data.message,
    submittedAt,
    referer,
    userAgent,
  })

  redirect('/contact/merci')
}
