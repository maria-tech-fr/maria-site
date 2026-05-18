import Reveal from '../Reveal'
import type { Engagement } from '../../lib/pageCharteIA'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  items: Engagement[]
}

export default function CharteEngagements({ surTitre, titre, sousTitre, items }: Props) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-24">
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-12 lg:mx-0 lg:max-w-[920px]">
        <Reveal>
          <header className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[60px] lg:leading-[1.04]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="mt-2 text-[16.5px] leading-[1.6] text-ink-soft lg:text-[17.5px]">
                {sousTitre}
              </p>
            )}
          </header>
        </Reveal>

        <ol className="flex flex-col">
          {items.map((eng, i) => (
            <Reveal key={eng.numero} delay={40 + i * 25}>
              <li className="grid grid-cols-[60px_1fr] gap-8 border-t border-paper-edge py-8 lg:grid-cols-[110px_1fr] lg:gap-12 lg:py-9">
                <span
                  aria-hidden
                  className="font-mono text-[14px] font-medium leading-[1.4] tracking-[0.04em] text-success lg:text-[15px]"
                >
                  {eng.numero}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.018em] text-ink lg:text-[22px] lg:leading-[1.25]">
                    {eng.titre}
                  </h3>
                  <p className="max-w-[60ch] text-[15.5px] leading-[1.65] text-ink-soft lg:text-[16px]">
                    {eng.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
