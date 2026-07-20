'use client'

import Script from 'next/script'

/**
 * Widget Cloudflare Turnstile (captcha invisible).
 *
 * En mode `invisible`, aucun visuel n'est affiché au visiteur — Cloudflare
 * vérifie en arrière-plan (fingerprint navigateur + heuristiques) et injecte
 * un `<input name="cf-turnstile-response" value="TOKEN">` dans le formulaire
 * parent dès qu'il a un verdict. Ce token est ensuite validé côté serveur
 * dans `contactActions.ts` via l'endpoint siteverify.
 *
 * Si `NEXT_PUBLIC_TURNSTILE_SITE_KEY` n'est pas définie (dev local sans
 * configuration), le widget est no-op — le form fonctionne mais le captcha
 * est bypass. En prod ce cas ne doit pas se produire : la validation
 * server-side refuse alors la soumission avec une erreur claire.
 *
 * Aucun cookie posé, pas de PII collectée — pas de consentement RGPD requis
 * (contrairement à reCAPTCHA v3 par exemple).
 */

const CF_TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

export default function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!siteKey) return null

  return (
    <>
      <Script
        src={CF_TURNSTILE_SCRIPT}
        strategy="afterInteractive"
        async
        defer
      />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-size="invisible"
      />
    </>
  )
}
