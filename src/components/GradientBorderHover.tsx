/*
  Bordure dégradée jaune↔vert visible uniquement au survol — pattern signature
  maria, partagé sur les cards de la HP (Services, Pourquoi maria), du blog
  (article featured), du catalogue formation, des « besoins liés », du bloc
  « autres services » et de la page 404.

  Usage : poser `group/grad` sur le wrapper hover-target et placer
  <GradientBorderHover rounded="…" index={…} /> en première position absolue
  à l'intérieur. Le composant est purement décoratif (aria-hidden,
  pointer-events-none).

  La classe `rounded` doit matcher exactement celle du wrapper sous peine
  d'effet de débordement (les bordures arrondies du masque suivent la
  classe passée ici).

  Anim `border-drift` (boucle 32s) est désactivée sous
  `prefers-reduced-motion: reduce` via le filet global de globals.css.
*/

type Props = {
  /** Classe Tailwind d'arrondi qui doit matcher le wrapper parent. */
  rounded: string
  /** Index de la card dans sa grille : décale la phase du gradient. */
  index?: number
}

export default function GradientBorderHover({ rounded, index = 0 }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -inset-px ${rounded} opacity-0 transition-opacity duration-500 ease-in-out group-hover/grad:opacity-100`}
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
  )
}
