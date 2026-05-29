import HaloField from './HaloField'
import Reveal from './Reveal'
import type { NonNegociables as NonNegociablesData, PointNonNegociable } from '../lib/agence'

export default function NonNegociables({ data }: { data: NonNegociablesData }) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.32, x: '85%', y: '15%', size: 700, blur: 50, duration: 30 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="max-w-220 font-display text-[36px] font-semibold leading-10 tracking-[-0.03em] text-ink lg:text-[64px] lg:leading-15.5">
              {data.titre}
            </h2>
            {data.sousTitre && (
              <p className="text-[16px] leading-6 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
                {data.sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        {data.points && data.points.length > 0 && (
          <div className="max-w-180">
            {data.points.map((point, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <PointItem point={point} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function PointItem({ point }: { point: PointNonNegociable }) {
  return (
    <div className="flex gap-5 border-b border-paper-edge py-7 first:border-t">
      <InterditIcon className="h-10 w-10 shrink-0" />
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.015em] text-ink lg:text-[22px] lg:leading-[35.2px]">
          {point.titre}
        </h3>
        <p className="max-w-145 text-[15px] leading-6 text-ink-soft lg:text-[16px] lg:leading-[24.8px]">
          {point.description}
        </p>
      </div>
    </div>
  )
}

function InterditIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect width="40" height="40" rx="5" fill="#FFFBEE" />
      <path
        d="M20 27.5C24.1421 27.5 27.5 24.1421 27.5 20C27.5 15.8579 24.1421 12.5 20 12.5C15.8579 12.5 12.5 15.8579 12.5 20C12.5 24.1421 15.8579 27.5 20 27.5Z"
        stroke="#FEC23C"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 14.6667L25.3334 25.3334"
        stroke="#FEC23C"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
