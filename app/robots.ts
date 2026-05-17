import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export default function robots(): MetadataRoute.Robots {
  // En preview Vercel : interdire totalement l'indexation.
  if (!ALLOW_INDEXING) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  // En prod : indexation libre sauf studio + page de remerciement.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/machine/', '/contact/merci'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
