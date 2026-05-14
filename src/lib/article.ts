import { client } from '../../sanity/client'
import {
  articleBySlugQuery,
  articleCategorieBySlugQuery,
  articleCategoriesQuery,
  articleSlugsQuery,
  articlesListingCountQuery,
  articlesListingOldestQuery,
  articlesListingRecentQuery,
  featuredArticleQuery,
  latestArticleQuery,
  promosBlogQuery,
} from '../../sanity/queries'

export type SanityImageRef = {
  asset: {
    _id: string
    url: string
    metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } }
  } | null
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

/**
 * Bloc Portable Text — typing minimal le temps qu'on installe
 * @portabletext/react avec ses types complets pour rendre la page article.
 */
export type PortableBlock = {
  _type: string
  _key?: string
  [key: string]: unknown
}

/** Article complet — utilisé sur la page /blog/[slug]. */
export type Article = ArticleCard & {
  body: PortableBlock[] | null
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
