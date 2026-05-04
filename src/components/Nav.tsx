'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { libelle: 'Services', href: '/services' },
  { libelle: 'Projets', href: '/projets' },
  { libelle: 'L’agence', href: '/agence' },
] as const

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative backdrop-blur-lg bg-white/78 border border-ink/6 rounded-[10px] flex items-center justify-between pl-5 pr-1.5 py-1.5 shadow-sm lg:pl-8">
      <Link
        href="/"
        className="flex items-center shrink-0"
        aria-label="maria — accueil"
        onClick={() => setOpen(false)}
      >
        <Logo className="h-7 w-auto text-ink" />
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-2 lg:flex">
        <Link
          href="/services"
          className="px-3.5 py-2 text-sm font-work-sans text-ink-soft hover:bg-paper-soft rounded-[5px] transition-colors duration-300 ease-out"
        >
          Services
        </Link>
        <Link
          href="/projets"
          className="px-3.5 py-2 text-sm font-work-sans text-ink-soft hover:bg-paper-soft rounded-[5px] transition-colors duration-300 ease-out"
        >
          Projets
        </Link>
        <Link
          href="/agence"
          className="px-3.5 py-2 text-sm font-work-sans text-ink-soft hover:bg-paper-soft rounded-[5px] transition-colors duration-300 ease-out"
        >
          L’agence
        </Link>
        <Link
          href="/contact"
          className="px-4.5 py-2.75 bg-accent text-ink font-work-sans font-medium text-sm rounded-[5px] hover:bg-accent-soft transition-colors duration-500 ease-in-out"
        >
          Parlons de votre projet
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-[8px] text-ink hover:bg-paper-soft transition-colors duration-300 ease-out lg:hidden"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
          {open ? (
            <path
              d="M3 3l14 8M3 11l14-8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2 2h16M2 7h16M2 12h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full mt-3 flex flex-col gap-1 rounded-[10px] border border-ink/6 bg-white/95 p-3 shadow-lg backdrop-blur-lg lg:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[6px] px-4 py-3 text-sm font-work-sans text-ink-soft hover:bg-paper-soft transition-colors duration-300 ease-out"
              onClick={() => setOpen(false)}
            >
              {l.libelle}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-[5px] bg-accent px-4 py-3 text-sm font-work-sans font-medium text-ink hover:bg-accent-soft transition-colors duration-500 ease-in-out"
            onClick={() => setOpen(false)}
          >
            Parlons de votre projet
          </Link>
        </div>
      )}
    </nav>
  )
}
