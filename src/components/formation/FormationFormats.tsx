import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { FormatIcone } from '../../lib/pageFormation'

type Card = { icone: FormatIcone | null; titre: string; description: string }
type Props = { surTitre: string; titre: string; cards: Card[] }

export default function FormationFormats({ surTitre, titre, cards }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.32, x: '92%', y: '15%', size: 520, blur: 45, duration: 36 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={i} delay={120 + i * 60} className="h-full">
              <article className="group/fmt flex h-full flex-col gap-3 rounded-[8px] border border-paper-edge bg-paper p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent">
                <span
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] border ${
                    i % 2 === 0 ? 'border-[#F1E4BE] bg-accent-tint' : 'border-[#C9EAD3] bg-success-tint'
                  }`}
                >
                  <FormatIcon name={c.icone} />
                </span>
                <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.016em] text-ink">
                  {c.titre}
                </h3>
                <p className="text-[14.5px] leading-[1.55] text-ink-soft">{c.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FormatIcon({ name }: { name: FormatIcone | null }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: '#212121', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (name) {
    case 'building':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <circle cx="7" cy="14" r="1.4" />
          <circle cx="12" cy="14" r="1.4" />
          <circle cx="17" cy="14" r="1.4" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="14" height="10" rx="1.5" />
          <path d="M7 18h6" />
          <path d="M10 14v4" />
          <circle cx="20" cy="9" r="3" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="6" height="12" rx="1.2" />
          <rect x="11" y="9" width="6" height="9" rx="1.2" />
          <rect x="19" y="4" width="2.5" height="14" rx="1" />
        </svg>
      )
    case 'grid':
    default:
      return (
        <svg {...common}>
          <path d="M4 4h16v4H4z" />
          <path d="M4 12h10v8H4z" />
          <path d="M18 14h2v6h-2z" />
        </svg>
      )
  }
}
