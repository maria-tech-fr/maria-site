import HaloField from './HaloField'
import Reveal from './Reveal'
import type { RepartitionColonne, ServiceRepartition as ServiceRepartitionData } from '../lib/pageService'

export default function ServiceRepartition({ data }: { data: ServiceRepartitionData }) {
  const hasA = !!data.colonneA && (data.colonneA.items?.length ?? 0) > 0
  const hasB = !!data.colonneB && (data.colonneB.items?.length ?? 0) > 0
  if (!data.titre && !hasA && !hasB) return null

  return (
    <section className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '8%', y: '88%', size: 580, blur: 50, duration: 38 },
          { color: '#3FC163', alpha: 0.18, x: '92%', y: '12%', size: 560, blur: 50, duration: 42 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-5">
            {data.surTitre && (
              <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                {data.surTitre}
              </p>
            )}
            {data.titre && (
              <h2 className="lg:max-w-[75%] whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
                {data.titre}
              </h2>
            )}
            {data.sousTitre && (
              <p className="whitespace-pre-line text-[16px] leading-7 text-ink-soft lg:text-[18px] lg:leading-[28.8px]">
                {data.sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {hasA && (
            <Reveal delay={120}>
              <RepartitionCard colonne={data.colonneA!} tone="success" />
            </Reveal>
          )}
          {hasB && (
            <Reveal delay={180}>
              <RepartitionCard colonne={data.colonneB!} tone="accent" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function RepartitionCard({
  colonne,
  tone,
}: {
  colonne: RepartitionColonne
  tone: 'success' | 'accent'
}) {
  // tone success = vert pastel #E8FFEE / bullet vert
  // tone accent = jaune pastel #FFFBEE / bullet jaune
  const bg = tone === 'success' ? 'bg-[#E8FFEE]' : 'bg-[#FFFBEE]'
  const border =
    tone === 'success'
      ? 'border-[rgba(63,193,99,0.3)]'
      : 'border-[rgba(254,194,60,0.3)]'
  const bullet = tone === 'success' ? 'text-success' : 'text-accent'

  return (
    <article className={`flex h-full flex-col gap-5 rounded-[5px] border ${border} ${bg} p-10`}>
      {colonne.titre && (
        <h3 className="font-display text-[22px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[24px] lg:leading-[28.8px]">
          {colonne.titre}
        </h3>
      )}
      {colonne.items && colonne.items.length > 0 && (
        <ul className="flex flex-col gap-3">
          {colonne.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span aria-hidden className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${bullet === 'text-success' ? 'bg-success' : 'bg-accent'}`} />
              <span className="text-[15.5px] leading-6 text-ink">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
