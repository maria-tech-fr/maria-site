import type { QuestionFaqContact } from '../../lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

/**
 * JSON-LD spécifique à la page /contact :
 * - ContactPage (type schema dédié)
 * - FAQPage (à partir de la FAQ Sanity)
 *
 * Le schema Organization est désormais émis globalement par
 * OrganizationJsonLd dans le layout — on ne le duplique plus ici.
 */
export default function ContactJsonLd({
  faq,
}: {
  faq: QuestionFaqContact[]
}) {
  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact maria',
    url: `${SITE_URL}/contact`,
    isPartOf: { '@id': `${SITE_URL}#website` },
  }

  const faqPage =
    faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.reponse },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  )
}
