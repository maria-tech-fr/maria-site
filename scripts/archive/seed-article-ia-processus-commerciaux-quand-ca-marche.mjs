/**
 * Seed de l'article « IA dans vos processus commerciaux : quand ça marche,
 * quand ça déraille (et comment savoir avant de se lancer) »
 *
 * Article 2 du cluster « productivité commerciale par l'IA ». Pendant
 * analytique de l'article 1 (« IA pour les commerciaux : comment gagner du
 * temps sans dégrader vos ventes ») — même auteur, même catégorie, même CTA.
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — déjà en base.
 * Catégorie : Méthode & gouvernance (« Cadrage & méthode » du brief n'existe pas).
 *
 * Corrections appliquées vs brief initial :
 *  - TLDR converti d'un paragraphe unique en 4 puces autoportantes
 *  - sousTitre + intro créés (manquants dans le brief)
 *  - seo.titre déjà OK (69 chars)
 *  - Chiffres externes non sourçables reformulés en ordres de grandeur
 *    (« McKinsey 30-35 % », « 60-70 % projets échouent », « 15→22 % conversion »)
 *  - Fourchettes prestataire préfixées « d'après notre pratique »
 *  - Blocs riches maria ajoutés (definition, tableau, callouts, warnings,
 *    avisMaria signé Matthieu SEILLER, quoteAttribuee, inArticleCta)
 *  - Em-dashes des 5 titres de questions remplacés par « : »
 *  - Signature « Écrit par Matthieu SEILLER » de fin d'article retirée
 *    (redondante avec les métadonnées auteur Sanity)
 *  - Italiques inline `*mot*` du brief préservés en marks Portable Text
 *    (helper parseInline enrichi)
 *
 * Lancement (depuis le dossier frontend/) :
 *   node --env-file=.env.local scripts/seed-article-ia-processus-commerciaux-quand-ca-marche.mjs
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
 * Helpers Portable Text — étendus pour gérer l'italique inline `*texte*`
 * ============================================================================ */

let keyCounter = 0
const k = (prefix = 'b') => `${prefix}-${++keyCounter}`

/**
 * Parse inline pour les marks Portable Text :
 *   - `**gras**` → strong
 *   - `*italique*` → em (attention : simple astérisque, pas confondre avec `**`)
 * L'ordre de la regex garantit que `**` est matché avant `*` pour éviter les
 * conflits. Chaque part non-matchée devient un span sans marks.
 */
function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { _type: 'span', _key: k('s'), text: part.slice(2, -2), marks: ['strong'] }
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return { _type: 'span', _key: k('s'), text: part.slice(1, -1), marks: ['em'] }
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
  _id: 'article-ia-processus-commerciaux-quand-ca-marche',
  _type: 'article',
  slug: { _type: 'slug', current: 'ia-processus-commerciaux-quand-ca-marche' },
  titre: 'IA dans vos processus commerciaux : quand ça marche, quand ça déraille (et comment savoir avant de se lancer)',
  sousTitre:
    'Quatre cas d’usage produisent de vrais gains. Quatre configurations font perdre du temps ou dégradent la relation client. La différence se joue toujours en amont, sur le cadrage.',
  intro:
    'L’IA appliquée aux processus commerciaux tient parfois toutes ses promesses. Parfois, elle fait perdre plus de temps qu’elle n’en fait gagner. Cet article distingue les deux, avec les cinq questions à se poser avant de déployer.',
  publishedAt: '2026-07-10T09:00:00.000Z',
  readingTime: 10,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  /* ---- TL;DR ---- */
  tldr: [
    'L’IA appliquée aux processus commerciaux tient parfois toutes ses promesses, parfois elle fait perdre plus de temps qu’elle n’en fait gagner. La différence ne se joue pas sur l’outil.',
    'Quatre cas d’usage produisent de vrais gains : compte rendu automatique, préparation de rendez-vous, scoring de leads, relance contextuelle.',
    'Quatre configurations retournent l’IA contre l’équipe : automatisation totale sans supervision, prospection industrialisée, propositions sans relecture, enregistrements sans cadrage RGPD.',
    'Cinq questions permettent de savoir avant de démarrer si un projet est prêt. Y répondre honnêtement fait gagner six mois.',
  ],

  /* ---- Body ---- */
  body: [
    h2('L’IA dans les processus commerciaux : une promesse à double tranchant'),
    paragraph(
      'L’intelligence artificielle a envahi les discussions des comités de direction commerciale depuis 2023. Les études convergent sur un même constat : les commerciaux ne consacrent qu’environ un tiers de leur temps à la vente proprement dite. Le reste part dans la saisie CRM, la préparation de rendez-vous, les relances administratives, le reporting.',
    ),
    paragraph(
      'L’IA promet de récupérer une partie de ce temps. Sur le papier, c’est irrésistible. Sur le terrain, une large part des projets IA commerciaux ne tiennent pas leurs promesses. Certains produisent l’inverse de l’effet recherché : commerciaux qui passent plus de temps à vérifier ce que l’IA a mal fait qu’ils n’en gagnent à automatiser, taux de réponse des prospects qui chute parce que les emails deviennent trop lisses, données CRM qui se dégradent parce que l’automatisation remplit vite mais mal.',
    ),
    paragraph(
      '**Ce n’est pas l’IA qui est en cause. C’est la façon dont elle est intégrée.** Certains cas d’usage sont d’une efficacité redoutable. D’autres sont des mirages vendus par des éditeurs qui n’ont jamais mesuré leur impact réel en dehors de démos calibrées. La difficulté, pour un directeur commercial, c’est de savoir à l’avance dans quelle catégorie tombe le projet qu’il envisage.',
    ),
    paragraph(
      'Voici notre analyse, tirée des projets IA commerciaux que nous accompagnons chez maria.',
    ),

    h2('Les 4 cas d’usage où l’IA fait vraiment gagner du temps'),
    paragraph(
      'Quatre cas d’usage sortent du lot par leur rapport effort / impact. Ils partagent trois caractéristiques : ils s’appliquent à des tâches à faible valeur ajoutée qui rongent le temps sans le montrer, ils tolèrent une supervision humaine légère, et leur gain est mesurable rapidement. Les fourchettes qui suivent correspondent aux ordres de grandeur observés sur les projets que nous accompagnons.',
    ),

    h3('1. Le compte rendu automatique de rendez-vous'),
    paragraph(
      'Un commercial passe entre vingt et quarante-cinq minutes à rédiger un compte rendu après un rendez-vous client. Sur une équipe qui fait quinze rendez-vous par semaine, c’est plusieurs heures perdues. Un outil de transcription IA couplé à un modèle de structuration produit ce compte rendu en quelques minutes, à partir de l’enregistrement audio ou vidéo du rendez-vous.',
    ),
    paragraph(
      '**Ce qui marche** : le commercial reste maître de l’échange, il n’est plus obligé de choisir entre écouter et prendre des notes. Le compte rendu généré est structuré selon un template validé par la direction commerciale (contexte, besoins exprimés, prochaines étapes, points d’attention). Le commercial le relit, l’ajuste, le valide.',
    ),
    paragraph(
      '**Gain moyen observé** : deux à quatre heures par semaine par commercial. **Condition non négociable** : le consentement du client à l’enregistrement doit être obtenu explicitement en début de rendez-vous. Sans cela, le projet crée un risque juridique et une rupture de confiance.',
    ),

    h3('2. La préparation de rendez-vous augmentée'),
    paragraph(
      'Avant un rendez-vous stratégique, un commercial compile plusieurs sources : actualité du prospect, décideurs identifiés sur LinkedIn, historique CRM, contexte du secteur, produits déjà signés ailleurs dans l’entreprise. Cette compilation prend entre quinze et quarante-cinq minutes selon la complexité du dossier.',
    ),
    paragraph(
      'Une IA correctement connectée aux sources internes et externes produit cette synthèse en quelques secondes. Le commercial arrive au rendez-vous mieux préparé, avec des angles d’attaque plus précis et une capacité à personnaliser son discours dès les premières minutes.',
    ),
    paragraph(
      '**Ce qui marche** : le gain n’est pas seulement en temps, il est aussi en qualité d’échange. Un commercial mieux préparé pose de meilleures questions, détecte plus vite les vrais enjeux, et gagne en crédibilité auprès du décideur.',
    ),
    paragraph(
      '**Gain moyen observé** : une à trois heures par semaine par commercial, plus une amélioration du taux de transformation des rendez-vous qualifiés en opportunités. **Condition non négociable** : les sources connectées doivent être fiables et à jour. Une IA qui synthétise des données obsolètes produit un désastre en rendez-vous.',
    ),

    h3('3. La priorisation des leads par scoring intelligent'),
    paragraph(
      'Toutes les équipes commerciales sont confrontées au même problème : trop de leads, pas assez de temps pour les qualifier tous. Le scoring de leads classique repose sur des règles fixes (taille de l’entreprise, secteur, comportement digital). L’IA ajoute une couche d’analyse comportementale et historique pour prédire quels leads ont vraiment une chance de conclure.',
    ),
    definition(
      'Scoring de leads intelligent',
      'Attribution d’une note à chaque prospect par une IA qui croise en continu les signaux comportementaux (visites, ouvertures d’email, téléchargements), les caractéristiques firmographiques (taille, secteur, technologies) et l’historique commercial. Se distingue du scoring classique à règles fixes : les seuils évoluent à mesure que les données s’accumulent.',
    ),
    paragraph(
      '**Ce qui marche** : le commercial concentre son temps sur la petite fraction de leads qui produit l’essentiel du chiffre. Le scoring évolue en continu à mesure que les données s’accumulent, sans travail manuel de calibrage.',
    ),
    paragraph(
      '**Effet observé** : pas tant un gain de temps qu’un gain de conversion. Les équipes bien pilotées voient une amélioration significative du taux de conversion sur leurs leads chauds. **Condition non négociable** : un volume minimal de données (au moins deux cents leads par mois d’après notre pratique) pour que l’IA apprenne. En dessous, le scoring reste générique et n’apporte pas de valeur.',
    ),

    h3('4. La relance commerciale contextuelle'),
    paragraph(
      'Les relances non faites sont une des premières causes de deals perdus. L’IA peut suivre le pipeline en temps réel, détecter les opportunités qui stagnent, et proposer au commercial un email de relance pré-rédigé, personnalisé selon l’historique de la conversation.',
    ),
    paragraph(
      '**Ce qui marche** : le commercial garde la main sur l’envoi. Il valide, ajuste, ou refuse. L’IA ne remplace pas la décision, elle propose une prochaine action à un moment où l’humain n’aurait pas pensé à relancer.',
    ),
    paragraph(
      '**Gain moyen observé** : trois à cinq heures par semaine par commercial, plus une amélioration du taux de closing sur les opportunités qui auraient été abandonnées. **Condition non négociable** : jamais d’envoi automatique sans validation humaine. Un message générique sonne faux et abîme la relation, y compris sur les prospects qui étaient à deux doigts de signer.',
    ),

    tableau({
      enTetes: ['Cas d’usage', 'Gain observé', 'Condition non négociable'],
      lignes: [
        ['Compte rendu automatique', '2 à 4 h / semaine / commercial', 'Consentement client explicite à l’enregistrement'],
        ['Préparation de rendez-vous', '1 à 3 h / semaine / commercial', 'Sources connectées fiables et à jour'],
        ['Scoring de leads intelligent', 'Gain de conversion (pas de temps)', 'Volume minimum de deux cents leads par mois'],
        ['Relance contextuelle', '3 à 5 h / semaine / commercial', 'Aucun envoi sans validation humaine'],
      ],
    }),

    h2('Les 4 configurations où l’IA se retourne contre vous'),
    paragraph(
      'Face à ces cas de réussite, voici quatre configurations où l’IA fait perdre du temps, dégrade la relation client, ou crée des risques. Ce ne sont pas des cas d’usage à éviter par principe : ce sont des cas d’usage à cadrer avec une vigilance particulière.',
    ),

    h3('1. L’automatisation totale de la saisie CRM sans supervision'),
    paragraph(
      'Le cas d’usage le plus vendu par les éditeurs. Sur le papier : plus de saisie manuelle, données toujours à jour, commerciaux libérés de la corvée administrative. Dans la réalité, quand l’automatisation est totale et sans supervision, trois problèmes apparaissent en quelques semaines.',
    ),
    paragraph(
      '**Premier problème** : l’IA remplit vite mais mal. Elle extrait ce qu’elle a compris, pas ce qui compte. Un rendez-vous où le prospect a lâché une phrase clé en fin d’échange peut être résumé sans cette phrase. Le compte rendu est propre, structuré, professionnel, et à côté de l’essentiel.',
    ),
    paragraph(
      '**Deuxième problème** : les commerciaux perdent le rituel du CRM. Or ce rituel, aussi pénible qu’il soit, est aussi le moment où ils se posent la question *qu’est-ce qui compte vraiment dans ce que j’ai entendu*. Supprimer le rituel, c’est supprimer une couche d’analyse qualitative.',
    ),
    paragraph(
      '**Troisième problème** : les données CRM deviennent moins fiables. Comme personne ne les regarde vraiment, elles se dégradent silencieusement. Six mois plus tard, quand un manager veut faire une analyse pipeline, les données ne racontent plus la réalité.',
    ),
    paragraph(
      '**Comment éviter le piège** : automatiser la génération du compte rendu, mais imposer une validation humaine avant intégration au CRM. Deux minutes de relecture valent mieux qu’un pipeline pourri.',
    ),

    h3('2. La prospection à froid entièrement automatisée par IA'),
    paragraph(
      'Les outils qui promettent d’envoyer cinq cents emails de prospection personnalisés par jour existent. Ils fonctionnent techniquement. Ils échouent commercialement.',
    ),
    paragraph(
      '**Ce qui se passe** : les prospects reçoivent plusieurs messages de ce type par jour. Ils reconnaissent le style « personnalisé par IA » en deux secondes. Ils ne répondent pas. Pire : ils marquent votre domaine comme spammeur, ce qui dégrade la délivrabilité de vos emails légitimes pendant des mois.',
    ),
    paragraph(
      '**Ce qui marche mieux** : utiliser l’IA pour préparer cinq à dix messages ultra-personnalisés par jour, sur des prospects vraiment ciblés, avec un contenu qui prouve que le commercial a fait ses devoirs. Moins de volume, plus de conversion. C’est contre-intuitif dans un monde qui valorise l’automatisation, mais c’est ce qui produit du chiffre en 2026.',
    ),
    paragraph(
      '**Comment éviter le piège** : refuser le volume comme métrique de succès. Mesurer les taux de réponse, pas les nombres d’envois.',
    ),

    h3('3. La génération de propositions commerciales sans relecture juridique'),
    paragraph(
      'Une IA connectée à votre catalogue produit et à vos templates peut générer une proposition commerciale en quelques minutes. Le gain de temps est réel. Le risque juridique aussi.',
    ),
    paragraph(
      '**Ce qui peut mal se passer** : l’IA reformule une clause de garantie et l’engage plus loin que prévu. Elle ajuste un délai de livraison qu’elle croit standard mais qui ne correspond pas à votre process réel. Elle mentionne un prix qui n’est plus à jour parce que le catalogue connecté n’a pas été rafraîchi.',
    ),
    paragraph(
      'Une proposition commerciale engage l’entreprise. Un client peut s’appuyer dessus en cas de litige. Une génération sans contrôle humain, c’est une signature à l’aveugle.',
    ),
    warning(
      'Point de vigilance',
      'Ne jamais laisser l’IA envoyer une proposition commerciale sans relecture humaine. Générer un premier jet, oui. Envoyer sans contrôle, jamais. Le gain de temps ne compense pas un litige contractuel.',
    ),

    h3('4. L’enregistrement de rendez-vous clients sans cadrage RGPD'),
    paragraph(
      'C’est le piège le plus fréquent et le plus grave. Une équipe déploie un outil de transcription IA. Quelques mois plus tard, un client demande la copie de ses données personnelles au titre du RGPD. Personne dans l’entreprise ne sait où sont stockés les enregistrements, combien de temps ils sont conservés, qui y a accès, ni s’ils ont été utilisés pour entraîner un modèle IA quelque part.',
    ),
    paragraph(
      '**Les conséquences** : mise en demeure CNIL possible, perte de confiance du client, obligation de refaire toute la chaîne de traitement. Sans compter le risque réputationnel si l’affaire devient publique.',
    ),
    paragraph(
      '**Comment éviter le piège** : cadrer avant de déployer. Consentement explicite du client, hébergement des enregistrements en Europe, durée de conservation limitée et documentée, registre RGPD mis à jour, contrat avec le fournisseur d’IA qui interdit l’utilisation des données pour l’entraînement.',
    ),
    warning(
      'Point de vigilance',
      'Deux semaines de cadrage RGPD en amont évitent six mois de crise en aval. Sur les enregistrements de rendez-vous, aucun raccourci n’est admissible.',
    ),

    h2('Les 5 questions à se poser avant de déployer l’IA sur votre équipe commerciale'),
    paragraph(
      'Un cadrage sérieux tient en cinq questions. Si vous ne pouvez pas répondre clairement à chacune, il est trop tôt pour déployer.',
    ),
    paragraph(
      '**Question 1 : Sur quelle tâche précise voulons-nous gagner du temps ?** Pas « sur les tâches administratives » en général. Une tâche précise, mesurable, chronométrable. Sans cette précision, le projet dérive dans les trois mois.',
    ),
    paragraph(
      '**Question 2 : Combien de temps cette tâche coûte-t-elle vraiment aujourd’hui ?** Mesurer avant d’agir. Un sondage anonyme de l’équipe et un tracking sur deux semaines suffisent. Ce chiffre devient la référence contre laquelle mesurer le gain.',
    ),
    paragraph(
      '**Question 3 : Qui garde la main sur la décision finale ?** Aucun cas d’usage IA commercial ne fonctionne sans supervision humaine à un point précis. Où est ce point de contrôle ? Sur la validation du compte rendu ? Sur l’envoi de la relance ? Sur la génération de la proposition ? La réponse doit être claire avant de démarrer.',
    ),
    paragraph(
      '**Question 4 : Quelles données sensibles vont transiter par cet outil ?** Enregistrements audio de clients, contenu des propositions, historique commercial, données personnelles des prospects. Chaque flux de données a des implications RGPD et sécurité qui doivent être traitées avant le déploiement, pas après.',
    ),
    paragraph(
      '**Question 5 : Comment saurons-nous que ça marche (ou pas) dans 8 semaines ?** Le pilote doit avoir des critères de succès définis en amont. Temps gagné mesuré, qualité des données produites, taux d’adoption par les commerciaux, retour terrain qualitatif. Sans ces indicateurs, impossible de trancher entre « on généralise » et « on pivote ».',
    ),
    callout(
      'À retenir',
      'Si vous ne pouvez pas répondre clairement à ces cinq questions, il est trop tôt pour déployer. Deux semaines de cadrage évitent six mois de projet qui n’aboutit pas.',
    ),

    h2('Comment maria cadre vos projets IA commerciaux'),
    paragraph(
      'Chez maria, nous appliquons une méthode en quatre étapes qui répond directement à ces questions. Un audit de deux semaines pour mesurer où va vraiment le temps de vos commerciaux et identifier le cas d’usage prioritaire. Un cadrage projet d’une semaine pour définir supervision humaine, RGPD, indicateurs de succès. Un pilote de huit semaines sur deux à quatre commerciaux volontaires. Une décision à l’issue du pilote : généraliser, ajuster ou pivoter.',
    ),
    paragraph(
      'Ce cadrage ne garantit pas que tous les projets réussissent. Il garantit qu’ils réussissent ou échouent vite, avec des données objectives pour trancher, sans dilapider six mois de temps équipe sur un chantier qui ne mènera nulle part.',
    ),
    avisMaria({
      texte:
        'La mode pousse à opposer les entreprises « qui font de l’IA » aux autres. Notre conviction est inverse. La vraie ligne de partage ne passe pas entre celles qui déploient et celles qui hésitent, mais entre celles qui cadrent avant de déployer et celles qui achètent avant de cadrer. C’est le cadrage qui décide, pas l’outil.',
      signature: 'Matthieu SEILLER',
    }),
    quoteAttribuee({
      texte:
        'Un projet IA commercial ne réussit pas parce qu’il utilise le meilleur outil. Il réussit parce qu’il a répondu, avant de démarrer, à cinq questions simples que la plupart des projets escamotent.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),
    inArticleCta({
      titre: 'Cadrer votre projet IA commercial avant de vous engager',
      description:
        '30 minutes pour identifier le bon cas d’usage prioritaire, les points de supervision humaine, et le pilote qui débloquera votre équipe.',
      lienLibelle: 'Voir comment maria cadre vos projets IA commerciaux →',
      lienHref: '/besoins/gagner-du-temps-commerciaux-IA',
      variant: 'yellow',
    }),

    h2('En résumé'),
    paragraph(
      'L’IA dans les processus commerciaux fonctionne bien sur quatre cas d’usage précis : compte rendu automatique, préparation de rendez-vous, scoring de leads, relance contextuelle. Elle échoue régulièrement dans quatre configurations : automatisation totale sans supervision, prospection industrialisée, génération de propositions sans relecture, enregistrement de rendez-vous sans cadrage RGPD. La différence entre succès et échec ne tient jamais à l’outil. Elle tient au cadrage en amont, à la clarté sur le point de supervision humaine, et à la discipline de mesure. Cinq questions permettent de savoir si un projet est prêt à démarrer. Y répondre honnêtement fait gagner six mois.',
    ),
    paragraph(
      'Cet article est le pendant analytique de notre guide sur les usages IA qui font gagner du temps aux commerciaux. Pour la méthode complète étape par étape, voir « IA pour les commerciaux : comment gagner du temps sans dégrader vos ventes » (/blog/ia-commerciaux-gagner-temps).',
    ),
  ],

  /* ---- FAQ finale ---- */
  faq: [
    {
      _key: 'faq-1',
      question: 'Combien de projets IA commerciaux échouent vraiment ?',
      reponse:
        'D’après nos observations terrain et plusieurs études sectorielles convergentes, une large majorité des projets IA commerciaux n’atteignent pas les objectifs fixés au démarrage. La cause principale n’est pas technique : c’est un cadrage insuffisant en amont, un mauvais choix de cas d’usage prioritaire, ou une absence d’accompagnement au changement.',
    },
    {
      _key: 'faq-2',
      question: 'Peut-on déployer l’IA sur une équipe commerciale sans budget technique important ?',
      reponse:
        'Oui, sur les cas d’usage standards (compte rendu automatique, préparation de rendez-vous, IA générative pour les emails). Comptez entre vingt et cinquante euros par utilisateur et par mois, plus un budget d’accompagnement au changement de plusieurs milliers d’euros selon la taille de l’équipe. Les projets sur mesure demandent des budgets plus importants (à partir de quinze mille euros pour la conception, d’après notre pratique).',
    },
    {
      _key: 'faq-3',
      question: 'Combien de temps avant de voir des résultats mesurables ?',
      reponse:
        'Sur un cas d’usage bien cadré (compte rendu, préparation de rendez-vous), les premiers résultats se voient en quatre à six semaines. Sur un projet plus lourd (scoring de leads sur mesure, agent IA connecté), comptez douze à vingt semaines. Méfiez-vous des promesses de résultats en deux semaines : elles concernent des démos calibrées, pas des déploiements réels.',
    },
    {
      _key: 'faq-4',
      question: 'L’IA peut-elle dégrader la relation client ?',
      reponse:
        'Oui, dans deux cas. Premièrement, quand les messages générés deviennent trop lisses et perdent leur singularité (les prospects reconnaissent l’IA et ne répondent plus). Deuxièmement, quand l’automatisation supprime des moments de contact humain qui étaient perçus comme un signal d’attention. La règle : l’IA doit alléger le commercial sur les tâches où le client ne verrait pas la différence, pas sur celles où il l’attend.',
    },
    {
      _key: 'faq-5',
      question: 'Faut-il informer les prospects que l’IA est utilisée dans le processus commercial ?',
      reponse:
        'Sur les enregistrements de rendez-vous, oui, obligatoirement. C’est une exigence RGPD non négociable. Sur les autres usages (préparation, scoring, relances), il n’y a pas d’obligation légale spécifique, mais la transparence est recommandée pour préserver la confiance à long terme.',
    },
  ],

  /* ---- CTA latéral ---- */
  sidebarCta: {
    titre: 'Cadrer un projet IA commercial ?',
    description: '30 minutes pour identifier le bon cas d’usage prioritaire et les points de supervision.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  /* ---- SEO ---- */
  seo: {
    titre: 'IA processus commerciaux : quand ça marche, quand ça déraille | maria',
    description:
      'L’IA dans les processus commerciaux : les cas d’usage qui font vraiment gagner du temps, ceux qui échouent, et comment savoir avant de se lancer.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
