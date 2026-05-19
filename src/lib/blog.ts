/**
 * Helpers de présentation côté blog.
 */
import { urlFor } from '../../sanity/lib/image'
import type { ArticleCard, AuteurRef, SanityImageRef } from './article'

/** Format une date ISO → « 14 mai 2026 ». */
export function formatDateFr(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Format un temps de lecture → « 8 min ». */
export function formatReadingTime(minutes: number | null | undefined): string {
  const m = Math.max(1, Math.round(minutes ?? 0))
  return `${m} min`
}

/** Initiales d'un nom — fallback quand pas d'avatar. */
export function initiales(nom: string | null | undefined): string {
  if (!nom) return ''
  const parts = nom
    .replace(/[’']/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** URL Sanity optimisée pour une image ou null si pas d'asset.
 *
 *  IMPORTANT : on passe l'OBJET image entier (avec hotspot + crop)
 *  à urlFor — pas juste l'asset. Sans cela, le focal point défini
 *  dans le Studio est ignoré et toutes les images sont croppées au
 *  centre par défaut. La query GROQ doit aussi projeter `hotspot` et
 *  `crop` à côté de `asset` (cf. sanity/queries.ts).
 */
export function imageSrc(
  image: (SanityImageRef & { alt?: string }) | null | undefined,
  width: number,
  height?: number,
): string | null {
  if (!image?.asset) return null
  const builder = urlFor(image).width(width).auto('format').fit('crop')
  if (height) builder.height(height)
  return builder.url()
}

/** Texte alt de l'image — fallback sur le titre de l'article. */
export function imageAlt(
  image: (SanityImageRef & { alt?: string }) | null | undefined,
  fallback: string,
): string {
  const explicit = image && 'alt' in image ? image.alt : undefined
  return explicit || fallback
}

/** Avatar URL si présent. */
export function avatarSrc(auteur: AuteurRef | null | undefined, size = 64): string | null {
  const asset = auteur?.avatar?.asset
  if (!asset) return null
  return urlFor(asset).width(size).height(size).fit('crop').auto('format').url()
}

/** Sépare les articles de la grille en insérant les promos aux bonnes positions.
 *  Renvoie un tableau hétérogène d'articles + promos.
 */
export type GridItem =
  | { kind: 'article'; data: ArticleCard }
  | { kind: 'promo'; data: PromoForGrid }

export type PromoForGrid = {
  position: number
  label: string
  titre: string
  description: string
  lienLibelle: string
  lienHref: string
  variant: 'yellow' | 'green'
}

export function interleavePromos(
  articles: ArticleCard[],
  promos: PromoForGrid[],
): GridItem[] {
  // Position 1-based. Une promo à la position N occupe la N-ième case de la
  // grille. On insère dans l'ordre croissant des positions, en ne plaçant
  // que celles dont la position ne dépasse pas la taille de la grille
  // résultante.
  const sorted = [...promos].sort((a, b) => a.position - b.position)
  const result: GridItem[] = articles.map((a) => ({ kind: 'article' as const, data: a }))
  for (const promo of sorted) {
    const idx = promo.position - 1
    if (idx <= result.length) {
      result.splice(idx, 0, { kind: 'promo', data: promo })
    }
  }
  return result
}
