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

// Content-Security-Policy : déplacé dans `middleware.ts` car il intègre un
// nonce cryptographique par requête (cf. middleware.ts). Garder un CSP
// statique ici en doublon créerait un conflit de headers — la version
// nonce-based est la seule active.

const noIndexHeader = { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  poweredByHeader: false,
  async redirects() {
    return [
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
