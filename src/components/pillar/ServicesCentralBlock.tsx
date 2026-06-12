import Link from 'next/link'
import GradientBorderHover from '../GradientBorderHover'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { ServiceMenuItem } from '../../lib/pageService'

/**
 * Bloc central du pilier /services : 3 cards de service.
 * Reçoit la liste tirée de getServicesMenu (Sanity) et l'en-tête éditable
 * depuis le doc pagePillier (champ `central`).
 */
type Props = {
  services: ServiceMenuItem[]
  surTitre?: string | null
  titre?: string | null
  sousTitre?: string | null
}

export default function ServicesCentralBlock({ services, surTitre, titre, sousTitre }: Props) {
  const headerSurTitre = surTitre || '// nos 3 services'
  const headerTitre = titre || 'Trois services. Une logique : cadrer, construire, déployer.'
  const headerSousTitre = sousTitre || 'Chacun se suffit à lui-même. Ensemble, ils couvrent tout le cycle d’un projet IA interne.'
  return (
    <section
      id="central"
      className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-30"
      style={{ scrollMarginTop: '96px' }}
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.32, x: '-6%', y: '10%', size: 560, blur: 50, duration: 40 },
          { color: '#3FC163', alpha: 0.26, x: '92%', y: '88%', size: 540, blur: 50, duration: 44 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[880px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {headerSurTitre}
            </p>
            <h2 className="max-w-[24ch] whitespace-pre-line font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {headerTitre}
            </h2>
            <p className="max-w-[62ch] whitespace-pre-line text-[17px] leading-[1.6] text-ink-soft lg:text-[18px]">
              {headerSousTitre}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={100 + i * 80} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group/grad relative flex h-full flex-col gap-4 rounded-2xl border border-paper-edge bg-paper p-10 transition-shadow duration-300 ease-out hover:shadow-[0_22px_48px_-22px_rgba(63,193,99,0.30)] lg:p-11"
              >
                <GradientBorderHover rounded="rounded-2xl" index={i} />
                <span className="font-mono text-[36px] font-medium leading-none tracking-[-0.02em] text-success lg:text-[42px]">
                  {String(s.ordreMenu).padStart(2, '0')}
                </span>
                <h3 className="mt-6 max-w-[18ch] font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[28px]">
                  {s.titre}
                </h3>
                {s.accroche && (
                  <p className="font-medium text-[15.5px] leading-[1.4] text-ink lg:text-[16px]">
                    {s.accroche}
                  </p>
                )}
                {s.audienceTag && (
                  <span className="inline-flex w-fit items-center rounded-full border border-[#C9EAD3] bg-success-tint px-2.5 py-1 font-mono text-[11px] lowercase tracking-wider text-success">
                    {s.audienceTag}
                  </span>
                )}
                <span className="mt-auto inline-flex w-fit border-b-[1.5px] border-accent pb-0.5 font-medium text-[15px] leading-5 text-ink transition-colors duration-300 ease-out group-hover/grad:border-success group-hover/grad:text-success">
                  Découvrir ce service →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
