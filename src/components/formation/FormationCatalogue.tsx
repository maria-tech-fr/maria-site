import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { FormationFamille, FormationItem } from '../../lib/pageFormation'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  familles: FormationFamille[]
}

export default function FormationCatalogue({ surTitre, titre, sousTitre, familles }: Props) {
  return (
    <section
      id="catalogue"
      className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-30"
      style={{ scrollMarginTop: '96px' }}
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.32, x: '92%', y: '8%', size: 540, blur: 45, duration: 36 },
          { color: '#3FC163', alpha: 0.22, x: '-6%', y: '92%', size: 520, blur: 45, duration: 40 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[820px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">{surTitre}</p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="text-[17px] leading-[1.6] text-ink-soft lg:text-[18px]">{sousTitre}</p>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-16 lg:gap-20">
          {familles.map((f) => (
            <FamilleBlock key={f.label} famille={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FamilleBlock({ famille }: { famille: FormationFamille }) {
  const isSingle = famille.formations.length === 1
  return (
    <Reveal>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b border-paper-edge pb-7">
          <p className="font-mono text-[12px] font-medium leading-[19.2px] tracking-[0.08em] text-success">
            {famille.label}
          </p>
          <h3 className="max-w-[30ch] font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.022em] text-ink lg:text-[30px]">
            {famille.tagline}
          </h3>
        </div>
        <div
          className={`grid grid-cols-1 gap-5 ${
            isSingle ? 'lg:grid-cols-1 lg:max-w-[760px]' : 'md:grid-cols-2'
          } lg:gap-6`}
        >
          {famille.formations.map((f) => (
            <FormationCard key={f.numero} formation={f} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function FormationCard({ formation }: { formation: FormationItem }) {
  return (
    <article className="group/f flex h-full flex-col gap-4 rounded-[8px] border border-paper-edge bg-paper p-9 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_20px_-12px_rgba(254,194,60,0.30)]">
      <span className="font-mono text-[32px] font-medium leading-none tracking-[-0.02em] text-accent">
        {formation.numero}
      </span>
      <h4 className="max-w-[24ch] font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.018em] text-ink">
        {formation.titre}
      </h4>
      <span className="inline-flex w-fit items-center rounded-full border border-[#C9EAD3] bg-success-tint px-2.5 py-1 font-mono text-[11px] lowercase tracking-[0.05em] text-success">
        {formation.public}
      </span>
      <p className="flex-1 text-[15px] leading-[1.6] text-ink-soft">{formation.description}</p>
      <div className="mt-2 flex items-center gap-2 border-t border-dotted border-paper-edge pt-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="opacity-50">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span className="font-mono text-[11.5px] leading-4 tracking-[0.04em] text-[#888]">
          {formation.duree}
        </span>
      </div>
    </article>
  )
}
