import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { CoutIcone } from '../../lib/pageBesoin'

type CostItem = {
  icone: CoutIcone | null
  titre: string
  description: string
}

type Props = {
  surTitre: string
  titre: string
  items: CostItem[]
}

export default function BesoinCost({ surTitre, titre, items }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '92%', y: '8%', size: 720, blur: 55, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="lg:max-w-[75%] font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] text-paper lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={120 + i * 80} className="h-full">
              <article className="flex h-full flex-col gap-5 rounded-[5px] border border-white/10 bg-white/[0.03] p-10 lg:p-11">
                <span className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-success/22 bg-success/10">
                  <CostIcon name={it.icone} />
                </span>
                <h3 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.018em] text-paper">
                  {it.titre}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#BFBFBF]">
                  {it.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CostIcon({ name }: { name: CoutIcone | null }) {
  const stroke = '#3FC163'
  switch (name) {
    case 'human':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    case 'opportunity':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={stroke} stroke="none" />
        </svg>
      )
    case 'time':
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
  }
}
