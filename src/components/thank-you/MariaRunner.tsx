'use client'

import { useEffect, useRef, useState } from 'react'
import { initRunner, type RunnerControls } from './mariaRunnerEngine'

const SOUND_KEY = 'maria_runner_sound'

function pad5(n: number) {
  return String(Math.max(0, n)).padStart(5, '0')
}

export default function MariaRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controlsRef = useRef<RunnerControls | null>(null)

  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [bossWarn, setBossWarn] = useState(false)
  const [bossToast, setBossToast] = useState(false)
  const [gameOverData, setGameOverData] = useState<{
    score: number; record: number; isNewRecord: boolean; quip: string
  } | null>(null)
  const [soundOn, setSoundOn] = useState(false)

  // Restaure le toggle son depuis sessionStorage (client-only lookup).
  // setState dans useEffect est légitime ici : on synchronise depuis un système
  // externe (browser storage) non accessible en SSR.
  useEffect(() => {
    try {
      const v = sessionStorage.getItem(SOUND_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        onStart: () => setGameOverData(null),
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

  return (
    <section className="relative w-full bg-paper">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        {/* HUD haut */}
        <div className="mb-3 flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
          <div className="flex gap-6">
            <span>
              score{' '}
              <span key={score} className="score-flash ml-1 text-ink">
                {pad5(score)}
              </span>
            </span>
            <span>
              record <span className="ml-1 text-ink">{pad5(record)}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-2 rounded-full border border-paper-edge bg-paper-soft px-3 py-1.5 transition-colors duration-300 ease-out hover:bg-paper"
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Couper le son' : 'Activer le son'}
          >
            <SoundIcon on={soundOn} />
            <span>{soundOn ? 'son on' : 'son off'}</span>
          </button>
        </div>

        {/* Canvas */}
        <div className="relative overflow-hidden rounded-lg border border-paper-edge bg-paper-soft">
          <canvas
            ref={canvasRef}
            width={1920}
            height={800}
            className="block h-auto w-full cursor-pointer select-none"
            aria-label="Maria runner — appuyez sur espace ou tapez l’écran pour sauter."
          />

          {/* Boss warn — affiché par le moteur via callback */}
          {bossWarn && (
            <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-[#ff5050] bg-ink/85 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#ff8a8a]">
              ⚠ DASHBOARD.xlsx approche…
            </div>
          )}

          {/* Boss toast — défaite du boss */}
          {bossToast && (
            <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-success/95 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-paper">
              ✓ Boss vaincu — maria a gagné le dashboard
            </div>
          )}

          {/* Game over */}
          {gameOverData && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/55 px-8 text-center backdrop-blur-[2px]">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-paper/80">{'// game over'}</p>
              <p className="font-display text-[48px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper lg:text-[64px]">
                {pad5(gameOverData.score)}
              </p>
              <p className={`font-mono text-[12px] uppercase tracking-[0.1em] ${gameOverData.isNewRecord ? 'text-accent' : 'text-paper/75'}`}>
                {gameOverData.isNewRecord
                  ? 'NOUVEAU RECORD PERSONNEL'
                  : `RECORD : ${pad5(gameOverData.record)}`}
              </p>
              <p className="max-w-[520px] text-[14px] leading-6 text-paper/80 lg:text-[15px]">
                {gameOverData.quip}
              </p>
              <button
                type="button"
                onClick={onReplay}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[14px] text-ink transition-colors duration-500 ease-in-out hover:bg-accent-soft"
              >
                ↻ Rejouer
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {on ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      )}
    </svg>
  )
}
