/**
 * Seed de l'article « Tableaux Excel vs tableau de bord IA : comment basculer
 * sans tout casser »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — `auteur-matthieu-seiller`
 * en base.
 * Catégorie : Stratégie IA — `articleCategorie-strategie-ia`.
 * Featured : false.
 *
 * Pattern paire HERNANDEZ / SEILLER sur le pilotage Excel ↔ IA (même CTA
 * /besoins/vision-claire-donnees-metier) :
 *  - HERNANDEZ publié 2026-10-26 (méthode opérationnelle, 4 étapes, paliers de
 *    budget) → /blog/excel-tableau-bord-dynamique-ia-automatiser-pilotage
 *  - SEILLER (cet article) publié 2026-11-04 (angle stratégique, cohabitation
 *    des outils, 4 pièges, conduite du changement)
 *
 * Cross-links bidirectionnels :
 *  - Cet article renvoie vers l'article HERNANDEZ dans la section « La bonne
 *    stratégie : cohabitation plutôt que remplacement » (moment méthode).
 *  - L'article HERNANDEZ renvoie vers cet article dans la section « Par où
 *    commencer » (moment conduite du changement). Son seed est re-exécuté
 *    pour propager le lien retour.
 *
 * Lien éditorial vers la page besoin /besoins/vision-claire-donnees-metier :
 *  - Ajouté dans « Par où commencer sans brusquer » (en plus du CTA sidebar
 *    et de l'inArticleCta).
 *
 * Sources cliquables :
 *  - CIGREF 2024 : URL directe, citée dans le corps (« le CIGREF l'observe
 *    dans ses retours d'expérience 2024 ») → LIEN.
 *  - France Num : URL directe mais non citée dans le corps → pas de lien.
 *
 * Choix éditoriaux :
 *  - 4 semaines du « Par où commencer » reformatées en paragraphes séparés
 *    (**Semaine X**), pattern maria habituel.
 *  - CITATION Matthieu SEILLER déplacée du tout début de « Comment embarquer
 *    les équipes… » vers la clôture des « 4 pièges de la bascule brutale »
 *    (option B, cohérent avec le choix appliqué à l'article HERNANDEZ).
 *  - inArticleCta yellow ajouté après le TABLEAU comparatif Excel vs tableau
 *    de bord IA (moment choix / décision), libellé « En savoir plus → »
 *    (règle maria pour les inArticleCta vers /besoins/* et /services/*).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-excel-vs-tableau-bord-ia.mjs
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
  _id: 'article-excel-vs-tableau-bord-ia-basculer-sans-casser',
  _type: 'article',
  slug: { _type: 'slug', current: 'excel-vs-tableau-bord-ia-basculer-sans-casser' },
  titre: 'Tableaux Excel vs tableau de bord IA : comment basculer sans tout casser',
  sousTitre:
    'Remplacer Excel par un tableau de bord IA est rarement la bonne approche. Voici comment faire cohabiter les deux, sans brusquer vos équipes.',
  intro:
    'La plupart des projets qui promettent la fin d’Excel finissent par créer un double emploi coûteux. Voici la vraie question : comment faire cohabiter Excel et un tableau de bord IA.',
  publishedAt: '2026-11-04T09:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'Remplacer Excel par un tableau de bord IA n’est presque jamais la bonne stratégie. Les deux outils servent des usages différents.',
    'Un tableau de bord IA est fait pour la consolidation et le suivi d’indicateurs clés. Excel reste meilleur pour les analyses fines, les simulations et les besoins ponctuels.',
    'La cohabitation réussie repose sur une règle simple : automatiser la donnée partagée, laisser Excel aux analystes.',
    'Les projets qui tentent la bascule brutale créent trois mois de confusion, suivis d’un retour partiel à Excel.',
    'La conduite du changement pèse autant que le choix technique dans la réussite du projet.',
  ],

  body: [
    h2('Pourquoi tant de projets « fin d’Excel » échouent'),
    paragraph(
      'Dans les projets que nous auditons chez maria, un scénario revient souvent. Une direction décide de passer à un tableau de bord moderne, l’outil est mis en place, Excel est officiellement remplacé. Trois mois plus tard, les équipes utilisent les deux. Six mois plus tard, Excel a repris la main.',
    ),
    paragraph(
      'Ce n’est pas un échec de l’outil, c’est un échec de cadrage. Le [CIGREF l’observe dans ses retours d’expérience 2024](https://www.cigref.fr/lia-en-entreprise-retours-dexperience-et-bonnes-pratiques) : « Les collaborateurs plébiscitent une intégration des IA génératives mais craignent pour leur travail. » Cette ambivalence s’applique aussi au pilotage. Un contrôleur de gestion qui travaille dans Excel depuis quinze ans n’adoptera pas un nouvel outil parce qu’on le lui impose. Il l’adoptera s’il y voit un bénéfice personnel.',
    ),
    callout(
      'À retenir',
      'Le vrai sujet n’est pas Excel contre tableau de bord IA. C’est la répartition des usages entre les deux. Un projet qui cherche à tout remplacer échoue presque toujours. Un projet qui définit clairement qui fait quoi réussit presque toujours.',
    ),

    h2('Excel vs tableau de bord IA : le comparatif factuel'),
    paragraph(
      'Pour cadrer honnêtement un projet, il faut comparer ce qui est comparable.',
    ),
    tableau({
      enTetes: ['Critère', 'Excel', 'Tableau de bord IA'],
      lignes: [
        ['Mise à jour automatique', 'Non', 'Oui'],
        ['Analyse fine ad hoc', 'Excellent', 'Limité'],
        ['Consolidation multi-sources', 'Manuelle, longue', 'Automatique'],
        ['Simulation et scénarios', 'Excellent', 'Limité'],
        ['Interrogation en langage naturel', 'Non', 'Oui'],
        ['Partage et droits d’accès', 'Fragile', 'Natif'],
        ['Historisation automatique', 'Non', 'Oui'],
        ['Coût d’usage', 'Très faible', 'Moyen à élevé'],
        ['Formation nécessaire', 'Faible (maîtrise diffuse)', 'Moyenne'],
        ['Résilience en cas de bug', 'Analyste répare seul', 'Dépendance au prestataire'],
      ],
    }),
    paragraph(
      'Ce comparatif n’est pas là pour désigner un gagnant. Il est là pour dire ce que chacun fait bien. Excel reste imbattable sur l’analyse fine et la simulation. Le tableau de bord IA domine sur la consolidation et la mise à jour continue.',
    ),
    inArticleCta({
      titre: 'Cadrer la cohabitation Excel + tableau de bord IA',
      description:
        '30 minutes pour poser la répartition des usages entre vos deux outils et éviter la bascule brutale.',
      lienLibelle: 'En savoir plus →',
      lienHref: '/besoins/vision-claire-donnees-metier',
      variant: 'yellow',
    }),

    h2('Les 3 cas où Excel reste meilleur'),
    paragraph(
      'Dans trois situations précises, Excel reste supérieur à un tableau de bord IA, et vouloir le remplacer est contre-productif.',
    ),
    paragraph(
      '**Les analyses ad hoc en fin de trimestre.** Un directeur commercial qui veut comprendre pourquoi le chiffre a décroché sur un segment précis a besoin de manipuler les données dans tous les sens. Excel permet cette manipulation en quelques minutes. Un tableau de bord figé ne le permet pas.',
    ),
    paragraph(
      '**Les simulations budgétaires.** Un contrôleur de gestion qui teste trois scénarios de prix sur l’année à venir a besoin de formules modifiables en direct. Excel reste l’outil naturel pour cet exercice.',
    ),
    paragraph(
      '**Les besoins ponctuels à faible enjeu.** Un fichier de suivi monté pour un projet de 6 mois ne justifie pas un tableau de bord IA. Excel suffit, et son coût de mise en place est nul.',
    ),
    warning(
      'Point de vigilance',
      'La tentation de tout basculer dans le tableau de bord IA est forte, surtout quand le projet a coûté cher. Elle est à combattre. Un tableau de bord IA mal utilisé pour une analyse ad hoc produit des résultats pauvres et déçoit les utilisateurs. Excel reste la meilleure réponse pour ces cas.',
    ),

    h2('La bonne stratégie : cohabitation plutôt que remplacement'),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, la règle de répartition s’est stabilisée.',
    ),
    paragraph(
      '**Le tableau de bord IA prend en charge.** Les indicateurs clés consultés régulièrement (CA, marge, pipeline, trésorerie, effectifs). La consolidation automatique des sources. La mise à jour continue. Les alertes sur écarts par rapport aux objectifs. L’accès partagé avec gestion des droits.',
    ),
    paragraph(
      '**Excel conserve.** Les analyses fines ponctuelles. Les simulations budgétaires. Les modèles financiers complexes. Les besoins projets à durée limitée. Les manipulations ad hoc à la demande de la direction.',
    ),
    paragraph(
      'Cette répartition n’est pas théorique. Elle correspond à ce que chaque outil fait vraiment bien. Pour la méthode concrète de mise en place du tableau de bord IA (4 étapes, paliers de budget, délais), voir notre article [De l’Excel au tableau de bord dynamique : comment l’IA automatise votre pilotage](/blog/excel-tableau-bord-dynamique-ia-automatiser-pilotage).',
    ),
    avisMaria({
      texte:
        'La mode pousse à opposer Excel et tableau de bord IA, comme si l’un devait remplacer l’autre. Notre conviction est inverse. Ce sont deux outils complémentaires qui adressent des besoins différents. Le projet qui réussit n’est pas celui qui remplace, c’est celui qui répartit clairement les usages. Les contrôleurs de gestion continuent de piloter dans Excel pour leurs analyses, le tableau de bord IA sert le comité de direction et les managers opérationnels.',
      signature: 'Matthieu SEILLER',
    }),

    h2('Les 4 pièges de la bascule brutale'),
    paragraph('Sur les projets qui échouent, quatre erreurs reviennent.'),
    paragraph(
      '**Supprimer Excel sans alternative équivalente.** Les analyses fines doivent pouvoir continuer. Si le tableau de bord IA ne couvre pas ce besoin, les équipes ressortent les fichiers Excel en cachette.',
    ),
    paragraph(
      '**Former uniquement les décideurs.** Les équipes qui produisent les données doivent aussi être formées. Sans leur adhésion, la qualité des sources se dégrade et le tableau de bord devient faux.',
    ),
    paragraph(
      '**Confier le projet à l’IT seul.** Un tableau de bord IA utile est conçu avec les métiers. Un projet piloté uniquement par la DSI produit un outil techniquement correct et opérationnellement inutile.',
    ),
    paragraph(
      '**Vouloir tout automatiser dès le premier mois.** La bonne cadence est de 3 à 5 indicateurs en pilote, validation, puis extension progressive sur 6 à 12 mois. La bascule brutale crée systématiquement du rejet.',
    ),
    quoteAttribuee({
      texte:
        'Les contrôleurs de gestion ne défendent pas Excel par nostalgie. Ils le défendent parce qu’ils savent ce qu’il permet et ce qu’un outil nouveau risque de leur retirer. Un projet qui respecte cette compétence embarque les équipes. Un projet qui la méprise les perd.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Comment embarquer les équipes qui vivent dans Excel depuis 15 ans'),
    paragraph('Trois principes guident l’embarquement des équipes historiques.'),
    paragraph(
      'Premièrement, reconnaître la valeur de ce qui existe. Les fichiers Excel actuels contiennent du savoir métier accumulé sur des années. Ce savoir doit nourrir la conception du tableau de bord IA, pas être écarté.',
    ),
    paragraph(
      'Deuxièmement, associer les équipes aux choix d’indicateurs. Les contrôleurs de gestion savent quels chiffres pèsent vraiment. Leur avis prime sur celui d’un consultant extérieur.',
    ),
    paragraph(
      'Troisièmement, garantir qu’Excel reste disponible pour ce qu’il fait bien. Cette garantie désamorce 80 % des résistances.',
    ),

    h2('Par où commencer sans brusquer'),
    paragraph(
      'Si vous envisagez ce type de projet, voici l’ordre que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1** : identifier avec vos équipes ce qu’Excel fait bien et ce qui mérite d’être automatisé.',
    ),
    paragraph(
      '**Semaine 2** : définir la répartition cible entre les deux outils.',
    ),
    paragraph(
      '**Semaine 3** : choisir un périmètre pilote volontairement limité (3 à 5 indicateurs).',
    ),
    paragraph(
      '**Semaine 4** : lancer le pilote avec les équipes concernées, pas malgré elles.',
    ),
    paragraph(
      'Pour une vue d’ensemble de la façon dont maria aborde ce type de projet, voir la page [Avoir une vision claire sur mes données métier](/besoins/vision-claire-donnees-metier).',
    ),

    h2('En résumé'),
    paragraph(
      'Remplacer Excel par un tableau de bord IA n’est presque jamais la bonne stratégie. Les deux outils servent des usages différents et complémentaires. Le tableau de bord IA prend en charge la consolidation et le suivi des indicateurs clés partagés. Excel conserve les analyses fines, les simulations et les besoins ponctuels. Les projets qui réussissent sont ceux qui définissent clairement cette répartition dès le cadrage et qui embarquent les équipes historiques dans la conception. La conduite du changement pèse autant que le choix technique dans la réussite du projet.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Faut-il vraiment arrêter Excel à la fin du projet ?',
      reponse:
        'Non. Excel reste l’outil des analyses fines et des besoins ad hoc. Le tableau de bord IA prend en charge les indicateurs partagés en continu. Les deux cohabitent sur la durée.',
    },
    {
      _key: 'faq-2',
      question: 'Comment convaincre un contrôleur de gestion attaché à Excel ?',
      reponse:
        'En lui montrant qu’il ne perd rien et qu’il gagne du temps sur les tâches sans valeur. Les 3 à 5 jours mensuels de consolidation disparaissent, libérant du temps pour l’analyse qu’il aime vraiment faire.',
    },
    {
      _key: 'faq-3',
      question: 'Que fait-on des fichiers Excel existants une fois le tableau de bord en place ?',
      reponse:
        'Ils restent disponibles. Leur usage évolue naturellement : moins de consolidation, plus d’analyses ponctuelles. Certains fichiers deviennent obsolètes d’eux-mêmes, d’autres restent utilisés quotidiennement.',
    },
    {
      _key: 'faq-4',
      question: 'Combien de temps pour une cohabitation stabilisée ?',
      reponse:
        'Sur les projets bien menés, la répartition d’usage se stabilise en 3 à 6 mois. Les équipes savent intuitivement quel outil utiliser pour quel besoin.',
    },
  ],

  sidebarCta: {
    titre: 'Faire cohabiter Excel et IA ?',
    description: '30 minutes pour poser la répartition des usages, choisir le périmètre pilote et embarquer les équipes historiques.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Excel vs tableau de bord IA : basculer sans tout casser | maria',
    description:
      'Faut-il vraiment remplacer Excel par un tableau de bord IA ? Comparatif, pièges et méthode pour faire cohabiter les deux. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
