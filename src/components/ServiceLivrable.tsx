import HaloField from './HaloField'
import Reveal from './Reveal'
import type { LivrableItem, ServiceLivrable as ServiceLivrableData } from '../lib/pageService'

export default function ServiceLivrable({ data }: { data: ServiceLivrableData }) {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.30, x: '88%', y: '32%', size: 580, blur: 45, duration: 36 },
        ]}
      />

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex max-w-220 flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {data.titre}
            </h2>
            {data.sousTitre && (
              <p className="whitespace-pre-line text-[16px] leading-7 text-ink-soft lg:text-[18px] lg:leading-[28.8px]">
                {data.sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        {data.items && data.items.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {data.items.map((item, i) => (
              <Reveal key={i} delay={120 + i * 70}>
                <LivrableCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function LivrableCard({ item, index }: { item: LivrableItem; index: number }) {
  const asset = item.picto?.asset
  return (
    <article className="flex h-full flex-col gap-2.5 rounded-[5px] border border-paper-edge bg-paper p-8">
      <span
        aria-hidden
        className="flex h-10.5 w-10.5 items-center justify-center rounded-[5px] border border-[#F1E4BE] bg-[#FFFBEE]"
      >
        {asset ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={asset.url} alt="" className="h-5 w-5 object-contain" />
        ) : (
          <LivrableIcon index={index} />
        )}
      </span>
      <p className="pt-3 font-mono text-[11px] leading-4 tracking-[0.06em] text-success">
        {item.numero}
      </p>
      <h3 className="whitespace-pre-line font-display text-[18px] font-semibold leading-6.5 tracking-[-0.018em] text-ink lg:text-[20px] lg:leading-[25px]">
        {item.titre}
      </h3>
      <p className="whitespace-pre-line text-[14.5px] leading-[22.48px] text-ink-soft">
        {item.description}
      </p>
    </article>
  )
}

function LivrableIcon({ index }: { index: number }) {
  // Pictos par défaut (stroke jaune). Mapping par index — peut être overridé via le BO en uploadant un picto par card.
  const paths: React.ReactNode[] = [
    // 0 — Cartographie cas d'usage (grille avec point central)
    <g key="i0">
      <rect x="3" y="3" width="6.5" height="6.5" rx="0.8" />
      <rect x="10.5" y="3" width="6.5" height="6.5" rx="0.8" />
      <rect x="3" y="10.5" width="6.5" height="6.5" rx="0.8" />
      <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="0.8" />
    </g>,
    // 1 — Audit données (database)
    <g key="i1">
      <ellipse cx="10" cy="5" rx="6.5" ry="2" />
      <path d="M3.5 5v10c0 1.1 2.9 2 6.5 2s6.5-0.9 6.5-2V5" />
      <path d="M3.5 10c0 1.1 2.9 2 6.5 2s6.5-0.9 6.5-2" />
    </g>,
    // 2 — Reco technologiques (engrenage)
    <g key="i2">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2v2.5M10 15.5V18M2 10h2.5M15.5 10H18M4.3 4.3l1.8 1.8M13.9 13.9l1.8 1.8M4.3 15.7l1.8-1.8M13.9 6.1l1.8-1.8" />
    </g>,
    // 3 — Feuille de route (path/route)
    <g key="i3">
      <path d="M3 16.5l4-4 3 3 6-6" />
      <path d="M13 9.5h3v3" />
      <circle cx="3" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g>,
    // 4 — Gouvernance IA (bouclier)
    <g key="i4">
      <path d="M10 2.5l6 2v6c0 4-3 6.5-6 7-3-0.5-6-3-6-7v-6z" />
      <path d="M7 10l2 2 4-4" />
    </g>,
    // 5 — RGPD (document avec cadenas)
    <g key="i5">
      <path d="M5 2.5h6.5l3 3v12h-9.5z" />
      <path d="M11.5 2.5v3h3" />
      <rect x="7.5" y="11" width="5" height="4" rx="0.5" />
      <path d="M8.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
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
