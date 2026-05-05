'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { type Lien, lienExterne, lienHref } from '../lib/accueil'

type Tone = 'ink' | 'paper'

const TONE_TEXT_COLOR: Record<Tone, string> = {
  ink: '#212121',
  paper: '#F9F9F9',
}

export default function CtaSecondaire({
  lien,
  tone = 'ink',
  underlineColor = '#3FC163',
  withArrow = false,
}: {
  lien: Lien
  tone?: Tone
  underlineColor?: string
  withArrow?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const href = lienHref(lien)
  const externe = lienExterne(lien)

  const onEnter = () => setHovered(true)
  const onLeave = () => setHovered(false)

  const wrapperClass = withArrow
    ? 'inline-flex items-center gap-2 self-start text-[15px] font-medium leading-[23.25px]'
    : 'inline-flex items-center text-[15px] font-medium leading-[23.25px]'

  const content: ReactNode = (
    <>
      <span style={{ position: 'relative', paddingBottom: '2px' }}>
        {lien.libelle}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: underlineColor,
            transformOrigin: hovered ? 'left' : 'right',
            transform: hovered ? 'scaleX(0)' : 'scaleX(1)',
            transition: 'transform 300ms ease-out',
          }}
        />
      </span>
      {withArrow && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M1 5h11M9 1l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
  }

  const style = { color: TONE_TEXT_COLOR[tone] }

  if (externe) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={wrapperClass}
        style={style}
        {...handlers}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={wrapperClass} style={style} {...handlers}>
      {content}
    </Link>
  )
}
