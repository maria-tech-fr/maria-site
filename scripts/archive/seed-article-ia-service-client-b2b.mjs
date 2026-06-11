/**
 * Seed de l'article « À quoi sert vraiment l'IA dans un service client B2B ? ».
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-ia-service-client-b2b.mjs
 *
 * Idempotent : createOrReplace sur l'article. L'auteur Matthieu SEILLER
 * a été créé au précédent article (auteur-matthieu-seiller).
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes (NEXT_PUBLIC_SANITY_* / SANITY_API_WRITE_TOKEN)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

/* ============================================================================
 * Helpers Portable Text (mêmes patterns que les seeds précédents)
 * ============================================================================ */

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

function paragraph(text) {
  return {
    _type: 'block', _key: k('p'), style: 'normal', markDefs: [],
    children: parseInline(text),
  }
}
function h2(text) {
  return {
    _type: 'block', _key: k('h2'), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
  }
}
function blockquote(text) {
  return {
    _type: 'block', _key: k('bq'), style: 'blockquote', markDefs: [],
    children: parseInline(text),
  }
}
function bulletList(items) {
  return items.map((t) => ({
    _type: 'block', _key: k('li'), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [], children: parseInline(t),
  }))
}
function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { _type: 'span', _key: k('s'), text: part.slice(2, -2), marks: ['strong'] }
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
    _type: 'tableau', _key: k('tb'),
    ...(legende ? { legende } : {}),
    enTetes,
    lignes: lignes.map((cellules) => ({ _type: 'ligne', _key: k('lg'), cellules })),
  }
}
function quoteAttribuee({ texte, auteur, role }) {
  return {
    _type: 'quoteAttribuee', _key: k('qa'),
    texte, auteur, ...(role ? { role } : {}),
  }
}
function inArticleCta({ titre, description, lienLibelle, lienHref, variant = 'yellow' }) {
  return {
    _type: 'inArticleCta', _key: k('cta'),
    titre, description, lienLibelle, lienHref, variant,
  }
}

/* ============================================================================
 * Article
 * ============================================================================ */

const ARTICLE = {
  _id: 'article-ia-service-client-b2b',
  _type: 'article',
  slug: { _type: 'slug', current: 'ia-service-client-b2b' },
  titre: 'À quoi sert vraiment l’IA dans un service client B2B ?',
  sousTitre:
    'L’IA ne remplace pas vos agents. Elle accélère la recherche d’information, fluidifie les réponses et améliore concrètement la satisfaction de vos clients B2B.',
  intro:
    'L’IA service client n’est pas un outil de remplacement. C’est un accélérateur qui aide vos équipes à répondre plus vite, mieux, et à monter en compétence.',
  publishedAt: '2026-05-19T10:00:00.000Z',
  readingTime: 8,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-agents-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'L’IA service client sert d’abord à accélérer trois tâches : la recherche d’information, le tri des tickets et la rédaction d’un premier brouillon de réponse.',
    'Le bon point d’entrée pour une PME B2B est le tri tickets support IA, pas le chatbot orienté client final.',
    'L’exemple Leclerc montre que l’IA gagne sa place en orientation et qualification, pas en remplacement humain.',
    'Un chatbot support client mal cadré peut détruire la confiance d’un compte stratégique en une seule interaction ratée.',
    'La performance vient moins de l’outil que de la formation des équipes à l’utiliser correctement.',
  ],

  body: [
    /* ===== Section 1 — Le constat ===== */
    h2('Le constat'),
    paragraph(
      'Un service client B2B en PME absorbe des demandes hétérogènes : devis, suivi de commande, support technique, questions contractuelles. Le volume monte, les sujets se complexifient, et les équipes restent à effectif constant. Le délai de réponse devient un sujet de tension interne et une source de friction commerciale.',
    ),
    paragraph(
      'Les outils historiques — boîte mail partagée, ticketing classique, base documentaire — ne tiennent plus la charge dès que le catalogue produit grossit ou que les clients deviennent plus exigeants. Les agents passent un temps significatif à chercher la bonne information, à classer les demandes, et à reformuler des réponses similaires de semaine en semaine.',
    ),
    blockquote(
      'Le temps perdu en recherche d’information est le premier poste de coût caché d’un service client B2B.',
    ),
    paragraph(
      'C’est précisément là que l’IA service client trouve sa place. Pas en première ligne pour décider à la place de vos équipes. En soutien, pour accélérer la recherche, formuler des brouillons de réponse, et trier les tickets en amont.',
    ),

    /* ===== Section 2 — Que peut faire l'IA (H2-question) ===== */
    h2('Que peut faire l’IA dans un service client B2B ?'),
    paragraph(
      'L’IA dans un service client B2B accélère trois opérations à forte charge cognitive : la recherche d’information dans la documentation interne, la qualification et le tri des tickets entrants, et la rédaction d’un premier brouillon de réponse. Elle ne décide pas. Elle prépare le travail de l’humain.',
    ),
    paragraph(
      'Trois usages se distinguent en pratique. **L’assistant interne** interroge vos bases documentaires (CRM, drive, guides produit) et fournit une réponse sourcée à l’agent humain en quelques secondes. **Le tri tickets support IA** classe automatiquement les demandes entrantes par sujet, urgence et compte client. **Le chatbot support client orienté qualification**, lui, prend la première ligne : il qualifie la demande, oriente vers le bon interlocuteur, et résout les cas les plus simples.',
    ),
    definition(
      'Agent IA service client',
      'Système logiciel capable de comprendre une demande en langage naturel, d’aller chercher l’information pertinente dans une base interne, et de proposer une réponse contextualisée. Il agit toujours sous supervision humaine pour les sujets sensibles.',
    ),

    /* ===== Section 3 — Tri des tickets (statement) ===== */
    h2('Le tri des tickets, premier gain rapide'),
    paragraph(
      'C’est l’usage le plus accessible pour une PME. Avant même de répondre, un service client passe un temps important à classer les demandes entrantes : qui doit traiter quoi, avec quel niveau d’urgence, sur quel produit, pour quel client.',
    ),
    paragraph(
      'Une IA bien paramétrée fait ce travail en continu. Elle lit la demande, identifie le sujet, vérifie le compte dans le CRM, attribue un niveau de priorité, et route le ticket vers l’agent compétent. Le gain est double : moins de temps perdu en qualification, et moins de tickets oubliés ou mal orientés.',
    ),
    callout(
      'À retenir',
      'Automatiser le tri des tickets en amont libère vos agents pour les demandes à forte valeur. C’est le premier chantier IA d’un service client B2B en PME.',
    ),

    /* ===== Section 4 — Exemple Leclerc + tableau ===== */
    h2('L’exemple E.Leclerc : l’IA en première ligne d’orientation'),
    paragraph(
      'E.Leclerc a déployé un premier agent IA chargé de renseigner et d’orienter les clients en amont du service client humain. L’objectif n’était pas de supprimer le contact humain, mais d’envoyer chaque demande vers le bon interlocuteur avec le bon contexte.',
    ),
    paragraph(
      'Les résultats observés sont cohérents avec ce qu’on attend de ce type de déploiement : demandes mieux orientées, équipes humaines plus efficaces sur les cas qui nécessitent vraiment leur intervention, et clients qui obtiennent une première réponse plus rapide. L’IA ne remplace pas. Elle filtre et oriente.',
    ),
    paragraph(
      'Cet exemple est transposable à une PME B2B, à condition de cadrer le périmètre. L’IA traite uniquement ce qu’elle sait traiter avec fiabilité. Tout le reste remonte à l’humain, avec un contexte enrichi.',
    ),
    tableau({
      legende:
        'Répartition type des demandes entre IA et humain dans un service client B2B PME.',
      enTetes: ['Type de demande', 'Traitement IA', 'Traitement humain'],
      lignes: [
        ['Statut de commande', 'Réponse autonome', 'Escalade si litige'],
        ['Question produit standard', 'Brouillon de réponse', 'Validation et envoi'],
        ['Litige facturation', 'Qualification et routage', 'Traitement complet'],
        ['Réclamation sensible', 'Détection et alerte', 'Traitement complet'],
      ],
    }),

    /* ===== Section 5 — Comment utiliser sans dégrader (H2-question) ===== */
    h2('Comment utiliser l’IA dans un service client sans dégrader la relation ?'),
    paragraph(
      'Trois principes : ne jamais laisser l’IA répondre seule sur les sujets sensibles, toujours afficher la possibilité de basculer vers un humain, et former les équipes avant d’élargir le périmètre. Sans cela, l’IA crée plus de friction qu’elle n’en supprime.',
    ),
    paragraph(
      'Le déploiement se fait par paliers. On commence par un seul usage — par exemple le tri des tickets — on mesure le gain pendant un trimestre, on stabilise, puis on étend. Vouloir automatiser tout en même temps est le plus court chemin vers un échec visible côté client.',
    ),
    warning(
      'Point de vigilance',
      'Un chatbot support client mal cadré qui répond à tort sur un sujet sensible peut détruire en une semaine la confiance bâtie en plusieurs années. Le périmètre IA se définit par exclusion, pas par ambition.',
    ),

    /* ===== Section 6 — Former les équipes ===== */
    h2('Former les équipes plutôt que les remplacer'),
    paragraph(
      'C’est la position que défend maria. L’IA dans un service client n’est utile que si elle est adoptée par les agents qui l’utilisent au quotidien. Cela suppose une formation concrète : comment formuler une requête à l’assistant, comment vérifier une réponse générée, comment escalader un cas qui sort du périmètre.',
    ),
    paragraph(
      'Une équipe formée gagne en autonomie, traite plus de demandes, et monte en qualité de réponse. Une équipe non formée perçoit l’outil comme une menace ou comme un gadget, et l’usage retombe au bout de trois mois. L’enjeu n’est pas technologique. Il est organisationnel.',
    ),
    avisMaria({
      texte:
        'La mode pousse à voir l’IA service client comme un remplaçant moins cher des équipes humaines. Notre conviction est inverse. L’IA est un outil de montée en compétence pour vos agents, à condition d’être déployée par petits paliers, formée correctement, et supervisée.',
      signature: '— Matthieu SEILLER',
    }),
    quoteAttribuee({
      texte:
        'Le bon service client IA n’est pas celui qui répond à la place de vos équipes, mais celui qui leur permet de répondre mieux.',
      auteur: 'Matthieu SEILLER',
      role: 'Cofondateur, maria',
    }),
    inArticleCta({
      titre: 'Cadrer vos premiers usages IA en service client',
      description:
        '30 minutes pour identifier le premier chantier IA à fort impact dans votre service client, sans casser la relation.',
      lienLibelle: 'Optimiser mes process service client →',
      lienHref: '/services/agents-ia',
      variant: 'yellow',
    }),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Quels sont les outils d’IA pour le service client ?',
      reponse:
        'Les outils d’IA pour le service client se regroupent en trois familles : les assistants internes pour les agents (recherche documentaire, brouillon de réponse), les outils de tri et de qualification automatique des tickets, et les chatbots de front-office pour la première orientation. Le choix dépend du volume de demandes et de la maturité de l’équipe. Pour une PME B2B, commencer par l’assistant interne ou le tri des tickets reste le plus rentable.',
    },
    {
      _key: 'faq-2',
      question: 'Existe-t-il un service client entièrement basé sur l’IA ?',
      reponse:
        'Plusieurs grandes entreprises ont déployé un service client basé en partie sur l’IA, comme Leclerc avec un agent d’orientation en première ligne. Aucun déploiement sérieux n’est entièrement automatisé sur les sujets sensibles. L’IA prend en charge la qualification, l’orientation et les réponses standards. L’humain garde la main sur les litiges, les réclamations et les comptes stratégiques.',
    },
    {
      _key: 'faq-3',
      question: 'Comment intégrer l’IA dans un service client de PME ?',
      reponse:
        'En commençant par un usage clair et limité, par exemple le tri automatique des tickets entrants ou l’assistant de recherche pour les agents. On mesure le gain pendant un trimestre, on ajuste, on forme les équipes, puis on étend. Le pire chantier consiste à vouloir tout automatiser d’un coup. Le bon réflexe est l’inverse : un seul usage, bien stabilisé.',
    },
    {
      _key: 'faq-4',
      question: 'L’IA va-t-elle remplacer les équipes de service client B2B ?',
      reponse:
        'Non. L’IA absorbe les tâches répétitives à faible valeur (classement, recherche, premier brouillon de réponse). Elle libère du temps pour les demandes complexes, les comptes stratégiques et la relation. Les équipes ne disparaissent pas — leur rôle se déplace vers ce qui demande du jugement humain, exactement ce qui fait la valeur d’un service client B2B.',
    },
  ],

  sidebarCta: {
    titre: 'Un projet IA service client ?',
    description: '30 minutes pour cadrer le premier chantier à fort impact.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'IA service client B2B : à quoi ça sert vraiment | maria',
    description:
      'L’IA dans un service client B2B accélère la recherche, automatise le tri des tickets et améliore la satisfaction. Méthode et exemples concrets.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/ia-service-client-b2b')
