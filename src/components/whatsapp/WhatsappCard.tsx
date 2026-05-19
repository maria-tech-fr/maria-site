import { getWaLink } from '../../config/contact'

/*
  Carte « ouverte » du widget WhatsApp — 340px desktop, full-width mobile.
  Wording adapté à l'horaire (heures ouvrées Lun-Ven 9h-19h Paris) :
    - ouvert → // on est là  + accroche « Une vraie réponse, par un humain »
    - fermé → // hors ligne + « écrivez quand même, on revient vers vous »

  Style 100% palette maria — PAS le vert WhatsApp. Le vert utilisé est notre
  success (#3FC163) qui est différent du vert WhatsApp officiel (#25D366).

  Mounted=true contrôle l'animation d'entrée (slide-up + fade). Le composant
  reste toujours dans le DOM (pointer-events:none quand non visible) pour
  permettre la transition CSS smooth.
*/

type Props = {
  visible: boolean
  isOffice: boolean
  onReply: () => void
  onLater: () => void
}

export default function WhatsappCard({ visible, isOffice, onReply, onLater }: Props) {
  const status = isOffice
    ? { label: '// on est là', body: 'Une vraie réponse, par un humain, sur WhatsApp.' }
    : {
        label: '// hors ligne',
        body: 'L’équipe est hors ligne pour le moment. Écrivez-nous quand même, on revient vers vous dès l’ouverture.',
      }

  return (
    <aside
      role="dialog"
      aria-label="Contacter maria sur WhatsApp"
      aria-modal="false"
      className={`fixed bottom-6 right-6 z-[60] w-[340px] max-w-[calc(100vw-24px)] rounded-[18px] border border-ink/8 bg-paper p-3.5 pt-3.5 pb-3 font-sans shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_20px_50px_-18px_rgba(33,33,33,0.30),0_6px_18px_-10px_rgba(33,33,33,0.18)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-6 ${
        visible
          ? 'translate-y-0 scale-100 opacity-100 motion-reduce:transition-none'
          : 'pointer-events-none translate-y-5 scale-[0.96] opacity-0'
      } max-sm:bottom-3 max-sm:right-3 max-sm:left-auto`}
    >
      {/* Header — sur-titre DM Mono avec dot vert pulsant */}
      <div className="mb-2.5 flex items-center gap-2.5 border-b border-paper-edge px-1 pb-2.5">
        <span className="flex flex-1 items-center gap-2 font-mono text-[10.5px] uppercase leading-4 tracking-[0.08em] text-ink-soft/80">
          <span
            aria-hidden
            className="wa-ping-dot inline-block h-1.5 w-1.5 flex-none rounded-full bg-success"
            style={{ boxShadow: '0 0 0 4px rgba(63,193,99,0.18)' }}
          />
          {status.label}
        </span>
      </div>

      {/* Body — avatar + meta */}
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="relative flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-accent font-mono text-[17px] font-medium tracking-[-0.04em] text-ink shadow-[0_4px_10px_-4px_rgba(254,194,60,0.5)]"
        >
          m
          <span
            aria-hidden
            className="absolute -bottom-px -right-px h-3 w-3 rounded-full border-[2.5px] border-paper bg-success"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <span className="truncate font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
              maria · l’équipe
            </span>
            {isOffice && (
              <span className="flex-none font-mono text-[10.5px] tracking-[0.04em] text-[#9a9a9a]">
                à l’instant
              </span>
            )}
          </div>
          <p className="text-[14px] leading-[1.45] text-ink-soft">
            {status.body}
          </p>
        </div>
      </div>

      {/* Actions footer — primary jaune (suit le brief, pas le mockup ink) */}
      <div className="mt-3 flex gap-2 border-t border-dashed border-paper-edge pt-2.5">
        <a
          href={getWaLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onReply}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.25 font-sans text-[13px] font-medium text-ink transition-colors duration-300 ease-out hover:bg-accent-soft"
        >
          {isOffice ? 'Répondre' : 'Nous écrire'}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <button
          type="button"
          onClick={onLater}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-paper-soft px-3 py-2.25 font-sans text-[13px] font-medium text-ink-soft transition-colors duration-300 ease-out hover:bg-paper-edge hover:text-ink"
        >
          Plus tard
        </button>
      </div>
    </aside>
  )
}
