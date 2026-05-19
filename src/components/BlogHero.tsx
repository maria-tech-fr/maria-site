import Breadcrumb, { type BreadcrumbSegment } from './Breadcrumb'
import HaloField from './HaloField'
import Reveal from './Reveal'
import { renderWithEmphase } from '../lib/emphase'

type BlogHeroProps = {
  surTitre?: string
  /** Multi-lignes via \n. Encadrer un fragment avec **...** pour le rendre en jaune. */
  titre: string
  description?: string
  breadcrumb?: BreadcrumbSegment[]
}

export default function BlogHero({
  surTitre = '// blog',
  titre,
  description,
  breadcrumb,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-22.5 pt-45.5 lg:px-30.5 lg:pb-22.5 lg:pt-45.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.28, x: '10%', y: '20%', size: 750, blur: 60, duration: 40 },
          { color: '#3FC163', alpha: 0.22, x: '90%', y: '85%', size: 620, blur: 50, duration: 44 },
        ]}
      />

      <div className="relative flex flex-col gap-6">
        <Reveal>
          {breadcrumb ? (
            <Breadcrumb segments={breadcrumb} tone="dark" />
          ) : (
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
          )}
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-260 whitespace-pre-line font-display text-[44px] font-semibold leading-12 tracking-[-0.035em] text-paper lg:text-[92px] lg:leading-[92px]">
            {renderWithEmphase(titre, 'text-accent')}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className="max-w-[820px] whitespace-pre-line pt-2 text-[16px] leading-7 text-[#CFCFCF] lg:text-[20px] lg:leading-[31px]">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

