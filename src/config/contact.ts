/**
 * Configuration du widget de contact WhatsApp.
 *
 * Modifier ici (et seulement ici) le numéro, le message pré-rempli ou la
 * plage horaire — pas besoin de toucher au composant.
 */

export const whatsappConfig = {
  /** Numéro au format `wa.me` : sans `+`, sans espaces. */
  number: '33637415798',

  /** Message pré-rempli dans l'éditeur WhatsApp (sera URL-encodé). */
  prefilledMessage: "Bonjour, j'aimerais vous parler de mon projet :",

  /**
   * Plage « heures ouvrées » utilisée pour switcher le wording de la carte
   * (« on est là » vs « hors ligne »). Calcul effectué au fuseau Europe/Paris
   * — pas au fuseau du visiteur, sinon quelqu'un à l'étranger verrait
   * « ouvert » alors que l'équipe dort.
   *
   *  - `days` : 1 = lundi … 5 = vendredi. Pas de jours fériés en V1.
   *  - `startHour` et `endHour` sont des heures pleines (24h). L'intervalle
   *    est `[startHour, endHour[` (9h inclus, 19h exclu).
   */
  officeHours: {
    days: [1, 2, 3, 4, 5] as const,
    startHour: 9,
    endHour: 19,
    timezone: 'Europe/Paris',
  },

  /** Délai (ms) avant l'ouverture automatique de la carte, à l'arrivée sur le site. */
  autoOpenDelayMs: 20_000,

  /** Routes sur lesquelles on ne monte PAS le widget (priorité à un autre UX). */
  excludedRoutes: ['/contact/merci'],
} as const

/**
 * URL Cal.com de prise de rendez-vous.
 *
 * Source en cascade :
 *  1. `NEXT_PUBLIC_CALCOM_URL` (env var, priorité maximale, configurable
 *     dans Vercel sans redéploiement de Sanity).
 *  2. Valeur Sanity `parametresGlobaux.contact.calendlyUrl` — passée en
 *     argument côté serveur. Permet à l'équipe non-tech de modifier
 *     l'URL depuis le Studio sans toucher au code.
 *  3. null → les composants qui consomment doivent fallback proprement
 *     (lien vers /contact, désactivation, etc.).
 */
export function getCalcomUrl(sanityFallback?: string | null): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_CALCOM_URL
  if (fromEnv && fromEnv.trim()) return fromEnv.trim()
  if (sanityFallback && sanityFallback.trim()) return sanityFallback.trim()
  return null
}

export function getWaLink(message?: string): string {
  const msg = message ?? whatsappConfig.prefilledMessage
  return `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(msg)}`
}

/**
 * Détermine si l'instant courant tombe dans les heures ouvrées Europe/Paris.
 *
 * Utilise Intl.DateTimeFormat avec `timeZone: 'Europe/Paris'` pour extraire
 * le jour et l'heure au bon fuseau, indépendamment de l'OS du visiteur.
 */
export function isOfficeHours(now: Date = new Date()): boolean {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: whatsappConfig.officeHours.timezone,
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '0'
  const hour = parseInt(hourStr, 10)
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  const day = dayMap[weekday] ?? -1
  const { days, startHour, endHour } = whatsappConfig.officeHours
  if (!(days as readonly number[]).includes(day)) return false
  if (hour < startHour || hour >= endHour) return false
  return true
}
