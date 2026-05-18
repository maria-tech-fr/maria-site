import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  ctaLibelle: string
  ctaHref: string
}

export default function CharteCta({ surTitre, titre, sousTitre, ctaLibelle, ctaHref }: Props) {
  const label = /[→→]\s*$/.test(ctaLibelle) ? ctaLibelle : `${ctaLibelle} →`
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20 text-center text-paper lg:px-30.5 lg:py-28">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.28, x: '30%', y: '40%', size: 640, blur: 60, duration: 42 },
          { color: '#3FC163', alpha: 0.22, x: '70%', y: '60%', size: 640, blur: 60, duration: 46 },
        ]}
      />

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-6">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success-soft">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="max-w-[20ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper text-balance lg:text-[56px] lg:leading-[1.04]">
            {renderWithEmphase(titre, 'text-accent')}
          </h2>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[52ch] text-[16.5px] leading-[1.6] text-[#CFCFCF] lg:text-[17.5px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        <Reveal delay={260}>
          <Link
            href={ctaHref}
            className="mt-4 inline-flex h-[46px] items-center rounded-[5px] bg-accent px-5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:bg-accent/85"
          >
            {label}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
