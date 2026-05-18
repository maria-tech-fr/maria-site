import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { renderWithEmphase } from '../../lib/emphase'

type Props = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  lastUpdated?: string | null
}

export default function CharteHero({ surTitre, titre, sousTitre, lastUpdated }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-20 pt-40 lg:px-30.5 lg:pb-24 lg:pt-44">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.34, x: '92%', y: '20%', size: 560, blur: 60, duration: 44 },
          { color: '#3FC163', alpha: 0.22, x: '8%', y: '85%', size: 460, blur: 60, duration: 48 },
        ]}
      />

      <article className="relative mx-auto flex w-full max-w-[760px] flex-col gap-6">
        <Reveal>
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {surTitre}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink text-balance lg:text-[64px] lg:leading-[1.04]">
            {renderWithEmphase(titre, 'text-accent')}
          </h1>
        </Reveal>
        {sousTitre && (
          <Reveal delay={180}>
            <p className="whitespace-pre-line text-[17px] leading-[1.6] text-ink-soft lg:text-[19px]">
              {sousTitre}
            </p>
          </Reveal>
        )}
        {lastUpdated && (
          <Reveal delay={240}>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Dernière mise à jour : {formatDateFR(lastUpdated)}
            </p>
          </Reveal>
        )}
      </article>
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
