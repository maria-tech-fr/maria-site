import Link from 'next/link'
import GradientBorderHover from '../GradientBorderHover'
import HaloField from '../HaloField'
import Reveal from '../Reveal'

type RelatedItem = {
  titre: string
  slug: string
  introCourte: string | null
}

type Props = {
  surTitre: string
  titre: string
  references: RelatedItem[]
}

export default function BesoinRelated({ surTitre, titre, references }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '94%', y: '20%', size: 440, blur: 40, duration: 36 },
        ]}
      />

      <div className="relative flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[32px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[44px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {references.map((r, i) => (
            <Reveal key={r.slug} delay={120 + i * 80} className="h-full">
              <Link
                href={`/besoins/${r.slug}`}
                className="group/grad relative flex h-full flex-col gap-3 rounded-xl border border-paper-edge bg-paper p-7 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-12px_rgba(63,193,99,0.25)]"
              >
                <GradientBorderHover rounded="rounded-xl" index={i} />
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-success">
                  Besoin
                </p>
                <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.016em] text-ink">
                  {r.titre}
                </h3>
                {r.introCourte && (
                  <p className="flex-1 text-[14.5px] leading-[1.5] text-ink-soft">
                    {r.introCourte}
                  </p>
                )}
                <span className="mt-2 inline-flex w-fit border-b-[1.5px] border-accent pb-0.5 font-medium text-[14px] leading-5 text-ink">
                  Voir →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
