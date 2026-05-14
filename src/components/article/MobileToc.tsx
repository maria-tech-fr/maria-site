'use client'

import { useState } from 'react'
import type { TocResolvedItem } from '../../lib/articleHelpers'

export default function MobileToc({ items }: { items: TocResolvedItem[] }) {
  const [open, setOpen] = useState(false)
  if (items.length === 0) return null

  function onItemClick(e: React.MouseEvent<HTMLAnchorElement>, anchor: string) {
    e.preventDefault()
    const el = document.getElementById(anchor)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', `#${anchor}`)
    setOpen(false)
  }

  return (
    <aside aria-label="Sommaire de l'article" className="lg:hidden">
      <div className="overflow-hidden rounded-[10px] border border-paper-edge bg-paper-soft">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            Sommaire
          </span>
          <ChevronToggle open={open} />
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <ol className="flex flex-col gap-1 border-t border-paper-edge px-5 py-3">
              {items.map((item) => (
                <li key={item.anchor}>
                  <a
                    href={`#${item.anchor}`}
                    onClick={(e) => onItemClick(e, item.anchor)}
                    className="block py-2 text-[14.5px] leading-5 text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </aside>
  )
}

function ChevronToggle({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="text-ink-soft"
    >
      <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line
        x1="6"
        y1="2"
        x2="6"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className={`origin-center transition-transform duration-300 ease-out ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
        style={{ transformBox: 'fill-box' }}
      />
    </svg>
  )
}
