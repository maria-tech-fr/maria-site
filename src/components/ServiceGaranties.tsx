import HaloField from './HaloField'
import Reveal from './Reveal'
import type { GarantieItem, ServiceGaranties as ServiceGarantiesData } from '../lib/pageService'

export default function ServiceGaranties({ data }: { data: ServiceGarantiesData }) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.30, x: '88%', y: '78%', size: 580, blur: 45, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-6">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="lg:max-w-[75%] whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {data.titre}
            </h2>
          </div>
        </Reveal>

        {data.items && data.items.length > 0 && (
          <div className="max-w-230">
            {data.items.map((item, i) => (
              <Reveal key={i} delay={100 + i * 60}>
                <GarantieRow item={item} isLast={i === data.items!.length - 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function GarantieRow({ item, isLast }: { item: GarantieItem; isLast: boolean }) {
  return (
    <div className={`flex items-start gap-6 border-t border-paper-edge py-7 ${isLast ? 'border-b' : ''}`}>
      <span
        aria-hidden
        className="flex h-8 w-8 flex-none items-center justify-center rounded-2xl border border-[#C9EAD3] bg-[#E8FFEE]"
      >
        <CheckIcon />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[18px] font-semibold leading-6 tracking-[-0.015em] text-ink lg:text-[19px]">
          {item.titre}
        </h3>
        <p className="whitespace-pre-line text-[15.5px] leading-6 text-ink-soft">
          {item.description}
        </p>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7.5l2.7 2.7L11.5 4"
        stroke="#3FC163"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
