'use client'

import { useEffect } from 'react'
import type { AxeptioSdk } from './ConsentBanner'

/*
  Charge Google Tag Manager UNIQUEMENT après la première décision de
  l'utilisateur dans Axeptio (accepter OU refuser). Cela garantit qu'aucune
  requête vers `www.googletagmanager.com` ne part avant que le consentement
  ne soit explicitement résolu.

  Architecture du consentement :
    1. Inline script dans le layout pose les defaults Google Consent Mode v2
       (`analytics_storage`, `ad_storage`, etc. tous à `denied`).
    2. Axeptio est chargé par ConsentBanner ; il gère NATIVEMENT la mise à
       jour des flags Consent Mode quand l'utilisateur fait son choix.
    3. Ce composant écoute le premier `cookies:complete` d'Axeptio et
       n'injecte le script GTM qu'après. GTM voit donc d'emblée l'état de
       consentement à jour, et déclenche (ou non) les tags configurés en
       conséquence côté interface GTM.

  Pourquoi pas de noscript iframe : le snippet noscript standard de GTM
  charge le container inconditionnellement, ce qui violerait notre règle
  « aucun cookie tiers avant choix utilisateur » pour les visiteurs sans
  JavaScript. On accepte de ne pas tracker ce public minoritaire plutôt
  que de violer le principe de consentement strict.

  Si `NEXT_PUBLIC_GTM_ID` n'est pas posée, le composant est no-op — utile
  pour le dev local sans config.
*/

declare global {
  interface Window {
    dataLayer?: unknown[]
    __gtmLoaded?: boolean
  }
}

export default function GtmLoader({ gtmId }: { gtmId: string | undefined }) {
  useEffect(() => {
    if (!gtmId) return
    if (typeof window === 'undefined') return

    window._axcb = window._axcb || []
    window._axcb.push((sdk: AxeptioSdk) => {
      sdk.on('cookies:complete', () => {
        if (window.__gtmLoaded) return
        window.__gtmLoaded = true

        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
        document.head.appendChild(script)
      })
    })
  }, [gtmId])

  return null
}
