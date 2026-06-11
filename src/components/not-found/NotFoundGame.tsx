'use client'

import dynamic from 'next/dynamic'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

/*
  Bloc 3 du /404 : mini-jeu maria runner affiché directement (pas de bouton
  intermédiaire). Le runner est tout de même chargé côté client (ssr: false)
  car il manipule canvas + listeners clavier — pas de SSR utile.
*/

const MariaRunner = dynamic(() => import('../thank-you/MariaRunner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center font-mono text-[12px] tracking-[0.08em] text-ink-soft">
      // chargement du jeu…
    </div>
  ),
})

export default function NotFoundGame() {
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-25 lg:px-30.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.24, x: '88%', y: '15%', size: 520, blur: 50, duration: 40 },
          { color: '#FEC23C', alpha: 0.22, x: '12%', y: '85%', size: 520, blur: 50, duration: 46 },
        ]}
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <Reveal>
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              // tant que vous êtes là
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4.5 max-w-[26ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[36px]">
              On a aussi un petit jeu pour vous, record à battre.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 font-mono text-[11px] leading-4 tracking-[0.06em] text-[#888]">
              Espace ou tap pour sauter · Échap pour quitter
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <MariaRunner />
        </div>
      </div>
    </section>
  )
}
