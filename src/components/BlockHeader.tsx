/*
  Pattern surtitre + H2 + sous-titre répété sur 12+ blocs du site. Le composant
  ne wrappe pas avec un flex container : c'est au consommateur de gérer son
  layout (gap variable selon le bloc, position, etc.). Il fournit juste le
  contenu (3 éléments) avec les classes par défaut paramétrables.
*/

type BlockHeaderProps = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  /** Classe Tailwind du surtitre (couleur). Défaut : success vert. */
  surTitreClass?: string
  /** Classe Tailwind du H2 (couleur + max-w optionnel). Défaut : text-ink. */
  titreClass?: string
  /** Classe Tailwind du sous-titre. Défaut : text-ink-soft. */
  sousTitreClass?: string
}

const SUR_TITRE_BASE =
  'font-mono text-[12px] leading-[19.2px] tracking-[0.06em]'

const TITRE_BASE =
  'whitespace-pre-line font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] lg:text-[60px] lg:leading-15.5'

const SOUS_TITRE_BASE =
  'whitespace-pre-line text-[16px] leading-6 lg:text-[18px] lg:leading-[27.9px]'

export default function BlockHeader({
  surTitre,
  titre,
  sousTitre,
  surTitreClass = 'text-success',
  titreClass = 'text-ink',
  sousTitreClass = 'text-ink-soft',
}: BlockHeaderProps) {
  return (
    <>
      <p className={`${SUR_TITRE_BASE} ${surTitreClass}`}>{surTitre}</p>
      <h2 className={`${TITRE_BASE} ${titreClass}`}>{titre}</h2>
      {sousTitre && (
        <p className={`${SOUS_TITRE_BASE} ${sousTitreClass}`}>{sousTitre}</p>
      )}
    </>
  )
}
