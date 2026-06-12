import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { AudienceIcone } from '../../lib/pageFormation'

type Card = { icone: AudienceIcone | null; titre: string; description: string }
type Props = { surTitre: string; titre: string; cards: Card[] }

export default function FormationAudiences({ surTitre, titre, cards }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.32, x: '-5%', y: '20%', size: 540, blur: 50, duration: 36 },
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={120 + i * 80} className="h-full">
              <article className="group/aud flex h-full flex-col gap-4 rounded-lg border border-paper-edge bg-paper p-10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_20px_-12px_rgba(254,194,60,0.30)]">
                <span
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] border ${
                    i % 2 === 0 ? 'border-[#F1E4BE] bg-accent-tint' : 'border-[#C9EAD3] bg-success-tint'
                  }`}
                >
                  <AudienceIcon name={c.icone} />
                </span>
                <h3 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[24px]">
                  {c.titre}
                </h3>
                <p className="text-[15px] leading-[1.6] text-ink-soft">{c.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function AudienceIcon({ name }: { name: AudienceIcone | null }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#212121', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (name) {
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
          <path d="M14 16c.6-1.4 2-2.4 4-2.4s3 .9 3 3" />
        </svg>
      )
    case 'wrench':
      return (
        <svg {...common}>
          <path d="M4.5 16.5L3 21l4.5-1.5" />
          <path d="M14 6l4 4-8.5 8.5L5 19l.5-4.5z" />
          <path d="M14 6l2.5-2.5a2.1 2.1 0 1 1 3 3L17 9" />
        </svg>
      )
    case 'compass':
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="16 8 14 14 8 16 10 10" />
        </svg>
      )
  }
}
