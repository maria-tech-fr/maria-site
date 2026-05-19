import Breadcrumb, { type BreadcrumbSegment } from '../Breadcrumb'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type ContactHeroProps = {
  surTitre: string
  /** Encadrer un fragment avec **...** pour le rendre en jaune. */
  titre: string
  description?: string | null
  breadcrumb?: BreadcrumbSegment[]
}

export default function ContactHero({
  surTitre,
  titre,
  description,
  breadcrumb,
}: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-22.5 pt-45.5 lg:px-30.5 lg:pb-22.5 lg:pt-45.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.38, x: '88%', y: '15%', size: 760, blur: 40, duration: 38 },
          { color: '#3FC163', alpha: 0.30, x: '95%', y: '85%', size: 760, blur: 50, duration: 44 },
        ]}
      />

      <div className="relative flex flex-col gap-6">
        <Reveal>
          {breadcrumb ? (
            <Breadcrumb segments={breadcrumb} tone="dark" />
          ) : (
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.08em] text-success-soft">
              {surTitre}
            </p>
          )}
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-260 whitespace-pre-line font-display text-[44px] font-semibold leading-12 tracking-[-0.048em] text-paper lg:text-[80px] lg:leading-[90px]">
            {renderTitre(titre)}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className="max-w-[820px] whitespace-pre-line pt-2 text-[16px] leading-7 text-[#CFCFCF] lg:text-[20px] lg:leading-[30px]">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function renderTitre(texte: string): React.ReactNode {
  if (!texte.includes('**')) return texte
  const parts = texte.split(/\*\*([^*]+)\*\*/g)
  return parts.map((part, i) => {
    if (i % 2 === 0) return <span key={i}>{part}</span>
    return (
      <span key={i} className="text-accent">
        {part}
      </span>
    )
  })
}
