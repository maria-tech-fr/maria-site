import HaloField from './HaloField'
import Reveal from './Reveal'
import type {
  SectionRapport,
  ServiceLivrableRapport as ServiceLivrableRapportData,
} from '../lib/pageService'

export default function ServiceLivrableRapport({ data }: { data: ServiceLivrableRapportData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.18, x: '15%', y: '25%', size: 600, blur: 45, duration: 38 },
          { color: '#3FC163', alpha: 0.14, x: '20%', y: '70%', size: 580, blur: 45, duration: 42 },
        ]}
      />

      <div className="relative grid grid-cols-1 gap-15 lg:grid-cols-[1fr_auto] lg:items-start">
        <Reveal>
          <div className="flex flex-col gap-5 lg:max-w-100">
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

        <Reveal delay={150}>
          <RapportMockup data={data} />
        </Reveal>
      </div>
    </section>
  )
}

function RapportMockup({ data }: { data: ServiceLivrableRapportData }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[5px] border border-white/8 bg-white/4 px-8 pb-12 pt-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] lg:w-[610px] lg:px-10 lg:pb-12 lg:pt-12"
    >
      {/* Bande gradient jaune→vert en haut */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
        style={{
          background:
            'linear-gradient(90deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
        }}
      />

      {/* Header du mockup */}
      <div className="flex flex-col gap-1.5 pb-6">
        {data.mockupKicker && (
          <p className="font-mono text-[11px] leading-4 tracking-[0.06em] text-[#888888]">
            {data.mockupKicker}
          </p>
        )}
        <h3 className="font-display text-[22px] font-semibold leading-[28.8px] tracking-[-0.02em] text-paper lg:text-[24px]">
          {data.mockupTitre}
        </h3>
        {data.mockupMeta && (
          <p className="pt-1 font-mono text-[11px] leading-4 text-[#888888]">
            {data.mockupMeta}
          </p>
        )}
      </div>

      <div className="border-t border-white/10" />

      {/* Sections */}
      {data.sections && data.sections.length > 0 && (
        <div className="flex flex-col">
          {data.sections.map((section, i) => (
            <SectionRow
              key={i}
              section={section}
              isLast={i === data.sections!.length - 1}
            />
          ))}
        </div>
      )}

      {/* Annexes */}
      {(data.annexesTitre || (data.annexes && data.annexes.length > 0)) && (
        <div className="mt-2 border-t-2 border-white/10 pt-6">
          <p className="pb-4 font-mono text-[11px] leading-4 tracking-[0.06em] text-accent">
            ANNEXES
          </p>
          {data.annexesTitre && (
            <h4 className="pb-2 font-display text-[15px] font-semibold tracking-[-0.01em] text-paper">
              {data.annexesTitre}
            </h4>
          )}
          {data.annexes && data.annexes.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {data.annexes.map((annexe, i) => (
                <li key={i} className="flex items-start gap-2 pl-3.5">
                  <span aria-hidden className="font-bold text-success">·</span>
                  <span className="text-[12.5px] leading-5 text-[#BFBFBF]">{annexe}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function SectionRow({ section, isLast }: { section: SectionRapport; isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-7 py-3.5 ${isLast ? '' : 'border-b border-dashed border-white/10'}`}
    >
      <span className="flex-none pt-0.5 font-mono text-[13px] font-medium text-success">
        {section.numero}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <h5 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-paper">
          {section.titre}
        </h5>
        <p className="whitespace-pre-line text-[12.5px] leading-[18.13px] text-[#BFBFBF]">
          {section.description}
        </p>
      </div>
      <span className="flex-none pt-0.5 font-mono text-[11px] leading-4 text-[#777777]">
        {section.pages}
      </span>
    </div>
  )
}
