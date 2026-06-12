import Image from 'next/image'
import Link from 'next/link'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { ArticleCard } from '../lib/article'
import { avatarSrc, formatDateFr, formatReadingTime, imageAlt, imageSrc, initiales } from '../lib/blog'

export default function BlogFeaturedArticle({ article }: { article: ArticleCard }) {
  const cover = imageSrc(article.coverImage, 720, 900)
  const coverAlt = imageAlt(article.coverImage, article.titre)
  const avatar = avatarSrc(article.auteur, 64)

  return (
    <section className="relative overflow-hidden bg-[#FFFBEE] px-6 py-16 lg:px-50.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.50, x: '8%', y: '12%', size: 720, blur: 50, duration: 38 },
          { color: '#3FC163', alpha: 0.30, x: '92%', y: '88%', size: 620, blur: 45, duration: 42 },
        ]}
      />

      <div className="relative flex flex-col gap-7 lg:gap-10">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            // à la une
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image / placeholder gradient */}
          <Reveal delay={100}>
            <Link
              href={`/blog/${article.slug}`}
              className="group relative block overflow-hidden rounded-lg aspect-4/5 lg:aspect-auto lg:h-full"
              aria-label={`Lire l'article : ${article.titre}`}
            >
              {cover ? (
                <Image
                  src={cover}
                  alt={coverAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#E8FFEE] to-[#FFFBEE]">
                  <span className="rounded-full bg-white/85 px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-[#666]">
                    photo · portrait 4:5
                  </span>
                </div>
              )}
            </Link>
          </Reveal>

          {/* Texte */}
          <Reveal delay={160}>
            <div className="flex h-full flex-col justify-center gap-4 lg:gap-5">
              <Link
                href={`/blog/categorie/${article.categorie.slug}`}
                className="self-start font-mono text-[11px] leading-4 tracking-[0.06em] text-success transition-colors hover:text-success/70"
              >
                {`// ${article.categorie.libelle.toLowerCase()}`}
              </Link>
              <h2 className="font-display text-[32px] font-semibold leading-[38px] tracking-tight text-ink lg:text-[48px] lg:leading-[52.8px]">
                <Link href={`/blog/${article.slug}`} className="transition-opacity hover:opacity-80">
                  {article.titre}
                </Link>
              </h2>
              {article.intro && (
                <p className="max-w-[520px] whitespace-pre-line pt-2 text-[15px] leading-6 text-[#383838] lg:text-[17px] lg:leading-[27.2px]">
                  {article.intro}
                </p>
              )}
              {/* Méta auteur compactée sur mobile : font 10.5px + gap-2
                  + avatar 7×7 → laisse place au nom + date + temps de
                  lecture sur une seule ligne en iPhone 13 standard. */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 lg:gap-x-3">
                {avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={avatar}
                    alt={article.auteur.nom}
                    className="h-7 w-7 flex-none rounded-full border border-paper-edge object-cover lg:h-8 lg:w-8"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full font-display text-[12px] font-bold text-ink lg:h-8 lg:w-8 lg:text-[13px]"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {initiales(article.auteur.nom)}
                  </span>
                )}
                <span className="font-mono text-[10.5px] leading-4 tracking-[0.04em] text-[#666] lg:text-[12px]">
                  {article.auteur.nom}
                </span>
                <span aria-hidden className="text-[#666]">·</span>
                <span className="font-mono text-[10.5px] leading-4 tracking-[0.04em] text-[#666] lg:text-[12px]">
                  {formatDateFr(article.publishedAt)}
                </span>
                <span aria-hidden className="text-[#666]">·</span>
                <span className="font-mono text-[10.5px] leading-4 tracking-[0.04em] text-[#666] lg:text-[12px]">
                  {formatReadingTime(article.readingTime)}
                </span>
              </div>
              <Link
                href={`/blog/${article.slug}`}
                className="self-start pt-3 font-medium text-[15px] leading-6 text-success underline decoration-success/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-success"
              >
                Lire l’article →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
