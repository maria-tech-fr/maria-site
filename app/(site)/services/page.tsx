import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPagePillier } from '../../../src/lib/pagePillier'
import { getServicesMenu } from '../../../src/lib/pageService'
import PillarPageTemplate from '../../../src/components/pillar/PillarPageTemplate'
import ServicesCentralBlock from '../../../src/components/pillar/ServicesCentralBlock'
import FaqJsonLd from '../../../src/components/FaqJsonLd'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPagePillier('services')
  const title = data?.seo?.titre || 'Services — Agence IA pour l’interne | maria'
  const description =
    data?.seo?.description ||
    'maria conçoit l’IA utile en interne : audit & stratégie, outils sur-mesure, agents IA, formation. Pour des équipes plus efficaces et mieux organisées.'
  const canonical = `${SITE_URL}/services`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: 'website', url: canonical },
  }
}

export default async function PillarServicesPage() {
  const [pillar, services] = await Promise.all([
    getPagePillier('services'),
    getServicesMenu(),
  ])

  if (!pillar) notFound()

  // JSON-LD : Breadcrumb + ItemList des 3 services + FAQPage
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services IA maria',
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/services/${s.slug}`,
      name: s.titre,
      ...(s.introCourte ? { description: s.introCourte } : {}),
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <FaqJsonLd questions={pillar.faq?.questions} />

      <PillarPageTemplate data={pillar}>
        <ServicesCentralBlock services={services} />
      </PillarPageTemplate>
    </main>
  )
}
