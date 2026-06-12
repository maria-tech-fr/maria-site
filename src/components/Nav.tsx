'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from './Logo'
import { FAMILLES, type BesoinMenuItem } from '../lib/pageBesoin'
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

// Le mega-menu Besoins se nourrit désormais des items Sanity passés en prop
// (`besoins`), regroupés par famille via la metadata FAMILLES de pageBesoin.
type GroupedBesoin = {
  meta: typeof FAMILLES[number]
  items: BesoinMenuItem[]
}

function groupBesoinsByFamille(besoins: BesoinMenuItem[]): GroupedBesoin[] {
  return FAMILLES.map((meta) => ({
    meta,
    items: besoins
      .filter((b) => b.famille === meta.key)
      .sort((a, b) => a.ordreMenu - b.ordreMenu),
  })).filter((g) => g.items.length > 0)
}

export default function Nav({ services, besoins }: NavProps) {
  const pathname = usePathname()
  // Marque la section courante : un href est considéré « actif » si le
  // pathname commence par cet href (ex : /services/agents-ia → /services).
  // Pour /, on exige une égalité stricte.
  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const [mobileOpen, setMobileOpen] = useState(false)
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

  const besoinsGrouped = groupBesoinsByFamille(besoins)
  const totalBesoins = besoinsGrouped.reduce((n, g) => n + g.items.length, 0)
  const hasBesoins = totalBesoins > 0

  const hasServices = servicesItems.length > 0

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
            active={isActive('/services') || isActive('/formation')}
            open={desktopOpen === 'services'}
            wrapperRef={servicesWrapperRef}
            controlsId={servicesSubmenuId}
            onMouseEnter={() => openDesktop('services')}
            onMouseLeave={closeDesktopDelayed}
            onFocus={() => openDesktop('services')}
            onBlurOut={() => setDesktopOpen((cur) => (cur === 'services' ? null : cur))}
            onToggle={() =>
              setDesktopOpen((cur) => (cur === 'services' ? null : 'services'))
            }
          >
            <NavSubmenu
              id={servicesSubmenuId}
              ariaLabel="Sous-menu Services"
              pillarHref="/services"
              pillarLabel="Voir tous nos services"
              tone="accent"
              items={servicesItems}
              showNumero
              widthClass="lg:w-95"
              visible={desktopOpen === 'services'}
              onItemClick={() => setDesktopOpen(null)}
            />
          </DesktopTrigger>
        ) : (
          <NavLink href="/services" active={isActive('/services')}>
            Services
          </NavLink>
        )}

        {hasBesoins && (
          <DesktopTrigger
            label="Besoins"
            active={isActive('/besoins')}
            open={desktopOpen === 'besoins'}
            wrapperRef={besoinsWrapperRef}
            controlsId={besoinsSubmenuId}
            onMouseEnter={() => openDesktop('besoins')}
            onMouseLeave={closeDesktopDelayed}
            onFocus={() => openDesktop('besoins')}
            onBlurOut={() => setDesktopOpen((cur) => (cur === 'besoins' ? null : cur))}
            onToggle={() =>
              setDesktopOpen((cur) => (cur === 'besoins' ? null : 'besoins'))
            }
          >
            <NavBesoinsMega
              id={besoinsSubmenuId}
              grouped={besoinsGrouped}
              total={totalBesoins}
              visible={desktopOpen === 'besoins'}
              onItemClick={() => setDesktopOpen(null)}
            />
          </DesktopTrigger>
        )}

        {/* Entrée « Projets » retirée tant que la page n'a pas de contenu
            client à présenter — la page elle-même renvoie 404 pour l'instant. */}
        <NavLink href="/agence" active={isActive('/agence')}>
          L’agence
        </NavLink>
        <NavLink href="/blog" active={isActive('/blog')}>
          Journal
        </NavLink>
        <Link
          href="/contact"
          aria-current={isActive('/contact') ? 'page' : undefined}
          className="rounded-[5px] bg-accent px-4.5 py-2.75 text-sm font-medium font-work-sans text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
        >
          Parlons de votre projet
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-paper-soft transition-colors duration-300 ease-out lg:hidden"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
          <path
            d="M2 2h16M2 7h16M2 12h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Mobile menu — overlay plein écran, drill-down par section. Monté
          en permanence pour animer l'apparition/disparition. */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        services={servicesItems}
        besoinsGrouped={besoinsGrouped}
        isActive={isActive}
      />
    </nav>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-[5px] px-3.5 py-2 text-sm font-work-sans transition-colors duration-300 ease-out hover:bg-paper-soft ${
        active ? 'text-ink' : 'text-ink-soft'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={`rounded-[6px] px-4 py-3 text-sm font-work-sans transition-colors duration-300 ease-out hover:bg-paper-soft ${
        active ? 'text-ink' : 'text-ink-soft'
      }`}
    >
      {children}
    </Link>
  )
}

function DesktopTrigger({
  label,
  active,
  open,
  wrapperRef,
  controlsId,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlurOut,
  onToggle,
  children,
}: {
  label: string
  active: boolean
  open: boolean
  wrapperRef: React.RefObject<HTMLDivElement | null>
  controlsId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlurOut: () => void
  /** Tap / clic sur le trigger : toggle l'ouverture (essentiel sur tablette
   *  tactile, où il n'y a pas de hover réel ; sur desktop c'est un complément
   *  qui permet de fermer manuellement le sous-menu déjà ouvert). */
  onToggle: () => void
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
        aria-current={active ? 'page' : undefined}
        onClick={onToggle}
        className={`flex items-center gap-1.5 rounded-[5px] px-3.5 py-2 text-sm font-work-sans transition-colors duration-300 ease-out hover:bg-paper-soft ${
          active ? 'text-ink' : 'text-ink-soft'
        }`}
      >
        {label}
        <Chevron open={open} />
      </button>
      {children}
    </div>
  )
}

// ----------------------------------------------------------------------------
// MobileMenu — overlay plein écran avec drill-down par section
// ----------------------------------------------------------------------------

type MobileView = 'root' | 'services' | 'besoins'

function MobileMenu({
  open,
  onClose,
  services,
  besoinsGrouped,
  isActive,
}: {
  open: boolean
  onClose: () => void
  services: SubmenuItem[]
  besoinsGrouped: GroupedBesoin[]
  isActive: (href: string) => boolean
}) {
  const [view, setView] = useState<MobileView>('root')

  // Re-positionne sur la vue racine après fermeture (après la transition
  // d'opacité, sinon on voit le swap pendant qu'on ferme).
  useEffect(() => {
    if (open) return
    const id = setTimeout(() => setView('root'), 220)
    return () => clearTimeout(id)
  }, [open])

  // Verrouille le scroll de l'arrière-plan tant que le menu est ouvert.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Portal vers document.body : la <nav> parente a `backdrop-blur-lg`
  // (backdrop-filter), qui crée un containing block pour les éléments
  // `position: fixed` descendants. Sans portal, le menu serait positionné
  // par rapport à la barre de nav et non au viewport (overlay minuscule
  // dans la nav).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const hasServices = services.length > 0
  const hasBesoins = besoinsGrouped.length > 0

  const menu = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className={`fixed inset-0 z-[80] flex flex-col bg-paper transition-opacity duration-200 ease-out lg:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <header className="flex items-center justify-between border-b border-paper-edge px-5 py-4">
        {view === 'root' ? (
          <Link href="/" onClick={onClose} aria-label="maria — accueil" className="shrink-0">
            <Logo className="h-7 w-auto text-ink" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setView('root')}
            className="-ml-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-ink transition-colors duration-200 ease-out hover:bg-paper-soft"
            aria-label="Retour au menu principal"
          >
            <ChevronLeftIcon />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Menu
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors duration-200 ease-out hover:bg-paper-soft"
          aria-label="Fermer le menu"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8 pt-4">
        {view === 'root' && (
          <MobileRootView
            hasServices={hasServices}
            hasBesoins={hasBesoins}
            isActive={isActive}
            onOpenServices={() => setView('services')}
            onOpenBesoins={() => setView('besoins')}
            onClose={onClose}
          />
        )}
        {view === 'services' && (
          <MobileServicesView services={services} onClose={onClose} />
        )}
        {view === 'besoins' && (
          <MobileBesoinsView grouped={besoinsGrouped} onClose={onClose} />
        )}
      </div>
    </div>
  )

  if (!mounted) return null
  return createPortal(menu, document.body)
}

function MobileRootView({
  hasServices,
  hasBesoins,
  isActive,
  onOpenServices,
  onOpenBesoins,
  onClose,
}: {
  hasServices: boolean
  hasBesoins: boolean
  isActive: (href: string) => boolean
  onOpenServices: () => void
  onOpenBesoins: () => void
  onClose: () => void
}) {
  return (
    <nav className="flex h-full flex-col gap-1.5">
      {hasServices ? (
        <MobileSectionButton label="Services" onClick={onOpenServices} active={isActive('/services') || isActive('/formation')} />
      ) : (
        <MobileLink href="/services" onClick={onClose} active={isActive('/services')}>
          Services
        </MobileLink>
      )}
      {hasBesoins && (
        <MobileSectionButton label="Besoins" onClick={onOpenBesoins} active={isActive('/besoins')} />
      )}
      <MobileLink href="/agence" onClick={onClose} active={isActive('/agence')}>
        L’agence
      </MobileLink>
      <MobileLink href="/blog" onClick={onClose} active={isActive('/blog')}>
        Journal
      </MobileLink>
      <MobileLink href="/charte-ia" onClick={onClose} active={isActive('/charte-ia')}>
        Charte IA
      </MobileLink>
      <div className="mt-auto pt-6">
        <Link
          href="/contact"
          aria-current={isActive('/contact') ? 'page' : undefined}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3.5 text-[15px] font-work-sans font-medium text-ink transition-colors duration-300 ease-out hover:bg-accent-soft"
        >
          Parlons de votre projet
        </Link>
      </div>
    </nav>
  )
}

function MobileServicesView({
  services,
  onClose,
}: {
  services: SubmenuItem[]
  onClose: () => void
}) {
  return (
    <nav className="flex flex-col gap-1.5">
      <p className="px-3 pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-success">
        // services
      </p>
      <MobilePillarLink href="/services" label="Tous les services" onClick={onClose} />
      <div className="my-2 border-t border-paper-edge" />
      {services.map((s) => (
        <MobileItemLink key={s.href} href={s.href} title={s.titre} intro={s.intro} onClick={onClose} />
      ))}
      <div className="my-2 border-t border-dashed border-paper-edge" />
      <MobileItemLink
        href="/formation"
        title="Formation IA pour les équipes"
        intro="Service transversal — pour ancrer durablement."
        eyebrow="// transversal"
        onClick={onClose}
      />
    </nav>
  )
}

function MobileBesoinsView({
  grouped,
  onClose,
}: {
  grouped: GroupedBesoin[]
  onClose: () => void
}) {
  return (
    <nav className="flex flex-col gap-3">
      <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-success">
        // besoins
      </p>
      <MobilePillarLink href="/besoins" label="Tous les besoins" onClick={onClose} />
      <div className="my-1 border-t border-paper-edge" />
      {grouped.map((g) => (
        <div key={g.meta.key} className="flex flex-col gap-0.5 pt-1">
          <p className="flex items-center gap-2 px-3 pb-1 font-display text-[12.5px] font-semibold tracking-[-0.01em] text-ink">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {g.meta.titre}
          </p>
          {g.items.map((item) => (
            <Link
              key={item.slug}
              href={`/besoins/${item.slug}`}
              onClick={onClose}
              className="rounded-md px-6 py-2.5 text-[14px] font-work-sans text-ink transition-colors duration-200 ease-out hover:bg-paper-soft"
            >
              {item.titre}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}

function MobileSectionButton({
  label,
  onClick,
  active,
}: {
  label: string
  onClick: () => void
  active: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-md px-4 py-3.5 text-left font-display text-[18px] font-medium tracking-[-0.015em] transition-colors duration-200 ease-out hover:bg-paper-soft ${
        active ? 'text-ink' : 'text-ink'
      }`}
    >
      <span>{label}</span>
      <ChevronRightIcon />
    </button>
  )
}

function MobilePillarLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 transition-colors duration-200 ease-out hover:bg-paper-soft"
    >
      <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
        {label}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-success">
        →
      </span>
    </Link>
  )
}

function MobileItemLink({
  href,
  title,
  intro,
  eyebrow,
  onClick,
}: {
  href: string
  title: string
  intro: string | null
  eyebrow?: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex flex-col gap-1 rounded-md px-3 py-3 transition-colors duration-200 ease-out hover:bg-paper-soft"
    >
      {eyebrow && (
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-success">
          {eyebrow}
        </span>
      )}
      <span className="font-display text-[15.5px] font-medium tracking-[-0.01em] text-ink">
        {title}
      </span>
      {intro && (
        <span className="text-[13px] leading-snug text-ink-soft">{intro}</span>
      )}
    </Link>
  )
}

function CloseIcon() {
  // X aux proportions équilibrées (viewBox 24×24 carré, traits égaux).
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-ink-soft">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Chevron({ open }: { open: boolean }) {
  // Pictogramme +/− : la barre verticale se rétracte sur l'axe Y quand le
  // sous-menu s'ouvre. Animation plus posée qu'un flip de chevron.
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`transition-colors duration-300 ease-out ${
        open ? 'text-ink' : 'text-ink-soft'
      }`}
    >
      <line
        x1="2"
        y1="6"
        x2="10"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="2"
        x2="6"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className={`origin-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0.18,1)] ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
        style={{ transformBox: 'fill-box' }}
      />
    </svg>
  )
}

function NavSubmenu({
  id,
  ariaLabel,
  pillarHref,
  pillarLabel,
  tone,
  items,
  showNumero,
  widthClass,
  visible,
  onItemClick,
}: {
  id: string
  ariaLabel: string
  pillarHref: string
  pillarLabel: string
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
      className={`pointer-events-${visible ? 'auto' : 'none'} absolute left-1/2 top-full z-40 mt-7 w-90 ${widthClass} -translate-x-1/2 origin-top rounded-2xl border border-ink/6 bg-paper p-2 shadow-[0_4px_10px_-4px_rgba(33,33,33,0.08),0_20px_50px_-16px_rgba(33,33,33,0.22)] transition-all duration-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <PillarHeader href={pillarHref} label={pillarLabel} onClick={onItemClick} />
      <div className="mx-3 my-2 border-t border-paper-edge" />
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
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg border ${badgeBorder} ${badgeBg}`}
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

      {/* Entrée discrète : Formation (service transversal). Séparateur fin + lien
          compact, signalée sans être au même niveau que les 3 cards. */}
      {tone === 'accent' && (
        <div className="mt-2 border-t border-paper-edge pt-2">
          <Link
            href="/formation"
            role="menuitem"
            onClick={onItemClick}
            className="group flex items-center justify-between gap-3 rounded-lg px-5 py-2.5 transition-colors duration-300 ease-out hover:bg-paper-soft"
          >
            <span className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-success">
                // transversal
              </span>
              <span className="font-display text-[13.5px] font-semibold leading-[17px] tracking-[-0.01em] text-ink">
                Formation IA pour les équipes
              </span>
            </span>
            <Arrow />
          </Link>
        </div>
      )}
    </div>
  )
}

function formatNumero(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function PillarHeader({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: () => void
}) {
  // En-tête cliquable du méga-menu : pointe vers la page pilier (/services
  // ou /besoins). La flèche reste collée au label (pas de justify-between)
  // pour rester cohérente entre les deux sous-menus.
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-[10px] px-3 py-2 transition-colors duration-300 ease-out hover:bg-paper-soft"
    >
      <span className="font-display text-[13px] font-semibold leading-5 tracking-[-0.01em] text-ink">
        {label}
      </span>
      <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.06em] text-success transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  )
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

// ----------------------------------------------------------------------------
// NavBesoinsMega — mega-menu desktop pour les besoins (5 familles, N items)
// ----------------------------------------------------------------------------
function NavBesoinsMega({
  id,
  grouped,
  total,
  visible,
  onItemClick,
}: {
  id: string
  grouped: GroupedBesoin[]
  total: number
  visible: boolean
  onItemClick: () => void
}) {
  return (
    <div
      id={id}
      role="menu"
      aria-label="Sous-menu Besoins par familles"
      className={`pointer-events-${visible ? 'auto' : 'none'} absolute left-1/2 top-full z-40 mt-7 w-[min(92vw,920px)] -translate-x-1/2 origin-top rounded-2xl border border-ink/6 bg-paper p-2 shadow-[0_4px_10px_-4px_rgba(33,33,33,0.08),0_20px_50px_-16px_rgba(33,33,33,0.22)] transition-all duration-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <PillarHeader
          href="/besoins"
          label="Voir tous les besoins"
          onClick={onItemClick}
        />
        <p className="pr-3 font-mono text-[10px] uppercase tracking-[0.06em] text-success">
          // {total} cas d’usage
        </p>
      </div>
      <div className="mx-3 my-2 border-t border-paper-edge" />

      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {grouped.map((g) => (
          <FamilleColumn key={g.meta.key} group={g} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
  )
}

function FamilleColumn({
  group,
  onItemClick,
}: {
  group: GroupedBesoin
  onItemClick: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 rounded-lg bg-accent-tint px-3.5 py-2.5">
        <p className="flex items-center gap-2 font-display text-[13.5px] font-semibold leading-5 tracking-[-0.01em] text-ink">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {group.meta.titre}
        </p>
        <p className="pl-3.5 text-[11.5px] leading-4 text-ink-soft">{group.meta.tagline}</p>
      </div>
      <ul className="flex flex-col px-1">
        {group.items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/besoins/${item.slug}`}
              role="menuitem"
              onClick={onItemClick}
              className="group flex items-center justify-between gap-3 rounded-[6px] px-3 py-2 transition-colors duration-300 ease-out hover:bg-paper-soft"
            >
              <span className="text-[13px] leading-[18px] text-ink">
                {item.titre}
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

