import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPagePillier } from '../../../src/lib/pagePillier'
import { getServicesMenu } from '../../../src/lib/pageService'
import PillarPageTemplate from '../../../src/components/pillar/PillarPageTemplate'
import ServicesCentralBlock from '../../../src/components/pillar/ServicesCentralBlock'
import FaqJsonLd from '../../../src/components/FaqJsonLd'
import JsonLd from '../../../src/components/JsonLd'
import { buildItemListSchema } from '../../../src/lib/schema'
import { DEFAULT_OG_IMAGE } from '../../../src/lib/seo'

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
    openGraph: { title, description, type: 'website', url: canonical, images: [DEFAULT_OG_IMAGE] },
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
        data={buildItemListSchema(
          services.map((s) => ({ name: s.titre, url: `/services/${s.slug}` })),
        )}
      />
      <FaqJsonLd questions={pillar.faq?.questions} />

      <PillarPageTemplate
        data={pillar}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Services' },
        ]}
      >
        <ServicesCentralBlock
          services={services}
          surTitre={pillar.central?.surTitre}
          titre={pillar.central?.titre}
          sousTitre={pillar.central?.sousTitre}
        />
      </PillarPageTemplate>
    </main>
  )
}
