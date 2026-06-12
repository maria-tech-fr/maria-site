import Link from 'next/link'
import Breadcrumb, { type BreadcrumbSegment } from '../Breadcrumb'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import ArrowRight from '../icons/ArrowRight'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  ctaPrimaireLibelle?: string | null
  ctaPrimaireHref?: string | null
  ctaSecondaireLibelle?: string | null
  ctaSecondaireAncre?: string | null
  /** Si fourni, remplace le sur-titre par un fil d'Ariane signature. */
  breadcrumb?: BreadcrumbSegment[]
}

export default function PillarHero({
  surTitre,
  titre,
  sousTitre,
  ctaPrimaireLibelle,
  ctaPrimaireHref,
  ctaSecondaireLibelle,
  ctaSecondaireAncre,
  breadcrumb,
}: Props) {
  const primLib = ctaPrimaireLibelle || 'Parler de votre projet'
  const primHref = ctaPrimaireHref || '/contact'
  const primLabel = /[→→]\s*$/.test(primLib) ? primLib : `${primLib} →`
  const secLib = ctaSecondaireLibelle || 'Voir le bloc central'
  const secAncre = ctaSecondaireAncre || '#central'

  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-22.5 pt-24 lg:px-30.5 lg:pb-30 lg:pt-50">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.45, x: '90%', y: '10%', size: 720, blur: 55, duration: 38 },
          { color: '#3FC163', alpha: 0.28, x: '78%', y: '55%', size: 540, blur: 50, duration: 44 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-9">
        <Reveal>
          {breadcrumb ? (
            <Breadcrumb segments={breadcrumb} tone="dark" />
          ) : (
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
          )}
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-[20ch] font-display text-[48px] font-semibold leading-[1.02] tracking-[-0.035em] text-paper text-balance lg:text-[88px] lg:leading-[1.02]">
            {renderWithEmphase(titre, 'text-accent')}
          </h1>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[66ch] whitespace-pre-line text-[18px] leading-[1.55] text-[#D5D5D5] lg:text-[20px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        <Reveal delay={260}>
          <div className="mt-4 flex flex-wrap items-center gap-7">
            <Link
              href={primHref}
              className="inline-flex h-[46px] items-center self-start rounded-[5px] bg-accent px-5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:bg-accent/85"
            >
              {primLabel}
            </Link>
            <a
              href={secAncre}
              className="group inline-flex items-center gap-2 font-medium text-[15px] leading-5 text-success"
            >
              <span className="relative pb-0.5">
                {secLib}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-px origin-right scale-x-0 bg-success transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
              <ArrowRight />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
