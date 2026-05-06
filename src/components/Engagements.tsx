import BlockHeader from './BlockHeader'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { Engagements as EngagementsData } from '../lib/agence'

export default function Engagements({ data }: { data: EngagementsData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.3, x: '90%', y: '15%', size: 650, blur: 50, duration: 28 },
        ]}
      />

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[462px_1fr] lg:gap-30">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              surTitreClass="text-success-soft"
              titreClass="text-paper"
            />
          </div>
        </Reveal>

        {data.points && data.points.length > 0 && (
          <div className="flex max-w-160 flex-col">
            {data.points.map((point, i) => (
              <Reveal key={i} delay={150 + i * 70}>
                <PointEngagement texte={point} isLast={i === data.points!.length - 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function PointEngagement({ texte, isLast }: { texte: string; isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-5 border-t border-white/10 py-5.5 ${
        isLast ? 'border-b' : ''
      }`}
    >
      <CheckIcon className="h-7 w-7 shrink-0" />
      <p className="text-[15px] leading-6 text-paper lg:text-[16px] lg:leading-6">{texte}</p>
    </div>
  )
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect width="28" height="28" rx="14" fill="rgba(63, 193, 99, 0.15)" />
      <path
        d="M9.33 14.5l3 3 6.34-7"
        stroke="#3FC163"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
