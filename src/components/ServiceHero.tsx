import Breadcrumb, { type BreadcrumbSegment } from './Breadcrumb'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { ServiceHero as ServiceHeroData } from '../lib/pageService'
import { renderWithEmphase } from '../lib/emphase'

type Props = {
  data: ServiceHeroData
  /** Si fourni, remplace le sur-titre Sanity par un fil d'Ariane signature. */
  breadcrumb?: BreadcrumbSegment[]
}

export default function ServiceHero({ data, breadcrumb }: Props) {
  const ctaHref = data.ctaHref || '#'
  // Ajoute la flèche → si l'éditeur ne l'a pas mise dans le libellé.
  const ctaLabel = /[→→]\s*$/.test(data.ctaLibelle)
    ? data.ctaLibelle
    : `${data.ctaLibelle} →`

  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-22.5 pt-45.5 lg:px-30.5 lg:pb-22.5 lg:pt-45.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.55, x: '8%', y: '18%', size: 700, blur: 50, duration: 36 },
          { color: '#3FC163', alpha: 0.30, x: '90%', y: '78%', size: 500, blur: 45, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex flex-col gap-6">
            {breadcrumb ? (
              <Breadcrumb segments={breadcrumb} tone="light" />
            ) : (
              <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                {data.surTitre}
              </p>
            )}
            <h1 className="max-w-260 whitespace-pre-line font-display text-[44px] font-semibold leading-12 tracking-[-0.04em] text-ink lg:text-[80px] lg:leading-[90px]">
              {renderWithEmphase(
                data.titre,
                data.titreEmphaseTone === 'ink-soft' ? 'text-ink-soft' : 'text-accent',
              )}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-col gap-6">
            <p className="max-w-220 whitespace-pre-line text-[16px] leading-6 text-ink-soft lg:text-[20px] lg:leading-[31px]">
              {data.description}
            </p>
            <a
              href={ctaHref}
              className="inline-flex h-[46px] items-center self-start rounded-[5px] bg-accent px-5 font-medium text-[14px] leading-5 text-ink transition-colors duration-300 ease-out hover:bg-accent/85"
            >
              {ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
