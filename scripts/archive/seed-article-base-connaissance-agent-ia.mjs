/**
 * Seed de l'article « Base de connaissance pour agent IA de service client :
 * comment structurer votre documentation pour qu'elle marche »
 *
 * Auteur : Alexandre BRU (Directeur technique) — `auteur-alexandre-bru` en base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false (l'article service client garde la place vedette).
 *
 * Corrections vs brief initial :
 *  - Sources : Salesforce State of Service 2025 et MDPI (cas d'étude RAG 2025)
 *    sont explicitement cités dans le corps avec liens cliquables (URLs directes
 *    vérifiables). Capgemini est mentionné en générique sans lien (URL du
 *    frontmatter trop vague).
 *  - Cross-link vers l'article service client en fin d'article (pendant
 *    éditorial naturel : « pour la vue d'ensemble du projet, voir… »).
 *  - inArticleCta yellow ajouté après la section « méthode maria en 5 principes »
 *    (moment où le lecteur qualifié se dit « ok, j'ai besoin d'aide pour ça »).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-base-connaissance-agent-ia.mjs
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
  _id: 'article-base-connaissance-agent-ia-service-client',
  _type: 'article',
  slug: { _type: 'slug', current: 'donnees-agent-ia-service-client' },
  titre: 'Comment structurer ses données pour créer un agent IA de service client ?',
  sousTitre:
    'La qualité de votre base de connaissance conditionne 80 % du succès d’un agent IA. Voici ce qu’il faut savoir avant d’écrire la première ligne de code.',
  intro:
    'Un agent IA n’invente pas ses réponses. Il s’appuie sur la documentation que vous lui donnez. Si celle-ci est incomplète, contradictoire ou obsolète, aucun outil ne compensera. Voici la méthode pour préparer une base utilisable.',
  publishedAt: '2026-08-11T09:00:00.000Z',
  readingTime: 11,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-alexandre-bru' },

  tldr: [
    'Un agent IA de service client ne peut être meilleur que la documentation sur laquelle il s’appuie. Sa performance dépend directement de la qualité de votre base de connaissance.',
    'La plupart des documentations existantes présentent 4 défauts qui les rendent inutilisables telles quelles : dispersion, obsolescence, contradictions internes, formulations non structurées.',
    'Selon les études sectorielles, la préparation de la base de connaissance représente en moyenne 60 à 70 % du temps de cadrage d’un projet d’agent IA sérieux.',
    'Sur les projets que nous accompagnons, comptez 2 à 6 semaines pour consolider une base de connaissance utilisable, selon l’état de départ.',
    'Cinq principes structurent une bonne base : une seule source de vérité, chaque contenu autoportant, une gouvernance de mise à jour, un format lisible par l’IA, un cycle de curation continue.',
  ],

  body: [
    h2('Pourquoi la moitié des projets d’agent IA échouent avant même l’outil'),
    paragraph(
      'Sur les projets d’agent IA que nous auditons, un constat revient. Quand une équipe raconte un projet raté, elle décrit presque toujours des symptômes techniques : « l’agent répondait à côté », « il inventait des choses », « les clients ne comprenaient pas ses réponses ». Ces symptômes sont réels. Mais la cause n’est presque jamais dans l’outil.',
    ),
    paragraph('Elle est dans la documentation source.'),
    paragraph(
      'Un agent IA moderne fonctionne selon un principe simple. Il reçoit une question, cherche dans une base de connaissance des passages pertinents, puis formule une réponse en s’appuyant sur ces passages. Cette technique, appelée RAG (Retrieval-Augmented Generation), est devenue le standard du marché en 2025. Elle a un avantage majeur : l’agent ne parle que de ce qu’il trouve dans la documentation, ce qui réduit drastiquement les réponses inventées.',
    ),
    paragraph(
      'Mais cette technique a une conséquence directe. Si votre documentation est mauvaise, votre agent sera mauvais, quelle que soit la qualité du modèle IA sous-jacent. Un [cas d’étude publié dans une revue MDPI en 2025](https://www.mdpi.com/2674-113X/5/2/15) illustre bien ce point : sur exactement le même modèle technique de RAG appliqué à un service client, la performance mesurée de l’agent varie de 40 à 90 % uniquement en fonction de la qualité de la base sur laquelle il s’appuie.',
    ),
    paragraph(
      'Ce constat est cohérent avec ce que documente le [rapport State of Service 2025 de Salesforce](https://www.salesforce.com/news/stories/state-of-service-report-announcement-2025/) auprès de 6 500 professionnels du service client dans le monde : la qualité de la documentation et la clarté des process internes ressortent comme les deux premiers facteurs de succès ou d’échec d’un déploiement d’IA côté service client.',
    ),
    paragraph(
      'C’est un renversement de perspective majeur. La question centrale d’un projet d’agent IA n’est pas « quel outil choisir » mais « quelle base de connaissance lui donner ».',
    ),
    callout(
      'À retenir',
      'Un agent IA ne pense pas. Il retrouve, contextualise et reformule ce qui existe déjà dans votre documentation. Sa performance est le reflet direct de la qualité de cette source. Une documentation contradictoire produit un agent contradictoire. Une documentation à jour produit un agent à jour. C’est aussi mécanique que ça.',
    ),

    h2('Qu’est-ce qu’une base de connaissance vraiment utilisable par une IA ?'),
    paragraph(
      'Le terme « base de connaissance » est ancien. Il désigne dans la plupart des entreprises un ensemble de documents dispersés entre FAQ, procédures internes, articles d’aide, échanges par email et fichiers Word plus ou moins à jour. Ce n’est pas ce qu’attend un agent IA.',
    ),
    definition(
      'Base de connaissance pour agent IA',
      'Corpus documentaire structuré, à jour, cohérent et formaté pour être exploité par un système de recherche automatique. Elle comporte des contenus autoportants (compréhensibles sans contexte extérieur), une taxonomie claire, une gouvernance de mise à jour, et une couverture explicite des cas d’usage à traiter.',
    ),
    paragraph(
      'Trois différences fondamentales séparent une base « utilisable par un humain » d’une base « utilisable par une IA ».',
    ),
    paragraph(
      '**Le format.** Un humain sait naviguer entre plusieurs documents pour recomposer une information. Une IA cherche des passages précis dans une base structurée. Chaque contenu doit être découpé en unités autonomes, avec un titre explicite, une question à laquelle il répond, et une réponse compréhensible sans référence à d’autres documents.',
    ),
    paragraph(
      '**La cohérence.** Un humain peut décider entre deux versions contradictoires d’une même procédure. Une IA n’a pas ce filtre. Si votre documentation dit à un endroit « la garantie est de 12 mois » et à un autre « la garantie est de 24 mois », l’agent produira des réponses aléatoires.',
    ),
    paragraph(
      '**La fraîcheur.** Un humain sait qu’une procédure datée de 2019 est probablement obsolète. Une IA la traite comme n’importe quelle autre information. Une base non tenue à jour produit des réponses fausses à des questions basiques, ce qui détruit la confiance des clients en quelques semaines.',
    ),

    h2('Les 4 problèmes qu’on trouve dans 90 % des documentations existantes'),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, quatre défauts reviennent presque systématiquement dans les bases documentaires existantes. Les identifier est la première étape pour construire quelque chose d’utilisable.',
    ),
    tableau({
      enTetes: ['Problème', 'Symptôme typique', 'Impact sur l’agent IA'],
      lignes: [
        ['Dispersion des sources', 'Documentation éclatée entre 3 à 8 outils différents', 'L’agent ne voit qu’une partie de la vérité'],
        ['Obsolescence silencieuse', 'Contenus non mis à jour depuis 12 à 36 mois', 'L’agent répond avec des informations fausses sans le savoir'],
        ['Contradictions internes', 'Deux documents disent des choses différentes sur le même sujet', 'Les réponses de l’agent varient au hasard'],
        ['Formulations non structurées', 'Documents rédigés pour être lus, pas pour être interrogés', 'L’agent trouve mal ou mal reformule'],
      ],
    }),
    paragraph(
      '**Le problème 1 : la dispersion des sources.** Dans la plupart des entreprises que nous auditons, la documentation utile pour un agent IA se trouve répartie entre 3 à 8 outils différents : FAQ publique du site, articles Zendesk ou Freshdesk, procédures internes sur Notion ou Confluence, emails de la direction produit, fichiers Word sur un Drive partagé, échanges Slack cristallisant des règles. Aucun de ces silos n’est complet à lui seul. Consolider ces sources est un travail de plusieurs jours à plusieurs semaines selon la taille de l’organisation.',
    ),
    paragraph(
      '**Le problème 2 : l’obsolescence silencieuse.** La plupart des documentations d’entreprise n’ont pas de gouvernance de mise à jour. Un article a été écrit un jour, il est resté tel quel. Les changements de politique produit, de tarification, de procédure, sont diffusés en interne mais rarement répercutés dans la documentation existante. Résultat : la documentation reflète la réalité de l’entreprise d’il y a 18 mois, pas celle d’aujourd’hui.',
    ),
    paragraph(
      '**Le problème 3 : les contradictions internes.** Dès qu’une entreprise dépasse 30 personnes, sa documentation contient presque toujours des contradictions. Deux articles écrits par deux personnes différentes à deux moments différents ne disent pas la même chose. Sur « quel est le délai de rétractation ? », « que couvre la garantie ? », « comment un client peut-il modifier son abonnement ? », les réponses varient selon la source consultée. Un agent IA amplifiera ces contradictions.',
    ),
    paragraph(
      '**Le problème 4 : les formulations non structurées.** La plupart des contenus de documentation existants ont été écrits pour être lus par un humain, pas cherchés par une IA. Les informations utiles sont diluées dans du texte narratif, les questions ne sont pas explicites, les réponses présupposent des connaissances implicites. Un humain retrouve l’essentiel. Une IA passe à côté.',
    ),
    warning(
      'Point de vigilance',
      'La tentation classique consiste à donner à l’agent IA « toute la documentation existante » en l’état, en espérant qu’il fera le tri. Ne le faites pas. Un agent nourri de contenus contradictoires, obsolètes ou non structurés produit des réponses inutilisables. Le tri, la consolidation et la structuration sont un chantier préalable non négociable.',
    ),

    h2('Comment structurer une base de connaissance pour un agent IA : la méthode maria'),
    paragraph(
      'Sur les projets d’agent IA que nous cadrons, une méthode s’est stabilisée pour préparer la base de connaissance. Elle tient en cinq principes qui guident tout le travail de consolidation.',
    ),

    h3('Principe 1 : Une seule source de vérité par sujet'),
    paragraph(
      'Pour chaque motif que votre agent doit traiter (délai de livraison, politique de retour, gestion des accès, disponibilité produit), il doit exister exactement une source de vérité. Pas deux, pas cinq. Une seule.',
    ),
    paragraph(
      'Concrètement : vous listez les motifs à couvrir, vous identifiez le contenu source unique pour chacun, vous supprimez ou vous fusionnez les doublons. Ce travail révèle presque toujours des désaccords internes qu’il faut trancher avant de continuer. C’est douloureux mais indispensable.',
    ),

    h3('Principe 2 : Chaque contenu doit être autoportant'),
    paragraph(
      'Un contenu autoportant est un contenu compréhensible sans contexte extérieur. Il commence par une question ou un titre explicite. Il donne la réponse complète. Il précise les cas particuliers. Il indique explicitement les limites de la règle.',
    ),
    paragraph(
      'Un contre-exemple typique : un article qui commence par « Comme évoqué dans la procédure XYZ… ». Un agent IA qui trouve ce passage ne saura pas ce que dit la procédure XYZ. La formulation autoportante serait : « La politique de retour s’applique dans les cas suivants : [liste explicite]. Elle ne s’applique pas dans les cas suivants : [liste explicite] ».',
    ),

    h3('Principe 3 : Une gouvernance de mise à jour formalisée'),
    paragraph(
      'Une base de connaissance vivante nécessite un cycle de revue. Sur nos projets, nous recommandons trois niveaux de revue : mensuel pour les contenus à forte volatilité (tarifs, disponibilités, promotions), trimestriel pour les contenus opérationnels (procédures, politiques), annuel pour les contenus fondamentaux (mentions légales, principes généraux).',
    ),
    paragraph(
      'Une personne responsable est nommée par domaine. Les mises à jour laissent une trace horodatée. Les contenus non revus depuis leur seuil de validité sont automatiquement signalés pour vérification.',
    ),

    h3('Principe 4 : Un format lisible par l’IA'),
    paragraph(
      'Le format compte autant que le contenu. Une base optimisée pour un agent IA structure chaque contenu selon un modèle standard : titre clair sous forme de question, réponse principale en 2 à 5 phrases, cas particuliers listés explicitement, exemples concrets, liens vers les procédures liées.',
    ),
    paragraph(
      'Ce format n’est pas neutre. Il conditionne la capacité de l’IA à retrouver le bon passage et à formuler une réponse correcte. Sur les projets que nous accompagnons, la simple réécriture d’une documentation existante dans ce format améliore la performance de l’agent de 20 à 40 points, sans changer une ligne de code.',
    ),

    h3('Principe 5 : Un cycle de curation continue'),
    paragraph(
      'Une base de connaissance n’est jamais finie. Chaque interaction de l’agent avec un client révèle des trous : des questions qu’il n’a pas su traiter, des réponses partiellement fausses, des cas non prévus. Un cycle de curation continue capitalise sur ces retours.',
    ),
    paragraph(
      'Concrètement : les échanges où l’agent a échoué sont analysés chaque semaine, les contenus manquants ou insuffisants sont identifiés, la documentation est enrichie. Cette boucle est ce qui fait la différence entre un agent qui plafonne à 50 % de résolution et un agent qui atteint 75 à 85 % en 6 mois.',
    ),
    avisMaria({
      texte:
        'La mode pousse à investir massivement dans le choix de la plateforme IA. Notre conviction est inverse. Sur nos projets, l’investissement qui produit le plus de valeur n’est jamais l’outil, c’est la préparation et la maintenance de la base de connaissance. Une base bien tenue rend n’importe quel outil moderne performant. Une base négligée rend le meilleur outil du marché médiocre.',
      signature: 'Alexandre BRU',
    }),
    inArticleCta({
      titre: 'Cadrer votre projet d’agent IA service client',
      description:
        '30 minutes pour distinguer les 3 à 5 motifs prioritaires à couvrir et l’état réel de votre documentation.',
      lienLibelle: 'Voir comment maria cadre ce type de projet →',
      lienHref: '/besoins/reduire-charge-service-client-IA',
      variant: 'yellow',
    }),

    h2('Combien de FAQ faut-il pour démarrer ? Le seuil critique'),
    paragraph(
      'Une question revient souvent sur les projets : combien de contenus faut-il dans la base avant de pouvoir lancer un pilote ? La réponse dépend de la couverture souhaitée, pas d’un nombre absolu.',
    ),
    paragraph(
      '**Le bon indicateur : la couverture des motifs.** Vous listez les 10 à 20 motifs de contact les plus fréquents de votre service client (vos superviseurs les connaissent). Pour chacun, vous vérifiez que la base contient une réponse claire, autoportante et à jour. Le seuil de démarrage est atteint quand vous couvrez au moins 80 % des motifs prioritaires.',
    ),
    paragraph(
      '**Ordres de grandeur pratiques.** Pour un service client d’e-commerce standard, un pilote démarre bien avec 30 à 50 contenus autoportants. Pour un service client d’un SaaS BtoB, comptez plutôt 80 à 150 contenus, car les cas d’usage sont plus techniques. Pour un service financier ou assurantiel, la couverture peut dépasser 300 contenus dès le pilote, en raison des exigences réglementaires.',
    ),
    paragraph(
      '**Le piège à éviter.** Vouloir tout couvrir avant de démarrer. Une base « complète » n’existe pas, et l’attendre est le meilleur moyen de ne jamais démarrer. Mieux vaut lancer un pilote sur un périmètre bien couvert et enrichir en continu, que reporter indéfiniment en cherchant la perfection.',
    ),

    h2('Quel travail de curation continue prévoir ?'),
    paragraph(
      'Une fois l’agent en production, la base doit vivre. Voici les rituels que nous recommandons sur nos projets.',
    ),
    paragraph(
      '**Un rituel hebdomadaire de 30 à 60 minutes.** Une personne dédiée (souvent le superviseur de service client) analyse un échantillon de conversations où l’agent a été mis en difficulté, identifie les contenus manquants ou insuffisants, propose des ajouts ou modifications.',
    ),
    paragraph(
      '**Un rituel mensuel de 2 à 4 heures.** Revue de la performance globale de l’agent, croisement avec les évolutions produit ou service, mise à jour coordonnée des contenus concernés.',
    ),
    paragraph(
      '**Un rituel trimestriel d’une demi-journée.** Revue stratégique : les motifs traités sont-ils toujours les bons ? De nouveaux motifs sont-ils apparus ? La performance globale progresse-t-elle ? Sur cette base, on ajuste le périmètre couvert par l’agent.',
    ),
    paragraph(
      'Cette charge peut sembler légère. Elle est en réalité ce qui fait la différence entre un agent qui reste performant sur la durée et un agent qui se dégrade silencieusement. Sur les projets que nous auditons, les agents qui décrochent le font presque toujours parce que la curation continue a été négligée.',
    ),
    quoteAttribuee({
      texte:
        'La performance d’un agent IA en année 2 dépend moins de sa performance en année 1 que de la discipline de curation qu’on a mise en place. Un agent moyen bien maintenu bat un agent excellent laissé à l’abandon. C’est vrai pour la relation client, c’est vrai pour beaucoup de choses.',
      auteur: 'Alexandre BRU',
      role: 'Directeur technique, maria',
    }),

    h2('Par où commencer si votre doc est actuellement dispersée ou obsolète ?'),
    paragraph(
      'La plupart des entreprises qui envisagent un agent IA constatent, en début de cadrage, que leur documentation n’est pas prête. Ce n’est pas une raison de renoncer. Voici l’ordre d’action que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1** : cartographier vos sources documentaires existantes. Où est la documentation aujourd’hui ? Combien d’outils ? Quel volume ? Qui la maintient ? Cette cartographie révèle presque toujours des surprises.',
    ),
    paragraph(
      '**Semaine 2** : lister les 15 à 20 motifs de contact les plus fréquents de votre service client. Pour chaque motif, vérifier ce qui existe déjà dans votre documentation, identifier les trous et les contradictions.',
    ),
    paragraph(
      '**Semaine 3** : sur les 5 à 8 motifs prioritaires, réécrire ou consolider le contenu au format autoportant. Cette étape prend en général 2 à 4 heures par motif, selon l’état de départ.',
    ),
    paragraph(
      '**Semaine 4** : mettre en place une gouvernance simple. Un responsable par domaine, un calendrier de revue, un endroit unique où stocker la vérité consolidée. Cette gouvernance existera avant l’agent IA, elle continuera après.',
    ),
    paragraph(
      'À l’issue de ce mois, vous n’avez pas encore d’agent IA en production. Mais vous avez posé les fondations qui feront la différence entre un projet réussi et un projet raté. Sur les cas que nous accompagnons, les entreprises qui prennent le temps de ce préalable arrivent à un pilote en production 2 à 3 mois plus tard, avec une performance qui tient. Celles qui sautent cette étape lancent plus vite mais rejouent souvent tout après un premier échec.',
    ),
    paragraph(
      'Pour la vue d’ensemble d’un projet d’agent IA service client (méthode, budget, délais, pièges), voir [Réduire la charge de votre service client avec un agent IA](/blog/reduire-charge-service-client-agent-ia). Pour prendre du recul sur l’enjeu plus large du sujet, voir aussi [Knowledge management et IA : pourquoi vous devez organiser votre savoir avant de déployer un agent](/blog/knowledge-management-ia-organiser-savoir-avant-agent).',
    ),

    h2('En résumé'),
    paragraph(
      'La qualité de votre base de connaissance conditionne 60 à 80 % du succès d’un projet d’agent IA de service client. Une base mal préparée produit un agent médiocre quel que soit l’outil choisi. Cinq principes structurent une bonne base : une seule source de vérité, chaque contenu autoportant, une gouvernance de mise à jour formalisée, un format lisible par l’IA, un cycle de curation continue. La préparation d’une base utilisable prend 2 à 6 semaines selon l’état de départ. Le rituel de curation continue mobilise ensuite quelques heures par semaine. Ce travail apporte de la valeur bien au-delà du projet IA initial : formation, cohérence interne, communication, copilote pour les agents humains. Un investissement qui paye longtemps.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Peut-on utiliser directement notre FAQ existante comme base de connaissance ?',
      reponse:
        'Rarement telle quelle. Les FAQ existantes ont été écrites pour être lues par un humain, pas cherchées par une IA. Elles sont souvent trop courtes, peu structurées, avec des références implicites à d’autres contenus. Une réécriture au format autoportant est nécessaire dans la plupart des cas. En revanche, la FAQ existante est un excellent point de départ pour identifier les motifs à couvrir.',
    },
    {
      _key: 'faq-2',
      question: 'Que faire si notre documentation est dispersée entre plusieurs outils (Notion, Confluence, Zendesk, Drive) ?',
      reponse:
        'Deux stratégies coexistent. La première : consolider physiquement les contenus dans un seul outil, ce qui simplifie la gouvernance mais demande un effort important de migration. La seconde : connecter l’agent IA aux différentes sources via des API, en veillant à éviter les conflits. La bonne stratégie dépend de votre organisation, mais dans les deux cas, un travail de tri et de consolidation reste nécessaire.',
    },
    {
      _key: 'faq-3',
      question: 'Combien de temps pour préparer une base de connaissance utilisable ?',
      reponse:
        'Sur les projets que nous accompagnons, comptez 2 à 6 semaines selon l’état de départ. Une entreprise dont la documentation est déjà bien tenue peut préparer une base pilote en 2 semaines. Une entreprise dont la documentation est dispersée et obsolète peut avoir besoin de 6 semaines de travail préalable. Dans tous les cas, ce temps est un investissement, pas un coût perdu.',
    },
    {
      _key: 'faq-4',
      question: 'La base de connaissance sert-elle uniquement à l’agent IA ?',
      reponse:
        'Non, et c’est un point important. Une base de connaissance bien structurée sert à plusieurs usages : agent IA client, copilote pour les agents humains, formation des nouveaux collaborateurs, communication interne cohérente. Sur nos projets, nous constatons que le travail de préparation apporte de la valeur bien au-delà du projet IA initial.',
    },
    {
      _key: 'faq-5',
      question: 'Faut-il un outil dédié pour gérer une base de connaissance pour IA ?',
      reponse:
        'Pas nécessairement au démarrage. Un espace Notion, Confluence ou Google Workspace bien structuré suffit pour un pilote. Les outils dédiés (Zendesk Guide, Document360, Atlassian Refined) apportent de la valeur à l’échelle, quand le volume de contenus et le nombre de contributeurs augmente. Cette question se pose en général à partir de 200 à 300 contenus actifs.',
    },
  ],

  sidebarCta: {
    titre: 'Structurer votre base de connaissance IA ?',
    description: '30 minutes pour auditer l’état de votre documentation et prioriser le chantier de préparation.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Base de connaissance pour agent IA de service client | maria',
    description:
      'Comment structurer votre documentation pour qu’un agent IA de service client fonctionne vraiment. Méthode, pièges, indicateurs. Un guide par maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
