/**
 * Seed de l'article « Compte rendu automatique post-réunion : outils et bonnes pratiques »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — déjà en base.
 * Catégorie : Outils internes (`articleCategorie-outils-internes`)
 * — l'angle est pratique et orienté outils du quotidien commercial.
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-compte-rendu-reunion-ia.mjs
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
  _id: 'article-compte-rendu-reunion-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'compte-rendu-reunion-ia-outils-bonnes-pratiques' },
  titre: 'Compte rendu automatique post-réunion : outils et bonnes pratiques',
  sousTitre:
    'Les comptes rendus de rendez-vous pèsent sur le temps commercial. L’IA peut les produire seule. À condition de choisir l’outil selon l’usage, et de s’en servir chaque jour.',
  intro:
    'Le compte rendu réunion IA libère du temps commercial. Mais sa valeur dépend moins de l’outil choisi que de la régularité de l’usage.',
  publishedAt: '2026-06-17T13:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-outils-internes' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'Un compte rendu réunion IA transcrit puis résume un rendez-vous, et prépare le suivi sans saisie manuelle.',
    'Aucun outil n’est le meilleur dans l’absolu. Le bon choix dépend de l’usage visé et des outils déjà en place.',
    'La valeur vient de la régularité. Un outil utilisé une fois sur deux ne fait gagner aucun temps.',
    'Pour un commercial, l’intégration au CRM compte plus que la qualité brute du résumé.',
    'Le gain réel se mesure en temps rendu à la relation client, pas en nombre de fonctionnalités.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Le constat'),
    paragraph(
      'Après chaque rendez-vous, un commercial doit consigner l’essentiel. Les décisions prises. Les prochaines étapes. Les objections soulevées. En théorie, ce compte rendu nourrit le CRM et structure le suivi.',
    ),
    paragraph(
      'En pratique, il est rédigé tard, ou pas du tout. Le commercial enchaîne les rendez-vous. La saisie passe après. Les informations restent dans sa tête ou dans des notes éparses.',
    ),
    blockquote(
      'Le temps perdu n’est pas dans la réunion. Il est dans tout ce qui devrait la suivre.',
    ),
    paragraph(
      'Pour un directeur commercial, le coût est double. La donnée client se dégrade. Et le temps de vente part dans des tâches administratives. Le pipeline devient moins lisible. Les relances arrivent en retard.',
    ),
    paragraph(
      'L’IA promet de récupérer ce temps. Elle transcrit, résume et prépare le suivi à la place du commercial. Encore faut-il savoir quel outil sert quel usage.',
    ),

    h2('Quelle IA pour faire des comptes rendus ?'),
    paragraph(
      'Plusieurs catégories d’outils produisent des comptes rendus de réunion. Les assistants de visioconférence transcrivent et résument les appels en ligne. Les outils généralistes résument un texte ou un enregistrement importé. Les agents intégrés au CRM vont plus loin : ils rédigent le compte rendu, puis mettent à jour la fiche client. Le bon choix dépend du canal des rendez-vous et des outils déjà utilisés.',
    ),
    definition(
      'Compte rendu automatique',
      'Résumé d’une réunion produit par un logiciel, à partir d’une transcription audio ou d’un texte. Il extrait les décisions, les actions à mener et les points clés, sans saisie manuelle.',
    ),

    h2('Quelles options pour un compte rendu réunion IA ?'),
    paragraph(
      'Trois familles d’outils dominent le marché. Elles ne répondent pas au même besoin. Le tableau suivant les distingue.',
    ),
    tableau({
      legende: 'Trois familles d’outils de compte rendu, trois usages distincts',
      enTetes: ['Type d’outil', 'Ce qu’il produit', 'Limite principale'],
      lignes: [
        ['Assistant de visioconférence', 'Transcription et résumé des appels en ligne', 'Ne couvre pas les rendez-vous physiques'],
        ['Outil généraliste de résumé', 'Synthèse d’un texte ou d’un audio importé', 'Aucune connexion au CRM, ressaisie nécessaire'],
        ['Agent intégré au CRM', 'Compte rendu, puis mise à jour de la fiche client', 'Demande un paramétrage initial'],
      ],
    }),
    paragraph(
      'Trois familles d’outils, trois usages distincts. Le choix se fait selon vos rendez-vous et votre CRM.',
    ),
    callout(
      'À retenir',
      'Le meilleur outil de compte rendu n’est pas le plus complet, c’est celui qui s’intègre à votre flux de travail existant.',
    ),

    h2('Le bon outil dépend de l’usage, pas du classement'),
    paragraph(
      'Les comparatifs cherchent un gagnant universel. Cette quête est trompeuse. Un commercial en visioconférence toute la journée n’a pas les mêmes besoins qu’un commercial terrain.',
    ),
    paragraph(
      'Le critère décisif n’est pas la note d’un comparatif. C’est l’adéquation entre l’outil et votre façon de travailler. Un agent commercial IA bien choisi s’efface dans le quotidien. Il ne demande aucun effort supplémentaire.',
    ),
    paragraph(
      'La régularité fait le reste. Un outil utilisé après chaque rendez-vous transforme la donnée client. Un outil utilisé de temps en temps ne change rien. Pire, il crée une base à deux vitesses, moitié à jour, moitié obsolète.',
    ),
    warning(
      'Point de vigilance',
      'Un outil de compte rendu utilisé de façon irrégulière dégrade la confiance dans le CRM. Une fiche sur deux à jour vaut parfois moins qu’aucune automatisation.',
    ),
    avisMaria({
      texte:
        'La mode pousse à chercher le meilleur outil du marché. Notre conviction est inverse. Le bon outil est celui que vos commerciaux ouvrent sans y penser, chaque jour. La régularité d’usage compte plus que la fiche technique.',
      signature: '— Matthieu SEILLER',
    }),

    h2('Quelle IA gratuite pour résumer un document ?'),
    paragraph(
      'Plusieurs assistants génériques proposent un résumé gratuit de document ou de transcription. Ils dépannent pour un besoin ponctuel. Mais une version gratuite a des limites : volume restreint, aucune connexion au CRM, et des questions de confidentialité sur les données clients. Pour un usage commercial régulier, un outil intégré et encadré reste préférable.',
    ),
    quoteAttribuee({
      texte:
        'Un compte rendu automatique ne vaut que s’il rejoint le bon endroit, au bon moment, sans ressaisie.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Comment ancrer le compte rendu IA dans le quotidien commercial'),
    paragraph(
      'Adopter un outil ne suffit pas. L’enjeu est d’en faire un réflexe. Voici une séquence simple pour y parvenir.',
    ),
    ...numberedList([
      '**Partir du canal réel des rendez-vous**, visioconférence ou terrain, avant de choisir un outil.',
      '**Vérifier la connexion au CRM existant.** Sans elle, le gain de temps disparaît dans la ressaisie.',
      '**Cadrer ce que le compte rendu doit contenir** : décisions, prochaines étapes, échéances.',
      '**Tester sur une équipe restreinte** avant de généraliser à toute la force de vente.',
      '**Suivre l’usage réel**, pas seulement l’installation. La régularité est l’indicateur clé.',
    ]),
    paragraph(
      'Le résultat se mesure simplement. Le commercial écrit moins. La fiche client reste à jour. Et le temps gagné retourne là où il compte, dans la relation client.',
    ),
    inArticleCta({
      titre: 'Faire gagner du temps à vos commerciaux',
      description:
        '30 minutes pour cadrer l’outil de compte rendu adapté à vos rendez-vous et à votre CRM.',
      lienLibelle: 'Découvrir comment →',
      lienHref: '/besoins/gagner-du-temps-commerciaux-IA',
      variant: 'yellow',
    }),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Quelles sont les 3 IA les plus utilisées pour les comptes rendus ?',
      reponse:
        'Il n’existe pas de trio universel pour le compte rendu de réunion. Les outils les plus répandus se classent en trois familles : les assistants de visioconférence, les assistants génériques de résumé, et les agents intégrés au CRM. La popularité d’un outil ne garantit pas qu’il convienne à votre équipe. Le bon réflexe est de partir de votre usage, pas d’un classement.',
    },
    {
      _key: 'faq-2',
      question: 'Quelle application de compte rendu est la meilleure ?',
      reponse:
        'Aucune application n’est la meilleure dans l’absolu. La pertinence dépend du canal de vos rendez-vous, de votre CRM, et de la régularité d’usage de l’équipe. Une application complète mais peu utilisée fait perdre plus de temps qu’elle n’en fait gagner. Le critère décisif est l’intégration à votre flux de travail quotidien.',
    },
    {
      _key: 'faq-3',
      question: 'Un compte rendu généré par IA est-il fiable ?',
      reponse:
        'Un compte rendu généré par IA est fiable sur la structure et la synthèse, à condition d’être relu. L’outil peut mal interpréter un nom propre, un chiffre, ou une nuance d’échange. Une relecture rapide par le commercial reste nécessaire avant d’enregistrer la fiche. L’IA fait gagner du temps de rédaction, pas du temps de vérification.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Cadrer le bon outil pour vos commerciaux ?',
    description: '30 minutes pour adapter le choix à vos rendez-vous et à votre CRM.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'Compte rendu réunion IA : outils et bonnes pratiques | maria',
    description:
      'Quelle IA pour vos comptes rendus de réunion ? Les outils, leurs limites et la pratique qui fait gagner du temps aux commerciaux.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
