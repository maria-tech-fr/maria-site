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

/* ============================================================================
 * Course (pour /formation)
 *
 * Signale à Google, Bing et aux IA génératives que maria propose un service
 * éducatif. Sans `hasCourseInstance` détaillé pour l'instant : le catalogue
 * précis (durée, format, session) est piloté au cas par cas — on émet un
 * Course « générique » qui documente le programme sans surpromettre.
 * ========================================================================== */

export type CourseSchemaInput = {
  name: string
  description?: string | null
  url: string
  /** Ex. "employee", "manager", "executive". Défaut : "employee". */
  educationalRole?: string
}

export function buildCourseSchema(input: CourseSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    url: absUrl(input.url),
    provider: { '@id': ORG_ID },
    inLanguage: 'fr-FR',
    educationalLevel: 'Professional',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: input.educationalRole ?? 'employee',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      inLanguage: 'fr-FR',
    },
    ...(input.description ? { description: input.description } : {}),
  }
}

/* ============================================================================
 * Blog (pour /blog listing)
 *
 * Décrit la page « Journal » comme un Blog schema.org, et liste les articles
 * récents en BlogPosting inline avec le minimum de propriétés (headline, url,
 * datePublished, author). Signal fort pour la SERP « articles récents ».
 * ========================================================================== */

export type BlogPostEntry = {
  slug: string
  titre: string
  publishedAt: string
  auteurNom?: string | null
}

export type BlogSchemaInput = {
  name: string
  description?: string | null
  url: string
  posts: BlogPostEntry[]
}

export function buildBlogSchema(input: BlogSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: input.name,
    url: absUrl(input.url),
    publisher: { '@id': ORG_ID },
    inLanguage: 'fr-FR',
    ...(input.description ? { description: input.description } : {}),
    blogPost: input.posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.titre,
      url: absUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      ...(p.auteurNom
        ? { author: { '@type': 'Person', name: p.auteurNom } }
        : {}),
    })),
  }
}

/* ============================================================================
 * CollectionPage (pour /blog/categorie/[slug])
 *
 * Décrit une page de catégorie comme une collection d'articles. mainEntity
 * = ItemList des articles de la catégorie, dans l'ordre affiché.
 * ========================================================================== */

export type CollectionPageSchemaInput = {
  name: string
  description?: string | null
  url: string
  items: ItemListEntry[]
}

export function buildCollectionPageSchema(input: CollectionPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    url: absUrl(input.url),
    inLanguage: 'fr-FR',
    isPartOf: { '@id': ORG_ID },
    ...(input.description ? { description: input.description } : {}),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absUrl(item.url),
        name: item.name,
      })),
    },
  }
}
