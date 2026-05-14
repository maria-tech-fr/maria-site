'use client'

import { useState } from 'react'
import BlockHeader from './BlockHeader'
import Reveal from './Reveal'

export type FaqQuestion = { question: string; reponse: string }
export type FaqContent = {
  surTitre: string
  titre: string
  questions: FaqQuestion[] | null
}

export default function Faq({ data }: { data: FaqContent }) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              titreClass="max-w-196.75 text-ink"
            />
          </div>
        </Reveal>

        {data.questions && data.questions.length > 0 && (
          <div className="flex max-w-230 flex-col">
            {data.questions.map((q, i) => (
              <Reveal key={i} delay={100 + i * 60}>
                <QuestionItem item={q} isLast={i === data.questions!.length - 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function QuestionItem({ item, isLast }: { item: FaqQuestion; isLast: boolean }) {
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
        <span aria-hidden className="faq-toggle text-ink" data-open={open} />
      </button>

      {/* Trick CSS : grid-template-rows 0fr → 1fr permet d'animer la hauteur d'un
          contenu inconnu sans mesurer. L'enfant overflow-hidden assure le clip. */}
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
