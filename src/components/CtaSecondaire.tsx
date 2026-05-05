import Link from 'next/link'
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

  // CSS-only hover. Default : trait visible (origin-right, scale-x-100). Au survol, le
  // sélecteur group-hover bascule sur origin-left + scale-x-0 → le trait se rétracte
  // vers la gauche. À la sortie du hover, on repasse à origin-right + scale-x-100 →
  // le trait réapparaît depuis la droite. transform-origin change instantanément
  // (pas dans la transition), seul transform est interpolé.
  const wrapperClass = withArrow
    ? `group/cta inline-flex items-center gap-2 self-start text-[15px] font-medium leading-[23.25px] ${TONE_CLASS[tone]}`
    : `group/cta inline-flex items-center text-[15px] font-medium leading-[23.25px] ${TONE_CLASS[tone]}`

  const content = (
    <>
      <span className="relative pb-0.5">
        {lien.libelle}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px origin-right scale-x-100 bg-success transition-transform duration-300 ease-out group-hover/cta:origin-left group-hover/cta:scale-x-0"
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
