import BlockHeader from './BlockHeader'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type { ProjetAVenir, ProjetsAVenir as ProjetsAVenirData } from '../lib/projets'

export default function ProjetsAVenir({ data }: { data: ProjetsAVenirData }) {
  return (
    <section className="relative overflow-hidden bg-accent-tint px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.40, x: '90%', y: '60%', size: 600, blur: 45, duration: 28 },
        ]}
      />

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex max-w-200 flex-col gap-4.5">
            <BlockHeader
              surTitre={data.surTitre}
              titre={data.titre}
              sousTitre={data.description}
            />
          </div>
        </Reveal>

        {data.projets && data.projets.length > 0 && (
          <div className="grid grid-cols-1 gap-3.75 sm:grid-cols-2 lg:grid-cols-3">
            {data.projets.map((projet, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <ProjetAVenirCard projet={projet} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjetAVenirCard({ projet, index }: { projet: ProjetAVenir; index: number }) {
  const asset = projet.picto?.asset
  return (
    <article className="flex h-full flex-col gap-3.5 rounded-[5px] border border-ink/6 bg-white/60 p-9 backdrop-blur-md">
      <div
        aria-hidden
        className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-paper-edge bg-paper"
      >
        {asset ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={asset.url} alt="" className="h-5.5 w-5.5 object-contain" />
        ) : (
          <ProjetAVenirIcon index={index} />
        )}
      </div>

      <p className="pt-2.5 font-mono text-[11px] leading-4.5 tracking-[0.06em] text-success">
        {projet.categorie}
      </p>
      <h3 className="font-display text-[18px] font-semibold leading-6 tracking-[-0.018em] text-ink lg:text-[20px] lg:leading-6.25">
        {projet.titre}
      </h3>
      <p className="pt-2 text-[13px] leading-5 text-[#888888]">{projet.mention}</p>
    </article>
  )
}

function ProjetAVenirIcon({ index }: { index: number }) {
  // Pictos reverse-engineered depuis Figma (viewBox 22x22, stroke jaune accent).
  const paths: React.ReactNode[] = [
    // 0 — site e-commerce (sac shopping)
    <g key="i0">
      <path d="M3.85 8.25h14.3v10.08H3.85z" />
      <path d="M7.15 8.25v-2.2a3.85 3.85 0 0 1 7.7 0v2.2" />
    </g>,
    // 1 — outil ia (chip / cpu)
    <g key="i1">
      <rect x="3.67" y="3.67" width="14.67" height="14.67" rx="1.5" />
      <rect x="7.33" y="7.33" width="7.33" height="7.33" rx="0.8" />
      <path d="M9.5 3.67v-1.5M12.5 3.67v-1.5M9.5 19.83v-1.5M12.5 19.83v-1.5M3.67 9.5h-1.5M3.67 12.5h-1.5M19.83 9.5h-1.5M19.83 12.5h-1.5" />
    </g>,
    // 2 — site vitrine (globe)
    <g key="i2">
      <circle cx="11" cy="11" r="8.25" />
      <path d="M2.75 11h16.5" />
      <path d="M11 2.75c2.95 2.75 2.95 13.75 0 16.5" />
      <path d="M11 2.75c-2.95 2.75-2.95 13.75 0 16.5" />
    </g>,
  ]
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
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
