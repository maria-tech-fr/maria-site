import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { ServiceRef } from '../../lib/pageFormation'

type Card = { eyebrow: string | null; pitch: string; service: ServiceRef }
type Props = { surTitre: string; titre: string; cards: Card[] }

export default function FormationServicesLinks({ surTitre, titre, cards }: Props) {
  const valid = cards.filter((c) => c.service?.slug)
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.26, x: '94%', y: '20%', size: 480, blur: 48, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-12">
        <Reveal>
          <div className="flex max-w-[42ch] flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
            <h2 className="font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-[44px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {valid.map((c, i) => (
            <Reveal key={i} delay={120 + i * 80} className="h-full">
              <Link
                href={`/services/${c.service!.slug}`}
                className="group/sv flex h-full flex-col gap-3.5 rounded-[8px] border border-paper-edge bg-paper p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ink"
              >
                {c.eyebrow && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#888]">
                    {c.eyebrow}
                  </p>
                )}
                <h3 className="max-w-[18ch] font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                  {c.service!.titre}
                </h3>
                <p className="flex-1 text-[14.5px] leading-[1.55] text-ink-soft">{c.pitch}</p>
                <span className="mt-2 inline-flex w-fit border-b-[1.5px] border-accent pb-0.5 font-medium text-[14px] leading-5 text-ink">
                  En savoir plus →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
