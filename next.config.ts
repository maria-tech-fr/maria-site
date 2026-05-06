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
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
  "frame-src 'self' https://calendly.com https://*.calendly.com",
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
