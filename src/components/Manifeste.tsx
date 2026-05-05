import HaloField from './HaloField'
import Reveal from './Reveal'
import type { Manifeste as ManifesteData, ParagrapheManifeste } from '../lib/agence'

const BASE_CLASS =
  'whitespace-pre-line text-[16px] leading-6 lg:text-[18px] lg:leading-[30.6px]'
const REGULAR_CLASS = `${BASE_CLASS} text-ink-soft`
const EMPHASE_CLASS = `${BASE_CLASS} font-medium text-ink`

function ParagrapheRender({ paragraphe }: { paragraphe: ParagrapheManifeste }) {
  if (paragraphe.emphase === 'totale') {
    return <p className={EMPHASE_CLASS}>{paragraphe.texte}</p>
  }

  if (paragraphe.emphase === 'premiere-phrase') {
    // Découpe sur le premier ". " (ou ".\n" / ". —"). On garde le point dans la
    // partie emphasée, et on rajoute juste un espace avant la suite.
    const match = paragraphe.texte.match(/^([^.!?]*[.!?])\s+([\s\S]*)$/)
    if (!match) {
      return <p className={EMPHASE_CLASS}>{paragraphe.texte}</p>
    }
    const [, premiere, reste] = match
    return (
      <p className={REGULAR_CLASS}>
        <span className="font-medium text-ink">{premiere}</span> {reste}
      </p>
    )
  }

  return <p className={REGULAR_CLASS}>{paragraphe.texte}</p>
}

export default function Manifeste({ data }: { data: ManifesteData }) {
  return (
    <section className="relative overflow-hidden bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.3, x: '5%', y: '85%', size: 500, blur: 45, duration: 32 },
        ]}
      />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="w-full lg:w-[450px] lg:shrink-0">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-15.5">
              {data.titre}
            </h2>
          </div>
        </Reveal>

        <Reveal className="flex-1" delay={150}>
          <div className="flex flex-col gap-7.5">
            {data.paragraphes?.map((p, i) => (
              <ParagrapheRender key={i} paragraphe={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
