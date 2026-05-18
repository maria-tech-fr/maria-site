import type { Article, ArticleBodyBlock, FaqItem } from '../../lib/article'
import { avatarSrc, imageSrc } from '../../lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

/**
 * Construit le schema FAQPage à partir de deux sources combinées :
 *  1. Chaque H2 du corps qui finit par « ? » → Question = texte du H2,
 *     Réponse = texte du 1er paragraphe qui suit (réponse autoportante).
 *  2. Chaque entrée de la FAQ finale (article.faq).
 *
 * Maximise la citabilité par ChatGPT / Perplexity / AI Overviews.
 */
function extractFaqFromBody(body: ArticleBodyBlock[] | null): FaqItem[] {
  if (!body || body.length === 0) return []
  const items: FaqItem[] = []
  for (let i = 0; i < body.length; i++) {
    const block = body[i] as { _type?: string; style?: string; children?: Array<{ text?: string }> }
    if (block?._type !== 'block' || block?.style !== 'h2') continue
    const question = (block.children ?? []).map((c) => c.text ?? '').join('').trim()
    if (!question.endsWith('?')) continue
    const next = body[i + 1] as
      | { _type?: string; style?: string; children?: Array<{ text?: string }> }
      | undefined
    if (
      next?._type !== 'block' ||
      (next.style && next.style !== 'normal')
    )
      continue
    const reponse = (next.children ?? []).map((c) => c.text ?? '').join('').trim()
    if (!reponse) continue
    items.push({ question, reponse })
  }
  return items
}

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

  // FAQPage : H2-questions (auto-extraites du corps) + entrées de la FAQ
  // finale. Déduplique sur la question normalisée (insensible à la casse +
  // espaces) — si l'auteur reprend une question dans les deux endroits, on
  // garde la version « FAQ finale » (plus complète, écrite spécifiquement).
  const faqFromBody = extractFaqFromBody(article.body)
  const faqFinal = article.faq ?? []
  const seenQuestions = new Set<string>()
  const allFaq: FaqItem[] = []
  for (const item of [...faqFinal, ...faqFromBody]) {
    const key = item.question.trim().toLowerCase().replace(/\s+/g, ' ')
    if (seenQuestions.has(key)) continue
    seenQuestions.add(key)
    allFaq.push(item)
  }

  const faqSchema =
    allFaq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: allFaq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.reponse },
          })),
        }
      : null

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
