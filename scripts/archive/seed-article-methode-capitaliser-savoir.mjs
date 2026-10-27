/**
 * Seed de l'article « Départ de salariés : la méthode IA pour capitaliser le
 * savoir au fil de l'eau »
 *
 * Auteur : Mathieu HERNANDEZ (Directeur produit) — `auteur-equipe-maria` en
 * base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false.
 *
 * Pattern paire SEILLER / HERNANDEZ sur le départ d'experts (publiés le même
 * jour, 2026-10-27, même CTA /besoins/capitaliser-expertise-interne) :
 *  - SEILLER = enjeu stratégique, signaux de fuite, chiffres de perte
 *    (article /blog/depart-salarie-eviter-perte-savoir-ia)
 *  - HERNANDEZ (cet article) = méthode opérationnelle, 4 étapes, 7 outils,
 *    3 paliers de budget
 *
 * Cross-links bidirectionnels :
 *  - Cet article renvoie vers l'article SEILLER dans la section « Pourquoi
 *    vos tentatives passées ont échoué » (contexte stratégique).
 *  - L'article SEILLER renvoie vers cet article dans la section « Par où
 *    commencer avant le prochain départ » (méthode concrète). Son seed est
 *    re-exécuté pour propager le lien retour.
 *
 * Sources (frontmatter du brief) : CIGREF, DARES et France Num listées mais
 * jamais citées explicitement dans le corps → aucun lien cliquable intégré
 * (notre convention : on ne mentionne une source dans le body que si elle
 * est citée nominativement).
 *
 * Choix éditoriaux :
 *  - inArticleCta yellow ajouté après la section « Combien ça coûte »
 *    (moment budget / décision naturel).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-methode-capitaliser-savoir.mjs
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
  _id: 'article-depart-salaries-methode-ia-capitaliser-savoir',
  _type: 'article',
  slug: { _type: 'slug', current: 'depart-salaries-methode-ia-capitaliser-savoir' },
  titre: 'Départ de salariés : la méthode IA pour capitaliser le savoir au fil de l’eau',
  sousTitre:
    'Un guide opérationnel pour installer une capitalisation vivante du savoir, sans alourdir le quotidien de vos experts.',
  intro:
    'La capitalisation du savoir ne se fait pas au moment du départ. Elle se construit au fil des mois, par petits gestes intégrés au travail quotidien. Voici la méthode qui marche, les outils IA utiles et ceux qui ne servent à rien.',
  publishedAt: '2026-10-27T10:00:00.000Z',
  readingTime: 11,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Capitaliser le savoir ne consiste pas à documenter : documenter produit des pages mortes, capitaliser produit une ressource vivante que les équipes utilisent au quotidien.',
    'Sur les projets que nous accompagnons chez maria, les tentatives de capitalisation échouent presque toujours pour la même raison : elles reposent sur un effort supplémentaire demandé aux experts.',
    'La méthode qui marche inverse la logique : elle capte le savoir dans son usage normal (échanges, décisions, réponses) et le rend interrogeable, sans surcharge.',
    'Comptez 3 à 6 mois pour voir les premiers effets utiles, 12 à 18 mois pour un dispositif pleinement opérationnel. Les fourchettes de budget vont de 5 000 à 60 000 euros par an selon le palier.',
    'Trois conditions non négociables : un ancrage dans les outils du quotidien, une adhésion des experts eux-mêmes, un sponsor managérial engagé sur la durée.',
  ],

  body: [
    h2('Ce qu’on confond : capitaliser vs documenter'),
    paragraph(
      'La plupart des entreprises que nous auditons chez maria confondent deux gestes très différents. Documenter consiste à écrire des procédures, des modes opératoires, des guides. Capitaliser consiste à transformer l’expérience accumulée par les équipes en ressource réutilisable.',
    ),
    paragraph('Documenter produit des pages. Capitaliser produit un corpus vivant.'),
    paragraph('Documenter demande du temps dédié. Capitaliser se fait au fil de l’eau.'),
    paragraph(
      'Documenter est un acte volontaire, souvent perçu comme une charge. Capitaliser bien conçu est quasi invisible pour les contributeurs.',
    ),
    paragraph(
      'Documenter se consulte par ouverture de documents. Capitaliser se consulte par question posée en langage naturel.',
    ),
    paragraph('Documenter devient obsolète dès que la pratique évolue. Capitaliser évolue avec la pratique.'),
    paragraph(
      'Cette distinction n’est pas sémantique, elle est stratégique. Les entreprises qui réussissent à préserver leur savoir n’ont pas de meilleures procédures. Elles ont installé un dispositif de capitalisation qui tourne en continu, pendant que leurs experts travaillent, sans leur demander un effort supplémentaire.',
    ),
    callout(
      'À retenir',
      'Si votre projet de capitalisation du savoir demande à vos experts « 15 minutes par jour pour documenter leur travail », il échouera. Pas parce que les experts sont de mauvaise volonté, mais parce que ce temps n’existe jamais vraiment. La bonne méthode ne demande rien de plus, elle capte ce qui se produit déjà.',
    ),

    h2('Pourquoi vos tentatives passées ont échoué'),
    paragraph(
      'Si vous travaillez dans une entreprise de plus de 30 personnes, il y a de fortes chances qu’un projet de « base de connaissance interne » ait déjà été lancé, puis se soit étiolé. Les causes reviennent toujours. Les enjeux stratégiques derrière ces départs, et le coût caché qu’ils représentent pour l’entreprise, sont traités en profondeur dans notre article [Départ d’un salarié : comment éviter la perte de savoir avec l’IA](/blog/depart-salarie-eviter-perte-savoir-ia).',
    ),
    paragraph(
      '**La contribution est perçue comme une charge supplémentaire.** On demande aux experts de « prendre le temps » de documenter, de « contribuer régulièrement », de « mettre à jour les pages ». Chaque geste est perçu comme une sortie du travail réel. Au bout de six mois, les contributions ont cessé.',
    ),
    paragraph(
      '**L’outil est séparé du travail quotidien.** Un wiki ouvert dans un onglet dédié, consulté une fois tous les trois mois, n’entre jamais dans la routine. Il devient une archive silencieuse plutôt qu’une ressource vivante.',
    ),
    paragraph(
      '**La consultation est pénible.** Trouver une information dans un wiki de 500 pages mal structuré demande plus de temps que de poser directement la question à un collègue. Résultat : les équipes continuent de solliciter les experts, ce qui annule le bénéfice attendu de la capitalisation.',
    ),
    paragraph(
      '**Il n’y a pas de boucle de rétroaction.** Les équipes ne voient jamais comment leur contribution a été utilisée, ni par qui. Rien ne vient renforcer le geste de contribuer. L’effort s’épuise.',
    ),
    paragraph(
      '**Le dispositif n’est pas gouverné.** Personne n’a la responsabilité de maintenir le corpus, de valider ce qui entre, de retirer ce qui est obsolète. Au bout d’un an, le wiki contient autant d’informations fausses que vraies, ce qui le disqualifie.',
    ),
    paragraph(
      'Ces cinq causes se renforcent entre elles. Elles produisent le même résultat : un projet qui a l’air sérieux au lancement et qui s’évapore sans décision formelle.',
    ),
    warning(
      'Point de vigilance',
      'Avant de lancer un nouveau projet de capitalisation, prenez le temps d’analyser pourquoi les précédents n’ont pas tenu. Les mêmes causes produisent les mêmes effets. Un bon cadrage adresse ces cinq points explicitement, pas par la bonne volonté.',
    ),

    h2('Qu’est-ce qu’une capitalisation vivante, concrètement'),
    paragraph(
      'Une capitalisation vivante repose sur trois principes qui définissent le dispositif à construire.',
    ),
    definition(
      'Capitalisation vivante du savoir',
      'Une capitalisation vivante du savoir est un dispositif qui capte en continu les échanges et décisions d’une organisation, les structure dans un corpus interrogeable par IA, et le rend accessible aux équipes dans les outils qu’elles utilisent déjà. Elle ne repose pas sur une contribution dédiée des experts, mais sur une transformation des interactions normales en matière réutilisable.',
    ),
    paragraph(
      '**Principe 1 : captation implicite plutôt que contribution explicite.** Au lieu de demander aux experts d’écrire, on capte ce qui se produit déjà. Un échange sur Slack ou Teams, une décision prise en réunion, une réponse donnée à un collègue, un commentaire laissé sur un ticket. Chaque interaction, moyennant une sélection intelligente, peut devenir une brique de savoir. Le travail des outils IA est de faire ce tri et cette mise en forme.',
    ),
    paragraph(
      '**Principe 2 : interrogation naturelle plutôt que navigation documentaire.** Le corpus n’est pas organisé en pages à parcourir, mais en passages à retrouver. L’utilisateur pose la question qu’il se poserait à un collègue (comment on gère tel cas, pourquoi on a décidé cela, qui connaît tel sujet) et le dispositif remonte les éléments pertinents, en citant leurs sources.',
    ),
    paragraph(
      '**Principe 3 : ancrage dans les outils du quotidien.** Le dispositif ne vit pas dans un onglet séparé. Il est intégré à Slack, Teams, à l’intranet, à la messagerie, aux outils métier déjà utilisés. L’interrogation se fait là où le travail se fait, sans friction d’accès.',
    ),
    paragraph(
      'Ces trois principes transforment la nature du projet. Il ne s’agit plus de « créer une base de connaissance » mais de « rendre interrogeable ce qui se produit déjà dans l’entreprise ».',
    ),

    h2('La méthode maria en 4 étapes'),
    paragraph(
      'Sur les projets de capitalisation que nous cadrons chez maria, une méthode s’est stabilisée en quatre étapes. Elle permet d’arriver à un premier dispositif utile en 10 à 16 semaines selon les contextes.',
    ),

    h3('Étape 1 : Cartographier les sources de savoir à capter (2 à 3 semaines)'),
    paragraph(
      'Avant tout choix d’outil, on identifie où le savoir se produit dans l’entreprise. Les échanges par messagerie professionnelle, les tickets dans l’outil de support, les comptes rendus de réunion, les emails internes, les documents partagés, les commentaires sur les projets. Ce diagnostic révèle les gisements réels.',
    ),
    paragraph(
      'Pour chaque source, on évalue trois critères : la densité de savoir contenue, la facilité d’accès technique pour l’IA, la sensibilité des données. Le livrable est une carte priorisée des sources à intégrer en premier.',
    ),

    h3('Étape 2 : Choisir les cas d’usage pilotes (1 à 2 semaines)'),
    paragraph(
      'On ne lance pas une capitalisation générale. On choisit deux ou trois cas d’usage concrets qui serviront de pilote : par exemple, capter le savoir du service client sur un segment de clientèle précis, ou le savoir d’une équipe projet sur une méthode qu’elle a stabilisée.',
    ),
    paragraph(
      'Les critères de choix du pilote : un gisement de savoir réel, un sponsor interne motivé, un bénéfice mesurable rapidement, une sensibilité des données gérable.',
    ),

    h3('Étape 3 : Construire le dispositif technique (3 à 5 semaines)'),
    paragraph(
      'Le dispositif combine typiquement trois briques : une couche de captation qui lit les sources choisies, un corpus structuré (base vectorielle, index sémantique) qui stocke les éléments, une interface d’interrogation ancrée dans les outils du quotidien (bot Slack, extension navigateur, intégration intranet).',
    ),
    paragraph(
      'Le choix des briques dépend du palier de solution retenu et de la sensibilité des données. Les critères techniques (hébergement, souveraineté, gestion des droits) doivent être posés avant le choix de l’outil.',
    ),

    h3('Étape 4 : Lancer le pilote et mesurer (4 à 6 semaines)'),
    paragraph(
      'Le pilote tourne sur les cas d’usage choisis, avec les utilisateurs cibles. Les indicateurs à suivre : nombre de requêtes par utilisateur et par semaine, taux de réponses jugées utiles, temps gagné estimé par les utilisateurs, qualité du corpus perçue par les experts dont les contributions sont captées.',
    ),
    paragraph(
      'L’objectif n’est pas de prouver que le dispositif fonctionne dans l’absolu. C’est de valider qu’il produit de la valeur sur les cas précis choisis, dans votre contexte, avec vos sources, pour vos utilisateurs.',
    ),
    avisMaria({
      texte:
        'La mode consiste à proposer un entretien de capitalisation au moment du départ, parfois avec un outil IA pour « capturer » le savoir en quelques heures. Notre conviction est inverse. Le savoir ne se laisse pas extraire sur commande. Il se capte au fil de l’eau, pendant des mois, dans son usage réel. Un dispositif installé un an avant un départ vaut cent entretiens de sortie bien menés.',
      signature: 'Mathieu HERNANDEZ',
    }),

    h2('Les 5 outils IA utiles (et ceux qui ne servent à rien)'),
    paragraph(
      'Le marché propose en 2026 plusieurs catégories d’outils pour la capitalisation. Toutes ne sont pas pertinentes selon votre contexte.',
    ),
    tableau({
      enTetes: ['Catégorie d’outil', 'Utilité réelle', 'À quelle condition'],
      lignes: [
        ['Transcription automatique de réunions', 'Forte', 'Si les réunions clés sont régulièrement enregistrées avec consentement'],
        ['Bot conversationnel sur base documentaire (RAG)', 'Forte', 'Si la base documentaire est propre et maintenue'],
        ['Captation Slack/Teams par connecteurs', 'Forte', 'Si la messagerie est le canal principal des échanges métier'],
        ['Résumé automatique de tickets support', 'Forte', 'Si le support est un gisement de savoir client'],
        ['Outil de prise de notes IA pour entretiens d’expert', 'Moyenne', 'Utile en complément, pas comme pierre angulaire'],
        ['Génération automatique de documentation à partir de code', 'Faible', 'Ne capture que l’explicite, pas le savoir de décision'],
        ['Outils de « capture du savoir » vendus en entretien de sortie', 'Très faible', 'Mauvais moment, mauvaise méthode'],
      ],
    }),
    paragraph(
      'Les quatre premières catégories forment le socle d’un dispositif sérieux. Les suivantes sont des compléments ou des fausses bonnes idées.',
    ),
    paragraph(
      'Le choix dépend de votre contexte. Une entreprise industrielle avec de nombreuses réunions techniques privilégiera la transcription. Un service B2B dont la relation client passe par le support privilégiera la captation tickets. Un cabinet de conseil dont la matière vive est dans les échanges écrits privilégiera la captation Slack ou Teams.',
    ),

    h2('Combien ça coûte et combien ça prend de temps'),
    paragraph('Les fourchettes que nous constatons sur les projets que nous accompagnons chez maria.'),

    h3('Palier 1 : Dispositif packagé (300 à 1 500 euros par mois)'),
    paragraph(
      'Solutions type Notion AI, Mem, Guru, intégrés à vos outils existants. Adapté aux structures de moins de 50 personnes avec des processus simples et une documentation déjà en bon état.',
    ),
    paragraph('**Coût annuel typique** : 5 000 à 20 000 euros tout compris pour une PME.'),
    paragraph('**Délai de mise en place** : 4 à 8 semaines.'),

    h3('Palier 2 : Dispositif semi-personnalisé (10 000 à 30 000 euros de setup)'),
    paragraph(
      'Combinaison de briques existantes (LLM via API, vector store, connecteurs) assemblées pour votre contexte. Intégration aux outils du quotidien, personnalisation du périmètre capté.',
    ),
    paragraph('**Coût annuel typique** : 15 000 à 40 000 euros tout compris.'),
    paragraph('**Délai de mise en place** : 10 à 14 semaines.'),

    h3('Palier 3 : Dispositif sur-mesure (25 000 à 60 000 euros de développement)'),
    paragraph(
      'Développement dédié combinant plusieurs sources (messagerie, documents, tickets, réunions), intégration profonde avec vos outils, hébergement souverain. Palier recommandé quand le savoir à préserver est stratégique ou que les contraintes de confidentialité sont fortes.',
    ),
    paragraph('**Coût annuel typique** : 40 000 à 80 000 euros tout compris.'),
    paragraph('**Délai de mise en place** : 14 à 20 semaines pour la première version.'),
    callout(
      'À retenir',
      'Le coût invisible du projet est l’accompagnement au changement et la gouvernance du corpus. Comptez 30 à 40 % de budget supplémentaire pour la formation des équipes, l’animation du dispositif, le pilotage de la qualité du corpus. Sans ce budget, le dispositif technique tourne mais ne produit pas de valeur réelle.',
    ),
    inArticleCta({
      titre: 'Choisir le bon palier pour votre contexte',
      description:
        '30 minutes pour cadrer le périmètre, estimer le budget réel et poser la gouvernance du corpus adaptée à votre organisation.',
      lienLibelle: 'Voir comment maria conçoit ces dispositifs →',
      lienHref: '/besoins/capitaliser-expertise-interne',
      variant: 'yellow',
    }),

    h2('Les 3 conditions non négociables pour que ça marche'),
    paragraph('Trois conditions reviennent sur tous les projets qui réussissent.'),
    paragraph(
      '**Condition 1 : un ancrage dans les outils du quotidien.** Le dispositif doit être accessible depuis Slack, Teams, l’intranet, les outils métier. Un outil séparé auquel il faut se connecter spécifiquement ne sera pas utilisé plus de trois mois. Chaque friction d’accès détruit l’usage.',
    ),
    paragraph(
      '**Condition 2 : une adhésion des experts dont le savoir est capté.** Si vos experts perçoivent le dispositif comme une surveillance ou une dévaluation de leur rôle, ils en détourneront l’usage. Ils doivent y voir un bénéfice pour eux-mêmes : moins d’interruptions, meilleure traçabilité de leurs décisions, reconnaissance de leur expertise dans l’organisation. Cette adhésion se construit par la transparence (ils savent ce qui est capté) et par la participation (ils ont leur mot à dire sur ce qui entre dans le corpus).',
    ),
    paragraph(
      '**Condition 3 : un sponsor managérial engagé sur la durée.** Un projet de capitalisation produit sa valeur sur 12 à 24 mois. Sans un sponsor qui porte le sujet dans la durée, qui mesure, qui ajuste, qui défend le budget au moment des arbitrages, le projet s’étiole. Ce sponsor doit avoir un mandat clair et un horizon suffisant pour voir les résultats.',
    ),
    quoteAttribuee({
      texte:
        'Un dispositif de capitalisation est une plante qui pousse. Elle a besoin d’eau régulière, pas d’un arrosage massif tous les six mois. Les projets qui marchent sont ceux où quelqu’un, en interne, prend la responsabilité de la plante. Sans ce rôle, aucun outil, même excellent, ne compense.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer sans grand projet'),
    paragraph(
      'Vous êtes dans une entreprise où personne ne porte le sujet de la capitalisation. Vous ne voulez pas vous engager dans un chantier de 50 000 euros avant d’avoir une preuve de valeur. Voici l’ordre d’action que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1** : repérer un expert volontaire. Pas forcément le plus critique, mais le plus ouvert à l’idée. Discuter avec lui du dispositif, de ce qu’il en attend, de ce qui pourrait lui être utile dans son travail quotidien.',
    ),
    paragraph(
      '**Semaine 2** : choisir un périmètre très resserré. Par exemple, capter les échanges Slack d’une équipe sur un sujet métier précis, pendant un mois. Ne pas chercher à tout faire d’un coup.',
    ),
    paragraph(
      '**Semaine 3** : installer un dispositif léger. Un outil packagé bien choisi, une intégration simple, un corpus limité. L’objectif n’est pas la perfection technique mais la mise en route.',
    ),
    paragraph(
      '**Semaine 4** : lancer et observer. Pendant un mois, laisser tourner. Mesurer qui utilise, pour quoi, avec quelle satisfaction. Interviewer les utilisateurs. Comprendre ce qui marche et ce qui coince.',
    ),
    paragraph(
      'À l’issue de ce premier mois, vous aurez une matière concrète pour décider : élargir à d’autres équipes, approfondir sur ce premier périmètre, ou abandonner si rien ne décolle. Dans tous les cas, vous aurez appris plus qu’avec six mois de réunions de cadrage.',
    ),

    h2('En résumé'),
    paragraph(
      'Capitaliser le savoir ne consiste pas à documenter. C’est un dispositif vivant qui capte en continu les interactions de l’entreprise, les structure dans un corpus interrogeable par IA, et les rend accessibles dans les outils du quotidien. Les tentatives passées échouent presque toujours pour les mêmes raisons : contribution perçue comme une charge, outil séparé du travail, consultation pénible, absence de boucle de rétroaction, pas de gouvernance. La méthode qui marche inverse la logique : captation implicite, interrogation naturelle, ancrage dans les outils existants. Les budgets vont de 5 000 à 80 000 euros par an selon le palier. Les délais réalistes vont de 4 à 20 semaines pour la première version. Un dispositif mis en place aujourd’hui vous protège des départs qui tomberont dans 12 à 24 mois. Un dispositif lancé au moment d’un départ arrive trop tard.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Peut-on capitaliser le savoir sans IA ?',
      reponse:
        'Oui, mais au prix d’une charge beaucoup plus lourde pour les contributeurs. Un wiki bien tenu, animé par un rôle dédié, peut fonctionner dans de petites équipes très disciplinées. Dès que l’organisation dépasse une trentaine de personnes ou que les sources de savoir se multiplient, l’IA devient le levier qui rend le dispositif soutenable sans surcharger les équipes.',
    },
    {
      _key: 'faq-2',
      question: 'Combien de temps avant d’observer un vrai gain sur un dispositif de capitalisation ?',
      reponse:
        'Sur un dispositif bien cadré, les premiers effets utiles sont visibles entre 3 et 6 mois après la mise en route. Un impact structurel sur la résilience de l’organisation face aux départs se mesure sur 12 à 24 mois. Le piège consiste à vouloir juger la valeur du dispositif à 3 mois : il est encore trop tôt pour voir le vrai bénéfice.',
    },
    {
      _key: 'faq-3',
      question: 'Les experts captés ne risquent-ils pas de se sentir « remplacés » ?',
      reponse:
        'C’est un risque réel qui doit être adressé explicitement. La bonne posture est de présenter le dispositif comme un amplificateur de l’expert, pas comme un substitut. Il préserve ses décisions, trace ses contributions, allège les interruptions qu’il subit. Un expert dont le savoir est bien capté est généralement plus reconnu dans l’organisation, pas moins.',
    },
    {
      _key: 'faq-4',
      question: 'Est-ce compatible avec un ERP ou un CRM existant ?',
      reponse:
        'Oui, les dispositifs modernes se connectent facilement aux outils d’entreprise standards via API. Le vrai sujet n’est pas la compatibilité technique mais la gestion des droits d’accès : qui peut interroger quel contenu, selon quelles règles. Cette question doit être posée en amont du projet.',
    },
    {
      _key: 'faq-5',
      question: 'Peut-on démarrer sans équipe technique interne ?',
      reponse:
        'Oui, sur les paliers 1 (packagé) et 2 (semi-personnalisé). Sur le palier 3 (sur-mesure), une compétence technique interne est recommandée, ou à défaut un partenaire qui prend la responsabilité du dispositif sur la durée.',
    },
  ],

  sidebarCta: {
    titre: 'Installer une capitalisation vivante ?',
    description: '30 minutes pour cadrer le périmètre, choisir le palier et poser la gouvernance du corpus adaptée à votre contexte.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Départ de salariés : méthode IA pour capitaliser le savoir | maria',
    description:
      'La méthode pour capitaliser le savoir de vos experts au fil de l’eau, grâce à l’IA, sans alourdir leur quotidien. Outils, budget, pièges. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
