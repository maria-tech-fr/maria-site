/**
 * Seed de l'article « Alertes intelligentes par IA : repérer les problèmes
 * avant qu'ils coûtent cher »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — `auteur-matthieu-seiller`
 * en base.
 * Catégorie : Stratégie IA — `articleCategorie-strategie-ia`.
 * Featured : false.
 *
 * Pattern paire SEILLER / HERNANDEZ sur les alertes intelligentes (même CTA
 * /besoins/alertes-intelligentes) :
 *  - SEILLER (cet article) publié 2026-11-25 (angle stratégique, cadrage, 5
 *    signaux faibles à surveiller, paliers de budget)
 *  - HERNANDEZ publié 2026-12-01 (focus fatigue d'alerte, filtre IA, méthode
 *    de tri des notifications existantes) → /blog/trop-alertes-tuent-alerte-ia-tri
 *
 * Cross-link vers l'article HERNANDEZ juste après l'AVIS MARIA (qui parle de
 * « moins d'alertes mais mieux ciblées », angle direct d'HERNANDEZ).
 * Le lien retour est posé côté HERNANDEZ dans la section « Le filtre IA
 * bien calibré, un autre modèle », publié dans le même commit.
 *
 * Sources cliquables :
 *  - France Num 2025 : URL directe, citée (« Le Baromètre France Num 2025,
 *    mené par la DGE auprès de 11 021 TPE et PME ») → LIEN.
 *  - CIGREF 2026 ROI : URL directe, citée en Étape 4 de la méthode (« Le
 *    CIGREF rappelle dans ses retours d'expérience 2026… ») → LIEN.
 *
 * Lien éditorial vers /besoins/alertes-intelligentes ajouté dans le
 * paragraphe conclusif du « Par où commencer ».
 *
 * Choix éditoriaux :
 *  - DÉFINITION condensée de 499 → 364 chars (limite Sanity 400) sans perdre
 *    les trois rôles de l'IA (apprendre le normal, détecter, filtrer).
 *  - 4 semaines du « Par où commencer » reformatées en paragraphes séparés
 *    (**Semaine X**), pattern maria.
 *  - CITATION Matthieu SEILLER déplacée du tout début de « Par où commencer »
 *    vers la clôture de « Combien ça coûte » (option B, pattern Excel vs IA).
 *  - inArticleCta yellow ajouté après l'AVIS MARIA, libellé « En savoir plus
 *    → » (règle maria pour les inArticleCta vers /besoins/* et /services/*).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta.
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-alertes-intelligentes-reperer.mjs
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
  _id: 'article-alertes-intelligentes-ia-reperer-problemes-avant',
  _type: 'article',
  slug: { _type: 'slug', current: 'alertes-intelligentes-ia-reperer-problemes-avant' },
  titre: 'Alertes intelligentes par IA : repérer les problèmes avant qu’ils coûtent cher',
  sousTitre:
    'Un guide de cadrage pour installer un dispositif d’alertes IA utile, sans noyer vos équipes sous les notifications.',
  intro:
    'Dans la plupart des entreprises, les problèmes sont visibles dans les données bien avant d’être perçus par les équipes. Voici ce qu’un dispositif d’alertes intelligentes change concrètement.',
  publishedAt: '2026-11-25T09:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'La plupart des dérives (départs clients, baisses de marge, écarts projet) sont visibles dans les données plusieurs semaines avant d’être perçues par les équipes.',
    'Un dispositif d’alertes intelligentes surveille en continu ces signaux faibles et envoie des notifications ciblées, sans noyer les destinataires.',
    'Sur les projets que nous accompagnons chez maria, comptez 4 à 8 semaines pour un premier dispositif opérationnel, selon le périmètre.',
    'Les budgets vont de 8 000 à 50 000 euros selon le palier, hors accompagnement.',
    'Le facteur de réussite n’est pas l’algorithme, c’est la précision des seuils et la qualité des destinataires choisis pour chaque alerte.',
  ],

  body: [
    h2('Pourquoi vos problèmes se révèlent toujours trop tard'),
    paragraph(
      'Dans la plupart des entreprises que nous auditons chez maria, un schéma revient. Un client important se désengage progressivement. Les signaux étaient là : factures payées plus lentement, baisse du nombre de commandes, questions moins fréquentes au service client. Personne ne les a connectés. Trois mois plus tard, le client part, et la perte apparaît dans le reporting commercial.',
    ),
    paragraph(
      'Cette scène se rejoue sur tous les sujets. Une dérive de marge sur une ligne produit, une baisse de cadence sur un atelier, un écart budgétaire sur un projet. Les données existent, le problème est visible mathématiquement. Mais personne ne surveille en continu, et l’alerte arrive au bilan mensuel ou trimestriel, quand la correction coûte dix fois plus cher.',
    ),
    paragraph(
      'Le [Baromètre France Num 2025](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le), mené par la Direction générale des Entreprises auprès de 11 021 TPE et PME françaises, montre que 26 % des entreprises françaises utilisent désormais l’IA, mais peu l’appliquent à la surveillance continue. L’usage dominant reste la génération de contenu. La détection proactive, qui est pourtant un des cas d’usage à ROI le plus rapide, est largement sous-exploitée.',
    ),
    callout(
      'À retenir',
      'Le vrai coût d’un problème détecté trop tard n’est pas le problème lui-même. C’est le temps passé en mode pompier à le résoudre, et les décisions prises dans l’urgence qui en découlent. Un dispositif d’alertes intelligentes transforme ce mode réactif en mode anticipatif.',
    ),

    h2('Qu’est-ce qu’une alerte intelligente, concrètement ?'),
    definition(
      'Alerte intelligente',
      'Notification générée automatiquement par un dispositif qui surveille en continu vos données métier, détecte un écart par rapport au comportement attendu, qualifie le signal (gravité, contexte, acteurs), et le transmet à la bonne personne avec les éléments pour décider. L’IA joue trois rôles : apprendre le normal, détecter les écarts, filtrer le bruit.',
    ),
    paragraph(
      'Trois différences majeures la distinguent d’une alerte classique. D’abord, elle apprend votre normal. Une baisse de 10 % du pipeline commercial en août n’est pas anormale, mais la même baisse en mars l’est. Une alerte statique ne fait pas cette différence, une alerte intelligente oui. Ensuite, elle qualifie le signal. L’alerte n’arrive pas seule, elle vient avec son contexte : historique, comparaison, hypothèses possibles. Enfin, elle est destinée à une personne précise, avec un pouvoir d’action sur le sujet, pas à une liste de distribution générique.',
    ),

    h2('Les 5 signaux faibles à surveiller en priorité'),
    paragraph(
      'Sur les projets que nous cadrons chez maria, cinq familles ressortent systématiquement comme les plus rentables pour un premier dispositif.',
    ),
    tableau({
      enTetes: ['Signal', 'Ce qu’il annonce', 'Délai d’anticipation typique'],
      lignes: [
        ['Ralentissement du pipeline commercial par segment', 'Baisse de CA 2 à 3 mois plus tard', '6 à 10 semaines'],
        ['Dégradation du délai de paiement d’un client', 'Risque de perte ou de litige', '4 à 8 semaines'],
        ['Dérive de marge sur une ligne produit', 'Problème fournisseur ou pricing', '2 à 4 semaines'],
        ['Baisse de cadence atelier ou de productivité équipe', 'Problème opérationnel ou RH', '2 à 6 semaines'],
        ['Hausse anormale des tickets support sur un sujet', 'Bug produit ou incompréhension marché', '1 à 3 semaines'],
      ],
    }),
    paragraph(
      'Ces cinq signaux ont un point commun : ils sont mathématiquement visibles dans les données que vous collectez déjà. L’enjeu n’est pas de collecter plus, c’est d’exploiter ce qui existe.',
    ),

    h2('La méthode maria en 4 étapes'),
    paragraph(
      '**Étape 1 : identifier les 3 risques les plus coûteux** (1 semaine). Nous listons avec vos équipes les trois dérives qui auraient le plus d’impact si elles passaient inaperçues. Cette hiérarchisation évite de vouloir tout surveiller d’un coup.',
    ),
    paragraph(
      '**Étape 2 : cartographier les données qui annoncent ces risques** (1 à 2 semaines). Pour chaque risque, nous identifions les variables qui le précèdent dans les données existantes. Si les données sont incomplètes ou dispersées, la phase de consolidation s’impose en amont.',
    ),
    paragraph(
      '**Étape 3 : calibrer les seuils et le destinataire de chaque alerte** (2 à 3 semaines). C’est l’étape la plus sous-estimée. Un seuil trop sensible crée du bruit, un seuil trop lâche rate le signal. Chaque alerte est testée sur l’historique pour mesurer son taux de vrais positifs et de faux positifs avant mise en production.',
    ),
    paragraph(
      '**Étape 4 : mise en production avec ajustement continu** (3 à 4 semaines). Le dispositif tourne sur un périmètre pilote, les destinataires remontent les faux positifs et les manques, les seuils s’ajustent. Le [CIGREF rappelle dans ses retours d’expérience 2026](https://www.cigref.fr/evaluer-le-retour-sur-investissement-des-solutions-dia-generative-et-agentique) qu’un dispositif IA de surveillance utile se construit par itérations, pas par un paramétrage initial parfait.',
    ),
    avisMaria({
      texte:
        'La mode pousse à multiplier les tableaux de bord et les notifications, dans l’espoir que la masse d’information fera émerger les problèmes. Notre conviction est inverse. Un dispositif qui envoie moins d’alertes mais mieux ciblées a plus de valeur qu’un dispositif qui notifie tout. Le vrai art est dans la sélection, pas dans l’exhaustivité.',
      signature: 'Matthieu SEILLER',
    }),
    paragraph(
      'Le travail de tri qui rend cette sélection possible (comment supprimer les alertes classiques qui ne servent plus, comment calibrer un filtre IA pour ne garder que l’utile) est traité en détail dans notre article compagnon [Trop d’alertes tuent l’alerte : comment l’IA fait enfin le tri](/blog/trop-alertes-tuent-alerte-ia-tri).',
    ),
    inArticleCta({
      titre: 'Installer un dispositif d’alertes intelligentes',
      description:
        '30 minutes pour prioriser les risques à surveiller, choisir le palier adapté et poser la gouvernance humaine des alertes.',
      lienLibelle: 'En savoir plus →',
      lienHref: '/besoins/alertes-intelligentes',
      variant: 'yellow',
    }),

    h2('Combien ça coûte et combien de temps ça prend'),
    paragraph('Trois paliers structurent le marché en 2026.'),
    paragraph(
      '**Palier 1 : règles métier enrichies** (8 000 à 20 000 euros par an). Surveillance par seuils et comparaisons simples, pas de machine learning avancé. Adapté aux cas où le comportement normal est stable et bien connu. Mise en place en 4 à 6 semaines.',
    ),
    paragraph(
      '**Palier 2 : détection d’anomalies statistique** (15 000 à 35 000 euros de setup + exploitation). Le dispositif apprend votre comportement normal et détecte les écarts significatifs. Adapté aux cas où le normal varie selon des saisonnalités. Mise en place en 6 à 10 semaines.',
    ),
    paragraph(
      '**Palier 3 : système sur-mesure avec qualification IA** (25 000 à 50 000 euros de développement + exploitation). Le dispositif détecte, qualifie, propose une action. Adapté aux cas où le volume d’alertes serait ingérable sans filtrage intelligent. Mise en place en 10 à 14 semaines.',
    ),
    warning(
      'Point de vigilance',
      'Le coût caché de ce type de projet n’est pas l’outil, c’est la gouvernance des alertes. Qui reçoit quoi, qui a l’autorité d’agir, qui remonte les faux positifs. Sans ce cadre humain défini en amont, le dispositif le mieux conçu produit des alertes que personne ne traite.',
    ),
    quoteAttribuee({
      texte:
        'Les dispositifs qui réussissent sont ceux qui démarrent sur un seul risque, le plus coûteux, avec une seule personne qui recevra l’alerte et qui aura l’autorité d’agir. Le reste vient après, à mesure que la confiance s’installe.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Par où commencer'),
    paragraph('Si vous envisagez ce type de projet, voici l’ordre d’action.'),
    paragraph(
      '**Semaine 1** : identifier les trois dérives qui vous ont le plus coûté ces 18 derniers mois.',
    ),
    paragraph(
      '**Semaine 2** : auditer les données disponibles qui auraient pu annoncer ces dérives.',
    ),
    paragraph(
      '**Semaine 3** : choisir un risque pilote et désigner une personne responsable des alertes correspondantes.',
    ),
    paragraph(
      '**Semaine 4** : consulter deux ou trois prestataires sur ce cadrage précis.',
    ),
    paragraph(
      'À l’issue de ce mois, vous saurez si un dispositif d’alertes intelligentes a du sens pour votre contexte, et sur quel périmètre démarrer sans surdimensionner. Pour une vue d’ensemble de la façon dont maria aborde ce type de projet, voir la page [Anticiper plutôt que subir (alertes intelligentes)](/besoins/alertes-intelligentes).',
    ),

    h2('En résumé'),
    paragraph(
      'Un dispositif d’alertes intelligentes transforme un pilotage réactif en pilotage anticipatif. Les signaux faibles existent dans vos données, l’enjeu est de les repérer avant que le problème ne devienne visible. La méthode qui marche : commencer par le risque le plus coûteux, calibrer précisément les seuils, choisir une personne responsable par alerte. Les budgets vont de 8 000 à 50 000 euros selon le palier, les délais réalistes de 4 à 14 semaines. Le facteur de réussite n’est jamais l’algorithme, c’est la gouvernance humaine autour des alertes.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Faut-il déjà avoir un tableau de bord pour mettre en place des alertes IA ?',
      reponse:
        'Pas nécessairement. Un dispositif d’alertes peut se brancher directement sur les sources de données, sans passer par un tableau de bord. Les deux sont complémentaires mais indépendants.',
    },
    {
      _key: 'faq-2',
      question: 'Combien d’alertes faut-il viser par semaine ?',
      reponse:
        'Sur les dispositifs bien calibrés, chaque destinataire reçoit entre 2 et 10 alertes par semaine, selon son périmètre. Au-delà, le dispositif est mal réglé et les alertes seront ignorées.',
    },
    {
      _key: 'faq-3',
      question: 'L’IA peut-elle décider à la place des humains ?',
      reponse:
        'Non, et ce n’est pas l’objectif. L’IA détecte, qualifie et informe. La décision reste humaine, parce qu’elle engage l’entreprise et parce que le contexte complet n’est jamais dans les données.',
    },
    {
      _key: 'faq-4',
      question: 'Peut-on démarrer sans data scientist interne ?',
      reponse:
        'Oui, sur les paliers 1 et 2. Sur le palier 3, un partenaire qui prend la responsabilité du dispositif sur la durée est recommandé.',
    },
  ],

  sidebarCta: {
    titre: 'Anticiper plutôt que subir ?',
    description: '30 minutes pour prioriser les risques à surveiller, choisir le palier adapté et poser la gouvernance humaine des alertes.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Alertes intelligentes par IA : anticiper les problèmes | maria',
    description:
      'Comment installer un dispositif d’alertes IA sur vos données métier. Méthode, budget, délais. Un guide pratique par maria, agence IA pour l’interne.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
