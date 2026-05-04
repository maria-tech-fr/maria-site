# maria — document de cadrage

Document de référence synthétisant les règles de fonctionnement du site maria. Issu des décisions prises au fil des itérations.

---

## 1. Contexte

Site marketing de **maria**, agence IA spécialisée dans les **outils internes**, l'**amélioration de processus** et les **agents IA**. Positionnement : « experts humains qui contrôlent l'IA pour créer des projets maîtrisés et efficaces ».

Cible unique (pas d'univers multiples). Page d'accueil → portfolio + démonstration de savoir-faire → conversion (contact, formulaire de définition de projet, agent IA).

---

## 2. Stack technique

| Brique | Version / outil |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styles | Tailwind v4 (config dans `app/globals.css` via `@theme`) |
| CMS | Sanity Studio 5 (intégré sous `/studio`) |
| Hébergement | Vercel (à confirmer) |
| TypeScript | strict mode |
| ISR | `revalidate: 60` pour les pages contenu, 300s pour les params globaux |
| Port dev | `3001` (MyUnisoft occupe 3000) |
| Sanity projectId | `n0w083ri` |

---

## 3. Identité visuelle

### 3.1 Logo
« maria » en monospace (DM Mono) noir + barre verticale jaune `#FEC23C` à droite, comme un curseur de terminal.

### 3.2 Typographies
- **Syne** — titres et display (`font-display`)
- **Work Sans** — body (`font-sans`, défaut)
- **DM Mono** — labels accent, code, éléments d'interface signature (`font-mono`)

Les 3 sont chargées via `next/font/google` → zéro layout shift, self-hosted.

### 3.3 Palette
| Token Tailwind | Hex | Usage |
|---|---|---|
| `paper` | `#FFFFFF` | Fond principal |
| `paper-soft` | `#F9F9F9` | Fonds de section |
| `paper-edge` | `#EEEEEE` | Bordures, séparateurs |
| `ink` | `#212121` | Texte principal, titres |
| `ink-soft` | `#383838` | Texte secondaire |
| `accent` | `#FEC23C` | Couleur de marque (CTA, accents) |
| `accent-soft` | `#FFE482` | Surfaces accent atténuées |
| `accent-tint` | `#FFFBEE` | Fonds très atténués |
| `success` | `#3FC163` | Succès, validations |
| `success-soft` | `#B7FFCA` | Surfaces succès atténuées |
| `success-tint` | `#E8FFEE` | Fonds très atténués |

---

## 4. Architecture du site (prévue)

| Page | Route | Schéma Sanity |
|---|---|---|
| Accueil | `/` | `accueil` (singleton) |
| Services (index) | `/services` | listing de `service` |
| Page service | `/services/[slug]` | `service` |
| À propos | `/a-propos` | `pageApropos` (singleton) |
| Contact | `/contact` | `pageContact` (singleton) — texte + URL Calendly |
| Blog (index) | `/blog` | listing de `article` |
| Article | `/blog/[slug]` | `article` + `auteur` |
| Projets (index) | `/projets` | listing de `projet` |
| Page projet | `/projets/[slug]` | `projet` |
| Pages légales | `/[slug-legal]` | `pageLegale` |
| Studio | `/studio` | embarqué |

Plus un singleton `parametresGlobaux` pour la nav, le footer, les coordonnées, les réseaux sociaux.

---

## 5. Principes produit

### 5.1 Figma = source de vérité
Toute modification d'un bloc ou d'une page doit être cross-référencée avec la maquette Figma correspondante. On n'ajoute, ne retire, ne renomme aucun contenu qui n'est pas dans la maquette.

### 5.2 Admin BO haute exigence
L'utilisateur doit pouvoir gérer le contenu en autonomie. UX Studio aussi soignée que le front. Singletons protégés (pas de duplicate, pas de delete).

### 5.3 Typographie des titres
**Sentence case** : majuscule uniquement sur le premier mot, sauf noms propres et sigles (IA, LEO, RGPD, etc.).

---

## 6. Performance

- Server Components par défaut, `'use client'` uniquement où nécessaire
- ISR (revalidate 60s contenu, 300s params globaux)
- `next/image` + URLs Sanity avec `@sanity/image-url`
- Polices via `next/font` (zéro layout shift)
- Tailwind v4 (zéro JS au runtime)
- Animations privilégiées : CSS pur + Intersection Observer ; Motion uniquement si besoin de séquences complexes
- Cible Lighthouse 95+ sur chaque page

---

## 7. Sécurité

- Headers stricts dans `next.config.ts` : CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS
- CSP appliquée hors `/studio` et `/api` (Studio a besoin de ressources Sanity dynamiques)
- `noindex` global tant que `NEXT_PUBLIC_ALLOW_INDEXING !== 'true'` ; `/studio` et `/api` toujours en noindex
- Formulaire contact : validation Zod côté serveur, rate-limiting, honeypot anti-bot
- Resend côté serveur uniquement (clé jamais exposée)
- Studio protégé par auth Sanity native

---

## 8. Fonctionnalités prévues à ajouter

- **Formulaire de définition de projet** (multi-étapes) → qualifie un lead, génère une fiche cadrage exploitable côté agence
- **Agent IA** intégré au site (Anthropic SDK côté serveur, streaming SSE) → assiste le visiteur dans la définition de son besoin

À cadrer en détail au moment de leur implémentation.

---

## 9. Workflow de déploiement

- Tout commit poussé sur `main` → build et déploiement Vercel (à brancher)
- Pas de force-push, pas de skip des hooks
- Schémas Sanity modifiés pris en compte au prochain reload du Studio
