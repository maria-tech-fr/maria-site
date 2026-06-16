import HaloField from './HaloField'
import Reveal from './Reveal'
import type { KpiProjet, ServiceProjetPhare as ServiceProjetPhareData } from '../lib/pageService'

export default function ServiceProjetPhare({ data }: { data: ServiceProjetPhareData }) {
  if (!data.titre && !data.description && (!data.kpis || data.kpis.length === 0)) return null

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.22, x: '12%', y: '20%', size: 700, blur: 60, duration: 40 },
          { color: '#3FC163', alpha: 0.18, x: '88%', y: '78%', size: 580, blur: 55, duration: 44 },
        ]}
      />

      <div className="relative flex flex-col gap-10">
        <Reveal>
          <div className="flex flex-col gap-2">
            {data.surTitre && (
              <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                {data.surTitre}
              </p>
            )}
            {data.titre && (
              <h2 className="lg:max-w-[75%] whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-tight text-paper lg:text-[60px] lg:leading-[62px]">
                {data.titre}
              </h2>
            )}
          </div>
        </Reveal>

        {data.description && (
          <Reveal delay={120}>
            <p className="max-w-[680px] whitespace-pre-line text-[16px] leading-7 text-[#D5D5D5] lg:text-[17px] lg:leading-[28px]">
              {data.description}
            </p>
          </Reveal>
        )}

        {data.kpis && data.kpis.length > 0 && (
          <Reveal delay={180}>
            <div className="grid grid-cols-1 gap-8 border-t border-white/30 pt-12 sm:grid-cols-3">
              {data.kpis.map((kpi, i) => (
                <KpiCol key={i} kpi={kpi} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function KpiCol({ kpi }: { kpi: KpiProjet }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-display text-[48px] font-bold leading-none tracking-[-0.03em] text-accent lg:text-[64px] lg:leading-[60.8px]">
        {kpi.chiffre}
      </span>
      <span className="text-[14.5px] leading-[21px] text-[#BFBFBF]">{kpi.libelle}</span>
    </div>
  )
}
