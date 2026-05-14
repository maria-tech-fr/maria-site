import HaloField from './HaloField'
import Reveal from './Reveal'
import type { EtapeMethode, ServiceMethode as ServiceMethodeData } from '../lib/pageService'

export default function ServiceMethode({ data }: { data: ServiceMethodeData }) {
  const lienHref = data.lienHref || '/agence#processus'
  const lienLibelle = data.lienLibelle || 'Voir notre méthode complète →'

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.18, x: '10%', y: '60%', size: 720, blur: 50, duration: 38 },
        ]}
      />

      <div className="relative flex flex-col gap-12">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-paper lg:text-[60px] lg:leading-[62px]">
              {data.titre}
            </h2>
            {data.sousTitre && (
              <p className="whitespace-pre-line text-[16px] leading-7 text-[#BFBFBF] lg:text-[18px] lg:leading-[28.8px]">
                {data.sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        {data.etapes && data.etapes.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {data.etapes.map((etape, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <EtapeCard etape={etape} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={200}>
          <a
            href={lienHref}
            className="inline-flex self-start font-medium text-[15px] leading-6 text-success underline decoration-success/40 underline-offset-4 transition-colors duration-300 ease-out hover:text-accent hover:decoration-accent/60"
          >
            {lienLibelle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function EtapeCard({ etape }: { etape: EtapeMethode }) {
  return (
    <article className="flex h-full flex-col gap-2.5 rounded-[5px] border border-white/10 bg-white/4 p-8">
      <span className="font-display text-[56px] font-bold leading-none tracking-[-0.04em] text-accent lg:text-[64px]">
        {etape.numero}
      </span>
      <p className="pt-3 font-mono text-[11px] leading-4 uppercase tracking-[0.08em] text-[#888888]">
        {etape.libelle}
      </p>
      <h3 className="whitespace-pre-line font-display text-[20px] font-semibold leading-6.5 tracking-[-0.018em] text-paper lg:text-[21px] lg:leading-[25.2px]">
        {etape.titre}
      </h3>
      <p className="whitespace-pre-line text-[14.5px] leading-[22.48px] text-[#BFBFBF]">
        {etape.description}
      </p>
      <p className="pt-3 font-mono text-[11px] leading-4 tracking-[0.06em] text-accent">
        {etape.duree}
      </p>
    </article>
  )
}
