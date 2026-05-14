import Link from 'next/link'
import type { SidebarCta } from '../../lib/article'

export default function ArticleSidebarCta({ cta }: { cta: SidebarCta }) {
  if (!cta || (!cta.titre && !cta.description)) return null
  const isYellow = cta.variant === 'yellow'
  const bg = isYellow ? 'bg-[#FFFBEE]' : 'bg-[#E8FFEE]'
  const border = isYellow ? 'border-[rgba(254,194,60,0.35)]' : 'border-[rgba(63,193,99,0.35)]'
  const accentBorder = isYellow ? 'border-accent' : 'border-success'

  const ctaLabel = cta.lienLibelle || 'En parler →'
  const href = cta.lienHref || '/contact'

  return (
    <aside
      aria-label="Appel à l'action latéral"
      className={`hidden flex-col gap-3 rounded-[10px] border ${border} ${bg} p-6 lg:flex`}
    >
      {cta.titre && (
        <h3 className="font-display text-[18px] font-semibold leading-6 tracking-[-0.015em] text-ink">
          {cta.titre}
        </h3>
      )}
      {cta.description && (
        <p className="whitespace-pre-line text-[14px] leading-5.5 text-ink-soft">{cta.description}</p>
      )}
      <Link
        href={href}
        className={`mt-1 self-start border-b ${accentBorder} pb-0.5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:text-ink-soft`}
      >
        {ctaLabel}
      </Link>
    </aside>
  )
}
