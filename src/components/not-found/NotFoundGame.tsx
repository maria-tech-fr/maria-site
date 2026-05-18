'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

/*
  Bloc 3 du /404 : invitation à lancer le mini-jeu maria runner.
  Le composant runner (déjà utilisé sur /contact/merci) est importé via
  next/dynamic + ssr:false. La chunk JS et les sprites du jeu ne sont
  chargés QU'AU CLIC du bouton — la 404 reste ultra-légère par défaut.
*/

const MariaRunner = dynamic(() => import('../thank-you/MariaRunner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
      // chargement du jeu…
    </div>
  ),
})

export default function NotFoundGame() {
  const [requested, setRequested] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)

  function handleLaunch() {
    setRequested(true)
    // Laisse le temps au DOM de mount le runner avant de scroller.
    window.setTimeout(() => {
      const el = hostRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const targetY =
        window.scrollY + rect.top - Math.max(0, (window.innerHeight - rect.height) / 2)
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
    }, 80)
  }

  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-25 lg:px-30.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.24, x: '88%', y: '15%', size: 520, blur: 50, duration: 40 },
          { color: '#FEC23C', alpha: 0.22, x: '12%', y: '85%', size: 520, blur: 50, duration: 46 },
        ]}
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        {!requested ? (
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <Reveal>
              <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                // tant que vous êtes là
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4.5 max-w-[22ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[36px]">
                Une page perdue, ça se fête à sa manière.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-ink-soft">
                Le temps de retrouver votre chemin, vous pouvez aider maria à
                esquiver les vrais problèmes du quotidien.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <button
                type="button"
                onClick={handleLaunch}
                className="mt-8 inline-flex items-center gap-2.5 rounded-[5px] border border-ink bg-transparent px-5.5 py-3.25 text-[14px] font-medium text-ink transition-colors duration-300 ease-out hover:bg-ink hover:text-paper"
              >
                Lancer le mini-jeu →
              </button>
            </Reveal>
            <Reveal delay={340}>
              <p className="mt-4.5 font-mono text-[11px] leading-4 tracking-[0.06em] text-[#888]">
                Espace ou tap pour sauter · Échap pour quitter
              </p>
            </Reveal>
          </div>
        ) : (
          <div ref={hostRef}>
            <MariaRunner />
          </div>
        )}
      </div>
    </section>
  )
}
