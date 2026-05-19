'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { isOfficeHours, whatsappConfig } from '../../config/contact'
import WhatsappCard from './WhatsappCard'
import WhatsappPill from './WhatsappPill'

/*
  Widget WhatsApp — 3 états :
    1) 'hidden' (rien à l'écran, état initial avant le délai 20s)
    2) 'card'   (carte ouverte, le user décide)
    3) 'pill'   (pilule réduite, ré-ouvrable)

  Auto-trigger : une seule fois par session, après 20s, si le user n'a
  jamais ouvert ni fermé. État persisté en sessionStorage (pas localStorage,
  pas de cookie — sobriété maria, pas de sujet RGPD supplémentaire).

  Routes exclues (ex. /contact/merci) : le widget ne se monte pas.
*/

type State = 'hidden' | 'card' | 'pill'
const SESSION_KEY = 'mariaWaSeen'

export default function WhatsappWidget() {
  const pathname = usePathname()
  const [state, setState] = useState<State>('hidden')
  // L'horaire est déterminé au mount client → pas de mismatch SSR.
  const [isOffice, setIsOffice] = useState<boolean>(false)

  /** Exclusion de routes — testée à chaque render, le widget se retire de la
   *  page /contact/merci (à cause du mini-jeu en plein écran). */
  const isExcluded = whatsappConfig.excludedRoutes.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  )

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* sessionStorage indisponible (mode privé strict) → on continue silencieusement */
    }
  }, [])

  /** Au mount client :
   *  - on lit sessionStorage : si déjà vu, on saute direct à 'pill'
   *  - sinon on arme un timer de 20s pour ouvrir la carte
   */
  useEffect(() => {
    if (isExcluded) return

    setIsOffice(isOfficeHours())

    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* noop */
    }

    if (seen) {
      // Cas « déjà vu cette session » : on affiche directement la pilule.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState('pill')
      return
    }

    const timer = window.setTimeout(() => {
      setState('card')
      markSeen()
    }, whatsappConfig.autoOpenDelayMs)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExcluded, pathname])

  /** Échap ferme la carte ouverte. */
  useEffect(() => {
    if (state !== 'card') return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setState('pill')
        markSeen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, markSeen])

  if (isExcluded) return null

  return (
    <>
      <WhatsappCard
        visible={state === 'card'}
        isOffice={isOffice}
        onReply={() => {
          // Le lien `wa.me` s'ouvre via target=_blank — on bascule en pilule
          // pour ne pas garder la carte ouverte derrière.
          markSeen()
          setState('pill')
        }}
        onLater={() => {
          markSeen()
          setState('pill')
        }}
      />
      <WhatsappPill
        visible={state === 'pill'}
        onOpen={() => setState('card')}
      />
    </>
  )
}
