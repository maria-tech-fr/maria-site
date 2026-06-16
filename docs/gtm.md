# Google Tag Manager + Axeptio

GTM est installé sur le site, mais **n'est jamais chargé avant la première
décision de l'utilisateur dans Axeptio** (accepter ou refuser). GA4 et
tout futur tag marketing sont configurés **dans l'interface GTM**, jamais
directement côté site.

## Architecture

| Couche | Rôle |
|---|---|
| **Inline script** dans `<body>` du layout | Pose les defaults Google Consent Mode v2 (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` → `denied`) avant tout autre script |
| **Axeptio** (composant `ConsentBanner`) | Bandeau de consentement RGPD. Gère **nativement** la mise à jour de Google Consent Mode v2 après le choix utilisateur (`gtag('consent','update', …)`) |
| **GTM** (composant `GtmLoader`) | Injecte `gtm.js` dès que le SDK Axeptio est prêt. GTM démarre avec les defaults Consent Mode `denied` et ne déclenche AUCUN tag tant qu'Axeptio n'a pas mis les flags en `granted`. C'est l'approche officielle Google Consent Mode v2 + Axeptio |

## Variables d'environnement

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX        # container GTM
NEXT_PUBLIC_AXEPTIO_CLIENT_ID=…        # projet Axeptio (déjà câblé)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX         # référence/doc, plus utilisée côté code
```

À poser dans Vercel **Settings → Environment Variables** (Production +
Preview + Development), pas « Sensitive » (ce sont des IDs publics). Vercel
redéploie automatiquement après ajout.

## Ajouter un nouveau tag dans GTM

1. Console GTM → conteneur `GTM-XXXXXXXX` → **Tags → New**
2. Choisis le type de tag (GA4, Meta Pixel, LinkedIn Insight, etc.)
3. **Triggers** : « All Pages » pour un tag pageview standard, ou un
   déclencheur personnalisé selon le cas
4. **Consent Settings → Built-in Consent Checks** : coche les flags
   pertinents (`analytics_storage` pour analytics, `ad_storage` pour
   marketing/ads). GTM ne déclenchera le tag que si l'utilisateur a
   donné son consentement pour ces flags
5. **Save**
6. Tester en mode **Preview** depuis l'interface GTM (utilise le
   véritable site, simule un visiteur)
7. **Publish** quand validé (cf. section publication ci-dessous)

## Comment GTM respecte Axeptio

Le flux concret au chargement de page :

1. **Avant tout script** (parsing HTML) → l'inline script du layout
   appelle `gtag('consent','default',{…})` avec tous les flags à `denied`
2. **Page interactive** → Axeptio SDK se charge (afterInteractive)
3. **SDK Axeptio prêt** → GtmLoader détecte (via la queue `_axcb`)
   et injecte immédiatement `gtm.js`. GTM démarre avec les flags
   Consent Mode tous en `denied` : il ne déclenche AUCUN tag
   tracking et ne pose AUCUN cookie tiers
4. **Utilisateur fait son choix** dans le bandeau Axeptio
5. **Axeptio appelle `gtag('consent','update',{…})`** avec les flags
   accordés (intégration native Consent Mode v2)
6. **GTM ré-évalue** ses tags : ceux dont les Consent Checks
   correspondent aux flags accordés se déclenchent (GA4 si
   `analytics_storage='granted'`, pixels marketing si
   `ad_storage='granted'`, etc.)

→ Aucune requête `/collect` (GA4) ni dépôt de cookies tracking
(`_ga`, `_gid`, `_gcl_au`, etc.) tant que l'utilisateur n'a pas
explicitement accepté la catégorie analytique/marketing
correspondante.

→ **Pourquoi pas écouter `cookies:complete`** : cet événement
Axeptio peut ne pas firer dans tous les contextes (recharge avec
choix mémorisé, navigateurs strict-privacy, certaines versions du
SDK). Charger GTM dès `_axcb` est l'approche recommandée par
Axeptio et garantit que GTM est en place quand Axeptio met à jour
le Consent Mode.

→ **Fallback** : si Axeptio ne se charge pas du tout (CDN bloqué,
env var absente, extension navigateur), GTM est chargé après 5 s
par sécurité. Les defaults Consent Mode restent `denied`, donc
aucun tag tracking ne fire pour autant.

📎 Doc Google Consent Mode v2 :
https://developers.google.com/tag-platform/security/concepts/consent-mode

📎 Doc Axeptio + Consent Mode :
https://support.axeptio.eu/hc/en-us/articles/22203787358097

## Publier une nouvelle version GTM

1. Console GTM → conteneur → **Submit** (bouton en haut à droite)
2. Renseigne :
   - **Version Name** : court et descriptif (« GA4 + LinkedIn Insight »)
   - **Version Description** : changelog détaillé (ce qui change, pourquoi)
3. **Publish to** : `Live` (sauf si tu veux pousser sur un environnement
   intermédiaire — non utilisé ici)
4. **Publish**
5. **Pas de redéploiement Vercel nécessaire** — GTM charge dynamiquement
   la dernière version publiée à chaque visite

## Tests à effectuer après modification

En navigation privée sur `https://maria.tech` :

### Refuser tout

1. Bandeau Axeptio apparaît → cliquer « Tout refuser »
2. **DevTools → Network** :
   - Requête vers `https://www.googletagmanager.com/gtm.js?id=GTM-XXX`
     présente (GTM est chargé dès qu'Axeptio est prêt — comportement
     normal sous Consent Mode v2)
   - **AUCUNE** requête vers `google-analytics.com/g/collect`,
     `analytics.google.com/g/collect` ou un endpoint marketing
3. **DevTools → Application → Cookies** : aucun cookie commençant par
   `_ga`, `_gid`, `_gcl_au`, `_fbp` ou autre identifiant marketing.
   GTM en mode denied ne pose pas de cookies tracking.

### Accepter tout

1. Bandeau Axeptio → cliquer « Tout accepter »
2. **DevTools → Network** :
   - GTM déjà chargé (même requête `gtm.js` que dans le cas refus)
   - **Nouvelle** requête vers `google-analytics.com/g/collect?…` ou
     `analytics.google.com/g/collect?…` après la mise à jour Consent
     Mode
3. **DevTools → Application → Cookies** : les cookies `_ga`, `_ga_XXX`
   apparaissent (durée 13 mois max)

### Modifier son choix a posteriori

Footer → lien `Gérer mes cookies` → rouvre le bandeau Axeptio → nouveau
choix → Consent Mode est mis à jour, GTM ré-évalue ses tags en
conséquence (sans recharger la page).

## Limitation connue : utilisateurs sans JavaScript

Le snippet noscript standard de GTM (iframe vers
`googletagmanager.com/ns.html?id=…`) charge le container
**inconditionnellement**, ce qui violerait notre règle « aucun cookie
tiers avant choix utilisateur » pour les visiteurs JS désactivé.

**Décision** : on n'inclut pas ce noscript. Les utilisateurs sans JS
ne sont pas trackés du tout. Trade-off accepté pour rester en
consentement strict.

## Fichiers concernés

- `app/(site)/layout.tsx` — inline script Consent Mode + montage
  `<ConsentBanner />` + `<GtmLoader />`
- `src/components/analytics/ConsentBanner.tsx` — chargement du SDK
  Axeptio (inchangé)
- `src/components/analytics/GtmLoader.tsx` — écoute du premier
  `cookies:complete` Axeptio et injection conditionnelle du script GTM
- `next.config.ts` — CSP autorise déjà `googletagmanager.com` sur
  `script-src` et `connect-src` (pas de modification nécessaire pour GTM)
