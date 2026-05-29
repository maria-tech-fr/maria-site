import type { Metadata } from 'next'
import Constat from '../../src/components/Constat'
import Experts from '../../src/components/Experts'
import Hero from '../../src/components/Hero'
import Methode from '../../src/components/Methode'
import PourquoiMaria from '../../src/components/PourquoiMaria'
import ProjetVedette from '../../src/components/ProjetVedette'
import Reassurance from '../../src/components/Reassurance'
import Services from '../../src/components/Services'
import { getAccueil } from '../../src/lib/accueil'
import { resolveSeo } from '../../src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const accueil = await getAccueil()
  const { title, ...rest } = resolveSeo(accueil?.seo, {
    title: 'maria — agence IA pour l’interne',
    description:
      'maria conçoit l’IA qui rend vos équipes plus efficaces et mieux organisées : audit & stratégie, outils internes sur-mesure, agents IA. Cadrée, sécurisée, supervisée.',
    path: '/',
  })
  // La home utilise le titre par défaut (sans le template « %s · maria »).
  return { title: { absolute: title }, ...rest }
}

export default async function Home() {
  const accueil = await getAccueil()

  if (!accueil?.hero) {
    return (
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink-soft">
          maria — contenu de la page d’accueil à créer dans le Studio
        </p>
      </section>
    )
  }

  return (
    <>
      <Hero data={accueil.hero} />
      {accueil.reassurance && accueil.reassurance.length > 0 && (
        <Reassurance items={accueil.reassurance} />
      )}
      {accueil.constat && <Constat data={accueil.constat} />}
      {accueil.services && <Services data={accueil.services} />}
      {accueil.methode && <Methode data={accueil.methode} />}
      {accueil.projetVedette && <ProjetVedette data={accueil.projetVedette} />}
      {accueil.pourquoiMaria && <PourquoiMaria data={accueil.pourquoiMaria} />}
      {accueil.experts && <Experts data={accueil.experts} />}
    </>
  )
}
