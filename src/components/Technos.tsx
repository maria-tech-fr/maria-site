import BlockHeader from './BlockHeader'
import Reveal from './Reveal'
import type { CategorieTechno, Technos as TechnosData } from '../lib/agence'

export default function Technos({ data }: { data: TechnosData }) {
  return (
    <section className="bg-paper-soft px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="flex flex-col gap-15">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <BlockHeader
              titreClass="lg:max-w-[75%]"
              surTitre={data.surTitre}
              titre={data.titre}
              sousTitre={data.sousTitre}
              sousTitreClass="max-w-220 text-ink-soft"
            />
          </div>
        </Reveal>

        {data.categories && data.categories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {data.categories.map((cat, i) => (
              <Reveal key={i} delay={100 + i * 100}>
                <CategorieCard categorie={cat} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CategorieCard({ categorie }: { categorie: CategorieTechno }) {
  return (
    <div className="flex h-full flex-col gap-7.5 rounded-[5px] border border-paper-edge bg-paper p-9">
      <div className="flex flex-col">
        <p className="font-mono text-[11px] leading-[17.6px] tracking-[0.06em] text-ink-soft">
          {categorie.surTitre}
        </p>
        <h3 className="pt-1 font-display text-[20px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[22px] lg:leading-[35.2px]">
          {categorie.titre}
        </h3>
      </div>

      {categorie.technos && categorie.technos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {categorie.technos.map((techno, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-[5px] border border-paper-edge bg-paper-soft px-2 text-center font-medium text-[13px] leading-5 tracking-[-0.01em] text-ink-soft"
            >
              {techno}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
