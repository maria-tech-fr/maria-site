import type { Metadata } from 'next'
import DarkHero from '../../../src/components/DarkHero'
import Engagements from '../../../src/components/Engagements'
import Faq from '../../../src/components/Faq'
import Manifeste from '../../../src/components/Manifeste'
import NonNegociables from '../../../src/components/NonNegociables'
import Processus from '../../../src/components/Processus'
import Technos from '../../../src/components/Technos'
import Valeurs from '../../../src/components/Valeurs'
import { getAgence } from '../../../src/lib/agence'

export const metadata: Metadata = {
  title: 'L’agence',
  description:
    'maria conçoit des sites, des outils et des contenus assistés par IA. Pensés, cadrés et sécurisés par des experts.',
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
      <DarkHero data={agence.hero} />
      {agence.manifeste && <Manifeste data={agence.manifeste} />}
      {agence.valeurs && <Valeurs data={agence.valeurs} />}
      {agence.nonNegociables && <NonNegociables data={agence.nonNegociables} />}
      {agence.processus && <Processus data={agence.processus} />}
      {agence.technos && <Technos data={agence.technos} />}
      {agence.engagements && <Engagements data={agence.engagements} />}
      {agence.faq && <Faq data={agence.faq} />}
    </>
  )
}
