/**
 * Constantes SEO partagées entre pages.
 *
 * Centralise l'image OG par défaut afin que les pages qui définissent leur
 * propre bloc `openGraph` page-level puissent l'inclure sans dupliquer la
 * config — Next.js n'hérite PAS automatiquement les champs `images` d'un
 * `openGraph` parent quand l'enfant redéfinit ce bloc.
 *
 * Asset attendu : /public/og/default.jpg (1200×630). Cf. /public/og/README.md
 * pour les specs.
 */

export const DEFAULT_OG_IMAGE = {
  url: '/og/default.jpg',
  width: 1200,
  height: 630,
  alt: 'maria — agence IA pour l’interne',
} as const

/** Champ SEO administrable (renvoyé par les queries Sanity). Tous optionnels. */
export type SeoMeta = {
  titre?: string | null
  description?: string | null
  ogImage?: { asset?: { _id?: string; url?: string } | null } | null
} | null | undefined

/**
 * Résout les métadonnées d'une page : valeurs Sanity (`seo`) prioritaires,
 * fallback sur les valeurs par défaut fournies en code.
 *
 * Retourne un fragment d'objet Metadata Next.js (title, description,
 * openGraph, twitter) prêt à être étalé ou complété. L'image OG suit la
 * cascade : ogImage Sanity → image OG générique du site (via metadataBase).
 */
export function resolveSeo(
  seo: SeoMeta,
  fallback: { title: string; description: string; path: string },
) {
  const title = seo?.titre?.trim() || fallback.title
  const description = seo?.description?.trim() || fallback.description
  const url = fallback.path
  const ogUrl = seo?.ogImage?.asset?.url
  const images = ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website' as const, url, images },
    twitter: { card: 'summary_large_image' as const, title, description, images },
  }
}
