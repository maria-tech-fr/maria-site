/**
 * Seed de l'article « Knowledge management et IA : pourquoi vous devez
 * organiser votre savoir avant de déployer un agent »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — `auteur-matthieu-seiller`.
 * Catégorie : Stratégie IA.
 * Featured : false (l'article service client garde la place vedette).
 *
 * Cross-links :
 *  - Vers /blog/donnees-agent-ia-service-client (pendant technique / expert)
 *  - Le maillage retour est géré dans le seed de l'article données.
 *
 * Sources cliquables :
 *  - McKinsey State of AI 2025 (1 lien à la 1re mention)
 *  - Elium / SPIE ICS Convention ADIRA 2025 (1 lien à la mention SPIE ICS)
 *  - Gartner : listé au frontmatter mais non cité dans le corps, non exploité.
 *
 * Corrections appliquées vs brief initial :
 *  - TLDR puce 2 : retiré « doivent » (safe passage sous 200 chars)
 *  - TLDR puce 5 : raccourci (213 → 165 chars, mêmes 5 principes en version compacte)
 *  - Date : 8 septembre 2026 (demande explicite user, brief disait 11 août)
 *  - inArticleCta yellow ajouté après la section « 5 principes »
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-knowledge-management-ia.mjs
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
  _id: 'article-knowledge-management-ia-organiser-savoir-avant-agent',
  _type: 'article',
  slug: { _type: 'slug', current: 'knowledge-management-ia-organiser-savoir-avant-agent' },
  titre: 'Knowledge management et IA : pourquoi vous devez organiser votre savoir avant de déployer un agent',
  sousTitre:
    'Le knowledge management n’est plus une option de RH, c’est le prérequis de tout projet IA sérieux. Voici pourquoi et comment aborder la question.',
  intro:
    'Vous voulez déployer un agent IA interne, mais votre documentation est éclatée entre Drive, SharePoint et Notion. Voici pourquoi commencer par organiser le savoir change tout le résultat final.',
  publishedAt: '2026-09-08T09:00:00.000Z',
  readingTime: 12,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-strategie-ia' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'Selon McKinsey (State of AI 2025), la gestion des connaissances est aujourd’hui parmi les trois fonctions les plus déployées pour l’IA en entreprise, avec l’IT et le marketing.',
    'Deux tiers des projets IA restent bloqués en phase pilote. La cause principale n’est pas technique, c’est la qualité insuffisante des connaissances internes sur lesquelles s’appuient les modèles.',
    'Le cas SPIE ICS (Convention ADIRA 2025) montre l’impact d’un knowledge management préparé : temps de recherche d’information réduit de 73 %, turnover divisé par deux.',
    'Sur les projets que nous accompagnons chez maria, la préparation du savoir représente en moyenne 40 à 60 % du temps de cadrage d’un projet IA interne sérieux.',
    'Cinq principes structurent un KM prêt pour l’IA : cartographie du savoir critique, single source of truth, gouvernance formalisée, format machine, curation continue.',
  ],

  body: [
    h2('Pourquoi tant de projets d’IA interne plafonnent en pilote'),
    paragraph(
      'Le paysage de l’IA en entreprise en 2026 est paradoxal. Selon le [rapport McKinsey State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai), 88 % des organisations utilisent aujourd’hui l’IA dans au moins une fonction, contre 78 % l’année précédente. Mais un chiffre plus sombre se cache derrière cette adoption massive : seul un tiers des entreprises a réussi à passer à l’échelle. Les deux autres tiers restent bloqués dans ce que McKinsey appelle le « pilot purgatory », un cimetière de proof of concepts qui n’arrivent jamais en production.',
    ),
    paragraph(
      'La cause principale de ce blocage n’est pas ce qu’on pourrait croire. Ce n’est pas le manque de talents techniques. Ce n’est pas le budget. Ce n’est pas la maturité des modèles IA. Selon le même rapport, les blocages structurants sont : la qualité et l’architecture des données, la refonte des workflows, et la restructuration des bases de connaissance et des dépôts de contenu.',
    ),
    paragraph(
      'Autrement dit, l’IA ne bute pas sur l’intelligence artificielle. Elle bute sur l’intelligence organisationnelle qui devrait la précéder. Et cette intelligence organisationnelle porte un nom classique, redevenu stratégique en 2026 : le knowledge management.',
    ),
    callout(
      'À retenir',
      'L’IA ne transforme pas les entreprises qui n’ont pas d’abord transformé leur rapport à leur propre savoir. Un modèle IA reste un moteur : il tourne à vide si le carburant, votre connaissance interne, n’a pas été raffiné.',
    ),

    h2('Qu’est-ce que le knowledge management, redéfini par l’ère de l’IA ?'),
    paragraph(
      'Le knowledge management (KM) n’est pas un concept nouveau. Il existe depuis les années 90 et a longtemps été confié aux RH ou aux fonctions support. Mais son rôle a fondamentalement changé.',
    ),
    definition(
      'Knowledge management à l’ère de l’IA',
      'Ensemble des méthodes et outils permettant à une organisation de capturer, structurer, gouverner et rendre exploitable son savoir interne, dans un format compréhensible à la fois par les humains et par les machines. Il devient le prérequis structurant de tout projet d’IA interne.',
    ),
    paragraph('Trois éléments distinguent le knowledge management moderne de son ancêtre.'),
    paragraph(
      '**La finalité machine autant qu’humaine.** Avant, on rangeait le savoir pour que les collaborateurs le retrouvent. Maintenant, on l’organise aussi pour qu’un agent IA puisse le récupérer, l’interpréter et l’utiliser sans se tromper.',
    ),
    paragraph(
      '**La granularité fine.** Avant, on gérait des documents. Maintenant, on gère des unités d’information autoportantes, chacune capable d’apporter une réponse claire à une question précise.',
    ),
    paragraph(
      '**La gouvernance continue.** Avant, le KM était un projet à jalons. Maintenant, c’est un processus permanent, avec des rituels de mise à jour, des indicateurs de fraîcheur, des responsables identifiés par domaine.',
    ),
    paragraph(
      'Ce qui a changé n’est pas la théorie du KM. C’est son degré de nécessité. Comme le résume la directrice de la transformation d’une entreprise industrielle française auditée l’an dernier : « Avant, ne pas faire de knowledge management coûtait un peu de temps à mes équipes. Maintenant, ne pas en faire tue mes projets IA. »',
    ),

    h2('Le cas SPIE ICS : ce que change un KM préparé pour l’IA'),
    paragraph(
      'L’un des retours d’expérience les plus documentés en France sur cette question vient de [SPIE ICS, présenté à la Convention ADIRA 2025](https://elium.com/fr/blog/knowledge-management-en-entreprise-repenser-la-connaissance-comme-fondation-de-lia/). Leur directeur du Service Desk a présenté les résultats obtenus après une refonte de leur knowledge management, condition préalable au déploiement d’agents IA sur leurs 140 agents de support.',
    ),
    paragraph(
      'Les chiffres, largement diffusés depuis, méritent d’être cités précisément : temps de recherche d’information réduit de 73 %, turnover divisé par deux dans les équipes de support, autonomie des nouveaux collaborateurs multipliée. Le message clé de ce retour d’expérience : ces résultats n’ont pas été obtenus grâce à l’IA, mais grâce au knowledge management préparé pour l’IA. L’IA est venue amplifier une structure déjà solide.',
    ),
    paragraph(
      'Ce cas est exemplaire parce qu’il inverse la séquence habituelle. La plupart des entreprises abordent l’IA en pensant : « On va déployer un agent, il apprendra à partir de notre documentation existante ». SPIE ICS a fait l’inverse : « On va d’abord organiser notre savoir, ensuite l’agent l’exploitera à plein potentiel ». Les résultats parlent d’eux-mêmes.',
    ),
    warning(
      'Point de vigilance',
      'Attention à ne pas lire ce type de retour d’expérience comme « l’IA a divisé le turnover par deux ». C’est le knowledge management préparé pour l’IA qui a produit ce résultat. L’IA est un multiplicateur. Sur zéro, elle multiplie zéro.',
    ),

    h2('Les 5 principes d’un knowledge management prêt pour l’IA'),
    paragraph(
      'Sur les projets IA que nous accompagnons chez maria, cinq principes structurent systématiquement le travail de préparation du savoir. Ils ne sont pas nouveaux dans leur formulation. Ce qui l’est, c’est leur caractère non négociable pour tout projet IA sérieux.',
    ),
    tableau({
      enTetes: ['Principe', 'Question à se poser', 'Ce que ça change côté IA'],
      lignes: [
        ['Cartographier le savoir critique', 'Que doit savoir un nouveau, un client, un partenaire ?', 'L’agent sait ce qu’il doit apprendre en priorité'],
        ['Single source of truth', 'Où est la vérité pour chaque sujet ?', 'L’agent ne se contredit plus d’une réponse à l’autre'],
        ['Gouvernance formalisée', 'Qui met à jour quoi, à quelle fréquence ?', 'L’agent reste à jour au lieu de figer un savoir de 2023'],
        ['Format lisible par la machine', 'Un contenu autoportant, structuré, taggé', 'L’agent trouve mieux et reformule plus juste'],
        ['Boucle de mise à jour continue', 'Les échecs de l’agent enrichissent le savoir', 'L’agent progresse au lieu de décroître'],
      ],
    }),

    h3('Principe 1 : Cartographier votre savoir critique'),
    paragraph(
      'Avant de structurer, il faut savoir ce qui compte. Toutes les entreprises n’ont pas les mêmes savoirs critiques. Une PME industrielle, une agence de conseil, un cabinet juridique n’ont pas les mêmes points sensibles.',
    ),
    paragraph(
      'Nous pratiquons trois questions systématiques en début de projet. Que doit absolument savoir un nouveau collaborateur pour être opérationnel en 30 jours ? Quelles questions vos clients posent-ils le plus souvent ? Quels savoirs partent-ils avec un collaborateur qui quitte l’entreprise ?',
    ),
    paragraph(
      'Ces trois questions produisent une cartographie brute qu’on affine ensuite. Elle sert de boussole pour tout le reste du projet.',
    ),

    h3('Principe 2 : Une source de vérité par sujet'),
    paragraph(
      'Le mal endémique des entreprises de plus de 30 personnes : chaque sujet critique existe en 3 à 8 versions différentes, réparties dans autant d’outils. La procédure de retour client, la politique de garantie, la charte de sécurité data, tout existe plusieurs fois, et ces versions se contredisent.',
    ),
    paragraph(
      'Un agent IA branché sur ce chaos produit un chaos plus rapide. La condition non négociable : identifier, pour chaque sujet critique, une seule source de vérité. Toutes les autres versions sont archivées, supprimées, ou explicitement marquées comme obsolètes.',
    ),
    paragraph(
      'C’est un travail douloureux, parce qu’il oblige à trancher des désaccords internes accumulés depuis des années. C’est aussi le travail qui produit le plus de valeur, avec ou sans IA.',
    ),

    h3('Principe 3 : Une gouvernance de mise à jour formalisée'),
    paragraph(
      'Une base de connaissance vivante n’est pas un projet, c’est un processus. Sur les projets maria, nous recommandons systématiquement trois niveaux de gouvernance.',
    ),
    paragraph(
      'Pour les contenus à forte volatilité (tarifs, procédures opérationnelles, catalogue produit) : revue mensuelle, responsable clairement identifié.',
    ),
    paragraph(
      'Pour les contenus opérationnels (politiques, procédures, standards) : revue trimestrielle, avec un comité restreint qui valide les évolutions.',
    ),
    paragraph(
      'Pour les contenus fondamentaux (mentions légales, principes de gouvernance) : revue annuelle avec la direction juridique.',
    ),
    paragraph(
      'Cette gouvernance existe indépendamment de l’IA. Elle profitera aussi à vos équipes humaines. Mais elle est ce qui rend le savoir exploitable dans la durée.',
    ),

    h3('Principe 4 : Un format lisible par la machine'),
    paragraph(
      'Ce point est le plus technique et le plus souvent négligé. Un document écrit pour être lu par un humain n’est pas nécessairement bien exploité par une IA. Les humains savent naviguer entre plusieurs documents pour recomposer une information. Une IA cherche des passages précis dans une base structurée.',
    ),
    paragraph(
      'Un contenu prêt pour l’IA respecte quatre règles simples : un titre clair sous forme de question, une réponse complète en 2 à 5 phrases, les cas particuliers listés explicitement, les liens vers les procédures liées.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons, la simple réécriture d’une documentation existante dans ce format améliore la performance d’un agent de 20 à 40 points, sans changer une ligne de code.',
    ),

    h3('Principe 5 : Une boucle de mise à jour continue'),
    paragraph(
      'Une base de connaissance n’est jamais finie. Chaque interaction de l’agent avec un utilisateur révèle des trous : des questions qu’il n’a pas su traiter, des réponses partiellement fausses, des cas non prévus. Une boucle de curation continue capitalise sur ces retours.',
    ),
    paragraph(
      'Concrètement : les échanges où l’agent a échoué sont analysés chaque semaine, les contenus manquants sont identifiés, la documentation est enrichie. Cette boucle est ce qui fait la différence entre un agent qui plafonne à 50 % de performance et un agent qui atteint 80 à 90 % en 6 mois.',
    ),
    avisMaria({
      texte:
        'La mode pousse à déployer des outils IA le plus vite possible, en promettant qu’ils apprendront de la documentation existante. Notre conviction est inverse. Sur les projets qui produisent vraiment de la valeur, la préparation du savoir précède toujours le déploiement de l’IA. Cette préparation semble plus lente au démarrage. Elle est infiniment plus rapide et solide dans la durée.',
      signature: 'Matthieu SEILLER',
    }),
    inArticleCta({
      titre: 'Cadrer votre knowledge management avant de déployer l’IA',
      description:
        '30 minutes pour identifier les sujets critiques à structurer en priorité et poser les bases d’une gouvernance qui tient dans la durée.',
      lienLibelle: 'Voir comment maria structure ce type de projet →',
      lienHref: '/besoins/organiser-connaissance-entreprise',
      variant: 'yellow',
    }),

    h2('Combien de temps prend un knowledge management préparé pour l’IA ?'),
    paragraph(
      'C’est la question centrale des comités de direction en début de projet. La réponse dépend fortement du point de départ, mais des ordres de grandeur émergent.',
    ),
    paragraph(
      '**Cas 1 : documentation déjà bien tenue, single source of truth existante.** Rare mais possible dans les entreprises très cadrées (secteurs réglementés, industries pharmaceutiques). Comptez 3 à 6 semaines de préparation avant de brancher l’IA. Le principal travail sera le formatage au bon niveau de granularité et la mise en place de la gouvernance continue.',
    ),
    paragraph(
      '**Cas 2 : documentation existante mais dispersée et partiellement obsolète.** Le cas le plus fréquent. Comptez 6 à 12 semaines de préparation. Le travail principal : consolidation des sources contradictoires, mise à jour des contenus obsolètes, réécriture au format autoportant, gouvernance.',
    ),
    paragraph(
      '**Cas 3 : documentation quasi inexistante ou entièrement dans la tête des collaborateurs.** Cas des entreprises très artisanales ou en forte croissance. Comptez 3 à 6 mois de travail préalable, car il faut d’abord capturer le savoir avant de pouvoir le structurer. Sur ces cas, le knowledge management préparé pour l’IA devient un chantier stratégique de fond, qui dépasse le simple projet IA.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, cette phase de préparation représente en moyenne 40 à 60 % du temps de cadrage total. Ce ratio surprend souvent en début de projet. Il rassure toujours en fin de projet, quand l’agent IA délivre vraiment ce qui avait été promis.',
    ),

    h2('Pourquoi ce sujet est encore négligé aujourd’hui'),
    paragraph(
      'Si tout ceci est vrai, pourquoi si peu de projets démarrent-ils par cette étape ? Trois raisons se conjuguent, et elles méritent d’être nommées.',
    ),
    paragraph(
      '**Le temps de valeur perçu.** Un projet IA vend bien : « on va déployer un agent en 6 semaines ». Un projet KM vend mal : « on va d’abord structurer votre documentation pendant 3 mois ». Les commanditaires internes préfèrent parler du deuxième après le premier.',
    ),
    paragraph(
      '**La responsabilité floue.** Le knowledge management n’appartient à personne clairement. Ni à la DSI, ni aux RH, ni aux opérations. Résultat : personne ne le porte, jusqu’à ce qu’un projet IA le rende soudain critique.',
    ),
    paragraph(
      '**L’illusion de la magie IA.** Certains éditeurs vendent leurs solutions comme capables de « s’adapter à votre documentation existante, quelle qu’elle soit ». C’est techniquement vrai. Mais la performance de l’outil sera proportionnelle à la qualité de ce qu’il ingère. Sur une documentation médiocre, le résultat sera médiocre. C’est mathématique.',
    ),
    quoteAttribuee({
      texte:
        'Sur les projets qui produisent vraiment de la valeur, la première question qu’on pose n’est pas « quel outil ? », c’est « quel savoir voulez-vous rendre accessible et à qui ? ». Cette question paraît simple. Elle change tout le reste.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Par où commencer si votre knowledge management est aujourd’hui embryonnaire'),
    paragraph(
      'Voici l’ordre d’action que nous recommandons pour amorcer proprement, sans exiger de gros budget initial.',
    ),
    paragraph(
      '**Semaine 1 : cartographier votre savoir critique.** Trois entretiens de 45 minutes avec des collaborateurs clés (un manager opérationnel, un expert métier, un nouveau collaborateur récent) suffisent à identifier les 20 sujets qui comptent vraiment. Cette cartographie ne demande aucun outil, juste un tableur.',
    ),
    paragraph(
      '**Semaine 2 : auditer l’état de la documentation existante.** Sur chacun des 20 sujets prioritaires : combien de versions existent ? Où ? Sont-elles à jour ? Cohérentes entre elles ? Cette étape révèle souvent un désordre qu’on ne soupçonnait pas.',
    ),
    paragraph(
      '**Semaine 3 : identifier un sponsor.** Le knowledge management ne s’improvise pas. Il faut un porteur, avec une autorité pour trancher les désaccords internes. Ce sponsor n’est pas obligatoirement au comité de direction. Il doit avoir le mandat, le temps, et la connaissance du terrain.',
    ),
    paragraph(
      '**Semaine 4 : lancer un chantier de consolidation prioritaire.** Sur 5 sujets critiques, consolider la source de vérité, réécrire au format autoportant, mettre en place la gouvernance. Cette étape prend 3 à 6 semaines de travail effectif selon le contexte.',
    ),
    paragraph(
      'À l’issue de ce mois initial, vous aurez posé les fondations. Vous n’avez pas encore d’agent IA. Mais vous avez rendu tout projet IA possible, avec des résultats prévisibles.',
    ),
    paragraph(
      'Pour l’application concrète de ces principes à un cas d’usage précis (agent IA de service client), voir [Comment structurer ses données pour créer un agent IA de service client ?](/blog/donnees-agent-ia-service-client). Une fois le savoir structuré et l’agent en production, reste la vraie question : celle de l’adoption par les équipes, développée dans [Agent IA interne : pourquoi vos équipes ne l’utiliseront pas (et comment les faire changer d’avis)](/blog/agent-ia-interne-adoption-equipes).',
    ),

    h2('En résumé'),
    paragraph(
      'Le knowledge management n’est plus une option organisationnelle. Il est le prérequis structurant de tout projet IA sérieux. Deux tiers des projets IA restent aujourd’hui en pilot purgatory parce que leur base de savoir n’était pas prête. Les entreprises qui réussissent leur IA sont celles qui ont d’abord structuré leur connaissance : cartographie du savoir critique, single source of truth, gouvernance formalisée, format lisible par la machine, boucle de mise à jour continue. Cette préparation prend de 3 semaines à plusieurs mois selon le point de départ, et représente 40 à 60 % du temps de cadrage sur les projets sérieux. Elle apporte de la valeur avec ou sans IA. Elle rend l’IA vraiment transformante quand elle vient s’y appuyer.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Faut-il vraiment attendre d’avoir tout structuré avant de démarrer un projet IA ?',
      reponse:
        'Non. Vous devez avoir structuré le périmètre sur lequel l’IA va travailler, pas tout votre savoir. Sur un premier projet, structurer 20 à 30 sujets critiques suffit pour démarrer. Le reste peut se faire progressivement. L’erreur consiste à vouloir tout structurer d’un coup, ou à vouloir démarrer sans rien structurer.',
    },
    {
      _key: 'faq-2',
      question: 'Le knowledge management est-il une compétence à internaliser ou à externaliser ?',
      reponse:
        'Les deux. Le rôle de sponsor et de garant de la gouvernance doit être interne. Le travail de méthode, de cadrage, et souvent de premier accompagnement peut être externalisé, à condition que le prestataire transfère la compétence à vos équipes. Sur nos projets, nous prévoyons toujours cette phase de transfert dès le cadrage.',
    },
    {
      _key: 'faq-3',
      question: 'Combien coûte un chantier de knowledge management préparé pour l’IA ?',
      reponse:
        'Sur les projets que nous accompagnons chez maria, comptez 15 000 à 60 000 € pour la phase de cartographie, consolidation et mise en place de la gouvernance sur un périmètre pilote. Ce budget varie fortement selon la taille de l’organisation et l’état de départ de la documentation. Il ne comprend pas le déploiement de l’agent IA lui-même.',
    },
    {
      _key: 'faq-4',
      question: 'Le knowledge management est-il aussi utile sans projet IA ?',
      reponse:
        'Absolument, et c’est un point clé. Le KM structuré apporte des gains mesurables même en l’absence d’IA : réduction du temps de recherche d’information, autonomie accrue des nouveaux collaborateurs, préservation du savoir en cas de départ. L’IA amplifie ces gains. Mais elle ne les crée pas seule.',
    },
    {
      _key: 'faq-5',
      question: 'Quels outils utiliser pour structurer un knowledge management prêt pour l’IA ?',
      reponse:
        'Au démarrage, vos outils actuels (Notion, Confluence, SharePoint, Google Workspace) suffisent, à condition d’y appliquer une discipline stricte : single source of truth, format autoportant, gouvernance formalisée. Les outils dédiés (Elium, Bloomfire, Guru, Document360) apportent de la valeur à l’échelle, généralement à partir de 200 à 300 contenus actifs et de plusieurs contributeurs simultanés.',
    },
  ],

  sidebarCta: {
    titre: 'Organiser votre knowledge management ?',
    description: '30 minutes pour cartographier votre savoir critique et prioriser le chantier de structuration.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Knowledge management et IA : organiser avant de déployer | maria',
    description:
      'Pourquoi structurer votre knowledge management est le prérequis de tout projet IA. Méthode, chiffres et retours d’expérience. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
