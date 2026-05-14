'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import Logo from './Logo'
import type { BesoinMenuItem } from '../lib/pageBesoin'
import type { ServiceMenuItem } from '../lib/pageService'

type NavProps = {
  services: ServiceMenuItem[]
  besoins: BesoinMenuItem[]
}

// Petit délai avant fermeture du submenu pour permettre à la souris
// de transiter du trigger au panel sans le faire disparaître.
const HOVER_CLOSE_DELAY = 140

type SubmenuTone = 'accent' | 'success'

type SubmenuItem = {
  href: string
  titre: string
  ordre: number
  intro: string | null
  picto: { url: string } | null
}

export default function Nav({ services, besoins }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false)
  const [mobileBesoinsExpanded, setMobileBesoinsExpanded] = useState(false)
  // Un seul sous-menu desktop ouvert à la fois (services xor besoins).
  const [desktopOpen, setDesktopOpen] = useState<null | 'services' | 'besoins'>(null)

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesWrapperRef = useRef<HTMLDivElement>(null)
  const besoinsWrapperRef = useRef<HTMLDivElement>(null)
  const servicesSubmenuId = useId()
  const besoinsSubmenuId = useId()

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function openDesktop(which: 'services' | 'besoins') {
    clearCloseTimer()
    setDesktopOpen(which)
  }

  function closeDesktopDelayed() {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setDesktopOpen(null)
    }, HOVER_CLOSE_DELAY)
  }

  // Escape ferme tout.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDesktopOpen(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Click en dehors ferme le sous-menu desktop.
  useEffect(() => {
    if (!desktopOpen) return
    function onClick(e: MouseEvent) {
      const target = e.target as Node
      const inServices = servicesWrapperRef.current?.contains(target) ?? false
      const inBesoins = besoinsWrapperRef.current?.contains(target) ?? false
      if (!inServices && !inBesoins) setDesktopOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [desktopOpen])

  useEffect(() => () => clearCloseTimer(), [])

  const servicesItems: SubmenuItem[] = services.map((s) => ({
    href: `/services/${s.slug}`,
    titre: s.titre,
    ordre: s.ordreMenu,
    intro: s.introCourte,
    picto: s.pictoMenu?.asset ? { url: s.pictoMenu.asset.url } : null,
  }))

  const besoinsItems: SubmenuItem[] = besoins.map((b) => ({
    href: `/besoins/${b.slug}`,
    titre: b.titre,
    ordre: b.ordreMenu,
    intro: b.introCourte,
    picto: b.pictoMenu?.asset ? { url: b.pictoMenu.asset.url } : null,
  }))

  const hasServices = servicesItems.length > 0
  const hasBesoins = besoinsItems.length > 0

  return (
    <nav className="relative backdrop-blur-lg bg-white/78 border border-ink/6 rounded-[10px] flex items-center justify-between pl-5 pr-1.5 py-1.5 shadow-sm lg:pl-8">
      <Link
        href="/"
        className="flex items-center shrink-0"
        aria-label="maria — accueil"
        onClick={() => setMobileOpen(false)}
      >
        <Logo className="h-7 w-auto text-ink" />
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-2 lg:flex">
        {hasServices ? (
          <DesktopTrigger
            label="Services"
            open={desktopOpen === 'services'}
            wrapperRef={servicesWrapperRef}
            controlsId={servicesSubmenuId}
            onMouseEnter={() => openDesktop('services')}
            onMouseLeave={closeDesktopDelayed}
            onFocus={() => openDesktop('services')}
            onBlurOut={() => setDesktopOpen((cur) => (cur === 'services' ? null : cur))}
          >
            <NavSubmenu
              id={servicesSubmenuId}
              ariaLabel="Sous-menu Services"
              header={`// ${servicesItems.length} expertise${servicesItems.length > 1 ? 's' : ''}`}
              tone="accent"
              items={servicesItems}
              showNumero
              widthClass="lg:w-95"
              visible={desktopOpen === 'services'}
              onItemClick={() => setDesktopOpen(null)}
            />
          </DesktopTrigger>
        ) : (
          <Link
            href="/services"
            className="rounded-[5px] px-3.5 py-2 text-sm font-work-sans text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-soft"
          >
            Services
          </Link>
        )}

        {hasBesoins ? (
          <DesktopTrigger
            label="Besoins"
            open={desktopOpen === 'besoins'}
            wrapperRef={besoinsWrapperRef}
            controlsId={besoinsSubmenuId}
            onMouseEnter={() => openDesktop('besoins')}
            onMouseLeave={closeDesktopDelayed}
            onFocus={() => openDesktop('besoins')}
            onBlurOut={() => setDesktopOpen((cur) => (cur === 'besoins' ? null : cur))}
          >
            <NavSubmenu
              id={besoinsSubmenuId}
              ariaLabel="Sous-menu Besoins"
              header="// par cas d’usage"
              tone="success"
              items={besoinsItems}
              showNumero={false}
              widthClass="lg:w-110"
              visible={desktopOpen === 'besoins'}
              onItemClick={() => setDesktopOpen(null)}
            />
          </DesktopTrigger>
        ) : null}

        <Link
          href="/projets"
          className="rounded-[5px] px-3.5 py-2 text-sm font-work-sans text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-soft"
        >
          Projets
        </Link>
        <Link
          href="/agence"
          className="rounded-[5px] px-3.5 py-2 text-sm font-work-sans text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-soft"
        >
          L’agence
        </Link>
        <Link
          href="/contact"
          className="rounded-[5px] bg-accent px-4.5 py-2.75 text-sm font-medium font-work-sans text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
        >
          Parlons de votre projet
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-[8px] text-ink hover:bg-paper-soft transition-colors duration-300 ease-out lg:hidden"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
          {mobileOpen ? (
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
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full mt-3 flex flex-col gap-1 rounded-[10px] border border-ink/6 bg-white/95 p-3 shadow-lg backdrop-blur-lg lg:hidden">
          {hasServices ? (
            <MobileExpand
              label="Services"
              items={servicesItems}
              expanded={mobileServicesExpanded}
              setExpanded={setMobileServicesExpanded}
              closeAll={() => {
                setMobileOpen(false)
                setMobileServicesExpanded(false)
              }}
            />
          ) : (
            <Link
              href="/services"
              className="rounded-[6px] px-4 py-3 text-sm font-work-sans text-ink-soft hover:bg-paper-soft transition-colors duration-300 ease-out"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
          )}

          {hasBesoins && (
            <MobileExpand
              label="Besoins"
              items={besoinsItems}
              expanded={mobileBesoinsExpanded}
              setExpanded={setMobileBesoinsExpanded}
              closeAll={() => {
                setMobileOpen(false)
                setMobileBesoinsExpanded(false)
              }}
            />
          )}

          <Link
            href="/projets"
            className="rounded-[6px] px-4 py-3 text-sm font-work-sans text-ink-soft hover:bg-paper-soft transition-colors duration-300 ease-out"
            onClick={() => setMobileOpen(false)}
          >
            Projets
          </Link>
          <Link
            href="/agence"
            className="rounded-[6px] px-4 py-3 text-sm font-work-sans text-ink-soft hover:bg-paper-soft transition-colors duration-300 ease-out"
            onClick={() => setMobileOpen(false)}
          >
            L’agence
          </Link>
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-[5px] bg-accent px-4 py-3 text-sm font-work-sans font-medium text-ink hover:bg-accent-soft transition-colors duration-500 ease-in-out"
            onClick={() => setMobileOpen(false)}
          >
            Parlons de votre projet
          </Link>
        </div>
      )}
    </nav>
  )
}

function DesktopTrigger({
  label,
  open,
  wrapperRef,
  controlsId,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlurOut,
  children,
}: {
  label: string
  open: boolean
  wrapperRef: React.RefObject<HTMLDivElement | null>
  controlsId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlurOut: () => void
  children: React.ReactNode
}) {
  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={(e) => {
        if (
          e.currentTarget instanceof Node &&
          !e.currentTarget.contains(e.relatedTarget as Node | null)
        ) {
          onBlurOut()
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={controlsId}
        className="flex items-center gap-1.5 rounded-[5px] px-3.5 py-2 text-sm font-work-sans text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-soft"
      >
        {label}
        <Chevron open={open} />
      </button>
      {children}
    </div>
  )
}

function MobileExpand({
  label,
  items,
  expanded,
  setExpanded,
  closeAll,
}: {
  label: string
  items: SubmenuItem[]
  expanded: boolean
  setExpanded: (v: boolean | ((p: boolean) => boolean)) => void
  closeAll: () => void
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center justify-between rounded-[6px] px-4 py-3 text-left text-sm font-work-sans text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-soft"
      >
        <span>{label}</span>
        <Chevron open={expanded} />
      </button>
      {expanded && (
        <div className="mt-1 flex flex-col gap-1 pl-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="rounded-[6px] px-4 py-2.5 text-sm font-work-sans text-ink transition-colors duration-300 ease-out hover:bg-paper-soft"
            >
              {item.titre}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

function Chevron({ open }: { open: boolean }) {
  // Pas de rotation : on signale l'état ouvert par un léger glissement vers
  // le bas + opacité pleine. Moins « cartoonish » qu'un flip 180°.
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className={`transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0.18,1)] ${
        open ? 'translate-y-0.5 text-ink opacity-100' : 'translate-y-0 text-ink-soft opacity-50'
      }`}
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavSubmenu({
  id,
  ariaLabel,
  header,
  tone,
  items,
  showNumero,
  widthClass,
  visible,
  onItemClick,
}: {
  id: string
  ariaLabel: string
  header: string
  tone: SubmenuTone
  items: SubmenuItem[]
  showNumero: boolean
  widthClass: string
  visible: boolean
  onItemClick: () => void
}) {
  // Tone : 'accent' = jaune (services), 'success' = vert (besoins).
  const badgeBg = tone === 'accent' ? 'bg-[#FFFBEE]' : 'bg-[#E8FFEE]'
  const badgeBorder =
    tone === 'accent'
      ? 'border-[rgba(254,194,60,0.3)]'
      : 'border-[rgba(63,193,99,0.3)]'
  const accentText = tone === 'accent' ? 'text-success' : 'text-success'

  return (
    <div
      id={id}
      role="menu"
      aria-label={ariaLabel}
      className={`pointer-events-${visible ? 'auto' : 'none'} absolute left-1/2 top-full z-40 mt-3 w-90 ${widthClass} -translate-x-1/2 origin-top rounded-[16px] border border-ink/6 bg-paper p-3.25 shadow-[0_4px_10px_-4px_rgba(33,33,33,0.08),0_20px_50px_-16px_rgba(33,33,33,0.22)] transition-all duration-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <p className="px-5 pb-2.5 pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
        {header}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              role="menuitem"
              onClick={onItemClick}
              className="group flex items-center gap-4 rounded-[10px] p-3.5 transition-colors duration-300 ease-out hover:bg-paper-soft"
            >
              <span
                aria-hidden
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-[8px] border ${badgeBorder} ${badgeBg}`}
              >
                {item.picto ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.picto.url}
                    alt=""
                    className="h-4.5 w-4.5 object-contain"
                  />
                ) : (
                  <DefaultPicto tone={tone} index={i} />
                )}
              </span>
              <span className="flex flex-1 flex-col gap-0.5">
                {showNumero && (
                  <span className={`font-mono text-[10px] leading-4 tracking-[0.06em] ${accentText}`}>
                    {formatNumero(item.ordre)}
                  </span>
                )}
                <span className="font-display text-[15px] font-semibold leading-[18px] tracking-[-0.01em] text-ink">
                  {item.titre}
                </span>
                {item.intro && (
                  <span className="whitespace-pre-line text-[12.5px] leading-[17.5px] text-ink-soft">
                    {item.intro}
                  </span>
                )}
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatNumero(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="flex-none text-ink-soft/0 transition-all duration-300 ease-out group-hover:text-ink-soft group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h9M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DefaultPicto({ tone, index }: { tone: SubmenuTone; index: number }) {
  const stroke = tone === 'accent' ? '#FEC23C' : '#3FC163'
  // Pictos par défaut (lucide-style) en attendant les uploads BO. Pattern
  // commun : 5 motifs cycliques selon l'index pour varier visuellement.
  const paths: React.ReactNode[] = [
    // 0 — loupe (audit, exploration, données)
    <g key="i0">
      <circle cx="8" cy="8" r="4.5" />
      <path d="M11.5 11.5l3.5 3.5" />
    </g>,
    // 1 — engrenage (process, outil, conception)
    <g key="i1">
      <circle cx="9" cy="9" r="2" />
      <path d="M9 1.5v2.5M9 14v2.5M1.5 9h2.5M14 9h2.5M3.6 3.6l1.7 1.7M12.7 12.7l1.7 1.7M3.6 14.4l1.7-1.7M12.7 5.3l1.7-1.7" />
    </g>,
    // 2 — bulle (communication, chat)
    <g key="i2">
      <path d="M2.5 4.5h13v8H7l-3 3v-3H2.5z" />
    </g>,
    // 3 — éclair (automatisation, vitesse)
    <g key="i3">
      <path d="M10 1.5L4 10h4l-1 6.5L13 8h-4l1-6.5z" />
    </g>,
    // 4 — utilisateurs (équipes, formation)
    <g key="i4">
      <circle cx="7" cy="6" r="2.5" />
      <path d="M2 16c0-3 2.2-5 5-5s5 2 5 5" />
      <circle cx="13" cy="5" r="2" />
      <path d="M11 11c2.5 0 5 1.5 5 4.5" />
    </g>,
  ]
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[index % paths.length]}
    </svg>
  )
}
