'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Barre de progression de lecture en haut de viewport.
 * Mesure la portion lue de l'élément `targetSelector` (par défaut <article>).
 * Optimisé : requestAnimationFrame, pas de listener bloquant.
 * Respecte prefers-reduced-motion (pas de transition CSS).
 */
export default function ReadingProgress({
  targetSelector = 'article',
}: {
  targetSelector?: string
}) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function update() {
      const target = document.querySelector(targetSelector)
      if (!target) {
        setProgress(0)
        return
      }
      const rect = target.getBoundingClientRect()
      const viewportH = window.innerHeight
      // Hauteur scrollable de l'article par rapport au viewport.
      const total = Math.max(1, rect.height - viewportH)
      // Scroll écoulé depuis le début de l'article.
      const scrolled = -rect.top
      const pct = Math.max(0, Math.min(1, scrolled / total))
      setProgress(pct)
    }

    function onScroll() {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        update()
        rafRef.current = null
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [targetSelector])

  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-accent motion-safe:transition-[width] motion-safe:duration-100 motion-safe:ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
