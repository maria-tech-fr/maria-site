export type Halo = {
  color: string
  alpha?: number
  x: string
  y: string
  size: number
  blur?: number
  duration?: number
}

const PATTERN_COUNT = 3

export default function HaloField({ halos }: { halos: Halo[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {halos.map((h, i) => {
        const alpha = h.alpha ?? 0.4
        const blur = h.blur ?? 40
        const duration = h.duration ?? 8
        const pattern = (i % PATTERN_COUNT) + 1
        const delay = -((i * 13) % duration)
        const rgb = hexToRgb(h.color)

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: h.x,
              top: h.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: h.size,
                height: h.size,
                filter: `blur(${blur}px)`,
                background: `radial-gradient(circle at 50% 50%, rgba(${rgb}, ${alpha}) 0%, rgba(${rgb}, 0) 70%)`,
                animation: `halo-drift-${pattern} ${duration}s ease-in-out ${delay}s infinite`,
                willChange: 'transform',
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
