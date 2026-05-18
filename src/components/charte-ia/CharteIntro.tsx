import { Fragment } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  paragraphes: string[]
}

export default function CharteIntro({ surTitre, paragraphes }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-24">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.36, x: '92%', y: '50%', size: 620, blur: 65, duration: 46 },
        ]}
      />

      <article className="relative mx-auto flex w-full max-w-[760px] flex-col gap-7 lg:mx-0 lg:max-w-[820px]">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {surTitre}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-6">
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
