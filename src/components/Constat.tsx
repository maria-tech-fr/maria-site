import BlockHeader from './BlockHeader'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { Constat as ConstatData } from '../lib/accueil'

export default function Constat({ data }: { data: ConstatData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-30">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '5%', y: '80%', size: 450, duration: 28 },
          { color: '#FEC23C', alpha: 0.3, x: '95%', y: '20%', size: 500, blur: 50, duration: 22 },
        ]}
      />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-x-27.5">
        <Reveal className="flex flex-1 flex-col gap-2.5">
          <BlockHeader
            surTitre={data.surTitre}
            titre={data.titre}
            surTitreClass="text-accent"
            titreClass="text-paper"
          />
        </Reveal>

        <Reveal className="w-full lg:w-132 lg:shrink-0" delay={150}>
          <div className="flex flex-col gap-4 lg:pt-2">
            {data.paragraphes?.map((p, i) => (
              <p
                key={i}
                className={
                  p.emphase
                    ? 'whitespace-pre-line text-[16px] font-medium leading-6 text-paper lg:text-[17px] lg:leading-[26.35px]'
                    : 'whitespace-pre-line text-[16px] leading-6 text-[#BFBFBF] lg:text-[17px] lg:leading-[26.35px]'
                }
              >
                {p.texte}
              </p>
            ))}

            {data.citation && (
              <blockquote className="border-l-2 border-accent pl-5 lg:pl-6.5">
                <p className="whitespace-pre-line font-display text-[18px] font-medium leading-6 tracking-[-0.015em] text-paper lg:text-[22px] lg:leading-[28.6px]">
                  {data.citation}
                </p>
              </blockquote>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
