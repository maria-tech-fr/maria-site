import { notFound } from 'next/navigation'

/*
  Page /projets temporairement dépubliée — pas encore de contenu client
  à présenter. On renvoie 404 (la 404 maria globale s'affiche) pour que
  toute visite directe redirige vers les sorties standards (accueil,
  services, besoins, contact).

  Pour rétablir la page : revenir au commit précédent ou réimporter le
  rendu complet (cf. composants DarkHero, EtudeDeCas, SavoirFaire,
  ProjetsPasses, ProjetsAVenir + getProjets).

  Note : la route est aussi retirée du sitemap, du llms.txt et du
  footer/nav. Le doc Sanity `projets` est conservé en base — son
  contenu sera réutilisé tel quel lors de la republication.
*/

export default function ProjetsPage() {
  notFound()
}
