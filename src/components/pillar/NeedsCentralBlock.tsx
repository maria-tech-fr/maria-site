import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { FAMILLES, type BesoinFamilleKey, type BesoinMenuItem } from '../../lib/pageBesoin'

/**
 * Bloc central du pilier /besoins. 5 chapitres (familles) numérotés 01-05.
 * Colonne gauche sticky avec gros numéro Syne 72px jaune.
 * Colonne droite : liste de besoins en lignes (pas cards), hover dégage la
 * flèche ronde verte.
 */
type Props = {
  besoins: BesoinMenuItem[]
}

/**
 * Description courte (1 ligne) qui apparaît sous le titre de chaque besoin.
 * Éditorialisée en code car stable et calibrée pour rester sur 1 ligne.
 * À migrer vers Sanity si pilotage CMS nécessaire.
 */
const NEED_LINE_BY_SLUG: Record<string, string> = {
  'gagner-du-temps-commerciaux': 'Libérer du temps de vente happé par l’administratif.',
  'reduire-charge-service-client': 'Absorber le répétitif sans dégrader la qualité.',
  'industrialiser-traitement-documents': 'Lire, extraire, classer sans dépouiller à la main.',
  'organiser-connaissance-entreprise': 'Rendre le savoir interrogeable en langage naturel.',
  'faciliter-onboarding': 'Rendre les recrues autonomes sans mobiliser toute l’équipe.',
  'capitaliser-expertise-interne': 'Garder le savoir critique quand les experts partent.',
  'vision-claire-donnees-metier': 'Transformer des données dispersées en pilotage utile.',
  'alertes-intelligentes': 'Voir les problèmes venir au lieu de les subir.',
  'trier-candidatures': 'Pré-qualifier sans déléguer la décision à une machine.',
  'former-equipes-ia': 'Sortir du « interdire ou laisser faire ».',
  'securiser-usage-ia': 'Reprendre la main sans tout interdire.',
  'conformite-rgpd-ia': 'Cadrer les traitements avant que ça pose problème.',
}

/**
 * Phrase de contexte par famille (italique, sous le H3).
 */
const FAMILLE_PHRASE: Record<BesoinFamilleKey, string> = {
  'productivite-operationnelle':
    'Quand vos équipes passent plus de temps à reporter ce qu’elles font qu’à le faire.',
  'organisation-connaissance':
    'Quand l’information existe mais que personne ne la retrouve.',
  'pilotage-decision':
    'Quand vous pilotez à l’instinct faute de données fiables à temps.',
  'rh-formation':
    'Quand le volume écrase la qualité du recrutement ou de la montée en compétence.',
  'gouvernance-conformite':
    'Quand l’IA circule déjà dans vos équipes sans cadre ni contrôle.',
}

export default function NeedsCentralBlock({ besoins }: Props) {
  // Regroupement par famille, ordreMenu trié.
  const byFamille = new Map<BesoinFamilleKey, BesoinMenuItem[]>()
  for (const b of besoins) {
    if (!b.famille) continue
    const arr = byFamille.get(b.famille) ?? []
    arr.push(b)
    byFamille.set(b.famille, arr)
  }
  for (const arr of byFamille.values()) {
    arr.sort((a, b) => a.ordreMenu - b.ordreMenu)
  }

  // Filtrer les familles qui ont des items + numéroter 01-05.
  const groups = FAMILLES.map((meta) => ({
    meta,
    items: byFamille.get(meta.key) ?? [],
  })).filter((g) => g.items.length > 0)

  return (
    <section
      id="central"
      className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-30"
      style={{ scrollMarginTop: '96px' }}
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.24, x: '-6%', y: '10%', size: 560, blur: 55, duration: 42 },
          { color: '#3FC163', alpha: 0.2, x: '94%', y: '88%', size: 560, blur: 55, duration: 48 },
        ]}
      />

      <div className="relative flex flex-col gap-14">
        <Reveal>
          <div className="flex max-w-[880px] flex-col gap-5">
            <p className="font-mono text-[12px] leading-[19.2px] tracking-[0.06em] text-success">
              // les 12 besoins
            </p>
            <h2 className="max-w-[22ch] font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[52px]">
              Cinq familles. Douze besoins. Trouvez le vôtre.
            </h2>
            <p className="max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft lg:text-[18px]">
              Vous n’avez pas à choisir une catégorie « technique ». Repérez la situation qui ressemble le plus à la vôtre.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {groups.map((g, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            const isFirst = idx === 0
            return (
              <Reveal key={g.meta.key}>
                <FamilyChapter
                  num={num}
                  label={`// ${g.meta.titre.toLowerCase()}`}
                  titre={g.meta.tagline}
                  phrase={FAMILLE_PHRASE[g.meta.key]}
                  items={g.items}
                  isFirst={isFirst}
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FamilyChapter({
  num,
  label,
  titre,
  phrase,
  items,
  isFirst,
}: {
  num: string
  label: string
  titre: string
  phrase: string
  items: BesoinMenuItem[]
  isFirst: boolean
}) {
  return (
    <section
      className={`grid grid-cols-1 items-start gap-8 py-12 lg:grid-cols-[380px_1fr] lg:gap-20 lg:py-16 ${
        isFirst ? 'border-t-[2px] border-ink lg:pt-12' : 'border-t border-paper-edge'
      }`}
    >
      {/* Colonne gauche — sticky en desktop */}
      <header className="flex flex-col gap-3 lg:sticky lg:top-30">
        <span className="font-display text-[56px] font-bold leading-[0.9] tracking-[-0.04em] text-accent lg:text-[72px]">
          {num}
        </span>
        <span className="mt-2 font-mono text-[12px] leading-[19.2px] tracking-[0.08em] text-success">
          {label}
        </span>
        <h3 className="max-w-[18ch] font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.022em] text-ink lg:text-[30px]">
          {titre}
        </h3>
        <p className="max-w-[38ch] text-[15px] italic leading-[1.55] text-[#666] lg:text-[15.5px]">
          {phrase}
        </p>
      </header>

      {/* Colonne droite — liste de besoins en lignes */}
      <ul className="flex flex-col">
        {items.map((b) => (
          <li key={b.slug}>
            <NeedRow item={b} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function NeedRow({ item }: { item: BesoinMenuItem }) {
  const line = NEED_LINE_BY_SLUG[item.slug] || item.introCourte || ''
  return (
    <Link
      href={`/besoins/${item.slug}`}
      className="group/n grid grid-cols-1 items-center gap-3 border-t border-paper-edge py-5 transition-all duration-200 ease-out first:border-t-0 hover:pl-2 sm:grid-cols-[1fr_auto] sm:gap-8"
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <h4 className="text-balance font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.018em] text-ink transition-colors duration-200 ease-out group-hover/n:text-success lg:text-[20px]">
          {item.titre}
        </h4>
        {line && (
          <p className="text-[15px] leading-[1.5] text-[#666]">{line}</p>
        )}
      </div>
      <span
        aria-hidden
        className="hidden h-[38px] w-[38px] flex-none items-center justify-center rounded-full border border-paper-edge bg-paper-soft transition-all duration-200 ease-out group-hover/n:border-success group-hover/n:bg-success sm:flex"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink transition-all duration-200 ease-out group-hover/n:translate-x-0.5 group-hover/n:text-paper"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </span>
    </Link>
  )
}
