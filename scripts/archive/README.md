# scripts/archive

Scripts one-shots déjà exécutés en production (seeds initiaux, migrations de
contenu). Conservés pour traçabilité historique. **Ne pas les rejouer** — le
contenu vit désormais côté Sanity Studio et serait écrasé.

| Script | Action passée |
|---|---|
| `seed-besoins.mjs` | Création initiale des 12 stubs `pageBesoin` |
| `seed-besoins-lot1.mjs` | Contenu Lot 1 : Productivité opérationnelle (3 besoins) |
| `seed-besoins-lot2.mjs` | Contenu Lot 2 : Organisation & connaissance (3) |
| `seed-besoins-lot3.mjs` | Contenu Lot 3 : Pilotage & décision (2) |
| `seed-besoins-lot4.mjs` | Contenu Lot 4 : RH & formation (2) |
| `seed-besoins-lot5.mjs` | Contenu Lot 5 : Gouvernance & conformité (2) |
| `seed-merci-page.mjs` | Seed initial des champs merci dans `parametresGlobaux.contactPage` |
| `seed-page-formation.mjs` | Création initiale du singleton `pageFormation` |
| `patch-besoin-temoin.mjs` | Nettoyage de la phrase closing du témoin tâches-répétitives |
| `patch-besoins-formation-link.mjs` | Bascule des `formationMention.lienHref` vers `/services/formation` |
| `patch-constat-titre.mjs` | Nettoyage des retours chariot parasites du titre Constat |
