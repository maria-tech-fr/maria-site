import { Fragment } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
}

export default function CharteIntro({ surTitre, titre, paragraphes }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-24">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.34, x: '10%', y: '15%', size: 600, blur: 60, duration: 46 },
          { color: '#3FC163', alpha: 0.18, x: '88%', y: '85%', size: 440, blur: 60, duration: 50 },
        ]}
      />

      <article className="relative mx-auto flex w-full max-w-[760px] flex-col gap-7">
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[36px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-5">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[16.5px] leading-[1.7] text-ink-soft lg:text-[17.5px]">
                {renderStrong(p)}
              </p>
            ))}
          </div>
        </Reveal>
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
