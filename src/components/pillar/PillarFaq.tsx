'use client'

import { useState } from 'react'
import Reveal from '../Reveal'

type Question = { question: string; reponse: string }

type Props = {
  surTitre: string
  titre: string
  questions: Question[]
}

export default function PillarFaq({ surTitre, titre, questions }: Props) {
  return (
    <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-30">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-start lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="max-w-[14ch] font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-ink lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex max-w-[780px] flex-col">
            {questions.map((q, i) => (
              <QuestionItem key={i} q={q} isLast={i === questions.length - 1} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function QuestionItem({ q, isLast, defaultOpen }: { q: Question; isLast: boolean; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className={`border-t border-paper-edge ${isLast ? 'border-b' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-6 py-7 text-left"
      >
        <span className="font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
          {q.question}
        </span>
        <span
          aria-hidden
          className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full transition-all duration-300 ease-out ${
            open ? 'rotate-180 bg-success-tint' : 'bg-paper'
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Animation hauteur sans mesure : grid 0fr → 1fr. */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[64ch] whitespace-pre-line pb-7 text-[15.5px] leading-[1.65] text-ink-soft">
            {q.reponse}
          </p>
        </div>
      </div>
    </div>
  )
}
