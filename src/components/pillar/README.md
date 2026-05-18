# Gabarit page pilier

Template mutualisé pour les pages piliers `/services` et (à venir) `/besoins`.

## Architecture

7 blocs total. **6 blocs sont communs** (gérés en Sanity, rendus par les
composants `Pillar*`). **1 bloc central est injecté** par la route via les
`children` du template — il diffère selon le pilier :

| Pilier | Bloc central |
|---|---|
| `/services` | `ServicesCentralBlock` (3 cards services depuis `getServicesMenu`) |
| `/besoins` | `NeedsCentralBlock` à créer (12 besoins groupés par 5 familles) |

Ordre de rendu :

1. `PillarHero` — sombre, H1 + double CTA + curseur clignotant
2. `PillarVision` — blanc, intro éditoriale (paragraphes avec emphase `**...**`)
3. **Bloc central** — injecté via `<PillarPageTemplate>{children}</PillarPageTemplate>`
4. `PillarArticulation` — sombre, frise étapes + bandeau transversal optionnel
5. `PillarWhyMaria` — blanc, 4 piliers + lien Charte IA
6. `PillarFaq` — gris, accordéons (Client Component)
7. `PillarFinalCta` — sombre, curseur clignotant

## Source de données

Doc-type Sanity `pagePillier` (cf. `sanity/schemas/pagePillier.ts`).
Un document par pilier, identifié par le champ `slug` (`'services' | 'besoins'`).

Récupération côté code :

```ts
import { getPagePillier } from '@/lib/pagePillier'
const data = await getPagePillier('services')
```

## Comment décliner pour `/besoins`

1. Créer un document Sanity `pagePillier` avec `slug = 'besoins'` (depuis Studio
   ou via un script `scripts/seed-page-pillier-besoins.mjs`).
2. Créer un composant `NeedsCentralBlock.tsx` à côté de `ServicesCentralBlock.tsx`,
   qui rend les 12 besoins groupés par famille (utiliser `getBesoinsMenu` + la
   constante `FAMILLES` de `src/lib/pageBesoin.ts`). Donner un `id="central"`
   et `scrollMarginTop: '96px'` pour que l'ancre du Hero pointe dessus.
3. Créer la route `app/(site)/besoins/page.tsx` sur le même pattern :

```tsx
import { getPagePillier } from '@/lib/pagePillier'
import { getBesoinsMenu } from '@/lib/pageBesoin'
import PillarPageTemplate from '@/components/pillar/PillarPageTemplate'
import NeedsCentralBlock from '@/components/pillar/NeedsCentralBlock'

export default async function PillarBesoinsPage() {
  const [pillar, besoins] = await Promise.all([
    getPagePillier('besoins'),
    getBesoinsMenu(),
  ])
  if (!pillar) notFound()
  return (
    <main>
      {/* JSON-LD: Breadcrumb + ItemList (12 besoins) + FAQPage */}
      <PillarPageTemplate data={pillar}>
        <NeedsCentralBlock besoins={besoins} />
      </PillarPageTemplate>
    </main>
  )
}
```

4. Sitemap : passer `/besoins` de 0.7 → 0.9 (page pilier stratégique).

## Conventions

- **Pas de contenu hardcodé dans les composants `Pillar*`** — tout vient des
  données Sanity ou des props.
- Les blocs centraux peuvent contenir des labels / tags / hooks éditorialisés en
  code (cf. `HOOK_BY_SLUG`, `TAG_BY_SLUG` dans `ServicesCentralBlock`) tant
  qu'ils restent **stables**. À migrer vers Sanity si le besoin de pilotage
  CMS émerge.
- L'accent jaune `**...**` est rendu via `renderWithEmphase(..., 'text-accent')`
  côté Hero + CTA final.
- Le curseur clignotant `<span className="cur-blink" />` n'apparaît que sur
  Hero + CTA final.

## SEO

- 1 seul H1 (le titre du Hero).
- H2 par bloc.
- H3 dans les cards (services, why piliers).
- Le bloc central doit être structuré sémantiquement (`<article>`, `<ol>`/`<ul>`
  selon la nature).
- JSON-LD à émettre depuis la route :
  - `BreadcrumbList`
  - `ItemList` (les éléments du bloc central)
  - `FAQPage` (via `FaqJsonLd` + `pillar.faq.questions`)

## Composants exportés

```
PillarPageTemplate       — orchestrateur, accepte children pour le bloc central
PillarHero               — bloc 1
PillarVision             — bloc 2
PillarArticulation       — bloc 4 (avec bandeau transversal optionnel)
PillarWhyMaria           — bloc 5
PillarFaq                — bloc 6 (Client Component, accordéons custom)
PillarFinalCta           — bloc 7
ServicesCentralBlock     — bloc 3 spécifique au pilier Services
```
