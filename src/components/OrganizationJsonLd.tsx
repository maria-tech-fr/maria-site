import { getContactPage } from '../lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

/**
 * Schema Organization injecté GLOBAL (dans le layout site).
 * Crucial pour la GEO (citations LLM) + SEO classique.
 * Lit les coordonnées depuis Sanity (singleton parametresGlobaux.contact).
 */
export default async function OrganizationJsonLd() {
  const data = await getContactPage()
  const contact = data?.contact

  const address = contact?.adresse
    ? {
        '@type': 'PostalAddress',
        ...(contact.adresse.rue ? { streetAddress: contact.adresse.rue } : {}),
        ...(contact.adresse.codePostalVille
          ? {
              postalCode: contact.adresse.codePostalVille.split(' ')[0] ?? '',
              addressLocality:
                contact.adresse.codePostalVille.split(' ').slice(1).join(' ') ?? '',
            }
          : {}),
        addressCountry: contact?.adresse?.pays || 'FR',
      }
    : undefined

  const opens = contact?.horaires?.opens
  const closes = contact?.horaires?.closes
  const openingHours =
    opens && closes
      ? {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens,
          closes,
        }
      : undefined

  const sameAs = [contact?.linkedinUrl].filter((s): s is string => Boolean(s))

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'maria',
    legalName: 'maria',
    alternateName: 'maria — agence IA pour l’interne',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.png`,
    },
    description:
      'Agence IA pour l’interne. maria conçoit l’IA qui rend vos équipes plus efficaces et mieux organisées : audit & stratégie IA, outils internes sur-mesure, agents IA. Approche cadrée, supervision humaine, conformité RGPD intégrée.',
    slogan: 'L’IA utile, à l’intérieur de votre entreprise.',
    knowsAbout: [
      'Intelligence artificielle',
      'Agents IA',
      'Automatisation de processus',
      'Audit IA',
      'Stratégie IA',
      'Gouvernance IA',
      'RGPD',
      'Formation IA en entreprise',
      'Traitement documentaire',
      'Outils internes sur-mesure',
    ],
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Europe' },
    ],
    ...(contact?.email ? { email: contact.email } : {}),
    ...(contact?.telephone ? { telephone: contact.telephone } : {}),
    ...(address ? { address } : {}),
    ...(openingHours ? { openingHoursSpecification: openingHours } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'maria',
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}#organization` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
