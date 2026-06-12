import type { NextConfig } from 'next'

const INDEXING_ALLOWED = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    // Surface API navigateur réduite au strict nécessaire pour un site
    // marketing : aucune feature browser sensible n'est requise. On bloque
    // tout par défaut (clauses vides = personne ne peut utiliser la feature).
    // Si on a un jour besoin d'une feature, on l'ouvre à 'self' uniquement.
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'interest-cohort=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'xr-spatial-tracking=()',
    ].join(', '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

// CSP statique posée via les headers Next.js : préserve le rendu SSG/static
// (aucun middleware par requête). On garde 'unsafe-inline' sur script-src
// pour autoriser les <script type="application/ld+json"> émis côté serveur ;
// la surface XSS reste très faible (pas d'input utilisateur réinjecté dans
// les pages, contenu Sanity validé côté éditeurs).
const contentSecurityPolicy = [
  "default-src 'self'",
  // Tiers activables : Axeptio (consentement) + GA4 (mesure) + Cal.com
  // (popin RDV via @calcom/embed-react, charge app.cal.com/embed/embed.js).
  "script-src 'self' 'unsafe-inline' https://static.axept.io https://www.googletagmanager.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com https://*.cal.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // connect-src : Cal.com expose son API depuis app.cal.com (XHR/fetch).
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.google-analytics.com https://*.googletagmanager.com https://*.axept.io https://app.cal.com https://*.cal.com",
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
    return [
      // Politique cookies fusionnée dans la politique de confidentialité.
      // Redirige les anciens liens (footer, bandeau Axeptio archivé) vers
      // la nouvelle section.
      {
        source: '/cookies',
        destination: '/confidentialite',
        permanent: true,
      },
      // Formation est passée d'un sous-service (/services/formation) à un service
      // transversal top-level (/formation). Le 308 permanent maintient les
      // anciens partages/backlinks pendant la transition SEO.
      {
        source: '/services/formation',
        destination: '/formation',
        permanent: true,
      },
      // Slugs services renommés (décisions éditoriales). Redirections 308
      // pour préserver les backlinks externes existants.
      {
        source: '/services/audit-strategie-ia',
        destination: '/services/audit-et-strategie-ia',
        permanent: true,
      },
      {
        source: '/services/agents-ia',
        destination: '/services/agents-conversationnels-ia',
        permanent: true,
      },
      {
        source: '/services/outils-internes-sur-mesure',
        destination: '/services/outils-IA-internes-sur-mesure',
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
