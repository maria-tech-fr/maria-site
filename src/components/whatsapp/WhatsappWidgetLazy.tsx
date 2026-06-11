'use client'

import dynamic from 'next/dynamic'

/*
  Wrapper client : sort le WhatsappWidget du bundle initial via
  next/dynamic + ssr:false. Le widget ne s'affiche jamais avant 20s
  (auto-open delay configuré dans config/contact), aucune raison
  d'être dans le critical path. Le composant lui-même reste un
  Client Component (sessionStorage, timers, état UI).
*/
const Widget = dynamic(() => import('./WhatsappWidget'), { ssr: false })

export default function WhatsappWidgetLazy() {
  return <Widget />
}
