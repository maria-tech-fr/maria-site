import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import type { ArticleBodyBlock } from '../../lib/article'
import { slugify } from '../../lib/articleHelpers'
import { urlFor } from '../../../sanity/lib/image'

/* ============================================================================
 * Custom Portable Text components
 * ============================================================================ */

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-6 text-[17px] leading-[28px] text-ink lg:text-[18px] lg:leading-[31px]">
        {children}
      </p>
    ),
    h2: ({ children, value }) => {
      const text = textFromBlock(value)
      const id = slugify(text)
      return (
        <h2
          id={id}
          className="mt-14 mb-5 scroll-mt-24 font-display text-[26px] font-semibold leading-8 tracking-[-0.02em] text-ink lg:text-[32px] lg:leading-10"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = textFromBlock(value)
      const id = slugify(text)
      return (
        <h3
          id={id}
          className="mt-10 mb-3 scroll-mt-24 font-display text-[20px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[22px] lg:leading-8"
        >
          {children}
        </h3>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-l-success pl-6 font-display text-[18px] italic leading-7 text-ink lg:text-[20px] lg:leading-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-1 flex flex-col gap-2 text-[17px] leading-[28px] text-ink lg:text-[18px] lg:leading-[31px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      // Style maria : compteur custom « 01 · » « 02 · » en DM Mono vert,
      // cohérent avec les sections numérotées du reste du site (méthode home,
      // étapes service, etc.). On retire la puce native pour reprendre la main.
      <ol className="my-6 flex flex-col gap-3 [counter-reset:article-item]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[17px] leading-[28px] text-ink lg:text-[18px] lg:leading-[31px]">
        <span aria-hidden className="mt-3 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li
        className="relative flex items-start gap-4 pl-0 text-[17px] leading-[28px] text-ink before:flex-none before:font-mono before:text-[13px] before:font-medium before:tracking-[0.06em] before:text-success before:content-[counter(article-item,decimal-leading-zero)] [counter-increment:article-item] lg:text-[18px] lg:leading-[31px]"
      >
        <span className="flex-1">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const blank: boolean = !!value?.blank
      const isInternal = href.startsWith('/') || href.startsWith('#')
      const isMariaDomain = href.includes('maria.tech')
      const treatAsInternal = isInternal || isMariaDomain
      if (treatAsInternal && href.startsWith('/')) {
        return (
          <Link
            href={href}
            className="font-medium text-ink underline decoration-success/60 decoration-1 underline-offset-2 transition-colors hover:text-success"
          >
            {children}
          </Link>
        )
      }
      const isExternalNewTab = blank || !treatAsInternal
      return (
        <a
          href={href}
          target={isExternalNewTab ? '_blank' : undefined}
          rel={isExternalNewTab ? 'noopener noreferrer' : undefined}
          className="font-medium text-ink underline decoration-accent/70 decoration-1 underline-offset-2 transition-colors hover:text-accent"
        >
          {children}
          {isExternalNewTab && <ExternalLinkIcon />}
        </a>
      )
    },
  },
  types: {
    imageBody: ({ value }) => {
      const asset = value?.asset
      if (!asset?._ref && !asset?._id) return null
      const url = urlFor(value).width(1200).fit('max').auto('format').url()
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.alt ?? ''}
            className="w-full rounded-lg border border-paper-edge"
            loading="lazy"
          />
          {value.legende && (
            <figcaption className="mt-3 text-center font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
              {value.legende}
            </figcaption>
          )}
        </figure>
      )
    },
    fullWidthImage: ({ value }) => {
      const asset = value?.image?.asset
      if (!asset?._ref && !asset?._id) return null
      const url = urlFor(value.image).width(1200).fit('max').auto('format').url()
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.image.alt ?? ''}
            className="w-full rounded-lg border border-paper-edge"
            loading="lazy"
          />
          {value.legende && (
            <figcaption className="mt-3 text-center font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
              {value.legende}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => (
      <aside
        className="my-10 rounded-[10px] border border-[rgba(63,193,99,0.35)] bg-[#E8FFEE] px-7 py-6"
      >
        <p className="pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-success">
          {value?.titre || 'À retenir'}
        </p>
        <p className="whitespace-pre-line text-[16px] leading-6 text-ink lg:text-[17px] lg:leading-[27px]">
          {value?.texte}
        </p>
      </aside>
    ),
    warning: ({ value }) => (
      <aside
        className="my-10 rounded-[10px] border border-[rgba(254,194,60,0.4)] bg-[#FFFBEE] px-7 py-6"
      >
        <p className="pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          {value?.titre || 'Point de vigilance'}
        </p>
        <p className="whitespace-pre-line text-[16px] leading-6 text-ink lg:text-[17px] lg:leading-[27px]">
          {value?.texte}
        </p>
      </aside>
    ),
    avisMaria: ({ value }) => (
      // Encart « Ce qu'on en pense chez maria » — bordure dégradée jaune↔vert
      // (même pattern d'animation que les ServiceCards de la home au hover,
      // ici toujours visible). Signature « — l'équipe maria » personnalisable.
      <aside className="group/avis relative my-10 rounded-[10px] bg-paper px-7 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[10px]"
          style={{
            padding: '1.5px',
            background:
              'linear-gradient(120deg, #FEC23C 0%, #3FC163 50%, #FEC23C 100%)',
            backgroundSize: '200% 100%',
            animation: 'border-drift 28s linear infinite',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <p className="relative pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          // {value?.titre || 'Ce qu’on en pense chez maria'}
        </p>
        <p className="relative whitespace-pre-line text-[16px] leading-[26px] text-ink lg:text-[17px] lg:leading-[28px]">
          {value?.texte}
        </p>
        <p className="relative mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-soft">
          {value?.signature || '— l’équipe maria'}
        </p>
      </aside>
    ),
    definition: ({ value }) => (
      // Encart définition — pattern « terme | définition », très extrait par
      // les IA. Rendu en <dl>/<dt>/<dd> pour sémantique HTML stricte.
      <aside className="my-10 rounded-[10px] border-l-[3px] border-l-accent bg-paper-soft px-6 py-5 lg:px-7 lg:py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          // définition
        </p>
        <dl className="mt-2 flex flex-col gap-1.5">
          <dt className="font-display text-[18px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[20px]">
            {value?.terme}
          </dt>
          <dd className="whitespace-pre-line text-[15px] leading-6 text-ink-soft lg:text-[16px] lg:leading-[26px]">
            {value?.definition}
          </dd>
        </dl>
      </aside>
    ),
    tableau: ({ value }) => {
      const headers: string[] = Array.isArray(value?.enTetes) ? value.enTetes : []
      type Ligne = { _key?: string; cellules?: string[] }
      const lignes: Ligne[] = Array.isArray(value?.lignes) ? value.lignes : []
      if (headers.length === 0 || lignes.length === 0) return null
      return (
        <figure className="my-10 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            {value?.legende && (
              <caption className="caption-bottom pt-3 text-center font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
                {value.legende}
              </caption>
            )}
            <thead>
              <tr>
                {headers.map((h: string, i: number) => (
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
              {lignes.map((ligne, ri) => {
                const cellules: string[] = Array.isArray(ligne?.cellules) ? ligne.cellules : []
                return (
                  <tr key={ligne._key ?? ri} className="border-b border-paper-edge last:border-b-0">
                    {cellules.map((c: string, ci: number) => (
                      <td
                        key={ci}
                        className="px-4 py-3 align-top text-[14px] leading-[22px] text-ink lg:text-[15px] lg:leading-[24px]"
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </figure>
      )
    },
    quoteAttribuee: ({ value }) => (
      // Citation attribuée — auteur + rôle visibles, améliore l'autorité GEO.
      // Différenciée de <blockquote> standard par l'attribution explicite.
      <figure className="my-10 border-l-2 border-l-ink pl-6">
        <blockquote className="font-display text-[18px] italic leading-7 text-ink lg:text-[20px] lg:leading-8">
          « {value?.texte} »
        </blockquote>
        <figcaption className="mt-3 text-[13px] leading-5 text-ink-soft">
          <span className="font-medium text-ink">{value?.auteur}</span>
          {value?.role && <span>, {value.role}</span>}
        </figcaption>
      </figure>
    ),
    video: ({ value }) => {
      const source: string = value?.source ?? 'url'
      // Fichier MP4 uploadé : balise <video> native HTML5 + poster optionnel.
      if (source === 'file') {
        const fileUrl: string | undefined = value?.fichier?.asset?.url
        if (!fileUrl) return null
        const mime: string = value?.fichier?.asset?.mimeType || 'video/mp4'
        const posterAsset = value?.cover?.asset
        const poster =
          posterAsset && (posterAsset._id || posterAsset._ref)
            ? urlFor(value.cover).width(1200).fit('max').auto('format').url()
            : undefined
        return (
          <figure className="my-10">
            <div className="overflow-hidden rounded-lg border border-paper-edge bg-paper-soft aspect-video">
              <video
                controls
                preload="metadata"
                poster={poster}
                className="h-full w-full bg-ink"
              >
                <source src={fileUrl} type={mime} />
                Votre navigateur ne supporte pas la lecture de cette vidéo.
              </video>
            </div>
            {value?.legende && (
              <figcaption className="mt-3 text-center font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
                {value.legende}
              </figcaption>
            )}
          </figure>
        )
      }
      // Lien YouTube/Vimeo/Loom : embed iframe.
      const url: string = value?.url ?? ''
      const embed = embedUrlFor(url)
      if (!embed) return null
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-lg border border-paper-edge bg-paper-soft aspect-video">
            <iframe
              src={embed}
              title={value?.legende || 'Vidéo'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          {value?.legende && (
            <figcaption className="mt-3 text-center font-mono text-[12px] leading-4 tracking-[0.04em] text-ink-soft">
              {value.legende}
            </figcaption>
          )}
        </figure>
      )
    },
    inArticleCta: ({ value }) => {
      const isYellow = value?.variant === 'yellow'
      const bg = isYellow ? 'bg-[#FFFBEE]' : 'bg-[#E8FFEE]'
      const borderColor = isYellow ? '#FEC23C' : '#3FC163'
      const label = value?.lienLibelle || 'Découvrir →'
      const href = value?.lienHref || '#'
      return (
        <aside
          className={`my-10 flex flex-col items-start justify-between gap-4 rounded-xl ${bg} px-6 py-4 sm:flex-row sm:items-center`}
          style={{ borderLeft: `3px solid ${borderColor}` }}
        >
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/60"
            >
              <CtaIcon isYellow={isYellow} />
            </span>
            <div className="flex flex-col">
              {value?.titre && (
                <h3 className="font-display text-[16px] font-semibold leading-[20.8px] tracking-[-0.015em] text-ink">
                  {value.titre}
                </h3>
              )}
              {value?.description && (
                <p className="pt-0.5 text-[13.5px] leading-[18.9px] text-ink-soft">
                  {value.description}
                </p>
              )}
            </div>
          </div>
          {href.startsWith('/') ? (
            <Link
              href={href}
              className="flex-none font-medium text-[14px] leading-5 text-ink underline underline-offset-2 transition-colors duration-300 ease-out hover:text-ink-soft"
            >
              {label}
            </Link>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none font-medium text-[14px] leading-5 text-ink underline underline-offset-2 transition-colors duration-300 ease-out hover:text-ink-soft"
            >
              {label}
            </a>
          )}
        </aside>
      )
    },
  },
}

/* ============================================================================
 * Helpers
 * ============================================================================ */

function ExternalLinkIcon() {
  // Petite flèche ↗ discrète, alignée sur la baseline du texte. Signale
  // qu'un lien ouvre un nouvel onglet (nouvelle fenêtre). Taille proche de
  // 0.85em pour ne pas dominer le texte alentour.
  return (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className="ml-1 inline-block align-baseline text-ink/60 transition-colors group-hover:text-accent"
      style={{ verticalAlign: 'baseline' }}
    >
      <path
        d="M4 3h5v5M9 3 3.5 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CtaIcon({ isYellow }: { isYellow: boolean }) {
  // Picto info simple — variante jaune ou vert. Style stroke-only minimal.
  const color = isYellow ? '#FEC23C' : '#3FC163'
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M9 6v0M9 8.5v4"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function textFromBlock(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const v = value as { children?: Array<{ _type?: string; text?: string }> }
  if (!Array.isArray(v.children)) return ''
  return v.children
    .filter((c) => c._type === 'span')
    .map((c) => c.text ?? '')
    .join('')
}

function embedUrlFor(url: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    // YouTube
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`
    }
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '')
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`
    }
    // Vimeo
    if (host === 'vimeo.com') {
      const id = u.pathname.replace(/^\//, '')
      if (/^\d+/.test(id)) return `https://player.vimeo.com/video/${id.split('/')[0]}`
    }
    // Loom
    if (host === 'loom.com' || host === 'www.loom.com') {
      const m = u.pathname.match(/share\/([a-z0-9]+)/i)
      if (m) return `https://www.loom.com/embed/${m[1]}`
    }
    return url
  } catch {
    return null
  }
}

/* ============================================================================
 * Garde-fou GEO : un H2 finissant par « ? » doit être suivi immédiatement
 * d'un paragraphe (la réponse autoportante extractible pour FAQPage / IA).
 * On warn en dev/build seulement — pas d'impact runtime sur le visiteur.
 * ============================================================================ */

function warnH2QuestionWithoutAnswer(body: ArticleBodyBlock[]): void {
  if (process.env.NODE_ENV === 'production') return
  for (let i = 0; i < body.length; i++) {
    const block = body[i] as { _type?: string; style?: string; children?: Array<{ text?: string }> }
    if (block?._type !== 'block' || block?.style !== 'h2') continue
    const text = (block.children ?? []).map((c) => c.text ?? '').join('').trim()
    if (!text.endsWith('?')) continue
    const next = body[i + 1] as { _type?: string; style?: string } | undefined
    const nextIsParagraph = next?._type === 'block' && (next.style === 'normal' || !next.style)
    if (!nextIsParagraph) {
      console.warn(
        `[article-gabarit] H2-question « ${text} » n'est PAS suivi d'un paragraphe. ` +
          `Pour le GEO (FAQPage + IA), une question doit avoir une réponse autoportante en 1er bloc. ` +
          `Bloc suivant : ${next?._type ?? 'absent'}/${next?.style ?? '—'}.`,
      )
    }
  }
}

export default function ArticleContent({ body }: { body: ArticleBodyBlock[] | null }) {
  if (!body || body.length === 0) return null
  warnH2QuestionWithoutAnswer(body)
  return (
    <div className="article-prose">
      <PortableText value={body} components={components} />
    </div>
  )
}
