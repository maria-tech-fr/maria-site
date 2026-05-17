import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 12 pages besoin.
 * - Un seul est COMPLET (gagner-du-temps-commerciaux) avec le contenu de la
 *   maquette HTML — il sert de témoin pour valider le rendu visuel.
 * - Les 11 autres sont des stubs (titre + slug + famille + ordre + intro courte
 *   uniquement). Ils alimentent le mega-menu et l'index /besoins, mais leurs
 *   pages individuelles restent à remplir via Sanity Studio.
 */

const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AUDIT = { _type: 'reference', _ref: 'pageService-audit-strategie-ia' }
// const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }

const STUBS = [
  // -- Productivité opérationnelle --
  { slug: 'reduire-charge-service-client', famille: 'productivite-operationnelle', ordreMenu: 2,
    titre: 'Réduire la charge du service client',
    introCourte: 'Le support croule sous les tickets répétitifs ? On automatise les réponses sans casser la relation client.' },
  { slug: 'industrialiser-traitement-documents', famille: 'productivite-operationnelle', ordreMenu: 3,
    titre: 'Industrialiser le traitement des documents',
    introCourte: 'Factures, contrats, fiches techniques : un pipeline IA qui lit, extrait, classe et archive.' },

  // -- Organisation & connaissance --
  { slug: 'organiser-connaissance-entreprise', famille: 'organisation-connaissance', ordreMenu: 1,
    titre: 'Organiser la connaissance de l’entreprise',
    introCourte: 'Le savoir interne est partout — et donc nulle part. On bâtit une base interrogeable par l’équipe.' },
  { slug: 'faciliter-onboarding', famille: 'organisation-connaissance', ordreMenu: 2,
    titre: 'Faciliter l’onboarding des nouveaux',
    introCourte: 'Un assistant IA qui répond aux questions du nouveau, 24/7, à partir de votre documentation.' },
  { slug: 'capitaliser-expertise-interne', famille: 'organisation-connaissance', ordreMenu: 3,
    titre: 'Capitaliser l’expertise interne',
    introCourte: 'L’expert part en retraite avec 30 ans de tour de main dans la tête. On capture avant qu’il soit trop tard.' },

  // -- Pilotage & décision --
  { slug: 'vision-claire-donnees-metier', famille: 'pilotage-decision', ordreMenu: 1,
    titre: 'Avoir une vision claire de vos données métier',
    introCourte: 'Vos données existent. Mais personne ne les regarde. On en fait des tableaux de bord utiles.' },
  { slug: 'alertes-intelligentes', famille: 'pilotage-decision', ordreMenu: 2,
    titre: 'Mettre en place des alertes intelligentes',
    introCourte: 'Quand une métrique sort de sa norme, l’IA prévient la bonne personne au bon moment.' },

  // -- RH & formation --
  { slug: 'trier-candidatures', famille: 'rh-formation', ordreMenu: 1,
    titre: 'Trier les candidatures intelligemment',
    introCourte: 'On filtre, on classe, on résume — sans biais, sans boîte noire, avec une décision humaine au bout.' },
  { slug: 'former-equipes-ia', famille: 'rh-formation', ordreMenu: 2,
    titre: 'Former les équipes à l’usage de l’IA',
    introCourte: 'Pas un MOOC. Des ateliers concrets, sur vos cas d’usage, avec des outils que vos équipes utilisent déjà.' },

  // -- Gouvernance & conformité --
  { slug: 'securiser-usage-ia', famille: 'gouvernance-conformite', ordreMenu: 1,
    titre: 'Sécuriser l’usage de l’IA dans l’entreprise',
    introCourte: 'ChatGPT circule dans les équipes — vous voulez reprendre la main, proprement, sans tout interdire.' },
  { slug: 'conformite-rgpd-ia', famille: 'gouvernance-conformite', ordreMenu: 2,
    titre: 'Mettre l’IA en conformité RGPD',
    introCourte: 'Audit, cartographie, documentation : ce que la CNIL attend de vous quand l’IA touche aux données personnelles.' },
]

const TEMOIN = {
  _id: 'besoin-gagner-du-temps-commerciaux',
  _type: 'pageBesoin',
  titre: 'Gagner du temps sur des tâches répétitives',
  slug: { _type: 'slug', current: 'gagner-du-temps-commerciaux' },
  famille: 'productivite-operationnelle',
  ordreMenu: 1,
  introCourte: 'Saisies, relances, copier-coller, mises à jour de tableaux — tout ce qui mange les journées sans valeur.',

  hero: {
    surTitre: '// besoin',
    titre: 'Mes équipes perdent un temps fou sur des **tâches répétitives**',
    sousTitre:
      'Saisies, copier-coller, relances, mises à jour de tableaux… Tout ce que vos collaborateurs font « parce qu’il faut bien le faire » alors que la machine pourrait s’en charger. On regarde ça ensemble, sans déshumaniser le travail.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le travail utile est englouti par les **tâches sans valeur**.',
    paragraphes: [
      'Chaque entreprise a sa version du problème : les commerciaux qui ressaisissent leurs notes dans le CRM, les RH qui jonglent entre cinq fichiers Excel pour un onboarding, le service client qui retape trois fois la même réponse, la finance qui passe ses vendredis à rapprocher des lignes.',
      'Ce n’est ni glamour, ni stratégique, mais ça mange du temps, de l’énergie et de l’attention. Et tant que ces tâches restent invisibles, personne ne se demande comment les supprimer.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vos équipes passent plus de temps à reporter ce qu’elles font qu’à le faire.',
      'Les mêmes informations sont saisies 3 fois dans 3 outils différents.',
      'Les rapports hebdo prennent deux jours à compiler, et personne ne les lit vraiment.',
      'Les nouveaux arrivants mettent des mois à comprendre « qui fait quoi ».',
      'Vous savez qu’il faut faire le ménage, mais personne n’a le temps de s’y mettre.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Le prix réel n’est pas dans le temps perdu. Il est ailleurs.',
    items: [
      {
        _key: 'c1',
        icone: 'time',
        titre: 'Le coût en temps',
        description:
          'Des heures par semaine, par personne, dépensées sur des tâches qui n’apportent rien — ni au client, ni à l’entreprise, ni à celui qui les fait.',
      },
      {
        _key: 'c2',
        icone: 'human',
        titre: 'Le coût humain',
        description:
          'Démotivation, perte de sens, sentiment de stagner. Les meilleurs profils partent en premier — précisément ceux que vous voulez garder.',
      },
      {
        _key: 'c3',
        icone: 'opportunity',
        titre: 'Le coût d’opportunité',
        description:
          'Pendant qu’on remplit des tableaux, on ne parle pas aux clients, on n’imagine pas de nouvelles offres, on ne forme pas les équipes. C’est ce qui ne se voit pas qui coûte le plus.',
      },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On commence par regarder. Puis on automatise ce qui a du sens.',
    sousTitre:
      'Pas de promesse magique : un diagnostic concret, puis des leviers IA choisis pour leur rapport bénéfice / risque, pas pour leur effet vitrine.',
    leviers: [
      {
        _key: 'l1',
        icone: 'search',
        titre: 'Cartographier les tâches',
        description:
          'On observe le terrain, on identifie les tâches répétitives à fort volume et faible valeur ajoutée.',
      },
      {
        _key: 'l2',
        icone: 'sparkles',
        titre: 'Automatiser sans casser',
        description:
          'On construit des agents IA et des connecteurs sûrs qui s’intègrent à vos outils existants, sans tout réinventer.',
      },
      {
        _key: 'l3',
        icone: 'shield',
        titre: 'Sécuriser les données',
        description:
          'RGPD, hébergement maîtrisé, gestion des accès : on traite vos données comme on traiterait les nôtres.',
      },
      {
        _key: 'l4',
        icone: 'users',
        titre: 'Embarquer les équipes',
        description:
          'On forme, on documente, on rend l’outil utilisable par tous — sinon il finit dans le placard.',
      },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble un mois normal, une fois le sujet réglé.',
    avant: [
      'Vendredi après-midi = compilation de rapports.',
      'Les commerciaux remplissent le CRM le dimanche soir.',
      'Les RH retapent les mêmes infos dans 4 outils.',
      'Le service client copie-colle 30 réponses types par jour.',
      'Les nouveaux arrivants tâtonnent pendant 6 semaines.',
    ],
    apres: [
      'Les rapports se génèrent seuls le vendredi matin.',
      'Le CRM se met à jour à partir des emails et appels.',
      'L’onboarding RH est piloté depuis un seul écran.',
      'Le service client supervise une IA qui répond pour lui.',
      'Les nouveaux sont opérationnels en 10 jours.',
    ],
    closing: '« Le temps libéré ne disparaît pas. Il revient sur ce qui fait vraiment le métier. »',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      {
        _key: 's1',
        service: SERVICE_OUTILS,
        numero: '02',
        pitch:
          'On conçoit l’outil IA qui vient se brancher sur vos process existants et qui absorbe les tâches répétitives à votre place — sans imposer un nouvel outil de plus à apprendre.',
        ctaLibelle: 'Découvrir ce service',
      },
      {
        _key: 's2',
        service: SERVICE_AUDIT,
        numero: '01',
        pitch:
          'Avant d’automatiser, on cartographie. Quels processus prioriser, quel ROI attendre, quels risques anticiper : un cadre clair, chiffré, actionnable.',
        ctaLibelle: 'Découvrir ce service',
      },
    ],
    formationMention: {
      texte:
        'Vos équipes auront besoin d’être à l’aise avec l’outil au quotidien — la formation IA pour les équipes peut accompagner ce déploiement.',
      lienLibelle: 'formation IA pour les équipes',
      lienHref: '/services/audit-strategie-ia',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      {
        _key: 'q1',
        question: 'Est-ce que vos équipes vont se sentir « remplacées » ?',
        reponse:
          'C’est la première question qu’on pose, justement. Notre approche consiste à automatiser les tâches que personne n’a envie de faire — pas les métiers. Les équipes restent décisionnaires sur ce que l’IA produit, et on documente toujours le rôle humain dans la boucle.',
      },
      {
        _key: 'q2',
        question: 'Combien de temps pour voir les premiers résultats ?',
        reponse:
          'Sur un premier cas d’usage cadré, on vise 4 à 8 semaines entre le premier atelier et un outil en production utilisé au quotidien. Le calendrier complet dépend du nombre de processus à traiter et du niveau d’intégration souhaité.',
      },
      {
        _key: 'q3',
        question: 'Est-ce que nos données restent confidentielles ?',
        reponse:
          'Oui — c’est un préalable, pas une option. On privilégie des modèles hébergés en Europe, on isole vos données, on contractualise les usages. Et on partage le détail technique avant tout démarrage.',
      },
      {
        _key: 'q4',
        question: 'Faut-il déjà avoir un CRM, un ERP ou des outils en place ?',
        reponse:
          'Non. On s’adapte à l’écosystème existant — du tableur partagé à la stack outillée. Si rien n’est en place, on commence par identifier les flux minimaux à stabiliser avant d’introduire de l’IA.',
      },
      {
        _key: 'q5',
        question: 'Et si l’outil cesse d’être utile dans 6 mois ?',
        reponse:
          'On conçoit chaque automatisation pour qu’elle puisse évoluer, être documentée et reprise par d’autres. Vous gardez la propriété de ce qu’on construit — pas de boîte noire, pas de dépendance forcée.',
      },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-vision-claire-donnees-metier' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-industrialiser-traitement-documents' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Et si on regardait ce qu’on peut vous **enlever des épaules** ?',
    sousTitre:
      '30 minutes au téléphone. On part de votre quotidien, pas du nôtre. Si on n’est pas le bon partenaire, on vous le dit franchement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Gagner du temps sur des tâches répétitives — Besoin | maria',
    description:
      'Vos équipes croulent sous les tâches répétitives ? maria identifie ce qui peut être automatisé, sécurisé et fiabilisé par l’IA — sans déshumaniser le travail.',
  },
}

// 1) Crée les stubs en premier — nécessaire pour que les références du témoin
//    pointent vers des docs existants.
console.log('Création des 11 stubs…')
for (const stub of STUBS) {
  const _id = `besoin-${stub.slug}`
  await client.createIfNotExists({
    _id,
    _type: 'pageBesoin',
    titre: stub.titre,
    slug: { _type: 'slug', current: stub.slug },
    famille: stub.famille,
    ordreMenu: stub.ordreMenu,
    introCourte: stub.introCourte,
  })
  console.log(`  ✓ ${_id}`)
}

// 2) Crée (ou met à jour) le témoin complet.
console.log('Upsert du témoin gagner-du-temps-commerciaux…')
await client.createOrReplace(TEMOIN)
console.log(`  ✓ ${TEMOIN._id}`)

console.log('Done.')
