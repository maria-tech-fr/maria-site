import Reveal from './Reveal'
import type { CardPourQui, ServicePourQui as ServicePourQuiData } from '../lib/pageService'

export default function ServicePourQui({ data }: { data: ServicePourQuiData }) {
  return (
    <section className="relative bg-[#F9F9F9] px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-16">
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

        {data.cards && data.cards.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {data.cards.map((card, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <CardItem card={card} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CardItem({ card }: { card: CardPourQui }) {
  return (
    <article className="flex h-full flex-col gap-3.75 rounded-[5px] border border-paper-edge bg-paper p-8">
      <p className="font-mono text-[11px] leading-4 tracking-[0.06em] text-success">{card.numero}</p>
      <h3 className="whitespace-pre-line font-display text-[20px] font-semibold leading-6.5 tracking-[-0.018em] text-ink lg:text-[21px] lg:leading-[25.2px]">
        {card.titre}
      </h3>
      <p className="whitespace-pre-line text-[14.5px] leading-[22.48px] text-ink-soft">
        {card.description}
      </p>
    </article>
  )
}
