import { z } from 'zod'

/**
 * Schema partagé entre la server action et les types côté client.
 * Vit dans un fichier séparé : un fichier `'use server'` ne peut exporter
 * que des fonctions async (Next 16+).
 */
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

export type ContactFormValues = {
  nom?: string
  prenom?: string
  telephone?: string
  email?: string
  message?: string
  rgpdConsent?: boolean
}

export type ContactSubmitState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<keyof ContactFormFields | 'website', string>>
      /** Valeurs saisies pour ré-hydrater le formulaire après erreur. */
      values?: ContactFormValues
    }
