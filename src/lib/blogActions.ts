'use server'

import { getArticlesListing, type ArticleCard, type ArticleSort } from './article'

export type LoadMoreParams = {
  category: string | null
  search: string
  sort: ArticleSort
  start: number
  end: number
  excludeSlug: string | null
}

/**
 * Server action appelée par le bouton « Charger plus ». Renvoie le prochain
 * lot d'articles selon les paramètres courants.
 */
export async function loadMoreArticles(params: LoadMoreParams): Promise<ArticleCard[]> {
  const { articles } = await getArticlesListing({
    category: params.category,
    search: params.search,
    sort: params.sort,
    start: params.start,
    end: params.end,
    excludeSlug: params.excludeSlug,
  })
  return articles
}
