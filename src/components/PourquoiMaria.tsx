import BlockHeader from './BlockHeader'
import Reveal from './Reveal'
import type { CarteMachineHumain, PourquoiMaria as PourquoiMariaData } from '../lib/accueil'

export default function PourquoiMaria({ data }: { data: PourquoiMariaData }) {
  return (
    <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
      <Reveal>
        <div className="mx-auto flex max-w-225 flex-col items-center gap-4.5 text-center">
          <BlockHeader titreClass="lg:max-w-[75%]" surTitre={data.surTitre} titre={data.titre} />
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-275 grid-cols-1 gap-6 lg:grid-cols-2">
        {data.cardMachine && (
          <Reveal delay={150}>
            <CardItem card={data.cardMachine} tone="machine" />
          </Reveal>
        )}
        {data.cardHumain && (
          <Reveal delay={250}>
            <CardItem card={data.cardHumain} tone="humain" />
          </Reveal>
        )}
      </div>

      {data.conclusion && data.conclusion.trim() && (
        <Reveal delay={350}>
          <p className="mx-auto mt-10 max-w-225 whitespace-pre-line text-center font-display text-[24px] font-medium leading-8 tracking-[-0.02em] text-ink lg:text-[36px] lg:leading-11.25">
            {data.conclusion}
          </p>
        </Reveal>
      )}
    </section>
  )
}

function CardItem({ card, tone }: { card: CarteMachineHumain; tone: 'machine' | 'humain' }) {
  const styles =
    tone === 'machine'
      ? 'border-success-soft bg-success-tint'
      : 'border-accent-soft bg-accent-tint'
  const dotColor = tone === 'machine' ? 'bg-success' : 'bg-accent'

  return (
    <article className={`flex flex-col gap-2 rounded-[5px] border px-7 py-9 lg:px-11 lg:py-12 ${styles}`}>
      <p className="font-mono text-[11px] leading-[17px] tracking-[0.08em] text-ink-soft">
        {card.surTitre}
      </p>
      <h3 className="pt-[5px] font-display text-[22px] font-semibold leading-8 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-[43.4px]">
        {card.titre}
      </h3>
      <ul className="mt-2 flex flex-col gap-3.5">
        {card.items?.map((item, i) => (
          <li key={i} className="flex items-center gap-3.5 text-[16px] leading-[24.8px] text-ink">
            <span aria-hidden className={`block h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}
