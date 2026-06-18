/**
 * Seed de l'article « Comment cartographier ses cas d'usage IA ? »
 *
 * Auteur : Mathieu HERNANDEZ — déjà présent en base sous l'_id `auteur-equipe-maria`
 * (convention historique : il signe au nom de l'équipe). Le rôle « Directeur de
 * conception » est précisé sur la `quoteAttribuee` côté article.
 * Catégorie : Méthode & gouvernance (`articleCategorie-methode-gouvernance`).
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-cartographie-cas-usage.mjs
 *
 * Idempotent : `createOrReplace` sur l'article.
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

/* ============================================================================
 * Helpers Portable Text — repris du template seed-article-agent-chatbot.mjs
 * ============================================================================ */

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { _type: 'span', _key: k('s'), text: part.slice(2, -2), marks: ['strong'] }
    }
    return { _type: 'span', _key: k('s'), text: part, marks: [] }
  })
}

const paragraph = (text) => ({
  _type: 'block', _key: k('p'), style: 'normal', markDefs: [], children: parseInline(text),
})

const h2 = (text) => ({
  _type: 'block', _key: k('h2'), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})

const blockquote = (text) => ({
  _type: 'block', _key: k('bq'), style: 'blockquote', markDefs: [], children: parseInline(text),
})

const numberedList = (items) =>
  items.map((t) => ({
    _type: 'block', _key: k('ln'), style: 'normal', listItem: 'number', level: 1,
    markDefs: [], children: parseInline(t),
  }))

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

/* ============================================================================
 * Article
 * ============================================================================ */

const ARTICLE = {
  _id: 'article-cartographier-cas-usage-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'comment-cartographier-ses-cas-usage-ia' },
  titre: 'Comment cartographier ses cas d’usage IA ?',
  sousTitre:
    'Avant de choisir un outil, il faut connaître ses process. La cartographie des cas d’usage est l’étape qui décide du reste.',
  intro:
    'Cartographier ses cas d’usage IA commence par une analyse des process, pas par un outil. C’est cette préparation qui conditionne le retour sur investissement.',
  publishedAt: '2026-06-17T10:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  /* ---- TL;DR ---- */
  tldr: [
    'La cartographie des cas d’usage IA est l’inventaire structuré des tâches où l’IA peut créer de la valeur. Elle précède tout choix d’outil.',
    'Un bon cas d’usage IA est fréquent, chronophage, à faible valeur humaine et appuyé sur des données exploitables.',
    'La méthode part des process réels, pas de l’organigramme : recenser, repérer les irritants, qualifier les données, prioriser.',
    'Encadrer l’IA commence dès la cartographie : un responsable, un objectif mesurable et des limites pour chaque cas d’usage.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Le constat'),
    paragraph(
      'Beaucoup d’entreprises veulent « faire de l’IA ». Elles choisissent un outil avant de connaître leur besoin. Le projet démarre, puis s’enlise. L’outil ne correspond à aucun usage réel.',
    ),
    paragraph(
      'La cause est presque toujours la même. Personne n’a cartographié les cas d’usage. L’étape de préparation a été sautée. On a confondu la technologie avec le problème à résoudre.',
    ),
    blockquote(
      'Sans cartographie, un projet IA répond à une question que personne ne s’est posée.',
    ),
    paragraph(
      'Cartographier ses cas d’usage n’est pas une formalité. C’est un travail d’analyse des process. Il précède le choix de tout outil. Il conditionne le retour sur investissement.',
    ),

    h2('Qu’est-ce que la cartographie des cas d’usage IA ?'),
    paragraph(
      'La cartographie des cas d’usage IA est l’inventaire structuré des tâches d’une entreprise où l’IA peut apporter un gain. Elle relie chaque usage potentiel à un process existant. Elle évalue son impact et sa faisabilité. Son but est de prioriser, pas de tout automatiser.',
    ),
    definition(
      'Cartographie des cas d’usage IA',
      'Inventaire structuré des tâches et process d’une organisation où l’IA peut créer de la valeur. Elle qualifie chaque usage selon son impact, sa faisabilité et son risque, pour décider quoi traiter en priorité.',
    ),
    paragraph(
      'Cette cartographie ne se fait pas en surface. Elle suppose de descendre dans le détail des process métier. On regarde comment le travail se fait réellement, pas comment il est censé se faire. C’est ce niveau de précision qui distingue un inventaire utile d’une liste de bonnes intentions.',
    ),

    h2('Comment identifier un cas d’utilisation de l’IA ?'),
    paragraph(
      'Un cas d’utilisation de l’IA se repère en observant le travail réel, pas l’organigramme. On cherche les tâches répétitives, chronophages et à faible valeur ajoutée humaine. On vérifie ensuite qu’il existe des données exploitables. Un bon cas d’usage est fréquent, coûteux en temps et mesurable.',
    ),
    paragraph(
      'Tous les irritants ne sont pas des cas d’usage IA. Certaines tâches relèvent d’un problème d’organisation, pas de technologie. D’autres exigent un jugement humain que l’IA ne doit pas prendre. Le tri se fait dès cette étape.',
    ),

    h2('Par où commencer la cartographie ?'),
    paragraph(
      'On commence par les process, pas par les outils. On documente comment le travail se fait, service par service. On liste les tâches, les irritants et les volumes. Cette base factuelle révèle où l’IA peut aider, et où elle ne sert à rien.',
    ),
    paragraph('La démarche suit une séquence simple :'),
    ...numberedList([
      '**Recenser les process** : décrire le travail réel de chaque équipe, étape par étape.',
      '**Repérer les irritants** : tâches répétitives, ressaisies, attentes, erreurs fréquentes.',
      '**Qualifier les données** : vérifier qu’elles existent, qu’elles sont accessibles et fiables.',
      '**Évaluer impact et faisabilité** : croiser le gain attendu et l’effort de mise en œuvre.',
      '**Prioriser** : classer les cas d’usage, traiter d’abord les gains rapides et sûrs.',
    ]),
    tableau({
      legende: 'Grille de qualification d’un cas d’usage IA',
      enTetes: ['Critère', 'Cas d’usage à prioriser', 'Cas d’usage à reporter'],
      lignes: [
        ['Fréquence de la tâche', 'Quotidienne, répétée', 'Ponctuelle, rare'],
        ['Valeur ajoutée humaine', 'Faible : saisie, tri', 'Forte : jugement, relation'],
        ['Données disponibles', 'Existantes et fiables', 'Absentes ou dispersées'],
        ['Effort de mise en œuvre', 'Modéré et cadré', 'Lourd et incertain'],
      ],
    }),
    paragraph(
      'Une grille de qualification simple suffit pour trancher entre les usages à traiter en premier et les autres.',
    ),
    callout(
      'À retenir',
      'Le bon point de départ d’un projet IA n’est pas l’outil, c’est la cartographie des process.',
    ),

    h2('Comment encadrer et contrôler l’utilisation de l’IA ?'),
    paragraph(
      'Encadrer l’IA commence dès la cartographie. Chaque cas d’usage reçoit un responsable, un objectif mesurable et des limites claires. Le contrôle repose sur des indicateurs de gain et de qualité, suivis dans le temps. Une règle simple : aucun usage n’est déployé sans qu’on sache qui le supervise et comment on mesure ses effets.',
    ),
    paragraph(
      'Ce cadre n’est pas une couche administrative ajoutée à la fin. Il fait partie de la cartographie elle-même. Définir qui contrôle un usage, c’est déjà décider s’il vaut la peine d’être lancé.',
    ),
    warning(
      'Point de vigilance',
      'Lancer des cas d’usage sans gouvernance crée l’effet inverse : des outils non suivis, des données mal utilisées et une perte de confiance des équipes.',
    ),

    h2('Ce que révèle une cartographie sérieuse'),
    paragraph(
      'Une cartographie sérieuse révèle souvent plus que des cas d’usage IA. Elle met à jour des process flous, des doublons, des étapes inutiles. Parfois, la meilleure décision n’est pas d’ajouter de l’IA. C’est de simplifier le process d’abord.',
    ),
    paragraph(
      'C’est aussi un moment d’alignement. Les équipes et la direction partagent enfin la même vue du travail réel. Cette vue commune vaut, à elle seule, l’effort de l’exercice.',
    ),
    avisMaria({
      texte:
        'La mode pousse à choisir un outil IA, puis à chercher où le brancher. Notre conviction est inverse. Le point de départ est l’audit des process, pas l’outil. Une connaissance fine du travail réel évite d’automatiser ce qui ne devrait pas exister.',
      signature: '— Mathieu HERNANDEZ',
    }),
    quoteAttribuee({
      texte:
        'Cartographier, c’est d’abord comprendre comment le travail se fait vraiment, avant de décider ce que l’IA doit changer.',
      auteur: 'Mathieu HERNANDEZ',
      role: 'Directeur de conception, maria',
    }),
    inArticleCta({
      titre: 'Cartographier vos cas d’usage avant d’investir',
      description:
        'Un audit des process pour identifier où l’IA crée de la valeur, et où elle n’en crée pas.',
      lienLibelle: 'Découvrir l’audit et stratégie IA →',
      lienHref: '/services/audit-et-strategie-ia',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Combien de temps prend une cartographie des cas d’usage IA ?',
      reponse:
        'La durée dépend de la taille de l’entreprise et du nombre de process. Pour une PME, un premier inventaire utile prend souvent quelques semaines. L’objectif n’est pas l’exhaustivité immédiate, mais une vision claire des priorités. La cartographie se met ensuite à jour au fil des projets.',
    },
    {
      _key: 'faq-2',
      question: 'Faut-il un outil spécifique pour cartographier ses cas d’usage ?',
      reponse:
        'Non. Un tableur structuré suffit pour démarrer. Ce qui compte est la méthode : décrire les process, qualifier chaque usage, croiser impact et faisabilité. L’outil vient après, une fois les priorités posées. Investir dans un logiciel avant d’avoir cartographié est une erreur fréquente.',
    },
    {
      _key: 'faq-3',
      question: 'Qui doit participer à la cartographie des cas d’usage IA ?',
      reponse:
        'Les personnes qui font le travail au quotidien, pas seulement la direction. Les équipes opérationnelles connaissent les irritants réels et les tâches chronophages. La direction apporte la vision et les priorités. Un regard extérieur aide à repérer les angles morts et les habitudes que plus personne ne questionne.',
    },
    {
      _key: 'faq-4',
      question: 'Quelle différence entre cartographie des cas d’usage et audit IA ?',
      reponse:
        'L’audit IA est plus large. Il évalue la maturité, les données, les compétences et les risques de l’organisation. La cartographie des cas d’usage est une étape de cet audit. Elle se concentre sur l’inventaire et la priorisation des usages concrets où l’IA peut aider.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Cartographier vos cas d’usage ?',
    description: '30 minutes pour identifier vos premiers cas d’usage IA, sans engagement.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Cartographie IA : identifier ses cas d’usage | maria',
    description:
      'Comment cartographier ses cas d’usage IA en entreprise : méthode, priorisation et gouvernance, à partir d’une analyse des process.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
