import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { ServiceRef } from '../../lib/pageFormation'

type LienServ = { numero: string | null; pitch: string; service: ServiceRef }
type Props = {
  surTitre: string
  titre: string
  intro?: string | null
  liens: LienServ[]
}

export default function FormationTransversale({ surTitre, titre, intro, liens }: Props) {
  const valid = liens.filter((l) => l.service?.slug)
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.42, x: '-8%', y: '-5%', size: 620, blur: 48, duration: 38 },
          { color: '#3FC163', alpha: 0.3, x: '95%', y: '95%', size: 620, blur: 48, duration: 42 },
        ]}
      />

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
          <h2 className="max-w-[14ch] font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.028em] text-ink lg:text-[48px]">
            {titre}
          </h2>
          {intro && (
            <p className="max-w-[48ch] text-[16.5px] leading-[1.65] text-ink-soft lg:text-[17px]">{intro}</p>
          )}
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-3.5">
            {valid.map((l, i) => (
              <Link
                key={i}
                href={`/services/${l.service!.slug}`}
                className="group/l grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-lg border border-[#F1E4BE] bg-paper px-6 py-5 transition-all duration-300 ease-out hover:translate-x-1 hover:border-ink"
              >
                {l.numero && (
                  <span className="font-mono text-[13px] font-medium tracking-[0.06em] text-success">
                    {l.numero}
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[17px] font-semibold leading-[1.2] tracking-[-0.014em] text-ink">
                    {l.service!.titre}
                  </h3>
                  <p className="text-[14px] leading-[1.5] text-ink-soft">{l.pitch}</p>
                </div>
                <span aria-hidden className="flex h-5 w-5 items-center justify-center transition-transform duration-300 ease-out group-hover/l:translate-x-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
