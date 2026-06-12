import type { PortableTextBlock } from '@portabletext/types'
import { client } from '../../sanity/client'
import {
  articleBySlugQuery,
  articleCategorieBySlugQuery,
  articleCategoriesQuery,
  articleSlugsQuery,
  articlesListingCountQuery,
  articlesListingOldestQuery,
  articlesListingRecentQuery,
  fallbackRelatedQuery,
  featuredArticleQuery,
  latestArticleQuery,
  promosBlogQuery,
  relatedArticlesQuery,
} from '../../sanity/queries'

export type SanityImageRef = {
  asset: {
    _id: string
    url: string
    metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } }
  } | null
  /** Position du focal point (hotspot) défini dans Sanity Studio. Coordonnées
   *  relatives (0..1) sur l'image originale. */
  hotspot?: { x: number; y: number; height: number; width: number } | null
  /** Rectangle de crop (0..1) éventuellement défini par-dessus le hotspot. */
  crop?: { top: number; bottom: number; left: number; right: number } | null
} | null

export type CategorieRef = {
  slug: string
  libelle: string
  description?: string
}

export type AuteurRef = {
  nom: string
  role: string | null
  bio?: string | null
  avatar: {
    asset: { _id: string; url: string } | null
  } | null
}

/** Projection minimale pour la grille (vignette d'article). */
export type ArticleCard = {
  slug: string
  titre: string
  intro: string | null
  publishedAt: string
  readingTime: number
  featured: boolean
  coverImage: SanityImageRef & { alt?: string }
  categorie: CategorieRef
  auteur: AuteurRef
}

/** Bloc Portable Text (incluant les custom blocks article). */
export type ArticleBodyBlock = PortableTextBlock & { _type: string }

export type TocItemOverride = {
  anchor: string
  label: string | null
  exclure: boolean | null
}

export type SidebarCta = {
  titre: string | null
  description: string | null
  lienLibelle: string | null
  lienHref: string | null
  variant: 'green' | 'yellow' | null
}

/** Élément de la FAQ finale — alimente schema FAQPage + matière 1re pour les IA. */
export type FaqItem = {
  question: string
  reponse: string
}

/** Article complet — utilisé sur la page /blog/[slug]. */
export type Article = ArticleCard & {
  sousTitre: string | null
  updatedAt: string | null
  body: ArticleBodyBlock[] | null
  tldr: string[] | null
  faq: FaqItem[] | null
  tocItems: TocItemOverride[] | null
  sidebarCta: SidebarCta | null
  seo: {
    titre: string | null
    description: string | null
    ogImage: SanityImageRef | null
  } | null
}

export type ArticleCategorie = {
  slug: string
  libelle: string
  description: string
  /** Nombre d'articles publiés dans cette catégorie. Sert à masquer les
   *  catégories vides côté toolbar. */
  articleCount?: number | null
}

export type PromoBlog = {
  position: number
  label: string
  titre: string
  description: string
  lienLibelle: string
  lienHref: string
  variant: 'yellow' | 'green'
}

export type ArticleSort = 'recent' | 'oldest'

export type ArticleListingParams = {
  category?: string | null
  search?: string | null
  sort?: ArticleSort
  start?: number
  end?: number
  /** Slug à exclure du résultat — utilisé pour ne pas doublonner l'article featured. */
  excludeSlug?: string | null
}

/* ============================================================================
 * FETCH HELPERS
 * ============================================================================ */

const DEFAULT_REVALIDATE = 60

function buildSearchPattern(search: string | null | undefined): string | null {
  if (!search || !search.trim()) return null
  // GROQ `match` accepte wildcard *. On wrap chaque token.
  const tokens = search.trim().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return null
  return tokens.map((t) => `*${t}*`).join(' ')
}

export async function getArticlesListing(params: ArticleListingParams = {}): Promise<{
  articles: ArticleCard[]
  total: number
}> {
  const {
    category = null,
    search = null,
    sort = 'recent',
    start = 0,
    end = 12,
    excludeSlug = null,
  } = params

  const searchPattern = buildSearchPattern(search)
  const queryParams = {
    category,
    search: search ?? null,
    searchPattern,
    start,
    end,
    excludeSlug,
  }

  const listingQuery =
    sort === 'oldest' ? articlesListingOldestQuery : articlesListingRecentQuery

  const [articles, total] = await Promise.all([
    client.fetch<ArticleCard[]>(listingQuery, queryParams, {
      next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] },
    }),
    client.fetch<number>(articlesListingCountQuery, queryParams, {
      next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] },
    }),
  ])

  return { articles: articles ?? [], total: total ?? 0 }
}

export async function getFeaturedArticle(): Promise<ArticleCard | null> {
  const featured = await client.fetch<ArticleCard | null>(
    featuredArticleQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] } },
  )
  if (featured) return featured
  // Fallback : pas d'article featured, on prend le plus récent.
  return client.fetch<ArticleCard | null>(
    latestArticleQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] } },
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch<Article | null>(
    articleBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article', `article:${slug}`] } },
  )
}

/**
 * Articles suggérés : 3 articles de la même catégorie (hors article courant),
 * complétés par les plus récents toutes catégories si moins de 3 trouvés.
 */
export async function getRelatedArticles(
  slug: string,
  category: string,
): Promise<ArticleCard[]> {
  const sameCategory = await client.fetch<ArticleCard[]>(
    relatedArticlesQuery,
    { slug, category },
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] } },
  )
  if (sameCategory.length >= 3) return sameCategory.slice(0, 3)

  const need = 3 - sameCategory.length
  const excludeSlugs = [slug, ...sameCategory.map((a) => a.slug)]
  const fallback = await client.fetch<ArticleCard[]>(
    fallbackRelatedQuery,
    { slug, excludeSlugs, limit: need },
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] } },
  )
  return [...sameCategory, ...fallback].slice(0, 3)
}

export async function getArticleSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    articleSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['article'] } },
  )
  return rows.map((r) => r.slug)
}

export async function getArticleCategories(): Promise<ArticleCategorie[]> {
  const rows = await client.fetch<ArticleCategorie[]>(
    articleCategoriesQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['articleCategorie'] } },
  )
  return rows ?? []
}

export async function getArticleCategorieBySlug(
  slug: string,
): Promise<ArticleCategorie | null> {
  return client.fetch<ArticleCategorie | null>(
    articleCategorieBySlugQuery,
    { slug },
    {
      next: {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['articleCategorie', `articleCategorie:${slug}`],
      },
    },
  )
}

export async function getPromosBlog(): Promise<PromoBlog[]> {
  const rows = await client.fetch<PromoBlog[]>(
    promosBlogQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE, tags: ['promoBlog'] } },
  )
  return rows ?? []
}
