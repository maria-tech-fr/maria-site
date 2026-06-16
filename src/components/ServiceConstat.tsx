import HaloField from './HaloField'
import Reveal from './Reveal'
import type { ServiceConstat as ServiceConstatData } from '../lib/pageService'
import { renderWithEmphase } from '../lib/emphase'

export default function ServiceConstat({ data }: { data: ServiceConstatData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.30, x: '90%', y: '40%', size: 760, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-6">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="lg:max-w-[75%] whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper lg:text-[60px] lg:leading-[62px]">
              {renderWithEmphase(data.titre, 'text-accent')}
            </h2>
          </div>
        </Reveal>

        {data.paragraphes && data.paragraphes.length > 0 && (
          <div className="flex max-w-220 flex-col gap-7">
            {data.paragraphes.map((p, i) => (
              <Reveal key={i} delay={120 + i * 100}>
                <p className="whitespace-pre-line text-[16px] leading-[26px] text-[#D5D5D5] lg:text-[18px] lg:leading-[30.6px]">
                  {p.texte}
                  {p.emphase && (
                    <>
                      {' '}
                      <span className="font-medium text-paper">{p.emphase}</span>
                    </>
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
