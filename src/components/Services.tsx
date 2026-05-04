import Link from 'next/link'
import Reveal from './Reveal'
import ServiceIcon from './icons/ServiceIcon'
import { type Lien, type Services as ServicesData, type ServiceCard, lienExterne, lienHref } from '../lib/accueil'

export default function Services({ data }: { data: ServicesData }) {
  return (
    <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
      <Reveal>
        <div className="flex flex-col gap-4.5">
          <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
            {data.surTitre}
          </p>
          <h2 className="max-w-196.75 whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-15.5">
            {data.titre}
          </h2>
          <p className="max-w-173.5 whitespace-pre-line text-[16px] leading-6 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
            {data.description}
          </p>
        </div>
      </Reveal>

      {data.cards && data.cards.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-3.75 md:grid-cols-3 lg:mt-[46px]">
          {data.cards.map((card, i) => (
            <Reveal key={i} delay={150 + i * 100}>
              <ServiceCardItem card={card} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const href = lienHref(card.lien)
  const externe = lienExterne(card.lien)
  const arrow = (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h11M9 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const linkClass =
    'group inline-flex items-center gap-2 pt-[15px] text-[14px] font-medium leading-[21.7px] text-ink'

  return (
    <article className="group/card relative flex flex-col rounded-[5px] border border-paper-edge bg-paper px-7 pt-8 pb-7 lg:px-8 lg:pt-9 lg:pb-8">
      {/* Bordure dégradée jaune↔vert visible uniquement au hover. Drift lent en arrière-plan. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[5px] opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100"
        style={{
          padding: '1px',
          background:
            'linear-gradient(120deg, #FEC23C 0%, #3FC163 50%, #FEC23C 100%)',
          backgroundSize: '200% 100%',
          animation: `border-drift 32s linear infinite ${-index * 4}s`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <ServiceIcon name={card.icone} className="h-[54px] w-[54px]" />
      <h3 className="pt-[21px] font-display text-[22px] font-semibold leading-8 tracking-[-0.02em] text-ink lg:text-[24px] lg:leading-[37.2px]">
        {card.titre}
      </h3>
      <p className="text-[15px] leading-[23.25px] text-ink-soft">
        {card.description}
      </p>
      <div className="mt-auto">
        {externe ? (
          <a href={href} target="_blank" rel="noreferrer noopener" className={linkClass}>
            <UnderlineLabel label={card.lien.libelle} />
            {arrow}
          </a>
        ) : (
          <Link href={href} className={linkClass}>
            <UnderlineLabel label={card.lien.libelle} />
            {arrow}
          </Link>
        )}
      </div>
    </article>
  )
}

function UnderlineLabel({ label }: { label: string }) {
  return (
    <span className="relative pb-0.5">
      {label}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px origin-right scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
      />
    </span>
  )
}
