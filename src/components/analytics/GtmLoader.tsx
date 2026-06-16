'use client'

import { useEffect } from 'react'
import type { AxeptioSdk } from './ConsentBanner'

/*
  Charge Google Tag Manager dès que le SDK Axeptio est prêt.

  Architecture du consentement (Google Consent Mode v2) :
    1. L'inline script du layout pose les defaults Consent Mode v2
       (analytics_storage / ad_storage / ad_user_data / ad_personalization
       tous à 'denied') AVANT tout autre script.
    2. ConsentBanner charge le SDK Axeptio. Axeptio gère NATIVEMENT
       la mise à jour des flags Consent Mode après le choix utilisateur
       (intégration officielle Axeptio + Google).
    3. CE composant injecte gtm.js dès que le SDK Axeptio est prêt
       (callback `_axcb` qui fire quand le SDK s'initialise). GTM
       démarre avec les defaults 'denied' et ne déclenche AUCUN tag
       tant que les flags ne sont pas mis en 'granted' par Axeptio.
    4. Quand l'utilisateur accepte, Axeptio met à jour les flags via
       `gtag('consent','update', …)`. GTM ré-évalue ses tags : ceux
       configurés avec un Built-in Consent Check (analytics_storage
       pour GA4, ad_storage pour les pixels marketing) se déclenchent.

  Pourquoi pas un listener sur `cookies:complete` :
    Cet événement peut ne pas firer dans tous les contextes (recharge
    avec choix mémorisé, navigateurs strict-privacy, certaines versions
    du SDK). L'approche officielle recommandée par Axeptio est de
    charger les outils tiers dès que le SDK est prêt et de laisser
    Consent Mode v2 piloter le déclenchement.
    https://support.axeptio.eu/hc/en-gb/articles/4404456861585

  Filet de sécurité :
    Si Axeptio ne se charge pas (CDN bloqué, extension navigateur,
    env var absente), un timeout charge GTM après 5 s. Les defaults
    Consent Mode v2 restent 'denied' → aucun tag tracking ne fire,
    aucun cookie tiers déposé. Le filet sert uniquement à permettre
    aux tags non-tracking (ex. server-side events sans cookie) de
    fonctionner sans dépendance dure à Axeptio.

  Note sur les cookies posés par GTM lui-même : sous Consent Mode v2,
  GTM ne pose pas de cookie tracking tant que le consent n'est pas
  'granted'. Seuls les cookies fonctionnels minimes (ex. gtm session
  pour debug en Preview Mode) peuvent être posés — pas de _ga, _gid,
  _gcl_au, etc. avant acceptation explicite.
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

    function loadGtm() {
      if (window.__gtmLoaded) return
      window.__gtmLoaded = true

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
      document.head.appendChild(script)
    }

    // 1. Charge GTM dès que le SDK Axeptio est prêt (callback queue).
    //    Si Axeptio est déjà chargé, le callback fire immédiatement.
    window._axcb = window._axcb || []
    window._axcb.push((_sdk: AxeptioSdk) => {
      loadGtm()
    })

    // 2. Filet : charge GTM après 5 s si Axeptio ne se charge pas.
    //    Idempotent grâce au flag __gtmLoaded.
    const fallback = window.setTimeout(loadGtm, 5000)

    return () => window.clearTimeout(fallback)
  }, [gtmId])

  return null
}
