/**
 * Seed de l'article « De l'Excel au tableau de bord dynamique : comment l'IA
 * automatise votre pilotage »
 *
 * Auteur : Mathieu HERNANDEZ (Directeur produit) — `auteur-equipe-maria` en
 * base.
 * Catégorie : Outils internes — `articleCategorie-outils-internes`.
 * Featured : false.
 *
 * Cross-link vers /blog/excel-vs-tableau-bord-ia-basculer-sans-casser dans
 * la section « Par où commencer » (paire HERNANDEZ/SEILLER méthode ↔
 * stratégie sur le pilotage Excel ↔ IA). Ajouté dans un second passage, lors
 * de la publication de l'article SEILLER. Le seul autre article voisin sur
 * les données (`/blog/donnees-agent-ia-service-client`) traite les données
 * pour un agent IA, angle trop éloigné du pilotage dirigeants : pas de lien.
 *
 * Lien éditorial vers /besoins/vision-claire-donnees-metier ajouté dans le
 * dernier paragraphe du « Par où commencer » (demande utilisateur : lien
 * dans le corps en plus du CTA sidebar).
 *
 * Sources cliquables :
 *  - France Num 2025 (DGE / Crédoc) : URL directe baromètre → LIEN sur la
 *    mention dans la section « Pourquoi vos Excel finissent par vous
 *    ralentir ».
 *  - CIGREF 2026 ROI : URL directe du rapport → LIEN sur la mention dans la
 *    section méthode (Étape 2 audit des sources).
 *
 * Choix éditoriaux :
 *  - 4 semaines du « Par où commencer » reformatées en paragraphes séparés
 *    (**Semaine X**), pattern maria habituel plus lisible que la version
 *    condensée du brief.
 *  - CITATION HERNANDEZ déplacée du tout début de « Par où commencer » (brief)
 *    vers la clôture de « Combien ça coûte » (plus habituel et enchaîne
 *    mieux).
 *  - inArticleCta yellow ajouté après le CALLOUT VIGILANCE de la section
 *    budget (moment cadrage / décision), juste avant la CITATION de clôture.
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-excel-tableau-bord-dynamique.mjs
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

function parseInline(text) {
  const REGEX = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(REGEX).filter(Boolean)
  const children = []
  const markDefs = []
  for (const part of parts) {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, linkText, url] = linkMatch
      const isExternal = url.startsWith('http://') || url.startsWith('https://')
      const key = k('link')
      markDefs.push({ _key: key, _type: 'link', href: url, blank: isExternal })
      children.push({ _type: 'span', _key: k('s'), text: linkText, marks: [key] })
    } else if (part.startsWith('**') && part.endsWith('**')) {
      children.push({ _type: 'span', _key: k('s'), text: part.slice(2, -2), marks: ['strong'] })
    } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      children.push({ _type: 'span', _key: k('s'), text: part.slice(1, -1), marks: ['em'] })
    } else {
      children.push({ _type: 'span', _key: k('s'), text: part, marks: [] })
    }
  }
  return { children, markDefs }
}

const paragraph = (text) => {
  const { children, markDefs } = parseInline(text)
  return { _type: 'block', _key: k('p'), style: 'normal', markDefs, children }
}
const h2 = (text) => ({
  _type: 'block', _key: k('h2'), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})
const h3 = (text) => ({
  _type: 'block', _key: k('h3'), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})
const callout = (titre, texte) => ({ _type: 'callout', _key: k('co'), titre, texte })
const warning = (titre, texte) => ({ _type: 'warning', _key: k('wa'), titre, texte })
const definition = (terme, def) => ({ _type: 'definition', _key: k('df'), terme, definition: def })
const avisMaria = ({ titre, texte, signature }) => {
  const out = { _type: 'avisMaria', _key: k('am'), texte }
  if (titre) out.titre = titre
  if (signature) out.signature = signature
  return out
}
const tableau = ({ legende, enTetes, lignes }) => ({
  _type: 'tableau', _key: k('tb'),
  ...(legende ? { legende } : {}),
  enTetes,
  lignes: lignes.map((cellules) => ({ _type: 'ligne', _key: k('lg'), cellules })),
})
const quoteAttribuee = ({ texte, auteur, role }) => ({
  _type: 'quoteAttribuee', _key: k('qa'), texte, auteur,
  ...(role ? { role } : {}),
})
const inArticleCta = ({ titre, description, lienLibelle, lienHref, variant = 'yellow' }) => ({
  _type: 'inArticleCta', _key: k('cta'), titre, description, lienLibelle, lienHref, variant,
})

const ARTICLE = {
  _id: 'article-excel-tableau-bord-dynamique-ia-automatiser-pilotage',
  _type: 'article',
  slug: { _type: 'slug', current: 'excel-tableau-bord-dynamique-ia-automatiser-pilotage' },
  titre: 'De l’Excel au tableau de bord dynamique : comment l’IA automatise votre pilotage',
  sousTitre:
    'Vos Excel vous ralentissent plus qu’ils ne vous aident. Voici comment l’IA transforme vos fichiers en tableau de bord vivant, sans refondre vos outils.',
  intro:
    'Dans la plupart des PME françaises, le pilotage repose encore sur des fichiers Excel consolidés à la main chaque mois. Voici ce que l’IA change concrètement.',
  publishedAt: '2026-10-26T09:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-outils-internes' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Dans la plupart des PME françaises, le pilotage repose sur des Excel consolidés à la main, mobilisant plusieurs jours par mois par personne.',
    'Un tableau de bord dynamique alimenté par IA lit vos sources existantes (CRM, ERP, SaaS métier), consolide automatiquement, et met à jour les indicateurs en continu.',
    'Sur les projets que nous accompagnons, comptez 4 à 8 semaines pour un premier tableau de bord utile, selon le nombre de sources à connecter.',
    'Les budgets vont de 5 000 à 40 000 euros selon le palier, hors accompagnement au changement.',
    'Le facteur de réussite n’est pas l’outil, c’est la qualité des sources et la précision des indicateurs choisis.',
  ],

  body: [
    h2('Pourquoi vos Excel finissent par vous ralentir'),
    paragraph(
      'Dans les PME et ETI que nous auditons chez maria, la même scène se répète. Un contrôleur de gestion passe 3 à 5 jours par mois à consolider des exports CRM, ERP et SaaS métier dans un fichier Excel. Le fichier est envoyé au comité de direction. Au moment où il est lu, il décrit déjà le passé.',
    ),
    paragraph(
      'Ce temps n’est pas une anomalie. Il est la conséquence directe d’un système qui n’a jamais été conçu pour tenir à jour. Chaque export est manuel, chaque mise en forme est à refaire, chaque changement de source casse les formules. Le [Baromètre France Num 2025](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le), mené par la Direction générale des Entreprises auprès de 11 021 TPE et PME françaises, confirme que la majorité des dirigeants considèrent le numérique comme un bénéfice réel, mais seulement 40 % estiment qu’il a un impact direct sur leur chiffre d’affaires. L’écart se joue souvent sur ce point précis : les données existent, mais elles arrivent trop tard et sous une forme trop figée pour servir au pilotage.',
    ),
    callout(
      'À retenir',
      'Le problème n’est pas Excel. Excel est un excellent outil de calcul. Le problème est la chaîne manuelle qui va de vos sources métier à votre comité de direction. L’IA agit sur cette chaîne, pas sur vos fichiers.',
    ),

    h2('Qu’est-ce qu’un tableau de bord dynamique alimenté par IA ?'),
    definition(
      'Tableau de bord dynamique IA',
      'Un tableau de bord dynamique alimenté par IA est un système qui se connecte en continu à vos sources métier (CRM, ERP, SaaS, bases internes), consolide les données sans ressaisie, calcule vos indicateurs clés et les met à jour sans intervention humaine. L’IA intervient à trois niveaux : rapprochement automatique des sources hétérogènes, détection d’anomalies, interrogation en langage naturel.',
    ),
    paragraph(
      'Trois éléments distinguent ce type de dispositif d’un simple outil de BI classique. Premièrement, il ne demande aucune ressaisie. Les données partent de leur source d’origine et arrivent au tableau de bord sans manipulation humaine. Deuxièmement, il réconcilie des sources qui ne se parlent pas. Un CRM commercial, un ERP compta et un SaaS RH ne partagent pas les mêmes identifiants : l’IA fait le lien. Troisièmement, il peut être interrogé en langage naturel. Un dirigeant pose sa question comme il la poserait à son contrôleur de gestion, et obtient la réponse chiffrée.',
    ),

    h2('Les 5 types d’Excel qui gagnent le plus à être transformés'),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, cinq familles de fichiers Excel ressortent comme les meilleurs candidats.',
    ),
    tableau({
      enTetes: ['Type de fichier', 'Fréquence de mise à jour', 'Potentiel de transformation'],
      lignes: [
        ['Suivi commercial (pipeline, CA)', 'Hebdomadaire', 'Très fort'],
        ['Reporting financier (marge, trésorerie)', 'Mensuel', 'Très fort'],
        ['Pilotage production ou logistique', 'Hebdomadaire', 'Fort'],
        ['Suivi RH (effectifs, absences, recrutements)', 'Mensuel', 'Moyen à fort'],
        ['Reporting marketing (acquisition, conversion)', 'Hebdomadaire', 'Fort'],
      ],
    }),
    paragraph(
      'Le point commun de ces cinq familles : les données existent dans un système source, elles sont extraites manuellement, mises en forme à la main, puis diffusées en PDF ou par email. Chaque étape manuelle est un candidat direct à l’automatisation.',
    ),

    h2('La méthode maria en 4 étapes'),
    paragraph('Sur les projets que nous cadrons, une méthode s’est stabilisée.'),
    paragraph(
      '**Étape 1 : cartographier les indicateurs réellement utilisés** (1 semaine). Nous listons les 5 à 10 indicateurs que vos décideurs regardent effectivement. Pas ceux qui figurent dans le tableau de bord actuel, ceux qui pèsent dans les décisions. Cette étape élimine 60 % du bruit en moyenne.',
    ),
    paragraph(
      '**Étape 2 : auditer les sources** (1 à 2 semaines). Pour chaque indicateur, nous identifions la source de vérité, la qualité des données, les éventuels nettoyages à prévoir. Le [CIGREF rappelle dans ses retours d’expérience 2026](https://www.cigref.fr/evaluer-le-retour-sur-investissement-des-solutions-dia-generative-et-agentique) que la valeur d’une IA appliquée au pilotage dépend directement de la qualité des données consommées. Cette étape n’est pas facultative.',
    ),
    paragraph(
      '**Étape 3 : construire un tableau de bord pilote** (2 à 4 semaines). Nous connectons 1 à 3 sources, nous construisons un premier tableau de bord sur un périmètre borné, nous le livrons à un utilisateur réel pour test. Les ajustements se font sur ces premières semaines, pas plus tard.',
    ),
    paragraph(
      '**Étape 4 : étendre progressivement** (4 à 8 semaines). Une fois le pilote validé, nous ajoutons les sources complémentaires, nous affinons les indicateurs, nous formons les utilisateurs. Le tableau de bord devient un outil quotidien.',
    ),
    avisMaria({
      texte:
        'La mode pousse à migrer d’Excel vers un outil BI dédié, Power BI ou Tableau en tête. Notre conviction est inverse. Le vrai sujet n’est pas de changer d’interface, c’est d’automatiser la chaîne qui va de vos sources à vos décideurs. Vos équipes peuvent continuer à utiliser Excel pour leurs analyses fines. Le tableau de bord IA prend en charge la consolidation et la mise à jour. Les deux cohabitent.',
      signature: 'Mathieu HERNANDEZ',
    }),

    h2('Combien ça coûte et combien de temps ça prend'),
    paragraph('Sur les projets que nous accompagnons, les fourchettes sont les suivantes.'),
    paragraph(
      '**Palier 1 : connecteurs packagés** (5 000 à 15 000 euros par an). Outils type Metabase, Looker Studio, avec intégrations standard. Adapté à des sources simples et peu nombreuses. Mise en place en 3 à 6 semaines.',
    ),
    paragraph(
      '**Palier 2 : tableau de bord semi-personnalisé** (15 000 à 30 000 euros de setup + exploitation). Combinaison de briques existantes avec personnalisation des connecteurs et des indicateurs. Mise en place en 6 à 10 semaines.',
    ),
    paragraph(
      '**Palier 3 : solution sur-mesure** (25 000 à 60 000 euros de développement). Développement dédié combinant plusieurs sources complexes, interrogation en langage naturel, règles métier spécifiques. Mise en place en 8 à 14 semaines.',
    ),
    warning(
      'Point de vigilance',
      'Le coût caché de ce type de projet n’est pas l’outil, c’est l’accompagnement au changement. Comptez 20 à 30 % de budget supplémentaire pour former les équipes et adapter les rituels de pilotage. Sans cet investissement, le tableau de bord existe mais personne ne l’utilise.',
    ),
    inArticleCta({
      titre: 'Cadrer votre tableau de bord dynamique',
      description:
        '30 minutes pour poser les bons indicateurs, estimer le budget réel et prioriser la connexion de vos sources critiques.',
      lienLibelle: 'En savoir plus →',
      lienHref: '/besoins/vision-claire-donnees-metier',
      variant: 'yellow',
    }),
    quoteAttribuee({
      texte:
        'Les projets qui produisent de la valeur ne sont pas ceux qui remplacent tout d’un coup. Ce sont ceux qui démarrent sur trois indicateurs essentiels, avec un utilisateur convaincu, et qui s’étendent ensuite au rythme de l’adoption réelle.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer'),
    paragraph(
      'Si vous vous reconnaissez dans ce qui précède, voici l’ordre d’action que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1** : lister les 3 décisions majeures prises chaque mois dans votre entreprise et les chiffres qui devraient les éclairer.',
    ),
    paragraph(
      '**Semaine 2** : auditer où ces chiffres se trouvent aujourd’hui et combien de temps leur consolidation prend.',
    ),
    paragraph(
      '**Semaine 3** : identifier un porteur côté métier, pas IT.',
    ),
    paragraph(
      '**Semaine 4** : consulter deux ou trois prestataires sur ce cadrage précis.',
    ),
    paragraph(
      'À l’issue de ce mois, vous saurez si l’automatisation vaut l’investissement pour votre contexte, et sur quel périmètre démarrer.',
    ),
    paragraph(
      'Pour l’angle complémentaire sur la cohabitation Excel / tableau de bord IA et la conduite du changement avec vos contrôleurs de gestion, voir notre article [Tableaux Excel vs tableau de bord IA : comment basculer sans tout casser](/blog/excel-vs-tableau-bord-ia-basculer-sans-casser). Pour une vue d’ensemble, voir aussi la page [Avoir une vision claire sur mes données métier](/besoins/vision-claire-donnees-metier).',
    ),

    h2('En résumé'),
    paragraph(
      'Le passage d’Excel à un tableau de bord dynamique alimenté par IA n’est pas un projet de remplacement, c’est un projet d’automatisation de la chaîne de pilotage. Le gain principal se mesure en temps libéré pour les équipes de contrôle de gestion et en fraîcheur des indicateurs mis à disposition des décideurs. Les budgets vont de 5 000 à 60 000 euros par an selon le palier, les délais réalistes de 4 à 14 semaines. Le facteur de réussite n’est pas l’outil choisi, c’est la précision des indicateurs sélectionnés et l’accompagnement des utilisateurs qui les consulteront.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Faut-il abandonner Excel pour utiliser un tableau de bord IA ?',
      reponse:
        'Non. Excel reste excellent pour les analyses fines et les simulations ponctuelles. Le tableau de bord IA prend en charge la consolidation et la mise à jour automatique des indicateurs clés. Les deux cohabitent sans friction.',
    },
    {
      _key: 'faq-2',
      question: 'Combien de sources peut-on connecter ?',
      reponse:
        'Techniquement, pas de limite. En pratique, nous recommandons de démarrer avec 2 à 4 sources sur un premier pilote, puis d’étendre. Un projet qui connecte dix sources d’un coup échoue presque toujours.',
    },
    {
      _key: 'faq-3',
      question: 'Quels délais avant d’avoir un tableau de bord utilisable ?',
      reponse:
        'Sur un périmètre bien cadré, 4 à 8 semaines suffisent pour un premier tableau de bord en production. La généralisation à tous les indicateurs de l’entreprise demande 6 à 12 mois.',
    },
    {
      _key: 'faq-4',
      question: 'Nos données sont de qualité inégale, est-ce bloquant ?',
      reponse:
        'Non, mais cela doit être traité en amont. La phase d’audit des sources identifie les nettoyages nécessaires. Sur certains cas, cette étape dure plus longtemps que la construction du tableau de bord lui-même.',
    },
  ],

  sidebarCta: {
    titre: 'Automatiser votre pilotage ?',
    description: '30 minutes pour poser les bons indicateurs, cartographier vos sources et choisir le palier adapté à votre contexte.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'De l’Excel au tableau de bord IA : automatiser votre pilotage | maria',
    description:
      'Comment l’IA transforme vos Excel en tableau de bord dynamique. Méthode, budget, délais. Un guide pratique par maria, agence IA pour l’interne.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
