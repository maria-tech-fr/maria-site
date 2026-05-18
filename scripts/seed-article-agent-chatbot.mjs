/**
 * Seed de l'article témoin « Faut-il un agent IA ou un simple chatbot ? Comment choisir. »
 *
 * Crée :
 *   - l'auteur Alexandre BRU (Directeur technique) si absent
 *   - l'article complet avec tous les blocs riches du nouveau gabarit GEO
 *     (TLDR, relatedOffers, keyTakeaways, FAQ + nouveaux blocs body :
 *      definition, tableau, avisMaria, quoteAttribuee + callouts existants)
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-agent-chatbot.mjs
 *
 * Idempotent : `createOrReplace` sur l'article, `createIfNotExists` sur l'auteur.
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN',
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

/* ============================================================================
 * Helpers de construction Portable Text
 * ============================================================================ */

/** Compteur global pour générer des _key uniques. */
let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

/** Paragraphe simple. `text` peut contenir des marqueurs **gras** convertis en mark strong. */
function paragraph(text) {
  return {
    _type: 'block',
    _key: k('p'),
    style: 'normal',
    markDefs: [],
    children: parseInline(text),
  }
}

function h2(text) {
  return {
    _type: 'block',
    _key: k('h2'),
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
  }
}

function blockquote(text) {
  return {
    _type: 'block',
    _key: k('bq'),
    style: 'blockquote',
    markDefs: [],
    children: parseInline(text),
  }
}

function bulletList(items) {
  return items.map((t) => ({
    _type: 'block',
    _key: k('li'),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: parseInline(t),
  }))
}

function numberedList(items) {
  return items.map((t) => ({
    _type: 'block',
    _key: k('ln'),
    style: 'normal',
    listItem: 'number',
    level: 1,
    markDefs: [],
    children: parseInline(t),
  }))
}

/** Inline parser minimal : **gras** uniquement. */
function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return {
        _type: 'span',
        _key: k('s'),
        text: part.slice(2, -2),
        marks: ['strong'],
      }
    }
    return { _type: 'span', _key: k('s'), text: part, marks: [] }
  })
}

function callout(titre, texte) {
  return { _type: 'callout', _key: k('co'), titre, texte }
}

function warning(titre, texte) {
  return { _type: 'warning', _key: k('wa'), titre, texte }
}

function avisMaria({ titre, texte, signature }) {
  const out = { _type: 'avisMaria', _key: k('am'), texte }
  if (titre) out.titre = titre
  if (signature) out.signature = signature
  return out
}

function definition(terme, def) {
  return { _type: 'definition', _key: k('df'), terme, definition: def }
}

function tableau({ legende, enTetes, lignes }) {
  return {
    _type: 'tableau',
    _key: k('tb'),
    ...(legende ? { legende } : {}),
    enTetes,
    lignes: lignes.map((cellules) => ({
      _type: 'ligne',
      _key: k('lg'),
      cellules,
    })),
  }
}

function quoteAttribuee({ texte, auteur, role }) {
  return {
    _type: 'quoteAttribuee',
    _key: k('qa'),
    texte,
    auteur,
    ...(role ? { role } : {}),
  }
}

function inArticleCta({ titre, description, lienLibelle, lienHref, variant = 'yellow' }) {
  return {
    _type: 'inArticleCta',
    _key: k('cta'),
    titre,
    description,
    lienLibelle,
    lienHref,
    variant,
  }
}

/* ============================================================================
 * Auteur Alexandre BRU
 * ============================================================================ */

const AUTEUR_ALEXANDRE = {
  _id: 'auteur-alexandre-bru',
  _type: 'auteur',
  nom: 'Alexandre BRU',
  role: 'Directeur technique',
  bio: 'Alexandre dirige la technique chez maria. Il cadre les projets d’IA des PME et ETI françaises avec une obsession : la supervision humaine et la juste maille — pas plus d’IA que nécessaire, jamais moins.',
}

/* ============================================================================
 * Article témoin
 * ============================================================================ */

const ARTICLE = {
  _id: 'article-agent-ia-ou-chatbot-comment-choisir',
  _type: 'article',
  slug: { _type: 'slug', current: 'agent-ia-ou-chatbot-comment-choisir' },
  titre: 'Faut-il un agent IA ou un simple chatbot ? Comment choisir.',
  sousTitre:
    'Les deux mots sont utilisés comme des synonymes. Ils ne le sont pas — et confondre les deux est l’une des erreurs les plus coûteuses qu’on voit sur les projets IA. Voici comment trancher, sans jargon.',
  intro:
    'Agent IA, chatbot : deux mots qu’on confond, deux réalités différentes. Comment choisir le bon, sans sur-vente ni sous-dimensionnement.',
  publishedAt: '2026-05-18T09:00:00.000Z',
  readingTime: 7,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-agents-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-alexandre-bru' },

  /* ---- TL;DR (GEO ★) ---- */
  tldr: [
    'Un chatbot suit un script : il répond à des questions prévues, dans un cadre fermé. Un agent IA poursuit un objectif : il comprend une demande, agit sur plusieurs étapes, utilise des outils, et s’adapte.',
    'La bonne question n’est pas « lequel est le plus moderne ? » mais « ai-je besoin de répondre, ou d’agir ? ».',
    'Un chatbot suffit pour informer (FAQ, horaires, statut de commande). Un agent IA est nécessaire pour exécuter (qualifier, rédiger, déclencher, traiter un dossier de bout en bout).',
    'Un agent IA coûte plus cher, demande plus de cadrage et exige une supervision humaine. Le sur-dimensionner est aussi coûteux que le sous-dimensionner.',
    'La plupart des entreprises ont besoin d’un agent sur un périmètre précis, pas d’un chatbot partout ni d’un agent autonome sur tout.',
  ],

  /* ---- Offres liées (maillage business) ---- */
  relatedOffers: [
    { _key: 'ro-1', label: 'Agents IA', href: '/services/agents-ia', kind: 'service' },
    { _key: 'ro-2', label: 'Réduire la charge de mon service client', href: '/besoins/reduire-charge-service-client', kind: 'besoin' },
    { _key: 'ro-3', label: 'Outils internes sur-mesure', href: '/services/outils-internes-sur-mesure', kind: 'service' },
  ],

  /* ---- Body ---- */
  body: [
    /* ===== Section 1 — Le constat ===== */
    h2('Le constat'),
    paragraph(
      'La scène est presque toujours la même. Une entreprise nous dit : « On voudrait un chatbot IA pour le service client. » On creuse trois minutes, et on découvre qu’elle ne veut pas du tout un chatbot : elle veut un système qui comprend une demande, va chercher l’information dans plusieurs outils, et règle le problème du client. Ça, ce n’est pas un chatbot. C’est un agent.',
    ),
    paragraph(
      'L’inverse arrive tout aussi souvent : on nous demande « un agent IA autonome » pour ce qui se résout très bien avec un bon arbre de réponses. Dans les deux cas, l’erreur de catégorie coûte cher — en budget, en délai, et en déception.',
    ),
    blockquote(
      'Le mot qu’on emploie pour décrire son besoin détermine le devis qu’on reçoit. Mieux vaut employer le bon.',
    ),
    paragraph(
      'Cet article pose la distinction proprement, sans jargon, et vous donne une grille de décision applicable avant même de parler à un prestataire.',
    ),

    /* ===== Section 2 — Chatbot (H2-question) ===== */
    h2('Qu’est-ce qu’un chatbot, exactement ?'),
    paragraph(
      'Un chatbot est un système conversationnel qui répond à des questions dans un cadre prédéfini. Il fonctionne sur la base de scénarios, de règles ou d’une base de connaissances fermée. Il est excellent pour informer, orienter, répondre à des questions fréquentes — mais il ne décide pas et n’agit pas au-delà de ce qui a été prévu.',
    ),
    definition(
      'Chatbot',
      'Programme conversationnel conçu pour répondre à des questions dans un périmètre défini à l’avance, à partir de règles ou d’une base documentaire. Il informe ; il n’exécute pas de tâche complexe en autonomie.',
    ),
    paragraph(
      'Un bon chatbot reste un outil utile et souvent suffisant. Les cas où il est le bon choix :',
    ),
    ...bulletList([
      'Répondre aux questions fréquentes (horaires, politique de retour, suivi de commande).',
      'Orienter un visiteur vers la bonne page ou le bon interlocuteur.',
      'Donner une information stable et documentée, disponible 24/7.',
    ]),
    paragraph(
      'Ses limites apparaissent dès qu’il faut sortir du script : comprendre une demande formulée de travers, croiser plusieurs sources, ou enchaîner des actions. Là, le chatbot atteint son plafond.',
    ),
    warning(
      'Point de vigilance',
      'Beaucoup de « chatbots IA » vendus aujourd’hui sont en réalité des FAQ habillées d’un modèle de langage. Ça peut suffire — mais si on vous le facture comme un projet IA complexe, le rapport valeur/prix n’y est pas. Demandez toujours : « qu’est-ce qu’il fait que ma FAQ ne fait pas ? »',
    ),

    /* ===== Section 3 — Agent IA (H2-question) ===== */
    h2('Qu’est-ce qu’un agent IA, exactement ?'),
    paragraph(
      'Un agent IA est un système qui poursuit un objectif : il interprète une demande, planifie des étapes, utilise des outils ou des données, agit, et adapte son comportement en fonction du résultat. Là où le chatbot répond, l’agent fait. Il ne suit pas un script figé : il raisonne sur la marche à suivre dans un cadre que vous avez défini.',
    ),
    definition(
      'Agent IA',
      'Système autonome ou semi-autonome qui poursuit un objectif en plusieurs étapes : il comprend une demande, mobilise des outils et des données, exécute des actions, et ajuste sa démarche. Il agit, sous un cadre et une supervision définis.',
    ),
    paragraph(
      'Concrètement, un agent IA peut : qualifier une demande entrante et la router, préparer un dossier en allant chercher l’information dans plusieurs systèmes, rédiger un premier livrable, déclencher une action dans un outil métier, ou traiter un cas de bout en bout en escaladant à un humain quand il atteint ses limites.',
    ),
    callout(
      'À retenir',
      'La différence n’est pas une question de « niveau de technologie ». C’est une question de nature de la tâche : un chatbot répond à une question, un agent accomplit un objectif. Tout le reste découle de là.',
    ),

    /* ===== Section 4 — Différences concrètes (H2-question + tableau) ===== */
    h2('Agent IA ou chatbot : quelle différence concrète ?'),
    paragraph(
      'La différence concrète tient en une phrase : un chatbot informe dans un cadre fermé, un agent IA agit pour atteindre un objectif. Le tableau ci-dessous résume les écarts qui comptent quand on doit choisir.',
    ),
    tableau({
      legende: 'Chatbot vs agent IA — les écarts qui comptent',
      enTetes: ['Critère', 'Chatbot', 'Agent IA'],
      lignes: [
        ['Finalité', 'Répondre à une question', 'Atteindre un objectif'],
        ['Fonctionnement', 'Script / règles / base fermée', 'Raisonnement multi-étapes'],
        ['Capacité d’action', 'Informe', 'Agit, déclenche, traite'],
        ['Accès aux outils', 'Limité ou nul', 'Connecté aux systèmes métier'],
        ['Adaptabilité', 'Faible (hors script = échec)', 'Élevée (s’ajuste au contexte)'],
        ['Supervision requise', 'Légère', 'Forte et structurée'],
        ['Coût & délai', 'Plus faibles', 'Plus élevés'],
        ['Risque principal', 'Trop limité pour le besoin', 'Sur-dimensionné, mal cadré'],
      ],
    }),
    avisMaria({
      texte:
        'La mode pousse tout le monde vers « l’agent autonome ». Notre conviction est inverse : la plupart des besoins se règlent avec un agent étroitement cadré sur un périmètre précis, pas avec un agent qui décide de tout. L’autonomie n’est pas un objectif, c’est un curseur — et le bon réglage est presque toujours plus bas que ce qu’on vous vendra.',
    }),

    /* ===== Section 5 — Comment savoir (H2-question + liste numérotée) ===== */
    h2('Comment savoir lequel il vous faut ?'),
    paragraph(
      'Posez-vous une seule question : avez-vous besoin de répondre à quelque chose, ou d’agir sur quelque chose ? Si la valeur attendue est « la bonne information, au bon moment », un chatbot suffit probablement. Si la valeur attendue est « la tâche est faite », il vous faut un agent.',
    ),
    paragraph('Voici la grille de décision qu’on applique en cadrage :'),
    ...numberedList([
      'La demande a-t-elle une réponse stable et documentée ? Si oui → chatbot probablement suffisant.',
      'Faut-il croiser plusieurs sources ou outils pour répondre ? Si oui → on bascule vers l’agent.',
      'Une action concrète doit-elle être déclenchée (créer, router, rédiger, mettre à jour) ? Si oui → agent.',
      'Le cas comporte-t-il des variantes imprévisibles ? Si oui → agent (un script ne tiendra pas).',
      'Une erreur a-t-elle des conséquences sérieuses ? Si oui → agent avec supervision humaine renforcée, jamais en autonomie totale.',
    ]),
    quoteAttribuee({
      texte:
        'La question qu’on nous pose, c’est « agent ou chatbot ? ». La vraie question, c’est « qu’est-ce qui doit se passer quand l’utilisateur a fini de parler ? ». S’il attend une réponse, c’est un chatbot. S’il attend que quelque chose soit fait, c’est un agent. Tout le cadrage découle de cette phrase.',
      auteur: 'Alexandre BRU',
      role: 'Directeur technique, maria',
    }),
    warning(
      'Point de vigilance',
      'Le piège classique : choisir l’agent « pour voir plus grand », puis se retrouver avec un système puissant mais non supervisé, que personne n’ose mettre en production. Un agent sans cadre de supervision n’est pas un agent avancé : c’est un risque non maîtrisé.',
    ),
    inArticleCta({
      titre: 'Pas sûr de la catégorie de votre besoin ?',
      description:
        'C’est exactement ce qu’on tranche en cadrage. 30 minutes pour y voir clair.',
      lienLibelle: 'Réserver un échange →',
      lienHref: '/contact',
      variant: 'yellow',
    }),

    /* ===== Section 6 — Coût & délai (H2-question) ===== */
    h2('Combien ça change, côté coût et délai ?'),
    paragraph(
      'Un agent IA coûte significativement plus qu’un chatbot, parce qu’il demande plus de cadrage, des connexions aux systèmes métier, et un dispositif de supervision. Un chatbot documentaire se déploie vite et reste modeste en budget. Un agent engage une vraie conception : périmètre, garde-fous, points de validation humaine, traçabilité.',
    ),
    paragraph(
      'Ce qui fait varier le coût d’un agent, ce n’est pas « l’IA » en soi, mais : le nombre d’outils à connecter, le niveau de criticité (donc de supervision), et l’étendue du périmètre. C’est pourquoi nous recommandons presque toujours de démarrer sur un périmètre étroit : un cas, bien cadré, supervisé, plutôt qu’un agent tentaculaire mal maîtrisé.',
    ),
    callout(
      'À retenir',
      'Sous-dimensionner (un chatbot là où il faut un agent) gaspille le projet : il ne règle pas le vrai problème. Sur-dimensionner (un agent autonome là où un chatbot suffit) gaspille le budget et crée un risque. Le bon choix n’est pas le plus ambitieux : c’est le plus juste.',
    ),
  ],

  /* ---- Synthèse finale ---- */
  keyTakeaways: [
    'Chatbot = répondre. Agent IA = agir. C’est la distinction fondatrice, tout en découle.',
    'La bonne question n’est pas « lequel est le plus moderne ? » mais « ai-je besoin d’une réponse ou d’une action ? ».',
    'Un chatbot suffit pour l’information stable et documentée. Un agent est nécessaire dès qu’il faut croiser des sources, s’adapter ou exécuter.',
    'Un agent IA exige toujours un périmètre cadré et une supervision humaine : l’autonomie est un curseur, pas un objectif.',
    'Le bon choix est le plus juste, pas le plus ambitieux. Sur-dimensionner coûte aussi cher que sous-dimensionner.',
  ],

  /* ---- FAQ finale (alimente schema FAQPage avec les H2-questions) ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Un agent IA peut-il fonctionner sans aucune supervision humaine ?',
      reponse:
        'Techniquement parfois, mais nous le déconseillons sur la quasi-totalité des cas réels. Un agent qui agit sans point de contrôle humain est un risque non maîtrisé. Notre principe : l’agent prépare et exécute dans un cadre, un humain garde la capacité de valider, corriger et arrêter.',
    },
    {
      _key: 'faq-2',
      question: 'Un chatbot peut-il évoluer en agent IA plus tard ?',
      reponse:
        'Oui, et c’est souvent une bonne stratégie : démarrer par un chatbot sur un périmètre simple, puis passer à un agent quand le besoin d’action se confirme. À condition d’avoir conçu le premier en pensant à cette évolution, pas comme un cul-de-sac.',
    },
    {
      _key: 'faq-3',
      question: 'Est-ce qu’un agent IA, c’est forcément de l’IA générative ?',
      reponse:
        'Pas nécessairement. Un agent combine souvent un modèle de langage avec des règles, des connexions à des outils et des garde-fous. Le modèle n’est qu’un composant : l’intelligence du système est dans son cadrage, pas seulement dans le modèle.',
    },
    {
      _key: 'faq-4',
      question: 'Comment savoir si un prestataire me sur-vend un agent ?',
      reponse:
        'Posez deux questions : « qu’est-ce que cet agent fait qu’un chatbot ne ferait pas ? » et « comment est organisée la supervision humaine ? ». Si les réponses sont floues ou absentes, le besoin n’a pas été cadré — ou on vous vend plus que nécessaire.',
    },
    {
      _key: 'faq-5',
      question: 'Par quoi commencer concrètement ?',
      reponse:
        'Par le besoin, pas par l’outil. Décrivez ce qui doit se passer (une réponse ? une action ?), sur quel périmètre, avec quelle criticité. Le choix agent/chatbot en découle presque mécaniquement. C’est précisément l’objet d’un cadrage.',
    },
  ],

  /* ---- CTA latéral (sous le sommaire) ---- */
  sidebarCta: {
    titre: 'Agent ou chatbot ?',
    description: '30 minutes pour cadrer ce dont vous avez vraiment besoin.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Agent IA ou chatbot : comment choisir ? | maria',
    description:
      'Agent IA et chatbot ne sont pas synonymes. Définitions, tableau comparatif et grille de décision pour choisir le bon, sans jargon ni sur-vente.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

await client.createIfNotExists(AUTEUR_ALEXANDRE)
console.log('AUTEUR OK:', AUTEUR_ALEXANDRE._id)

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/agent-ia-ou-chatbot-comment-choisir')
