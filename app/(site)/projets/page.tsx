import type { Metadata } from 'next'
import DarkHero from '../../../src/components/DarkHero'
import EtudeDeCas from '../../../src/components/EtudeDeCas'
import ProjetsAVenir from '../../../src/components/ProjetsAVenir'
import ProjetsPasses from '../../../src/components/ProjetsPasses'
import SavoirFaire from '../../../src/components/SavoirFaire'
import { getProjets } from '../../../src/lib/projets'
import { resolveSeo } from '../../../src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const projets = await getProjets()
  return resolveSeo(projets?.seo, {
    title: 'Projets',
    description:
      'Étude de cas et projets réalisés par maria. Du cadrage à la mise en production, ce que nos équipes savent construire.',
    path: '/projets',
  })
}

export default async function ProjetsPage() {
  const projets = await getProjets()

  if (!projets?.hero) {
    return (
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink-soft">
          maria — page projets à créer dans le Studio
        </p>
      </section>
    )
  }

  return (
    <>
      <DarkHero
        data={projets.hero}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Projets' },
        ]}
      />
      {projets.etudeDeCas && <EtudeDeCas data={projets.etudeDeCas} />}
      {projets.savoirFaire && <SavoirFaire data={projets.savoirFaire} />}
      {projets.projetsPasses && <ProjetsPasses data={projets.projetsPasses} />}
      {projets.projetsAVenir && <ProjetsAVenir data={projets.projetsAVenir} />}
    </>
  )
}
