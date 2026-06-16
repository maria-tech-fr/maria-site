import BlockHeader from './BlockHeader'
import Reveal from './Reveal'
import type { ProjetPasse, ProjetsPasses as ProjetsPassesData } from '../lib/projets'

export default function ProjetsPasses({ data }: { data: ProjetsPassesData }) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-15">
        <Reveal>
          <div className="flex max-w-200 flex-col gap-4.5">
            <BlockHeader
              titreClass="lg:max-w-[75%]"
              surTitre={data.surTitre}
              titre={data.titre}
              sousTitre={data.description}
            />
          </div>
        </Reveal>

        {data.projets && data.projets.length > 0 && (
          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
            {data.projets.map((projet, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <ProjetCard projet={projet} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjetCard({ projet, index }: { projet: ProjetPasse; index: number }) {
  // Bordure dégradée jaune↔vert qui apparaît au hover (même pattern que les
  // cartes Services sur la home).
  return (
    <article className="group/card relative flex h-full flex-col gap-3 rounded-[5px] border border-paper-edge bg-paper p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[5px] opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100"
        style={{
          padding: '1px',
          background:
            'linear-gradient(120deg, #FEC23C 0%, #3FC163 50%, #FEC23C 100%)',
          backgroundSize: '200% 100%',
          animation: `border-drift 32s linear infinite ${-index * 4}s`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Placeholder image dégradé */}
      <div
        className="aspect-[140/32] w-full max-w-[140px] rounded-[3px]"
        style={{
          background: 'linear-gradient(167deg, #E0E0E0 0%, #ECECEC 100%)',
        }}
      />

      <p className="pt-2.5 font-mono text-[11px] leading-4.5 tracking-[0.06em] text-success">
        {projet.categorie}
      </p>
      <h3 className="font-display text-[18px] font-semibold leading-7 tracking-[-0.018em] text-ink lg:text-[20px] lg:leading-8">
        {projet.titre}
      </h3>
      <p className="whitespace-pre-line text-[14px] leading-[22.48px] text-ink-soft lg:text-[14.5px]">
        {projet.description}
      </p>
    </article>
  )
}
