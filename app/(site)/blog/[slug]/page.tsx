import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleContent from '../../../../src/components/article/ArticleContent'
import ArticleFaq from '../../../../src/components/article/ArticleFaq'
import ArticleHero from '../../../../src/components/article/ArticleHero'
import ArticleJsonLd from '../../../../src/components/article/ArticleJsonLd'
import ArticleSidebarCta from '../../../../src/components/article/ArticleSidebarCta'
import ArticleTldr from '../../../../src/components/article/ArticleTldr'
import AuthorBlock from '../../../../src/components/article/AuthorBlock'
import MobileToc from '../../../../src/components/article/MobileToc'
import ReadingProgress from '../../../../src/components/article/ReadingProgress'
import RelatedArticles from '../../../../src/components/article/RelatedArticles'
import TableOfContents from '../../../../src/components/article/TableOfContents'
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from '../../../../src/lib/article'
import { buildToc, computeReadingTime } from '../../../../src/lib/articleHelpers'
import { imageSrc } from '../../../../src/lib/blog'


type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article' }

  const title = article.seo?.titre || `${article.titre} | maria`
  const description = article.seo?.description || article.intro || article.sousTitre || ''
  // Cascade OG article :
  //   1. champ ogImage spécifique au CMS si présent
  //   2. image de couverture (coverImage)
  //   3. image OG générique du site (héritée du layout racine via
  //      `metadataBase`) — on retourne `undefined` pour laisser
  //      Next.js cascader.
  const ogImageSrc =
    imageSrc(article.seo?.ogImage ?? null, 1200, 630) ||
    imageSrc(article.coverImage, 1200, 630) ||
    undefined

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.titre,
      description,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.auteur.nom],
      ...(ogImageSrc ? { images: [ogImageSrc] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titre,
      description,
      ...(ogImageSrc ? { images: [ogImageSrc] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  // Reading time : auto si pas renseigné ou si on veut prioriser la valeur calculée.
  const tocItems = buildToc(article.body, article.tocItems)
  const autoReadingTime = computeReadingTime(article.body)
  const finalArticle = {
    ...article,
    readingTime: article.readingTime ?? autoReadingTime,
  }

  const related = await getRelatedArticles(slug, article.categorie.slug)

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={finalArticle} />

      <article>
        <ArticleHero article={finalArticle} />

        <section className="bg-paper px-6 pb-16 lg:px-30.5 lg:pb-22.5">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
            {/* Sidebar */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              <TableOfContents items={tocItems} />
              {article.sidebarCta && <ArticleSidebarCta cta={article.sidebarCta} />}
            </div>

            {/* Contenu */}
            <div className="flex flex-col gap-8">
              <MobileToc items={tocItems} />
              {article.tldr && article.tldr.length > 0 && (
                <ArticleTldr items={article.tldr} />
              )}
              <ArticleContent body={article.body} />
              {article.faq && article.faq.length > 0 && (
                <ArticleFaq items={article.faq} />
              )}
            </div>
          </div>
        </section>
      </article>

      <AuthorBlock auteur={article.auteur} />
      <RelatedArticles articles={related} />
    </>
  )
}
