/**
 * Seed de l'article « IA pour les commerciaux : comment gagner du temps sans dégrader vos ventes »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — déjà en base.
 * Catégorie : Méthode & gouvernance (angle cadrage + méthode, pas définition
 * technique des outils).
 *
 * Article long (~2500 mots, 12 min de lecture), premier article maria en
 * format « guide de fond ». Structure H2/H3 pour respecter la hiérarchie SEO.
 *
 * Corrections appliquées vs brief initial :
 *  - TLDR converti d'un paragraphe en 4 puces autoportantes
 *  - sousTitre + intro créés (manquants dans le brief)
 *  - seo.titre raccourci (< 70 caractères)
 *  - catégorie mappée sur une catégorie existante en base
 *  - chiffres externes non sourçables (McKinsey 65 %, 70 % d'échec, 15→22 %
 *    de conversion) reformulés en ordres de grandeur — cf. règle éditoriale
 *    maria « aucune statistique sans source explicite »
 *  - fourchettes prestataire (2-4h, 8-16 semaines, budgets) préfixées
 *    « d'après notre pratique » — transparence sur l'origine du chiffre
 *  - blocs riches maria ajoutés : definition, warning, callout, quoteAttribuee,
 *    avisMaria signé Matthieu SEILLER, inArticleCta
 *  - lien vers l'article 2 (« pièges idées reçues ») retiré car non publié —
 *    à remettre quand l'article 2 sortira
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-ia-commerciaux-gagner-temps.mjs
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
 * Helpers Portable Text — repris du template + ajout h3()
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

const h3 = (text) => ({
  _type: 'block', _key: k('h3'), style: 'h3', markDefs: [],
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
  _id: 'article-ia-commerciaux-gagner-temps',
  _type: 'article',
  slug: { _type: 'slug', current: 'ia-commerciaux-gagner-temps' },
  titre: 'IA pour les commerciaux : comment gagner du temps sans dégrader vos ventes',
  sousTitre:
    'Six usages IA font vraiment gagner du temps à vos commerciaux. La méthode qui marche : un seul cas d’usage prioritaire, un pilote court, mesurer avant de généraliser.',
  intro:
    'Vos commerciaux passent environ deux tiers de leur temps sur des tâches qui ne relèvent pas de la vente. L’IA peut en récupérer une partie, mais tous les usages ne se valent pas, et la discipline du cadrage décide de tout.',
  publishedAt: '2026-07-08T09:00:00.000Z',
  readingTime: 12,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'Un commercial passe en moyenne les deux tiers de son temps sur des tâches non-vente : saisie CRM, préparation, relances, reporting. L’IA peut en récupérer une partie.',
    'Six usages produisent l’essentiel des gains : saisie CRM, préparation de rendez-vous, relances, scoring, propositions, reporting intelligent.',
    'La méthode qui marche : un seul cas d’usage prioritaire, un pilote 8 semaines, mesurer avant de généraliser.',
    'Le vrai risque n’est pas le mauvais outil. C’est lancer plusieurs chantiers en parallèle sans avoir décidé lequel doit produire des résultats en premier.',
  ],

  /* ---- Body ---- */
  body: [
    h2('Vos commerciaux vendent-ils encore ? Le vrai chiffre à regarder'),
    paragraph(
      'D’après plusieurs études récentes sur la productivité commerciale B2B, les commerciaux consacrent en moyenne près des deux tiers de leur temps à des tâches qui ne relèvent pas directement de la vente. Saisie CRM, préparation de rendez-vous, rédaction d’emails, reporting, relances administratives. Autrement dit, moins d’un tiers de leur temps est réellement dédié à ce pour quoi ils ont été recrutés.',
    ),
    paragraph(
      'Ce constat, chaque directeur commercial le connaît intuitivement. Ce qui est plus rare, c’est de le mesurer dans son propre contexte. Sur une équipe de huit commerciaux qui perdent chacun quatre heures par semaine sur de la saisie CRM répétitive, ce sont plus de trente heures hebdomadaires de temps commercial dilué. Sur un cycle de vente moyen, ce sont plusieurs opportunités qui ne seront jamais qualifiées, plusieurs propositions qui ne partiront pas, plusieurs relances qui ne seront jamais faites.',
    ),
    blockquote(
      'Le temps perdu par vos commerciaux ne se lit pas dans les rendez-vous, il se lit dans tout ce qui devrait les entourer.',
    ),
    paragraph(
      'L’IA promet de récupérer une partie de ce temps. Mais entre la promesse marketing et la réalité opérationnelle, il y a plusieurs mois de cadrage, quelques ratés à éviter, et une hygiène projet stricte. Cet article explique par où commencer, quels usages produisent vraiment des résultats, et comment ne pas se disperser.',
    ),

    h2('Qu’est-ce que « l’IA pour les commerciaux » en 2026, concrètement ?'),
    paragraph(
      'Le terme est utilisé à toutes les sauces. Pour cadrer proprement, il faut le décomposer en trois familles distinctes, qui n’ont ni les mêmes usages ni les mêmes coûts.',
    ),
    h3('L’IA générative appliquée à la vente'),
    paragraph(
      'ChatGPT, Claude, Mistral ou Gemini utilisés par un commercial pour rédiger un email de prospection, préparer une trame de rendez-vous, reformuler une objection. Coût faible, adoption rapide, résultats immédiats mais variables selon la qualité du prompt. C’est le point d’entrée le plus courant.',
    ),
    h3('Les copilots IA intégrés aux outils commerciaux'),
    paragraph(
      'Copilot dans HubSpot, Einstein dans Salesforce, IA embarquée dans Ringover ou Aircall. L’IA fonctionne à l’intérieur du CRM ou de la plateforme téléphonique existante, sans changer les habitudes. Coût moyen (souvent un supplément d’abonnement), adoption facile, résultats corrects sur des cas d’usage standardisés.',
    ),
    h3('Les agents IA sur mesure'),
    paragraph(
      'Un système IA spécifiquement conçu pour un besoin métier précis. Par exemple : un agent qui écoute automatiquement les rendez-vous, extrait les données pertinentes, remplit le CRM selon les règles internes, et déclenche une relance si un signal d’achat est détecté. Coût plus élevé, délai de mise en œuvre plus long (typiquement six à seize semaines d’après notre pratique), mais résultats les plus alignés avec le contexte réel de l’entreprise.',
    ),
    definition(
      'Agent IA commercial sur mesure',
      'Système IA conçu spécifiquement pour un besoin commercial d’une entreprise, connecté à ses outils (CRM, téléphonie, catalogue) et à ses règles métier. Se distingue d’un copilot embarqué dans un CRM standard : le périmètre est défini équipe par équipe, et l’agent agit (il ne se contente pas de suggérer).',
    ),
    paragraph(
      'La confusion classique consiste à mélanger ces trois familles dans un même projet. Une entreprise qui veut « faire de l’IA pour ses commerciaux » doit décider en amont laquelle des trois elle attaque en premier. Sans cet arbitrage, les projets s’empilent et personne ne mesure ce qui marche.',
    ),
    warning(
      'Point de vigilance',
      'Lancer en parallèle une adoption d’IA générative, un copilot CRM et un agent sur mesure sature l’équipe et empêche tout apprentissage. C’est la première cause d’enlisement à six mois, bien avant le choix de tel ou tel outil.',
    ),

    h2('Les 6 usages IA qui font vraiment gagner du temps aux commerciaux'),
    paragraph(
      'Voici les six usages qui produisent, d’après ce que nous observons sur les projets que nous accompagnons, les gains de temps les plus significatifs. Chacun est présenté avec un ordre de grandeur du gain, ses conditions de réussite, et un signal d’alerte à surveiller.',
    ),

    h3('1. Automatiser la saisie CRM (comptes rendus, notes de rendez-vous)'),
    paragraph(
      'C’est l’usage le plus vendu par les éditeurs et le plus attendu par les commerciaux. Le principe : un outil de transcription enregistre le rendez-vous (téléphonique ou en visio), extrait les informations clés, et remplit automatiquement les champs du CRM.',
    ),
    paragraph(
      '**Gain moyen observé** : deux à quatre heures par semaine et par commercial. **Conditions de réussite** : un CRM correctement structuré en amont, un consentement client explicite à l’enregistrement, une supervision humaine sur la qualité des données extraites. **Signal d’alerte** : si votre CRM est déjà mal rempli aujourd’hui, l’IA va accélérer le remplissage médiocre. Nettoyez avant d’automatiser.',
    ),

    h3('2. Préparer les rendez-vous clients automatiquement'),
    paragraph(
      'Avant un rendez-vous, un commercial passe entre quinze et quarante-cinq minutes à collecter des informations : actualité du prospect, historique des échanges, contexte du secteur, décideurs identifiés. Une IA bien connectée peut produire cette synthèse en quelques secondes.',
    ),
    paragraph(
      '**Gain moyen observé** : une à trois heures par semaine et par commercial. **Conditions de réussite** : accès à des sources de données à jour (CRM, LinkedIn, presse sectorielle), un template de synthèse validé avec l’équipe, un check humain rapide avant chaque rendez-vous stratégique. **Signal d’alerte** : ne remplace pas la préparation stratégique sur les gros comptes. À utiliser sur les rendez-vous de qualification et de suivi, pas sur les rendez-vous de closing.',
    ),

    h3('3. Automatiser les relances commerciales'),
    paragraph(
      'Les relances non faites sont une des premières causes de deals perdus. Une IA peut suivre le pipeline en temps réel, déclencher une relance selon des règles prédéfinies (silence de cinq jours, opportunité arrêtée à un stade donné, événement client détecté), et proposer au commercial un email pré-rédigé personnalisé.',
    ),
    paragraph(
      '**Gain moyen observé** : trois à cinq heures par semaine et par commercial, plus une amélioration significative du taux de conversion. **Conditions de réussite** : un pipeline correctement segmenté, des règles de relance validées avec la direction commerciale, un droit de veto du commercial sur chaque envoi. **Signal d’alerte** : ne jamais laisser l’IA envoyer sans validation humaine. Le message générique sonne faux et abîme la relation.',
    ),

    h3('4. Prioriser les leads avec le scoring IA'),
    paragraph(
      'Le scoring de leads consiste à attribuer une note à chaque prospect en fonction de sa probabilité de conversion. L’IA analyse le comportement digital (visites, ouvertures d’email, téléchargements), les caractéristiques firmographiques (taille, secteur, technologies), et l’historique des interactions pour prioriser la liste de rappel.',
    ),
    paragraph(
      '**Effet observé** : pas tant un gain de temps qu’un gain de conversion. Les équipes bien pilotées voient une amélioration nette du taux de conversion sur leurs leads chauds. **Conditions de réussite** : un volume minimal de leads pour que l’IA apprenne (nous recommandons au moins deux cents leads par mois), une donnée d’entrée propre, un calibrage humain des seuils tous les trimestres. **Signal d’alerte** : ne pas utiliser un scoring générique sorti de la boîte. Chaque entreprise a des signaux de qualification qui lui sont propres, et l’IA doit les apprendre.',
    ),

    h3('5. Générer des propositions et devis'),
    paragraph(
      'Rédiger une proposition commerciale prend entre quarante-cinq minutes et trois heures selon la complexité. Une IA connectée au CRM, au catalogue produit et aux templates existants peut générer un premier jet cohérent en quelques minutes.',
    ),
    paragraph(
      '**Gain moyen observé** : quatre à huit heures par semaine et par commercial sur les équipes qui font beaucoup de propositions. **Conditions de réussite** : un catalogue produit structuré, des templates de proposition validés, un contrôle humain systématique avant envoi. **Signal d’alerte** : la génération automatique de proposition peut engager juridiquement l’entreprise. Toujours faire relire la proposition finale par un humain, jamais envoyer sans validation.',
    ),

    h3('6. Piloter le pipeline avec un reporting intelligent'),
    paragraph(
      'Le reporting commercial est un temps mort classique : le commercial passe deux à quatre heures par semaine à extraire des chiffres, faire des graphiques, préparer les points hebdomadaires. Une IA connectée au CRM peut produire ce reporting automatiquement, mettre en avant les signaux faibles, et alerter le manager sur les points d’attention.',
    ),
    paragraph(
      '**Gain moyen observé** : deux à quatre heures par semaine par commercial, plus une réduction du temps de préparation des points d’équipe pour le manager. **Conditions de réussite** : un CRM à jour, des KPI clairs, un rituel managérial qui utilise vraiment ce reporting. **Signal d’alerte** : le meilleur reporting du monde ne sert à rien si personne ne le lit. Cadrer d’abord l’usage managérial, ensuite construire l’outil.',
    ),

    h2('Combien de temps peut-on vraiment gagner ? Les vraies fourchettes'),
    paragraph(
      'Tableau récapitulatif : les ordres de grandeur observés sur les projets que nous accompagnons. À prendre comme des fourchettes de référence, pas comme des engagements de résultat.',
    ),
    tableau({
      enTetes: ['Usage', 'Gain hebdo par commercial', 'Effort d’installation', 'Temps avant premiers résultats'],
      lignes: [
        ['Saisie CRM automatique', '2 à 4 h', 'Moyen', '4 à 8 semaines'],
        ['Préparation de rendez-vous', '1 à 3 h', 'Faible', '2 à 4 semaines'],
        ['Relances automatisées', '3 à 5 h', 'Moyen', '6 à 10 semaines'],
        ['Scoring de leads', 'Gain de conversion', 'Fort', '8 à 16 semaines'],
        ['Génération de propositions', '4 à 8 h', 'Fort', '6 à 12 semaines'],
        ['Reporting intelligent', '2 à 4 h', 'Moyen', '4 à 8 semaines'],
      ],
    }),
    paragraph(
      'Attention aux promesses agrégées : certains éditeurs annoncent des gains de « quarante pour cent de temps » en additionnant tous les usages. En pratique, aucune équipe commerciale ne peut lancer les six chantiers en parallèle. La vraie question n’est pas « combien peut-on gagner » mais « lequel de ces chantiers doit produire des résultats en premier ».',
    ),
    callout(
      'À retenir',
      'La vraie question n’est pas quel outil choisir, c’est lequel de vos chantiers IA doit produire des résultats en premier.',
    ),

    h2('Par où commencer ? La méthode maria en 4 étapes'),
    paragraph(
      'Sur les projets IA commerciaux que nous accompagnons, une méthode s’est stabilisée. Elle tient en quatre étapes, qui prennent au total entre huit et seize semaines selon la taille de l’équipe.',
    ),

    h3('Étape 1 : Mesurer où va vraiment le temps de vos commerciaux (2 semaines)'),
    paragraph(
      'Avant de choisir un usage IA, il faut savoir ce qu’on veut récupérer. Concrètement : un sondage anonyme des commerciaux sur leurs irritants quotidiens, un tracking rapide du temps passé sur cinq activités clés pendant deux semaines, un entretien avec deux ou trois managers pour croiser leur perception avec les remontées terrain. Le résultat de cette étape est une cartographie précise : combien d’heures perdues, sur quoi, avec quel impact business. Sans cette mesure, tout le reste devient de la conviction.',
    ),

    h3('Étape 2 : Choisir un seul cas d’usage prioritaire (1 semaine)'),
    paragraph(
      'C’est l’étape la plus difficile. La tentation est toujours de vouloir attaquer plusieurs sujets en parallèle. Résister à cette tentation est ce qui distingue les projets qui produisent des résultats de ceux qui s’enlisent. Le bon cas d’usage prioritaire est celui qui coche trois cases : gain de temps mesurable, effort d’installation compatible avec vos ressources, adhésion probable des commerciaux. Un usage qui gagnerait beaucoup de temps mais que les commerciaux vont contourner ne sert à rien.',
    ),

    h3('Étape 3 : Lancer un pilote sur 8 semaines'),
    paragraph(
      'Le pilote couvre deux à quatre commerciaux volontaires, sur le cas d’usage choisi, avec un outil sélectionné en amont. L’objectif du pilote n’est pas de prouver que « l’IA marche ». C’est de valider que ce cas d’usage précis, dans votre contexte précis, avec vos commerciaux précis, produit un gain mesurable. Les indicateurs à suivre pendant le pilote : temps gagné réel (mesuré, pas déclaré), qualité des données produites, taux d’adoption par les commerciaux du pilote, retour terrain qualitatif.',
    ),

    h3('Étape 4 : Généraliser ou pivoter (4 semaines)'),
    paragraph(
      'À l’issue du pilote, trois scénarios sont possibles. Le pilote a produit les gains attendus : on généralise à toute l’équipe avec un plan d’accompagnement. Le pilote a produit des résultats partiels : on ajuste et on refait un pilote sur quatre semaines. Le pilote a échoué : on comprend pourquoi (mauvais cadrage, mauvais outil, mauvais moment) et on pivote vers un autre cas d’usage.',
    ),
    quoteAttribuee({
      texte:
        'Le vrai signal d’un projet IA commercial mature, ce n’est pas la vitesse d’exécution, c’est la capacité à pivoter sans se justifier.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),
    inArticleCta({
      titre: 'Cadrer un projet IA commercial qui gagne vraiment du temps',
      description:
        '30 minutes pour identifier le bon cas d’usage prioritaire et le pilote qui débloquera vos commerciaux.',
      lienLibelle: 'Voir comment maria fait gagner du temps à vos commerciaux →',
      lienHref: '/besoins/gagner-du-temps-commerciaux-IA',
      variant: 'yellow',
    }),

    h2('Les 3 pièges qui font échouer les projets IA commerciaux'),
    paragraph(
      'Sur la majorité des projets IA commerciaux qui s’enlisent (et ils sont nombreux), on retrouve toujours les mêmes trois pièges. Prévenus, ils sont largement évitables.',
    ),
    ...numberedList([
      '**Lancer plusieurs chantiers en parallèle.** Sur les six usages présentés, la tentation est d’en attaquer trois ou quatre en même temps pour « aller vite ». Résultat : aucun ne va au bout, l’équipe est saturée, les données CRM se dégradent, et six mois plus tard le projet est abandonné. Un seul usage à la fois, jusqu’à résultat démontré.',
      '**Confondre outil et projet.** Acheter Copilot ou installer une IA dans le CRM ne constitue pas un projet. C’est une décision d’achat. Un projet IA commercial inclut le cadrage, la formation, l’accompagnement au changement, le pilotage managérial. Sans cette dimension humaine, l’outil est sous-utilisé et rapidement abandonné.',
      '**Ne pas impliquer les managers dans le cadrage.** Les commerciaux acceptent d’utiliser l’IA si leur manager en parle. Les managers ne parlent de l’IA que s’ils comprennent ce qu’elle change dans leur rôle. La plupart des projets se concentrent sur les commerciaux et oublient les managers. C’est la première cause d’abandon à trois mois.',
    ]),
    avisMaria({
      texte:
        'La mode pousse à empiler les outils IA commerciaux : copilot dans le CRM, IA générative pour les emails, agent sur les relances. Notre conviction est inverse. Un seul cas d’usage cadré et mesuré vaut mieux que quatre chantiers parallèles qui s’enlisent. Le vrai gain de temps commercial ne vient pas de l’accumulation d’outils, il vient de la discipline du cadrage.',
      signature: 'Matthieu SEILLER',
    }),
    inArticleCta({
      titre: 'Approfondir : quels cas d’usage marchent, lesquels déraillent',
      description:
        'Le pendant analytique de cet article : 4 cas de réussite, 4 configurations qui se retournent contre vous, et les 5 questions à se poser avant de déployer.',
      lienLibelle: 'Lire l’analyse complète →',
      lienHref: '/blog/ia-processus-commerciaux-quand-ca-marche',
      variant: 'green',
    }),

    h2('Quel budget et quels délais prévoir ?'),
    paragraph(
      'Les budgets varient énormément selon le type de projet, la taille de l’équipe, et le niveau de sur-mesure attendu. Voici des ordres de grandeur observés sur les projets que nous accompagnons, à prendre comme repères pour cadrer vos discussions internes.',
    ),
    paragraph(
      '**Pour une IA générative en accès équipe** (ChatGPT, Claude, Mistral, Gemini) : entre vingt et quarante euros par utilisateur et par mois pour les abonnements pro. Sur une équipe de dix commerciaux, comptez deux cents à quatre cents euros mensuels d’abonnements, plus un à deux jours de formation initiale, plus un temps de suivi pendant les trois premiers mois.',
    ),
    paragraph(
      '**Pour un copilot intégré dans un CRM existant** (Copilot HubSpot, Einstein Salesforce) : compter un supplément de quinze à cinquante euros par utilisateur et par mois selon la formule. À cela s’ajoute un temps d’accompagnement au changement, souvent sous-estimé, qui coûte plus cher que la licence elle-même.',
    ),
    paragraph(
      '**Pour un agent IA sur mesure** : entre quinze mille et soixante mille euros pour la phase de conception et de développement, plus un budget d’exploitation mensuel qui dépend du volume de traitement. Le délai va de huit à seize semaines selon la complexité et la disponibilité de vos équipes.',
    ),
    callout(
      'À retenir',
      'Le vrai coût d’un projet IA commercial n’est pas la licence, c’est l’accompagnement au changement. Comptez plutôt trente pour cent de technique et soixante-dix pour cent de conduite du changement.',
    ),

    h2('En résumé'),
    paragraph(
      'L’IA peut faire gagner du temps significatif aux commerciaux, mais tous les usages ne se valent pas et aucun projet ne réussit sans cadrage. Les six usages qui produisent les meilleurs résultats sont l’automatisation de la saisie CRM, la préparation de rendez-vous, les relances, le scoring de leads, la génération de propositions et le reporting intelligent. La méthode qui marche : mesurer avant d’agir, choisir un seul cas d’usage prioritaire, piloter sur huit semaines, mesurer avant de généraliser. Le vrai facteur de réussite n’est pas l’outil choisi, c’est la discipline du cadrage.',
    ),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'L’IA va-t-elle remplacer les commerciaux ?',
      reponse:
        'Non. L’IA remplace certaines tâches, pas certains métiers. Ce que l’IA fait bien : automatiser du répétitif, produire des synthèses, structurer des données. Ce que l’IA fait mal : comprendre un contexte relationnel complexe, négocier, gagner la confiance d’un décideur. Le commercial de 2026 n’est pas remplacé, il est augmenté sur les tâches à faible valeur pour se concentrer sur les tâches à forte valeur.',
    },
    {
      _key: 'faq-2',
      question: 'Combien de temps faut-il pour voir des résultats concrets ?',
      reponse:
        'Sur un usage bien cadré comme la préparation de rendez-vous ou les relances, les premiers résultats se voient en quatre à six semaines. Sur un projet plus lourd (scoring de leads sur mesure, agent IA connecté), comptez douze à vingt semaines. Méfiez-vous des promesses de « résultats en deux semaines » : elles concernent des cas d’usage triviaux qui n’ont pas vraiment d’impact business.',
    },
    {
      _key: 'faq-3',
      question: 'Est-ce compatible avec le RGPD ?',
      reponse:
        'Oui, à condition de cadrer trois points : le consentement client (surtout pour les enregistrements de rendez-vous), l’hébergement des données (privilégier l’Europe), et la traçabilité des traitements (registre RGPD à jour). Sur ces sujets, mieux vaut passer deux semaines à cadrer en amont que six mois à corriger après audit.',
    },
    {
      _key: 'faq-4',
      question: 'Doit-on former les commerciaux avant de déployer ?',
      reponse:
        'Oui, systématiquement. Un outil IA déployé sans formation est utilisé à une fraction de son potentiel dans le meilleur des cas, et abandonné dans le pire. Comptez au minimum une journée de formation initiale et trois sessions de suivi de deux heures dans les trois premiers mois.',
    },
    {
      _key: 'faq-5',
      question: 'Peut-on lancer un projet IA commercial sans équipe technique interne ?',
      reponse:
        'Oui, pour les cas d’usage standards (copilots dans CRM, IA génératives, outils de transcription). Non, pour les agents IA sur mesure qui nécessitent une intégration profonde avec vos systèmes. Dans ce dernier cas, soit vous internalisez une compétence technique, soit vous passez par un partenaire qui prend la responsabilité de l’infrastructure sur la durée.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Cadrer le bon cas d’usage IA pour vos commerciaux ?',
    description: '30 minutes pour identifier la première brique qui fera vraiment gagner du temps.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'IA pour les commerciaux : gagner du temps sans dégrader | maria',
    description:
      '6 usages IA qui font gagner du temps aux commerciaux, la méthode maria pour cadrer un projet et les principaux pièges à éviter.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '— revision:', result._rev)
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
