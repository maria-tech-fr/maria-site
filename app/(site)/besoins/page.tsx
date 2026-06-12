import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBesoinsMenu } from '../../../src/lib/pageBesoin'
import { getPagePillier } from '../../../src/lib/pagePillier'
import PillarPageTemplate from '../../../src/components/pillar/PillarPageTemplate'
import NeedsCentralBlock from '../../../src/components/pillar/NeedsCentralBlock'
import FaqJsonLd from '../../../src/components/FaqJsonLd'
import JsonLd from '../../../src/components/JsonLd'
import { buildItemListSchema } from '../../../src/lib/schema'
import { resolveSeo } from '../../../src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPagePillier('besoins')
  return resolveSeo(data?.seo, {
    title: 'Besoins — Que peut faire l’IA pour votre entreprise | maria',
    description:
      'Gagner du temps, soulager vos équipes, organiser la connaissance, sécuriser l’IA… maria répond à 12 besoins concrets de l’entreprise. Trouvez le vôtre.',
    path: '/besoins',
  })
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
        data={buildItemListSchema(
          besoins.map((b) => ({ name: b.titre, url: `/besoins/${b.slug}` })),
        )}
      />
      <FaqJsonLd questions={pillar.faq?.questions} />

      <PillarPageTemplate
        data={pillar}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Besoins' },
        ]}
      >
        <NeedsCentralBlock
          besoins={besoins}
          surTitre={pillar.central?.surTitre}
          titre={pillar.central?.titre}
          sousTitre={pillar.central?.sousTitre}
        />
      </PillarPageTemplate>
    </main>
  )
}
