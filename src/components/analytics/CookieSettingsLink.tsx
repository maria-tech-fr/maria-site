'use client'

import { reopenAxeptioCookies } from './ConsentBanner'

/*
  Petit lien « Gérer mes cookies » pour le footer.
  Ouvre le widget Axeptio quand il est chargé. Sans Axeptio (env var
  absente), le clic ne fait rien — d'où le `hidden` conditionné à la
  présence de l'env var côté build.
*/

export default function CookieSettingsLink() {
  // L'env var est inlinée au build → pas de re-render conditionnel à craindre.
  const enabled = !!process.env.NEXT_PUBLIC_AXEPTIO_CLIENT_ID
  if (!enabled) return null

  // On rend AUSSI le séparateur « · » avec le bouton : ainsi quand
  // Axeptio n'est pas configuré (composant null), on n'a pas de
  // séparateur orphelin dans la barre légale du footer.
  return (
    <>
      <span aria-hidden>·</span>
      <button
        type="button"
        onClick={reopenAxeptioCookies}
        className="text-[#9A9A9A] transition-colors duration-300 ease-out hover:text-paper"
      >
        Gérer mes cookies
      </button>
    </>
  )
}
