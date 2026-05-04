'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export default function CountUpValue({
  value,
  durationMs = 1500,
}: {
  value: string
  durationMs?: number
}) {
  const parsed = useMemo(() => {
    const m = value.match(/^([−+\-]?)(\d+(?:[.,]\d+)?)(.*)$/)
    if (!m) return null
    return {
      prefix: m[1],
      target: parseFloat(m[2].replace(',', '.')),
      suffix: m[3],
    }
  }, [value])

  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!parsed || hasStarted) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayed(parsed.target)
      setHasStarted(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [parsed, hasStarted])

  useEffect(() => {
    if (!hasStarted || !parsed) return
    let frameId = 0
    let start: number | null = null
    function tick(ts: number) {
      if (start === null) start = ts
      const t = Math.min((ts - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(parsed!.target * eased)
      if (t < 1) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [hasStarted, parsed, durationMs])

  if (!parsed) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <span ref={ref}>
      {parsed.prefix}
      {Math.round(displayed)}
      {parsed.suffix}
    </span>
  )
}
