import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  description?: string | null
}

export default function ThankYouHero({ surTitre, titre, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-40 lg:px-30.5 lg:pb-28 lg:pt-44">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.28, x: '12%', y: '70%', size: 720, blur: 50, duration: 38 },
          { color: '#FEC23C', alpha: 0.26, x: '88%', y: '20%', size: 620, blur: 50, duration: 44 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[920px] flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.08em] text-success-soft">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="whitespace-pre-line font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.032em] text-paper lg:text-[64px] lg:leading-[1.05]">
            {renderWithEmphase(titre, 'text-accent')}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className="max-w-[640px] text-[16px] leading-7 text-[#CFCFCF] lg:text-[18px] lg:leading-[28px]">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

