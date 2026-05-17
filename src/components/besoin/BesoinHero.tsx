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

export default function BesoinHero({
  surTitre,
  titre,
  sousTitre,
  ctaPrimaireLibelle,
  ctaSecondaireLibelle,
}: Props) {
  const primaireLib = ctaPrimaireLibelle || 'Parler de ce besoin'
  const secondaireLib = ctaSecondaireLibelle || 'Voir le service associé'

  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-22 pt-40 lg:px-30.5 lg:pb-30 lg:pt-50">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.5, x: '92%', y: '12%', size: 720, blur: 50, duration: 30 },
          { color: '#3FC163', alpha: 0.3, x: '78%', y: '60%', size: 540, blur: 45, duration: 36 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-8">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-[20ch] font-display text-[48px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink text-balance lg:text-[78px] lg:leading-[1.02]">
            {renderTitreWithHighlight(titre)}
            <span aria-hidden className="cursor-blink text-ink" />
          </h1>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[62ch] whitespace-pre-line text-[18px] leading-[1.55] text-ink-soft lg:text-[20px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        <Reveal delay={260}>
          <div className="mt-4 flex flex-wrap items-center gap-7">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[5px] bg-accent px-6 py-3.5 font-medium text-[15px] leading-5 text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
            >
              {primaireLib}
              <ArrowRight />
            </Link>
            <a
              href="#service-associe"
              className="inline-flex items-center gap-2 border-b border-success pb-0.5 font-medium text-[15px] leading-5 text-success transition-colors duration-300 ease-out hover:text-success-soft"
            >
              {secondaireLib}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function renderTitreWithHighlight(texte: string): React.ReactNode {
  if (!texte.includes('**')) return texte
  const parts = texte.split(/\*\*([^*]+)\*\*/g)
  return parts.map((part, i) => {
    if (i % 2 === 0) return <span key={i}>{part}</span>
    return (
      <span key={i} className="relative inline-block">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[0.08em] h-[0.38em] bg-accent"
        />
        <span className="relative">{part}</span>
      </span>
    )
  })
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
