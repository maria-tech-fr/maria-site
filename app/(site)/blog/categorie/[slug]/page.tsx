import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogHero from '../../../../../src/components/BlogHero'
import BlogListingSection from '../../../../../src/components/BlogListingSection'
import BlogToolbar from '../../../../../src/components/BlogToolbar'
import {
  getArticleCategorieBySlug,
  getArticleCategories,
  getArticlesListing,
  getPromosBlog,
  type ArticleSort,
} from '../../../../../src/lib/article'
import type { PromoForGrid } from '../../../../../src/lib/blog'
import { DEFAULT_OG_IMAGE } from '../../../../../src/lib/seo'

const PAGE_SIZE = 13

type Params = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const categorie = await getArticleCategorieBySlug(slug)
  if (!categorie) return { title: 'Catégorie' }
  return {
    title: `${categorie.libelle} — Articles maria`,
    description: categorie.description,
    alternates: { canonical: `/blog/categorie/${slug}` },
    openGraph: {
      title: `${categorie.libelle} | maria`,
      description: categorie.description,
      type: 'website',
      url: `/blog/categorie/${slug}`,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

export async function generateStaticParams() {
  const categories = await getArticleCategories()
  return categories.map((c) => ({ slug: c.slug }))
}

function parseSort(raw: string | string[] | undefined): ArticleSort {
  return raw === 'oldest' ? 'oldest' : 'recent'
}

function parseSearch(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return raw[0] ?? ''
  return raw ?? ''
}

export default async function BlogCategoriePage({ params, searchParams }: Params) {
  const { slug } = await params
  const sp = await searchParams
  const sort = parseSort(sp.sort)
  const search = parseSearch(sp.q).trim()

  const categorie = await getArticleCategorieBySlug(slug)
  if (!categorie) notFound()

  const [{ articles, total }, categories, promosRaw] = await Promise.all([
    getArticlesListing({
      category: slug,
      search,
      sort,
      start: 0,
      end: PAGE_SIZE,
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
        surTitre={`// ${categorie.libelle.toLowerCase()}`}
        titre={`**${categorie.libelle}**\nNos articles`}
        description={categorie.description}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: categorie.libelle },
        ]}
      />

      <BlogToolbar
        categories={categories}
        activeCategorySlug={slug}
        sort={sort}
        search={search}
      />

      <BlogListingSection
        initialArticles={articles}
        total={total}
        promos={promos}
        filters={{ category: slug, search, sort }}
        excludeSlug={null}
        pageSize={PAGE_SIZE}
      />
    </>
  )
}
