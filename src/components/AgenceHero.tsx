import HaloField from './HaloField'
import Reveal from './Reveal'
import type { AgenceHero as AgenceHeroData } from '../lib/agence'

export default function AgenceHero({ data }: { data: AgenceHeroData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 pb-12 sm:px-8 lg:px-30.5 lg:pt-45 lg:pb-18">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.55, x: '90%', y: '25%', size: 500, blur: 50, duration: 24 },
          { color: '#3FC163', alpha: 0.35, x: '20%', y: '80%', size: 500, blur: 48, duration: 30 },
        ]}
      />

      <div className="relative flex flex-col gap-12 lg:gap-30">
        <Reveal>
          <div className="flex flex-col gap-3.75">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h1 className="font-display text-[40px] font-semibold leading-[44px] tracking-[-0.0507em] text-accent lg:text-[80px] lg:leading-[112.52px]">
              {(() => {
                const [line1, ...rest] = data.titre.split('\n')
                const line2 = rest.join('\n').trim()
                return (
                  <>
                    <span className="block">{line1}</span>
                    {line2 && (
                      <span className="block lg:mt-[-13.48px] lg:leading-20">{line2}</span>
                    )}
                  </>
                )
              })()}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="max-w-200 whitespace-pre-line text-[16px] leading-6 text-[#D5D5D5] lg:text-[20px] lg:leading-[31px]">
            {data.description}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
