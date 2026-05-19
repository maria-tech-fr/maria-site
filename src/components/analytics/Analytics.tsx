'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { AxeptioChoices, AxeptioSdk } from './ConsentBanner'

/*
  Google Analytics 4 — chargé UNIQUEMENT après consentement Axeptio.
  Sobre par défaut : IP anonymisée, pas de Google Signals.

  Stratégie :
   1. Si `NEXT_PUBLIC_GA_ID` est absent → composant noop.
   2. Sinon, on s'abonne à l'event Axeptio `cookies:complete`.
   3. Quand l'utilisateur a accepté la catégorie d'analytics
      (`google_analytics`, configurable côté Axeptio), on injecte gtag.js
      et on initialise GA4.
   4. Sur changement de pathname (App Router), on envoie un page_view.

  En l'absence d'Axeptio (env var absente côté Axeptio), GA4 ne se
  charge JAMAIS — c'est volontaire (sobriété par défaut).
*/

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    /** Drapeau interne pour ne charger gtag.js qu'une seule fois. */
    __ga4Loaded?: boolean
  }
}

function loadGa4(measurementId: string) {
  if (window.__ga4Loaded) return
  window.__ga4Loaded = true

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: true,
  })
}

export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const pathname = usePathname()

  // Abonnement Axeptio + chargement conditionnel de gtag.
  useEffect(() => {
    if (!measurementId) return
    if (typeof window === 'undefined') return

    window._axcb = window._axcb || []
    window._axcb.push((sdk: AxeptioSdk) => {
      sdk.on('cookies:complete', (choices: AxeptioChoices) => {
        // La clé exacte dépend de la config Axeptio côté admin. Convention
        // courante : `google_analytics`. Si la propriété est truthy →
        // utilisateur a consenti.
        const consented =
          choices.google_analytics === true ||
          choices.googleAnalytics === true ||
          choices.ga === true
        if (consented) {
          loadGa4(measurementId)
        }
      })
    })
  }, [measurementId])

  // Page view sur changement de route (App Router).
  useEffect(() => {
    if (!measurementId) return
    if (typeof window === 'undefined') return
    if (!window.gtag) return
    window.gtag('event', 'page_view', { page_path: pathname })
  }, [pathname, measurementId])

  return null
}
