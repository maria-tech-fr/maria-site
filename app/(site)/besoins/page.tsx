import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FAMILLES,
  getBesoinsMenu,
  type BesoinFamilleKey,
  type BesoinMenuItem,
} from '../../../src/lib/pageBesoin'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Tous les besoins IA en entreprise — par cas d’usage',
  description:
    'Les douleurs métier qu’on entend le plus, classées par famille : productivité opérationnelle, organisation & connaissance, pilotage & décision, RH & formation, gouvernance & conformité. À chaque besoin, une réponse maria.',
  alternates: { canonical: `${SITE_URL}/besoins` },
  openGraph: {
    title: 'Tous les besoins IA en entreprise — par cas d’usage | maria',
    description:
      'Vos douleurs métier IA classées par famille. À chaque besoin, une réponse cadrée.',
    type: 'website',
    url: `${SITE_URL}/besoins`,
  },
}

export default async function BesoinsIndexPage() {
  const all = await getBesoinsMenu()

  const byFamille = new Map<BesoinFamilleKey, BesoinMenuItem[]>()
  for (const b of all) {
    if (!b.famille) continue
    const arr = byFamille.get(b.famille) ?? []
    arr.push(b)
    byFamille.set(b.famille, arr)
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/besoins`,
    url: `${SITE_URL}/besoins`,
    name: 'Besoins IA en entreprise — maria',
    description:
      'Catalogue de cas d’usage IA en entreprise classés par famille métier. À chaque besoin, une approche maria cadrée.',
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${SITE_URL}#website` },
    publisher: { '@id': `${SITE_URL}#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: all.length,
      itemListElement: all.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/besoins/${b.slug}`,
        name: b.titre,
        ...(b.introCourte ? { description: b.introCourte } : {}),
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Besoins', item: `${SITE_URL}/besoins` },
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
            // besoins
          </p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[64px] lg:leading-[1.04]">
            Tous nos cas d’usage IA, classés par famille métier.
          </h1>
          <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[19px]">
            {all.length} douleurs métier qu’on entend le plus en entreprise, regroupées en {FAMILLES.length} familles. À chaque cas, une réponse maria cadrée : services associés, méthode, garde-fous.
          </p>
        </article>
      </section>

      {/* Listing par famille */}
      <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22">
        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-14 lg:mx-0">
          {FAMILLES.map((famille) => {
            const items = (byFamille.get(famille.key) ?? []).sort(
              (a, b) => a.ordreMenu - b.ordreMenu,
            )
            if (items.length === 0) return null

            return (
              <section key={famille.key} className="flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                  <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-success">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {famille.titre} · {items.length}
                  </p>
                  <h2 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.022em] text-ink lg:text-[30px]">
                    {famille.tagline}
                  </h2>
                </header>

                <ul className="flex flex-col">
                  {items.map((b) => (
                    <li key={b.slug} className="border-t border-paper-edge last:border-b">
                      <Link
                        href={`/besoins/${b.slug}`}
                        className="group/b flex flex-col gap-2 py-5 transition-colors duration-300 ease-out hover:bg-paper-edge/30 lg:py-6"
                      >
                        <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.018em] text-ink lg:text-[21px]">
                          {b.titre}
                        </h3>
                        {b.introCourte && (
                          <p className="max-w-[68ch] text-[15.5px] leading-[1.55] text-ink-soft lg:text-[16px]">
                            {b.introCourte}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}
