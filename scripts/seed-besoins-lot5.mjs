import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 2 besoins du Lot 5 — Gouvernance & conformité.
 *
 * NB : « Formation IA pour les équipes » est mentionné comme service
 * secondaire pour les 2 besoins, mais aucune pageService Formation n'existe
 * encore. On met Audit en card principale et une mention formation enrichie.
 */

const SERVICE_AUDIT = { _type: 'reference', _ref: 'pageService-audit-strategie-ia' }

const FORMATION_DEFAULT = {
  lienLibelle: 'formation IA pour les équipes',
  lienHref: '/services/audit-strategie-ia',
}

const BESOIN_11 = {
  _id: 'besoin-securiser-usage-ia',
  _type: 'pageBesoin',
  titre: 'Sécuriser l’usage de l’IA dans mon entreprise',
  slug: { _type: 'slug', current: 'securiser-usage-ia' },
  famille: 'gouvernance-conformite',
  ordreMenu: 1,
  introCourte:
    'L’IA circule sans cadre dans vos équipes ? On cartographie les usages, on sécurise les données, on construit une gouvernance claire — sans tout interdire.',

  hero: {
    surTitre: '// besoin',
    titre: 'L’IA circule déjà dans vos équipes. **Vous n’avez plus la main**.',
    sousTitre:
      'Outils non validés, données sensibles exposées, usages invisibles, dépendances qui s’installent. Reprendre le contrôle ne veut pas dire tout interdire. On vous aide à cadrer, sécuriser et gouverner l’IA — sans bloquer ceux qui en tirent de la valeur.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'L’usage a précédé la règle. C’est l’ordre normal — et le risque.',
    paragraphes: [
      'Dans presque toutes les entreprises, l’IA est entrée par le bas : un collaborateur a essayé un outil, ça a marché, ça s’est répandu. Personne n’a décidé, personne n’a cadré. Aujourd’hui, des données transitent par des outils non validés, des décisions s’appuient sur des résultats non vérifiés, et des dépendances se créent sans que personne ne les pilote.',
      'Le réflexe défensif — tout interdire — ne fonctionne pas : les usages continuent en cachette, et vous perdez en plus la visibilité. Le laisser-faire non plus : le risque s’accumule en silence. La seule voie tenable est de reprendre la main intelligemment : cadrer ce qui est permis, sécuriser ce qui doit l’être, gouverner sans étouffer.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vous ne savez pas précisément quels outils IA vos équipes utilisent.',
      'Des données internes ont probablement transité par des outils grand public.',
      'Aucun cadre clair ne dit ce qui est permis, recommandé ou interdit.',
      'Des dépendances à des outils non maîtrisés se sont installées.',
      'Vous hésitez entre interdire (inefficace) et laisser faire (risqué).',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Le vrai risque n’est pas l’IA. C’est l’IA non gouvernée.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Le temps qu’il faudra pour gérer l’incident qu’on aurait pu prévenir : fuite, erreur propagée, dépendance à défaire en urgence.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Des équipes dans le flou (« ai-je le droit ? »), une défiance qui s’installe, et des décisions prises sur des résultats que personne n’a vérifiés.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Une donnée stratégique exposée, une conformité prise en défaut, une dépendance subie — et le gain de l’IA bien gouvernée qui n’arrive jamais, par peur ou par désordre.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On vous redonne la main, sans casser ce qui marche.',
    sousTitre: 'Pas une politique répressive : un cadre clair, des usages sécurisés, une gouvernance qui protège sans étouffer.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Cartographie des usages réels',
        description: 'On identifie ce qui est utilisé, par qui, pour quoi, et où sont les vrais risques — avant de décider quoi que ce soit.' },
      { _key: 'l2', icone: 'gear', titre: 'Cadre d’usage clair',
        description: 'On définit avec vous ce qui est permis, recommandé, interdit : un cadre lisible, applicable, qui sort du flou.' },
      { _key: 'l3', icone: 'shield', titre: 'Sécurisation des données',
        description: 'On traite les expositions prioritaires : quelles données ne doivent jamais sortir, comment les protéger, quels outils valider.' },
      { _key: 'l4', icone: 'users', titre: 'Gouvernance durable',
        description: 'On met en place les règles, les responsabilités et les réflexes pour que le cadre vive dans le temps, pas dans un PDF oublié.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble l’usage de l’IA, une fois gouverné.',
    avant: [
      'Les usages IA sont invisibles et non cadrés.',
      'Des données sensibles circulent sans contrôle.',
      'Aucune règle claire, donc chacun fait à sa façon.',
      'Des dépendances s’installent sans pilotage.',
      'Le choix se résume à « interdire ou subir ».',
    ],
    apres: [
      'Les usages sont connus, cartographiés, suivis.',
      'Les données sensibles sont protégées par cadre.',
      'Une règle claire, partagée, applicable.',
      'Les dépendances sont identifiées et maîtrisées.',
      'L’IA est gouvernée : ni interdite, ni subie.',
    ],
    closing: 'Vous reprenez la main. Sans casser l’élan de ceux qui en tirent de la valeur.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AUDIT, numero: '01', ctaLibelle: 'Découvrir ce service',
        pitch: 'On cartographie les usages réels, on identifie les risques, et on construit avec vous un cadre de gouvernance clair, chiffré, applicable — pour reprendre la main sans étouffer.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Un cadre ne tient que si les équipes le comprennent et l’appliquent — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Faut-il interdire les outils IA grand public en attendant ?',
        reponse: 'Rarement la bonne réponse : l’interdiction pousse les usages dans l’ombre et vous fait perdre toute visibilité. Mieux vaut cadrer rapidement ce qui est permis et sécuriser le critique, puis affiner. On vous aide à arbitrer selon votre niveau de risque réel.' },
      { _key: 'q2', question: 'Par où commence-t-on concrètement ?',
        reponse: 'Par la cartographie : savoir ce qui est réellement utilisé, par qui, pour quoi. On ne peut pas gouverner ce qu’on ne voit pas. Cette étape révèle presque toujours des usages insoupçonnés.' },
      { _key: 'q3', question: 'Est-ce que ça va brider les équipes qui s’en servent bien ?',
        reponse: 'Non, c’est tout l’enjeu. Un bon cadre protège sans étouffer : il sécurise les usages à risque et légitime ceux qui apportent de la valeur. On conçoit pour habiliter, pas pour réprimer.' },
      { _key: 'q4', question: 'Avons-nous besoin d’un cadre si on est une petite structure ?',
        reponse: 'Oui, et c’est même plus simple à mettre en place tôt. Un cadre léger mais clair vaut mieux qu’un grand vide ou qu’une usine à gaz tardive. On dimensionne selon votre taille réelle.' },
      { _key: 'q5', question: 'Combien de temps pour avoir un cadre opérationnel ?',
        reponse: '3 à 6 semaines pour la cartographie et un premier cadre applicable, selon la taille de l’organisation et la dispersion des usages. La gouvernance s’affine ensuite dans le temps.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-conformite-rgpd-ia' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-former-equipes-ia' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-capitaliser-expertise-interne' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à reprendre la main sur l’IA, **sans tout bloquer** ?',
    sousTitre: '30 minutes pour évaluer votre exposition réelle et les premiers leviers de gouvernance, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Sécuriser l’usage de l’IA dans votre entreprise | maria',
    description:
      'L’IA circule sans cadre dans vos équipes ? maria cartographie les usages, sécurise les données et construit une gouvernance claire, sans tout interdire.',
  },
}

const BESOIN_12 = {
  _id: 'besoin-conformite-rgpd-ia',
  _type: 'pageBesoin',
  titre: 'Mettre en conformité RGPD mes projets IA',
  slug: { _type: 'slug', current: 'conformite-rgpd-ia' },
  famille: 'gouvernance-conformite',
  ordreMenu: 2,
  introCourte:
    'Vos projets IA traitent des données sans cadre RGPD ? On cartographie les traitements, on identifie les écarts et on priorise la mise en conformité.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos projets IA traitent des données. **Êtes-vous sûr d’être en règle ?**',
    sousTitre:
      'Données personnelles envoyées à des modèles tiers, traitements non documentés, bases légales floues, sous-traitants hors UE… Un projet IA mal cadré côté RGPD est une bombe à retardement. On vous aide à être conforme — avant que ça pose problème, pas après.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'L’IA accélère tout. Y compris les risques RGPD.',
    paragraphes: [
      'Un projet IA, c’est presque toujours du traitement de données : données clients dans un agent, données RH dans un outil de tri, documents internes dans un système d’extraction. Or ces traitements se mettent en place vite, souvent sans que la question RGPD soit posée au bon moment — c’est-à-dire avant, pas après.',
      'Les zones de risque sont nombreuses et mal connues : données personnelles envoyées à des modèles tiers, sous-traitants hors UE, base légale absente, durée de conservation non définie, droits des personnes non gérés. Tant que rien n’explose, ça reste invisible. Le jour où un client, un salarié ou la CNIL pose la question, il est tard.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vous avez des projets IA en cours ou prévus, sans analyse RGPD formelle.',
      'Des données personnelles transitent peut-être par des modèles tiers non cadrés.',
      'Vous ne savez pas si vos sous-traitants IA sont conformes ou hors UE.',
      'Les bases légales et durées de conservation ne sont pas clairement documentées.',
      'Vous savez que le sujet existe, mais il n’a jamais été traité sérieusement.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'La non-conformité ne coûte rien — jusqu’au jour où elle coûte tout.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Le temps d’une mise en conformité faite dans l’urgence, sous pression, vaut largement plus que celui d’un cadrage anticipé.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'L’inquiétude diffuse des équipes qui sentent le flou, et la position intenable du dirigeant qui sait que le sujet n’est pas traité.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Une sanction, une perte de confiance client, un projet à reconstruire parce qu’il était mal cadré dès le départ. Sans parler des projets non lancés par peur du risque mal évalué.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On rend vos projets IA conformes, par conception.',
    sousTitre: 'Pas une couche juridique posée à la fin : la conformité intégrée dès le cadrage, là où elle coûte le moins et protège le plus.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Cartographie des traitements',
        description: 'Quelles données, pour quel usage, via quels outils, vers quels sous-traitants : on rend visible ce qui se passe réellement.' },
      { _key: 'l2', icone: 'shield', titre: 'Analyse des risques RGPD',
        description: 'Bases légales, durées de conservation, transferts hors UE, droits des personnes : on identifie les écarts concrets.' },
      { _key: 'l3', icone: 'zap', titre: 'Mise en conformité priorisée',
        description: 'On traite d’abord ce qui expose le plus, avec des actions concrètes, pas un rapport théorique.' },
      { _key: 'l4', icone: 'gear', titre: 'Conformité by design',
        description: 'Pour les projets à venir, on intègre la conformité dès la conception, pour ne plus jamais réparer après coup.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble un projet IA, une fois la conformité maîtrisée.',
    avant: [
      'Les traitements de données ne sont pas cartographiés.',
      'Des données personnelles partent vers des outils non cadrés.',
      'Les bases légales et durées ne sont pas documentées.',
      'La conformité des sous-traitants est inconnue.',
      'Le sujet est repoussé jusqu’au prochain incident.',
    ],
    apres: [
      'Chaque traitement est cartographié et documenté.',
      'Les flux de données personnelles sont maîtrisés.',
      'Bases légales et durées sont définies et tracées.',
      'Les sous-traitants sont évalués et cadrés.',
      'La conformité est anticipée, pas subie.',
    ],
    closing: 'Vos projets IA avancent. Sans bombe à retardement dans les fondations.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AUDIT, numero: '01', ctaLibelle: 'Découvrir ce service',
        pitch: 'On cartographie vos traitements, on identifie les écarts RGPD concrets et on construit un plan de mise en conformité priorisé — documenté, actionnable, présentable à votre direction comme à la CNIL.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Beaucoup de risques RGPD viennent d’usages individuels mal informés — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Êtes-vous juristes ou avocats spécialisés RGPD ?',
        reponse: 'Non, et nous sommes clairs là-dessus : nous cadrons les aspects techniques et organisationnels des traitements IA (flux de données, sous-traitants, conception). Pour la validation juridique formelle, nous travaillons en complément de votre DPO ou de votre conseil juridique, pas à leur place.' },
      { _key: 'q2', question: 'Faut-il un DPO pour faire ce travail avec vous ?',
        reponse: 'Pas obligatoirement pour démarrer. On peut cartographier et identifier les risques techniques même sans DPO. En revanche, la validation finale et certaines décisions relèvent d’un DPO ou d’un conseil — on s’articule avec eux.' },
      { _key: 'q3', question: 'Peut-on auditer un projet IA déjà en production ?',
        reponse: 'Oui, et c’est fréquent. Beaucoup de projets ont été lancés sans cadrage RGPD. On analyse l’existant, on priorise les écarts les plus exposants, et on met en conformité sans forcément tout reconstruire.' },
      { _key: 'q4', question: 'Nos modèles IA sont américains. Est-ce rédhibitoire ?',
        reponse: 'Non, mais ça doit être cadré (transferts hors UE, garanties contractuelles, données concernées). On évalue précisément ce qui pose problème et on propose des alternatives ou des mesures d’encadrement adaptées.' },
      { _key: 'q5', question: 'Combien de temps pour une mise en conformité ?',
        reponse: '3 à 6 semaines pour la cartographie et un plan d’action priorisé, selon le nombre de traitements et leur complexité. La mise en œuvre s’étale ensuite selon les priorités identifiées.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-industrialiser-traitement-documents' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-trier-candidatures' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à sécuriser vos projets IA **avant que le RGPD vous rattrape** ?',
    sousTitre: '30 minutes pour évaluer votre exposition RGPD sur vos projets IA, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Mettre vos projets IA en conformité RGPD | maria',
    description:
      'Vos projets IA traitent des données sans cadre RGPD ? maria cartographie les traitements, identifie les écarts et construit un plan de mise en conformité priorisé.',
  },
}

for (const doc of [BESOIN_11, BESOIN_12]) {
  await client.createOrReplace(doc)
  console.log(`✓ ${doc._id}`)
}

console.log('Done.')
