import Link from 'next/link'
import JsonLd from './JsonLd'
import { absUrl, buildBreadcrumbSchema } from '../lib/schema'

/*
  Fil d'Ariane signature maria — remplace l'ancien sur-titre « // … » du
  Hero sur toutes les pages profondes. Format :

      // Accueil / Services / Audit & stratégie IA
      ─┬─ ───────  ────────   ──────────────────
       │   lien      lien        page courante
       │                         (non cliquable)
       préfixe DM Mono vert

  Source unique : les segments passés ici génèrent à la fois le rendu
  visible ET le BreadcrumbList JSON-LD (Schema.org) — pas de duplication
  côté page.

  Toute la signalétique // de SECTION (// le constat, // nos
  engagements, etc.) reste inchangée — ce composant ne touche qu'au
  sur-titre du Hero.
*/

export type BreadcrumbSegment = {
  /** Libellé visible et utilisé pour le schema. */
  label: string
  /** Chemin interne (`/services`, …). Absent = page courante (non cliquable). */
  href?: string
}

type Props = {
  segments: BreadcrumbSegment[]
  /**
   * `light` : fond clair (services, besoins, formation, blog, contact…).
   * `dark`  : fond sombre (DarkHero — agence, projets ; ArticleHero ; PillarHero).
   */
  tone?: 'light' | 'dark'
}

export default function Breadcrumb({ segments, tone = 'light' }: Props) {
  if (!segments || segments.length === 0) return null

  // Couleurs adaptées au fond. On garde le // vert success dans les 2 cas
  // (signature de marque), mais on ajuste les segments + séparateurs pour
  // rester lisibles sur sombre.
  const accent = tone === 'dark' ? 'text-success-soft' : 'text-success'
  const link = tone === 'dark' ? 'text-success-soft hover:text-paper' : 'text-success hover:text-ink'
  const current = tone === 'dark' ? 'text-success-soft/60' : 'text-success/60'
  const separator = tone === 'dark' ? 'text-success-soft/40' : 'text-success/40'

  // URL absolue à utiliser pour le segment courant dans le schema
  // (BreadcrumbList exige un `item` non-null sur la dernière entrée).
  const lastWithHref = (() => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i].href) return segments[i].href!
    }
    return '/'
  })()

  return (
    <>
      <nav
        aria-label="Fil d’Ariane"
        className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em]"
      >
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li aria-hidden className={`${accent} pr-0.5`}>//</li>
          {segments.map((seg, i) => {
            const isLast = i === segments.length - 1
            return (
              <li
                key={`${i}-${seg.label}`}
                // `min-w-0` permet à l'item de wrap correctement quand un
                // segment est très long ; combiné à `break-words` sur le
                // segment courant, on évite tout débordement / scroll
                // horizontal sur mobile et tablette portrait.
                className="flex min-w-0 items-center gap-x-1.5"
              >
                {seg.href && !isLast ? (
                  <Link
                    href={seg.href}
                    className={`${link} transition-colors duration-300 ease-out`}
                  >
                    {seg.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    // `break-words` autorise la coupure interne pour le
                    // segment courant uniquement — les parents restent
                    // intacts (règle du brief responsive).
                    className={`${current} break-words`}
                  >
                    {seg.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden className={separator}>
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Schema BreadcrumbList — dérivé du même tableau de segments.
          Le dernier segment sans href reçoit l'URL canonique de la page
          (déduite du dernier href connu ou « / » en fallback). */}
      <JsonLd
        data={buildBreadcrumbSchema(
          segments.map((s) => ({
            name: s.label,
            url: absUrl(s.href ?? lastWithHref),
          })),
        )}
      />
    </>
  )
}
