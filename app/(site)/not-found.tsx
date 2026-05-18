import type { Metadata } from 'next'
import NotFoundMessage from '../../src/components/not-found/NotFoundMessage'
import NotFoundExits from '../../src/components/not-found/NotFoundExits'
import NotFoundGame from '../../src/components/not-found/NotFoundGame'

/*
  /404 — global not-found du site maria (gabarit hérité du layout (site),
  donc Nav + Footer inclus). Attrape :
   - toute URL non matchée par les routes du site
   - tous les notFound() levés depuis les segments enfants (blog/[slug]/
     not-found.tsx et besoins/[slug]/not-found.tsx prennent le pas localement).

  Statut HTTP : Next.js renvoie automatiquement 404 + injecte un meta
  robots noindex. On déclare robots ici par sécurité (visible aussi dans
  l'HTML source) avec follow=true pour que Google suive les sorties.
*/

export const metadata: Metadata = {
  title: 'Page introuvable | maria',
  description:
    "La page que vous cherchiez n'existe pas ou a été déplacée. Voici comment retrouver votre chemin sur le site de maria.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <NotFoundMessage />
      <NotFoundExits />
      <NotFoundGame />
    </>
  )
}
