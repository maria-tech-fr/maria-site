import Link from 'next/link'
import ArrowRight from './icons/ArrowRight'
import { type Lien, lienExterne, lienHref } from '../lib/accueil'

type Tone = 'ink' | 'paper'

const TONE_CLASS: Record<Tone, string> = {
  ink: 'text-ink',
  paper: 'text-paper',
}

export default function CtaSecondaire({
  lien,
  tone = 'ink',
  withArrow = false,
}: {
  lien: Lien
  tone?: Tone
  withArrow?: boolean
}) {
  const href = lienHref(lien)
  const externe = lienExterne(lien)

  // .cta-link déclenche le hover du soulignement défini en globals.css.
  const wrapperClass = withArrow
    ? `cta-link inline-flex items-center gap-2 self-start text-[15px] font-medium leading-[23.25px] ${TONE_CLASS[tone]}`
    : `cta-link inline-flex items-center text-[15px] font-medium leading-[23.25px] ${TONE_CLASS[tone]}`

  const content = (
    <>
      <span className="relative pb-0.5">
        {lien.libelle}
        <span aria-hidden className="cta-underline" />
      </span>
      {withArrow && <ArrowRight />}
    </>
  )

  if (externe) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={wrapperClass}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={wrapperClass}>
      {content}
    </Link>
  )
}
