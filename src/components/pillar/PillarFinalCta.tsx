import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  ctaPrimaireLibelle?: string | null
  ctaPrimaireHref?: string | null
  ctaSecondaireLibelle?: string | null
  ctaSecondaireHref?: string | null
  mention?: string | null
}

export default function PillarFinalCta({
  surTitre,
  titre,
  sousTitre,
  ctaPrimaireLibelle,
  ctaPrimaireHref,
  ctaSecondaireLibelle,
  ctaSecondaireHref,
  mention,
}: Props) {
  const primLib = ctaPrimaireLibelle || 'Réserver un échange'
  const primHref = ctaPrimaireHref || '/contact'
  const primLabel = /[→→]\s*$/.test(primLib) ? primLib : `${primLib} →`
  const secLib = ctaSecondaireLibelle || 'Découvrir notre méthode'
  const secHref = ctaSecondaireHref || '/agence'

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-22 text-center text-paper lg:px-30.5 lg:py-32">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.3, x: '30%', y: '40%', size: 720, blur: 60, duration: 38 },
          { color: '#3FC163', alpha: 0.22, x: '70%', y: '60%', size: 720, blur: 60, duration: 42 },
        ]}
      />

      <div className="relative mx-auto flex max-w-[920px] flex-col items-center gap-7">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success-soft">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="max-w-[20ch] font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-paper text-balance lg:text-[72px] lg:leading-[1.02]">
            {renderWithEmphase(titre, 'text-accent')}
            <span aria-hidden className="cursor-blink text-paper" />
          </h2>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[52ch] text-[17px] leading-[1.55] text-[#CFCFCF] lg:text-[18px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        <Reveal delay={260}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-7">
            <Link
              href={primHref}
              className="inline-flex h-[46px] items-center rounded-[5px] bg-accent px-5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:bg-accent/85"
            >
              {primLabel}
            </Link>
            <Link
              href={secHref}
              className="inline-flex items-center gap-2 border-b border-success pb-0.5 font-medium text-[15px] leading-5 text-success transition-colors duration-300 ease-out hover:text-success-soft"
            >
              {secLib}
            </Link>
          </div>
        </Reveal>
        {mention && (
          <Reveal delay={320}>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#888]">
              {mention}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
