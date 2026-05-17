import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { LevierIcone } from '../../lib/pageBesoin'

type Levier = {
  icone: LevierIcone | null
  titre: string
  description: string
}

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  leviers: Levier[]
}

export default function BesoinAnswer({ surTitre, titre, sousTitre, leviers }: Props) {
  const isFour = leviers.length >= 4
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.34, x: '92%', y: '15%', size: 560, blur: 45, duration: 32 },
          { color: '#3FC163', alpha: 0.22, x: '-6%', y: '85%', size: 460, blur: 45, duration: 36 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[18px]">
                {sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${isFour ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {leviers.map((l, i) => (
            <Reveal key={i} delay={120 + i * 60} className="h-full">
              <article
                className={`group/lever flex h-full flex-col gap-3 rounded-[8px] border border-paper-edge bg-paper p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_20px_-12px_rgba(254,194,60,0.25)]`}
              >
                <span
                  className={`mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] border ${
                    i % 2 === 0
                      ? 'border-[#F1E4BE] bg-accent-tint'
                      : 'border-[#C9EAD3] bg-success-tint'
                  }`}
                >
                  <LevierIcon name={l.icone} />
                </span>
                <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.016em] text-ink">
                  {l.titre}
                </h3>
                <p className="text-[14.5px] leading-[1.55] text-ink-soft">
                  {l.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function LevierIcon({ name }: { name: LevierIcone | null }) {
  const stroke = '#212121'
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (name) {
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'gear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      )
    case 'zap':
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      )
    case 'search':
    default:
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
  }
}
