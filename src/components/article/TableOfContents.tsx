'use client'

import { useEffect, useState } from 'react'
import type { TocResolvedItem } from '../../lib/articleHelpers'

/**
 * Sommaire sticky desktop avec scroll spy (IntersectionObserver).
 * Met l'item actif en évidence (couleur + barre verticale verte à gauche).
 * Click smooth scroll vers l'anchor (offset 96px sous la nav).
 */
export default function TableOfContents({ items }: { items: TocResolvedItem[] }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(items[0]?.anchor ?? null)

  useEffect(() => {
    if (items.length === 0) return
    const elements = items
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // On prend la première section visible "près du haut" (rootMargin l'oriente).
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0 && visible[0].target.id) {
          setActiveAnchor(visible[0].target.id)
        }
      },
      {
        // déclenche quand le H2 est dans la bande [-30%, -70%] du viewport.
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  function onClick(e: React.MouseEvent<HTMLAnchorElement>, anchor: string) {
    e.preventDefault()
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', `#${anchor}`)
  }

  if (items.length === 0) return null

  return (
    <aside aria-label="Sommaire de l'article" className="hidden lg:block">
      <nav>
        <p className="pb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          Sommaire
        </p>
        <ol className="flex flex-col gap-2.5 border-l border-paper-edge">
          {items.map((item) => {
            const isActive = activeAnchor === item.anchor
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  onClick={(e) => onClick(e, item.anchor)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative -ml-px block border-l-2 py-1 pl-4 text-[14px] leading-5 transition-colors duration-200 ease-out ${
                    isActive
                      ? 'border-l-success font-medium text-ink'
                      : 'border-l-transparent text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </aside>
  )
}
