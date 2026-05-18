import type { MetadataRoute } from 'next'
import {
  getArticleCategories,
  getArticleSlugs,
} from '../src/lib/article'
import { getBesoinsMenu } from '../src/lib/pageBesoin'
import { getPageCharteIA } from '../src/lib/pageCharteIA'
import { getPageServiceSlugs } from '../src/lib/pageService'
import { client } from '../sanity/client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Charte IA : lastmod piloté par le champ revision.lastUpdated du singleton.
  const charte = await getPageCharteIA()
  const charteLastMod = charte?.revision?.lastUpdated
    ? new Date(charte.revision.lastUpdated)
    : now

  // Pages fixes du site.
  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/agence`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projets`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    // Pages piliers SEO (index services / besoins).
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/besoins`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${SITE_URL}/charte-ia`,
      lastModified: charteLastMod,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  // Pages services / besoins.
  const [serviceSlugs, besoinsRaw] = await Promise.all([
    getPageServiceSlugs(),
    getBesoinsMenu(),
  ])
  const services: MetadataRoute.Sitemap = [
    ...serviceSlugs.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Page Formation (service transversal singleton, slug fixe)
    {
      url: `${SITE_URL}/services/formation`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  // N pages besoin (priorité SEO élevée — portes d'entrée).
  const besoins: MetadataRoute.Sitemap = besoinsRaw.map((b) => ({
    url: `${SITE_URL}/besoins/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Catégories d'articles.
  const categories = await getArticleCategories()
  const categoriesRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/blog/categorie/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Articles individuels — récupère slug + _updatedAt pour lastModified plus précis.
  const articleSlugsRaw = await getArticleSlugs()
  const articleDates = await client.fetch<Array<{ slug: string; updatedAt: string }>>(
    `*[_type == "article" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    {},
    { next: { revalidate: 60, tags: ['article'] } },
  )
  const dateBySlug = new Map(articleDates.map((a) => [a.slug, a.updatedAt]))
  const articles: MetadataRoute.Sitemap = articleSlugsRaw.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: dateBySlug.get(slug) ? new Date(dateBySlug.get(slug)!) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...fixed, ...services, ...besoins, ...categoriesRoutes, ...articles]
}
