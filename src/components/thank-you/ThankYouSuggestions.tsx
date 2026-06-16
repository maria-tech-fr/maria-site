import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { MerciSuggestionCard } from '../../lib/contact'

type Props = {
  surTitre: string
  titre: string
  cards: MerciSuggestionCard[]
}

export default function ThankYouSuggestions({ surTitre, titre, cards }: Props) {
  return (
    <section
      id="suite"
      className="relative overflow-hidden bg-[#FFFBEE] px-6 py-16 lg:px-30.5 lg:py-22.5"
      style={{ scrollMarginTop: '96px' }}
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.22, x: '92%', y: '12%', size: 620, blur: 50, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-12">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-3.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[52px] lg:leading-[58px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={120 + i * 80}>
              <SuggestionCard card={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function SuggestionCard({ card }: { card: MerciSuggestionCard }) {
  const accentClass =
    card.accent === 'yellow'
      ? 'text-accent border-accent'
      : 'text-success border-success'

  const isExternal = card.lienHref.startsWith('http')

  const inner = (
    <>
      <span
        aria-hidden
        className="mb-5 flex h-13 w-13 items-center justify-center rounded-[5px] border border-paper-edge bg-paper-soft"
      >
        <span className={`font-mono text-[20px] font-semibold leading-none ${card.accent === 'yellow' ? 'text-accent' : 'text-success'}`}>
          →
        </span>
      </span>
      <h3 className="font-display text-[22px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[24px] lg:leading-[30px]">
        {card.titre}
      </h3>
      <p className="text-[14.5px] leading-[23.25px] text-ink-soft lg:text-[15px]">
        {card.description}
      </p>
      <span className={`mt-4 inline-flex items-center gap-1 self-start border-b pb-0.5 text-[14px] font-medium leading-5 ${accentClass}`}>
        {card.lienLibelle}
        <ArrowRight />
      </span>
    </>
  )

  const baseCls =
    'flex h-full flex-col gap-2.5 rounded-[5px] border border-paper-edge bg-paper p-10 transition-transform duration-300 ease-out hover:-translate-y-0.5'

  if (isExternal) {
    return (
      <a href={card.lienHref} target="_blank" rel="noopener noreferrer" className={baseCls}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={card.lienHref} className={baseCls}>
      {inner}
    </Link>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="ml-1">
      <path
        d="M2 7h9M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
