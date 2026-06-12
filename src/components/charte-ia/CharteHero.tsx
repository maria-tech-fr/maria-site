import Breadcrumb, { type BreadcrumbSegment } from '../Breadcrumb'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  breadcrumb?: BreadcrumbSegment[]
}

export default function CharteHero({ surTitre, titre, sousTitre, breadcrumb }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-22.5 pt-24 lg:px-30.5 lg:pb-22.5 lg:pt-45.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.4, x: '85%', y: '70%', size: 700, blur: 60, duration: 42 },
          { color: '#FEC23C', alpha: 0.22, x: '92%', y: '18%', size: 460, blur: 65, duration: 48 },
          { color: '#3FC163', alpha: 0.22, x: '15%', y: '88%', size: 520, blur: 65, duration: 50 },
        ]}
      />

      <article className="relative mx-auto flex w-full max-w-[760px] flex-col gap-7 lg:mx-0 lg:max-w-[820px]">
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
          <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] text-paper text-balance lg:text-[80px] lg:leading-[1.02]">
            {titre}
          </h1>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="max-w-[60ch] whitespace-pre-line text-[16px] leading-[1.6] text-[#CFCFCF] lg:text-[18px] lg:leading-[1.55]">
              {sousTitre}
            </p>
          </Reveal>
        )}
      </article>
    </section>
  )
}
