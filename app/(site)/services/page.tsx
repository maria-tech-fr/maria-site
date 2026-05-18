import type { Metadata } from 'next'
import Link from 'next/link'
import { getServicesMenu } from '../../../src/lib/pageService'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Nos services IA — Audit, outils internes, agents, formation',
  description:
    'maria propose quatre offres IA pour les entreprises : audit & stratégie, outils internes sur-mesure, agents IA, et formation transversale. Méthode cadrée, supervision humaine, conformité RGPD.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Services IA pour entreprises | maria',
    description:
      'Quatre offres IA cadrées : audit, outils sur-mesure, agents, formation. Méthode anti-bullshit, supervision humaine, RGPD intégré.',
    type: 'website',
    url: `${SITE_URL}/services`,
  },
}

const FORMATION_CARD = {
  titre: 'Formation IA pour les équipes',
  slug: 'formation',
  introCourte:
    'Service transversal qui accompagne les 3 autres. Formations concrètes par métier, sécurité par défaut.',
}

export default async function ServicesIndexPage() {
  const services = await getServicesMenu()

  // Construction de l'ItemList JSON-LD : tous les services + Formation.
  const allItems = [
    ...services.map((s) => ({ titre: s.titre, slug: s.slug, intro: s.introCourte })),
    { titre: FORMATION_CARD.titre, slug: FORMATION_CARD.slug, intro: FORMATION_CARD.introCourte },
  ]

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/services`,
    url: `${SITE_URL}/services`,
    name: 'Services IA — maria',
    description:
      'Catalogue des offres maria : audit & stratégie IA, outils internes sur-mesure, agents IA, formation transversale.',
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${SITE_URL}#website` },
    publisher: { '@id': `${SITE_URL}#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allItems.length,
      itemListElement: allItems.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/services/${it.slug}`,
        name: it.titre,
        ...(it.intro ? { description: it.intro } : {}),
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero / intro éditoriale */}
      <section className="bg-paper px-6 pb-16 pt-40 lg:px-30.5 lg:pb-22 lg:pt-44">
        <article className="mx-auto flex w-full max-w-[820px] flex-col gap-6 lg:mx-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
            // services
          </p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[64px] lg:leading-[1.04]">
            Nos services IA pour les entreprises.
          </h1>
          <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[19px]">
            maria conçoit, audite et déploie l’IA en entreprise avec une approche cadrée : supervision humaine, conformité RGPD intégrée, formation transversale. Quatre offres complémentaires, articulées autour de la même méthode.
          </p>
        </article>
      </section>

      {/* Listing services + Formation */}
      <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22">
        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10 lg:mx-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {services.length + 1} offres
          </p>

          <ul className="flex flex-col">
            {services.map((s) => (
              <li key={s.slug} className="border-t border-paper-edge">
                <Link
                  href={`/services/${s.slug}`}
                  className="group/s flex flex-col gap-3 py-8 transition-colors duration-300 ease-out hover:bg-paper-edge/30 lg:flex-row lg:items-start lg:gap-12 lg:py-10"
                >
                  <span className="font-mono text-[14px] font-medium leading-[1.4] tracking-[0.06em] text-success lg:w-32">
                    Service {String(s.ordreMenu).padStart(2, '0')}
                  </span>
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.022em] text-ink lg:text-[30px]">
                      {s.titre}
                    </h2>
                    {s.introCourte && (
                      <p className="max-w-[60ch] text-[16px] leading-[1.6] text-ink-soft lg:text-[16.5px]">
                        {s.introCourte}
                      </p>
                    )}
                    <span className="mt-1 inline-flex w-fit border-b border-success pb-0.5 font-medium text-[14px] leading-5 text-success transition-colors duration-300 ease-out group-hover/s:text-success-soft">
                      Découvrir →
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* Formation : service transversal, slug fixe */}
            <li className="border-t border-b border-paper-edge">
              <Link
                href={`/services/${FORMATION_CARD.slug}`}
                className="group/s flex flex-col gap-3 py-8 transition-colors duration-300 ease-out hover:bg-paper-edge/30 lg:flex-row lg:items-start lg:gap-12 lg:py-10"
              >
                <span className="font-mono text-[14px] font-medium leading-[1.4] tracking-[0.06em] text-accent lg:w-32">
                  Transversal
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.022em] text-ink lg:text-[30px]">
                    {FORMATION_CARD.titre}
                  </h2>
                  <p className="max-w-[60ch] text-[16px] leading-[1.6] text-ink-soft lg:text-[16.5px]">
                    {FORMATION_CARD.introCourte}
                  </p>
                  <span className="mt-1 inline-flex w-fit border-b border-success pb-0.5 font-medium text-[14px] leading-5 text-success transition-colors duration-300 ease-out group-hover/s:text-success-soft">
                    Découvrir →
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
