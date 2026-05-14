import Reveal from './Reveal'
import type { ServiceCitation as ServiceCitationData } from '../lib/pageService'
import { renderWithEmphase } from '../lib/emphase'

export default function ServiceCitation({ data }: { data: ServiceCitationData }) {
  return (
    <section className="relative overflow-hidden bg-[#FFFBEE] px-6 py-22 lg:px-30.5 lg:py-30">
      {/* Halos décoratifs : jaune top-right + vert bottom-left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-25%] h-200 w-200"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 194, 60, 0.45) 0%, rgba(254, 194, 60, 0) 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-12%] h-130 w-130"
        style={{
          background:
            'radial-gradient(circle, rgba(63, 193, 99, 0.22) 0%, rgba(63, 193, 99, 0) 70%)',
          filter: 'blur(45px)',
        }}
      />

      <Reveal>
        <div className="relative flex flex-col gap-12">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {data.surTitre}
          </p>

          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-[-100px] select-none font-display font-bold leading-none text-accent lg:text-[200px]"
              style={{ fontSize: '160px', opacity: 0.45 }}
            >
              “
            </span>

            <blockquote className="relative max-w-[920px]">
              <p className="whitespace-pre-line font-display text-[28px] font-medium leading-[34px] tracking-[-0.025em] text-ink lg:text-[60px] lg:leading-[69px]">
                {renderWithEmphase(data.texte, 'rounded-[6px] bg-accent/12 px-1.5')}
              </p>
            </blockquote>
          </div>

          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex-none rounded-3xl"
              style={{
                width: 48,
                height: 48,
                background:
                  'linear-gradient(135deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
              }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[16px] font-semibold leading-6 tracking-[-0.01em] text-ink">
                {data.auteur}
              </span>
              {data.auteurTag && (
                <span className="font-mono text-[11px] leading-[17.6px] uppercase tracking-[0.06em] text-ink-soft">
                  {data.auteurTag}
                </span>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
