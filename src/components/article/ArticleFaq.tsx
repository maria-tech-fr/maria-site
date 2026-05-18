'use client'

import { useState } from 'react'
import type { FaqItem } from '../../lib/article'

/*
  FAQ finale d'article — accordion ARIA disclosure (button + aria-expanded).
  Le contenu de chaque réponse est TOUJOURS dans le DOM (pas conditionnel),
  juste clippé via CSS : indispensable pour que les IA et Google extraient
  les Q/R même sans interaction. Le même pattern d'animation que Faq.tsx
  global, en version compacte « inline article ».
*/

export default function ArticleFaq({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null
  return (
    <section
      aria-labelledby="article-faq-heading"
      className="mt-16 border-t border-paper-edge pt-12"
    >
      <p className="font-mono text-[12px] uppercase leading-4 tracking-[0.08em] text-success">
        // vos questions
      </p>
      <h2
        id="article-faq-heading"
        className="mt-2 font-display text-[26px] font-semibold leading-8 tracking-[-0.02em] text-ink lg:text-[32px] lg:leading-10"
      >
        Les questions qu’on nous pose
      </h2>
      <div className="mt-8 flex flex-col">
        {items.map((item, i) => (
          <QuestionItem key={i} item={item} isLast={i === items.length - 1} />
        ))}
      </div>
    </section>
  )
}

function QuestionItem({ item, isLast }: { item: FaqItem; isLast: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border-t border-paper-edge ${isLast ? 'border-b' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 pr-2 text-left text-ink"
      >
        <span className="font-display text-[17px] font-semibold leading-6 tracking-[-0.015em] lg:text-[19px] lg:leading-7">
          {item.question}
        </span>
        <span aria-hidden className="faq-toggle text-ink" data-open={open} />
      </button>

      {/* La réponse reste toujours présente dans le DOM (clip CSS via grid trick).
          Indispensable pour que crawlers et IA voient les Q/R sans JS. */}
      <div
        className="grid transition-[grid-template-rows] duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-150 pb-7 pr-2 whitespace-pre-line text-[15px] leading-[26px] text-ink-soft lg:text-[16px] lg:leading-[28px]">
            {item.reponse}
          </p>
        </div>
      </div>
    </div>
  )
}
