import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const SERVICE_AUDIT = { _type: 'reference', _ref: 'pageService-audit-strategie-ia' }
const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }

const PAGE_FORMATION = {
  _id: 'pageFormation',
  _type: 'pageFormation',

  hero: {
    surTitre: '// formation',
    titre: 'Former vos équipes à l’IA. Pour qu’elles soient vraiment autonomes',
    sousTitre:
      'Pas une conférence théorique de plus. Des formations concrètes, ancrées dans vos métiers réels, qui donnent à vos équipes les bons réflexes — efficacité, sécurité, esprit critique. Et qui accompagnent chacun de nos projets.',
    ctaPrimaireLibelle: 'Parler de vos besoins de formation',
    ctaSecondaireLibelle: 'Voir nos formations',
  },

  audiences: {
    surTitre: '// pour qui',
    titre: 'Trois publics. Trois manières d’apprendre l’IA',
    cards: [
      {
        _key: 'a1',
        icone: 'compass',
        titre: 'Les décideurs',
        description:
          'Direction, COMEX, managers. Comprendre ce que l’IA change vraiment, savoir cadrer un projet, poser les bonnes questions, ne pas se tromper.',
      },
      {
        _key: 'a2',
        icone: 'users',
        titre: 'Les équipes métier',
        description:
          'Commerciaux, RH, marketing, ops, juridique. Utiliser l’IA dans son quotidien, avec méthode et en sécurité, sans devenir expert technique.',
      },
      {
        _key: 'a3',
        icone: 'wrench',
        titre: 'Les équipes projet',
        description:
          'Celles qui vont utiliser un outil ou un agent qu’on a conçu pour vous. Se l’approprier vraiment, pour qu’il serve au lieu de finir dans le placard.',
      },
    ],
  },

  constat: {
    surTitre: '// le constat',
    titre: 'L’IA est déjà là. La question n’est plus « si », mais « comment »',
    paragraphes: [
      'Vos équipes utilisent déjà l’IA. **Sans formation, sans cadre, souvent sans le dire.** Les résultats sont inégaux, les données parfois exposées, et l’écart se creuse entre ceux qui se débrouillent et ceux qui subissent.',
      'Le marché de la formation IA est saturé de promesses : des conférences inspirantes qui ne changent rien le lundi matin, des modules génériques déconnectés des métiers, des formations qui parlent de l’IA en général sans jamais parler de votre quotidien.',
      'Chez maria, on forme autrement. **Sur vos usages réels, pour vos métiers concrets,** avec une obsession : qu’après la formation, vos équipes fassent réellement les choses différemment. Pas qu’elles aient « assisté à une présentation ».',
    ],
  },

  catalogue: {
    surTitre: '// nos formations',
    titre: 'Trois familles. Cinq formations. Toutes adaptables',
    sousTitre:
      'Chaque formation est ajustée à votre contexte, vos métiers, votre niveau. Les durées indiquées sont des repères, pas des cases rigides.',
    familles: [
      {
        _key: 'fam1',
        label: '// décider',
        tagline: 'Cadrer un projet IA avant de se lancer',
        formations: [
          {
            _key: 'f01',
            numero: '01',
            titre: 'L’IA pour décideurs : comprendre, cadrer, ne pas se tromper',
            public: 'direction · comex · managers',
            description:
              'Comprendre ce que l’IA peut et ne peut pas faire, savoir cadrer un projet, identifier les risques, poser les bonnes questions à un prestataire.',
            duree: '½ à 1 journée',
          },
          {
            _key: 'f02',
            numero: '02',
            titre: 'Gouvernance et sécurité de l’IA en entreprise',
            public: 'direction · dsi · dpo · rssi',
            description:
              'Définir un cadre d’usage, comprendre les enjeux RGPD, gérer les risques, poser une politique IA interne claire et applicable.',
            duree: '1 journée',
          },
        ],
      },
      {
        _key: 'fam2',
        label: '// utiliser',
        tagline: 'Outiller le quotidien des équipes, avec méthode et sécurité',
        formations: [
          {
            _key: 'f03',
            numero: '03',
            titre: 'Bien utiliser l’IA dans son métier',
            public: 'équipes métier (par fonction)',
            description:
              'Usages concrets adaptés à chaque fonction (commerciale, RH, marketing, ops, juridique), bonnes pratiques, sécurité des données, esprit critique.',
            duree: '½ à 1 journée · déclinable par métier',
          },
          {
            _key: 'f04',
            numero: '04',
            titre: 'Maîtriser les outils IA conversationnels en sécurité',
            public: 'tous collaborateurs',
            description:
              'Formuler des demandes efficaces, vérifier les résultats, reconnaître une hallucination, et surtout : ce qu’on ne met jamais dans une IA.',
            duree: '½ journée',
          },
        ],
      },
      {
        _key: 'fam3',
        label: '// déployer',
        tagline: 'Ancrer un outil ou un agent dans les usages',
        formations: [
          {
            _key: 'f05',
            numero: '05',
            titre: 'Prise en main de votre outil ou agent IA',
            public: 'équipes utilisatrices du projet',
            description:
              'Pour les équipes qui vont utiliser un outil ou un agent qu’on a conçu pour vous. Adoption réelle, autonomie, bons réflexes. Intégrée au projet.',
            duree: 'variable · intégrée au déploiement',
          },
        ],
      },
    ],
  },

  pedagogie: {
    surTitre: '// notre pédagogie',
    titre: 'Une formation qu’on applique le lundi matin',
    sousTitre: 'Pas de théorie hors-sol. Quatre principes qui font la différence.',
    principes: [
      {
        _key: 'p01',
        numero: '01',
        titre: 'Ancrée dans vos métiers',
        description:
          'On part de vos cas réels, pas d’exemples génériques. La formation parle de votre quotidien, avec votre vocabulaire.',
      },
      {
        _key: 'p02',
        numero: '02',
        titre: 'Pratique avant tout',
        description:
          'On manipule, on teste, on se trompe en formation plutôt qu’en production. Moins de slides, plus de mains dans le cambouis.',
      },
      {
        _key: 'p03',
        numero: '03',
        titre: 'Sécurité par défaut',
        description:
          'Chaque formation intègre les réflexes de protection des données. Pas en annexe : au cœur.',
      },
      {
        _key: 'p04',
        numero: '04',
        titre: 'Autonomie, pas dépendance',
        description:
          'L’objectif n’est pas que vous ayez besoin de nous après. C’est que vos équipes sachent faire, seules, durablement.',
      },
    ],
  },

  formats: {
    surTitre: '// formats',
    titre: 'On s’adapte à votre organisation, pas l’inverse',
    cards: [
      {
        _key: 'fmt1',
        icone: 'grid',
        titre: 'Sur-mesure',
        description:
          'Chaque formation est ajustée à votre contexte, vos outils, votre niveau réel. Pas de catalogue rigide.',
      },
      {
        _key: 'fmt2',
        icone: 'building',
        titre: 'Intra-entreprise',
        description:
          'Vos équipes, vos cas, en groupe fermé. Le format le plus efficace pour ancrer des pratiques communes.',
      },
      {
        _key: 'fmt3',
        icone: 'monitor',
        titre: 'Présentiel ou distanciel',
        description:
          'Dans vos locaux, chez nous, ou à distance. Selon vos contraintes géographiques et d’organisation.',
      },
      {
        _key: 'fmt4',
        icone: 'chart',
        titre: 'Modulable',
        description:
          'De la demi-journée de sensibilisation au parcours en plusieurs sessions. On dimensionne selon l’objectif.',
      },
    ],
  },

  transversale: {
    surTitre: '// transversale',
    titre: 'La formation ne s’arrête pas à la formation',
    intro:
      'Un outil livré sans appropriation finit inutilisé. Un agent IA déployé sans équipe formée crée de la défiance. C’est pourquoi la formation accompagne naturellement chacun de nos projets.',
    liens: [
      {
        _key: 't1',
        service: SERVICE_AUDIT,
        numero: '01',
        pitch: 'La formation prolonge l’audit : un cadre, c’est mieux quand les équipes savent l’appliquer.',
      },
      {
        _key: 't2',
        service: SERVICE_OUTILS,
        numero: '02',
        pitch: 'Un outil bien conçu mérite des équipes qui le maîtrisent.',
      },
      {
        _key: 't3',
        service: SERVICE_AGENTS,
        numero: '03',
        pitch: 'Superviser un agent IA, ça s’apprend.',
      },
    ],
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur la formation.',
    questions: [
      {
        _key: 'q1',
        question: 'Vos formations sont-elles génériques ou adaptées à nos métiers ?',
        reponse:
          'Adaptées, systématiquement. Une formation pour des commerciaux n’est pas celle de juristes ou de RH. On construit le contenu à partir de vos usages réels et de votre vocabulaire, pas d’exemples hors-sol.',
      },
      {
        _key: 'q2',
        question: 'Nos équipes partent de zéro. Est-ce un problème ?',
        reponse:
          'Non, c’est le point de départ le plus fréquent. Les formations s’adaptent au niveau réel des participants. L’objectif n’est pas d’en faire des experts, mais des utilisateurs autonomes et lucides.',
      },
      {
        _key: 'q3',
        question: 'Et celles qui se croient déjà à l’aise ?',
        reponse:
          'Ce sont souvent elles qui ont le plus de mauvais réflexes, notamment sur la sécurité des données. La formation recadre les pratiques et apporte la méthode qui manque, même aux utilisateurs avancés.',
      },
      {
        _key: 'q4',
        question: 'Combien de temps dure une formation ?',
        reponse:
          'De la demi-journée de sensibilisation au parcours sur plusieurs sessions, selon le public et l’objectif. On dimensionne ensemble selon vos contraintes et le niveau d’autonomie visé.',
      },
      {
        _key: 'q5',
        question: 'La formation peut-elle accompagner un projet qu’on déploie avec vous ?',
        reponse:
          'Oui, c’est même fréquent et recommandé. La formation est transversale : elle accompagne le déploiement de nos outils et agents pour garantir leur adoption réelle, pas seulement leur livraison.',
      },
      {
        _key: 'q6',
        question: 'Intervenez-vous dans nos locaux ou à distance ?',
        reponse:
          'Les deux. Dans vos locaux, à distance, ou en format hybride, selon vos contraintes géographiques et d’organisation. On s’adapte à votre réalité.',
      },
    ],
  },

  ctaFinal: {
    surTitre: '// commencer',
    titre: 'Prêt à rendre vos équipes vraiment autonomes ?',
    sousTitre:
      '30 minutes pour cadrer un plan de formation adapté à vos métiers et vos enjeux. Sans engagement.',
    ctaPrimaireLibelle: 'Parler de vos besoins de formation',
    ctaSecondaireLibelle: 'Découvrir nos services',
    mention: 'Réponse sous 24 h · Sans engagement',
  },

  services: {
    surTitre: '// nos expertises',
    titre: 'La formation accompagne. Les services transforment',
    cards: [
      {
        _key: 'sv1',
        service: SERVICE_AUDIT,
        eyebrow: 'Service 01',
        pitch: 'Cadrer votre projet avant la première ligne de code.',
      },
      {
        _key: 'sv2',
        service: SERVICE_OUTILS,
        eyebrow: 'Service 02',
        pitch: 'Les plateformes que vos équipes utilisent au quotidien.',
      },
      {
        _key: 'sv3',
        service: SERVICE_AGENTS,
        eyebrow: 'Service 03',
        pitch: 'Les assistants qui travaillent aux côtés de vos équipes.',
      },
    ],
  },

  seo: {
    titre: 'Formation IA pour les équipes en entreprise | maria',
    description:
      'maria forme vos équipes et vos décideurs à l’IA : usages métier, sécurité des données, gouvernance. Des formations concrètes, ancrées dans votre réalité.',
  },
}

await client.createOrReplace(PAGE_FORMATION)
console.log(`✓ ${PAGE_FORMATION._id}`)
