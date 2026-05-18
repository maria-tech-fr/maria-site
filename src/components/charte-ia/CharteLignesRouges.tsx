import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  intro?: string | null
  items: string[]
}

export default function CharteLignesRouges({ surTitre, titre, intro, items }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-24">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.4, x: '88%', y: '15%', size: 680, blur: 65, duration: 44 },
          { color: '#FEC23C', alpha: 0.22, x: '12%', y: '78%', size: 520, blur: 65, duration: 50 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[760px] flex-col gap-9 lg:mx-0 lg:max-w-[920px]">
        <Reveal>
          <header className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-accent">
              {surTitre}
            </p>
            <h2 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper lg:text-[60px] lg:leading-[1.04]">
              {titre}
            </h2>
            {intro && (
              <p className="mt-2 max-w-[44ch] text-[16.5px] leading-[1.65] text-[#BFBFBF] lg:text-[17.5px]">
                {intro}
              </p>
            )}
          </header>
        </Reveal>

        <ul className="flex flex-col">
          {items.map((line, i) => (
            <Reveal key={i} delay={60 + i * 40}>
              <li className="grid grid-cols-[40px_1fr] items-start gap-5 border-t border-white/10 py-6 lg:grid-cols-[60px_1fr] lg:gap-6 lg:py-7">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-[4px] border border-accent/40"
                >
                  <CrossIcon />
                </span>
                <span className="max-w-[60ch] text-[16px] leading-[1.6] text-paper lg:text-[17px]">
                  {line}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="#FEC23C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
