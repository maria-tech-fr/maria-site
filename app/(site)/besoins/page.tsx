import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBesoinsMenu } from '../../../src/lib/pageBesoin'
import { getPagePillier } from '../../../src/lib/pagePillier'
import PillarPageTemplate from '../../../src/components/pillar/PillarPageTemplate'
import NeedsCentralBlock from '../../../src/components/pillar/NeedsCentralBlock'
import FaqJsonLd from '../../../src/components/FaqJsonLd'
import JsonLd from '../../../src/components/JsonLd'
import { buildBreadcrumbSchema, buildItemListSchema } from '../../../src/lib/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPagePillier('besoins')
  const title = data?.seo?.titre || 'Besoins — Que peut faire l’IA pour votre entreprise | maria'
  const description =
    data?.seo?.description ||
    'Gagner du temps, soulager vos équipes, organiser la connaissance, sécuriser l’IA… maria répond à 12 besoins concrets de l’entreprise. Trouvez le vôtre.'
  const canonical = `${SITE_URL}/besoins`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: 'website', url: canonical },
  }
}

export default async function PillarBesoinsPage() {
  const [pillar, besoins] = await Promise.all([
    getPagePillier('besoins'),
    getBesoinsMenu(),
  ])

  if (!pillar) notFound()

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Accueil', url: '/' },
          { name: 'Besoins', url: '/besoins' },
        ])}
      />
      <JsonLd
        data={buildItemListSchema(
          besoins.map((b) => ({ name: b.titre, url: `/besoins/${b.slug}` })),
        )}
      />
      <FaqJsonLd questions={pillar.faq?.questions} />

      <PillarPageTemplate data={pillar}>
        <NeedsCentralBlock besoins={besoins} />
      </PillarPageTemplate>
    </main>
  )
}
