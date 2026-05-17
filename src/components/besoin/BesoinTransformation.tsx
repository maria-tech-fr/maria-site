import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  avant: string[]
  apres: string[]
  closing?: string | null
}

export default function BesoinTransformation({ surTitre, titre, avant, apres, closing }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.42, x: '-5%', y: '-5%', size: 620, blur: 48, duration: 36 },
          { color: '#3FC163', alpha: 0.3, x: '95%', y: '95%', size: 620, blur: 48, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[40ch] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink text-balance lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Aujourd'hui */}
          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col gap-5 rounded-[16px] border border-paper-edge bg-paper p-9 lg:p-11">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#888]">
                // aujourd’hui
              </p>
              <h3 className="font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
                Aujourd’hui
              </h3>
              <ul className="flex flex-col">
                {avant.map((line, i) => (
                  <li
                    key={i}
                    className="relative flex items-start gap-3 border-b border-dotted border-ink/10 py-3 text-[15.5px] leading-[1.5] text-ink-soft last:border-b-0"
                  >
                    <span aria-hidden className="mt-2 h-2 w-2 flex-none rounded-full bg-[#C7C7C7]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Avec maria */}
          <Reveal delay={180} className="h-full">
            <div className="flex h-full flex-col gap-5 rounded-[16px] border border-[#C9EAD3] bg-success-tint p-9 lg:p-11">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#2a7a44]">
                // avec maria
              </p>
              <h3 className="font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
                Avec maria
              </h3>
              <ul className="flex flex-col">
                {apres.map((line, i) => (
                  <li
                    key={i}
                    className="relative flex items-start gap-3 border-b border-dotted border-ink/10 py-3 text-[15.5px] leading-[1.5] text-ink last:border-b-0"
                  >
                    <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#C9EAD3] bg-paper">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="#3FC163" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {closing && (
          <Reveal delay={260}>
            <p className="mx-auto max-w-[38ch] text-center font-display text-[22px] font-medium italic leading-[1.3] tracking-[-0.015em] text-ink lg:text-[28px]">
              {closing}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
