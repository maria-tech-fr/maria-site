import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '../../lib/article'
import { avatarSrc, formatDateFr, formatReadingTime, imageAlt, imageSrc, initiales } from '../../lib/blog'
import Breadcrumb from '../Breadcrumb'

export default function ArticleHero({ article }: { article: Article }) {
  // Cover : ~480px max sur desktop (col gauche 423fr / (423+613)fr ≈ 41%
  // d'un container max 1180px). Sur mobile = pleine largeur. next/image
  // génère le srcset et choisit la bonne taille via `sizes`.
  const cover = imageSrc(article.coverImage, 900, 1200)
  const coverAlt = imageAlt(article.coverImage, article.titre)
  const avatar = avatarSrc(article.auteur, 64)

  return (
    <header className="bg-paper px-6 pb-12 pt-26 lg:px-30.5 lg:pb-14 lg:pt-32">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <Breadcrumb
          tone="light"
          segments={[
            { label: 'Accueil', href: '/' },
            { label: 'Journal', href: '/blog' },
            {
              label: article.categorie.libelle,
              href: `/blog/categorie/${article.categorie.slug}`,
            },
            { label: article.titre },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[423fr_613fr] lg:items-stretch lg:gap-16">
          {/* Image gauche (3:4) — LCP critique : priority + sizes responsive */}
          <div className="relative overflow-hidden rounded-lg aspect-3/4">
            {cover ? (
              <Image
                src={cover}
                alt={coverAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#FFFBEE] to-[#E8FFEE]">
                <span className="rounded-full bg-white/85 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#666]">
                  photo · 3:4
                </span>
              </div>
            )}
          </div>

          {/* Contenu droite */}
          <div className="flex flex-col gap-6 lg:justify-center">
            <Link
              href={`/blog/categorie/${article.categorie.slug}`}
              className="self-start font-mono text-[12px] leading-4 tracking-[0.06em] text-success transition-colors hover:text-success/70"
            >
              {`// ${article.categorie.libelle.toLowerCase()}`}
            </Link>
            <h1 className="font-display text-[36px] font-semibold leading-10 tracking-tight text-ink lg:text-[56px] lg:leading-[58.8px]">
              {article.titre}
            </h1>
            {article.sousTitre && (
              <p className="max-w-[520px] font-display text-[18px] font-medium leading-7 text-ink-soft lg:text-[22px] lg:leading-[29.7px]">
                {article.sousTitre}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 pt-2">
              {avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar}
                  alt={article.auteur.nom}
                  className="h-8 w-8 flex-none rounded-full border border-paper-edge object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full font-display text-[12px] font-bold text-ink"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {initiales(article.auteur.nom)}
                </span>
              )}
              <span className="font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]">
                Par {article.auteur.nom}
              </span>
              <span aria-hidden className="text-paper-edge">·</span>
              <time
                dateTime={article.publishedAt}
                className="font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]"
              >
                {formatDateFr(article.publishedAt)}
              </time>
              <span aria-hidden className="text-paper-edge">·</span>
              <span className="font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]">
                {formatReadingTime(article.readingTime)} de lecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
