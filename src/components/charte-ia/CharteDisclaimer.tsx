import { Fragment } from 'react'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
  lastUpdated?: string | null
  revisionMention?: string | null
}

export default function CharteDisclaimer({
  surTitre,
  titre,
  paragraphes,
  lastUpdated,
  revisionMention,
}: Props) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-24">
      <article className="mx-auto flex w-full max-w-[760px] flex-col gap-7 lg:mx-0 lg:max-w-[820px]">
        <Reveal>
          <header className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink text-balance lg:text-[56px] lg:leading-[1.04]">
              {titre}
            </h2>
          </header>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-2 flex flex-col gap-5">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.7] text-ink-soft lg:text-[16.5px]">
                {renderStrong(p)}
              </p>
            ))}
          </div>
        </Reveal>

        {(lastUpdated || revisionMention) && (
          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-2 border-t border-paper-edge pt-7 font-mono text-[13px] leading-[1.7] text-ink-soft lg:text-[13.5px]">
              {lastUpdated && (
                <span>
                  <span className="font-medium text-ink">
                    Dernière mise à jour : {formatDateFR(lastUpdated)}.
                  </span>
                  {revisionMention && <> {revisionMention}</>}
                </span>
              )}
              {!lastUpdated && revisionMention && <span>{revisionMention}</span>}
            </div>
          </Reveal>
        )}
      </article>
    </section>
  )
}

function renderStrong(texte: string): React.ReactNode {
  if (!texte.includes('**')) return texte
  const parts = texte.split(/\*\*([^*]+)\*\*/g)
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    return <strong key={i} className="font-medium text-ink">{part}</strong>
  })
}

function formatDateFR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}
