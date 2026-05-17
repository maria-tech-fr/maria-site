import type { Metadata } from 'next'
import Link from 'next/link'
import HaloField from '../../../src/components/HaloField'
import Reveal from '../../../src/components/Reveal'
import {
  FAMILLES,
  getBesoinsIndex,
  type BesoinFamilleKey,
  type BesoinIndexItem,
} from '../../../src/lib/pageBesoin'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Vos besoins — maria',
  description:
    'Les douleurs métier qu’on entend le plus, par famille : productivité, organisation, pilotage, RH, gouvernance. À chaque besoin, une réponse maria.',
  alternates: { canonical: `${SITE_URL}/besoins` },
}

export default async function BesoinsIndexPage() {
  const all = await getBesoinsIndex()
  const byFamille = new Map<BesoinFamilleKey, BesoinIndexItem[]>()
  for (const b of all) {
    if (!b.famille) continue
    const arr = byFamille.get(b.famille) ?? []
    arr.push(b)
    byFamille.set(b.famille, arr)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper px-6 pb-16 pt-40 lg:px-30.5 lg:pb-22 lg:pt-50">
        <HaloField
          halos={[
            { color: '#FEC23C', alpha: 0.4, x: '90%', y: '20%', size: 600, blur: 50, duration: 32 },
            { color: '#3FC163', alpha: 0.24, x: '15%', y: '75%', size: 520, blur: 45, duration: 38 },
          ]}
        />
        <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-6">
          <Reveal>
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              // vos besoins
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="max-w-[22ch] font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink text-balance lg:text-[72px] lg:leading-[1.02]">
              Les douleurs métier qu’on entend le plus.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[19px]">
              Classés par famille. À chaque besoin, on associe un service maria qui y répond, avec
              une méthode, un cadre, des garde-fous. Choisissez l’angle qui vous parle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Familles + besoins */}
      <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
        <div className="flex flex-col gap-16 lg:gap-20">
          {FAMILLES.map((famille) => {
            const items = byFamille.get(famille.key) ?? []
            if (items.length === 0) return null
            return (
              <Reveal key={famille.key}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-success">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
                      {famille.titre} ({items.length})
                    </p>
                    <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[36px]">
                      {famille.tagline}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {items.map((b, i) => (
                      <Reveal key={b.slug} delay={80 + i * 50} className="h-full">
                        <Link
                          href={`/besoins/${b.slug}`}
                          className="group/b flex h-full flex-col gap-3 rounded-[12px] border border-paper-edge bg-paper p-7 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ink"
                        >
                          <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.016em] text-ink">
                            {b.titre}
                          </h3>
                          {b.introCourte && (
                            <p className="flex-1 text-[14.5px] leading-[1.5] text-ink-soft">
                              {b.introCourte}
                            </p>
                          )}
                          <span className="mt-2 inline-flex w-fit border-b-[1.5px] border-accent pb-0.5 font-medium text-[14px] leading-5 text-ink">
                            Voir le besoin →
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
