'use client'

import Script from 'next/script'

/*
  Bandeau de consentement Axeptio.
  Charge le SDK Axeptio (static.axept.io/sdk-slim.js) qui prend en charge :
   - l'affichage du bandeau de consentement RGPD
   - le stockage de la décision utilisateur (cookies fonctionnels uniquement)
   - l'API window._axcb pour exposer les choix aux autres tiers
     (consommée par <Analytics /> pour conditionner le chargement de GA4)
   - la réouverture du widget via openCookies() (utilisée par le lien
     « Gérer mes cookies » du footer)

  Le composant ne rend RIEN si `NEXT_PUBLIC_AXEPTIO_CLIENT_ID` est absent
  → prêt-à-câbler : il suffit de poser la variable dans Vercel pour activer.

  NB CSP : le script Axeptio est servi depuis static.axept.io — vérifier
  que `script-src` et `connect-src` du CSP (next.config.ts) autorisent ce
  domaine quand le widget est activé.
*/

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string
      cookiesVersion?: string
    }
    _axcb?: Array<(sdk: AxeptioSdk) => void>
  }
}

export type AxeptioChoices = Record<string, boolean | string | number>

export interface AxeptioSdk {
  on(event: 'cookies:complete', cb: (choices: AxeptioChoices) => void): void
  openCookies(): void
}

export default function ConsentBanner() {
  const clientId = process.env.NEXT_PUBLIC_AXEPTIO_CLIENT_ID
  const cookiesVersion = process.env.NEXT_PUBLIC_AXEPTIO_VERSION || 'maria-fr-EU'

  if (!clientId) return null

  return (
    <>
      <Script id="axeptio-settings" strategy="afterInteractive">
        {`window.axeptioSettings = ${JSON.stringify({ clientId, cookiesVersion })};`}
      </Script>
      <Script
        id="axeptio-sdk"
        src="https://static.axept.io/sdk-slim.js"
        strategy="afterInteractive"
      />
    </>
  )
}

/**
 * Helper exposé pour réouvrir le widget Axeptio depuis le footer.
 * Ne fait rien si Axeptio n'est pas chargé (env var absente ou SDK pas
 * encore initialisé) — l'utilisateur peut ré-essayer une fois la page
 * complètement chargée.
 */
export function reopenAxeptioCookies(): void {
  if (typeof window === 'undefined') return
  // L'API `_axcb` reste disponible même après init — on push une closure
  // qui appelle openCookies() dès que le SDK est prêt.
  window._axcb = window._axcb || []
  window._axcb.push((sdk) => {
    sdk.openCookies()
  })
}
