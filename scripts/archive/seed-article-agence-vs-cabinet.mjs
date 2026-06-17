/**
 * Seed de l'article « Cabinet de conseil IA ou agence IA : comment choisir ? »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — déjà présent en base.
 * Catégorie : Stratégie IA (`articleCategorie-strategie-ia`).
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-agence-vs-cabinet.mjs
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
  _id: 'article-agence-ia-ou-cabinet-conseil-comment-choisir',
  _type: 'article',
  slug: { _type: 'slug', current: 'agence-ia-ou-cabinet-conseil-comment-choisir' },
  titre: 'Cabinet de conseil IA ou agence IA : comment choisir ?',
  sousTitre:
    'La distinction entre conseil et exécution s’efface. La vraie question n’est plus de choisir un camp, mais d’évaluer une capacité.',
  intro:
    'Cabinet ou agence IA : la frontière entre recommandation et exécution se réduit. Le bon réflexe n’est plus de trancher, mais de regarder ce que le prestataire sait vraiment livrer.',
  publishedAt: '2026-06-17T09:00:00.000Z',
  readingTime: 5,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'La distinction classique oppose le cabinet de conseil IA, qui recommande, et l’agence IA, qui exécute. Cette frontière se réduit.',
    'Une agence IA conçoit et déploie des outils internes. Un cabinet de conseil cadre la stratégie. Les deux métiers convergent désormais.',
    'Choisir un prestataire IA sur son étiquette est une erreur. Ce qui compte est sa capacité à cadrer et à livrer dans le même mouvement.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Le constat'),
    paragraph(
      'Un directeur innovation pose souvent la même question. Faut-il un cabinet de conseil ou une agence IA ? La réponse semblait évidente il y a cinq ans. Elle l’est de moins en moins.',
    ),
    paragraph(
      'Le cabinet vendait de la recommandation. Des audits, des feuilles de route, des présentations. L’agence vendait de l’exécution. Du code, des intégrations, des outils en production. Deux métiers, deux factures, deux moments du projet.',
    ),
    blockquote('La frontière entre conseil et exécution n’a jamais été aussi fine.'),
    paragraph(
      'Cette séparation reposait sur une hypothèse simple. Concevoir et construire étaient deux mondes distincts. L’IA a réduit la distance entre les deux. Un cadrage qui ne débouche sur rien perd sa valeur. Une exécution sans cadrage produit des outils que personne n’utilise.',
    ),

    h2('Qu’est-ce qu’une agence IA ?'),
    paragraph(
      'Une agence IA est un prestataire qui conçoit et déploie des solutions d’intelligence artificielle pour une organisation. Elle ne se limite pas au conseil. Elle construit des outils concrets : agents, automatisations, outils internes sur mesure. Son livrable est un système qui fonctionne, pas un rapport.',
    ),
    definition(
      'Agence IA',
      'Prestataire qui conçoit et met en production des solutions d’intelligence artificielle pour une organisation. Elle couvre le cadrage, la conception et le déploiement. Son livrable est un outil utilisé au quotidien, pas une recommandation.',
    ),
    paragraph(
      'Le cabinet de conseil IA, lui, intervient surtout en amont. Il analyse les usages, priorise les cas, estime les gains. Historiquement, il s’arrêtait avant la mise en œuvre. C’est précisément ce partage des rôles qui se brouille aujourd’hui.',
    ),

    h2('Cabinet de conseil ou agence IA : où est passée la frontière ?'),
    paragraph(
      'La frontière s’efface parce que l’IA raccourcit le cycle entre la décision et la réalisation. Un prototype se construit désormais en jours, plus en mois. Un cabinet qui ne sait pas montrer un résultat concret perd en crédibilité. Une agence qui ne sait pas cadrer livre des outils inutiles. Les deux métiers se rejoignent au milieu.',
    ),
    tableau({
      legende: 'Cabinet de conseil IA vs agence IA — les écarts qui s’estompent',
      enTetes: ['Critère', 'Cabinet de conseil IA', 'Agence IA'],
      lignes: [
        ['Point de départ', 'Stratégie et priorisation', 'Besoin opérationnel concret'],
        ['Livrable historique', 'Feuille de route, recommandations', 'Outil en production'],
        ['Risque principal', 'Conseils jamais appliqués', 'Outils livrés mais inutilisés'],
        ['Compétence empruntée', 'Sait désormais prototyper', 'Sait désormais cadrer'],
      ],
    }),
    paragraph(
      'La ligne « compétence empruntée » illustre la convergence des deux métiers.',
    ),
    callout(
      'À retenir',
      'Conseil et exécution ne sont plus deux étapes séparées, mais deux faces d’un même travail.',
    ),

    h2('Pourquoi le choix n’a plus le même sens'),
    paragraph(
      'Le risque d’un cabinet pur est connu. Il remet une feuille de route, puis disparaît. Les recommandations restent dans un fichier. Personne ne les applique. Le gain reste théorique.',
    ),
    paragraph(
      'Le risque d’une agence pure est l’inverse. Elle construit vite, mais sans cadrage. L’outil sort en production. Il ne répond pas au bon besoin. Les équipes ne l’adoptent pas.',
    ),
    paragraph(
      'La convergence corrige ces deux travers. Un prestataire utile cadre et construit dans le même mouvement. Il teste une idée avant de l’industrialiser. Il ajuste à partir d’un usage réel, pas d’une hypothèse.',
    ),
    warning(
      'Point de vigilance',
      'Choisir un prestataire IA sur son étiquette, « cabinet » ou « agence », fait passer à côté du vrai critère : sa capacité à penser et à livrer dans le même geste.',
    ),
    avisMaria({
      texte:
        'La mode pousse à opposer le conseil et l’exécution, comme deux achats distincts. Notre conviction est inverse. Cadrer sans savoir construire mène à des recommandations mortes. Construire sans savoir cadrer mène à des outils abandonnés. Le métier utile fait les deux.',
      signature: '— Matthieu SEILLER',
    }),
    quoteAttribuee({
      texte:
        'La vraie question n’est plus de choisir un camp, mais de vérifier qui sait penser et livrer dans le même geste.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Ce qu’il faut vraiment évaluer'),
    paragraph(
      'Plutôt que l’étiquette, regardez quatre points. Ils valent pour un cabinet comme pour une agence IA.',
    ),
    ...numberedList([
      '**La capacité à cadrer** : le prestataire sait-il prioriser les cas d’usage et dire non aux mauvais ?',
      '**La capacité à livrer** : a-t-il déjà mis des outils en production, pas seulement des présentations ?',
      '**La place de vos équipes** : l’outil augmente-t-il le travail interne, ou prétend-il le remplacer ?',
      '**La gouvernance** : qui supervise, qui décide, comment mesure-t-on les gains ?',
    ]),
    paragraph(
      'Ces quatre points disent l’essentiel. Le label « cabinet » ou « agence » n’en dit presque rien. Le bon partenaire passe de la stratégie à l’outil sans changer d’interlocuteur.',
    ),
    inArticleCta({
      titre: 'Cadrer votre projet IA avant de choisir un prestataire',
      description:
        '30 minutes pour clarifier vos cas d’usage et le périmètre, avant tout engagement.',
      lienLibelle: 'Découvrir l’audit et stratégie IA →',
      lienHref: '/services/audit-et-strategie-ia',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Quelle différence entre une agence IA et une agence digitale classique ?',
      reponse:
        'Une agence digitale conçoit des sites, des applications et des campagnes. Une agence IA conçoit des solutions d’intelligence artificielle : agents, automatisations, outils internes. Le périmètre technique diffère. Une agence IA travaille sur des modèles, des données et des intégrations métier, pas seulement sur une interface.',
    },
    {
      _key: 'faq-2',
      question: 'Une agence IA peut-elle remplacer mon équipe interne ?',
      reponse:
        'Non, et ce n’est pas son rôle. Une agence IA sérieuse conçoit des outils qui augmentent le travail des équipes. Elle retire les tâches répétitives pour libérer du temps utile. Si un prestataire promet de remplacer vos équipes, c’est un signal d’alerte sur sa compréhension du sujet.',
    },
    {
      _key: 'faq-3',
      question: 'Faut-il commencer par un audit ou directement par un outil ?',
      reponse:
        'Cela dépend de votre maturité. Si les cas d’usage sont déjà clairs et priorisés, un prototype peut démarrer vite. Si le besoin reste flou, un audit court évite de construire le mauvais outil. Dans les deux cas, le cadrage et la construction gagnent à être tenus par le même partenaire.',
    },
    {
      _key: 'faq-4',
      question: 'Comment évaluer la fiabilité d’un prestataire IA ?',
      reponse:
        'Demandez des outils en production, pas des démonstrations. Vérifiez qu’il sait expliquer ses choix techniques en termes simples. Regardez comment il parle de la place des équipes humaines. Un prestataire fiable mesure les gains, documente ses décisions et accepte d’être supervisé.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Cabinet ou agence ?',
    description: 'Plutôt que choisir un camp, cadrons votre besoin en 30 minutes.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Agence IA ou cabinet de conseil : comment choisir ? | maria',
    description:
      'Agence IA ou cabinet de conseil IA : la frontière s’efface. Comment évaluer un prestataire IA au-delà de l’étiquette, et à quel prix.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
