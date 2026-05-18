import type { Metadata } from 'next'
import Link from 'next/link'
import { getBesoinsMenu, FAMILLES } from '../../../src/lib/pageBesoin'
import { getServicesMenu } from '../../../src/lib/pageService'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Plan du site',
  description:
    'Vue d’ensemble des pages du site maria : services, besoins, agence, journal et pages légales.',
  alternates: { canonical: `${SITE_URL}/plan-du-site` },
  robots: { index: true, follow: true },
}

type Group = { titre: string; items: { label: string; href: string }[] }

export default async function PlanDuSitePage() {
  const [services, besoins] = await Promise.all([
    getServicesMenu(),
    getBesoinsMenu(),
  ])

  const groups: Group[] = [
    {
      titre: 'Découvrir',
      items: [
        { label: 'Accueil', href: '/' },
        { label: 'L’agence', href: '/agence' },
        { label: 'Projets', href: '/projets' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      titre: 'Services',
      items: [
        { label: 'Voir tous les services', href: '/services' },
        ...services
          .slice()
          .sort((a, b) => a.ordreMenu - b.ordreMenu)
          .map((s) => ({ label: s.titre, href: `/services/${s.slug}` })),
        { label: 'Formation IA pour les équipes', href: '/formation' },
      ],
    },
    ...FAMILLES.map<Group>((famille) => ({
      titre: famille.titre,
      items: besoins
        .filter((b) => b.famille === famille.key)
        .sort((a, b) => a.ordreMenu - b.ordreMenu)
        .map((b) => ({ label: b.titre, href: `/besoins/${b.slug}` })),
    })).filter((g) => g.items.length > 0),
    {
      titre: 'Ressources',
      items: [
        { label: 'Journal', href: '/blog' },
        { label: 'Charte IA', href: '/charte-ia' },
      ],
    },
    {
      titre: 'Légal',
      items: [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'Confidentialité', href: '/confidentialite' },
        { label: 'Cookies', href: '/confidentialite#cookies' },
      ],
    },
  ]

  return (
    <section className="bg-paper px-6 pb-22 pt-40 lg:px-30.5 lg:pb-30 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
            // plan du site
          </p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[60px]">
            Toutes les pages, d’un coup d’œil.
          </h1>
          <p className="max-w-[640px] text-[16px] leading-7 text-ink-soft lg:text-[17px]">
            Vous cherchez une page précise ? Voici l’ensemble du site, organisé
            par thématique.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.titre} className="flex flex-col gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-success">
                {group.titre}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] leading-6 text-ink transition-colors duration-300 ease-out hover:text-success"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
