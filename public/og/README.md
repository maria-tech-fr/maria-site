# Assets Open Graph

Ce dossier accueille les **images Open Graph** servies aux réseaux sociaux
(LinkedIn, X/Twitter, Slack, Discord, WhatsApp, etc.) quand un lien vers
maria.tech est partagé.

## Assets attendus

| Fichier | Dimensions | Format | Usage |
|---|---|---|---|
| `default.jpg` | **1200×630** | JPG (privilégier) ou PNG | Image générique utilisée sur toutes les pages du site (home, services, besoins, agence, contact, charte, légales, etc.) **et** comme fallback final pour les articles de blog qui n’ont pas leur propre image. |

## À fournir

- **`/public/og/default.jpg`** — manquant. À fournir par l’équipe design.
  - Doit contenir le logo maria + un visuel signature (cohérent avec la charte : ink/paper, halos jaune/vert, typo Syne).
  - 1200×630 pixels exactement (ratio 1.91:1).
  - Poids cible < 300 KB (JPG qualité 80–85).
  - Texte gros et lisible (les réseaux sociaux redimensionnent agressivement sur mobile).

## Cascade article

Les articles de blog suivent une cascade en 3 étapes (cf. `app/(site)/blog/[slug]/page.tsx`) :

1. **`article.seo.ogImage`** (champ Sanity dédié, optionnel)
2. **`article.coverImage`** (image de couverture, Sanity)
3. **`/og/default.jpg`** (fallback hérité du layout via `metadataBase`)

## Validation

Une fois `default.jpg` déposé, tester un partage avec :
- LinkedIn Post Inspector : <https://www.linkedin.com/post-inspector/>
- Twitter/X Card Validator : <https://cards-dev.twitter.com/validator>
- Slack : simplement coller le lien dans un canal de test.

Si la preview ne se met pas à jour : ces validateurs ont un cache, c’est normal — Twitter/X peut mettre 24–48 h.
