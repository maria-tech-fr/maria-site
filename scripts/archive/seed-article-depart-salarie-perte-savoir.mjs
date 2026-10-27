/**
 * Seed de l'article « Départ d'un salarié : comment éviter la perte de savoir
 * avec l'IA »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — `auteur-matthieu-seiller`
 * en base.
 * Catégorie : Stratégie IA — `articleCategorie-strategie-ia`.
 * Featured : false.
 *
 * Cross-links :
 *  - Vers /blog/knowledge-management-ia-organiser-savoir-avant-agent dans la
 *    section « Ce que change l'IA sur ce sujet » (le KM structuré en amont
 *    est le pendant systémique du dispositif de capitalisation anti-perte de
 *    savoir). Pas de lien retour côté KM (ce dernier reste autoportant).
 *  - Vers /blog/depart-salaries-methode-ia-capitaliser-savoir dans la section
 *    « Par où commencer avant le prochain départ » (paire SEILLER/HERNANDEZ
 *    publiée le même jour : enjeu stratégique ↔ méthode opérationnelle).
 *    Ajouté dans un second passage, lors de la publication de l'article
 *    HERNANDEZ.
 *
 * Sources cliquables (option B mixte) :
 *  - DARES : URL directe des données officielles → LIEN sur la première
 *    mention (« Selon les données de la DARES »).
 *  - CIGREF 2024 : URL directe article de blog cigref → LIEN sur la mention
 *    (« les retours d'expérience du CIGREF »).
 *  - APEC : URL hub trop générique → mention en clair sans lien.
 *
 * Choix éditoriaux :
 *  - DÉFINITION condensée de 465 → 371 chars (limite Sanity 400) sans perdre
 *    la typologie des 3 couches (explicite / implicite / tacite).
 *  - inArticleCta yellow ajouté après la section « Pourquoi les méthodes
 *    classiques échouent » et avant l'AVIS MARIA (bascule constat → méthode
 *    maria).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-depart-salarie-perte-savoir.mjs
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
  _id: 'article-depart-salarie-eviter-perte-savoir-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'depart-salarie-eviter-perte-savoir-ia' },
  titre: 'Départ d’un salarié : comment éviter la perte de savoir avec l’IA',
  sousTitre:
    'Chaque départ emporte des années d’apprentissage que vos documents n’ont jamais captées. Voici pourquoi, et comment l’IA change la donne.',
  intro:
    'En France, les mobilités de cadres restent élevées et chaque départ emporte avec lui un savoir rarement documenté. L’IA ne remplace pas le partant, mais elle peut en préserver l’essentiel, à condition de s’y prendre avant son départ.',
  publishedAt: '2026-10-27T09:00:00.000Z',
  readingTime: 11,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'Un cadre français occupe en moyenne son poste 4 à 6 ans, et chaque départ emporte entre 2 et 5 ans de savoir métier non documenté selon la position occupée.',
    'La connaissance tacite (comment on fait, pourquoi on fait comme ça, quelles sont les exceptions) représente, selon les travaux de référence, 60 à 80 % du savoir utile d’un expert.',
    'Les méthodes classiques (entretien de sortie, documentation de dernière minute, passation en 15 jours) échouent presque toujours : elles arrivent trop tard et captent le mauvais niveau d’information.',
    'L’IA ne remplace pas l’humain qui part. Elle peut, en revanche, transformer les interactions quotidiennes en matière réutilisable, à condition d’être mise en place avant que le départ soit annoncé.',
    'Trois conditions non négociables : une documentation vivante maintenue en continu, un périmètre borné sur les savoirs critiques, un sponsor managérial sur la durée.',
  ],

  body: [
    h2('Le départ qu’on n’a pas vu venir, ou qu’on a vu venir sans rien faire'),
    paragraph(
      'Dans toutes les entreprises que nous accompagnons chez maria, la même scène se rejoue. Un collaborateur annonce son départ. Les deux semaines qui suivent sont consacrées à « tout mettre par écrit », à organiser des sessions de passation, à documenter les procédures. Le jour du départ, on se félicite d’avoir rempli un Notion ou un Confluence avec des pages de contenu. Trois mois plus tard, son successeur ou ses collègues redécouvrent qu’il manque l’essentiel.',
    ),
    paragraph(
      'Ce qui a été capturé, ce sont les procédures. Ce qui a disparu, c’est le savoir qui donne du sens aux procédures. Comment interpréter un cas limite. Pourquoi telle règle existe. Quel client supporte quel écart. Qui appeler quand telle situation se présente. Cette connaissance ne vit nulle part dans la documentation parce qu’elle n’est pas documentable à chaud.',
    ),
    paragraph(
      'Selon les données de la [DARES](https://dares.travail-emploi.gouv.fr/donnees/les-mouvements-de-main-doeuvre), les mouvements de main-d’œuvre en France restent soutenus en 2026, portés par des départs volontaires nombreux dans un marché de l’emploi encore dynamique. L’APEC confirme que la durée moyenne d’occupation d’un poste pour un cadre français s’établit entre 4 et 6 ans. Autrement dit, dans toute entreprise de plus de 20 personnes, un départ d’expert tombe plusieurs fois par an, parfois chaque trimestre.',
    ),
    paragraph(
      'Le vrai sujet n’est donc pas « comment réagir à un départ ». C’est « comment organiser l’entreprise pour que les départs ne détruisent plus le savoir accumulé ». Cette inversion change tout, à commencer par le moment où l’on agit.',
    ),
    callout(
      'À retenir',
      'Le problème n’est pas qu’un expert parte. C’est qu’il parte avec un savoir qu’aucun document, aucun process RH, aucune passation ne peut capturer en deux semaines. Si vous attendez l’annonce du départ pour agir, vous êtes déjà trop tard.',
    ),

    h2('Ce qui part vraiment avec un expert'),
    paragraph(
      'Pour comprendre pourquoi les passations classiques échouent, il faut distinguer trois types de savoir qui coexistent chez tout collaborateur expérimenté.',
    ),
    definition(
      'Les trois couches du savoir en entreprise',
      'Le savoir explicite : procédures, modes opératoires, documents formellement transmissibles. Le savoir implicite : ce qu’un expert sait sans y penser mais peut formuler s’il est bien interrogé (règles de décision, cas particuliers, exceptions). Le savoir tacite : ce qu’il ne sait même pas qu’il sait, devenu réflexe (intuitions, lectures de situation, signaux faibles).',
    ),
    paragraph(
      'Les travaux académiques et les [retours d’expérience du CIGREF](https://www.cigref.fr/lia-en-entreprise-retours-dexperience-et-bonnes-pratiques) convergent sur un ordre de grandeur. Le savoir explicite représente environ 20 à 30 % du savoir utile d’un collaborateur senior. Le savoir implicite et tacite représente les 60 à 80 % restants.',
    ),
    paragraph(
      'Or les méthodes classiques de capitalisation (procédures écrites, entretien de sortie, formation du successeur sur 15 jours) ne traitent que le savoir explicite. Elles passent complètement à côté des 60 à 80 % les plus précieux. C’est précisément ce qui explique le sentiment de perte massif après chaque départ d’expert, malgré les documents produits.',
    ),
    paragraph(
      'Prenons un exemple concret. Un responsable de la relation client qui part après 7 ans laisse derrière lui une documentation des procédures de gestion des réclamations, parfaitement à jour. Ce qu’il n’a pas écrit, et qu’il ne pourrait pas écrire : le fait que ce client-là supporte un délai long sur telle question mais pas sur telle autre, que ce fournisseur-là est réactif seulement si on l’appelle plutôt que de lui envoyer un email, que telle procédure officielle est contournée depuis trois ans parce qu’elle ne fonctionne pas. Ce savoir vaut parfois plus que la procédure officielle elle-même.',
    ),

    h2('Combien ça coûte, concrètement'),
    paragraph(
      'Chiffrer la perte de savoir est difficile parce que les effets se diffusent sur plusieurs mois et touchent plusieurs postes à la fois. Mais les ordres de grandeur convergent dans les études disponibles.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, nous observons un impact mesurable sur trois dimensions.',
    ),
    paragraph(
      '**Le temps d’autonomie du successeur.** Pour un poste à expertise métier, le temps pour qu’un remplaçant atteigne la pleine autonomie opérationnelle s’étend typiquement de 6 à 18 mois selon la complexité du rôle. Pendant cette période, le coût caché inclut la mobilisation d’autres experts pour aider, les erreurs commises sur des cas particuliers mal maîtrisés, et le ralentissement général du service.',
    ),
    paragraph(
      '**La charge reportée sur les collègues.** Chaque question qu’aurait pu traiter le partant devient une interruption pour un collègue. Sur un poste central, cela peut représenter plusieurs heures hebdomadaires de temps collectif consommé, pendant plusieurs mois après le départ.',
    ),
    paragraph(
      '**Les décisions reprises à zéro.** Les arbitrages anciens, les règles historiques, les compromis négociés avec tel client ou tel fournisseur sont redébattus parce que personne ne connaît l’histoire. Chaque redémarrage de ce type coûte du temps et parfois détériore une relation.',
    ),
    paragraph(
      'Au total, les études de référence estiment le coût caché d’un départ d’expert entre 50 % et 150 % de son salaire annuel brut, selon le poste et le niveau d’expertise. Pour un cadre à 60 000 euros annuels, cela représente une perte potentielle de 30 000 à 90 000 euros, étalée sur 12 à 18 mois après le départ.',
    ),
    warning(
      'Point de vigilance',
      'Ce coût n’apparaît dans aucun tableau de bord RH. Il se diffuse dans la productivité d’autres personnes, dans des erreurs non attribuées, dans des opportunités manquées. C’est précisément pour cela qu’il est largement sous-estimé par les directions, et que les projets de capitalisation du savoir sont rarement priorisés avant qu’il ne soit trop tard.',
    ),

    h2('Les 3 signaux qui annoncent une fuite de savoir'),
    paragraph(
      'Dans la plupart des entreprises, les signaux précurseurs d’une perte de savoir existent, mais ne sont pas lus comme tels. Trois signaux reviennent systématiquement.',
    ),
    tableau({
      enTetes: ['Signal', 'Ce qu’il révèle', 'Ce qui se joue vraiment'],
      lignes: [
        ['Un expert est devenu l’unique point de contact sur un sujet', 'Centralisation de la connaissance sur une personne', 'Son départ sera un trou noir immédiat'],
        ['Les procédures officielles sont régulièrement contournées', 'Écart entre règle écrite et pratique réelle', 'Le vrai savoir n’est pas documenté, il vit dans les contournements'],
        ['Les décisions remontent toujours à la même personne', 'Jugement non partagé, règles implicites', 'Le savoir de décision n’a jamais été explicité'],
      ],
    }),
    paragraph(
      '**Signal 1 : la personne unique.** Dès qu’un sujet a un seul référent dans l’entreprise, le départ de cette personne crée mécaniquement un trou noir. Ce n’est pas une question de talent ou de dévouement, c’est une question de redondance structurelle. Une entreprise qui dépend d’une seule personne sur un sujet critique a renoncé, souvent sans le savoir, à la continuité de ce sujet.',
    ),
    paragraph(
      '**Signal 2 : les contournements silencieux.** Quand les équipes contournent régulièrement une procédure officielle, cela signifie que le vrai savoir ne vit pas dans la procédure, mais dans la pratique du contournement. Si cette pratique est portée par deux ou trois personnes seulement, elle disparaît avec elles.',
    ),
    paragraph(
      '**Signal 3 : les décisions remontantes.** Quand telle question « doit toujours être validée par Marc » ou « ne peut être tranchée que par Sophie », c’est que le savoir de décision n’a jamais été formalisé en règles. Il est donc impossible à transmettre par un document.',
    ),
    paragraph(
      'Ces trois signaux sont visibles dans toute organisation qui prend le temps de les regarder. Les repérer tôt est le premier geste d’une politique de capitalisation sérieuse.',
    ),

    h2('Pourquoi les méthodes classiques échouent'),
    paragraph(
      'Les entreprises qui prennent le sujet au sérieux ont généralement essayé plusieurs méthodes avant d’arriver à l’IA. Toutes buttent sur les mêmes limites.',
    ),
    paragraph(
      '**L’entretien de sortie.** Mené par les RH dans les derniers jours, il recueille des informations formelles mais passe à côté du savoir tacite. Le partant n’est pas en condition de livrer son savoir profond, il est déjà mentalement ailleurs.',
    ),
    paragraph(
      '**La documentation de dernière minute.** Deux semaines avant le départ, le partant est invité à « tout documenter ». Il produit alors de la procédure écrite, qui est précisément le niveau de savoir le moins précieux. Le résultat est volumineux mais pauvre.',
    ),
    paragraph(
      '**La passation au successeur.** Elle fonctionne quand le successeur est déjà identifié, en poste, et peut passer plusieurs semaines au contact du partant. Ces trois conditions sont rarement réunies. Le plus souvent, la passation se fait vers un remplaçant partiel ou vers plusieurs collègues qui absorbent chacun un morceau.',
    ),
    paragraph(
      '**Le wiki interne.** L’idée paraît bonne : documenter en continu dans un outil partagé. En pratique, le wiki devient un cimetière de pages non maintenues, consultées par personne, parce que la contribution est perçue comme une charge et non comme un geste utile.',
    ),
    paragraph(
      'Le point commun de ces méthodes : elles traitent la capitalisation comme un acte, souvent déclenché par le départ. Alors que la vraie capitalisation est un processus continu, intégré au travail quotidien.',
    ),
    inArticleCta({
      titre: 'Installer une capitalisation vivante avant le prochain départ',
      description:
        '30 minutes pour cartographier les points de concentration de savoir dans votre organisation et prioriser un pilote resserré.',
      lienLibelle: 'Voir comment maria aborde la capitalisation du savoir →',
      lienHref: '/besoins/capitaliser-expertise-interne',
      variant: 'yellow',
    }),
    avisMaria({
      texte:
        'La mode consiste à voir le départ d’un expert comme un problème RH à résoudre par une procédure de sortie. Notre conviction est inverse. C’est un problème de gestion de la connaissance qui se joue au quotidien, pendant toutes les années où l’expert est encore là. L’IA n’est pas une baguette magique à activer au moment du départ. C’est un outil à mettre en place très tôt, pour transformer chaque interaction en matière réutilisable, bien avant que l’annonce ne tombe.',
      signature: 'Matthieu SEILLER',
    }),

    h2('Ce que change l’IA sur ce sujet'),
    paragraph(
      'L’IA n’est pas une solution magique à la perte de savoir. Elle est un levier qui change la nature du problème, à trois conditions bien précises.',
    ),
    paragraph(
      '**Elle transforme la contribution en sous-produit.** Au lieu de demander à un expert de documenter son savoir (ce qu’il n’a pas le temps de faire, ou pas envie), un bon dispositif IA capture le savoir dans son usage quotidien. Un échange sur Slack, une décision prise lors d’une réunion, une réponse donnée à un collègue, un message dans un ticket. Chaque interaction devient potentiellement une brique de capitalisation, sans effort supplémentaire pour l’expert.',
    ),
    paragraph(
      '**Elle rend la connaissance interrogeable en langage naturel.** Un documentaire mort dans un wiki n’aide personne. Un corpus de connaissance interrogeable (quelqu’un pose la question qu’il se pose, l’IA remonte les éléments pertinents) transforme un stock inerte en ressource vivante. Le successeur du partant peut poser à l’IA les questions qu’il aurait posées au partant lui-même, à condition que le dispositif ait été alimenté sur la durée.',
    ),
    paragraph(
      '**Elle préserve le contexte.** Un bon dispositif IA ne stocke pas des procédures mais des interactions situées : qui a dit quoi, dans quel contexte, à propos de quel client ou de quel projet. Ce niveau de contexte est précisément ce que les documents classiques perdent.',
    ),
    paragraph(
      'Trois conditions pour que cela fonctionne. Un, le dispositif doit être mis en place avant que le départ soit annoncé, idéalement 12 à 24 mois avant. Deux, il doit être alimenté en continu, pas par à-coups. Trois, les experts doivent y voir un bénéfice pour eux-mêmes (gagner du temps, être moins interrompus), pas une surveillance ou une menace sur leur rôle.',
    ),
    paragraph(
      'Cette logique de dispositif vivant prolonge directement le chantier amont de structuration du savoir, traité en profondeur dans notre article [Knowledge management et IA : organiser votre savoir avant de déployer un agent](/blog/knowledge-management-ia-organiser-savoir-avant-agent).',
    ),
    quoteAttribuee({
      texte:
        'Les entreprises qui traversent bien les départs d’experts ne sont pas celles qui ont les meilleures procédures de passation. Ce sont celles qui ont installé, pendant que l’expert était là, un dispositif de capitalisation vivant qui a transformé des années de travail en matière réutilisable. Le reste n’est que du rattrapage.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Par où commencer avant le prochain départ'),
    paragraph(
      'Si vous vous reconnaissez dans ce qui précède, voici l’ordre d’action que nous recommandons. Il ne demande pas de budget significatif au démarrage.',
    ),
    paragraph(
      '**Semaine 1** : cartographier les points de concentration de savoir dans votre entreprise. Qui sont les trois à cinq personnes dont le départ créerait un trou noir identifié ? Vos managers le savent. Cette cartographie est le point de départ.',
    ),
    paragraph(
      '**Semaine 2** : regarder les signaux. Sur ces trois à cinq personnes, repérer les procédures contournées, les décisions qui remontent toujours à elles, les sujets qu’elles sont seules à maîtriser. Cette lecture révèle les zones de fragilité réelle.',
    ),
    paragraph(
      '**Semaine 3** : identifier un sponsor du projet. Un directeur opérationnel, un DRH, un dirigeant, qui comprend l’enjeu et peut porter le sujet dans la durée. Sans sponsor engagé, la capitalisation est une bonne intention qui ne survit pas à six mois.',
    ),
    paragraph(
      '**Semaine 4** : lancer un pilote sur une seule personne ou un seul sujet critique. Pas un grand plan, pas une refonte globale. Un expert volontaire, un dispositif léger d’IA, une boucle de six mois pour mesurer ce que cela produit. Les projets qui réussissent commencent presque toujours par un pilote resserré.',
    ),
    paragraph(
      'À l’issue de ces quatre semaines, vous aurez posé les fondations. Vous n’avez pas encore de dispositif complet. Mais vous aurez cessé d’attendre le prochain départ en espérant que ce soit moins douloureux que les précédents.',
    ),
    paragraph(
      'Pour la méthode complète de mise en œuvre (4 étapes, 7 outils IA utiles, 3 paliers de budget, conditions de réussite), voir notre article [Départ de salariés : la méthode IA pour capitaliser le savoir au fil de l’eau](/blog/depart-salaries-methode-ia-capitaliser-savoir).',
    ),

    h2('En résumé'),
    paragraph(
      'Le départ d’un expert emporte avec lui 60 à 80 % d’un savoir qui n’a jamais été documenté, et qui ne peut pas l’être en deux semaines de passation. Les méthodes classiques (entretien de sortie, documentation de dernière minute, passation au successeur) traitent le mauvais niveau de problème. L’IA ne remplace pas l’humain qui part, mais elle peut transformer les interactions quotidiennes en matière réutilisable, à condition d’être installée bien avant que le départ soit annoncé. Les trois signaux à surveiller sont la concentration du savoir sur une seule personne, les procédures régulièrement contournées, et les décisions qui remontent toujours au même expert. La capitalisation sérieuse se joue sur la durée, par un dispositif vivant alimenté au quotidien, pas par un acte de sortie précipité. Le vrai moment d’agir n’est pas quand un expert annonce son départ. C’est maintenant, quand il est encore là.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'L’IA peut-elle vraiment capter le savoir tacite d’un expert ?',
      reponse:
        'Pas intégralement. Le savoir tacite au sens strict (les intuitions pures) ne se laisse pas facilement textualiser. En revanche, le savoir implicite (ce que l’expert sait et peut expliquer s’il est bien interrogé) peut être capturé en très grande partie, par la combinaison d’une documentation vivante et d’une IA qui rend la connaissance interrogeable. C’est déjà considérable par rapport à ce que les méthodes classiques permettent.',
    },
    {
      _key: 'faq-2',
      question: 'Combien de temps avant d’observer un vrai gain sur un dispositif de capitalisation ?',
      reponse:
        'Sur un projet bien cadré, les premiers effets utiles sont visibles entre 3 et 6 mois après la mise en route, le temps que suffisamment de matière soit captée. L’effet protecteur en cas de départ réel se mesure à partir du moment où un départ survient et où le successeur peut effectivement s’appuyer sur le corpus. En règle générale, 12 à 18 mois d’alimentation sont nécessaires pour un dispositif pleinement utile.',
    },
    {
      _key: 'faq-3',
      question: 'Faut-il demander l’accord de l’expert pour mettre en place ce dispositif ?',
      reponse:
        'Oui, absolument. Un dispositif de capitalisation imposé sans adhésion est vécu comme une surveillance. L’expert doit y voir un bénéfice pour lui-même : moins d’interruptions, une meilleure traçabilité de son travail, une reconnaissance de sa valeur dans l’organisation. Sans cette adhésion, le dispositif se vide de son contenu réel.',
    },
    {
      _key: 'faq-4',
      question: 'Est-ce compatible avec le RGPD et la confidentialité des données ?',
      reponse:
        'Oui, à condition d’être cadré correctement. Les dispositifs sérieux fonctionnent avec un hébergement européen ou français, une gestion fine des droits d’accès, et une documentation du traitement dans le registre RGPD. Les conversations captées doivent avoir une durée de conservation définie et des règles d’anonymisation pour les données sensibles. Un partenaire sérieux vous guide sur ces points dès le cadrage.',
    },
    {
      _key: 'faq-5',
      question: 'Peut-on commencer un dispositif de capitalisation quand un expert vient d’annoncer son départ ?',
      reponse:
        'Oui, mais le résultat sera partiel. Dans ce cas, l’approche la plus efficace consiste à organiser des sessions d’interview enregistrées avec l’expert, structurées autour de cas réels, et à constituer un corpus que l’IA pourra rendre interrogeable après son départ. Cela ne remplace pas une capitalisation installée sur plusieurs années, mais c’est beaucoup mieux que de ne rien faire.',
    },
  ],

  sidebarCta: {
    titre: 'Protéger votre savoir critique ?',
    description: '30 minutes pour cartographier vos points de concentration de savoir et prioriser un dispositif de capitalisation vivant.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Départ salarié : éviter la perte de savoir avec l’IA | maria',
    description:
      'Comment éviter la perte de savoir au départ d’un collaborateur grâce à l’IA. Chiffres France, méthode, pièges et solutions. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
