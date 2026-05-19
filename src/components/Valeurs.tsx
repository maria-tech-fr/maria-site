import Link from 'next/link'
import BlockHeader from './BlockHeader'
import HaloField from './HaloField'
import Reveal from './Reveal'
import ValeurIcon from './icons/ValeurIcon'
import type { Principe, Valeurs as ValeursData } from '../lib/agence'

export default function Valeurs({ data }: { data: ValeursData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.20, x: '20%', y: '75%', size: 450, duration: 32 },
          { color: '#FEC23C', alpha: 0.18, x: '80%', y: '25%', size: 450, duration: 26 },
        ]}
      />

      <div className="relative flex flex-col gap-12 lg:gap-17.5">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              surTitreClass="text-success-soft"
              titreClass="text-paper"
            />
          </div>
        </Reveal>

        {data.principes && data.principes.length > 0 && (
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
            {data.principes.map((principe, i) => (
              <Reveal key={i} delay={150 + i * 100}>
                <PrincipeItem principe={principe} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Renvoi discret vers la Charte IA — version fond sombre. Texte
            gris clair lisible, lien souligné vert success (cohérent avec la
            palette de la section). */}
        <Reveal delay={150 + (data.principes?.length ?? 0) * 100}>
          <p className="max-w-180 text-[15px] leading-6 text-[#BFBFBF] lg:text-[16px] lg:leading-6.5">
            Ces principes sont formalisés dans notre charte de gouvernance IA.{' '}
            <Link
              href="/charte-ia"
              className="border-b border-success text-paper transition-colors duration-300 ease-out hover:text-success"
            >
              La lire →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PrincipeItem({ principe }: { principe: Principe }) {
  return (
    <div className="relative border-t border-white/18 pt-7">
      <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-accent" />
      <ValeurIcon name={principe.icone} className="h-12 w-12" />
      <h3 className="pt-3 font-display text-[22px] font-semibold leading-8 tracking-[-0.02em] text-paper lg:text-[24px] lg:leading-[38.4px]">
        {principe.nom}
      </h3>
      <p className="pt-3 whitespace-pre-line text-[14px] leading-5.25 text-[#BFBFBF] lg:text-[15px] lg:leading-[23.25px]">
        {principe.description}
      </p>
    </div>
  )
}
