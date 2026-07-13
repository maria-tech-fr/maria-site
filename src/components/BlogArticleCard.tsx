import Link from 'next/link'
import type { ArticleCard as ArticleCardData } from '../lib/article'
import { formatDateFr, formatReadingTime, imageAlt, imageSrc } from '../lib/blog'

export default function BlogArticleCard({ article }: { article: ArticleCardData }) {
  const cover = imageSrc(article.coverImage, 480, 640)
  const coverAlt = imageAlt(article.coverImage, article.titre)
  const articleHref = `/blog/${article.slug}`

  return (
    <article className="group flex h-full flex-col gap-4 transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <Link
        href={articleHref}
        className="block overflow-hidden rounded-lg aspect-3/4"
        aria-label={`Lire l'article : ${article.titre}`}
      >
        {cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cover}
            alt={coverAlt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#E8FFEE] via-[#FFFBEE] to-[#FFFBEE] transition-[filter] duration-500 ease-out group-hover:brightness-[1.02]">
            <span className="rounded-full bg-white/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#666]">
              photo · 3:4
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-2">
        <Link
          href={`/blog/categorie/${article.categorie.slug}`}
          className="self-start font-mono text-[11px] leading-4 tracking-[0.06em] text-success transition-colors hover:text-success/70"
        >
          {`// ${article.categorie.libelle.toLowerCase()}`}
        </Link>
        <h3 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[22px] lg:leading-6.75">
          <Link
            href={articleHref}
            className="inline align-baseline bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-[position:0_88%] transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]"
          >
            {article.titre}
          </Link>
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 pt-1 font-mono text-[12px] leading-4 tracking-[0.04em] text-[#666]">
          <span>{article.auteur.nom}</span>
          <span aria-hidden>·</span>
          <span>{formatDateFr(article.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{formatReadingTime(article.readingTime)}</span>
        </div>
      </div>
    </article>
  )
}
