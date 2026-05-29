import CountUpValue from './CountUpValue'
import CtaSecondaire from './CtaSecondaire'
import Reveal from './Reveal'
import { type ClientLogo, type Metrique, type ProjetVedette as ProjetVedetteData } from '../lib/accueil'
import { imageSrc } from '../lib/blog'

const couleurBarre: Record<Metrique['couleur'], string> = {
  accent: 'border-b-accent',
  success: 'border-b-success',
  ink: 'border-b-ink',
}

export default function ProjetVedette({ data }: { data: ProjetVedetteData }) {
  return (
    <section className="bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <DashboardMockup metriques={data.metriques} />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
                {data.surTitre}
              </p>
              <h3 className="whitespace-pre-line font-display text-[28px] font-semibold leading-8 tracking-tight text-ink lg:text-[38px] lg:leading-10.25">
                {data.titre}
              </h3>
            </div>

            {data.metriques && data.metriques.length > 0 && (
              <div className="flex flex-wrap gap-x-9 gap-y-4">
                {data.metriques.map((m, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <p
                      className={`border-b-[3px] pb-1.5 font-display text-[34px] font-semibold leading-9 tracking-[-0.03em] text-ink lg:text-[44px] lg:leading-11 ${couleurBarre[m.couleur]}`}
                    >
                      <CountUpValue value={m.valeur} />
                    </p>
                    <p className="text-[13px] leading-[20.15px] text-ink-soft">{m.libelle}</p>
                  </div>
                ))}
              </div>
            )}

            {data.lien && <CtaSecondaire lien={data.lien} withArrow />}
          </div>
        </Reveal>
      </div>

      {data.clients && data.clients.length > 0 && (
        <Reveal delay={180}>
          <div className="mt-15 border-t border-paper-edge pt-7.5">
            {data.surTitreClients && (
              <p className="font-mono text-[11px] leading-4.25 tracking-[0.08em] text-ink-soft">
                {data.surTitreClients}
              </p>
            )}
            <ClientsMarquee clients={data.clients} />
          </div>
        </Reveal>
      )}
    </section>
  )
}

function ClientsMarquee({ clients }: { clients: ClientLogo[] }) {
  // Doublé pour boucler sans rupture, animation translate -50%
  const items = [...clients, ...clients]
  // Cadence proportionnelle au nombre de logos pour conserver une vitesse perçue stable
  const duration = Math.max(20, clients.length * 5)

  return (
    <div
      className="mt-6 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex w-max gap-3"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {items.map((c, i) => (
          <ClientItem key={i} client={c} />
        ))}
      </div>
    </div>
  )
}

function ClientItem({ client }: { client: ClientLogo }) {
  const logo = client.logo?.asset ? imageSrc(client.logo, 320, 120) : null

  // Avec logo : image en niveaux de gris, retour couleur au survol (mur de
  // logos sobre). Sans logo : fallback sur le nom en plaque grise (comportement
  // d'origine), ce qui permet de mélanger logos et noms le temps de tout récupérer.
  if (logo) {
    return (
      <div className="group flex h-8 w-44 shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={client.nom}
          className="max-h-8 w-auto max-w-40 object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="flex h-8 w-44 shrink-0 items-center justify-center rounded-sm bg-linear-to-b from-[#E0E0E0] to-[#ECECEC] font-mono text-[10px] leading-[15.5px] tracking-[0.08em] text-ink-soft">
      {client.nom}
    </div>
  )
}

function DashboardMockup({ metriques }: { metriques: Metrique[] | null }) {
  return (
    <div
      className="relative flex h-80 items-center justify-center overflow-hidden rounded-[5px] p-6 sm:p-10 lg:h-130 lg:p-12"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(254, 194, 60, 0.45) 0%, rgba(254, 194, 60, 0) 70%), radial-gradient(circle at 70% 70%, rgba(63, 193, 99, 0.32) 0%, rgba(63, 193, 99, 0) 70%), #F9F9F9',
      }}
    >
      <div className="w-full max-w-[406px] rounded-[5px] border border-paper-edge bg-paper shadow-[0_4px_14px_-4px_rgba(33,33,33,0.1),0_30px_60px_-22px_rgba(33,33,33,0.22)]">
        <div className="border-b border-paper-edge bg-paper-soft px-3 py-2 font-display text-[14px] font-semibold leading-[21.7px] tracking-[-0.01em] text-ink">
          Tableau de bord — Productions
        </div>
        <div className="flex flex-col gap-2 px-6 py-5.5">
          <div className="h-1.5 w-[84%] rounded-[2px] bg-paper-edge" />
          <div className="h-1.5 w-[65%] rounded-[2px] bg-paper-edge" />
          <div className="h-1.5 w-[77%] rounded-[2px] bg-paper-edge" />
          {metriques && metriques.length === 3 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              <PillMockup tone="accent" valeur={metriques[0].valeur} libelle="temps" />
              <PillMockup tone="success" valeur={metriques[1].valeur} libelle="engag." />
              <PillMockup tone="neutral" valeur={metriques[2].valeur} libelle="validé" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PillMockup({
  tone,
  valeur,
  libelle,
}: {
  tone: 'accent' | 'success' | 'neutral'
  valeur: string
  libelle: string
}) {
  const styles =
    tone === 'accent'
      ? 'border-accent-soft bg-accent-tint'
      : tone === 'success'
        ? 'border-success-soft bg-success-tint'
        : 'border-paper-edge bg-paper-soft'

  return (
    <div className={`flex flex-col items-center gap-0.5 rounded-[3px] border px-2 py-2.5 ${styles}`}>
      <span className="font-display text-[16px] font-bold leading-[24.8px] tracking-[-0.02em] text-ink">
        {valeur}
      </span>
      <span className="font-mono text-[8px] leading-[12.4px] tracking-[0.08em] text-ink-soft">
        {libelle}
      </span>
    </div>
  )
}
