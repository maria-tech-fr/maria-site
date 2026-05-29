import type { Metadata } from 'next'
import DarkHero from '../../../src/components/DarkHero'
import Engagements from '../../../src/components/Engagements'
import Faq from '../../../src/components/Faq'
import FaqJsonLd from '../../../src/components/FaqJsonLd'
import Manifeste from '../../../src/components/Manifeste'
import NonNegociables from '../../../src/components/NonNegociables'
import Processus from '../../../src/components/Processus'
import Technos from '../../../src/components/Technos'
import Valeurs from '../../../src/components/Valeurs'
import { getAgence } from '../../../src/lib/agence'
import { resolveSeo } from '../../../src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const agence = await getAgence()
  return resolveSeo(agence?.seo, {
    title: 'L’agence',
    description:
      'maria, agence IA pour l’interne : notre manifeste, nos non-négociables, notre méthode et l’équipe qui cadre vos projets d’IA.',
    path: '/agence',
  })
}

export default async function AgencePage() {
  const agence = await getAgence()

  if (!agence?.hero) {
    return (
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink-soft">
          maria — page agence à créer dans le Studio
        </p>
      </section>
    )
  }

  return (
    <>
      <DarkHero
        data={agence.hero}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'L’agence' },
        ]}
      />
      {agence.manifeste && <Manifeste data={agence.manifeste} />}
      {agence.valeurs && <Valeurs data={agence.valeurs} />}
      {agence.nonNegociables && <NonNegociables data={agence.nonNegociables} />}
      {agence.processus && <Processus data={agence.processus} />}
      {agence.technos && <Technos data={agence.technos} />}
      {agence.engagements && <Engagements data={agence.engagements} />}
      {agence.faq && (
        <>
          <Faq data={agence.faq} />
          <FaqJsonLd questions={agence.faq.questions} />
        </>
      )}
    </>
  )
}
