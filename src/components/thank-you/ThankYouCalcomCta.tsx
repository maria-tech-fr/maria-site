'use client'

import { useEffect } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  description?: string | null
  ctaLibelle: string
  calcomUrl?: string | null
}

const NS = 'maria-merci'

export default function ThankYouCalcomCta({
  surTitre,
  titre,
  description,
  ctaLibelle,
  calcomUrl,
}: Props) {
  // Init Cal.com différé à l'idle pour sortir le SDK du critical path.
  useEffect(() => {
    if (!calcomUrl) return
    let cancelled = false
    function init() {
      if (cancelled) return
      import('@calcom/embed-react').then(({ getCalApi }) => {
        getCalApi({ namespace: NS }).then((cal) => {
          if (cancelled) return
          cal('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view' })
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

  const hasCal = !!calcomUrl
  const calLink = hasCal ? extractCalLink(calcomUrl) : null

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20 lg:px-30.5 lg:py-28">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.26, x: '15%', y: '30%', size: 620, blur: 50, duration: 42 },
          { color: '#3FC163', alpha: 0.22, x: '85%', y: '70%', size: 700, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.08em] text-accent-soft">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.032em] text-paper lg:text-[52px] lg:leading-[1.08]">
            {renderWithEmphase(titre, 'text-accent')}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={160}>
            <p className="max-w-[600px] text-[16px] leading-7 text-[#CFCFCF] lg:text-[18px] lg:leading-[28px]">
              {description}
            </p>
          </Reveal>
        )}
        <Reveal delay={240}>
          {hasCal ? (
            <button
              type="button"
              data-cal-namespace={NS}
              data-cal-link={calLink ?? undefined}
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-medium text-[15px] leading-5 text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
            >
              {ctaLibelle}
              <ArrowRight />
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg bg-paper-edge px-7 py-3.5 font-medium text-[15px] leading-5 text-ink-soft">
              {ctaLibelle}
            </span>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function extractCalLink(url: string): string {
  try {
    const u = new URL(url)
    return u.pathname.replace(/^\//, '')
  } catch {
    return url
  }
}


function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 6h13M9 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
