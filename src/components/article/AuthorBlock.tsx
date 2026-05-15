import Link from 'next/link'
import HaloField from '../HaloField'
import type { AuteurRef } from '../../lib/article'
import { avatarSrc, initiales } from '../../lib/blog'

export default function AuthorBlock({ auteur }: { auteur: AuteurRef }) {
  if (!auteur?.nom) return null
  const avatar = avatarSrc(auteur, 280)

  return (
    <section
      aria-label="À propos de l'auteur"
      className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.22, x: '14%', y: '50%', size: 700, blur: 55, duration: 38 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-9 sm:flex-row sm:items-center sm:gap-12">
        {/* Avatar carré gradient 140x140 (ou photo si renseignée) */}
        {avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatar}
            alt={auteur.nom}
            className="h-35 w-35 flex-none rounded-[14px] border border-white/10 object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-35 w-35 flex-none items-center justify-center rounded-[14px] font-display font-bold text-ink"
            style={{
              background:
                'linear-gradient(135deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
              fontSize: 54,
              letterSpacing: '0.04em',
            }}
          >
            {initiales(auteur.nom).charAt(0)}
          </span>
        )}

        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            // l’auteur
          </p>
          <h2 className="font-display text-[22px] font-semibold leading-7 tracking-[-0.02em] text-paper lg:text-[28px] lg:leading-9">
            {auteur.nom}
          </h2>
          {auteur.role && (
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {`// ${auteur.role.toLowerCase()}`}
            </p>
          )}
          {auteur.bio && (
            <p className="max-w-[540px] pt-3 text-[15.5px] leading-[25px] text-[#CFCFCF] lg:text-[16px] lg:leading-[25.6px]">
              {auteur.bio}
            </p>
          )}
          <Link
            href="/blog"
            className="mt-3 self-start font-medium text-[14px] leading-5 text-success underline underline-offset-2 transition-colors duration-300 ease-out hover:text-accent"
          >
            Voir tous nos articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
