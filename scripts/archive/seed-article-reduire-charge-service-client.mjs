/**
 * Seed de l'article « Réduire la charge de votre service client avec un agent IA :
 * méthode, budget, délais »
 *
 * Auteur : Mathieu Hernandez (Directeur produit) — `auteur-equipe-maria` en base.
 * Catégorie : Méthode & gouvernance.
 * Featured : true — le plus long et le plus sourcé du corpus (12 min, 3 sources
 * externes vérifiables).
 *
 * Nouveautés helper vs scripts précédents :
 *  - parseInline() gère maintenant les liens markdown [texte](url) → mark `link`
 *    avec `_key` et `markDefs` propres. Externes (http/https) → target=_blank auto ;
 *    internes → même onglet.
 *
 * Intégration cluster :
 *  - inArticleCta au milieu (après section budget) vers /besoins/reduire-charge-service-client-IA
 *  - Paragraphe "Voir aussi" en fin, avant En résumé, avec 2 liens croisés vers
 *    les articles cluster « productivité commerciale par l'IA »
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-reduire-charge-service-client.mjs
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

/* ============================================================================
 * Helpers Portable Text — étendus pour gérer les liens markdown inline
 * ============================================================================ */

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

/**
 * Parse une chaîne inline avec support de trois marks Portable Text :
 *   - `**gras**`     → strong
 *   - `*italique*`   → em
 *   - `[texte](url)` → link (externe → blank=true, interne → blank=false)
 *
 * Retourne { children, markDefs } — le paragraphe qui l'appelle doit passer
 * les deux au block Portable Text (les markDefs vivent au niveau du block,
 * pas des spans).
 */
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
      markDefs.push({
        _key: key,
        _type: 'link',
        href: url,
        blank: isExternal,
      })
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
  return {
    _type: 'block', _key: k('p'), style: 'normal',
    markDefs,
    children,
  }
}

const h2 = (text) => ({
  _type: 'block', _key: k('h2'), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})

const h3 = (text) => ({
  _type: 'block', _key: k('h3'), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: k('s'), text, marks: [] }],
})

const blockquote = (text) => {
  const { children, markDefs } = parseInline(text)
  return {
    _type: 'block', _key: k('bq'), style: 'blockquote', markDefs, children,
  }
}

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
  _id: 'article-reduire-charge-service-client-agent-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'reduire-charge-service-client-agent-ia' },
  titre: 'Réduire la charge de votre service client avec un agent IA : méthode, budget, délais',
  sousTitre:
    'Un guide de cadrage pour décider si votre service client est prêt, choisir la bonne cible, et anticiper coût et calendrier.',
  intro:
    'Un agent IA bien cadré absorbe une part significative des demandes répétitives sans dégrader la qualité de service. Mais tous les projets ne tiennent pas. Voici la méthode, les budgets réalistes et les délais à prévoir.',
  publishedAt: '2026-07-14T09:00:00.000Z',
  readingTime: 12,
  featured: true,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'D’après Salesforce, 30 % des cas de service client sont déjà traités par l’IA en 2025, un chiffre projeté à 50 % en 2027 sur un panel de 6 500 professionnels.',
    'Un agent IA cadré peut absorber les demandes répétitives (suivi de commande, réinitialisation, politique de retour) sans dégrader la qualité, à condition d’être supervisé.',
    'Sur les projets que nous accompagnons, comptez 4 à 10 semaines pour un premier déploiement utile, selon l’état de votre documentation existante.',
    'Trois paliers de budget structurent le marché : agent packagé (300 à 1 500 € / mois), semi-personnalisé (5 000 à 20 000 € de setup) ou sur mesure (15 000 à 60 000 €).',
    'Trois conditions non négociables : documentation à jour, supervision humaine active, périmètre borné dès le départ.',
  ],

  body: [
    h2('Où va vraiment le temps de votre service client ?'),
    paragraph(
      'Dans la plupart des services clients que nous auditons, la même structure de temps revient. Une majorité des sollicitations reçues concernent des sujets déjà documentés : suivi de commande, questions sur la politique de retour, réinitialisation d’accès, informations sur les délais, disponibilité produit. Ces demandes ne posent aucun problème de compétence, elles saturent simplement le volume et retardent tout le reste.',
    ),
    paragraph(
      'Le contexte français confirme cette dynamique. Selon [l’Observatoire des Services Clients 2025 réalisé par Ipsos BVA](https://www.escda.fr/actu/461/observatoire-des-services-clients-2025-ipsos-bva-decouvrez-letude-complete), 27 % des Français utilisent déjà une IA générative pour préparer leur demande avant de contacter un service client. Ce chiffre traduit une bascule silencieuse : le client arrive mieux informé, mais aussi plus exigeant sur la précision de la réponse.',
    ),
    paragraph(
      'Le vrai coût n’est pas dans ces demandes triviales. Il est dans ce qu’elles font attendre : le client mécontent qui reste en file, le cas complexe qui traîne, l’opportunité de rétention qui passe. Chaque minute passée sur du répétitif est une minute qui n’est plus consacrée à ce qui différencie vraiment un bon service client d’un mauvais.',
    ),
    paragraph(
      'La dernière édition du [rapport State of Service de Salesforce](https://www.salesforce.com/news/stories/state-of-service-report-announcement-2025/) (7e édition, 2025), basée sur 6 500 professionnels du service client dans le monde, confirme l’ampleur du sujet : 30 % des cas sont déjà traités par l’IA, un chiffre projeté à 50 % d’ici 2027 par les leaders CX interrogés. L’IA n’est plus un pari, c’est un chantier structurant que les concurrents mènent déjà.',
    ),
    paragraph(
      'Un agent IA bien cadré ne résout pas tous les problèmes du service client. Il libère un volume de temps significatif sur les demandes qui peuvent être absorbées automatiquement, à condition que le cadrage en amont soit sérieux. C’est ce cadrage que ce guide détaille.',
    ),
    callout(
      'À retenir',
      'La question n’est pas « faut-il un agent IA ? ». C’est « quel volume précis de demandes récurrentes voulons-nous absorber, et sommes-nous prêts à documenter et superviser ce périmètre ? ».',
    ),

    h2('Qu’est-ce qu’un agent IA de service client, concrètement ?'),
    paragraph(
      'Le terme « agent IA » couvre plusieurs réalités techniques très différentes. Pour cadrer proprement un projet, il faut savoir de quoi on parle.',
    ),
    definition(
      'Agent IA de service client',
      'Système conversationnel qui comprend une demande formulée en langage naturel, s’appuie sur une base de connaissance validée pour formuler une réponse, et transfère à un humain les cas qu’il ne peut ou ne doit pas traiter seul.',
    ),
    paragraph(
      'Trois familles existent aujourd’hui sur le marché, chacune avec ses cas d’usage propres.',
    ),
    paragraph(
      '**Les chatbots à règles.** Un scénario prédéfini avec des boutons et des arbres de décision. Peu chers, faciles à mettre en place, mais très limités : dès qu’une question sort du cadre prévu, l’utilisateur est bloqué. Ils sont progressivement remplacés par les deux familles suivantes.',
    ),
    paragraph(
      '**Les agents IA basés sur LLM.** Ils utilisent des modèles de langage (GPT, Claude, Mistral, Gemini) pour comprendre la demande et générer une réponse. Bien plus flexibles, mais nécessitent un cadrage strict de la base de connaissance pour éviter les réponses inventées.',
    ),
    paragraph(
      '**Les agents IA hybrides.** Combinaison des deux : arbres décisionnels pour les cas standardisés (créer un ticket, vérifier une commande) et LLM pour les demandes ouvertes. C’est le modèle qui produit aujourd’hui les meilleurs résultats en environnement professionnel.',
    ),
    paragraph(
      'Un point de vigilance essentiel : selon le [rapport CX Trends 2025 de Zendesk](https://www.zendesk.com/newsroom/articles/2025-cx-trends-report/), basé sur 10 000 consommateurs et leaders business, 64 % des consommateurs font davantage confiance aux agents IA qui montrent de l’empathie et de la personnalité. La performance technique ne suffit pas, la posture conversationnelle compte tout autant.',
    ),
    paragraph(
      'Un agent IA moderne ne parle pas au client « en autonomie totale ». Il agit dans un périmètre défini par vous, avec des règles de bascule vers l’humain claires, et une supervision continue.',
    ),

    h2('Que peut absorber un agent IA (et que doit-il laisser à vos équipes) ?'),
    paragraph(
      'Sur les projets que nous accompagnons, une grille de discernement s’est stabilisée. Elle distingue ce qui se prête à l’automatisation de ce qui doit rester humain.',
    ),
    tableau({
      enTetes: ['Type de demande', 'Peut être absorbée ?', 'Condition'],
      lignes: [
        ['Suivi de commande / expédition', 'Oui', 'Connexion au système logistique'],
        ['Politique retour, livraison, garantie', 'Oui', 'Documentation à jour et validée'],
        ['Réinitialisation d’accès, mot de passe', 'Oui', 'Système d’authentification connecté'],
        ['Renseignements produit (dispo, caractéristiques)', 'Oui', 'Catalogue produit structuré'],
        ['Réclamation simple avec compensation standardisée', 'Partiellement', 'Règles prédéfinies + validation humaine finale'],
        ['Litige, insatisfaction manifeste', 'Non', 'Signal émotionnel, escalade immédiate humaine'],
        ['Cas complexe multi-produits ou multi-canaux', 'Non', 'Contexte trop large, nécessite jugement'],
      ],
    }),
    paragraph(
      'Cette grille n’est pas universelle. Chaque service client a ses spécificités sectorielles. Mais elle donne une base de discussion utile en début de projet.',
    ),
    paragraph(
      'Le rappel de l’Observatoire Ipsos BVA 2025 est ici essentiel : 90 % des Français déclarent préférer attendre pour échanger avec un conseiller humain plutôt que d’être immédiatement traités par une IA. Cette donnée doit orienter la conception de tout projet d’agent IA en France. La bascule vers l’humain doit être proposée systématiquement, pas cachée en bas d’un menu.',
    ),
    warning(
      'Point de vigilance',
      'Le piège classique : vouloir automatiser d’un coup 100 % des demandes récurrentes. Le bon rythme est d’absorber d’abord les 3 à 5 motifs les plus fréquents, valider que la qualité tient, puis élargir progressivement.',
    ),

    h2('La méthode maria en 4 étapes pour déployer un agent IA sans casser la relation client'),
    paragraph(
      'Sur les projets d’agent IA que nous cadrons, une méthode s’est stabilisée. Elle tient en quatre étapes et permet d’arriver à un déploiement utile en 4 à 10 semaines selon les contextes.',
    ),

    h3('Étape 1 : Audit et cartographie des motifs récurrents (1 à 2 semaines)'),
    paragraph(
      'Avant de choisir un outil, il faut savoir exactement quoi automatiser. Concrètement : analyse d’un échantillon représentatif de tickets ou de conversations sur les trois derniers mois, identification des 10 à 20 motifs les plus fréquents, évaluation de leur potentiel d’automatisation, choix des 3 à 5 motifs prioritaires pour le pilote.',
    ),
    paragraph(
      'Cette étape produit le document de cadrage qui guidera tout le projet. Sans elle, le projet dérape dans les deux mois : on veut tout automatiser, on ne mesure rien, on ne sait pas si ça marche.',
    ),

    h3('Étape 2 : Préparation ou consolidation de la base de connaissance (2 à 4 semaines)'),
    paragraph(
      'C’est l’étape que la plupart des projets sous-estiment. Un agent IA ne peut être bon que si sa documentation source l’est. Concrètement : cartographie de la documentation existante (FAQ, procédures internes, articles d’aide), identification des trous et des contradictions, réécriture des contenus obsolètes, structuration en formats que l’IA peut consommer.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons, cette étape prend souvent plus de temps que le déploiement technique lui-même. Elle est aussi celle qui produit le plus de valeur durable : une documentation propre sert bien au-delà de l’agent IA.',
    ),

    h3('Étape 3 : Pilote sur périmètre borné (3 à 4 semaines)'),
    paragraph(
      'Le pilote couvre les 3 à 5 motifs prioritaires identifiés en étape 1, sur un canal précis (souvent le chat ou le formulaire de contact web), avec une supervision humaine active. L’objectif n’est pas de « prouver que l’IA marche ». C’est de valider que **sur ces motifs précis, dans votre contexte précis, avec votre documentation précise, l’agent produit des réponses de qualité mesurée**.',
    ),
    paragraph(
      'Indicateurs à suivre pendant le pilote : taux de réponse pertinente, taux d’escalade nécessaire, satisfaction client mesurée après interaction, retour qualitatif des agents humains sur les cas transférés.',
    ),

    h3('Étape 4 : Généralisation ou pivot (1 à 2 semaines)'),
    paragraph(
      'À l’issue du pilote, trois scénarios possibles. Le pilote a produit les résultats attendus : on élargit le périmètre à d’autres motifs et d’autres canaux avec un plan documenté. Les résultats sont partiels : on ajuste (base de connaissance, règles d’escalade) et on refait deux semaines de test. Le pilote a échoué : on comprend pourquoi (mauvaise documentation, mauvais choix de motifs, sous-estimation de la complexité sectorielle) et on pivote.',
    ),
    avisMaria({
      texte:
        'La mode pousse à commencer par l’outil. Notre conviction est inverse. Un agent IA n’est jamais meilleur que la documentation sur laquelle il s’appuie et que la discipline de supervision qui l’entoure. Sur les projets que nous accompagnons, les deux tiers du temps de cadrage sont consacrés à ces deux points, avant même que la première ligne de code soit écrite.',
      signature: 'Mathieu HERNANDEZ',
    }),

    h2('Combien ça coûte ? Les 3 paliers de budget selon votre volume'),
    paragraph(
      'Le marché propose trois grandes catégories de solutions, avec des budgets très différents. Voici les fourchettes que nous constatons sur nos projets et sur les benchmarks que nous suivons.',
    ),

    h3('Palier 1 : Agent packagé (300 à 1 500 € / mois)'),
    paragraph(
      'Solutions clé en main type Intercom Fin, Zendesk AI Agents, Tidio Lyro. Facturation à l’usage (par résolution automatique) ou à l’abonnement. Adaptées aux petites équipes avec des motifs très standards (e-commerce, SaaS grand public, prise de rendez-vous).',
    ),
    paragraph(
      '**Ce qu’on obtient** : intégration rapide (quelques jours), documentation à fournir mais format standard, résultats corrects sur les cas simples, peu de personnalisation possible.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : maîtrise fine du comportement, souveraineté des données, adaptation à des processus métier complexes.',
    ),
    paragraph(
      '**Coût total sur 12 mois pour une PME de 30 à 50 personnes** : d’après notre pratique, 5 000 à 20 000 € tout compris (abonnement + prestation d’intégration légère).',
    ),

    h3('Palier 2 : Agent semi-personnalisé (5 000 à 20 000 € de setup + coût d’usage)'),
    paragraph(
      'Plateformes plus flexibles type Botpress, Voiceflow, Rasa, ou intégrateurs qui construisent sur des LLM (OpenAI, Anthropic, Mistral) avec une couche RAG. Personnalisation possible sur les scénarios, la documentation, les règles d’escalade.',
    ),
    paragraph(
      '**Ce qu’on obtient** : adaptation à des processus métier spécifiques, contrôle du comportement de l’agent, meilleure gestion des cas complexes.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : intégration profonde avec vos systèmes internes (à moins d’un développement complémentaire), souveraineté totale.',
    ),
    paragraph(
      '**Coût total sur 12 mois pour une PME/ETI** : d’après notre pratique, 15 000 à 40 000 € tout compris.',
    ),

    h3('Palier 3 : Agent sur mesure (15 000 à 60 000 € de développement + exploitation)'),
    paragraph(
      'Développement dédié, intégration profonde avec vos systèmes (CRM, base produit, ERP, système de ticketing), hébergement au choix (Europe, on-premise), maîtrise complète du comportement. C’est le palier que nous recommandons quand le service client est un enjeu stratégique et que les motifs à automatiser sont spécifiques au métier — c’est l’objet de notre offre [outils IA internes sur mesure](/services/outils-IA-internes-sur-mesure).',
    ),
    paragraph(
      '**Ce qu’on obtient** : maîtrise complète, souveraineté, capacité à évoluer sans dépendance à un éditeur, intégration profonde avec l’existant.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : la simplicité d’un déploiement clé en main. Ce palier demande une équipe interne engagée sur la durée.',
    ),
    paragraph(
      '**Coût total sur 12 mois pour une ETI** : d’après notre pratique, 30 000 à 80 000 € tout compris (développement initial + exploitation + accompagnement).',
    ),
    callout(
      'À retenir',
      'Le coût ne se réduit jamais à la licence ou au développement initial. Comptez toujours 30 à 40 % de budget d’accompagnement au changement, formation des équipes support, curation continue de la documentation. C’est ce budget invisible qui fait la différence entre un agent qui tourne et un agent qui apporte de la valeur.',
    ),
    inArticleCta({
      titre: 'Cadrer votre projet d’agent IA service client',
      description:
        '30 minutes pour distinguer ce qui peut être délégué à un agent IA de ce qui doit rester à vos équipes, avant tout engagement budgétaire.',
      lienLibelle: 'Voir comment maria cadre ce type de projet →',
      lienHref: '/besoins/reduire-charge-service-client-IA',
      variant: 'yellow',
    }),

    h2('Combien de temps pour être opérationnel ? Les délais réalistes'),
    paragraph(
      'Les délais annoncés par les éditeurs sont souvent optimistes. Voici ce que nous observons sur les projets réels que nous accompagnons.',
    ),
    paragraph(
      '**Agent packagé** : 2 à 4 semaines pour un premier déploiement, à condition que la documentation soit déjà en état correct. Dans la réalité, la préparation de la documentation ajoute souvent 4 à 6 semaines supplémentaires qui ne sont pas comptabilisées dans le pitch commercial.',
    ),
    paragraph(
      '**Agent semi-personnalisé** : 6 à 10 semaines pour un pilote sur périmètre borné, 3 à 6 mois pour une généralisation complète.',
    ),
    paragraph(
      '**Agent sur mesure** : 10 à 16 semaines pour la première version productive, avec une montée en périmètre progressive sur 6 à 12 mois.',
    ),
    paragraph(
      'Ces délais supposent que trois conditions sont réunies dès le départ : un sponsor identifié côté direction, une personne dédiée côté service client pour le cadrage et le pilotage, une équipe technique disponible pour les intégrations. Sans ces trois conditions, prévoir 30 à 50 % de délai supplémentaire.',
    ),
    paragraph(
      'Ces observations rejoignent les projections du rapport State of Service 2025 de Salesforce : les entreprises qui réussissent leur déploiement d’IA anticipent en moyenne 20 % de réduction des coûts et des temps de résolution, un ordre de grandeur cohérent avec ce que nous constatons quand le cadrage est mené sérieusement.',
    ),

    h2('Les 3 conditions non négociables pour que ça marche'),
    paragraph(
      'Sur les projets qui échouent, les mêmes causes reviennent. Trois conditions doivent être réunies dès le départ pour éviter les impasses.',
    ),
    paragraph(
      '**Condition 1 : Une documentation à jour, structurée, validée.** Un agent IA n’invente pas ses réponses (ou alors mal). Il s’appuie sur ce que vous lui donnez à lire. Si votre documentation actuelle est dispersée entre plusieurs outils, contradictoire par endroits, ou obsolète depuis dix-huit mois, aucun agent IA ne pourra bien fonctionner. La préparation documentaire est le prérequis, pas une option (voir [notre guide dédié à la préparation d’une base de connaissance pour agent IA](/blog/base-de-connaissance-agent-ia-service-client)).',
    ),
    paragraph(
      '**Condition 2 : Une supervision humaine active, pas de « roue libre ».** L’agent IA n’est pas un remplacement du service client. C’est un premier niveau qui absorbe les demandes récurrentes, en dessous d’une supervision qui vérifie ce qui est produit. Concrètement : une personne dédiée qui relit un échantillon des conversations chaque jour, ajuste les règles selon les retours, prend la main quand l’agent bute.',
    ),
    paragraph(
      '**Condition 3 : Un périmètre borné, communiqué explicitement.** Le client doit savoir qu’il parle à une IA et qu’il peut demander un humain à tout moment. Le périmètre couvert doit être clair (l’agent traite les commandes, les retours et l’accès compte, il transfère le reste). Cette transparence n’est pas seulement une exigence RGPD (enjeu de conformité que nous cadrons systématiquement en amont, [voir notre besoin dédié](/besoins/conformite-rgpd-ia)) : c’est aussi ce qui préserve la confiance sur la durée, en cohérence avec le constat de l’Observatoire Ipsos BVA 2025, les Français restent attachés à la présence humaine.',
    ),
    quoteAttribuee({
      texte:
        'Les projets qui échouent ne sont presque jamais des projets où l’outil était mauvais. Ce sont des projets où l’entreprise a voulu absorber trop vite, sur un périmètre mal cadré, sans avoir préparé la documentation ni prévu la supervision. Le bon rythme, c’est trois motifs qui marchent vraiment avant d’en ajouter deux.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer si vous êtes convaincu ?'),
    paragraph(
      'Si vous vous reconnaissez dans ce qui précède, voici l’ordre d’action que nous recommandons. Il ne demande pas de budget significatif au démarrage.',
    ),
    paragraph(
      '**Semaine 1** : lister les 10 motifs de contact les plus fréquents de votre service client (vos superviseurs les connaissent par cœur). Estimer le volume de chacun. Identifier ceux qui apparaissent comme « évidents » candidats à l’automatisation.',
    ),
    paragraph(
      '**Semaine 2** : auditer l’état de votre documentation sur ces motifs. La réponse existe-t-elle ? Est-elle à jour ? Est-elle formulée de manière utilisable ? Cette étape révèle souvent que le vrai chantier n’est pas l’IA, c’est la documentation.',
    ),
    paragraph(
      '**Semaine 3** : identifier la personne côté service client qui portera le projet. Sans sponsor interne engagé, aucun projet ne tient. Cette personne n’a pas besoin d’être technique. Elle doit connaître le métier et avoir l’autorité pour arbitrer.',
    ),
    paragraph(
      '**Semaine 4** : consulter deux ou trois prestataires ou éditeurs sur votre cadrage. Comparer leurs propositions non pas sur les prix affichés, mais sur leur capacité à parler juste du sujet documentation et supervision. Un prestataire qui vous vend l’outil sans creuser ces deux points passera à côté de l’essentiel.',
    ),
    paragraph(
      'À l’issue de ces 4 semaines, vous avez soit décidé de démarrer, soit compris ce qu’il vous manque encore pour démarrer proprement. Dans les deux cas, vous n’aurez pas perdu de temps.',
    ),
    paragraph(
      'Dans la même famille « Productivité opérationnelle », voir aussi [IA pour les commerciaux : comment gagner du temps sans dégrader vos ventes](/blog/ia-commerciaux-gagner-temps) et [IA dans vos processus commerciaux : quand ça marche, quand ça déraille](/blog/ia-processus-commerciaux-quand-ca-marche).',
    ),

    h2('En résumé'),
    paragraph(
      'Un agent IA peut réellement réduire la charge de votre service client, mais pas dans les conditions vendues par les démos éditeurs. La réussite tient à trois éléments : une documentation propre et structurée, une supervision humaine active, un périmètre borné et communiqué. Le budget varie de 5 000 à 80 000 € par an tout compris selon le palier choisi. Les délais réalistes vont de 6 à 16 semaines selon la complexité. Le bon rythme n’est pas « tout automatiser vite », c’est trois motifs qui marchent vraiment avant d’en ajouter deux. Sur cette base, l’IA devient un vrai levier. Sans cette discipline, elle produit un chatbot déguisé qui abîme la relation client au lieu de la préserver.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Un agent IA peut-il remplacer entièrement un service client humain ?',
      reponse:
        'Non. D’après l’Observatoire Ipsos BVA 2025, 90 % des Français préfèrent attendre pour parler à un conseiller humain. Sur les meilleurs déploiements que nous observons, l’agent IA absorbe une majorité des demandes récurrentes, ce qui libère les équipes humaines pour les cas à valeur (rétention, insatisfaction, complexe). Aucun agent IA ne peut gérer seul la relation client dans sa complexité émotionnelle et relationnelle.',
    },
    {
      _key: 'faq-2',
      question: 'Faut-il informer le client qu’il parle à une IA ?',
      reponse:
        'Oui, obligatoirement en Europe. Le RGPD impose la transparence sur l’usage d’un système automatisé et le droit du client à demander un humain à tout moment. Cette transparence n’est pas un frein commercial : sur les projets bien menés, elle renforce même la confiance.',
    },
    {
      _key: 'faq-3',
      question: 'Combien de temps avant d’observer un vrai gain sur le volume de tickets ?',
      reponse:
        'Sur un projet bien cadré, les premiers effets se voient dès 6 à 8 semaines après mise en production. Un impact significatif sur le volume total demande 3 à 6 mois, le temps que l’agent monte en périmètre et que la supervision affine les règles.',
    },
    {
      _key: 'faq-4',
      question: 'Est-ce compatible avec un helpdesk existant (Zendesk, Freshdesk, Intercom) ?',
      reponse:
        'Oui, tous les helpdesks modernes proposent des connecteurs ou APIs pour intégrer un agent IA. Le choix stratégique est de savoir si vous prenez l’agent IA de votre helpdesk (plus simple, moins personnalisable) ou un agent tiers connecté (plus flexible, plus d’effort d’intégration).',
    },
    {
      _key: 'faq-5',
      question: 'Peut-on démarrer sans équipe technique interne ?',
      reponse:
        'Oui, sur les paliers 1 et 2 (agent packagé, agent semi-personnalisé). Sur le palier 3 (sur mesure), la présence d’une compétence technique interne est fortement recommandée, ou à défaut un partenaire qui prend la responsabilité de l’infrastructure sur la durée.',
    },
  ],

  sidebarCta: {
    titre: 'Réduire la charge de votre service client ?',
    description: '30 minutes pour cadrer les motifs à absorber en priorité et les prérequis à préparer.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Réduire la charge du service client avec un agent IA | maria',
    description:
      'Méthode, budget et délais pour déployer un agent IA sur votre service client. Un guide de cadrage par maria, agence IA pour l’interne.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
