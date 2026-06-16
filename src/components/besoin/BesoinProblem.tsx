import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
  recogSurTitre: string
  recogTitre: string
  symptomes: string[]
}

export default function BesoinProblem({
  surTitre,
  titre,
  paragraphes,
  recogSurTitre,
  recogTitre,
  symptomes,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.28, x: '-5%', y: '50%', size: 540, blur: 50, duration: 32 },
        ]}
      />

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
        {/* Colonne gauche : éditorial */}
        <Reveal className="flex flex-col gap-7">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {surTitre}
          </p>
          <h2 className="lg:max-w-[75%] font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.028em] text-ink lg:text-[48px] lg:leading-[1.1]">
            {titre.replace(/\*\*/g, '')}
          </h2>
          <div className="flex flex-col gap-5">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[16.5px] leading-[1.7] text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Colonne droite : encadré « Vous reconnaissez ? » */}
        <Reveal delay={120}>
          <aside className="rounded-xl border border-paper-edge bg-paper p-9 shadow-[0_12px_32px_-18px_rgba(33,33,33,0.18)] lg:p-10">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {recogSurTitre}
            </p>
            <h3 className="mt-4 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.018em] text-ink">
              {recogTitre}
            </h3>
            <ul className="mt-5 flex flex-col">
              {symptomes.map((s, i) => (
                <li
                  key={i}
                  className="relative flex items-start gap-3.5 border-b border-dotted border-paper-edge py-3.5 text-[15.5px] leading-[1.5] text-ink-soft last:border-b-0"
                >
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#F1E4BE] bg-accent-tint">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#FEC23C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}

