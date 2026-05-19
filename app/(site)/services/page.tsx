import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPagePillier } from '../../../src/lib/pagePillier'
import { getServicesMenu } from '../../../src/lib/pageService'
import PillarPageTemplate from '../../../src/components/pillar/PillarPageTemplate'
import ServicesCentralBlock from '../../../src/components/pillar/ServicesCentralBlock'
import FaqJsonLd from '../../../src/components/FaqJsonLd'
import JsonLd from '../../../src/components/JsonLd'
import { buildBreadcrumbSchema, buildItemListSchema } from '../../../src/lib/schema'

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

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Accueil', url: '/' },
          { name: 'Services', url: '/services' },
        ])}
      />
      <JsonLd
        data={buildItemListSchema(
          services.map((s) => ({ name: s.titre, url: `/services/${s.slug}` })),
        )}
      />
      <FaqJsonLd questions={pillar.faq?.questions} />

      <PillarPageTemplate data={pillar}>
        <ServicesCentralBlock services={services} />
      </PillarPageTemplate>
    </main>
  )
}
