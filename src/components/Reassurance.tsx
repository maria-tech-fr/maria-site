import ReassuranceIcon from './icons/ReassuranceIcon'
import type { ReassuranceItem } from '../lib/accueil'

export default function Reassurance({ items }: { items: ReassuranceItem[] }) {
  if (!items.length) return null

  return (
    <section className="border-y border-white/6 bg-ink-soft px-6 lg:px-30.5">
      <div className="flex flex-col divide-y divide-white/8 border-y border-white/8 lg:flex-row lg:divide-x lg:divide-y-0 lg:border-x lg:border-y-0">
        {items.map((item, i) => (
          <div key={i} className="flex flex-1 items-center gap-3 px-4 py-4 lg:px-6">
            <ReassuranceIcon name={item.icone} className="h-5.5 w-5.5 shrink-0" />
            <p className="text-[13px] leading-[17.55px] text-[#E5E5E5]">
              {item.libelle}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
