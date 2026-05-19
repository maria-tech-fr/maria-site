import type { Metadata } from 'next'
import BlogFeaturedArticle from '../../../src/components/BlogFeaturedArticle'
import BlogHero from '../../../src/components/BlogHero'
import BlogListingSection from '../../../src/components/BlogListingSection'
import BlogToolbar from '../../../src/components/BlogToolbar'
import { DEFAULT_OG_IMAGE } from '../../../src/lib/seo'
import {
  getArticleCategories,
  getArticlesListing,
  getFeaturedArticle,
  getPromosBlog,
  type ArticleSort,
} from '../../../src/lib/article'
import type { PromoForGrid } from '../../../src/lib/blog'

const PAGE_SIZE = 13

export const metadata: Metadata = {
  title: 'Journal — Nos points de vue sur l’IA en entreprise',
  description:
    "Stratégie, méthode, gouvernance, retours d'expérience. Ce que nous pensons, ce que nous apprenons, ce que nous partageons.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Journal | maria',
    description:
      "Stratégie, méthode, gouvernance, retours d'expérience. Ce que nous pensons, ce que nous apprenons, ce que nous partageons.",
    type: 'website',
    url: '/blog',
    images: [DEFAULT_OG_IMAGE],
  },
}

type SearchParams = { [key: string]: string | string[] | undefined }

type PageProps = {
  searchParams: Promise<SearchParams>
}

function parseSort(raw: string | string[] | undefined): ArticleSort {
  return raw === 'oldest' ? 'oldest' : 'recent'
}

function parseSearch(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return raw[0] ?? ''
  return raw ?? ''
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const sort = parseSort(params.sort)
  const search = parseSearch(params.q).trim()
  const hasFilters = !!search

  // Featured uniquement sur la home /blog sans filtres actifs.
  const featured = hasFilters ? null : await getFeaturedArticle()
  const excludeSlug = featured?.slug ?? null

  const [{ articles, total }, categories, promosRaw] = await Promise.all([
    getArticlesListing({
      category: null,
      search,
      sort,
      start: 0,
      end: PAGE_SIZE,
      excludeSlug,
    }),
    getArticleCategories(),
    getPromosBlog(),
  ])

  const promos: PromoForGrid[] = promosRaw.map((p) => ({
    position: p.position,
    label: p.label,
    titre: p.titre,
    description: p.description,
    lienLibelle: p.lienLibelle,
    lienHref: p.lienHref,
    variant: p.variant,
  }))

  return (
    <>
      <BlogHero
        titre={'Nos points de vue sur\nl’IA **en entreprise**'}
        description="Stratégie, méthode, gouvernance, retours d'expérience. Ce que nous pensons, ce que nous apprenons, ce que nous partageons."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Journal' },
        ]}
      />

      {featured && <BlogFeaturedArticle article={featured} />}

      <BlogToolbar
        categories={categories}
        activeCategorySlug={null}
        sort={sort}
        search={search}
      />

      <BlogListingSection
        initialArticles={articles}
        total={total}
        promos={promos}
        filters={{ category: null, search, sort }}
        excludeSlug={excludeSlug}
        pageSize={PAGE_SIZE}
      />
    </>
  )
}
