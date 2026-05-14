'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import BlogArticleCard from './BlogArticleCard'
import BlogPromoCard from './BlogPromoCard'
import Reveal from './Reveal'
import type { ArticleCard, ArticleSort } from '../lib/article'
import { loadMoreArticles } from '../lib/blogActions'
import {
  type GridItem,
  type PromoForGrid,
  interleavePromos,
} from '../lib/blog'

type BlogListingSectionProps = {
  initialArticles: ArticleCard[]
  total: number
  promos: PromoForGrid[]
  filters: {
    category: string | null
    search: string
    sort: ArticleSort
  }
  excludeSlug: string | null
  /** Combien d'articles charger à chaque clic. Défaut 12. */
  pageSize?: number
}

export default function BlogListingSection({
  initialArticles,
  total,
  promos,
  filters,
  excludeSlug,
  pageSize = 12,
}: BlogListingSectionProps) {
  const [extraArticles, setExtraArticles] = useState<ArticleCard[]>([])
  const [isPending, startTransition] = useTransition()
  const [done, setDone] = useState(initialArticles.length >= total)

  const totalShown = initialArticles.length + extraArticles.length
  const hasResults = totalShown > 0

  function onLoadMore() {
    startTransition(async () => {
      const next = await loadMoreArticles({
        ...filters,
        start: totalShown,
        end: totalShown + pageSize,
        excludeSlug,
      })
      setExtraArticles((prev) => [...prev, ...next])
      if (next.length < pageSize || totalShown + next.length >= total) {
        setDone(true)
      }
    })
  }

  const initialItems = interleavePromos(initialArticles, promos)
  const extraItems: GridItem[] = extraArticles.map((a) => ({ kind: 'article', data: a }))

  return (
    <section
      aria-label="Articles du journal"
      className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <div className="flex flex-col gap-12">
        {hasResults ? (
          <>
            <Grid items={initialItems} />
            {extraItems.length > 0 && <Grid items={extraItems} />}

            <div className="flex flex-col items-center gap-4">
              {!done ? (
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={isPending}
                  className="inline-flex items-center justify-center rounded-full border border-success px-6 py-3.5 font-semibold text-[14px] leading-5 text-success transition-colors duration-300 ease-out hover:bg-success hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? 'Chargement…' : 'Charger plus d’articles →'}
                </button>
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  Tous les articles affichés
                </p>
              )}
              <p className="font-mono text-[11px] leading-4 tracking-[0.06em] text-[#888]">
                Affichage : {totalShown} sur {total} article{total > 1 ? 's' : ''}
              </p>
            </div>
          </>
        ) : (
          <EmptyState category={filters.category} />
        )}
      </div>
    </section>
  )
}

function Grid({ items }: { items: GridItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) =>
        item.kind === 'article' ? (
          <Reveal key={`a-${item.data.slug}`} delay={Math.min(i * 40, 320)}>
            <BlogArticleCard article={item.data} />
          </Reveal>
        ) : (
          <Reveal key={`p-${item.data.position}-${i}`} delay={Math.min(i * 40, 320)}>
            <BlogPromoCard promo={item.data} />
          </Reveal>
        ),
      )}
    </div>
  )
}

function EmptyState({ category }: { category: string | null }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[8px] border border-paper-edge bg-paper-soft px-8 py-20 text-center">
      <p className="font-display text-[22px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[24px]">
        Aucun article {category ? 'dans cette catégorie ' : ''}pour le moment.
      </p>
      <p className="max-w-md text-[15px] leading-6 text-ink-soft">
        Soit les filtres sont trop restrictifs, soit on a juste pas encore publié l’article qu’il faut. Reviens vite.
      </p>
      <Link
        href="/blog"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 font-medium text-[14px] leading-5 text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
      >
        Voir tous les articles
      </Link>
    </div>
  )
}
