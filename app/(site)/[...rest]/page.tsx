import { notFound } from 'next/navigation'

/*
  Catch-all (site) : capture toutes les URLs non matchées par une route
  spécifique du groupe (site) et délègue à `(site)/not-found.tsx` via
  notFound(). Permet à la 404 customisée maria de remplacer la 404
  built-in de Next.js, qui sinon reste utilisée pour les URLs inconnues
  parce que le site a deux root layouts ((site) + machine).

  Les routes statiques et dynamiques plus spécifiques (services/[slug],
  blog/[slug], etc.) restent prioritaires sur ce catch-all.
*/
export default function CatchAllNotFound() {
  notFound()
}
