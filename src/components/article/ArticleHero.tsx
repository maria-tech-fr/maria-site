import Link from 'next/link'
import type { Article } from '../../lib/article'
import { avatarSrc, formatDateFr, formatReadingTime, imageAlt, imageSrc, initiales } from '../../lib/blog'
import Breadcrumb from './Breadcrumb'

export default function ArticleHero({ article }: { article: Article }) {
  const cover = imageSrc(article.coverImage, 1600, 900)
  const coverAlt = imageAlt(article.coverImage, article.titre)
  const avatar = avatarSrc(article.auteur, 64)

  return (
    <header className="bg-paper px-6 pb-12 pt-36 lg:px-30.5 lg:pb-16 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Journal', href: '/blog' },
            {
              label: article.categorie.libelle,
              href: `/blog/categorie/${article.categorie.slug}`,
            },
            { label: article.titre },
          ]}
        />

        <div className="flex flex-col gap-5">
          <Link
            href={`/blog/categorie/${article.categorie.slug}`}
            className="self-start font-mono text-[12px] leading-4 tracking-[0.06em] text-success transition-colors hover:text-success/70"
          >
            {`// ${article.categorie.libelle.toLowerCase()}`}
          </Link>
          <h1 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.035em] text-ink lg:text-[60px] lg:leading-[64px]">
            {article.titre}
          </h1>
          {article.sousTitre && (
            <p className="max-w-[800px] text-[18px] leading-[27px] text-ink-soft lg:text-[20px] lg:leading-[30px]">
              {article.sousTitre}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {avatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={avatar}
              alt={article.auteur.nom}
              className="h-9 w-9 flex-none rounded-full border border-paper-edge object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full font-display text-[13px] font-bold text-ink"
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
            {article.auteur.nom}
          </span>
          <span aria-hidden className="text-[#666]">·</span>
          <time
            dateTime={article.publishedAt}
            className="font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]"
          >
            {formatDateFr(article.publishedAt)}
          </time>
          <span aria-hidden className="text-[#666]">·</span>
          <span className="font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]">
            {formatReadingTime(article.readingTime)}
          </span>
        </div>

        {/* Image de couverture */}
        <div className="mt-4 overflow-hidden rounded-[10px] aspect-[16/9]">
          {cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={cover}
              alt={coverAlt}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8FFEE] via-[#FFFBEE] to-[#FFFBEE]">
              <span className="rounded-full bg-white/85 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-[#666]">
                photo · 16:9
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
