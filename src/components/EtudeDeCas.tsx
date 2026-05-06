import { urlFor } from '../../sanity/lib/image'
import HaloField from './HaloField'
import Reveal from './Reveal'
import type {
  ApercuOutil,
  Capture,
  EtudeDeCas as EtudeDeCasData,
  Fonctionnalite,
  IdentiteEtude,
} from '../lib/projets'

const STATUT_LABEL: Record<IdentiteEtude['statut'], string> = {
  termine: 'TERMINÉ',
  'en-cours': 'EN COURS',
  'a-venir': 'À VENIR',
}

const STATUT_TONE: Record<IdentiteEtude['statut'], string> = {
  termine: 'bg-success-tint text-success',
  'en-cours': 'bg-accent-tint text-accent',
  'a-venir': 'bg-paper-soft text-ink-soft',
}

export default function EtudeDeCas({ data }: { data: EtudeDeCasData }) {
  return (
    <section className="relative overflow-hidden bg-[#F9F9F9] px-6 py-16 lg:px-30.5 lg:py-22.5">
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.30, x: '8%', y: '12%', size: 700, blur: 50, duration: 30 },
        ]}
      />

      <div className="relative flex flex-col gap-15">
        {/* En-tête */}
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              {data.surTitre}
            </p>
            <h2 className="max-w-220 font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-15.5">
              {data.titrePrefixe && (
                <span className="text-accent">{data.titrePrefixe}</span>
              )}
              {data.titre}
            </h2>
          </div>
        </Reveal>

        {/* Bandeau identité — box rounded blanche avec colonnes séparées par border-l */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[5px] border border-paper-edge bg-paper">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <IdentiteCol libelle="CLIENT" valeur={data.identite.client} index={0} />
              <IdentiteCol libelle="SECTEUR" valeur={data.identite.secteur} index={1} />
              <IdentiteCol libelle="TYPE" valeur={data.identite.type} index={2} />
              <IdentiteCol libelle="OUTILS TIERS" valeur={data.identite.outils} index={3} />
              <IdentiteCol libelle="STATUT" index={4}>
                <span
                  className={`inline-flex h-7 items-center rounded-[3px] px-3 font-mono text-[10px] leading-4 tracking-[0.08em] ${STATUT_TONE[data.identite.statut]}`}
                >
                  {STATUT_LABEL[data.identite.statut]}
                </span>
              </IdentiteCol>
            </div>
          </div>
        </Reveal>

        {/* Contexte + Défi sur fond foncé avec halo jaune décoratif. */}
        <Reveal delay={180}>
          <div className="relative overflow-hidden rounded-[5px] bg-ink p-8 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[-10%] top-[-20%] h-[400px] w-[400px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(254, 194, 60, 0.30) 0%, rgba(254, 194, 60, 0) 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div className="relative grid grid-cols-1 gap-y-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-x-16">
              <ContexteDefiCol
                surTitre={data.contexte.surTitre}
                texte={data.contexte.texte}
                emphase={data.contexte.emphase}
                surTitreClass="text-success"
              />
              <div aria-hidden className="hidden self-stretch bg-white/10 lg:block" />
              <ContexteDefiCol
                surTitre={data.defi.surTitre}
                texte={data.defi.texte}
                emphase={data.defi.emphase}
                surTitreClass="text-accent"
              />
            </div>
          </div>
        </Reveal>

        {/* Notre approche — cadre extérieur uniquement, pas de boxes internes */}
        {data.approche.etapes && data.approche.etapes.length > 0 && (
          <div className="rounded-[5px] border border-paper-edge bg-paper p-8 lg:p-10">
            <Reveal>
              <h3 className="font-display text-[24px] font-semibold leading-10 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-11.25">
                {data.approche.titre}
              </h3>
            </Reveal>
            <div className="relative mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-6 lg:grid-cols-5">
              {/* Ligne grise qui relie les tirets jaunes entre les étapes */}
              <span aria-hidden className="pointer-events-none absolute left-0 right-0 top-0 hidden h-px bg-paper-edge lg:block" />
              {data.approche.etapes.map((etape, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <div className="relative flex h-full flex-col gap-3 pt-6">
                    <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-accent" />
                    <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
                      {etape.numeroLibelle}
                    </p>
                    <h4 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.02em] text-ink lg:text-[22px] lg:leading-9">
                      {etape.titre}
                    </h4>
                    <p className="whitespace-pre-line text-[14px] leading-5.25 text-ink-soft">
                      {etape.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Fonctionnalités clés — cadre extérieur, pas de séparateur interne */}
        {data.fonctionnalites.items && data.fonctionnalites.items.length > 0 && (
          <div className="rounded-[5px] border border-paper-edge bg-paper p-8 lg:p-10">
            <Reveal>
              <h3 className="font-display text-[24px] font-semibold leading-10 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-11.25">
                {data.fonctionnalites.titre}
              </h3>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
              {data.fonctionnalites.items.map((fct, i) => (
                <Reveal key={i} delay={120 + i * 70}>
                  <FonctionnaliteCard fct={fct} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Aperçu de l'outil + technos — groupés avec marge resserrée */}
        <div className="flex flex-col gap-6">
          {data.apercuOutil && (
            <ApercuOutilBlock apercu={data.apercuOutil} />
          )}

          {data.technos && data.technos.length > 0 && (
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2">
                {data.technos.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex h-9 items-center rounded-[5px] border border-paper-edge bg-paper px-3.5 font-medium text-[13px] leading-5 tracking-[-0.01em] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Citation — fond blanc, halo jaune, guillemet jaune, avatar gold */}
        <Reveal>
          <figure className="relative overflow-hidden rounded-[5px] border border-paper-edge bg-paper p-10 lg:p-15">
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-12%] top-[-10%] h-[500px] w-[500px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(254, 194, 60, 0.30) 0%, rgba(254, 194, 60, 0) 70%)',
                filter: 'blur(45px)',
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-12 top-6 font-display font-bold leading-none text-accent select-none"
              style={{ fontSize: '140px', opacity: 0.45 }}
            >
              “
            </span>
            <blockquote className="relative max-w-[680px] pt-14 lg:pt-20">
              <CitationTexte texte={data.citation.texte} />
            </blockquote>
            <figcaption className="relative mt-10 flex items-center gap-4 border-t border-paper-edge pt-8">
              <span
                aria-hidden
                className="block h-[58px] w-[58px] flex-none rounded-full border border-paper-edge"
                style={{
                  background:
                    'radial-gradient(circle at 50% 35%, rgba(229, 214, 182, 1) 0%, rgba(196, 168, 120, 1) 65%, rgba(139, 111, 63, 1) 100%)',
                }}
              />
              <div className="flex flex-col">
                <span className="font-display text-[17px] font-semibold leading-[27.2px] tracking-[-0.01em] text-ink">
                  {data.citation.auteur}
                </span>
                <span className="font-mono text-[11px] leading-[17.6px] tracking-[0.04em] text-[#383838]">
                  {data.citation.role}
                </span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function IdentiteCol({
  libelle,
  valeur,
  children,
  index,
}: {
  libelle: string
  valeur?: string
  children?: React.ReactNode
  index: number
}) {
  // Border-left appliqué dès que la colonne n'est pas la 1ère de la ligne.
  // À lg (5 colonnes en row), col 0 sans border, cols 1-4 avec.
  const isFirstCol = index === 0
  return (
    <div
      className={`flex flex-col gap-1.5 p-5 ${isFirstCol ? '' : 'lg:border-l lg:border-paper-edge'}`}
    >
      <p className="font-mono text-[10px] leading-4 tracking-[0.08em] text-ink-soft">
        {libelle}
      </p>
      {children ? (
        <div className="pt-1">{children}</div>
      ) : (
        <p className="font-display text-[16px] font-semibold leading-6 tracking-[-0.01em] text-ink">
          {valeur}
        </p>
      )}
    </div>
  )
}

function FonctionnaliteCard({ fct, index }: { fct: Fonctionnalite; index: number }) {
  // Alternance accent (jaune) / success (vert) selon parité de l'index.
  const isAccent = index % 2 === 0
  const cardStyles = isAccent
    ? 'border-[#FEC23C]/45 bg-accent-tint'
    : 'border-[#3FC163]/45 bg-success-tint'
  const iconColor = isAccent ? '#FEC23C' : '#3FC163'

  return (
    <article className={`flex h-full flex-col gap-3 rounded-[5px] border p-7 ${cardStyles}`}>
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-paper-edge bg-paper"
      >
        <FonctionnaliteIcon index={index} color={iconColor} />
      </span>
      <h4 className="pt-1 font-display text-[18px] font-semibold leading-7 tracking-[-0.015em] text-ink lg:leading-[28.8px]">
        {fct.titre}
      </h4>
      <p className="whitespace-pre-line text-[14px] leading-[21.7px] text-ink-soft">
        {fct.description}
      </p>
    </article>
  )
}

function FonctionnaliteIcon({ index, color }: { index: number; color: string }) {
  // Pictos distincts par fonctionnalité (lucide-style). Mapping par index, à raffiner si besoin via le BO.
  const paths: React.ReactNode[] = [
    // 0 — Priorisation IA des leads (cible)
    <g key="i0">
      <circle cx="10" cy="10" r="6.5" />
      <circle cx="10" cy="10" r="3" />
      <circle cx="10" cy="10" r="0.8" fill={color} stroke="none" />
    </g>,
    // 1 — Génération automatique de devis (document)
    <g key="i1">
      <path d="M5 2.5h6.5l3 3v12h-9.5z" />
      <path d="M11.5 2.5v3h3" />
      <path d="M7 9h6M7 12h6M7 15h4" />
    </g>,
    // 2 — Suivi commercial intelligent (courbe + flèche)
    <g key="i2">
      <path d="M3 14.5l4-4 3 3 6-6" />
      <path d="M13 7.5h3v3" />
    </g>,
    // 3 — Recherche conversationnelle (loupe + sparkle)
    <g key="i3">
      <circle cx="9" cy="9" r="5" />
      <path d="M12.8 12.8L17 17" />
      <path d="M14.5 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill={color} stroke="none" />
    </g>,
    // 4 — Catalogue produits dynamique (boîte 3D)
    <g key="i4">
      <path d="M3 6.5l7-3.5 7 3.5v7l-7 3.5-7-3.5z" />
      <path d="M3 6.5l7 3.5 7-3.5" />
      <path d="M10 10v7" />
    </g>,
    // 5 — Tableaux de bord par commercial (bar chart)
    <g key="i5">
      <path d="M3.5 16.5V11M8 16.5v-9M12.5 16.5v-6M17 16.5V4.5" />
    </g>,
  ]
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[index % paths.length]}
    </svg>
  )
}

function CitationTexte({ texte }: { texte: string }) {
  // En maquette, la dernière proposition (après le dernier « : ») est en SemiBold blanc.
  // On reproduit ici en splittant sur le dernier ` : `.
  const idx = texte.lastIndexOf(' : ')
  const regular = idx >= 0 ? texte.slice(0, idx + 3) : texte
  const strong = idx >= 0 ? texte.slice(idx + 3) : ''
  return (
    <p className="whitespace-pre-line font-display text-[20px] font-medium leading-7 tracking-[-0.018em] text-ink lg:text-[28px] lg:leading-[37.8px]">
      {regular}
      {strong && <span className="font-semibold">{strong}</span>}
    </p>
  )
}

function ApercuOutilBlock({ apercu }: { apercu: ApercuOutil }) {
  // 3 slots fixes : la 1ère capture en grand à gauche, la 2e et 3e empilées à droite.
  // Si une capture n'est pas uploadée, un placeholder gradient est affiché.
  const captures: (Capture | null)[] = [
    apercu.captures?.[0] ?? null,
    apercu.captures?.[1] ?? null,
    apercu.captures?.[2] ?? null,
  ]
  return (
    <div className="rounded-[5px] border border-paper-edge bg-paper p-8 lg:p-10">
      <Reveal>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
            {apercu.surTitre}
          </p>
          <h3 className="font-display text-[24px] font-semibold leading-10 tracking-[-0.02em] text-ink lg:text-[28px] lg:leading-11.25">
            {apercu.titre}
          </h3>
        </div>
      </Reveal>
      <div className="mt-7 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-2">
        <Reveal delay={120}>
          <CaptureSlot capture={captures[0]} aspect="aspect-[4/5] lg:aspect-auto lg:h-full" />
        </Reveal>
        <div className="flex flex-col gap-5">
          <Reveal delay={180}>
            <CaptureSlot capture={captures[1]} aspect="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={240}>
            <CaptureSlot capture={captures[2]} aspect="aspect-[4/3]" />
          </Reveal>
        </div>
      </div>
    </div>
  )
}

function CaptureSlot({ capture, aspect }: { capture: Capture | null; aspect: string }) {
  const asset = capture?.image?.asset
  if (!asset) {
    return (
      <div
        className={`flex w-full items-center justify-center rounded-[8px] border border-dashed border-paper-edge bg-gradient-to-br from-accent-tint via-paper to-success-tint ${aspect}`}
      >
        <p className="font-mono text-[12px] leading-4 tracking-[0.08em] text-ink-soft">
          // capture à uploader
        </p>
      </div>
    )
  }
  const src = urlFor(asset).width(1200).fit('max').auto('format').url()
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={capture?.legende ?? ''}
      className={`w-full rounded-[8px] border border-paper-edge object-cover ${aspect}`}
    />
  )
}

function ContexteDefiCol({
  surTitre,
  texte,
  emphase,
  surTitreClass = 'text-success',
}: {
  surTitre: string
  texte: string
  emphase: string | null
  surTitreClass?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className={`font-mono text-[12px] leading-[19.2px] tracking-[0.06em] ${surTitreClass}`}>
        {surTitre}
      </p>
      <p className="whitespace-pre-line text-[16px] leading-6 text-[#BFBFBF] lg:text-[17px] lg:leading-[26.35px]">
        {texte}
        {emphase && (
          <>
            {' '}
            <span className="font-medium text-paper">{emphase}</span>
          </>
        )}
      </p>
    </div>
  )
}
