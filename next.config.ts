import type { NextConfig } from 'next'

const INDEXING_ALLOWED = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const contentSecurityPolicy = [
  "default-src 'self'",
  // script-src : on autorise les domaines des tiers activables (Axeptio
  // consentement + GA4 mesure d'audience). Ces tiers ne se chargent que
  // si les env vars correspondantes sont posées — voir composants
  // ConsentBanner/Analytics — mais le CSP doit les laisser passer.
  "script-src 'self' 'unsafe-inline' https://static.axept.io https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // img-src : pixels GA4 + assets Axeptio + images Sanity.
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // connect-src : appels API GA4 + Axeptio + Sanity.
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.google-analytics.com https://*.googletagmanager.com https://*.axept.io",
  // frame-src : iframes Cal.com (embed) + médias article.
  "frame-src 'self' https://cal.com https://*.cal.com https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const cspHeader = { key: 'Content-Security-Policy', value: contentSecurityPolicy }
const noIndexHeader = { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  poweredByHeader: false,
  async redirects() {
    // Formation est passée d'un sous-service (/services/formation) à un service
    // transversal top-level (/formation). Le 301 permanent maintient les
    // anciens partages/backlinks pendant la transition SEO.
    return [
      {
        source: '/services/formation',
        destination: '/formation',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          ...(INDEXING_ALLOWED ? [] : [noIndexHeader]),
        ],
      },
      {
        source: '/((?!machine|api).*)',
        headers: [cspHeader],
      },
      {
        source: '/machine/:path*',
        headers: [noIndexHeader],
      },
      {
        source: '/api/:path*',
        headers: [noIndexHeader],
      },
    ]
  },
}

export default nextConfig
