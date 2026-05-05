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
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success-soft">
              {data.surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper lg:text-[60px] lg:leading-15.5">
              {data.titre}
            </h2>
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
