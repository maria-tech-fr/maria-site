# Prompt rédaction article — SEO + GEO

Template clé en main pour produire un article 900 mots qui rentre directement dans le gabarit maria (Sanity).

Le bloc **INPUT** est ce que tu remplis. Le bloc **PROMPT** se colle tel quel dans Claude/GPT avec ton input.

---

## 1. INPUT à fournir

```
SUJET (titre provisoire) :
THÈSE PRINCIPALE (1 phrase — ce que tu veux que le lecteur retienne) :
PUBLIC VISÉ :
CATÉGORIE (1 parmi) : strategie-ia | outils-internes | agents-ia | methode-gouvernance | tendances-analyses | etudes-de-cas
MOTS-CLÉS SEO (3-5, dans l'ordre d'importance) :
QUESTIONS QUE GOOGLE / IA SE POSENT SUR LE SUJET (3-5) :
ANGLE MARIA (la position qu'on défend, parfois à contre-courant) :
SOURCES / FAITS À INTÉGRER (optionnel) :
CTA in-article cible (URL interne) :
AUTEUR : "L'équipe maria" | "Alexandre BRU"
```

## 2. Contraintes systématiques

- **Longueur** : 900 mots ± 100 (hors TLDR/FAQ)
- **Ton maria** : sobre, factuel, direct ; jamais moqueur, jamais marketing ; phrases courtes, peu d'adjectifs ; pas de jargon non défini
- **Format** : markdown structuré (voir gabarit ci-dessous)
- **Règle GEO d'or** : tout H2 finissant par `?` doit être suivi **immédiatement** d'un paragraphe-réponse de 2-4 phrases, **autoportant** (compréhensible hors contexte)

## 3. PROMPT à coller dans Claude / GPT

```
Tu rédiges un article pour le blog maria — agence IA pour l'interne (PME/ETI).
Ton : sobre, factuel, expert, jamais marketing. Phrases courtes.
Cible : 900 mots ± 100 (hors TLDR et FAQ).

BRIEF :
{coller ici le bloc INPUT rempli}

PRODUIS L'ARTICLE EXACTEMENT DANS CE FORMAT :

### MÉTA
- titre (H1, max 90 caractères, idéalement contient un mot-clé principal)
- sousTitre (chapô, 1-3 phrases, max 200 caractères, accroche + promesse)
- intro (1-2 phrases, max 280 caractères — utilisée si l'article est mis « en vedette »)
- seo.titre (max 70 caractères, plus serré que le H1)
- seo.description (max 160 caractères, factuelle, contient au moins un mot-clé)

### TLDR — « L'essentiel » (3 à 5 puces)
Chaque puce :
- est lisible isolément (sortie de contexte = doit toujours faire sens)
- max 200 caractères
- répond directement à une question implicite du sujet
- factuelle, pas d'effet rhétorique

### BODY (5 à 7 sections H2)

Pour chaque section, choisis le type :
- **H2-question** (finit par « ? ») → la 1re ligne juste après est un PARAGRAPHE de 2-4 phrases qui répond, autoportant. Indispensable pour le schema FAQPage.
- **H2-statement** (affirmation) → libre.

Ouvre l'article par un H2 « Le constat » (statement) qui pose le problème en 3-4 paragraphes, dont 1 blockquote courte (1 phrase frappante).

Dans le corps, utilise les blocs suivants au moins **une fois chacun** (sauf incompatible avec le sujet) :
- **Définition** : `terme + définition` (max 80 + 400 caractères). À utiliser pour le terme central de l'article.
- **Tableau comparatif** : 3 colonnes max, 5-8 lignes. Utile dès qu'il y a une distinction binaire ou un choix entre options.
- **À retenir** (callout vert) : 1 phrase synthèse extractible, après une section dense.
- **Point de vigilance** (callout jaune) : 1-2 phrases, met en garde contre une erreur classique. Marque l'expertise.
- **Ce qu'on en pense chez maria** (1 fois max) : 2-4 phrases, prise de position assumée, parfois à contre-courant. Format : « La mode pousse X. Notre conviction est Y. »
- **Citation attribuée** : 1 phrase forte d'un membre de l'équipe (nom + rôle). Sert l'autorité GEO.
- **CTA in-article** : 1 fois max, vers l'URL fournie en brief. Titre + 1 phrase + libellé bouton.
- **Liste numérotée** : utiliser pour une vraie séquence ou grille de décision (3-6 items). Sinon liste à puces.

Ne pas mettre d'image ou de vidéo (optionnel, géré séparément).

### FAQ FINALE (3 à 5 Q/R)

- Questions distinctes des H2-questions du corps (pas de doublon).
- Chaque réponse : 2-5 phrases, autoportante, max 800 caractères.
- Cibler des questions que des humains tapent vraiment dans Google ou demandent à ChatGPT.

### LIVRABLE

Rends-moi le tout en markdown structuré :
- titre, sousTitre, intro, seo.titre, seo.description en début
- TLDR sous forme de liste à puces
- BODY avec hiérarchie H2/H3 et chaque bloc spécial marqué `[CALLOUT À RETENIR]`, `[CALLOUT VIGILANCE]`, `[AVIS MARIA]`, `[DÉFINITION terme]`, `[TABLEAU]`, `[CITATION auteur — rôle]`, `[CTA libellé → /url]`
- FAQ en sections H3 = question, paragraphe = réponse

Ne donne aucun commentaire hors de l'article. Pas d'intro, pas de récap, pas de remarques sur le brief. Juste l'article.
```

## 4. Workflow type

1. Tu remplis le bloc INPUT
2. Tu colles INPUT + PROMPT dans Claude/GPT
3. Tu récupères l'article en markdown structuré
4. Tu relis (corrections de ton, vérifs factuelles, lien CTA OK)
5. Tu copies dans le Studio Sanity, bloc par bloc — ou tu passes le markdown final à Claude Code et il te seede un script (comme pour l'article témoin) qui crée le doc en 1 commande

## 5. Recommandations

- **Itérer en plusieurs prompts** : 1er prompt → article complet, puis prompts de retouche ciblés (« renforce le H2-3 », « réécris l'avis maria en plus tranchant »). Plus efficace que tout en un coup.
- **Vérifs avant publication** :
  - Compter les mots du body (cible 900 ± 100)
  - Vérifier que chaque H2-question a sa réponse-paragraphe juste en dessous (le `console.warn` en dev t'aide)
  - Pas de doublon entre H2-questions et FAQ
  - Au moins 1 lien interne dans le corps (autre article ou page services/besoins)
- **L'avis maria** est ton avantage différenciant côté GEO/marque — ne le mets pas sur tous les articles, mais quand le sujet s'y prête, c'est ce qui te fera citer plutôt qu'un autre.
- **Drafts** : garder un dossier `drafts/` git-ignored avec briefs + sorties IA, pour itérer sans encombrer le repo.

---

Voir aussi : [README.md](./README.md) — guide rédacteur côté Sanity (où trouver chaque champ, anatomie du gabarit, checklist de validation).
