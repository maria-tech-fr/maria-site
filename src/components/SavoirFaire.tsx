import BlockHeader from './BlockHeader'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { CardSavoirFaire, SavoirFaire as SavoirFaireData } from '../lib/projets'

export default function SavoirFaire({ data }: { data: SavoirFaireData }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.20, x: '90%', y: '20%', size: 600, blur: 50, duration: 32 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        <Reveal>
          <div className="flex max-w-200 flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              sousTitre={data.description}
              surTitreClass="text-success-soft"
              titreClass="text-paper"
              sousTitreClass="text-[#BFBFBF]"
            />
          </div>
        </Reveal>

        {data.cards && data.cards.length > 0 && (
          <div className="grid grid-cols-1 gap-3.75 sm:grid-cols-2 lg:grid-cols-4">
            {data.cards.map((card, i) => (
              <Reveal key={i} delay={120 + i * 70}>
                <CardItem card={card} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CardItem({ card, index }: { card: CardSavoirFaire; index: number }) {
  const asset = card.picto?.asset
  return (
    <article className="flex h-full flex-col gap-2.5 rounded-[5px] border border-white/8 bg-white/4 p-5">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-accent/15"
      >
        {asset ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={asset.url}
            alt=""
            className="h-5 w-5 object-contain"
          />
        ) : (
          <SavoirFaireIcon index={index} />
        )}
      </span>
      <h3 className="pt-3 font-display text-[18px] font-semibold leading-7 tracking-[-0.015em] text-paper lg:leading-[28.8px]">
        {card.titre}
      </h3>
      <p className="whitespace-pre-line text-[14px] leading-[21.7px] text-[#BFBFBF]">
        {card.description}
      </p>
    </article>
  )
}

function SavoirFaireIcon({ index }: { index: number }) {
  // Pictos reverse-engineered depuis les coordonnées Figma B16 (viewBox 20x20, stroke jaune #FEC23C).
  const paths: React.ReactNode[] = [
    // 0 — Sites e-commerce augmentés (sac shopping)
    <g key="i0">
      <path d="M3.5 7.5h13v9.17h-13z" />
      <path d="M6.5 7.5V5.5a3.5 3.5 0 0 1 7 0v2" />
    </g>,
    // 1 — CRM sur mesure (deux utilisateurs)
    <g key="i1">
      <circle cx="7.5" cy="7" r="2" />
      <path d="M3 16.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
      <circle cx="14" cy="5" r="1.6" />
      <path d="M11.5 11.5c2.5 0 5 1.5 5 4.5" />
    </g>,
    // 2 — Chatbots métier (bulle + 3 points)
    <g key="i2">
      <path d="M3 5h14v9.17H8l-3 3v-3H3z" />
      <circle cx="6.7" cy="9.5" r="0.85" fill="#FEC23C" stroke="none" />
      <circle cx="10" cy="9.5" r="0.85" fill="#FEC23C" stroke="none" />
      <circle cx="13.3" cy="9.5" r="0.85" fill="#FEC23C" stroke="none" />
    </g>,
    // 3 — Génération de contenus (calques empilés)
    <g key="i3">
      <rect x="3.5" y="3.5" width="13" height="13" rx="1" />
      <rect x="6.5" y="3.5" width="10" height="10" rx="1" fill="#212121" stroke="#FEC23C" />
    </g>,
    // 4 — Automatisation de processus (deux sliders)
    <g key="i4">
      <path d="M3 6h14" />
      <circle cx="13" cy="6" r="1.7" fill="#212121" />
      <path d="M3 14h14" />
      <circle cx="7" cy="14" r="1.7" fill="#212121" />
    </g>,
    // 5 — Sites vitrines IA conversationnels (globe)
    <g key="i5">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15" />
      <path d="M10 2.5c2.7 2.5 2.7 12.5 0 15" />
      <path d="M10 2.5c-2.7 2.5-2.7 12.5 0 15" />
    </g>,
    // 6 — Outils internes (grille 2x2)
    <g key="i6">
      <rect x="3" y="3" width="6.5" height="6.5" rx="0.8" />
      <rect x="10.5" y="3" width="6.5" height="6.5" rx="0.8" />
      <rect x="3" y="10.5" width="6.5" height="6.5" rx="0.8" />
      <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="0.8" />
    </g>,
    // 7 — Audits et cadrage IA (loupe)
    <g key="i7">
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13 13l4 4" />
      <path d="M9 7v4" />
    </g>,
  ]
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#FEC23C"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[index % paths.length]}
    </svg>
  )
}
