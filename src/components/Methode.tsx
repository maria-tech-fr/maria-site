import CtaSecondaire from './CtaSecondaire'
import Reveal from './Reveal'
import { type EtapeMethode, type Methode as MethodeData } from '../lib/accueil'

export default function Methode({ data }: { data: MethodeData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-125 w-125"
          style={{
            left: '15%',
            top: '78%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(254, 194, 60, 0.20) 0%, rgba(254, 194, 60, 0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute h-150 w-150"
          style={{
            left: '75%',
            top: '70%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(63, 193, 99, 0.18) 0%, rgba(63, 193, 99, 0) 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="max-w-196.75 whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper-soft lg:text-[60px] lg:leading-15.5">
              {data.titre}
            </h2>
            <p className="max-w-173.5 whitespace-pre-line text-[16px] leading-6 text-paper-soft lg:text-[18px] lg:leading-[27.9px]">
              {data.description}
            </p>
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

