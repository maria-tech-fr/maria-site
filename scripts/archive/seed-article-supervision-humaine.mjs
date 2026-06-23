/**
 * Seed de l'article « Supervision humaine, le seul vrai garde-fou des agents IA en entreprise »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — déjà en base.
 * Catégorie : Méthode & gouvernance (`articleCategorie-methode-gouvernance`)
 * — l'article traite avant tout du cadrage / gouvernance des agents, pas de
 * leur définition technique (qui était l'angle de l'article témoin Agents IA).
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-supervision-humaine.mjs
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
  _id: 'article-supervision-humaine-agents-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'supervision-humaine-agents-ia-entreprise' },
  titre: 'Supervision humaine, le seul vrai garde-fou des agents IA en entreprise',
  sousTitre:
    'Un agent IA déployé sans contrôle n’est pas un gain de productivité, c’est un risque. Voici pourquoi maria garde toujours l’humain dans la boucle.',
  intro:
    'Beaucoup d’éditeurs vendent des agents IA « autonomes ». Chez maria, l’agent agit dans un périmètre, l’humain garde la main. Explication.',
  publishedAt: '2026-06-17T12:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'Un agent IA exécute des tâches, là où une IA conversationnelle se limite à répondre. Cette capacité d’action est précisément ce qui impose une supervision.',
    'L’autonomie totale d’un agent IA n’est pas un objectif chez maria. C’est un risque à cadrer.',
    'La supervision humaine se conçoit dès la phase de cadrage, pas après le premier incident.',
    'Un agent IA bien conçu augmente une équipe support ou marketing. Il ne la remplace pas.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Le constat'),
    paragraph(
      'Le marché parle d’agents IA « autonomes ». L’argument séduit. Une machine qui traite seule les demandes clients, rédige seule les réponses, déclenche seule les actions. Sur le papier, la promesse est claire.',
    ),
    paragraph(
      'Dans les faits, l’autonomie totale crée plus de problèmes qu’elle n’en résout. Un agent qui agit sans contrôle peut répondre à côté, engager l’entreprise, ou propager une erreur à grande échelle. Le gain de temps devient alors un coût de réparation.',
    ),
    blockquote(
      'Un agent qui agit vite et seul ne fait pas gagner du temps, il déplace le risque.',
    ),
    paragraph(
      'C’est là que la supervision humaine entre en jeu. Pas comme une contrainte ajoutée. Comme une condition de conception. Pour un responsable SAV ou un directeur marketing, la question n’est pas « jusqu’où l’agent peut aller seul ». La vraie question est « où l’humain doit garder la décision ».',
    ),

    h2('Que sont les agents IA ?'),
    paragraph(
      'Un agent IA est un programme capable d’enchaîner des actions pour atteindre un objectif donné. Il ne se contente pas de répondre. Il interroge un outil, met à jour une fiche, rédige un message, déclenche une étape suivante. C’est cette capacité à agir qui le distingue d’une simple IA conversationnelle.',
    ),
    definition(
      'Agent IA',
      'Programme qui combine compréhension du langage et accès à des outils pour exécuter des tâches en plusieurs étapes. Il agit, là où une IA conversationnelle se limite à informer. Sa valeur vient de son périmètre d’action, pas de son indépendance.',
    ),
    paragraph(
      'Cette différence change tout. Une réponse erronée d’un chatbot reste une réponse. Une action erronée d’un agent modifie une donnée, envoie un message, ou engage l’entreprise. Le niveau de vigilance n’est donc pas le même.',
    ),

    h2('Pourquoi l’autonomie totale d’un agent IA est un faux objectif'),
    paragraph(
      'L’autonomie totale se vend bien. Elle se gouverne mal. Un agent livré sans supervision concentre trois risques. Il peut se tromper sans que personne le voie. Il peut agir hors de son périmètre prévu. Il peut répéter la même erreur à chaque sollicitation.',
    ),
    paragraph(
      'Le bon réglage n’est pas binaire. Un agent n’est pas « autonome » ou « inutile ». Il opère à un niveau d’autonomie choisi, tâche par tâche. Certaines actions sont déléguées sans relecture. D’autres exigent une validation humaine avant exécution.',
    ),
    tableau({
      legende: 'IA conversationnelle vs agent IA supervisé — ce qui change pour l’entreprise',
      enTetes: ['Critère', 'IA conversationnelle', 'Agent IA supervisé'],
      lignes: [
        ['Capacité', 'Répond et informe', 'Exécute des tâches'],
        ['Effet d’une erreur', 'Une mauvaise réponse', 'Une action engagée'],
        ['Rôle de l’humain', 'Lit et corrige le ton', 'Valide les actions sensibles'],
        ['Périmètre', 'Base documentaire', 'Outils et données métier'],
      ],
    }),
    paragraph('Plus l’IA agit, plus la supervision devient structurante.'),
    warning(
      'Point de vigilance',
      'Déléguer une action sensible à un agent sans point de validation expose l’entreprise à une erreur répétée à l’échelle, et non à une erreur isolée.',
    ),

    h2('Comment maria cadre la supervision'),
    paragraph(
      'La supervision ne s’ajoute pas après coup. Elle se décide au moment du cadrage. Avant d’écrire la moindre ligne, maria distingue ce qui peut être délégué de ce qui doit rester humain. Cette grille structure toute la conception.',
    ),
    paragraph('Concrètement, le cadrage suit une logique simple.'),
    ...numberedList([
      '**Identifier les tâches répétitives à faible enjeu**, candidates à la délégation.',
      '**Isoler les actions à fort enjeu**, qui exigent une validation humaine.',
      '**Définir un point d’arrêt clair** avant toute action irréversible.',
      '**Tracer chaque action de l’agent**, pour la rendre vérifiable.',
      '**Prévoir un retour humain rapide** en cas de doute de l’agent.',
    ]),
    paragraph(
      'Ce cadre n’est pas une perte de productivité. C’est ce qui rend l’agent utilisable en production. Un agent supervisé fait gagner du temps sur le travail répétitif. Il laisse à l’équipe les décisions qui demandent du jugement.',
    ),
    callout(
      'À retenir',
      'La supervision humaine ne ralentit pas l’agent IA, elle le rend déployable en production.',
    ),
    quoteAttribuee({
      texte:
        'L’autonomie d’un agent n’est pas un objectif technique, c’est une décision de gouvernance qui appartient à l’entreprise.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Quel est le meilleur agent IA pour mon service ?'),
    paragraph(
      'Le meilleur agent IA n’est pas le plus autonome, c’est le mieux cadré pour votre métier. Pour un service après-vente, l’enjeu est la fiabilité des réponses et la traçabilité des actions. Pour le marketing, c’est la cohérence de la marque et le contrôle de ce qui est publié. Le bon agent est celui dont le périmètre épouse vos contraintes réelles.',
    ),
    paragraph(
      'Aucun outil générique ne répond à cette exigence par défaut. Un agent pertinent s’appuie sur vos données, vos process, et vos points de validation. C’est un travail de conception, pas un achat sur étagère.',
    ),
    avisMaria({
      texte:
        'La mode pousse vers des agents toujours plus autonomes, vendus comme un remplacement des équipes. Notre conviction est inverse. L’autonomie d’un agent doit rester un choix de conception supervisé, jamais un argument commercial. Un agent IA augmente vos équipes. Il ne décide pas à leur place.',
      signature: '— Matthieu SEILLER',
    }),

    h2('Ce que la supervision change pour le SAV et le marketing'),
    paragraph(
      'Pour un responsable SAV, un agent supervisé traite le travail invisible. Il qualifie les demandes, prépare les réponses, met à jour les dossiers. Le conseiller garde la décision sur les cas sensibles. Le temps libéré retourne vers le client.',
    ),
    paragraph(
      'Pour un directeur marketing, la logique est identique. L’agent produit des premières versions, organise la donnée, accélère la routine. La validation humaine protège la marque sur ce qui est publié. L’IA conversationnelle informe, l’agent agit, l’humain arbitre.',
    ),
    paragraph(
      'Dans les deux cas, la supervision n’est pas un frein. C’est ce qui permet de confier des tâches à un agent sans confier le risque avec.',
    ),
    inArticleCta({
      titre: 'Cadrer un agent IA supervisé pour votre service',
      description:
        '30 minutes pour distinguer ce qui peut être délégué de ce qui doit rester humain.',
      lienLibelle: 'Concevoir un outil interne sur mesure →',
      lienHref: '/services/outils-IA-internes-sur-mesure',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Quels sont les principaux types d’agents IA en entreprise ?',
      reponse:
        'On distingue surtout les agents de support, les agents de traitement documentaire, et les agents d’aide à la rédaction. Les premiers qualifient et orientent les demandes clients. Les deuxièmes extraient et structurent de la donnée. Les troisièmes préparent des contenus relus par un humain. Tous gagnent à être cadrés sur un périmètre métier précis plutôt que vendus comme des outils universels.',
    },
    {
      _key: 'faq-2',
      question: 'Un agent IA peut-il fonctionner sans supervision humaine ?',
      reponse:
        'Techniquement, oui. En pratique, c’est rarement souhaitable en entreprise. Sans supervision, une erreur de l’agent se propage à chaque sollicitation, sans qu’aucun humain ne la détecte. La supervision ne vise pas à brider l’agent. Elle vise à garder la maîtrise des actions qui engagent l’entreprise. C’est pourquoi maria conçoit toujours un point de validation sur les actions sensibles.',
    },
    {
      _key: 'faq-3',
      question: 'Qui doit superviser un agent IA dans une PME ?',
      reponse:
        'La supervision revient à l’équipe métier concernée, pas au service informatique seul. Pour un agent SAV, ce sont les conseillers qui valident les cas sensibles. Pour un agent marketing, c’est l’équipe qui contrôle ce qui est publié. Le rôle de maria est de rendre cette supervision simple, traçable, et intégrée au quotidien de l’équipe.',
    },
    {
      _key: 'faq-4',
      question: 'Combien de temps faut-il pour déployer un agent IA supervisé ?',
      reponse:
        'Le délai dépend du périmètre et de l’accès aux données métier. Un agent au périmètre restreint se met en place plus vite qu’un agent multitâche connecté à plusieurs outils. maria recommande de commencer petit, sur une tâche à fort volume et faible enjeu, puis d’élargir une fois la supervision rodée. Cette approche progressive réduit le risque et accélère la mise en production réelle.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Un agent IA supervisé pour votre service ?',
    description: '30 minutes pour cadrer le périmètre et les points de validation.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Supervision des agents IA en entreprise | maria',
    description:
      'Pourquoi un agent IA ne doit jamais être autonome. Le rôle de la supervision humaine, et comment maria cadre son déploiement.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
