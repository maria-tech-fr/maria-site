import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type ServiceCard = {
  numero: string | null
  pitch: string
  ctaLibelle: string | null
  service: { titre: string; slug: string } | null
}

type FormationMention = {
  texte: string | null
  lienLibelle: string | null
  lienHref: string | null
}

type Props = {
  surTitre: string
  titre: string
  cards: ServiceCard[]
  formationMention?: FormationMention | null
}

export default function BesoinServiceAssocie({
  surTitre,
  titre,
  cards,
  formationMention,
}: Props) {
  const validCards = cards.filter((c) => c.service?.slug)
  const showFormation =
    formationMention?.texte || formationMention?.lienHref || formationMention?.lienLibelle

  return (
    <section
      id="service-associe"
      className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30"
      style={{ scrollMarginTop: '96px' }}
    >
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.26, x: '-8%', y: '10%', size: 760, blur: 60, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[42ch] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper text-balance lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div
          className={`grid grid-cols-1 gap-5 ${validCards.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} lg:gap-6`}
        >
          {validCards.map((c, i) => (
            <Reveal key={i} delay={120 + i * 80} className="h-full">
              <ServiceCardItem card={c} />
            </Reveal>
          ))}
        </div>

        {showFormation && (
          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-4 rounded-[12px] border border-dashed border-white/18 px-7 py-5">
              <span aria-hidden className="flex h-8 w-8 flex-none items-center justify-center rounded-[8px] border border-accent/30 bg-accent/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FEC23C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 10v6" />
                  <path d="M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5" />
                </svg>
              </span>
              <p className="flex-1 min-w-[240px] text-[14.5px] leading-[1.5] text-[#CFCFCF]">
                {formationMention?.texte}
                {formationMention?.lienHref && formationMention?.lienLibelle && (
                  <>
                    {' '}
                    <Link
                      href={formationMention.lienHref}
                      className="border-b border-accent pb-0.5 font-medium text-accent transition-colors duration-300 ease-out hover:text-accent-soft"
                    >
                      {formationMention.lienLibelle}
                    </Link>
                  </>
                )}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function ServiceCardItem({ card }: { card: ServiceCard }) {
  const href = card.service?.slug ? `/services/${card.service.slug}` : '#'
  return (
    <Link
      href={href}
      className="group/svc relative flex h-full flex-col gap-5 overflow-hidden rounded-[16px] border border-white/10 bg-[#2a2a2a] p-10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-success/50 lg:p-12"
    >
      {/* Halo radial interne */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[30%] -top-[30%] h-[80%] w-[80%] rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(63,193,99,0.10), transparent 70%)',
        }}
      />

      {card.numero && (
        <span className="relative font-mono text-[38px] font-medium leading-none tracking-[-0.02em] text-success">
          {card.numero}
        </span>
      )}
      <h3 className="relative max-w-[18ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.022em] text-paper lg:text-[28px]">
        {card.service?.titre ?? '—'}
      </h3>
      <p className="relative whitespace-pre-line text-[15.5px] leading-[1.6] text-[#BFBFBF]">
        {card.pitch}
      </p>
      <span className="relative mt-auto inline-flex items-center gap-2 border-b border-success pb-1 font-medium text-[15px] leading-5 text-success transition-colors duration-300 ease-out group-hover/svc:text-success-soft">
        {card.ctaLibelle || 'Découvrir ce service'}
        <ArrowRight />
      </span>
    </Link>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
