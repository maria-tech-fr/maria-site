import { Fragment } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  paragraphes: string[]
}

export default function FormationConstat({ surTitre, titre, paragraphes }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '92%', y: '92%', size: 720, blur: 55, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[60ch] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
            <h2 className="lg:max-w-[75%] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-paper lg:text-[52px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex max-w-[880px] flex-col gap-6">
            {paragraphes.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.7] text-[#D5D5D5] lg:text-[18px]">
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
    return <strong key={i} className="font-medium text-paper">{part}</strong>
  })
}
