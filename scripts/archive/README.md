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
| `seed-contact-page.mjs` | Seed initial du bloc contactPage dans parametresGlobaux |
| `seed-page-charte-ia.mjs` | Création initiale du singleton pageCharteIA |
| `seed-page-pillier-services.mjs` | Création initiale du doc pagePillierServices |
| `seed-page-pillier-besoins.mjs` | Création initiale du doc pagePillierBesoins |
| `seed-article-agent-chatbot.mjs` | Article témoin « Agent IA ou chatbot ? » |
| `seed-article-ia-service-client-b2b.mjs` | Article « IA service client B2B » |
| `seed-article-prospection-b2b-ia.mjs` | Article « Prospection B2B IA » |
| `patch-accueil-clients-logos.mjs` | Migration logos clients vers asset Sanity |
| `patch-accueil-home-copy.mjs` | Réécriture copy Hero/Services/Méthode HP |
| `patch-agence-corrections.mjs` | Corrections rédactionnelles agence |
| `patch-article-temoin-cleanup.mjs` | Cleanup keyTakeaways + relatedOffers article témoin |
| `patch-charte-surtitres.mjs` | Reformatage des sur-titres charte IA |
| `patch-merci-charte-link.mjs` | Ajout lien charte sur card merci |
| `patch-pillier-services-remove-cta.mjs` | Retrait du CTA final pillier services |
| `patch-service-audit-corrections.mjs` | Corrections rédactionnelles service audit |
| `patch-slug-audit-renomme.mjs` | Renommage slug `audit-strategie-ia` → `audit-et-strategie-ia` |
| `upload-asset.mjs` | Upload one-shot d'un placeholder SVG blog (asset disparu) |
