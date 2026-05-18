import Reveal from '../Reveal'

type Props = {
  lastUpdated: string
  mention?: string | null
}

export default function CharteRevision({ lastUpdated, mention }: Props) {
  return (
    <section className="bg-paper px-6 py-12 lg:px-30.5 lg:py-16">
      <Reveal>
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3 border-t border-paper-edge pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-success">
            // révision
          </p>
          <p className="font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.018em] text-ink lg:text-[22px]">
            Dernière mise à jour : <span className="text-accent">{formatDateFR(lastUpdated)}</span>
          </p>
          {mention && (
            <p className="text-[15.5px] leading-[1.6] text-ink-soft lg:text-[16px]">
              {mention}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  )
}

function formatDateFR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}
