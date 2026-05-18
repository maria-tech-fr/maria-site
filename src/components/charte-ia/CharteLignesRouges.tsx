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
          { color: '#E04646', alpha: 0.18, x: '92%', y: '15%', size: 520, blur: 70, duration: 46 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[760px] flex-col gap-9">
        <Reveal>
          <header className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-[#ff8a8a]">
              {surTitre}
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] text-paper lg:text-[36px]">
              {titre}
            </h2>
            {intro && (
              <p className="text-[16.5px] leading-[1.65] text-[#D5D5D5] lg:text-[17.5px]">{intro}</p>
            )}
          </header>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {items.map((line, i) => (
            <Reveal key={i} delay={80 + i * 60}>
              <li className="flex items-start gap-4 rounded-[8px] border border-white/10 bg-white/[0.03] p-5 lg:p-6">
                <span
                  aria-hidden
                  className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-[#E04646]"
                />
                <span className="text-[16px] leading-[1.6] text-paper lg:text-[17px]">
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
