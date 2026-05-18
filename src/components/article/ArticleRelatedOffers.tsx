import Link from 'next/link'
import type { RelatedOffer } from '../../lib/article'

/*
  Bloc « Sur ce sujet, chez maria » — affiché sous le sommaire sticky.
  Renforce le maillage interne business (services / besoins / formation /
  charte) sans rompre le ton article. Volontairement sobre (texte + arrow).
*/

const KIND_LABEL: Record<RelatedOffer['kind'], string> = {
  service: 'Service',
  besoin: 'Besoin',
  formation: 'Formation',
  charte: 'Charte',
}

export default function ArticleRelatedOffers({ items }: { items: RelatedOffer[] }) {
  if (!items || items.length === 0) return null
  return (
    <aside aria-labelledby="article-related-offers" className="rounded-[10px] border border-paper-edge bg-paper-soft px-5 py-5">
      <p
        id="article-related-offers"
        className="font-mono text-[10px] uppercase leading-4 tracking-[0.08em] text-success"
      >
        // sur ce sujet, chez maria
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((offer) => (
          <li key={offer.href}>
            <Link
              href={offer.href}
              className="group flex items-baseline justify-between gap-3 text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:text-success"
            >
              <span className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft">
                  {KIND_LABEL[offer.kind]}
                </span>
                <span className="font-medium">{offer.label}</span>
              </span>
              <span aria-hidden className="font-mono text-[11px] text-ink-soft transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
