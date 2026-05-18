import { Fragment } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
  /** Fond de section. Services → paper (blanc). Besoins → paper-soft (gris). */
  bg?: 'paper' | 'paper-soft'
}

export default function PillarVision({ surTitre, titre, paragraphes, bg = 'paper' }: Props) {
  const bgClass = bg === 'paper-soft' ? 'bg-paper-soft' : 'bg-paper'
  return (
    <section className={`relative overflow-hidden ${bgClass} px-6 py-16 lg:px-30.5 lg:py-30`}>
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.3, x: '92%', y: '12%', size: 540, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-12">
        <Reveal>
          <div className="flex max-w-[880px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="max-w-[22ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex max-w-[760px] flex-col gap-5">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.7] text-ink-soft lg:text-[18px]">
                {renderStrong(p)}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
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
