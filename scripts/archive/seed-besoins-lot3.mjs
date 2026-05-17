import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 2 besoins du Lot 3 — Pilotage & décision.
 */

const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }
const SERVICE_AUDIT = { _type: 'reference', _ref: 'pageService-audit-strategie-ia' }

const FORMATION_DEFAULT = {
  lienLibelle: 'formation IA pour les équipes',
  lienHref: '/services/audit-strategie-ia',
}

const BESOIN_7 = {
  _id: 'besoin-vision-claire-donnees-metier',
  _type: 'pageBesoin',
  titre: 'Avoir une vision claire sur mes données métier',
  slug: { _type: 'slug', current: 'vision-claire-donnees-metier' },
  famille: 'pilotage-decision',
  ordreMenu: 1,
  introCourte:
    'Vos données sont éparpillées et vos tableaux périmés ? On consolide et on livre un pilotage clair et à jour, sans projet data interminable.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos données existent. Mais **vous pilotez encore au feeling**.',
    sousTitre:
      'Les chiffres sont là, quelque part, dans le CRM, l’ERP, les exports Excel. Mais les consolider prend des jours, les tableaux sont périmés à la sortie, et les décisions se prennent à l’intuition. On vous donne une vision claire, à jour, exploitable — sans usine à gaz.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Avoir les données ne veut pas dire les voir.',
    paragraphes: [
      'La plupart des entreprises ne manquent pas de données : elles en ont trop, éparpillées dans des outils qui ne se parlent pas. Le CRM dit une chose, l’ERP une autre, les exports Excel encore une autre. Consolider tout ça pour avoir une vision d’ensemble demande un travail manuel, long, refait à chaque fois.',
      'Conséquence : soit on pilote avec des tableaux périmés, soit on pilote à l’instinct. Les décisions importantes — où investir, quoi prioriser, qu’est-ce qui décroche — se prennent sans visibilité fiable. Non par négligence, mais parce que la donnée claire arrive trop tard, ou jamais.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Consolider les chiffres du mois prend plusieurs jours, chaque mois.',
      'Vos tableaux de bord sont déjà périmés au moment où vous les regardez.',
      'Le CRM, l’ERP et les exports Excel ne disent pas la même chose.',
      'Les décisions importantes se prennent sans données fiables sous les yeux.',
      'Vous découvrez les problèmes dans les chiffres une fois qu’il est trop tard.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Piloter sans visibilité coûte plus cher qu’un mauvais chiffre.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Des jours de consolidation manuelle chaque mois, pour produire des tableaux déjà dépassés à la livraison.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'La frustration de décider en aveugle, la défiance envers des chiffres qui se contredisent, le travail ingrat de qui compile sans que ce soit lu.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Une dérive vue trois mois trop tard, une opportunité non détectée, un arbitrage pris à l’instinct qui aurait pu être éclairé. La décision mal informée est le coût le plus lourd.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On transforme vos données dispersées en pilotage clair et à jour.',
    sousTitre: 'Pas un projet data interminable : un tableau de bord utile, branché sur vos vraies sources, qui se met à jour seul.',
    leviers: [
      { _key: 'l1', icone: 'gear', titre: 'Consolidation automatique',
        description: 'Vos sources (CRM, ERP, Excel, outils métier) sont reliées et consolidées sans ressaisie manuelle.' },
      { _key: 'l2', icone: 'sparkles', titre: 'Tableaux de bord vivants',
        description: 'Les indicateurs qui comptent vraiment pour vous, à jour en continu, lisibles sans être analyste.' },
      { _key: 'l3', icone: 'search', titre: 'Lecture en langage naturel',
        description: 'Vous posez une question (« quels clients ont décroché ce trimestre ? ») et obtenez une réponse, sans formule ni tableau croisé.' },
      { _key: 'l4', icone: 'zap', titre: 'Alertes sur les écarts',
        description: 'Les dérives par rapport aux objectifs sont signalées tôt, pas découvertes en fin de trimestre.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble le pilotage, une fois la donnée maîtrisée.',
    avant: [
      'La consolidation mensuelle mobilise des jours.',
      'Les tableaux sont périmés dès qu’ils sont prêts.',
      'Les sources se contredisent, on ne sait qui croire.',
      'Les décisions se prennent à l’intuition.',
      'Les problèmes se voient trop tard dans les chiffres.',
    ],
    apres: [
      'La consolidation est automatique et continue.',
      'Les tableaux sont à jour quand vous les regardez.',
      'Une source de vérité fiable, partagée.',
      'Les décisions s’appuient sur des données fraîches.',
      'Les dérives sont signalées tôt, pas subies.',
    ],
    closing: 'On arrête de produire des chiffres. On commence à décider avec.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit le tableau de bord qui se branche sur vos sources réelles, les consolide automatiquement et donne à vos décideurs une vision claire et à jour — sans usine à gaz data.' },
      { _key: 's2', service: SERVICE_AUDIT, numero: '01', ctaLibelle: 'Découvrir ce service',
        pitch: 'Si vos données sont trop dispersées ou de qualité inégale, on commence par cartographier ce qui existe et ce qu’il faut stabiliser avant de construire.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Pour que vos équipes exploitent ces tableaux de bord en autonomie, la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Faut-il un projet data lourd et long pour avoir ça ?',
        reponse: 'Non, c’est justement ce qu’on évite. On part des indicateurs qui comptent pour vous et des sources qui existent déjà. On livre un tableau de bord utile vite, plutôt qu’un entrepôt de données dans deux ans.' },
      { _key: 'q2', question: 'Nos données sont de qualité inégale. Est-ce bloquant ?',
        reponse: 'Non, mais ça se cadre. On évalue la qualité des sources au démarrage. Si nécessaire, on stabilise les flux essentiels avant de construire le pilotage — c’est le rôle de la phase d’audit.' },
      { _key: 'q3', question: 'Faut-il remplacer nos outils actuels ?',
        reponse: 'Non. On se connecte à votre CRM, ERP, exports et outils métier existants. L’objectif est de les faire parler ensemble, pas de tout remplacer.' },
      { _key: 'q4', question: 'Qui peut voir quelles données ?',
        reponse: 'Les droits d’accès sont cadrés dès la conception : chaque décideur voit ce qui le concerne, selon vos règles. La gouvernance des accès fait partie du projet.' },
      { _key: 'q5', question: 'Combien de temps avant d’avoir un premier tableau de bord utile ?',
        reponse: 'Sur un périmètre cadré, 4 à 8 semaines entre le premier atelier et un tableau de bord en usage réel. On démarre par l’indicateur le plus stratégique pour vous.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-alertes-intelligentes' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-gagner-du-temps-commerciaux' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-industrialiser-traitement-documents' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à piloter sur **des données fiables** plutôt qu’à l’instinct ?',
    sousTitre: '30 minutes pour identifier les indicateurs qui comptent et ce qu’on peut consolider, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Avoir une vision claire de vos données métier avec l’IA | maria',
    description:
      'Vos données sont éparpillées et vos tableaux périmés ? maria consolide vos sources et livre un pilotage clair, à jour, exploitable. Sans projet data interminable.',
  },
}

const BESOIN_8 = {
  _id: 'besoin-alertes-intelligentes',
  _type: 'pageBesoin',
  titre: 'Anticiper plutôt que subir (alertes intelligentes)',
  slug: { _type: 'slug', current: 'alertes-intelligentes' },
  famille: 'pilotage-decision',
  ordreMenu: 2,
  introCourte:
    'Vous voyez les problèmes trop tard ? Un système d’alertes qui détecte les signaux faibles et vous prévient au moment où vous pouvez encore agir.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vous découvrez les problèmes **une fois qu’il est trop tard**.',
    sousTitre:
      'Le client qui part, le projet qui dérape, l’anomalie qui s’installe, le seuil critique franchi… Les signaux étaient là, dans vos données, avant la catastrophe. On vous prévient au bon moment, pas dans le rapport du mois suivant.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Les signaux existent. On les lit après coup.',
    paragraphes: [
      'La plupart des problèmes coûteux ne surgissent pas de nulle part : un client qui part avait ralenti ses commandes depuis des mois, un projet qui dérape avait accumulé des signaux faibles, une anomalie qualité avait laissé des traces. L’information était là, dans les données — mais personne ne la regardait au bon moment.',
      'On pilote en regardant dans le rétroviseur : le reporting mensuel, le bilan trimestriel, l’analyse post-mortem. À ce moment-là, le mal est fait. Le problème n’est pas l’absence de données, c’est l’absence d’alerte au moment où on pouvait encore agir.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vous découvrez qu’un client est parti après son départ, pas avant.',
      'Les dérives projet se voient dans le bilan, trop tard pour corriger.',
      'Les anomalies s’installent jusqu’à devenir visibles « à l’œil nu ».',
      'Personne ne surveille les seuils critiques en continu — c’est manuel ou inexistant.',
      'Vous réagissez aux problèmes au lieu de les anticiper.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Subir coûte toujours plus cher qu’anticiper.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Le temps de gérer une crise qu’on aurait pu éviter, toujours supérieur au temps de l’anticiper.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Le mode pompier permanent épuise. Les équipes qui subissent les problèmes au lieu de les prévenir perdent en sérénité et en sens.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Un client retenu à temps, une dérive corrigée tôt, une anomalie stoppée avant qu’elle se propage : ce qu’on évite ne se voit pas, mais c’est là que se joue la vraie valeur.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On surveille pour vous, et on vous prévient au moment où vous pouvez agir.',
    sousTitre: 'Pas une avalanche d’alertes inutiles : les bons signaux, au bon moment, aux bonnes personnes.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Détection de signaux faibles',
        description: 'Les indicateurs avant-coureurs (ralentissement, écart, dérive) sont surveillés en continu, pas une fois par mois.' },
      { _key: 'l2', icone: 'zap', titre: 'Alertes ciblées et priorisées',
        description: 'Vous êtes prévenu uniquement quand ça compte, avec le bon niveau d’urgence, pas noyé sous les notifications.' },
      { _key: 'l3', icone: 'sparkles', titre: 'Contexte fourni avec l’alerte',
        description: 'Chaque alerte arrive avec ce qu’il faut comprendre pour décider, pas juste un voyant rouge.' },
      { _key: 'l4', icone: 'users', titre: 'Recommandation d’action',
        description: 'Quand c’est pertinent, l’alerte suggère quoi faire, vos équipes décident.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble le pilotage, une fois qu’on anticipe.',
    avant: [
      'Les problèmes se découvrent en bilan, trop tard.',
      'La surveillance des seuils est manuelle ou absente.',
      'Les départs clients se constatent après coup.',
      'Les équipes sont en mode pompier permanent.',
      'On réagit, on n’anticipe pas.',
    ],
    apres: [
      'Les signaux faibles sont détectés tôt.',
      'Les seuils critiques sont surveillés en continu.',
      'Les risques de départ sont signalés à temps.',
      'Les équipes agissent avant la crise.',
      'On anticipe, on subit moins.',
    ],
    closing: 'On arrête d’éteindre des incendies. On les voit venir.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit le système de surveillance et d’alerte branché sur vos données métier, qui détecte les signaux faibles et prévient les bonnes personnes au bon moment — sans les noyer sous le bruit.' },
      { _key: 's2', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'Un agent de veille interne qui surveille en continu, qualifie ce qui mérite une alerte et fournit le contexte pour décider vite.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Pour que vos équipes exploitent ces alertes avec discernement, la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Comment éviter d’être noyé sous les alertes ?',
        reponse: 'C’est le cœur de la conception. Une alerte qui sonne tout le temps ne sert à rien. On calibre les seuils avec vous, on priorise par niveau d’urgence, et on ajuste dans le temps pour que chaque alerte soit légitime.' },
      { _key: 'q2', question: 'Sur quelles données les alertes s’appuient-elles ?',
        reponse: 'Sur vos données métier existantes (commerciales, opérationnelles, qualité, projet…). Si elles sont dispersées, on commence par les consolider — c’est souvent lié au besoin « vision claire des données ».' },
      { _key: 'q3', question: 'L’IA va-t-elle décider à notre place quand une alerte sonne ?',
        reponse: 'Non. L’alerte informe et, quand c’est pertinent, suggère. La décision et l’action restent humaines. L’objectif est de vous donner le temps d’agir, pas de décider sans vous.' },
      { _key: 'q4', question: 'Peut-on commencer petit, sur un seul type d’alerte ?',
        reponse: 'Oui, c’est même recommandé. On démarre sur le risque le plus coûteux pour vous (départ client, dérive projet…), on prouve la valeur, puis on étend.' },
      { _key: 'q5', question: 'Combien de temps pour mettre en place un premier dispositif ?',
        reponse: '4 à 8 semaines selon l’accessibilité de vos données et le périmètre de surveillance. On priorise le signal le plus critique en premier.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-vision-claire-donnees-metier' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-reduire-charge-service-client' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-gagner-du-temps-commerciaux' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à voir les problèmes **venir plutôt qu’à les subir** ?',
    sousTitre: '30 minutes pour identifier les signaux que vous devriez surveiller, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Mettre en place des alertes intelligentes avec l’IA | maria',
    description:
      'Vous découvrez les problèmes trop tard ? maria conçoit un système d’alertes qui détecte les signaux faibles et vous prévient au moment où vous pouvez encore agir.',
  },
}

for (const doc of [BESOIN_7, BESOIN_8]) {
  await client.createOrReplace(doc)
  console.log(`✓ ${doc._id}`)
}

console.log('Done.')
