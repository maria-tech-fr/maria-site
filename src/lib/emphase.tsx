import { Fragment, type ReactNode } from 'react'

/**
 * Rend un texte avec emphase `**fragment**` en wrappant chaque fragment dans
 * un span avec la classe fournie. Préserve les retours à la ligne via les
 * styles `whitespace-pre-line` côté parent.
 *
 * Ex : renderWithEmphase("Cadrer **votre stratégie**", "text-accent")
 *  → React fragment avec "Cadrer " + <span className="text-accent">votre stratégie</span>
 */
export function renderWithEmphase(texte: string, emphaseClass: string): ReactNode {
  if (!texte.includes('**')) return texte
  const parts = texte.split(/\*\*([^*]+)\*\*/g)
  return parts.map((part, i) => {
    // Index pair = texte régulier, index impair = fragment emphase
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    return (
      <span key={i} className={emphaseClass}>
        {part}
      </span>
    )
  })
}
