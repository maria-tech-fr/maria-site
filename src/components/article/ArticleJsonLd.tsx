import type { Article } from '../../lib/article'
import { avatarSrc, imageSrc } from '../../lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export default function ArticleJsonLd({ article }: { article: Article }) {
  const url = `${SITE_URL}/blog/${article.slug}`
  const image = imageSrc(article.coverImage, 1600, 900)
  const authorAvatar = avatarSrc(article.auteur, 200)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.seo?.description || article.intro || article.sousTitre || article.titre,
    image: image ? [image] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.auteur.nom,
      ...(article.auteur.role ? { jobTitle: article.auteur.role } : {}),
      ...(authorAvatar ? { image: authorAvatar } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'maria',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: article.categorie.libelle,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categorie.libelle,
        item: `${SITE_URL}/blog/categorie/${article.categorie.slug}`,
      },
      { '@type': 'ListItem', position: 4, name: article.titre, item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
