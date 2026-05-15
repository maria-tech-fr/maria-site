'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import type { ArticleCategorie, ArticleSort } from '../lib/article'

type BlogToolbarProps = {
  categories: ArticleCategorie[]
  activeCategorySlug: string | null
  /** « plus récents » par défaut. */
  sort: ArticleSort
  /** Recherche actuelle (depuis l'URL ?q=). */
  search: string
}

export default function BlogToolbar({
  categories,
  activeCategorySlug,
  sort,
  search,
}: BlogToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState(search)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSyncedValue = useRef(search)
  const searchInputId = useId()

  // Sync local state si l'URL change depuis ailleurs (back/forward).
  useEffect(() => {
    setSearchValue(search)
    lastSyncedValue.current = search
  }, [search])

  // Debounce 300ms pour pousser dans l'URL.
  useEffect(() => {
    if (searchValue === lastSyncedValue.current) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchValue.trim()) params.set('q', searchValue.trim())
      else params.delete('q')
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      lastSyncedValue.current = searchValue
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchValue, pathname, router, searchParams])

  function onSortChange(value: ArticleSort) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'recent') params.delete('sort')
    else params.set('sort', value)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <section
      aria-label="Filtres et recherche"
      className="border-b border-paper-edge bg-[#F9F9F9]"
    >
      <div className="flex flex-col gap-3 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-30.5 lg:py-6">
        {/* Chips catégories */}
        <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap items-center gap-2">
          <CategoryChip
            href="/blog"
            label="Tous"
            isActive={!activeCategorySlug}
          />
          {categories.map((cat) => (
            <CategoryChip
              key={cat.slug}
              href={`/blog/categorie/${cat.slug}`}
              label={cat.libelle}
              isActive={activeCategorySlug === cat.slug}
            />
          ))}
        </div>

        {/* Recherche au-dessus du tri */}
        <div className="flex flex-col items-stretch gap-2.5 lg:items-end">
          {/* Recherche */}
          <label htmlFor={searchInputId} className="sr-only">
            Rechercher dans les articles
          </label>
          <div className="relative flex items-center">
            <SearchIcon />
            <input
              id={searchInputId}
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Rechercher…"
              className="h-9.5 w-full rounded-full border border-paper-edge bg-paper pl-9 pr-3 font-work-sans text-[13px] text-ink placeholder:text-[#999] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 lg:w-56"
            />
          </div>
          {/* Tri */}
          <label className="sr-only" htmlFor={`${searchInputId}-sort`}>
            Trier les articles
          </label>
          <div className="relative w-full lg:w-56">
            <select
              id={`${searchInputId}-sort`}
              value={sort}
              onChange={(e) => onSortChange(e.target.value as ArticleSort)}
              className="h-9.5 w-full appearance-none rounded-full border border-paper-edge bg-paper pl-4 pr-9 font-work-sans text-[13px] font-medium leading-3.75 text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="recent">Plus récents</option>
              <option value="oldest">Plus anciens</option>
            </select>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryChip({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`inline-flex items-center rounded-full border px-3.5 py-2 font-medium text-[13px] leading-5 transition-colors duration-300 ease-out ${
        isActive
          ? 'border-accent bg-accent text-ink'
          : 'border-paper-edge bg-paper text-[#383838] hover:bg-paper-soft'
      }`}
    >
      {label}
    </Link>
  )
}

function SearchIcon() {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute left-3.5 text-[#888]"
    >
      <circle cx="5.83" cy="6.47" r="3.67" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8.73 9.44l2.28 2.28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
