import CtaSecondaire from './CtaSecondaire'
import Reveal from './Reveal'
import { type Experts as ExpertsData, type MembreExpert } from '../lib/accueil'
import { imageSrc, initiales } from '../lib/blog'

export default function Experts({ data }: { data: ExpertsData }) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-7.5">
        <Reveal>
          <div className="flex flex-col gap-2.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="max-w-196.75 whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-15.5">
              {data.titre}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-173.5 whitespace-pre-line text-[16px] leading-6 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
            {data.description}
          </p>
        </Reveal>

        {data.membres && data.membres.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-7.5">
            {data.membres.map((m, i) => (
              <Reveal key={i} delay={200 + i * 100}>
                <ExpertCard membre={m} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        {data.lien && (
          <Reveal delay={500}>
            <div className="pt-2.5">
              <CtaSecondaire lien={data.lien} withArrow />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function ExpertCard({ membre, index }: { membre: MembreExpert; index: number }) {
  const haloStyle =
    index === 1
      ? 'radial-gradient(circle at 50% 50%, rgba(63, 193, 99, 0.15) 0%, rgba(63, 193, 99, 0) 70%)'
      : 'radial-gradient(circle at 50% 50%, rgba(254, 194, 60, 0.20) 0%, rgba(254, 194, 60, 0) 70%)'

  return (
    <article className="relative overflow-hidden rounded-[5px] border border-paper-edge bg-paper-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-20%] top-[-20%] h-[60%] w-[60%]"
        style={{ background: haloStyle, filter: 'blur(20px)' }}
      />

      <div
        className="relative flex aspect-square items-end p-5"
        style={{
          background: 'linear-gradient(129deg, #DEDEDE 0%, #E8E8E8 100%)',
        }}
      >
        {(() => {
          const photo = membre.photo?.asset ? imageSrc(membre.photo, 760, 760) : null
          if (photo) {
            return (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photo}
                alt={membre.nom}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )
          }
          // Fallback sans photo : initiales centrées sur dégradé maria.
          return (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-[40px] font-bold text-ink/30"
              style={{ letterSpacing: '0.04em' }}
            >
              {initiales(membre.nom)}
            </span>
          )
        })()}

        {membre.badge && (
          <span className="relative rounded-[3px] bg-white/85 px-2 py-0.75 font-mono text-[9px] leading-[13.95px] tracking-[0.08em] text-ink">
            {membre.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 px-5 pt-4.25 pb-4.5">
        <h3 className="font-display text-[18px] font-semibold leading-[27.9px] tracking-[-0.01em] text-ink">
          {membre.nom}
        </h3>
        <p className="font-mono text-[10px] leading-[15.5px] tracking-[0.08em] text-ink-soft">
          {membre.role}
        </p>
      </div>
    </article>
  )
}

