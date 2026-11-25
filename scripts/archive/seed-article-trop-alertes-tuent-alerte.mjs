/**
 * Seed de l'article « Trop d'alertes tuent l'alerte : comment l'IA fait enfin
 * le tri »
 *
 * Auteur : Mathieu HERNANDEZ (Directeur produit) — `auteur-equipe-maria` en
 * base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false.
 *
 * Pattern paire SEILLER / HERNANDEZ sur les alertes intelligentes (même CTA
 * /besoins/alertes-intelligentes) :
 *  - SEILLER publié 2026-11-25 (stratégie / cadrage, 5 signaux faibles,
 *    paliers de budget) → /blog/alertes-intelligentes-ia-reperer-problemes-avant
 *  - HERNANDEZ (cet article) publié 2026-12-01 (focus fatigue d'alerte, filtre
 *    IA, méthode de tri des notifications existantes)
 *
 * Cross-link vers l'article SEILLER dans la section « Le filtre IA bien
 * calibré, un autre modèle » (angle vue stratégique et paliers de budget).
 * Le lien retour est posé côté SEILLER dans son seed publié dans le même
 * commit.
 *
 * Source CIGREF 2024 cliquable (citée dans « Pourquoi les alertes classiques
 * échouent »). France Num listée dans le frontmatter mais non citée dans le
 * corps : pas de lien.
 *
 * Lien éditorial vers /besoins/alertes-intelligentes ajouté dans la
 * conclusion du « Par où commencer » (en plus du CTA sidebar et de
 * l'inArticleCta).
 *
 * Choix éditoriaux :
 *  - 4 semaines du « Par où commencer » reformatées en paragraphes séparés
 *    (**Semaine X**), pattern maria.
 *  - CITATION Mathieu HERNANDEZ déplacée du tout début de « Par où commencer »
 *    vers la clôture des « 3 pièges à éviter », juste après le CALLOUT
 *    VIGILANCE (option B).
 *  - inArticleCta yellow ajouté après l'AVIS MARIA (basculement « constat →
 *    on en parle »), libellé « En savoir plus → » (règle maria pour les
 *    inArticleCta vers /besoins/* et /services/*).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta.
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-trop-alertes-tuent-alerte.mjs
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

function parseInline(text) {
  const REGEX = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(REGEX).filter(Boolean)
  const children = []
  const markDefs = []
  for (const part of parts) {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, linkText, url] = linkMatch
      const isExternal = url.startsWith('http://') || url.startsWith('https://')
      const key = k('link')
      markDefs.push({ _key: key, _type: 'link', href: url, blank: isExternal })
      children.push({ _type: 'span', _key: k('s'), text: linkText, marks: [key] })
    } else if (part.startsWith('**') && part.endsWith('**')) {
      children.push({ _type: 'span', _key: k('s'), text: part.slice(2, -2), marks: ['strong'] })
    } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      children.push({ _type: 'span', _key: k('s'), text: part.slice(1, -1), marks: ['em'] })
    } else {
      children.push({ _type: 'span', _key: k('s'), text: part, marks: [] })
    }
  }
  return { children, markDefs }
}

const paragraph = (text) => {
  const { children, markDefs } = parseInline(text)
  return { _type: 'block', _key: k('p'), style: 'normal', markDefs, children }
}
const h2 = (text) => ({
  _type: 'block', _key: k('h2'), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})
const h3 = (text) => ({
  _type: 'block', _key: k('h3'), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})
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

const ARTICLE = {
  _id: 'article-trop-alertes-tuent-alerte-ia-tri',
  _type: 'article',
  slug: { _type: 'slug', current: 'trop-alertes-tuent-alerte-ia-tri' },
  titre: 'Trop d’alertes tuent l’alerte : comment l’IA fait enfin le tri',
  sousTitre:
    'Vos équipes reçoivent trop de notifications et finissent par les ignorer. Voici comment l’IA agit en filtre, pas en multiplicateur.',
  intro:
    'La plupart des entreprises n’ont pas un déficit d’alertes, elles ont un excès de bruit. L’IA bien cadrée réduit le nombre de notifications tout en augmentant leur valeur.',
  publishedAt: '2026-12-01T09:00:00.000Z',
  readingTime: 6,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Les équipes en entreprise reçoivent déjà trop de notifications. Ajouter des alertes IA mal calibrées aggrave le problème au lieu de le résoudre.',
    'Le vrai apport de l’IA n’est pas de produire plus d’alertes, c’est d’en produire moins mais mieux ciblées.',
    'La fatigue d’alerte conduit les destinataires à ignorer même les signaux importants. C’est le risque principal d’un dispositif mal conçu.',
    'Sur les projets que nous accompagnons, une bonne règle est de ne pas dépasser 5 à 10 alertes utiles par semaine et par destinataire.',
    'La méthode qui marche repose sur trois principes : priorisation stricte, personnalisation du destinataire, boucle de rétroaction continue.',
  ],

  body: [
    h2('La fatigue d’alerte, un mal silencieux'),
    paragraph(
      'Dans les PME et ETI que nous auditons chez maria, un même constat revient. Les équipes commerciales reçoivent chaque jour des notifications CRM, des rappels d’agenda, des mails de relance, des alertes Slack. Les équipes support reçoivent des notifications par ticket, par mention, par SLA. Les managers reçoivent des alertes RH, des alertes projet, des alertes de dépassement budgétaire.',
    ),
    paragraph(
      'Au bout de six mois dans ce régime, un phénomène s’installe silencieusement. Les destinataires ouvrent les notifications sans les lire. Ils marquent tout comme lu par automatisme. Ils finissent par les désactiver, officiellement ou de fait. Et le jour où une alerte vraiment importante arrive, elle est traitée comme les autres.',
    ),
    paragraph(
      'Ce phénomène porte un nom dans la littérature médicale, où il a été largement étudié : la fatigue d’alerte. Dans les hôpitaux, les infirmiers exposés à plus de 300 alarmes par poste finissent par les ignorer, y compris les alarmes vitales. Le mécanisme est identique en entreprise. Au-delà d’un certain volume, l’alerte perd sa fonction.',
    ),
    callout(
      'À retenir',
      'Le vrai problème des équipes en 2026 n’est pas de recevoir trop peu d’informations. C’est d’en recevoir trop et de ne plus savoir laquelle mérite leur attention. Une IA bien utilisée résout ce problème, une IA mal utilisée l’aggrave.',
    ),

    h2('Pourquoi les alertes classiques échouent'),
    paragraph(
      'Trois défauts de conception reviennent systématiquement dans les systèmes d’alertes que nous auditons.',
    ),
    paragraph(
      '**Le seuil statique.** Une alerte se déclenche dès qu’un indicateur passe un seuil fixe, sans tenir compte du contexte. Un seuil à « pipeline sous 500 000 euros » se déclenche aussi bien en pleine saison basse qu’en période stratégique. Le destinataire finit par l’ignorer parce qu’elle sonne pour rien 80 % du temps.',
    ),
    paragraph(
      '**La liste de diffusion trop large.** L’alerte part à tout le comité de direction, à toute l’équipe commerciale, à tout le support. Personne n’a l’impression qu’elle lui est destinée personnellement, et personne n’agit. La responsabilité se dilue.',
    ),
    paragraph(
      '**L’absence de contexte.** L’alerte dit « dérive détectée » sans dire ce qui se passe, ni ce qu’on peut faire. Le destinataire reçoit un signal brut qu’il doit décoder lui-même, souvent en pleine journée chargée. Résultat : il reporte à plus tard, et oublie.',
    ),
    paragraph(
      'Le [CIGREF, dans ses retours d’expérience 2024](https://www.cigref.fr/lia-en-entreprise-retours-dexperience-et-bonnes-pratiques), pose le principe directement : « Les collaborateurs plébiscitent une intégration des IA génératives mais craignent pour leur travail. » Cette crainte vaut aussi pour les alertes. Un dispositif perçu comme intrusif ou inutile est rejeté, même s’il est techniquement irréprochable.',
    ),

    h2('Le filtre IA bien calibré, un autre modèle'),
    definition(
      'Filtre IA d’alertes',
      'Un filtre IA d’alertes est un dispositif qui apprend le comportement normal de votre entreprise, détecte les écarts significatifs, qualifie leur gravité, et ne transmet au destinataire que les alertes qui méritent son attention. Il n’ajoute pas d’alertes nouvelles, il réduit le volume existant pour ne garder que l’utile.',
    ),
    paragraph(
      'Trois caractéristiques le distinguent d’un système d’alertes classique.',
    ),
    paragraph(
      'Il **apprend votre normal**. Une baisse d’activité en août n’est pas une alerte, c’est votre saisonnalité. Le filtre ne se déclenche que sur un écart significatif par rapport au comportement attendu à cette période.',
    ),
    paragraph(
      'Il **personnalise le destinataire**. Chaque type d’alerte est acheminé vers la personne qui a l’autorité d’agir et le contexte pour comprendre. Pas de liste de diffusion générique.',
    ),
    paragraph(
      'Il **apprend de vos feedbacks**. Quand un destinataire marque une alerte comme non pertinente, le filtre ajuste. Au bout de quelques semaines, le taux de faux positifs chute.',
    ),
    paragraph(
      'Cette approche filtre est complémentaire d’un cadrage plus large sur quels signaux faibles surveiller, quels paliers de solution choisir, et combien ça coûte. Nous traitons cet angle stratégique dans un article compagnon : [Alertes intelligentes par IA : repérer les problèmes avant qu’ils coûtent cher](/blog/alertes-intelligentes-ia-reperer-problemes-avant).',
    ),

    h2('La méthode maria en 4 étapes'),
    paragraph(
      '**Étape 1 : audit du volume existant** (1 semaine). Nous mesurons combien de notifications chaque collaborateur reçoit déjà, tous canaux confondus. Le chiffre est presque toujours sous-estimé par la direction.',
    ),
    paragraph(
      '**Étape 2 : priorisation des alertes à garder** (1 à 2 semaines). Nous classons chaque alerte existante en trois catégories : à garder telle quelle, à reformuler, à supprimer. Sur les projets que nous accompagnons, 40 à 60 % des alertes existantes partent à la suppression.',
    ),
    paragraph(
      '**Étape 3 : calibrage du filtre IA** (2 à 4 semaines). Pour chaque alerte conservée, nous paramétrons le filtre : seuil adaptatif, destinataire unique, contexte joint. Test sur l’historique pour mesurer le taux de vrais positifs attendu.',
    ),
    paragraph(
      '**Étape 4 : mise en production avec boucle de rétroaction** (3 à 4 semaines). Chaque destinataire peut marquer une alerte comme utile ou non. Le filtre ajuste, les seuils s’affinent. Après 6 à 8 semaines, le dispositif se stabilise.',
    ),
    avisMaria({
      texte:
        'La mode pousse à ajouter des alertes IA à l’existant, en espérant que la nouvelle surveillance révélera des opportunités. Notre conviction est inverse. Avant d’ajouter la moindre alerte, il faut supprimer celles qui ne sont pas lues. Un projet d’alertes IA utile commence presque toujours par une phase de ménage dans les notifications existantes.',
      signature: 'Mathieu HERNANDEZ',
    }),
    inArticleCta({
      titre: 'Faire le tri dans vos alertes existantes',
      description:
        '30 minutes pour mesurer la charge réelle de notifications de vos équipes et prioriser ce qui mérite un filtre IA.',
      lienLibelle: 'En savoir plus →',
      lienHref: '/besoins/alertes-intelligentes',
      variant: 'yellow',
    }),

    h2('Les 3 pièges à éviter'),
    paragraph(
      '**Piège 1 : vouloir surveiller tout d’un coup.** Un dispositif qui démarre sur 15 indicateurs produit trop de bruit dans les premières semaines et perd la confiance des utilisateurs. Mieux vaut 3 alertes qui marchent qu’un dispositif complet qui est désactivé après deux mois.',
    ),
    paragraph(
      '**Piège 2 : confier la réception des alertes aux mauvaises personnes.** Une alerte envoyée à quelqu’un qui n’a pas l’autorité d’agir frustre son destinataire et discrédite le dispositif. Chaque alerte doit avoir un responsable précis, pas une équipe.',
    ),
    paragraph(
      '**Piège 3 : ne pas prévoir de boucle de rétroaction.** Un filtre IA qui ne reçoit pas de feedback des destinataires ne s’améliore pas. L’ajustement continu est ce qui fait la différence entre un dispositif qui tient 6 mois et un dispositif qui tient 5 ans.',
    ),
    warning(
      'Point de vigilance',
      'Ne mesurez pas la valeur d’un dispositif d’alertes au nombre d’alertes envoyées. Mesurez-la au nombre de décisions correctes prises grâce à elles. Un dispositif qui envoie moins de signaux mais permet plus d’actions utiles vaut dix dispositifs plus bruyants.',
    ),
    quoteAttribuee({
      texte:
        'La meilleure chose qu’on puisse faire pour les équipes aujourd’hui n’est pas d’ajouter des alertes IA. C’est de supprimer les alertes classiques qui ne servent plus. L’IA vient après, pour remplacer un bruit excessif par un signal choisi.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer'),
    paragraph(
      'Si vous envisagez ce type de projet, voici l’ordre d’action que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1** : demander à trois collaborateurs de noter pendant cinq jours chaque notification reçue et son utilité. Le résultat est souvent spectaculaire.',
    ),
    paragraph(
      '**Semaine 2** : identifier les alertes classiques qui peuvent être supprimées sans risque.',
    ),
    paragraph(
      '**Semaine 3** : choisir une alerte réellement utile mais mal calibrée aujourd’hui, et la refaire avec un filtre IA.',
    ),
    paragraph(
      '**Semaine 4** : mesurer le taux de pertinence perçue par le destinataire.',
    ),
    paragraph(
      'À l’issue de ce mois, vous saurez si vos équipes gagneraient à passer d’un modèle d’alertes exhaustif à un modèle d’alertes sélectif. Pour une vue d’ensemble de la façon dont maria aborde ce type de projet, voir la page [Anticiper plutôt que subir (alertes intelligentes)](/besoins/alertes-intelligentes).',
    ),

    h2('En résumé'),
    paragraph(
      'La fatigue d’alerte est un problème silencieux qui discrédite les dispositifs de surveillance en entreprise. Ajouter des alertes IA à un environnement déjà saturé aggrave le problème. Le vrai apport de l’IA est d’agir en filtre : apprendre votre normal, qualifier les écarts, ne remonter que les signaux utiles à la bonne personne. La méthode qui marche repose sur un audit du volume existant, une suppression franche de ce qui ne sert plus, un calibrage précis de ce qui reste, et une boucle de rétroaction continue. Le succès ne se mesure pas au nombre d’alertes, mais à la qualité des décisions qu’elles permettent.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Faut-il supprimer toutes les alertes classiques avant d’installer un filtre IA ?',
      reponse:
        'Non, mais il faut identifier celles qui ne sont pas lues et les supprimer. Garder des alertes mortes à côté d’un dispositif IA crée de la confusion.',
    },
    {
      _key: 'faq-2',
      question: 'Combien d’alertes utiles par semaine faut-il viser ?',
      reponse:
        'Sur les dispositifs bien calibrés, chaque destinataire reçoit 5 à 10 alertes utiles par semaine. Au-delà, la fatigue revient.',
    },
    {
      _key: 'faq-3',
      question: 'Le filtre IA peut-il supprimer une alerte critique par erreur ?',
      reponse:
        'C’est le risque principal. La parade : sur les alertes critiques, le filtre ne supprime jamais, il atténue ou retarde si le contexte le permet. Les règles de non-suppression sont définies humainement.',
    },
    {
      _key: 'faq-4',
      question: 'Combien de temps avant que le filtre soit vraiment pertinent ?',
      reponse:
        'Sur les projets bien menés, le filtre atteint un bon niveau de pertinence après 6 à 10 semaines d’ajustement. Au-delà, il continue de s’affiner marginalement.',
    },
  ],

  sidebarCta: {
    titre: 'Faire le tri dans vos alertes ?',
    description: '30 minutes pour mesurer la charge réelle de notifications de vos équipes et prioriser ce qui mérite un filtre IA.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Trop d’alertes tuent l’alerte : l’IA pour faire le tri | maria',
    description:
      'Comment l’IA filtre les notifications métier pour ne remonter que les signaux utiles. Méthode et pièges. Un guide par maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
