import Reveal from './Reveal'
import type { EtapeProcessus, Processus as ProcessusData } from '../lib/agence'

export default function Processus({ data }: { data: ProcessusData }) {
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-22.5">
      {/* Halo statique (pas d'animation, comme la Méthode sur la home). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-150 w-150"
          style={{
            left: '85%',
            top: '88%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(63, 193, 99, 0.30) 0%, rgba(63, 193, 99, 0) 70%)',
            filter: 'blur(48px)',
          }}
        />
      </div>

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-15.5">
              {data.titre}
            </h2>
            {data.sousTitre && (
              <p className="text-[16px] leading-6 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
                {data.sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        {data.etapes && data.etapes.length > 0 && (
          <div className="flex max-w-180 flex-col">
            {data.etapes.map((etape, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <EtapeItem etape={etape} isLast={i === data.etapes!.length - 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function EtapeItem({ etape, isLast }: { etape: EtapeProcessus; isLast: boolean }) {
  return (
    <div
      className={`grid grid-cols-[44px_1fr] gap-x-4 border-t border-ink/10 py-8 sm:grid-cols-[72px_1fr] lg:grid-cols-[100px_1fr] ${
        isLast ? 'border-b' : ''
      }`}
    >
      <p className="font-mono text-[14px] leading-[22.4px] tracking-[0.06em] text-ink">
        {etape.numero}
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[24px] lg:leading-[38.4px]">
          {etape.titre}
        </h3>
        <p className="whitespace-pre-line text-[15px] leading-6 text-ink-soft lg:text-[16px] lg:leading-[24.8px]">
          {etape.description}
        </p>
      </div>
    </div>
  )
}
