'use client'

import Script from 'next/script'

/**
 * Widget Cloudflare Turnstile (captcha, mode `managed`).
 *
 * Mode `managed` (défaut Cloudflare) : Turnstile décide au cas par cas entre
 * un défi invisible (99 % du trafic humain, aucun affichage) et un défi visuel
 * léger (case « Je suis humain » à cocher) pour le trafic jugé suspect. C'est
 * le meilleur compromis UX / sécurité — les vrais visiteurs ne voient
 * quasi jamais rien, les bots un peu sophistiqués sont bloqués beaucoup plus
 * efficacement que par le mode `invisible` (qui laissait passer un certain
 * volume de spam).
 *
 * Historique : on avait démarré en `invisible` en juillet 2026. Bascule en
 * `managed` fin septembre 2026 après une hausse du spam reçu via le
 * formulaire.
 *
 * Le widget injecte un `<input name="cf-turnstile-response" value="TOKEN">`
 * dans le formulaire parent, validé côté serveur dans `contactActions.ts` via
 * l'endpoint siteverify.
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
        data-theme="light"
      />
    </>
  )
}
