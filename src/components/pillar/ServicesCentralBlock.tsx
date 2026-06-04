import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { ServiceMenuItem } from '../../lib/pageService'

/**
 * Bloc central du pilier /services : 3 cards de service.
 * Reçoit la liste tirée de getServicesMenu (Sanity).
 */
type Props = {
  services: ServiceMenuItem[]
}

// Tag hook (signal d'audience) court, par slug, pour chaque service.
// Géré en code car éditorialisé et stable. À déplacer en Sanity si besoin de
// pilotage CMS plus tard.
const TAG_BY_SLUG: Record<string, string> = {
  'audit-et-strategie-ia': 'pour qui ne sait pas par où commencer',
  'outils-IA-internes-sur-mesure': 'pour qui a un besoin métier précis',
  'agents-conversationnels-ia': 'pour qui veut soulager ses équipes',
}

const HOOK_BY_SLUG: Record<string, string> = {
  'audit-et-strategie-ia': 'Cadrer avant de coder.',
  'outils-IA-internes-sur-mesure': 'Les plateformes que vos équipes utilisent au quotidien.',
  'agents-conversationnels-ia': 'Les assistants qui travaillent aux côtés de vos équipes.',
}

export default function ServicesCentralBlock({ services }: Props) {
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
              // nos 3 services
            </p>
            <h2 className="max-w-[24ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              Trois services. Une logique : cadrer, construire, déployer.
            </h2>
            <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[18px]">
              Chacun se suffit à lui-même. Ensemble, ils couvrent tout le cycle d’un projet IA interne.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={100 + i * 80} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group/sv flex h-full flex-col gap-4 rounded-[16px] border border-paper-edge bg-paper p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-[0_22px_48px_-22px_rgba(254,194,60,0.40)] lg:p-11"
              >
                <span className="font-mono text-[36px] font-medium leading-none tracking-[-0.02em] text-success lg:text-[42px]">
                  {String(s.ordreMenu).padStart(2, '0')}
                </span>
                <h3 className="mt-6 max-w-[18ch] font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[28px]">
                  {s.titre}
                </h3>
                {HOOK_BY_SLUG[s.slug] && (
                  <p className="font-medium text-[15.5px] leading-[1.4] text-ink lg:text-[16px]">
                    {HOOK_BY_SLUG[s.slug]}
                  </p>
                )}
                {s.introCourte && (
                  <p className="text-[15px] leading-[1.6] text-ink-soft">{s.introCourte}</p>
                )}
                {TAG_BY_SLUG[s.slug] && (
                  <span className="inline-flex w-fit items-center rounded-full border border-[#C9EAD3] bg-success-tint px-2.5 py-1 font-mono text-[11px] lowercase tracking-[0.05em] text-success">
                    {TAG_BY_SLUG[s.slug]}
                  </span>
                )}
                <span className="mt-auto inline-flex w-fit border-b-[1.5px] border-accent pb-0.5 font-medium text-[15px] leading-5 text-ink transition-colors duration-300 ease-out group-hover/sv:border-success group-hover/sv:text-success">
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
