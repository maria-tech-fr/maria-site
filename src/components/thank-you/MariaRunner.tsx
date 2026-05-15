'use client'

import { useEffect, useRef, useState } from 'react'
import { initRunner, type RunnerControls } from './mariaRunnerEngine'

type Props = {
  skipGameLibelle?: string | null
}

const SOUND_KEY = 'maria-runner-sound'

export default function MariaRunner({ skipGameLibelle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controlsRef = useRef<RunnerControls | null>(null)

  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [bossWarn, setBossWarn] = useState(false)
  const [bossToast, setBossToast] = useState<string | null>(null)
  const [gameOverData, setGameOverData] = useState<{ score: number; record: number; quip: string } | null>(null)
  const [started, setStarted] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  // Restaure le toggle son depuis sessionStorage
  useEffect(() => {
    try {
      const v = sessionStorage.getItem(SOUND_KEY)
      if (v === '1') setSoundOn(true)
    } catch { /* noop */ }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    const controls = initRunner(
      canvasRef.current,
      {
        onScoreChange: setScore,
        onRecordChange: setRecord,
        onBossWarn: setBossWarn,
        onBossToast: setBossToast,
        onGameOver: (d) => setGameOverData(d),
        onStart: () => {
          setGameOverData(null)
          setStarted(true)
        },
      },
      { soundEnabled: soundOn },
    )
    controlsRef.current = controls
    return () => controls.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    try { sessionStorage.setItem(SOUND_KEY, next ? '1' : '0') } catch { /* noop */ }
    controlsRef.current?.setSound(next)
  }

  function onReplay() {
    setGameOverData(null)
    controlsRef.current?.restart()
  }

  function onStartClick() {
    controlsRef.current?.jump()
  }

  return (
    <section className="relative w-full bg-paper">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        {/* HUD haut */}
        <div className="mb-3 flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
          <div className="flex gap-6">
            <span>
              score <span className="ml-1 text-ink">{score.toString().padStart(5, '0')}</span>
            </span>
            <span>
              record <span className="ml-1 text-ink">{record.toString().padStart(5, '0')}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-2 rounded-full border border-paper-edge bg-paper-soft px-3 py-1.5 transition-colors duration-300 ease-out hover:bg-paper"
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Couper le son' : 'Activer le son'}
          >
            <span aria-hidden>{soundOn ? '🔊' : '🔇'}</span>
            <span>{soundOn ? 'son on' : 'son off'}</span>
          </button>
        </div>

        {/* Canvas */}
        <div className="relative overflow-hidden rounded-[8px] border border-paper-edge bg-paper-soft">
          <canvas
            ref={canvasRef}
            width={1920}
            height={800}
            className="block h-auto w-full cursor-pointer select-none"
            aria-label="Maria runner — appuyez sur espace ou cliquez pour sauter."
          />

          {/* Overlay : start */}
          {!started && !gameOverData && (
            <button
              type="button"
              onClick={onStartClick}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-paper/80">// en attendant la réponse</span>
              <span className="font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-paper lg:text-[56px]">
                Aidez maria à fuir le bureau.
              </span>
              <span className="text-[14px] text-paper/75 lg:text-[16px]">
                Espace, flèche haut ou clic pour sauter. Boss à 1 000 points.
              </span>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-medium text-[14px] text-ink">
                ▶ Démarrer
              </span>
            </button>
          )}

          {/* Boss warn */}
          {bossWarn && (
            <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-[#ff5050] bg-ink/85 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#ff8a8a]">
              ⚠ DASHBOARD.xlsx approche…
            </div>
          )}

          {/* Boss toast — défaite du boss */}
          {bossToast && (
            <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-success/95 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-paper">
              ✓ {bossToast}
            </div>
          )}

          {/* Game over */}
          {gameOverData && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/55 backdrop-blur-[2px]">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-paper/80">// game over</p>
              <p className="font-display text-[48px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper lg:text-[64px]">
                {gameOverData.score} points
              </p>
              <p className="text-[14px] text-paper/75 lg:text-[16px]">
                record : {gameOverData.record} · {gameOverData.quip}
              </p>
              <button
                type="button"
                onClick={onReplay}
                className="mt-3 inline-flex items-center gap-2 rounded-[8px] bg-accent px-6 py-3 font-medium text-[14px] text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
              >
                ↻ Rejouer
              </button>
            </div>
          )}
        </div>

        {/* Skip game */}
        <div className="mt-5 flex justify-center">
          <a
            href="#suite"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft underline underline-offset-4 transition-colors duration-300 ease-out hover:text-ink"
          >
            {skipGameLibelle || 'Passer le jeu et continuer'} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
