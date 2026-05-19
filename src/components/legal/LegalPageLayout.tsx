import type { ReactNode } from 'react'
import Breadcrumb, { type BreadcrumbSegment } from '../Breadcrumb'

/*
  Layout commun des 3 pages légales (mentions, confidentialité, cookies).
  Gabarit sobre — colonne de lecture ~720px, fond clair, label DM Mono vert
  en sur-titre, pas d'animation, pas de halo. Ce sont des documents.
*/

type Props = {
  /** Sur-titre DM Mono vert, ex. « // mentions légales ». Fallback si
   *  `breadcrumb` n'est pas fourni. */
  surTitre: string
  /** H1 — unique de la page. */
  titre: string
  /** Sous-titre éventuel (optionnel) — chapô court sous le H1. */
  chapo?: string
  /** Date de dernière mise à jour affichée sous le hero. */
  derniereMaj: string
  /** Si fourni, remplace le sur-titre par un fil d'Ariane signature. */
  breadcrumb?: BreadcrumbSegment[]
  children: ReactNode
}

export default function LegalPageLayout({
  surTitre,
  titre,
  chapo,
  derniereMaj,
  breadcrumb,
  children,
}: Props) {
  return (
    <section className="bg-paper px-6 pb-22 pt-40 lg:px-30.5 lg:pb-30 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          {breadcrumb ? (
            <Breadcrumb segments={breadcrumb} tone="light" />
          ) : (
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-success">
              {surTitre}
            </p>
          )}
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink lg:text-[60px]">
            {titre}
          </h1>
          {chapo && (
            <p className="max-w-[640px] text-[17px] leading-7 text-ink-soft lg:text-[18px]">
              {chapo}
            </p>
          )}
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink-soft">
            Dernière mise à jour : {derniereMaj}
          </p>
        </header>

        <div className="flex flex-col gap-8 text-[16px] leading-7 text-ink-soft lg:text-[17px]">
          {children}
        </div>
      </div>
    </section>
  )
}

/** Section H2 + scroll-mt (pour permettre des liens d'ancre #id). */
export function LegalSection({
  title,
  anchorId,
  children,
}: {
  title: string
  anchorId?: string
  children: ReactNode
}) {
  return (
    <div id={anchorId} className="flex flex-col gap-3 scroll-mt-32">
      <h2 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink lg:text-[24px]">
        {title}
      </h2>
      {children}
    </div>
  )
}

/** Sous-section H3 — pour les pages avec hiérarchie plus fine. */
export function LegalSubsection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-display text-[17px] font-semibold leading-[1.3] tracking-[-0.015em] text-ink lg:text-[18px]">
        {title}
      </h3>
      {children}
    </div>
  )
}

/**
 * Tableau sémantique sobre — utilisé pour les politiques de confidentialité
 * et de cookies. Header gris clair, lignes séparées par un trait fin, scroll
 * horizontal sur mobile si la table dépasse.
 */
export function LegalTable({
  caption,
  headers,
  rows,
}: {
  caption?: string
  headers: string[]
  rows: string[][]
}) {
  return (
    <figure className="my-2 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left">
        {caption && (
          <caption className="caption-bottom pt-3 text-left font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b-2 border-ink/15 bg-paper-soft px-4 py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-paper-edge last:border-b-0">
              {row.map((c, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 align-top text-[14px] leading-[22px] text-ink lg:text-[15px] lg:leading-[24px]"
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
