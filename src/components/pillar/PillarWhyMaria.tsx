import Link from 'next/link'
import GradientBorderHover from '../GradientBorderHover'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { PillierIcone, PillierPilier } from '../../lib/pagePillier'

type CharteLien = {
  texte: string | null
  libelle: string | null
  href: string | null
} | null

type Props = {
  surTitre: string
  titre: string
  piliers: PillierPilier[]
  charteLien?: CharteLien
}

export default function PillarWhyMaria({ surTitre, titre, piliers, charteLien }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.3, x: '92%', y: '15%', size: 520, blur: 50, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[880px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="max-w-[18ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {piliers.map((p, i) => (
            <Reveal key={i} delay={80 + i * 50} className="h-full">
              <article className="group/grad relative flex h-full flex-col gap-3 rounded-2xl border border-paper-edge bg-paper p-9 transition-shadow duration-300 ease-out hover:shadow-[0_18px_40px_-22px_rgba(63,193,99,0.25)]">
                <GradientBorderHover rounded="rounded-2xl" index={i} />
                <span
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-[11px] border ${
                    i % 2 === 0 ? 'border-[#F1E4BE] bg-accent-tint' : 'border-[#C9EAD3] bg-success-tint'
                  }`}
                >
                  <PilierIcon name={p.icone} />
                </span>
                <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-ink">
                  {p.titre}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft">{p.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {charteLien?.libelle && charteLien?.href && (
          <Reveal delay={300}>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[#666]">
              {charteLien.texte}{' '}
              <Link
                href={charteLien.href}
                className="font-medium text-success underline underline-offset-[3px] decoration-1 transition-[text-decoration-thickness] duration-200 hover:decoration-2"
              >
                {charteLien.libelle} →
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function PilierIcon({ name }: { name: PillierIcone | null }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#212121',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'lock':
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 21c0-4 3.2-6.5 7-6.5s7 2.5 7 6.5" />
        </svg>
      )
    case 'question':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 9c.5-1.5 2-2.5 4-2.5 2.5 0 4 1.5 4 3.5 0 3-4 3-4 5" />
          <circle cx="12" cy="17" r="0.6" fill="#212121" />
        </svg>
      )
    case 'gear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      )
    case 'shield':
    default:
      return (
        <svg {...common}>
          <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
  }
}
