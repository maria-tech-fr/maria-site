import Link from 'next/link'
import type { PromoForGrid } from '../lib/blog'

export default function BlogPromoCard({ promo }: { promo: PromoForGrid }) {
  const isYellow = promo.variant === 'yellow'
  const bg = isYellow ? 'bg-[#FFFBEE]' : 'bg-[#E8FFEE]'
  const border = isYellow ? 'border-[rgba(254,194,60,0.35)]' : 'border-[rgba(63,193,99,0.35)]'
  const label = isYellow ? 'text-accent' : 'text-success'
  const arrow = isYellow ? 'border-accent' : 'border-success'

  const cta = /[→→]\s*$/.test(promo.lienLibelle) ? promo.lienLibelle : `${promo.lienLibelle} →`

  return (
    <aside
      aria-label={promo.titre}
      className={`flex h-full flex-col justify-between gap-4 rounded-[8px] border ${border} ${bg} p-7`}
    >
      <div className="flex flex-col gap-3">
        <p className={`font-mono text-[11px] leading-4 tracking-[0.08em] ${label}`}>
          {promo.label}
        </p>
        <h3 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[22px] lg:leading-[27px]">
          {promo.titre}
        </h3>
        <p className="whitespace-pre-line text-[14.5px] leading-[22.48px] text-ink-soft">
          {promo.description}
        </p>
      </div>
      <Link
        href={promo.lienHref}
        className={`self-start border-b ${arrow} pb-0.5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:text-ink-soft`}
      >
        {cta}
      </Link>
    </aside>
  )
}
