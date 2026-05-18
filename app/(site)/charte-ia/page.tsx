import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageCharteIA } from '../../../src/lib/pageCharteIA'
import CharteHero from '../../../src/components/charte-ia/CharteHero'
import CharteIntro from '../../../src/components/charte-ia/CharteIntro'
import CharteEngagements from '../../../src/components/charte-ia/CharteEngagements'
import CharteLignesRouges from '../../../src/components/charte-ia/CharteLignesRouges'
import CharteDisclaimer from '../../../src/components/charte-ia/CharteDisclaimer'
import CharteRevision from '../../../src/components/charte-ia/CharteRevision'
import CharteCta from '../../../src/components/charte-ia/CharteCta'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageCharteIA()
  const title = data?.seo?.titre || 'Charte de gouvernance IA | maria'
  const description =
    data?.seo?.description ||
    'Les engagements publics de maria sur l’usage de l’IA : validation humaine, transparence, propriété des données, lignes rouges. Une charte opposable.'
  const canonical = `${SITE_URL}/charte-ia`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      ...(data?.revision?.lastUpdated
        ? { modifiedTime: new Date(data.revision.lastUpdated).toISOString() }
        : {}),
    },
  }
}

export default async function PageCharteIA() {
  const data = await getPageCharteIA()
  if (!data) notFound()

  const lastUpdated = data.revision?.lastUpdated || null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Charte de gouvernance IA', item: `${SITE_URL}/charte-ia` },
    ],
  }

  const articleJsonLd = lastUpdated
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.seo?.titre || 'Charte de gouvernance IA',
        description:
          data.seo?.description ||
          'Engagements publics de maria sur l’usage de l’IA : validation humaine, transparence, propriété des données, lignes rouges.',
        url: `${SITE_URL}/charte-ia`,
        dateModified: new Date(lastUpdated).toISOString(),
        author: { '@id': `${SITE_URL}#organization` },
        publisher: { '@id': `${SITE_URL}#organization` },
      }
    : null

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}

      {/* 1 — Hero */}
      {data.hero?.titre && (
        <CharteHero
          surTitre={data.hero.surTitre || '// charte de gouvernance ia'}
          titre={data.hero.titre}
          sousTitre={data.hero.sousTitre}
          lastUpdated={lastUpdated}
        />
      )}

      {/* 2 — Préambule */}
      {data.preambule?.titre && data.preambule.paragraphes && data.preambule.paragraphes.length > 0 && (
        <CharteIntro
          surTitre={data.preambule.surTitre || '// préambule'}
          titre={data.preambule.titre}
          paragraphes={data.preambule.paragraphes}
        />
      )}

      {/* 3 — Engagements */}
      {data.engagements?.titre && data.engagements.items && data.engagements.items.length > 0 && (
        <CharteEngagements
          surTitre={data.engagements.surTitre || '// nos engagements'}
          titre={data.engagements.titre}
          sousTitre={data.engagements.sousTitre}
          items={data.engagements.items}
        />
      )}

      {/* 4 — Lignes rouges */}
      {data.lignesRouges?.titre && data.lignesRouges.items && data.lignesRouges.items.length > 0 && (
        <CharteLignesRouges
          surTitre={data.lignesRouges.surTitre || '// lignes rouges'}
          titre={data.lignesRouges.titre}
          intro={data.lignesRouges.intro}
          items={data.lignesRouges.items}
        />
      )}

      {/* 5 — Disclaimer */}
      {data.disclaimer?.titre && data.disclaimer.paragraphes && data.disclaimer.paragraphes.length > 0 && (
        <CharteDisclaimer
          surTitre={data.disclaimer.surTitre || '// ce que cette charte n’est pas'}
          titre={data.disclaimer.titre}
          paragraphes={data.disclaimer.paragraphes}
        />
      )}

      {/* 6 — Révision (date) */}
      {lastUpdated && (
        <CharteRevision lastUpdated={lastUpdated} mention={data.revision?.mention} />
      )}

      {/* 7 — CTA final */}
      {data.cta?.titre && (
        <CharteCta
          surTitre={data.cta.surTitre || '// engagement réciproque'}
          titre={data.cta.titre}
          sousTitre={data.cta.sousTitre}
          ctaLibelle={data.cta.ctaLibelle || 'Parler à maria'}
          ctaHref={data.cta.ctaHref || '/contact'}
        />
      )}
    </main>
  )
}
