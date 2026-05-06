import BlockHeader from './BlockHeader'
import CtaSecondaire from './CtaSecondaire'
import HaloField from './HaloField'
import Reveal from './Reveal'
import { type EtapeMethode, type Methode as MethodeData } from '../lib/accueil'

export default function Methode({ data }: { data: MethodeData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        staticMode
        halos={[
          { color: '#FEC23C', alpha: 0.20, x: '15%', y: '78%', size: 500, blur: 30 },
          { color: '#3FC163', alpha: 0.18, x: '75%', y: '70%', size: 600, blur: 30 },
        ]}
      />

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              sousTitre={data.description}
              titreClass="max-w-196.75 text-paper-soft"
              sousTitreClass="max-w-173.5 text-paper-soft"
            />
          </div>
        </Reveal>

        {data.etapes && data.etapes.length > 0 && (
          <div className="grid grid-cols-1 gap-x-3.75 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
            {data.etapes.map((etape, i) => (
              <Reveal key={i} delay={150 + i * 100}>
                <EtapeItem etape={etape} />
              </Reveal>
            ))}
          </div>
        )}

        {data.lien && (
          <Reveal delay={200}>
            <CtaSecondaire lien={data.lien} tone="paper" withArrow />
          </Reveal>
        )}
      </div>
    </section>
  )
}

function EtapeItem({ etape }: { etape: EtapeMethode }) {
  return (
    <div className="relative border-t border-white/18 pt-6">
      <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-accent" />
      <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-accent">
        {etape.numero} — {etape.categorie}
      </p>
      <h3 className="pt-3 font-display text-[22px] font-semibold leading-8 tracking-[-0.02em] text-paper lg:text-[24px] lg:leading-[37.2px]">
        {etape.titre}
      </h3>
      <p className="pt-3 whitespace-pre-line text-[14px] leading-5.25 text-[#BFBFBF]">
        {etape.description}
      </p>
    </div>
  )
}

