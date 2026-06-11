import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { PillierEtape } from '../../lib/pagePillier'

type Transversal = {
  label: string | null
  titre: string | null
  description: string | null
  ctaLibelle: string | null
  ctaHref: string | null
} | null

type Props = {
  surTitre: string
  titre: string
  intro?: string | null
  etapes: PillierEtape[]
  transversal?: Transversal
}

export default function PillarArticulation({ surTitre, titre, intro, etapes, transversal }: Props) {
  const hasTransversal =
    transversal &&
    (transversal.titre || transversal.description || transversal.ctaLibelle)

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.24, x: '-8%', y: '15%', size: 660, blur: 55, duration: 42 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[880px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="max-w-[18ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper lg:text-[52px]">
              {titre}
            </h2>
            {intro && (
              <p className="max-w-[54ch] text-[16.5px] leading-[1.6] text-[#BFBFBF] lg:text-[17px]">
                {intro}
              </p>
            )}
          </div>
        </Reveal>

        {/* Frise */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {etapes.map((etape, i) => (
            <Reveal key={etape.numero} delay={80 + i * 50} className="h-full">
              <article className="relative flex h-full flex-col gap-3 rounded-[5px] border border-white/10 bg-white/[0.03] p-8 lg:p-9">
                <span className="font-mono text-[13px] font-medium leading-[1.4] tracking-[0.06em] text-success">
                  {etape.numero}
                </span>
                <p className="font-display text-[26px] font-bold leading-none tracking-[-0.025em] text-accent lg:text-[28px]">
                  {etape.verbe}
                </p>
                <h3 className="font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.015em] text-paper">
                  {etape.titre}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[#BFBFBF]">
                  {etape.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bandeau transversal optionnel */}
        {hasTransversal && (
          <Reveal delay={260}>
            <div className="grid grid-cols-1 items-center gap-6 rounded-[16px] border border-white/[0.06] bg-ink-soft p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-x-16 lg:gap-y-12 lg:p-12">
              <div className="flex max-w-[24ch] flex-col gap-3">
                {transversal!.label && (
                  <span className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                    {transversal!.label}
                  </span>
                )}
                {transversal!.titre && (
                  <h3 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.022em] text-paper lg:text-[28px]">
                    {transversal!.titre}
                  </h3>
                )}
              </div>
              {transversal!.description && (
                <p className="max-w-[52ch] text-[15.5px] leading-[1.6] text-[#CFCFCF]">
                  {transversal!.description}
                </p>
              )}
              {transversal!.ctaLibelle && transversal!.ctaHref && (
                <Link
                  href={transversal!.ctaHref}
                  className="inline-flex items-center gap-2 self-start whitespace-nowrap border-b border-success pb-0.5 font-medium text-[15px] leading-5 text-success transition-colors duration-300 ease-out hover:text-success-soft lg:self-center"
                >
                  {transversal!.ctaLibelle} →
                </Link>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
