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
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-10">
        <Reveal>
          <header className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[36px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="text-[16.5px] leading-[1.6] text-ink-soft lg:text-[17.5px]">{sousTitre}</p>
            )}
          </header>
        </Reveal>

        <ol className="flex flex-col gap-9">
          {items.map((eng, i) => (
            <Reveal key={eng.numero} delay={60 + i * 30}>
              <li className="flex gap-5 border-t border-paper-edge pt-8 lg:gap-7">
                <span
                  aria-hidden
                  className="font-mono text-[20px] font-medium leading-none tracking-[-0.02em] text-accent lg:text-[22px]"
                >
                  {eng.numero}
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[22px]">
                    {eng.titre}
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-ink-soft lg:text-[17px]">
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
