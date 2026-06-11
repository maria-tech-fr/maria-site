'use client'

import { useEffect } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { CardCanal, ContactCanalAction } from '../../lib/contact'

type ContactChannelsProps = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  cards: CardCanal[]
  /** URL Cal.com pour la card « rendez-vous » — utilisée par le popin. */
  calcomUrl?: string | null
  /** Numéro affiché en card 2 pour l'aria-label (action = infos). */
  telephoneAffichage?: string | null
}

const CAL_NAMESPACE = 'maria-contact'

export default function ContactChannels({
  surTitre,
  titre,
  sousTitre,
  cards,
  calcomUrl,
  telephoneAffichage,
}: ContactChannelsProps) {
  // Initialise Cal.com une fois — différé à l'idle pour sortir
  // `@calcom/embed-react` du critical path (chunk lazy au lieu d'eager
  // dans le bundle initial de la page).
  useEffect(() => {
    if (!calcomUrl) return
    let cancelled = false
    function init() {
      if (cancelled) return
      import('@calcom/embed-react').then(({ getCalApi }) => {
        getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
          if (cancelled) return
          cal('ui', {
            theme: 'light',
            hideEventTypeDetails: false,
            layout: 'month_view',
          })
        })
      })
    }
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback
    if (typeof ric === 'function') {
      const id = ric(init)
      return () => {
        cancelled = true
        ;(window as Window & { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback?.(id)
      }
    }
    const id = window.setTimeout(init, 1500)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [calcomUrl])

  function onCardClick(action: ContactCanalAction, href: string | null) {
    if (action === 'form') {
      scrollToId('formulaire')
    } else if (action === 'infos') {
      scrollToId('infos-pratiques')
    } else if (action === 'link' && href) {
      if (href.startsWith('http')) window.open(href, '_blank', 'noopener,noreferrer')
      // eslint-disable-next-line react-hooks/immutability
      else window.location.href = href
    }
    // 'calcom' is handled directly by the Cal.com data attrs on the button (see below).
    // 'disabled' = no-op.
  }

  return (
    <section
      id="canaux"
      className="relative overflow-hidden bg-[#F9F9F9] px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.28, x: '92%', y: '12%', size: 660, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="whitespace-pre-line text-[16px] leading-6 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
                {sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {cards.map((card, i) => (
            <Reveal key={i} delay={120 + i * 80}>
              <ChannelCard
                card={card}
                onClick={() => onCardClick(card.action, card.href)}
                calcomUrl={calcomUrl}
                telephoneAffichage={telephoneAffichage}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChannelCard({
  card,
  onClick,
  calcomUrl,
  telephoneAffichage,
}: {
  card: CardCanal
  onClick: () => void
  calcomUrl?: string | null
  telephoneAffichage?: string | null
}) {
  const isDisabled = card.action === 'disabled'
  const accentClass =
    card.accent === 'yellow'
      ? 'text-accent border-accent'
      : card.accent === 'muted'
      ? 'text-[#999] border-[#CCC]'
      : 'text-success border-success'

  const cardClass = isDisabled
    ? 'cursor-not-allowed border-dashed border-[#DCDCDC] bg-[#F9F9F9]'
    : 'border-paper-edge bg-paper transition-transform duration-300 ease-out hover:-translate-y-0.5'

  // Pour Cal.com on bind directement les data attrs — le SDK Cal s'occupe du clic.
  const calcomProps =
    card.action === 'calcom' && calcomUrl
      ? {
          'data-cal-namespace': CAL_NAMESPACE,
          'data-cal-link': extractCalLink(calcomUrl),
          'data-cal-config': '{"layout":"month_view"}',
        }
      : undefined

  const labelTel = telephoneAffichage && card.action === 'infos' ? ` — ${telephoneAffichage}` : ''

  return (
    <article
      className={`flex h-full flex-col gap-3.5 rounded-[5px] border p-10 ${cardClass}`}
    >
      {/* Top row : icone + (badge bientôt disponible si disabled) */}
      <div className="flex items-start justify-between gap-3">
        <CanalIcon action={card.action} disabled={isDisabled} />
        {isDisabled && (
          <span className="inline-flex items-center rounded-full border border-[#B7FFCA] bg-[#E8FFEE] px-2.5 py-1 font-mono text-[10px] lowercase tracking-[0.06em] text-success">
            bientôt disponible
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 pt-6">
        <h3
          className={`font-display text-[22px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[26px] lg:leading-[31px] ${
            isDisabled ? 'opacity-55' : ''
          }`}
        >
          {card.titre}
        </h3>
        <p
          className={`whitespace-pre-line text-[14.5px] leading-[23.25px] text-ink-soft lg:text-[15px] ${
            isDisabled ? 'opacity-55' : ''
          }`}
        >
          {card.description}
          {labelTel}
        </p>
      </div>
      {isDisabled ? (
        <span className={`mt-4 inline-flex items-center gap-1 self-start border-b pb-0.5 text-[14px] font-medium leading-5 ${accentClass}`}>
          {card.cta}
          <ArrowRight />
        </span>
      ) : (
        <button
          type="button"
          {...(calcomProps ?? {})}
          onClick={(e) => {
            if (calcomProps) return // Cal.com SDK handles it
            e.preventDefault()
            onClick()
          }}
          className={`mt-4 inline-flex items-center gap-1 self-start border-b pb-0.5 text-[14px] font-medium leading-5 transition-colors duration-300 ease-out ${accentClass} hover:opacity-80`}
        >
          {card.cta}
          <ArrowRight />
        </button>
      )}
    </article>
  )
}

function extractCalLink(url: string): string {
  // Extrait le slug de https://cal.com/<slug>/<event> → "<slug>/<event>"
  try {
    const u = new URL(url)
    return u.pathname.replace(/^\//, '')
  } catch {
    return url
  }
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: 'smooth' })
}

function CanalIcon({ action, disabled }: { action: ContactCanalAction; disabled: boolean }) {
  const color = disabled ? '#999' : action === 'calcom' ? '#FEC23C' : '#212121'
  const paths: Record<ContactCanalAction, React.ReactNode> = {
    form: (
      <g>
        <path d="M5 4h11l3 3v15H5z" />
        <path d="M16 4v3h3M8 12h8M8 16h8M8 8h4" />
      </g>
    ),
    infos: (
      <g>
        <path d="M5.5 4.5h4l1.5 3.5-2 1.5a11 11 0 0 0 4.5 4.5l1.5-2 3.5 1.5v4c0 1-.5 1.5-1.5 1.5C12 19 5 12 5 7c0-1 .5-1.5 1.5-1.5z" />
      </g>
    ),
    calcom: (
      <g>
        <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
        <path d="M3.5 9.5h17M7.5 3.5v4M16.5 3.5v4M8 13l2 2 4-4" />
      </g>
    ),
    link: (
      <g>
        <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
        <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
      </g>
    ),
    disabled: (
      <g>
        <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
        <path d="M8.5 12.5h7" />
      </g>
    ),
  }
  return (
    <span
      aria-hidden
      className="flex h-13 w-13 items-center justify-center rounded-[5px] border border-paper-edge bg-paper-soft"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {paths[action]}
      </svg>
    </span>
  )
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="ml-1"
    >
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
