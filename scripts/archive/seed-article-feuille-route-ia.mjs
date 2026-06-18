/**
 * Seed de l'article « Audit IA : comment construire sa feuille de route ? »
 *
 * Auteur : Alexandre BRU (Directeur technique) — déjà en base.
 * Catégorie : Stratégie IA (`articleCategorie-strategie-ia`).
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-feuille-route-ia.mjs
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
  _id: 'article-audit-ia-construire-feuille-de-route',
  _type: 'article',
  slug: { _type: 'slug', current: 'audit-ia-comment-construire-feuille-de-route' },
  titre: 'Audit IA : comment construire sa feuille de route ?',
  sousTitre:
    'Une feuille de route IA part de deux questions : d’où vient l’entreprise, où veut-elle aller. L’outil ne vient qu’après.',
  intro:
    'Construire une feuille de route IA commence par un état des lieux honnête et un cap clair. L’IA n’est utile que si on sait ce qu’on attend d’elle.',
  publishedAt: '2026-06-17T11:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-alexandre-bru' },

  /* ---- TL;DR ---- */
  tldr: [
    'Une feuille de route IA relie l’état actuel de l’entreprise à ses objectifs. Elle ordonne des décisions dans le temps, pas une liste d’outils.',
    'Avant tout projet, on analyse quatre dimensions : les process, les données, les compétences et l’infrastructure.',
    'On commence par le cap, pas par la technologie. L’écart entre objectifs et état des lieux dessine les priorités.',
    'Une feuille de route se pilote et se révise. Le cap reste le repère, l’outil reste la variable.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Le constat'),
    paragraph(
      'L’IA est partout dans les discours. Les dirigeants subissent une pression à « s’y mettre ». Beaucoup lancent des projets sans cap. Ils achètent un outil et espèrent un résultat.',
    ),
    paragraph(
      'Le problème n’est pas l’outil. C’est l’absence de direction. Une entreprise qui ignore où elle va ne peut pas savoir ce que l’IA doit lui apporter. Elle avance au gré des démonstrations.',
    ),
    blockquote('L’IA n’est puissante que si on sait ce qu’on attend d’elle.'),
    paragraph(
      'Une feuille de route corrige cela. Elle part de deux questions simples. D’où venons-nous ? Où voulons-nous aller ? Sans ces réponses, aucun investissement IA ne tient dans la durée.',
    ),

    h2('Qu’est-ce qu’une feuille de route IA ?'),
    paragraph(
      'Une feuille de route IA est un plan séquencé qui relie l’état actuel d’une entreprise à ses objectifs. Elle définit quels usages traiter, dans quel ordre et avec quels moyens. Elle ne liste pas des outils. Elle organise des décisions dans le temps.',
    ),
    definition(
      'Feuille de route IA',
      'Plan séquencé qui relie la situation actuelle d’une organisation à ses objectifs. Elle priorise les cas d’usage, fixe les étapes, les responsables et les indicateurs, et précise les prérequis techniques avant tout déploiement.',
    ),
    paragraph(
      'Une feuille de route IA n’est pas figée. Elle se révise. Mais elle donne une direction stable, partagée par la direction et les équipes. C’est ce repère commun qui évite les projets dispersés.',
    ),

    h2('Comment analyser son entreprise vis-à-vis de l’IA ?'),
    paragraph(
      'Analyser son entreprise vis-à-vis de l’IA, c’est dresser un état des lieux honnête avant tout projet. On examine quatre dimensions : les process, les données, les compétences et l’infrastructure. Cet état des lieux dit ce qui est possible aujourd’hui, et ce qui ne l’est pas encore.',
    ),
    paragraph(
      'Les données sont souvent le point faible. Une IA utile a besoin de données accessibles et fiables. Si elles sont dispersées ou de mauvaise qualité, aucun outil ne compensera. C’est le premier point à vérifier.',
    ),
    paragraph(
      'Les compétences et l’infrastructure comptent autant. Qui pilotera les usages au quotidien ? Les systèmes peuvent-ils se connecter entre eux ? Ces réponses conditionnent le calendrier et le coût réel.',
    ),
    warning(
      'Point de vigilance',
      'Construire une feuille de route IA sans état des lieux des données mène à des promesses intenables et à des projets bloqués en cours de route.',
    ),

    h2('Construire votre feuille de route IA : par où commencer ?'),
    paragraph(
      'On commence par le cap, pas par la technologie. On clarifie les objectifs de l’entreprise, puis on confronte l’état des lieux à ces objectifs. L’écart entre les deux dessine les priorités. La feuille de route ordonne ensuite ces priorités en étapes réalistes.',
    ),
    paragraph('La démarche suit une séquence claire :'),
    ...numberedList([
      '**Fixer le cap** : définir les objectifs de l’entreprise, pas des objectifs « IA » abstraits.',
      '**Dresser l’état des lieux** : process, données, compétences, infrastructure.',
      '**Mesurer l’écart** : comparer la situation actuelle aux objectifs visés.',
      '**Prioriser les usages** : retenir d’abord les gains rapides et sûrs.',
      '**Séquencer** : fixer des étapes, des responsables et des indicateurs.',
      '**Prévoir la révision** : programmer des points de revue réguliers.',
    ]),
    callout(
      'À retenir',
      'Une feuille de route IA se construit dans l’ordre : d’abord le cap, ensuite l’état des lieux, enfin les outils.',
    ),

    h2('Une feuille de route n’est pas une liste d’outils'),
    paragraph(
      'Beaucoup confondent feuille de route et catalogue de logiciels. Les deux n’ont rien à voir. Un catalogue répond à la question « quoi acheter ». Une feuille de route répond à « pourquoi, dans quel ordre, pour quel résultat ».',
    ),
    tableau({
      legende: 'Sans vs avec feuille de route — les écarts qui comptent',
      enTetes: ['Critère', 'Sans feuille de route', 'Avec feuille de route'],
      lignes: [
        ['Point de départ', 'Un outil à la mode', 'Les objectifs de l’entreprise'],
        ['Choix des usages', 'Au gré des démonstrations', 'Par priorité et faisabilité'],
        ['Mesure des résultats', 'Floue ou absente', 'Indicateurs définis à l’avance'],
        ['Risque principal', 'Projets abandonnés', 'Effort concentré sur l’utile'],
      ],
    }),
    paragraph('La différence ne tient pas aux outils, mais à l’ordre des décisions.'),
    avisMaria({
      texte:
        'La mode pousse à démarrer par l’outil IA le plus visible. Notre conviction est inverse. On part de la base : comment l’entreprise fonctionne, et où elle veut aller. L’outil n’arrive qu’ensuite, au service d’un objectif clair.',
      signature: '— Alexandre BRU',
    }),

    h2('Faire vivre la feuille de route'),
    paragraph(
      'Une feuille de route n’est pas un document d’archive. Elle se pilote. Chaque étape se mesure. Les résultats réels ajustent la suite.',
    ),
    paragraph(
      'La technologie évolue vite. Les objectifs, eux, bougent moins. C’est pourquoi le cap reste le repère, et l’outil la variable. Réviser la feuille de route ne signifie pas en changer à chaque nouveauté.',
    ),
    quoteAttribuee({
      texte:
        'Une feuille de route IA ne sert pas à prédire la technologie, mais à garder le cap quand elle change.',
      auteur: 'Alexandre BRU',
      role: 'Directeur technique, maria',
    }),
    inArticleCta({
      titre: 'Construire votre feuille de route IA',
      description:
        'Un audit pour situer votre entreprise et définir les étapes utiles, avant tout investissement.',
      lienLibelle: 'Découvrir l’audit et stratégie IA →',
      lienHref: '/services/audit-et-strategie-ia',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Combien de temps faut-il pour construire une feuille de route IA ?',
      reponse:
        'La durée dépend de la taille de l’entreprise et de la maturité de ses données. Pour une PME, une première feuille de route se construit souvent en quelques semaines. L’enjeu n’est pas un document parfait, mais une direction claire et des premières étapes réalistes. Elle s’affine ensuite avec les retours du terrain.',
    },
    {
      _key: 'faq-2',
      question: 'Faut-il une feuille de route IA quand on est une petite entreprise ?',
      reponse:
        'Oui, surtout dans une petite structure. Les moyens y sont limités, donc chaque investissement compte davantage. Une feuille de route évite de dépenser dans un outil qui ne sert à rien. Elle concentre l’effort sur les usages à réel impact.',
    },
    {
      _key: 'faq-3',
      question: 'Quelle différence entre un audit IA et une feuille de route IA ?',
      reponse:
        'L’audit IA établit l’état des lieux : process, données, compétences et risques. La feuille de route est l’étape suivante. Elle transforme ce constat en plan d’action séquencé. L’un décrit la situation, l’autre trace le chemin à suivre.',
    },
    {
      _key: 'faq-4',
      question: 'À quelle fréquence réviser sa feuille de route IA ?',
      reponse:
        'Une à deux fois par an suffit dans la plupart des cas. On révise aussi après chaque étape importante ou changement de priorité de l’entreprise. L’objectif est d’ajuster le chemin, pas de tout recommencer à chaque nouveauté technologique.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Construire votre feuille de route ?',
    description: '30 minutes pour situer votre point de départ et tracer les prochaines étapes.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Feuille de route IA : par où commencer ? | maria',
    description:
      'Comment construire une feuille de route IA en entreprise : état des lieux, priorisation des usages et étapes, avant tout choix d’outil.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
