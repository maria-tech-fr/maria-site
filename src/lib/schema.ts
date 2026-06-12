/**
 * Helpers Schema.org / JSON-LD réutilisables.
 *
 * Chaque builder retourne un objet JSON-LD prêt à être sérialisé. Le rendu
 * se fait via le composant générique <JsonLd data={…} /> ou via les
 * composants thématiques (BreadcrumbJsonLd, etc.).
 *
 * Convention : on référence l'Organization globale par son @id
 * (`${SITE_URL}#organization`) — pas de duplication par page.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

const ORG_ID = `${SITE_URL}#organization`

/** Construit une URL absolue à partir d'un chemin (`/services/...`). */
export function absUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/* ============================================================================
 * BreadcrumbList
 * ========================================================================== */

export type BreadcrumbItem = {
  name: string
  /** Chemin relatif (commence par `/`) ou URL absolue. */
  url: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.url),
    })),
  }
}

/* ============================================================================
 * Service (pour les 3 pages /services/*)
 * ========================================================================== */

export type ServiceSchemaInput = {
  name: string
  description?: string | null
  url: string
  /** `serviceType` Schema.org (généralement le nom du service). */
  serviceType?: string
}

export function buildServiceSchema(input: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    url: absUrl(input.url),
    provider: { '@id': ORG_ID },
    serviceType: input.serviceType ?? input.name,
    ...(input.description ? { description: input.description } : {}),
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Europe' },
    ],
  }
}

/* ============================================================================
 * ItemList (pour les piliers /services et /besoins)
 * ========================================================================== */

export type ItemListEntry = {
  name: string
  url: string
}

export function buildItemListSchema(items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absUrl(item.url),
      name: item.name,
    })),
  }
}

/* ============================================================================
 * Article (pour les pages éditoriales : besoins, notes, etc.)
 * ========================================================================== */

export type ArticleSchemaInput = {
  headline: string
  description?: string | null
  url: string
  /** Date ISO. Si omise, on n'émet pas le champ. */
  dateModified?: string | null
  /** Section éditoriale (ex. famille du besoin). */
  articleSection?: string | null
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    url: absUrl(input.url),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(input.description ? { description: input.description } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
    inLanguage: 'fr-FR',
  }
}

/* ============================================================================
 * FAQPage
 * ========================================================================== */

export type FaqEntry = {
  question: string
  /** Champ Sanity « reponse » dans la plupart des schémas. */
  reponse?: string | null
  /** Variante « answer » utilisée par certains champs alternatifs. */
  answer?: string | null
}

export function buildFaqSchema(questions: FaqEntry[] | null | undefined) {
  if (!questions || questions.length === 0) return null
  const validated = questions
    .map((q) => ({ question: q.question, answer: q.reponse ?? q.answer ?? '' }))
    .filter((q) => q.question && q.answer)
  if (validated.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validated.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}
