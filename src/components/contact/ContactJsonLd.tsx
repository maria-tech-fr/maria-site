import type { ContactInfos, QuestionFaqContact } from '../../lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

const DAY_NAMES_FR_TO_EN = {
  lundi: 'Monday',
  mardi: 'Tuesday',
  mercredi: 'Wednesday',
  jeudi: 'Thursday',
  vendredi: 'Friday',
  samedi: 'Saturday',
  dimanche: 'Sunday',
} as const

export default function ContactJsonLd({
  contact,
  faq,
}: {
  contact: ContactInfos
  faq: QuestionFaqContact[]
}) {
  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact maria',
    url: `${SITE_URL}/contact`,
  }

  // Organization avec adresse + horaires si renseignés.
  const orgAddress = contact?.adresse
    ? {
        '@type': 'PostalAddress',
        ...(contact.adresse.rue ? { streetAddress: contact.adresse.rue } : {}),
        ...(contact.adresse.codePostalVille
          ? {
              postalCode: contact.adresse.codePostalVille.split(' ')[0] ?? '',
              addressLocality: contact.adresse.codePostalVille.split(' ').slice(1).join(' ') ?? '',
            }
          : {}),
        addressCountry: contact.adresse.pays || 'FR',
      }
    : undefined

  const opens = contact?.horaires?.opens
  const closes = contact?.horaires?.closes
  const openingHours = opens && closes
    ? {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens,
        closes,
      }
    : undefined

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'maria',
    url: SITE_URL,
    ...(contact?.email ? { email: contact.email } : {}),
    ...(contact?.telephone ? { telephone: contact.telephone } : {}),
    ...(orgAddress ? { address: orgAddress } : {}),
    ...(openingHours ? { openingHoursSpecification: openingHours } : {}),
    ...(contact?.linkedinUrl ? { sameAs: [contact.linkedinUrl] } : {}),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
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
