'use client'

import { useState } from 'react'
import Reveal from '../Reveal'
import type { QuestionFaqContact } from '../../lib/contact'

type ContactFaqProps = {
  surTitre: string
  titre: string
  questions: QuestionFaqContact[]
}

export default function ContactFaq({ surTitre, titre, questions }: ContactFaqProps) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        {questions.length > 0 && (
          <div className="flex max-w-230 flex-col">
            {questions.map((q, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <QuestionItem item={q} isLast={i === questions.length - 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function QuestionItem({ item, isLast }: { item: QuestionFaqContact; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-t border-paper-edge ${isLast ? 'border-b' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-7 pr-2 text-left text-ink"
      >
        <span className="font-display text-[18px] font-semibold leading-6 tracking-[-0.015em] lg:text-[20px] lg:leading-6.5">
          {item.question}
        </span>
        <PlusMinus open={open} />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-155 pb-8 pr-2 whitespace-pre-line text-[15px] leading-6 text-ink-soft lg:text-[16px] lg:leading-[26.4px]">
            {item.reponse}
          </p>
        </div>
      </div>
    </div>
  )
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="text-ink">
      <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line
        x1="7"
        y1="2"
        x2="7"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className={`origin-center transition-transform duration-300 ease-out ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
        style={{ transformBox: 'fill-box' }}
      />
    </svg>
  )
}
