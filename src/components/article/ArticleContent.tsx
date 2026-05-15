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
      <ol className="my-6 ml-1 flex list-inside list-decimal flex-col gap-2 text-[17px] leading-[28px] text-ink lg:text-[18px] lg:leading-[31px]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span aria-hidden className="mt-3 inline-block h-1.5 w-1.5 flex-none rounded-full bg-success" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="ml-1">{children}</li>,
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
      return (
        <a
          href={href}
          target={blank || !treatAsInternal ? '_blank' : undefined}
          rel={blank || !treatAsInternal ? 'noopener noreferrer' : undefined}
          className="font-medium text-ink underline decoration-accent/70 decoration-1 underline-offset-2 transition-colors hover:text-accent"
        >
          {children}
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
            className="w-full rounded-[8px] border border-paper-edge"
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
      const url = urlFor(value.image).width(1600).fit('max').auto('format').url()
      return (
        <figure className="my-12 -mx-6 lg:-mx-12 xl:-mx-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.image.alt ?? ''}
            className="w-full rounded-[8px] border border-paper-edge"
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
    video: ({ value }) => {
      const url: string = value?.url ?? ''
      const embed = embedUrlFor(url)
      if (!embed) return null
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-[8px] border border-paper-edge bg-paper-soft aspect-video">
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
          className={`my-10 flex flex-col items-start justify-between gap-4 rounded-[12px] ${bg} px-6 py-4 sm:flex-row sm:items-center`}
          style={{ borderLeft: `3px solid ${borderColor}` }}
        >
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden
              className="flex h-9 w-9 flex-none items-center justify-center rounded-[8px] bg-white/60"
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

export default function ArticleContent({ body }: { body: ArticleBodyBlock[] | null }) {
  if (!body || body.length === 0) return null
  return (
    <div className="article-prose">
      <PortableText value={body} components={components} />
    </div>
  )
}
