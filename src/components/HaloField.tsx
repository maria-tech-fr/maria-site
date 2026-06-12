export type Halo = {
  color: string
  alpha?: number
  x: string
  y: string
  size: number
  blur?: number
  duration?: number
}

type HaloFieldProps = {
  halos: Halo[]
  /** Si true, halos rendus statiques (pas d'animation). Défaut false. */
  staticMode?: boolean
}

const PATTERN_COUNT = 5

// Budget par défaut pour un halo seul dans son bloc (% du viewport).
const SOLO_WX = 28
const SOLO_WY = 22
// Marge de sécurité entre territoires de halos voisins (% du bloc).
const SAFETY = 4

/**
 * Calcule l'amplitude d'errance autorisée par halo, en vw, telle qu'aucun
 * couple de halos ne puisse jamais se chevaucher quelles que soient les
 * phases d'animation.
 *
 * Stratégie : pour chaque paire de halos, l'écart sur un axe (en % du bloc)
 * est partagé de moitié, moins une marge de sécurité. Le minimum sur tous
 * les voisins fixe le budget. Pour un halo seul on retombe sur SOLO_*.
 */
function computeBudgets(halos: Halo[]): { wx: number; wy: number }[] {
  return halos.map((h, i) => {
    const hx = parsePct(h.x)
    const hy = parsePct(h.y)
    let wx = SOLO_WX
    let wy = SOLO_WY
    halos.forEach((other, j) => {
      if (i === j) return
      const dx = Math.abs(hx - parsePct(other.x))
      const dy = Math.abs(hy - parsePct(other.y))
      wx = Math.min(wx, Math.max(2, dx / 2 - SAFETY))
      wy = Math.min(wy, Math.max(2, dy / 2 - SAFETY))
    })
    return { wx: Math.max(4, wx), wy: Math.max(4, wy) }
  })
}

function parsePct(s: string): number {
  return parseFloat(s) || 0
}

export default function HaloField({ halos, staticMode = false }: HaloFieldProps) {
  const budgets = computeBudgets(halos)

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {halos.map((h, i) => {
        const alpha = h.alpha ?? 0.4
        const blur = h.blur ?? 40
        const duration = h.duration ?? 42
        const pattern = (i % PATTERN_COUNT) + 1
        const delay = -((i * 17) % duration)
        const rgb = hexToRgb(h.color)
        const { wx, wy } = budgets[i]

        // Sur mobile : taille réduite (60% du design max) + blur réduit
        // (50% min) pour limiter le coût de compositing. iOS Safari peut
        // throttler agressivement les animations sur des éléments blur >
        // 35px ; en cappant à ~25px sur mobile on garde l'effet visuel.
        const sizeStyle = `clamp(${Math.round(h.size * 0.6)}px, 110vw, ${h.size}px)`
        const blurStyle = `clamp(${Math.round(blur * 0.5)}px, 6vw, ${blur}px)`

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: h.x,
              top: h.y,
              // translate3d force la création d'une couche compositing GPU
              // dès le rendu — sans ça, iOS Safari peut décider de ne pas
              // promouvoir l'élément et figer l'animation après quelques
              // frames pour économiser de la batterie.
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          >
            <div
              style={{
                width: sizeStyle,
                height: sizeStyle,
                aspectRatio: '1 / 1',
                filter: `blur(${blurStyle})`,
                background: `radial-gradient(circle at 50% 50%, rgba(${rgb}, ${alpha}) 0%, rgba(${rgb}, 0) 70%)`,
                ...(staticMode
                  ? { willChange: 'auto' }
                  : {
                      // Variables CSS lues par les keyframes halo-wander-*.
                      // Les keyframes utilisent calc(var(--wx) * factor) pour
                      // rester dans le territoire de chaque halo.
                      ['--wx' as string]: `${wx}vw`,
                      ['--wy' as string]: `${wy}vw`,
                      animation: `halo-wander-${pattern} ${duration}s ease-in-out ${delay}s infinite`,
                      willChange: 'transform',
                      // Hint navigateur supplémentaire pour ne pas
                      // détacher la couche pendant l'animation.
                      backfaceVisibility: 'hidden',
                    }),
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function hexToRgb(hex: string): string {
  const v = hex.replace('#', '')
  const n = parseInt(v.length === 3 ? v.split('').map((c) => c + c).join('') : v, 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}
