import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  ctaPrimaireLibelle?: string | null
  ctaSecondaireLibelle?: string | null
}

export default function FormationHero({
  surTitre,
  titre,
  sousTitre,
  ctaPrimaireLibelle,
  ctaSecondaireLibelle,
}: Props) {
  const primLib = ctaPrimaireLibelle || 'Parler de vos besoins de formation'
  const secLib = ctaSecondaireLibelle || 'Voir nos formations'
  const primLabel = /[→→]\s*$/.test(primLib) ? primLib : `${primLib} →`

  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-22.5 pt-45.5 lg:px-30.5 lg:pb-30 lg:pt-50">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.55, x: '92%', y: '10%', size: 720, blur: 55, duration: 36 },
          { color: '#3FC163', alpha: 0.32, x: '78%', y: '50%', size: 540, blur: 50, duration: 40 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-9">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-[20ch] font-display text-[48px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink text-balance lg:text-[80px] lg:leading-[1.02]">
            {titre}
          </h1>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[66ch] whitespace-pre-line text-[18px] leading-[1.55] text-ink-soft lg:text-[20px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        <Reveal delay={260}>
          <div className="mt-4 flex flex-wrap items-center gap-7">
            <Link
              href="/contact"
              className="inline-flex h-[46px] items-center self-start rounded-[5px] bg-accent px-5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:bg-accent/85"
            >
              {primLabel}
            </Link>
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 border-b border-success pb-0.5 font-medium text-[15px] leading-5 text-success transition-colors duration-300 ease-out hover:text-success-soft"
            >
              {secLib}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
