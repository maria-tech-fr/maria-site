/**
 * Seed de l'article « Automatiser la prospection B2B avec l'IA :
 * où aide-t-elle vraiment ».
 *
 * Crée :
 *   - l'auteur Matthieu SEILLER (Directeur stratégique) si absent
 *   - l'article complet : TLDR, body riche (H2-questions, définition,
 *     tableau, callouts, avis maria, citations attribuées, CTA in-article),
 *     FAQ finale 5 Q/R.
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-prospection-b2b-ia.mjs
 *
 * Idempotent : createOrReplace sur l'article, createIfNotExists sur l'auteur.
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
 * Helpers de construction Portable Text
 * ============================================================================ */

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

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
 * Auteur Matthieu SEILLER
 * ============================================================================ */

const AUTEUR_MATTHIEU = {
  _id: 'auteur-matthieu-seiller',
  _type: 'auteur',
  nom: 'Matthieu SEILLER',
  role: 'Directeur stratégique',
  bio: 'Matthieu dirige la stratégie chez maria. Il cadre les projets d’IA pour PME et grands comptes avec une obsession : tracer la ligne juste entre ce que l’IA fait mieux et ce qui doit rester profondément humain.',
}

/* ============================================================================
 * Article
 * ============================================================================ */

const ARTICLE = {
  _id: 'article-automatiser-prospection-b2b-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'automatiser-prospection-b2b-ia' },
  titre: 'Automatiser la prospection B2B avec l’IA : où aide-t-elle vraiment',
  sousTitre:
    'Tout le monde vend de l’IA pour la prospection. Peu disent où elle aide vraiment, et où elle abîme la relation client. Voici la ligne juste.',
  intro:
    'Prospection B2B et IA : oui pour automatiser le travail invisible, non pour remplacer le contact. La ligne juste, sans sur-vente.',
  publishedAt: '2026-05-19T09:00:00.000Z',
  readingTime: 8,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-agents-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'L’IA aide vraiment sur la préparation et le suivi (ciblage, enrichissement, scoring, comptes-rendus), pas sur le contact direct.',
    'Le cold mail IA en masse n’est pas une stratégie, c’est un risque de délivrabilité et un signal négatif sur la marque.',
    'Un commercial outillé par l’IA n’est pas un commercial remplacé : il est libéré du travail invisible pour faire ce qu’il sait faire mieux qu’une machine.',
    'La bonne question n’est pas « qu’est-ce que l’IA peut automatiser ? », c’est « qu’est-ce que mes commerciaux ne devraient pas avoir à faire eux-mêmes ? ».',
    'Le bon point de départ : cartographier les tâches commerciales, déléguer le travail invisible à l’IA, garder le reste humain.',
  ],

  /* ---- Body ---- */
  body: [
    /* ===== Section 1 — Le constat ===== */
    h2('Le constat'),
    paragraph(
      'La prospection B2B est devenue l’un des terrains préférés des promesses IA. Outils de scoring, agents de relance, générateurs de cold mails « personnalisés » par centaines à l’heure : le marché regorge de solutions qui promettent de remplacer un commercial par une boîte qui ne dort pas.',
    ),
    paragraph(
      'En pratique, le résultat est rarement celui qu’on attend. Les boîtes mail débordent de messages IA-mâchouillés qui se ressemblent tous. Les taux de réponse chutent. Les domaines d’expédition sont brûlés. Et derrière, les commerciaux rattrapent une relation client qui n’aurait jamais dû partir comme ça.',
    ),
    paragraph(
      'L’erreur n’est pas d’automatiser la prospection. C’est d’automatiser le moment où elle devient humaine.',
    ),
    blockquote(
      'L’IA peut transformer la prospection B2B, mais pas en faisant ce qu’un commercial fait. En faisant ce qu’un commercial ne devrait pas avoir à faire.',
    ),

    /* ===== Section 2 — Où l'IA aide vraiment (H2-question) ===== */
    h2('Où l’IA aide vraiment dans la prospection B2B ?'),
    paragraph(
      'L’IA est utile partout où la prospection demande du travail invisible : recherche, qualification, enrichissement, suivi administratif. Tout ce que le commercial fait avant et après la conversation, mais qui ne crée pas la conversation. Les gains de temps sont réels, le risque relationnel faible.',
    ),
    paragraph('Les tâches où l’IA fait la différence :'),
    ...bulletList([
      '**Ciblage** : repérer dans une base ou sur LinkedIn les comptes qui correspondent au profil idéal.',
      '**Enrichissement** : compléter les fiches prospects (taille, secteur, financements, organigramme) à partir de sources publiques.',
      '**Scoring et priorisation** : trier les leads selon leur potentiel et leur signal d’achat, pour que le commercial attaque les bons en premier.',
      '**Suivi administratif** : mise à jour du CRM, comptes-rendus, relances de logistique pure.',
    ]),
    definition(
      'Agent commercial IA',
      'Système qui assiste un commercial sur les tâches de préparation et de suivi (ciblage, enrichissement, scoring, comptes-rendus), sans se substituer à lui sur la relation client.',
    ),

    /* ===== Section 3 — Où l'IA ne doit pas aller ===== */
    h2('Où l’IA ne doit pas aller'),
    paragraph(
      'Il existe une zone où l’automatisation cause plus de dégâts qu’elle ne crée de valeur. C’est précisément celle où le marché vend le plus fort.',
    ),
    ...bulletList([
      '**Le cold mail IA en masse.** Les modèles de langage permettent de générer mille messages « sur-mesure » en une heure. Les destinataires reconnaissent vite le pattern, les taux de réponse s’effondrent, et les fournisseurs de messagerie pénalisent les domaines qui envoient ces volumes.',
      '**Le closing et la négociation.** Conclure une vente B2B, c’est arbitrer, écouter ce qui n’est pas dit, ajuster en temps réel. C’est précisément là que se gagnent les marges. Une IA n’y a pas accès.',
      '**La première relation chaude.** Quand un prospect demande à vous parler, lui répondre par un agent revient à fermer la porte qu’il venait d’ouvrir.',
    ]),
    warning(
      'Point de vigilance',
      'Automatiser les cold mails à grande échelle avec un LLM ne crée pas une stratégie de prospection. Cela crée un risque de délivrabilité, un coût de remontée, et un signal négatif sur la marque. Les prospects identifient ces messages plus vite qu’on ne le croit.',
    ),

    /* ===== Section 4 — Quelles tâches déléguer (H2-question + tableau) ===== */
    h2('Quelles tâches déléguer à l’IA, lesquelles garder à l’humain ?'),
    paragraph(
      'La règle est simple : déléguer à l’IA ce qui se mesure en temps gagné, garder à l’humain ce qui se mesure en confiance créée. Le travail invisible bascule à l’IA. Le contact direct, les arbitrages, la relation, restent humains.',
    ),
    tableau({
      legende: 'Prospection B2B et IA : qui fait quoi.',
      enTetes: ['Tâche commerciale', 'À déléguer à l’IA', 'À garder à l’humain'],
      lignes: [
        ['Recherche d’information sur un prospect', '✅', ''],
        ['Qualification d’un lead entrant (score, criticité)', '✅', ''],
        ['Génération d’une première version de proposition', '✅', ''],
        ['Mise à jour du CRM, comptes-rendus', '✅', ''],
        ['Premier contact à froid (mail, appel)', '', '✅'],
        ['Conversation de découverte', '', '✅'],
        ['Négociation, closing', '', '✅'],
        ['Décision d’engagement commercial', '', '✅'],
      ],
    }),
    avisMaria({
      texte:
        'La promesse d’une prospection « 100 % automatisée par IA » est un mauvais service rendu à l’entreprise qui l’achète. La bonne automatisation n’est pas celle qui retire l’humain du contact, c’est celle qui retire les tâches invisibles à l’humain. L’IA ne vous fait pas gagner des clients, elle vous rend du temps pour aller en chercher.',
    }),

    /* ===== Section 5 — Comment savoir (H2-question + liste numérotée) ===== */
    h2('Comment savoir si une tâche commerciale est automatisable ?'),
    paragraph(
      'Posez-vous trois questions pour chaque tâche. La réponse oriente presque mécaniquement la décision.',
    ),
    ...numberedList([
      'Cette tâche crée-t-elle de la confiance avec le prospect ? Si oui, elle reste humaine.',
      'Une erreur est-elle rattrapable sans gêne pour le client ? Si non, validation humaine systématique.',
      'La tâche demande-t-elle du jugement contextuel ? Si oui, l’humain garde la main. L’IA prépare, ne tranche pas.',
    ]),
    paragraph(
      'Cette grille évite de se laisser séduire par une démo. Un agent qui rédige un cold mail en trois secondes paraît magique, mais il échoue aux trois questions.',
    ),
    quoteAttribuee({
      texte:
        'La question qu’un dirigeant doit se poser, ce n’est pas « qu’est-ce que l’IA peut automatiser dans ma prospection ? ». C’est « qu’est-ce que mes commerciaux ne devraient pas avoir à faire eux-mêmes ? ». Une fois cette zone identifiée, l’IA y entre. Et seulement là.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    /* ===== Section 6 — Exemple Haomy Textiles ===== */
    h2('Un exemple concret : le CRM Haomy Textiles'),
    paragraph(
      'Chez Haomy Textiles, distributeur BtoB en décoration, le problème n’était pas le manque de prospects. C’était le temps que les commerciaux passaient à chercher l’information, générer des devis, mettre à jour le CRM, plutôt qu’à parler à leurs clients.',
    ),
    paragraph(
      'Le nouveau CRM construit avec maria mobilise l’IA sur quatre tâches : priorisation des leads, génération automatique de devis, recherche conversationnelle dans le portefeuille, et relances contextualisées. Aucune ne touche au contact direct. Toutes restituent du temps au commercial.',
    ),
    quoteAttribuee({
      texte:
        'L’IA ne remplace pas mes commerciaux. Elle leur retire le travail invisible — la recherche d’info, la production de devis — pour leur rendre l’essentiel : le temps de parler à leurs clients.',
      auteur: 'Dominique Koehler',
      role: 'Dirigeant, Haomy Textiles',
    }),
    callout(
      'À retenir',
      'Le bon point de départ pour automatiser la prospection B2B n’est pas l’outil, c’est la cartographie des tâches. Identifier le travail invisible que subissent vos commerciaux, le déléguer à l’IA, garder le reste humain.',
    ),
    inArticleCta({
      titre: 'Cadrer où l’IA peut aider vos commerciaux',
      description:
        '30 minutes pour distinguer ce qui doit être automatisé de ce qui doit rester humain dans votre prospection.',
      lienLibelle: 'Découvrir nos agents IA →',
      lienHref: '/services/agents-ia',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Quel est le meilleur outil IA pour la prospection B2B ?',
      reponse:
        'Il n’y en a pas. Le bon outil dépend de votre cycle de vente, de vos sources de leads, de votre stack existante et de votre maturité. Un agent de scoring qui fonctionne dans un grand groupe industriel échoue souvent dans une PME tech qui démarre. Mieux vaut commencer par cartographier les tâches à automatiser, et ensuite seulement choisir l’outil qui les adresse.',
    },
    {
      _key: 'faq-2',
      question: 'Combien de temps avant qu’un agent IA de prospection soit rentabilisé ?',
      reponse:
        'Pour un agent ciblé sur une ou deux tâches précises (qualification de leads entrants, génération de comptes-rendus), le retour sur investissement se mesure en mois, pas en années. Le calcul est simple : combien d’heures vos commerciaux passent-ils sur ces tâches aujourd’hui, et quel est leur coût horaire complet. Au-delà, dépend du périmètre du projet.',
    },
    {
      _key: 'faq-3',
      question: 'Est-ce qu’un cold mail rédigé par IA est efficace ?',
      reponse:
        'Statistiquement, de moins en moins. Les destinataires identifient les patterns, les fournisseurs de messagerie pénalisent les volumes, et les taux de réponse moyens diminuent à mesure que l’IA se généralise. L’IA reste utile pour préparer un mail (recherche sur le prospect, premier brouillon), pas pour l’envoyer à grande échelle sans intervention humaine.',
    },
    {
      _key: 'faq-4',
      question: 'Faut-il un CRM pour mettre en place une prospection IA ?',
      reponse:
        'Oui, dans la quasi-totalité des cas. L’IA a besoin d’une mémoire structurée pour scorer, prioriser, relancer. Sans CRM, ou avec un CRM mal renseigné, l’agent travaille à l’aveugle. C’est souvent par la modernisation du CRM qu’un projet de prospection IA commence vraiment.',
    },
    {
      _key: 'faq-5',
      question: 'Comment garder l’humain au centre quand on automatise la prospection ?',
      reponse:
        'En définissant explicitement, dès le cadrage du projet, où l’agent IA s’arrête et où le commercial reprend. Cette ligne se documente, se respecte, et se révise. Toute tâche qui crée de la confiance avec le prospect reste humaine par défaut, sauf décision contraire assumée. C’est précisément le travail de cadrage que nous menons avant tout projet d’agent commercial.',
    },
  ],

  /* ---- CTA latéral (sous le sommaire) ---- */
  sidebarCta: {
    titre: 'Un projet d’agent commercial ?',
    description: '30 minutes pour cadrer où l’IA peut aider vos commerciaux.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Prospection B2B et IA : où elle aide vraiment | maria',
    description:
      'Automatiser la prospection B2B avec l’IA, oui, mais pas partout. Les tâches où l’IA fait gagner du temps, et celles où l’humain garde la main.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

await client.createIfNotExists(AUTEUR_MATTHIEU)
console.log('AUTEUR OK:', AUTEUR_MATTHIEU._id)

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/automatiser-prospection-b2b-ia')
