import type { AuteurRef } from '../../lib/article'
import { avatarSrc, initiales } from '../../lib/blog'

export default function AuthorBlock({ auteur }: { auteur: AuteurRef }) {
  if (!auteur?.nom) return null
  const avatar = avatarSrc(auteur, 96)

  return (
    <footer
      aria-label="À propos de l'auteur"
      className="mt-16 flex flex-col gap-5 rounded-[10px] border border-paper-edge bg-paper-soft p-8 sm:flex-row sm:items-start sm:gap-7"
    >
      {avatar ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={avatar}
          alt={auteur.nom}
          className="h-16 w-16 flex-none rounded-full border border-paper-edge object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-16 w-16 flex-none items-center justify-center rounded-full font-display text-[20px] font-bold text-ink"
          style={{
            background:
              'linear-gradient(135deg, rgba(254, 194, 60, 1) 0%, rgba(63, 193, 99, 1) 100%)',
            letterSpacing: '0.04em',
          }}
        >
          {initiales(auteur.nom)}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          Écrit par
        </p>
        <p className="font-display text-[18px] font-semibold leading-6 tracking-[-0.015em] text-ink">
          {auteur.nom}
        </p>
        {auteur.role && (
          <p className="text-[14px] leading-5 text-ink-soft">{auteur.role}</p>
        )}
        {auteur.bio && (
          <p className="pt-2 text-[14.5px] leading-6 text-ink">{auteur.bio}</p>
        )}
      </div>
    </footer>
  )
}
