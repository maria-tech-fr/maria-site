import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { EtapeProcessusContact } from '../../lib/contact'

type ContactProcessProps = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  etapes: EtapeProcessusContact[]
}

export default function ContactProcess({ surTitre, titre, sousTitre, etapes }: ContactProcessProps) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '50%', y: '70%', size: 900, blur: 40, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-18">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper lg:text-[60px] lg:leading-[62px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="whitespace-pre-line text-[16px] leading-7 text-[#BFBFBF] lg:text-[18px] lg:leading-[27.9px]">
                {sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-10">
          {etapes.map((etape, i) => (
            <Reveal key={i} delay={120 + i * 100}>
              <div className="relative flex flex-col gap-3 pt-6">
                {/* Trait blanc en haut de chaque colonne + dot vert décoratif */}
                <span aria-hidden className="absolute left-0 top-0 h-px w-full bg-white/18" />
                <span aria-hidden className="absolute left-0 top-0 h-px w-10 bg-success" />
                <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success-soft">
                  {etape.numero}
                </p>
                <h3 className="pt-2 font-display text-[22px] font-semibold leading-7 tracking-[-0.02em] text-paper lg:text-[24px] lg:leading-[27.6px]">
                  {etape.titre}
                </h3>
                <p className="whitespace-pre-line text-[14.5px] leading-[23.25px] text-[#BFBFBF] lg:text-[15px]">
                  {etape.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
