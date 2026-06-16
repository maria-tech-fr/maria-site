/*
  État « fermé » du widget WhatsApp — pilule arrondie sticky en bas-droite.
  Clic = ré-ouverture de la carte. Toujours visible une fois affichée
  (jusqu'à l'ouverture de la carte par le user ou changement de page).

  Le badge « 1 » n'apparaît qu'en heures ouvrées (on est en ligne) — c'est
  un signal de présence honnête. Hors ligne, on évite le faux signal.
*/

type Props = {
  visible: boolean
  isOffice: boolean
  onOpen: () => void
}

export default function WhatsappPill({ visible, isOffice, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Ouvrir le contact WhatsApp"
      className={`group fixed bottom-6 right-6 z-[60] inline-flex items-center gap-2.5 rounded-full border border-ink/8 bg-paper py-2 pl-2 pr-2.5 font-sans text-ink shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_18px_40px_-18px_rgba(33,33,33,0.28),0_6px_14px_-10px_rgba(33,33,33,0.18)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-[0.96] opacity-0'
      } max-sm:bottom-3 max-sm:right-3`}
    >
      {/* Avatar — badge « 1 » uniquement quand on est en ligne (isOffice). */}
      <span
        aria-hidden
        className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent font-mono text-[15px] font-medium tracking-[-0.04em] text-ink shadow-[0_4px_10px_-4px_rgba(254,194,60,0.5)]"
      >
        m
        {isOffice && (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-paper bg-success px-1 font-sans text-[10px] font-semibold leading-none text-paper"
          >
            1
          </span>
        )}
      </span>

      {/* Label deux lignes */}
      <span className="flex min-w-0 flex-col items-start gap-0.5 text-left leading-[1.15]">
        <span className="font-display text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
          maria
        </span>
        <span className="font-mono text-[10.5px] normal-case tracking-[0.06em] text-success">
          une question ?
        </span>
      </span>

      {/* Chevron rond — devient ink au hover */}
      <span
        aria-hidden
        className="ml-1 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-paper-soft text-ink-soft transition-[background-color,color,transform] duration-300 ease-out group-hover:bg-ink group-hover:text-paper"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M18 15l-6-6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
