# Gabarit article — guide rédacteur

Ce dossier contient le gabarit d'article maria, optimisé SEO + GEO (« Generative Engine Optimization » — citabilité par ChatGPT, Perplexity, AI Overviews).

Tout le contenu d'un article vit dans **Sanity** (`/machine` → Article). Aucun fichier n'est à modifier en code pour publier un article.

> 💡 Pour rédiger un nouvel article avec un assistant IA (Claude/GPT) directement au format du gabarit, voir [PROMPT.md](./PROMPT.md).

## Anatomie d'un article complet

```
┌────────────────────────────────────────┐
│ Hero (catégorie, H1, chapô, auteur)    │
├────────────────────────────────────────┤
│ ★ L'essentiel (TL;DR)                  │  ← bloc le + extrait par les IA
├────────────────────────────────────────┤
│ Sommaire │ Corps avec H2/H3/blocs riches│
│  ┌──┐    │                              │
│  │  │    │  • paragraphes               │
│  │  │    │  • H2-questions « ? »        │  ← alimentent FAQPage
│  │  │    │  • H3 (sous-thématique)      │
│  │  │    │  • listes                    │
│  │  │    │  • À retenir (vert)          │  ← synthèse extractible
│  │  │    │  • Point de vigilance (jaune)│
│  │  │    │  • Ce qu'on en pense (signa.)│  ← marque maria
│  │  │    │  • Définition (terme/déf)    │  ← extrait IA
│  │  │    │  • Tableau comparatif        │  ← extrait IA
│  │  │    │  • Citation attribuée        │  ← autorité
│  │  │    │  • CTA in-article            │
│  └──┘    │  • images, vidéos, etc.      │
├────────────────────────────────────────┤
│ ★ FAQ finale (accordéons)              │  ← matière FAQPage
├────────────────────────────────────────┤
│ Auteur · Articles liés                 │
└────────────────────────────────────────┘
```

Les blocs marqués ★ sont les **briques GEO**. Optionnelles, à remplir systématiquement sur les nouveaux articles. Pour la synthèse finale, utiliser un callout « À retenir » en fin de corps si besoin.

## Règles d'or

### 1. La règle des H2-questions

Si un H2 finit par `?`, il est traité comme une **question** : il alimente automatiquement le schema FAQPage. Pour que ça fonctionne, le bloc **immédiatement après** doit être un paragraphe-réponse autoportant (= compréhensible sans contexte, 2 à 5 phrases).

✅ Bon
```
## Combien de temps prend un audit IA ?
Entre 3 et 6 semaines selon la taille de l'entreprise. Maria pose le périmètre
en kickoff, audite vos données, puis livre une feuille de route chiffrée.
```

❌ Mauvais
```
## Combien de temps prend un audit IA ?
- Étape 1 : kickoff
- Étape 2 : audit
- Étape 3 : restitution
```
(La liste n'est pas une réponse autoportante extractible.)

Un warning console est levé en dev/build si la règle est violée.

### 2. Le TL;DR « L'essentiel »

3 à 5 puces, **chacune lisible isolément**. Affiché juste après le chapô. C'est ce qui sera repris dans un AI Overview / une citation Perplexity. Allez à l'essentiel, factuel.

### 3. La FAQ finale

3 à 8 Q/R. Chaque **réponse doit pouvoir être lue isolément**. Combinée aux H2-questions du corps, elle maximise la couverture FAQPage. Doublons OK : on dédupplique automatiquement (priorité à la version FAQ finale).

### 4. La fraîcheur (`updatedAt`)

Quand vous **actualisez réellement** le contenu (chiffres, exemples, recos), remplissez `updatedAt` manuellement. C'est ce qui apparaîtra dans le schema `dateModified` et le sitemap `lastmod` — signal GEO/SEO fort. Si vide, on retombe sur la date de modif Sanity automatique.

## Quand utiliser chaque bloc

| Bloc | Variant | Quand l'utiliser |
|---|---|---|
| **À retenir** (vert) | `callout` | Synthèse factuelle d'une section. 1 phrase, extractible. |
| **Point de vigilance** (jaune) | `warning` | Mise en garde, piège classique. Affirme l'expertise. |
| **Ce qu'on en pense chez maria** (signature) | `avisMaria` | Prise de position assumée de l'agence. Voix de marque. À utiliser 1 fois max par article, sur un débat où maria a une opinion claire. |
| **Définition** | `definition` | Terme métier ou jargon IA. Très cité par les moteurs génératifs. |
| **Tableau comparatif** | `tableau` | Comparer 2-5 options. Format adoré des IA pour extraction. |
| **Citation attribuée** | `quoteAttribuee` | Parole d'un membre de l'équipe (nom + rôle visibles). Améliore l'autorité. |
| **CTA in-article** | `inArticleCta` | Renvoyer vers une page business (services, contact, agenda). Utiliser avec parcimonie (1-2 max). |

## Maillage interne

- **Liens dans le corps** : contextualiser librement vers les autres articles, services, besoins. Les liens internes (`/...`) sont stylés en soulignement vert ; les liens externes (`https://...`) en soulignement jaune, avec un picto ↗ et `target="_blank"`.
- **CTA in-article** : utiliser le bloc `CTA en cours d'article` pour renvoyer vers une page business spécifique (1-2 max).
- **CTA latéral** : le champ `sidebarCta` ajoute un encart sous le sommaire (optionnel).
- **Articles liés** (bas de page) : générés automatiquement (même catégorie, fallback récents).

## Validation

À chaque article, vérifier :

- [ ] Chapô court et précis
- [ ] TL;DR de 3-5 puces (au moins 3)
- [ ] Au moins 1 H2-question avec sa réponse autoportante
- [ ] Au moins 1 bloc « À retenir » ou « Définition » ou « Tableau »
- [ ] FAQ finale (3-8 Q/R)
- [ ] CTA latéral (`sidebarCta`) rempli si pertinent
- [ ] `updatedAt` rempli si actualisation réelle
- [ ] SEO : titre < 70 caractères, meta description < 160

## Composants front

| Fichier | Rôle |
|---|---|
| `ArticleHero.tsx` | Hero (catégorie, H1, chapô, auteur, image) |
| `ArticleTldr.tsx` | « L'essentiel » (TL;DR) — vert |
| `TableOfContents.tsx` + `MobileToc.tsx` | Sommaire sticky / mobile |
| `ArticleSidebarCta.tsx` | CTA latéral sous le sommaire |
| `ArticleContent.tsx` | Rendu Portable Text (tous les blocs body) |
| `ArticleFaq.tsx` | FAQ finale (accordéons) |
| `AuthorBlock.tsx` | Bloc auteur (fin d'article) |
| `RelatedArticles.tsx` | 3 articles liés |
| `Breadcrumb.tsx` | Fil d'Ariane |
| `ArticleJsonLd.tsx` | Schemas : BlogPosting + BreadcrumbList + FAQPage |
| `ReadingProgress.tsx` | Barre de progression top |
