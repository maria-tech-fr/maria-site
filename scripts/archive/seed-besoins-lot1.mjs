import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 3 besoins du Lot 1 — Productivité opérationnelle.
 * createOrReplace pour écraser entièrement le contenu existant.
 */

const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }

const FORMATION_DEFAULT = {
  lienLibelle: 'formation IA pour les équipes',
  lienHref: '/services/audit-strategie-ia',
}

const BESOIN_1 = {
  _id: 'besoin-gagner-du-temps-commerciaux',
  _type: 'pageBesoin',
  titre: 'Faire gagner du temps à mes commerciaux',
  slug: { _type: 'slug', current: 'gagner-du-temps-commerciaux' },
  famille: 'productivite-operationnelle',
  ordreMenu: 1,
  introCourte:
    'Saisie CRM, préparation de rendez-vous, relances : on rend du temps de vente aux commerciaux sans déshumaniser la relation client.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos commerciaux vendent. Ils ne devraient pas passer leurs journées à **saisir des données**.',
    sousTitre:
      'Reporting, mise à jour du CRM, préparation de rendez-vous, relances manuelles… Chaque heure passée sur l’administratif est une heure qui n’est pas passée à vendre. On regarde ensemble ce qui peut être automatisé — sans déshumaniser la relation client.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le temps de vente réel fond chaque trimestre.',
    paragraphes: [
      'Un commercial passe en moyenne une part importante de sa semaine à des tâches qui n’ont rien à voir avec la vente : ressaisir ses notes dans le CRM, retrouver une information client dispersée, préparer manuellement ses rendez-vous, relancer à la main, compiler son reporting. Ce n’est pas qu’il le fait mal — c’est que personne ne lui a retiré ce poids.',
      'Plus l’équipe grandit, plus ce temps invisible se multiplie. Et comme il est diffus, il n’apparaît jamais clairement dans les chiffres. On voit le résultat (des objectifs sous tension) sans voir la cause (le temps de vente grignoté).',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vos commerciaux remplissent le CRM le soir ou le week-end, quand ils ont le temps.',
      'La préparation d’un rendez-vous client demande de fouiller dans 4 outils différents.',
      'Les relances tombent ou sont oubliées parce qu’elles sont 100 % manuelles.',
      'Le reporting commercial mobilise un temps fou pour des tableaux que peu de gens exploitent.',
      'Vous ne savez pas vraiment combien d’heures de vente sont perdues chaque semaine.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Ce que vous perdez ne se mesure pas seulement en heures.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Des heures de vente effectives perdues chaque semaine, par commercial, sur des tâches qu’aucun client ne valorise.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Les bons commerciaux détestent l’administratif. Ceux que vous voulez garder sont précisément ceux qui partiront s’ils ont l’impression de faire un métier de saisie.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Chaque heure non vendue est un rendez-vous client en moins, une relance non faite, une opportunité qui refroidit. C’est le coût le plus lourd, et le plus invisible.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On rend aux commerciaux le temps que l’administratif leur prend.',
    sousTitre: 'Pas un CRM de plus à apprendre. Des automatisations qui se branchent sur ce qui existe déjà.',
    leviers: [
      { _key: 'l1', icone: 'sparkles', titre: 'Mise à jour automatique du CRM',
        description: 'Les informations issues des emails, appels et échanges remontent dans le CRM sans ressaisie manuelle.' },
      { _key: 'l2', icone: 'search', titre: 'Préparation de rendez-vous assistée',
        description: 'Avant chaque RDV, l’essentiel sur le client est rassemblé et synthétisé automatiquement.' },
      { _key: 'l3', icone: 'zap', titre: 'Relances intelligentes',
        description: 'Les opportunités à relancer sont identifiées et priorisées, les relances suggérées au bon moment.' },
      { _key: 'l4', icone: 'gear', titre: 'Reporting généré seul',
        description: 'Les tableaux de suivi se construisent automatiquement, le commercial valide au lieu de compiler.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble la semaine d’un commercial, une fois le sujet réglé.',
    avant: [
      'Le CRM se remplit le dimanche soir, de mémoire, à la va-vite.',
      'Préparer un rendez-vous = 20 minutes de fouille dans plusieurs outils.',
      'Les relances dépendent de qui y pense.',
      'Le reporting hebdo prend une demi-journée.',
      'Le manager pilote avec des données incomplètes.',
    ],
    apres: [
      'Le CRM est à jour en continu, sans saisie manuelle.',
      'Chaque rendez-vous est préparé automatiquement, en amont.',
      'Les relances sont priorisées et suggérées au bon moment.',
      'Le reporting est prêt, il ne reste qu’à le valider.',
      'Le manager pilote sur des données fiables et fraîches.',
    ],
    closing: 'Le commercial revend. Le manager pilote. L’administratif disparaît en arrière-plan.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit l’outil qui se branche sur votre CRM et vos canaux existants pour absorber la saisie, la préparation et le reporting — sans imposer un nouvel outil à apprendre à vos équipes.' },
      { _key: 's2', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'Un copilote commercial qui prépare les rendez-vous, suggère les relances et synthétise l’information client. Vos commerciaux décident, l’agent prépare.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Vos équipes commerciales devront s’approprier l’outil pour qu’il serve vraiment — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Est-ce que ça remplace le travail de mes commerciaux ?',
        reponse: 'Non. Ça retire la partie du métier que personne n’aime (saisie, compilation, recherche d’info) pour leur rendre du temps de vente. La relation client, la négociation, la décision restent à eux — c’est là qu’ils créent de la valeur.' },
      { _key: 'q2', question: 'Faut-il changer de CRM ?',
        reponse: 'Non, sauf si vous le souhaitez. On se branche sur l’existant (Salesforce, HubSpot, Pipedrive, ou même un outil maison). L’objectif est d’enrichir votre écosystème, pas de le remplacer.' },
      { _key: 'q3', question: 'Combien de temps avant que les commerciaux en ressentent l’effet ?',
        reponse: 'Sur un premier périmètre cadré, on vise 4 à 8 semaines entre le premier atelier et un usage quotidien réel. On commence souvent par le cas le plus pénible pour créer l’adhésion vite.' },
      { _key: 'q4', question: 'Mes commerciaux sont peu à l’aise avec les outils. Est-ce un frein ?',
        reponse: 'Au contraire, c’est pour eux qu’on conçoit. Le bon outil est celui qui demande moins d’efforts que la situation actuelle, pas plus. La formation et l’accompagnement font partie du projet.' },
      { _key: 'q5', question: 'Les données clients restent-elles confidentielles ?',
        reponse: 'Oui, c’est un préalable. Hébergement maîtrisé, isolation des données, usages contractualisés. On partage tout le détail technique avant de démarrer.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-vision-claire-donnees-metier' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-reduire-charge-service-client' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à rendre **du temps de vente** à vos équipes ?',
    sousTitre: '30 minutes pour identifier ce qui peut être automatisé chez vous, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Faire gagner du temps à vos commerciaux | maria',
    description:
      'Vos commerciaux perdent du temps de vente sur l’administratif ? maria automatise la saisie CRM, la préparation de RDV et les relances. Sans déshumaniser la vente.',
  },
}

const BESOIN_2 = {
  _id: 'besoin-reduire-charge-service-client',
  _type: 'pageBesoin',
  titre: 'Réduire la charge de mon service client',
  slug: { _type: 'slug', current: 'reduire-charge-service-client' },
  famille: 'productivite-operationnelle',
  ordreMenu: 2,
  introCourte:
    'Le support croule sous les tickets répétitifs ? On absorbe le niveau 1 par un agent IA supervisé, sans dégrader la qualité.',

  hero: {
    surTitre: '// besoin',
    titre: 'Votre service client répond trois fois par jour **aux mêmes questions**.',
    sousTitre:
      'Une grande partie des sollicitations sont répétitives, simples, déjà documentées quelque part. Pendant ce temps, les demandes complexes — celles qui comptent vraiment — attendent. On vous aide à absorber le niveau 1 sans dégrader la qualité ni déshumaniser la relation.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le répétitif noie l’important.',
    paragraphes: [
      'Un service client passe une part majeure de son temps sur des demandes simples et récurrentes : où en est ma commande, comment réinitialiser mon accès, quelle est votre politique de retour. Ces réponses existent déjà, quelque part — mais elles sont retapées, encore et encore.',
      'Le problème n’est pas le volume en soi. C’est que ce volume répétitif épuise les équipes et retarde les demandes à vraie valeur : le client mécontent, le cas complexe, l’opportunité de fidélisation. Plus le répétitif gonfle, plus l’important attend.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vos agents retapent chaque jour les mêmes réponses, à peine reformulées.',
      'Les délais de réponse s’allongent alors que les demandes ne sont pas plus complexes.',
      'Les meilleurs éléments du support s’ennuient et finissent par partir.',
      'Les clients à forte valeur attendent derrière des demandes triviales.',
      'Vous savez qu’une partie du volume pourrait être traitée autrement, sans savoir comment.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Un service client saturé coûte bien plus que son budget.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Une part majeure du temps des agents absorbée par des demandes que rien ne justifie de traiter manuellement.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Répondre 40 fois par jour à la même question use. Le turnover dans le support est l’un des plus élevés — et il coûte cher à reformer.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Chaque minute sur du répétitif est une minute en moins sur la rétention, le cas sensible, le client qui hésite à partir. C’est là que se joue la vraie valeur du support.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On absorbe le niveau 1. Vos équipes gardent le niveau qui compte.',
    sousTitre: 'Un agent IA cadré sur votre documentation réelle, supervisé par vos équipes, jamais en roue libre.',
    leviers: [
      { _key: 'l1', icone: 'sparkles', titre: 'Agent de réponse niveau 1',
        description: 'Les demandes simples et récurrentes sont traitées automatiquement, à partir de votre documentation validée.' },
      { _key: 'l2', icone: 'search', titre: 'Qualification et routage',
        description: 'Les demandes complexes sont identifiées, qualifiées et orientées vers le bon interlocuteur.' },
      { _key: 'l3', icone: 'users', titre: 'Suggestions de réponse aux agents',
        description: 'Pour les cas intermédiaires, l’agent propose une réponse que l’humain valide ou ajuste.' },
      { _key: 'l4', icone: 'shield', titre: 'Supervision et traçabilité',
        description: 'Tout est tracé : ce que l’IA a répondu, à qui, sur quelle source. Vos équipes gardent le contrôle.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble une journée au support, une fois le sujet réglé.',
    avant: [
      'Les agents retapent les mêmes réponses toute la journée.',
      'Les délais s’allongent dès qu’un pic arrive.',
      'Les cas complexes attendent derrière les triviaux.',
      'Les agents expérimentés s’épuisent sur du niveau 1.',
      'La qualité dépend de la fatigue de fin de journée.',
    ],
    apres: [
      'Le niveau 1 est absorbé automatiquement, supervisé.',
      'Les pics sont amortis sans dégrader le délai.',
      'Les cas complexes arrivent directement aux bonnes personnes.',
      'Les agents se concentrent sur ce qui demande du jugement.',
      'La qualité est constante, traçable, documentée.',
    ],
    closing: 'L’IA répond au répétitif. Vos équipes traitent ce qui mérite un humain.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un agent de support cadré sur votre documentation interne, qui absorbe le niveau 1 et qualifie le reste — toujours sous supervision humaine, jamais en boîte noire.' },
      { _key: 's2', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'Un outil de pilotage du support qui orchestre l’agent, trace les réponses et donne à vos équipes la visibilité sur ce qui est automatisé.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Vos agents devront superviser l’IA avec aisance — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'L’IA va-t-elle parler directement à mes clients ?',
        reponse: 'Seulement sur ce que vous décidez de lui confier (demandes simples, documentées), et toujours avec une supervision possible. Vous choisissez le périmètre, on met les garde-fous. Rien ne part en autonomie totale sans votre accord explicite.' },
      { _key: 'q2', question: 'Que se passe-t-il si l’IA ne sait pas répondre ?',
        reponse: 'Elle est conçue pour reconnaître ses limites et escalader vers un humain plutôt que d’inventer. C’est un principe non négociable de notre conception : mieux vaut « je transfère » qu’une réponse fausse.' },
      { _key: 'q3', question: 'Sur quelles données l’agent s’appuie-t-il ?',
        reponse: 'Sur votre documentation validée (FAQ, procédures, base de connaissance), pas sur des données publiques aléatoires. Si la doc n’existe pas encore, on intègre sa structuration au projet.' },
      { _key: 'q4', question: 'Combien de temps pour déployer ?',
        reponse: '4 à 10 semaines selon la qualité de votre documentation existante et le périmètre. On commence par les demandes les plus fréquentes pour un effet rapide.' },
      { _key: 'q5', question: 'Mes agents vont-ils perdre leur poste ?',
        reponse: 'L’objectif est de leur retirer le répétitif, pas le métier. Ils montent vers les cas à valeur (rétention, sensible, complexe). On documente toujours le rôle humain dans la boucle.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-gagner-du-temps-commerciaux' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-organiser-connaissance-entreprise' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-industrialiser-traitement-documents' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à libérer votre service client **du répétitif** ?',
    sousTitre: '30 minutes pour identifier ce qui peut être absorbé sans dégrader la qualité, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Réduire la charge de votre service client avec l’IA | maria',
    description:
      'Votre support croule sous les demandes répétitives ? maria conçoit un agent IA cadré et supervisé qui absorbe le niveau 1, sans dégrader la qualité de service.',
  },
}

const BESOIN_3 = {
  _id: 'besoin-industrialiser-traitement-documents',
  _type: 'pageBesoin',
  titre: 'Industrialiser le traitement de documents',
  slug: { _type: 'slug', current: 'industrialiser-traitement-documents' },
  famille: 'productivite-operationnelle',
  ordreMenu: 3,
  introCourte:
    'Factures, contrats, candidatures, fiches techniques : on conçoit le pipeline qui lit, extrait, classe, avec validation humaine ciblée.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos équipes passent des heures à **lire, trier et ressaisir** des documents.',
    sousTitre:
      'Factures, contrats, candidatures, fiches techniques, comptes-rendus… L’information utile est là, mais enfouie dans des piles de documents que des humains dépouillent à la main. On industrialise ce traitement, avec validation humaine là où ça compte.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'L’information existe. Elle est juste prisonnière des documents.',
    paragraphes: [
      'Chaque entreprise reçoit, produit et stocke des volumes de documents : factures fournisseurs à rapprocher, contrats à analyser, CV à dépouiller, dossiers techniques à exploiter. L’information utile y est — mais pour l’en extraire, des collaborateurs lisent, recopient, classent, à la main, un par un.',
      'C’est un travail invisible, peu valorisant, et étonnamment coûteux. Il ralentit les processus (un dossier traité en jours plutôt qu’en heures), génère des erreurs de saisie, et mobilise des compétences sur des tâches qui n’en demandent aucune.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Des collaborateurs passent leurs journées à extraire des infos de PDF à la main.',
      'Le même document est lu, recopié et classé plusieurs fois par plusieurs personnes.',
      'Les délais de traitement dépendent du volume reçu, pas de la complexité réelle.',
      'Les erreurs de saisie se découvrent trop tard, en aval.',
      'Vous savez que c’est automatisable mais vous ne savez pas par où commencer.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Le traitement manuel coûte deux fois : en temps, et en erreurs.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Des journées entières mobilisées sur de la lecture et de la recopie, alors que le volume — pas la complexité — dicte la charge.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Personne ne s’épanouit en dépouillant des factures huit heures par jour. Ces postes sont difficiles à tenir et à fidéliser.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Un document traité en trois jours au lieu de trois heures, c’est un client qui attend, un fournisseur payé en retard, une décision repoussée. La lenteur a un prix.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On construit le pipeline qui lit, extrait, classe — et fait valider l’humain.',
    sousTitre: 'Pas une boîte noire qui décide seule : une chaîne traçable où l’humain garde le dernier mot sur ce qui compte.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Lecture et extraction automatiques',
        description: 'Les documents entrants sont lus, les informations clés extraites, structurées et prêtes à l’emploi.' },
      { _key: 'l2', icone: 'gear', titre: 'Classement et archivage',
        description: 'Chaque document est catégorisé et rangé automatiquement, retrouvable instantanément.' },
      { _key: 'l3', icone: 'shield', titre: 'Détection d’anomalies',
        description: 'Les incohérences (montant, date, clause inhabituelle) sont signalées pour contrôle humain.' },
      { _key: 'l4', icone: 'users', titre: 'Validation humaine ciblée',
        description: 'L’humain ne traite plus tout : il valide les cas signalés et les extractions sensibles. Le reste passe en flux.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble le traitement documentaire, une fois industrialisé.',
    avant: [
      'Les documents s’empilent en attendant qu’un humain les lise.',
      'L’info est recopiée à la main dans les outils métier.',
      'Le classement dépend de qui s’en occupe et comment.',
      'Les erreurs se découvrent en bout de chaîne.',
      'Le délai dépend du volume reçu, pas de l’urgence.',
    ],
    apres: [
      'Les documents sont lus et structurés dès réception.',
      'L’information remonte automatiquement dans les bons outils.',
      'Le classement est systématique, l’archive consultable.',
      'Les anomalies sont signalées avant qu’elles coûtent cher.',
      'L’humain se concentre sur le contrôle, pas la saisie.',
    ],
    closing: 'Le document entre, l’information utile en sort. L’humain valide, il ne dépouille plus.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un agent de lecture et d’extraction documentaire qui traite vos flux entrants, signale les anomalies et restitue l’information structurée — sous validation humaine sur les cas sensibles.' },
      { _key: 's2', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'L’outil qui connecte ce pipeline documentaire à vos systèmes métier (ERP, CRM, GED) pour que l’information extraite arrive directement là où elle sert.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Vos équipes superviseront le pipeline et traiteront les cas signalés — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Quels types de documents pouvez-vous traiter ?',
        reponse: 'Factures, contrats, bons de commande, CV, fiches techniques, comptes-rendus, courriers… La plupart des documents structurés ou semi-structurés. On évalue la faisabilité sur vos types réels dès le cadrage.' },
      { _key: 'q2', question: 'Que se passe-t-il si l’IA extrait une information fausse ?',
        reponse: 'La chaîne est conçue avec des points de validation humaine sur les extractions sensibles et les anomalies détectées. L’objectif n’est pas zéro humain, mais zéro saisie inutile — l’humain contrôle au lieu de tout dépouiller.' },
      { _key: 'q3', question: 'Faut-il que nos documents soient dans un format particulier ?',
        reponse: 'Non. Le pipeline gère des formats variés (PDF, scans, fichiers bureautiques). Pour les scans de mauvaise qualité, on évalue le taux de fiabilité et on adapte le niveau de contrôle humain.' },
      { _key: 'q4', question: 'Combien de temps pour mettre ça en place ?',
        reponse: '4 à 10 semaines selon les types de documents et le nombre d’intégrations métier. On démarre sur le flux le plus volumineux pour un retour rapide.' },
      { _key: 'q5', question: 'Nos documents contiennent des données sensibles. Comment c’est géré ?',
        reponse: 'Hébergement maîtrisé, isolation des données, traçabilité des traitements, conformité RGPD intégrée dès la conception. Le détail technique est partagé et contractualisé avant tout démarrage.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-reduire-charge-service-client' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-organiser-connaissance-entreprise' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-conformite-rgpd-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à industrialiser **votre traitement documentaire** ?',
    sousTitre: '30 minutes pour évaluer ce qui peut être automatisé sur vos flux réels, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Industrialiser le traitement de documents avec l’IA | maria',
    description:
      'Vos équipes dépouillent des documents à la main ? maria conçoit un pipeline IA qui lit, extrait, classe et archive, avec validation humaine sur les cas sensibles.',
  },
}

for (const doc of [BESOIN_1, BESOIN_2, BESOIN_3]) {
  await client.createOrReplace(doc)
  console.log(`✓ ${doc._id}`)
}

console.log('Done.')
