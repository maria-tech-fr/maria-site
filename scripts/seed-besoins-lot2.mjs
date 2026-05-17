import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 3 besoins du Lot 2 — Organisation & connaissance.
 */

const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }

const FORMATION_DEFAULT = {
  lienLibelle: 'formation IA pour les équipes',
  lienHref: '/services/audit-strategie-ia',
}

const BESOIN_4 = {
  _id: 'besoin-organiser-connaissance-entreprise',
  _type: 'pageBesoin',
  titre: 'Mieux organiser la connaissance de mon entreprise',
  slug: { _type: 'slug', current: 'organiser-connaissance-entreprise' },
  famille: 'organisation-connaissance',
  ordreMenu: 1,
  introCourte:
    'Le savoir est éclaté entre Drive, SharePoint, Notion et les têtes des gens. On le rend interrogeable, en langage naturel, avec des sources.',

  hero: {
    surTitre: '// besoin',
    titre: 'L’information existe dans votre entreprise. **Personne ne la retrouve**.',
    sousTitre:
      'Procédures, notes, comptes-rendus, documentation produit… Le savoir est là, éparpillé entre Drive, SharePoint, Notion, emails et têtes des gens. On le rend retrouvable, instantanément, en langage naturel.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le savoir est partout. Donc nulle part.',
    paragraphes: [
      'Chaque entreprise accumule une connaissance considérable : comment on fait les choses ici, qui sait quoi, quelle est la bonne procédure, où est ce document. Mais cette connaissance est éclatée entre une dizaine d’outils, des dossiers partagés mal nommés, des conversations enfouies, et la mémoire des collaborateurs.',
      'Résultat : on cherche au lieu de faire. On repose la même question pour la dixième fois. On refait un travail déjà fait ailleurs. Et quand quelqu’un part, une partie du savoir part avec lui. La connaissance n’est pas le problème — son inaccessibilité l’est.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'On vous pose toujours les mêmes questions parce que la réponse est introuvable.',
      'Chercher une procédure prend plus de temps que de l’appliquer.',
      'Le même document existe en cinq versions, dans cinq endroits différents.',
      'Quand un expert s’absente, l’équipe est bloquée.',
      'Les nouveaux passent des semaines à comprendre « où ça se trouve ».',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Une connaissance inaccessible coûte chaque jour, en silence.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Du temps perdu chaque jour, par presque tout le monde, à chercher une information qui existe déjà quelque part.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'L’agacement de ne jamais savoir où chercher, la dépendance permanente à « la personne qui sait », la frustration de refaire l’existant.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Le savoir non capitalisé est du savoir qu’on rachète : mêmes erreurs répétées, mêmes analyses refaites, expertise qui s’évapore à chaque départ.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On rend votre connaissance interrogeable, en langage naturel.',
    sousTitre: 'Pas un énième outil où ranger les choses : un accès intelligent à ce qui existe déjà.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Recherche conversationnelle interne',
        description: 'Vos équipes posent leur question en langage naturel et obtiennent une réponse sourcée, tirée de votre documentation réelle.' },
      { _key: 'l2', icone: 'gear', titre: 'Connexion à l’existant',
        description: 'L’agent se branche sur vos outils actuels (Drive, SharePoint, Notion, wikis) sans tout migrer.' },
      { _key: 'l3', icone: 'shield', titre: 'Réponses sourcées',
        description: 'Chaque réponse indique d’où elle vient, pour que vos équipes gardent confiance et puissent vérifier.' },
      { _key: 'l4', icone: 'sparkles', titre: 'Mise à jour vivante',
        description: 'Quand la documentation évolue, les réponses suivent. Pas de savoir figé.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble l’accès au savoir, une fois organisé.',
    avant: [
      'On cherche dans cinq outils avant de trouver (ou d’abandonner).',
      'On redemande à un collègue ce qui est pourtant écrit.',
      'Les procédures existent mais personne ne sait où.',
      'Le départ d’un expert crée un trou de connaissance.',
      'Les nouveaux tâtonnent des semaines.',
    ],
    apres: [
      'Une question, une réponse sourcée, en quelques secondes.',
      'L’information se trouve sans déranger personne.',
      'Les procédures sont accessibles en langage naturel.',
      'Le savoir reste même quand les gens partent.',
      'Les nouveaux deviennent autonomes en quelques jours.',
    ],
    closing: 'On arrête de chercher. On recommence à faire.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un agent de recherche interne formé sur votre documentation réelle, qui répond en langage naturel avec des sources — sans inventer, sans halluciner.' },
      { _key: 's2', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'L’interface qui rend cet accès au savoir naturel pour vos équipes, intégrée là où elles travaillent déjà (intranet, Slack, Teams).' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Pour que vos équipes adoptent ce réflexe au quotidien, la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Faut-il migrer toute notre documentation dans un nouvel outil ?',
        reponse: 'Non. L’agent se branche sur vos outils existants (Drive, SharePoint, Notion, wikis…). L’idée est justement d’éviter une nième migration : on rend interrogeable ce qui est déjà là.' },
      { _key: 'q2', question: 'Comment être sûr que les réponses sont fiables ?',
        reponse: 'Chaque réponse est sourcée : l’agent indique d’où vient l’information pour que vos équipes puissent vérifier. Et il est conçu pour dire « je ne trouve pas » plutôt qu’inventer une réponse.' },
      { _key: 'q3', question: 'Et si notre documentation est incomplète ou mal organisée ?',
        reponse: 'C’est le cas le plus fréquent. On évalue l’état de votre connaissance au cadrage et on intègre, si besoin, une phase de structuration minimale avant de brancher l’agent.' },
      { _key: 'q4', question: 'Qui peut accéder à quelle information ?',
        reponse: 'Les droits d’accès existants sont respectés. L’agent ne donne pas accès à ce qu’un collaborateur n’a pas le droit de voir. La gestion des permissions est cadrée dès la conception.' },
      { _key: 'q5', question: 'Combien de temps pour le mettre en place ?',
        reponse: '6 à 10 semaines selon le volume documentaire et l’état d’organisation initial. On démarre sur un périmètre (une équipe, un domaine) pour prouver la valeur vite.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-faciliter-onboarding' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-capitaliser-expertise-interne' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-reduire-charge-service-client' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à rendre **votre savoir** enfin accessible ?',
    sousTitre: '30 minutes pour évaluer l’état de votre connaissance et ce qu’on peut rendre interrogeable, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Organiser la connaissance de votre entreprise avec l’IA | maria',
    description:
      'Votre savoir interne est éparpillé et introuvable ? maria le rend interrogeable en langage naturel, avec des réponses sourcées, sans migration forcée.',
  },
}

const BESOIN_5 = {
  _id: 'besoin-faciliter-onboarding',
  _type: 'pageBesoin',
  titre: 'Faciliter l’onboarding et la montée en compétences',
  slug: { _type: 'slug', current: 'faciliter-onboarding' },
  famille: 'organisation-connaissance',
  ordreMenu: 2,
  introCourte:
    'Vos nouveaux mettent des mois à être autonomes ? Un assistant les guide et répond sans mobiliser vos équipes.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos nouvelles recrues mettent **des mois à devenir vraiment autonomes**.',
    sousTitre:
      'Trouver la bonne procédure, comprendre qui fait quoi, oser poser une question sans déranger… L’onboarding repose trop souvent sur la disponibilité des autres. On le rend fluide, autonome, et moins dépendant des collègues débordés.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le temps d’autonomie d’un nouveau coûte aux deux côtés.',
    paragraphes: [
      'Quand quelqu’un arrive, il ne sait pas où trouver les choses, à qui demander, comment on procède ici. Il apprend en interrompant ses collègues, en cherchant dans des outils qu’il ne maîtrise pas, en accumulant des questions qu’il n’ose pas toujours poser. Pendant des semaines, parfois des mois.',
      'Ce délai coûte deux fois : le nouveau n’est pas productif, et ceux qui l’accompagnent le sont moins. Et comme l’onboarding repose sur la bonne volonté des équipes, sa qualité dépend de leur disponibilité — qui est rarement au rendez-vous.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Les nouveaux passent des semaines à comprendre « comment ça marche ici ».',
      'Les mêmes questions d’arrivée sont posées à chaque recrutement.',
      'L’onboarding repose sur un collègue déjà débordé.',
      'La qualité d’intégration dépend de qui s’en occupe ce mois-là.',
      'Vous n’avez pas de vraie visibilité sur où en est un nouvel arrivant.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Un onboarding lent freine deux personnes, pas une.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Des semaines de productivité réduite côté recrue, et du temps prélevé sur les équipes qui accompagnent à la main.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Un démarrage laborieux marque. Une mauvaise première expérience d’intégration pèse sur l’engagement — et parfois sur la décision de rester.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Chaque semaine de non-autonomie est une semaine de contribution en moins, sur un poste que vous avez mis du temps et de l’argent à pourvoir.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On rend le nouvel arrivant autonome, sans mobiliser toute l’équipe.',
    sousTitre: 'Un assistant qui répond à ses questions, le guide, et le rend opérationnel sans dépendre de la disponibilité des autres.',
    leviers: [
      { _key: 'l1', icone: 'sparkles', titre: 'Assistant d’onboarding',
        description: 'Le nouvel arrivant pose ses questions à un assistant qui connaît vos procédures, vos outils, votre organisation.' },
      { _key: 'l2', icone: 'gear', titre: 'Parcours guidé',
        description: 'Les étapes clés des premiers jours sont structurées et suivies, sans tout reposer sur un référent.' },
      { _key: 'l3', icone: 'users', titre: 'Réponses sans déranger',
        description: 'Les questions « bêtes » trouvent une réponse immédiate, sans interrompre un collègue ni gêner le nouveau.' },
      { _key: 'l4', icone: 'search', titre: 'Visibilité sur la progression',
        description: 'Le manager voit où en est l’intégration, ce qui est acquis, ce qui coince.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble une première semaine, une fois l’onboarding fluidifié.',
    avant: [
      'Le nouveau cherche tout, tout seul, ou interrompt sans cesse.',
      'Les mêmes questions d’arrivée reviennent à chaque recrutement.',
      'L’intégration dépend d’un référent disponible ou pas.',
      'Le manager découvre les blocages trop tard.',
      'L’autonomie réelle arrive après des semaines.',
    ],
    apres: [
      'Le nouveau obtient ses réponses immédiatement, sans gêner.',
      'Le parcours d’arrivée est structuré et réutilisable.',
      'L’intégration ne dépend plus de la disponibilité d’un seul.',
      'Le manager suit la progression en temps réel.',
      'L’autonomie réelle arrive en quelques jours.',
    ],
    closing: 'Le nouveau avance seul. L’équipe reste concentrée. L’intégration ne s’improvise plus.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un assistant d’onboarding cadré sur votre organisation réelle, qui répond aux questions des nouveaux arrivants et les guide, sans mobiliser vos équipes.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Au-delà de l’onboarding, former vos équipes à tirer parti de l’IA accélère l’autonomie de tous — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Est-ce que ça remplace l’accompagnement humain à l’arrivée ?',
        reponse: 'Non, ça le recentre. L’humain reste essentiel pour le relationnel, le sens, la culture. L’assistant retire le poids des questions logistiques et répétitives qui usent l’accompagnant et freinent le nouveau.' },
      { _key: 'q2', question: 'Sur quoi l’assistant s’appuie-t-il pour répondre ?',
        reponse: 'Sur votre documentation interne, vos procédures, votre organisation — pas sur des généralités. Si cette base est lacunaire, on intègre une phase de structuration au projet.' },
      { _key: 'q3', question: 'Faut-il un onboarding déjà formalisé pour démarrer ?',
        reponse: 'Non. Beaucoup d’entreprises n’en ont pas de structuré. On peut justement profiter du projet pour formaliser le parcours d’intégration en même temps.' },
      { _key: 'q4', question: 'Est-ce adaptable selon les postes ?',
        reponse: 'Oui. Un parcours d’onboarding commercial n’est pas celui d’un profil technique. On conçoit des parcours différenciés selon vos métiers.' },
      { _key: 'q5', question: 'Combien de temps pour le mettre en place ?',
        reponse: '6 à 10 semaines selon le nombre de parcours métier et l’état de votre documentation d’accueil.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-organiser-connaissance-entreprise' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-capitaliser-expertise-interne' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-former-equipes-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à rendre vos nouvelles recrues **autonomes plus vite** ?',
    sousTitre: '30 minutes pour cadrer un parcours d’onboarding assisté adapté à vos métiers, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Faciliter l’onboarding avec l’IA | maria',
    description:
      'Vos recrues mettent des mois à être autonomes ? maria conçoit un assistant d’onboarding qui les guide et répond à leurs questions, sans mobiliser vos équipes.',
  },
}

const BESOIN_6 = {
  _id: 'besoin-capitaliser-expertise-interne',
  _type: 'pageBesoin',
  titre: 'Capitaliser sur l’expertise interne',
  slug: { _type: 'slug', current: 'capitaliser-expertise-interne' },
  famille: 'organisation-connaissance',
  ordreMenu: 3,
  introCourte:
    'Vos experts détiennent un savoir critique non écrit ? On le capte, on le structure, on le rend accessible avant qu’il disparaisse.',

  hero: {
    surTitre: '// besoin',
    titre: 'Quand un expert part, **son savoir part avec lui**.',
    sousTitre:
      'Vos meilleurs éléments savent des choses que personne n’a jamais écrites. Le jour où ils s’absentent, changent de poste ou quittent l’entreprise, ce savoir disparaît. On vous aide à le capter, le formaliser et le rendre accessible — avant qu’il soit trop tard.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'L’expertise critique vit dans des têtes, pas dans l’entreprise.',
    paragraphes: [
      'Dans chaque organisation, quelques personnes détiennent un savoir clé : comment on règle ce type de problème, pourquoi on a fait ce choix il y a trois ans, quelle est la vraie procédure quand le cas est compliqué. Ce savoir n’est presque jamais écrit. Il s’est construit par l’expérience, il vit dans la tête de quelques-uns.',
      'Tant que ces personnes sont là et disponibles, tout va bien. Le jour où elles partent, changent de rôle, ou sont simplement en congé au mauvais moment, l’entreprise découvre à quel point elle en dépendait. Et reconstruire ce savoir coûte des années — quand c’est encore possible.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Certaines tâches ne peuvent être faites que par une seule personne.',
      'Quand « la personne qui sait » est absente, des décisions attendent.',
      'Les raisons des choix passés se perdent, on refait les mêmes débats.',
      'Un départ a déjà fait perdre un savoir que vous n’avez pas pu récupérer.',
      'Vous savez qui sont vos points de fragilité, sans savoir comment les sécuriser.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Le savoir non capitalisé est une dette invisible.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Le temps de reconstruire ce qui existait déjà, à chaque départ, à chaque absence d’une personne clé.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Une dépendance malsaine à quelques individus, une pression sur eux, et une vulnérabilité que toute l’équipe ressent sans la nommer.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Le savoir perdu est du savoir racheté : mêmes erreurs refaites, mêmes analyses recommencées, décisions prises sans la mémoire de pourquoi.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On capte le savoir des experts pendant qu’ils sont là.',
    sousTitre: 'Sans transformer vos experts en rédacteurs à plein temps : on capture, on structure, on rend accessible.',
    leviers: [
      { _key: 'l1', icone: 'sparkles', titre: 'Capture assistée de l’expertise',
        description: 'L’expert répond à des questions ciblées plutôt que d’écrire des manuels ; l’IA structure et formalise.' },
      { _key: 'l2', icone: 'search', titre: 'Formalisation des décisions',
        description: 'Les choix importants et leur contexte sont documentés pour que la mémoire ne se perde plus.' },
      { _key: 'l3', icone: 'gear', titre: 'Mise à disposition vivante',
        description: 'Le savoir capté devient interrogeable par toute l’équipe, en langage naturel.' },
      { _key: 'l4', icone: 'shield', titre: 'Réduction de la dépendance',
        description: 'Les points de fragilité (« une seule personne sait ») sont identifiés et traités en priorité.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble l’organisation, une fois l’expertise capitalisée.',
    avant: [
      'Certaines tâches dépendent d’une seule personne.',
      'Une absence clé bloque des décisions.',
      'Les raisons des choix passés se perdent.',
      'Chaque départ fait perdre un savoir.',
      'La fragilité est connue mais non traitée.',
    ],
    apres: [
      'Le savoir critique est documenté et accessible.',
      'Une absence ne bloque plus l’équipe.',
      'Le contexte des décisions reste disponible.',
      'Un départ ne fait plus disparaître l’expertise.',
      'Les points de fragilité sont identifiés et sécurisés.',
    ],
    closing: 'L’expertise reste dans l’entreprise, même quand les experts n’y sont pas.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un agent qui capte l’expertise par le dialogue, la structure, et la rend interrogeable — pour que le savoir critique cesse de dépendre de la présence de quelques personnes.' },
      { _key: 's2', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'L’outil qui héberge ce savoir capitalisé et le rend exploitable au quotidien par toutes les équipes concernées.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Capter le savoir, c’est aussi savoir le transmettre — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Nos experts n’ont pas le temps d’écrire de la documentation.',
        reponse: 'C’est précisément le problème qu’on contourne. L’expert répond à des questions ciblées, en parlant ; l’IA structure et formalise. On capture son savoir sans en faire un rédacteur.' },
      { _key: 'q2', question: 'Comment éviter que ce savoir devienne vite obsolète ?',
        reponse: 'La connaissance capturée est vivante : elle s’enrichit et se corrige au fil de l’usage. On met en place un cycle de mise à jour léger pour qu’elle reste fiable.' },
      { _key: 'q3', question: 'Est-ce que ça menace le rôle de nos experts ?',
        reponse: 'Au contraire, ça le valorise : leur savoir devient un actif reconnu de l’entreprise, et ils sont libérés des sollicitations répétitives pour se concentrer sur les vrais cas complexes.' },
      { _key: 'q4', question: 'Par où commencer si on a plusieurs experts critiques ?',
        reponse: 'On priorise selon le risque : qui détient un savoir non documenté, critique, et difficilement remplaçable. On traite les points de fragilité les plus exposés d’abord.' },
      { _key: 'q5', question: 'Combien de temps pour des premiers résultats ?',
        reponse: '6 à 12 semaines selon le nombre de domaines d’expertise à capturer et leur complexité. On démarre sur le point de dépendance le plus risqué.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-organiser-connaissance-entreprise' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-faciliter-onboarding' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à sécuriser **le savoir critique** de votre entreprise ?',
    sousTitre: '30 minutes pour identifier vos points de dépendance et comment les sécuriser, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Capitaliser sur l’expertise interne avec l’IA | maria',
    description:
      'Le savoir de vos experts part avec eux ? maria aide à le capter, le formaliser et le rendre accessible, sans transformer vos experts en rédacteurs.',
  },
}

for (const doc of [BESOIN_4, BESOIN_5, BESOIN_6]) {
  await client.createOrReplace(doc)
  console.log(`✓ ${doc._id}`)
}

console.log('Done.')
