/*
  Petite flèche → réutilisée dans tous les CTA secondaires + cards services.
  Deux tailles natives : "sm" (14×10) et "md" (16×12), différence visible mais
  faible. Couleur via currentColor (héritée du texte parent).
*/

type ArrowRightProps = {
  size?: 'sm' | 'md'
  className?: string
}

export default function ArrowRight({ size = 'sm', className = '' }: ArrowRightProps) {
  if (size === 'md') {
    return (
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden className={className}>
        <path
          d="M1 6h13M9 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className={className}>
      <path
        d="M1 5h11M9 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
