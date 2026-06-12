import { NextResponse, type NextRequest } from 'next/server'

/*
  CSP nonce-based : génère un nonce cryptographique par requête, l'injecte
  dans la CSP, et le pousse comme header lisible côté Server Components
  (via `headers().get('x-nonce')`).

  Pourquoi : `'unsafe-inline'` sur script-src neutralise la protection
  XSS qu'apporte la CSP. Avec un nonce, seuls les scripts portant ce nonce
  exact peuvent s'exécuter — un attaquant qui injecte du HTML ne peut pas
  exécuter de JavaScript.

  Périmètre : appliqué à toutes les routes sauf le Studio Sanity (/machine)
  et les routes API. Le Studio injecte trop de scripts inline qu'on ne
  contrôle pas pour pouvoir leur attacher un nonce ; il reste donc isolé
  (avec ses propres protections via la session Sanity).
*/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bypass : Studio Sanity + routes API.
  if (
    pathname.startsWith('/machine') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Nonce cryptographique (16 bytes, base64). Web Crypto API → compatible
  // Edge runtime sans dépendance externe.
  const nonceBytes = new Uint8Array(16)
  crypto.getRandomValues(nonceBytes)
  const nonce = Buffer.from(nonceBytes).toString('base64')

  // CSP avec nonce. On garde 'unsafe-inline' en fallback sur style-src
  // (Tailwind / styled-components inline) et on remplace 'unsafe-inline'
  // par 'nonce-<value>' sur script-src. Le 'strict-dynamic' aurait été
  // plus propre mais bloque next/script avec tiers (Axeptio, GA4) — on
  // reste donc en allowlist explicite + nonce pour nos scripts inline.
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://static.axept.io https://www.googletagmanager.com`,
    `style-src 'self' 'unsafe-inline' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.google-analytics.com https://*.googletagmanager.com https://*.axept.io",
    "frame-src 'self' https://cal.com https://*.cal.com https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')

  // On pose le nonce comme header de requête pour que le layout puisse
  // le lire avec `headers().get('x-nonce')`. Aussi en header de réponse
  // (informatif, pratique pour debug).
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  // Exclure les assets statiques pour ne pas alourdir le edge.
  // (Le bypass interne ci-dessus reprend la main pour le studio/api/etc.)
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
