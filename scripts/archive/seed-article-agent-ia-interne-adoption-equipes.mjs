/**
 * Seed de l'article « Agent IA interne : pourquoi vos équipes ne l'utiliseront
 * pas (et comment les faire changer d'avis) »
 *
 * Auteur : Mathieu HERNANDEZ (Directeur produit) — `auteur-equipe-maria` en base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false.
 *
 * Cross-links :
 *  - Vers /blog/knowledge-management-ia-organiser-savoir-avant-agent en fin
 *    (pendant amont : préparation du savoir → adoption de l'agent aval).
 *  - Le lien retour est ajouté dans le seed de l'article KM.
 *
 * Sources cliquables :
 *  - France Num 2025 (Baromètre DGE / Crédoc)
 *  - CIGREF 2024 (IA en entreprise, bonnes pratiques)
 *  - CIGREF 2026 (Retour sur investissement IA générative et agentique)
 *
 * Corrections vs brief initial :
 *  - TLDR puce 1 : 233 → 186 chars (« Direction générale des Entreprises » →
 *    « DGE » abrégé, formulation compacte)
 *  - TLDR puce 2 : 204 → 185 chars (« Le CIGREF (2026) constate que… »)
 *  - Pas de bloc DÉFINITION (le sujet est comportemental / stratégique, rien
 *    de technique à définir formellement)
 *  - inArticleCta yellow ajouté après la section « La méthode maria »
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-agent-ia-interne-adoption-equipes.mjs
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
  _id: 'article-agent-ia-interne-adoption-equipes',
  _type: 'article',
  slug: { _type: 'slug', current: 'agent-ia-interne-adoption-equipes' },
  titre: 'Agent IA interne : pourquoi vos équipes ne l’utiliseront pas (et comment les faire changer d’avis)',
  sousTitre:
    'Le vrai sujet des projets IA internes n’est ni la technique ni le budget. C’est l’adoption. Voici pourquoi vos équipes résistent et comment renverser la tendance.',
  intro:
    'Vous avez déployé un agent IA interne. Il fonctionne techniquement. Personne ne l’utilise vraiment. Ce scénario est le plus courant en 2026, et il n’est pas une fatalité.',
  publishedAt: '2026-09-14T09:00:00.000Z',
  readingTime: 10,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Selon le Baromètre France Num 2025 (DGE, 11 021 entreprises), 26 % des TPE-PME françaises utilisent l’IA, avec de fortes disparités sectorielles (9 % agriculture, 40 %+ numérique).',
    'Le CIGREF (2026) constate que la valeur d’un outil IA horizontal dépend moins de sa qualité technique que de la réallocation effective du temps gagné vers des missions à valeur ajoutée.',
    'Sur les projets que nous accompagnons chez maria, le succès d’un agent IA interne dépend pour moitié de sa conception technique et pour moitié de sa capacité à s’inscrire dans les rituels de travail réels.',
    'Quatre freins expliquent la non-adoption : friction d’accès, absence de confiance, absence d’utilité perçue, absence de renforcement managérial.',
    'La méthode qui marche : ancrer l’agent dans les outils existants, produire des réponses sourcées, embarquer les managers, mesurer l’usage réel dès la première semaine.',
  ],

  body: [
    h2('Le scénario le plus courant en 2026'),
    paragraph(
      'Vous avez cadré un projet d’agent IA interne. Vous avez choisi un prestataire sérieux ou une plateforme reconnue. Vous avez branché la documentation. L’agent fonctionne. Les tests de recette sont concluants. Vous lancez officiellement l’outil auprès de vos équipes.',
    ),
    paragraph(
      'Six mois plus tard, vous consultez les statistiques d’usage. Un tiers de vos collaborateurs a essayé une fois. 15 % l’utilisent occasionnellement. Moins de 5 % en font un réflexe quotidien. Le projet a coûté plusieurs dizaines de milliers d’euros. La valeur produite est marginale.',
    ),
    paragraph(
      'Ce scénario n’est pas une caricature. C’est le résultat le plus fréquent des déploiements d’agents IA internes en France en 2026. Le [Baromètre France Num 2025](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le), mené par la Direction générale des Entreprises auprès de 11 021 TPE et PME françaises, révèle que si 26 % des TPE-PME utilisent désormais des solutions d’IA, ce chiffre masque une réalité plus complexe : les usages restent concentrés sur des tâches périphériques (génération de contenu, chatbots publics) et rarement sur les processus métiers structurants. Autrement dit, l’adoption revendiquée n’est pas l’adoption qui produit de la valeur.',
    ),
    paragraph(
      'Le problème ne vient presque jamais de la qualité technique de l’outil. Il vient d’ailleurs. Et cet « ailleurs » a été systématiquement sous-estimé dans le cadrage initial.',
    ),
    callout(
      'À retenir',
      'Un agent IA techniquement excellent que personne n’utilise vaut moins qu’un agent IA imparfait utilisé quotidiennement. La valeur naît de l’usage, pas de la performance en laboratoire. C’est une évidence qui devrait guider tout projet, elle est presque toujours oubliée en phase de cadrage.',
    ),

    h2('Pourquoi vos équipes n’utilisent pas votre agent IA'),
    paragraph(
      'Sur les projets que nous auditons chez maria, quatre freins reviennent systématiquement. Ils se combinent, se renforcent, et produisent l’échec d’adoption qui étonne tant de commanditaires.',
    ),

    h3('Frein 1 : la friction d’accès'),
    paragraph(
      'Votre agent IA vit sur une URL dédiée. Vos équipes travaillent dans Slack, Teams, Notion, leur CRM, leur ERP. Pour utiliser l’agent, elles doivent ouvrir un onglet, se connecter, taper leur question, attendre une réponse, revenir à leur outil de travail. Chaque étape est une friction. Chaque friction fait perdre une part significative des utilisateurs potentiels.',
    ),
    paragraph(
      'La règle empirique observée : chaque clic supplémentaire pour accéder à un outil réduit son adoption de 20 à 30 %. Un agent qui demande 5 clics pour être utilisé perd 80 % de ses utilisateurs potentiels rien qu’à cause de cette barrière.',
    ),

    h3('Frein 2 : l’absence de confiance'),
    paragraph(
      'Un collaborateur qui utilise l’agent pour la première fois et reçoit une réponse floue, contradictoire ou fausse ne réessayera pas. Les études sur l’adoption des outils IA en entreprise le montrent : la première mauvaise expérience détermine la relation à l’outil pour les mois suivants.',
    ),
    paragraph(
      'Un agent IA qui produit des réponses sans sources vérifiables, qui invente occasionnellement, ou qui ne sait pas dire « je ne sais pas », installe rapidement une défiance qu’il est très difficile de rattraper ensuite. Comme le souligne le [CIGREF dans son rapport 2024 sur l’IA en entreprise](https://www.cigref.fr/lia-en-entreprise-retours-dexperience-et-bonnes-pratiques), la gestion de la qualité des réponses produites par les outils d’IA est l’un des enjeux principaux pour préserver la confiance des utilisateurs dans la durée.',
    ),

    h3('Frein 3 : l’absence d’utilité perçue'),
    paragraph(
      'Vos équipes ont des habitudes. Elles savent qui appeler pour telle question, quel dossier consulter pour tel sujet, quel expert solliciter dans quel cas. Ces habitudes fonctionnent. Elles sont imparfaites, mais elles fonctionnent.',
    ),
    paragraph(
      'Pour qu’un collaborateur change son réflexe, il faut que l’agent lui apporte une valeur significative par rapport à ce qu’il fait déjà. Pas marginale. Significative. Si l’agent lui répond en 30 secondes ce qu’il obtenait en 45 secondes en demandant à un collègue, il ne changera pas d’habitude. Il faut passer de 45 secondes à 5 secondes, ou apporter une réponse qu’il n’aurait pas eue autrement.',
    ),
    paragraph(
      'C’est le point précis identifié par le [CIGREF dans son rapport 2026 sur le retour sur investissement de l’IA](https://www.cigref.fr/evaluer-le-retour-sur-investissement-des-solutions-dia-generative-et-agentique) : « Si les IA horizontales génèrent des gains de temps, leur valeur réelle dépend de la réallocation de ce temps vers des missions à plus haute valeur ajoutée ou de l’intelligence collective. » Autrement dit, un gain marginal qui ne réalloue pas le temps est un gain qui disparaît.',
    ),

    h3('Frein 4 : l’absence de renforcement managérial'),
    paragraph(
      'C’est le frein le plus sous-estimé, et probablement le plus décisif. Les collaborateurs adoptent les outils que leurs managers valorisent. Si votre encadrement intermédiaire ne parle jamais de l’agent IA en réunion, n’y fait jamais référence pour trancher une question, ne rappelle jamais son existence, alors l’outil disparaît dans la masse des dispositifs internes qui existent sans être utilisés.',
    ),
    paragraph(
      'Le CIGREF le souligne dans ses travaux 2024 sur les bonnes pratiques : « Les collaborateurs plébiscitent une intégration des IA génératives mais craignent pour leur travail. » Cette ambivalence produit une attente forte de cadrage par la ligne managériale. Un management qui reste en retrait laisse l’ambivalence l’emporter sur l’usage.',
    ),
    tableau({
      enTetes: ['Frein', 'Symptôme observé', 'Contre-mesure'],
      lignes: [
        ['Friction d’accès', 'Usage occasionnel, pas de retour spontané', 'Intégration dans les outils existants (Slack, Teams, intranet)'],
        ['Absence de confiance', 'Chute d’usage après quelques essais', 'Réponses sourcées, capacité à dire « je ne sais pas »'],
        ['Absence d’utilité perçue', 'Peu de sessions par utilisateur', 'Ciblage des vrais irritants métier, pas des cas génériques'],
        ['Absence de renforcement managérial', 'Adoption stagnante malgré la communication', 'Managers formés en premier, ambassadeurs identifiés'],
      ],
    }),

    h2('Ce que dit vraiment la mesure d’usage'),
    paragraph(
      'L’un des points les plus révélateurs des projets IA internes est le décalage entre ce que les dirigeants pensent, ce que les équipes disent, et ce que la mesure révèle.',
    ),
    paragraph(
      'Le CIGREF, dans ses retours d’expérience 2026, insiste sur ce point : « L’inadaptation des méthodes comptables traditionnelles face à l’IA transformative » rend la mesure d’usage d’autant plus critique. Les indicateurs classiques ne suffisent pas. Il faut mesurer l’usage réel, pas le déclaratif.',
    ),
    paragraph(
      'Sur les projets que nous auditons chez maria, l’écart typique observé entre déclaratif et mesure objective se présente ainsi. Les dirigeants estiment que 60 à 85 % de leurs équipes utilisent l’agent IA régulièrement. Les collaborateurs interrogés déclarent, en moyenne pondérée, que 40 à 55 % l’utilisent. La mesure d’usage effective révèle que 15 à 30 % l’utilisent réellement de manière hebdomadaire.',
    ),
    paragraph(
      'Cette triple discordance a une raison simple. Les dirigeants extrapolent à partir de leurs propres pratiques. Les collaborateurs sur-déclarent parce qu’ils savent que l’outil est valorisé. Seule la mesure objective raconte l’histoire réelle.',
    ),
    paragraph(
      'Cette information est cruciale à un moment très précis : le comité de pilotage à 3 mois. Si vous vous appuyez sur les déclarations, vous concluez que « ça marche bien ». Si vous mesurez, vous voyez que l’adoption stagne. Et vous avez encore le temps d’agir.',
    ),
    warning(
      'Point de vigilance',
      'Ne jugez pas l’adoption d’un agent IA sur les déclarations. Mesurez l’usage réel : nombre d’utilisateurs actifs par semaine, nombre de sessions par utilisateur, temps moyen d’utilisation. Ces indicateurs, disponibles dans tous les outils modernes, révèlent une réalité que les déclarations masquent.',
    ),

    h2('La méthode maria pour installer l’usage dans la durée'),
    paragraph(
      'Sur les projets d’agent IA interne que nous cadrons, une méthode s’est stabilisée pour éviter le piège de l’outil ignoré. Elle repose sur quatre principes concrets, cohérents avec les bonnes pratiques identifiées par le CIGREF.',
    ),

    h3('Principe 1 : ancrer l’agent dans les outils existants'),
    paragraph(
      'Ne créez pas une nouvelle interface. Intégrez l’agent là où vos équipes travaillent déjà. Une commande Slack, un widget dans Teams, un bouton dans votre intranet, un raccourci clavier. Chaque intégration réduit la friction et démultiplie l’usage.',
    ),
    paragraph(
      'Sur nos projets, nous constatons que la même documentation, le même moteur IA, la même équipe utilisatrice génèrent 3 à 5 fois plus d’usages selon le mode d’accès. Un agent accessible depuis Slack est utilisé plusieurs fois par jour par les mêmes personnes qui ouvriraient un onglet dédié une fois par semaine.',
    ),

    h3('Principe 2 : miser sur les réponses sourcées et l’aveu d’ignorance'),
    paragraph(
      'Chaque réponse de l’agent doit indiquer d’où elle vient. Un lien vers le document source, un extrait cité, une référence vérifiable. Cette pratique construit la confiance progressivement.',
    ),
    paragraph(
      'Et surtout, l’agent doit pouvoir dire « je n’ai pas la réponse ». Un agent qui refuse d’inventer préserve sa crédibilité sur la durée. Un agent qui produit toujours une réponse, même quand il ne sait pas, détruit la sienne en quelques semaines. Le CIGREF le formule ainsi dans son rapport 2024 : « Il convient de garder le contrôle sur la qualité des données, la nature des requêtes et les résultats produits par les outils d’IA. »',
    ),

    h3('Principe 3 : embarquer les managers en premier'),
    paragraph(
      'Avant le déploiement général, formez et outillez vos managers intermédiaires. Faites-en des ambassadeurs. Fournissez-leur des cas d’usage concrets pour leurs propres besoins, pas seulement pour ceux de leurs équipes.',
    ),
    paragraph(
      'Un manager qui a personnellement gagné du temps grâce à l’agent en parlera naturellement. Un manager qui n’a jamais vraiment essayé restera silencieux. Cette différence détermine l’adoption dans son équipe.',
    ),

    h3('Principe 4 : mesurer l’usage dès la première semaine'),
    paragraph(
      'Ne mesurez pas à 3 mois. Mesurez dès la première semaine, puis chaque semaine. Suivez trois indicateurs simples : nombre d’utilisateurs actifs, nombre de sessions par utilisateur actif, taux de retour à 7 jours.',
    ),
    paragraph(
      'Ces indicateurs révèlent immédiatement si le projet part sur la bonne pente ou si des ajustements sont nécessaires. Un décrochage d’usage entre la semaine 2 et la semaine 4 est un signal fort qu’il faut agir avant qu’il ne soit trop tard.',
    ),
    avisMaria({
      texte:
        'La mode pousse à investir massivement dans la performance technique de l’agent IA. Notre conviction est inverse. La performance technique compte, mais elle est nécessaire, pas suffisante. Ce qui fait la différence entre un projet qui produit de la valeur et un projet qui reste sur l’étagère, c’est le travail sur les rituels d’usage, les intégrations aux outils du quotidien, et le portage par les managers. Ce travail organisationnel est souvent négligé parce qu’il ne fait pas rêver. Il fait pourtant toute la différence.',
      signature: 'Mathieu HERNANDEZ',
    }),
    inArticleCta({
      titre: 'Piloter l’adoption de votre agent IA interne',
      description:
        '30 minutes pour cadrer les rituels d’usage, les intégrations aux outils du quotidien et le portage managérial qui feront décoller votre projet.',
      lienLibelle: 'Voir comment maria pilote ce type de projet →',
      lienHref: '/besoins/organiser-connaissance-entreprise',
      variant: 'yellow',
    }),

    h2('Comment détecter tôt une adoption qui décroche'),
    paragraph(
      'Trois signaux d’alerte précoces méritent d’être surveillés dans les premières semaines après le déploiement.',
    ),
    paragraph(
      '**Signal 1 : le ratio utilisateurs actifs / utilisateurs invités.** Il devrait dépasser 40 % en semaine 1 pour espérer une adoption saine à 3 mois. En dessous de 25 %, le projet a un problème structurel qui ne se corrigera pas seul.',
    ),
    paragraph(
      '**Signal 2 : le nombre de sessions par utilisateur actif.** Un utilisateur actif qui n’utilise l’agent qu’une fois par semaine ne l’a pas encore intégré dans ses rituels. Il faut viser au moins 3 sessions hebdomadaires par utilisateur actif pour que l’usage devienne habitude.',
    ),
    paragraph(
      '**Signal 3 : le taux de retour à 7 jours.** Un utilisateur qui teste l’agent en semaine 1 et ne revient pas en semaine 2 est probablement perdu pour de bon. Ce taux doit dépasser 60 % pour espérer une adoption durable.',
    ),
    paragraph(
      'Ces trois indicateurs sont observables dès les 15 premiers jours après le déploiement. Ils permettent d’ajuster le tir avant que les habitudes de non-usage ne se cristallisent.',
    ),
    quoteAttribuee({
      texte:
        'Les projets IA internes qui réussissent ne sont pas ceux qui ont le meilleur modèle. Ce sont ceux dont l’équipe projet a compris que l’outil ne se vend pas tout seul, qu’un rituel d’usage se construit, et qu’un manager qui n’utilise pas l’outil est un manager qui le tue silencieusement.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer si votre agent IA est déjà déployé mais peu utilisé'),
    paragraph(
      'Vous êtes dans le scénario où l’agent existe mais l’adoption stagne. Voici l’ordre d’action que nous recommandons.',
    ),
    paragraph(
      '**Semaine 1 : mesurer sans juger.** Extrayez les indicateurs d’usage réel de votre outil. Combien d’utilisateurs actifs par semaine ? Combien de sessions par utilisateur ? Quel taux de retour ? Cette photo objective est la base de tout le reste. Elle est souvent inconfortable, elle est indispensable.',
    ),
    paragraph(
      '**Semaine 2 : interviewer 5 non-utilisateurs.** Pas ceux qui pourraient l’utiliser en théorie. Ceux qui devraient l’utiliser d’après votre cadrage initial et ne le font pas. Écoutez leurs raisons sans les défendre. Vous découvrirez presque toujours des frictions concrètes que le cadrage initial avait négligées.',
    ),
    paragraph(
      '**Semaine 3 : identifier une intégration cruciale.** Une intégration à Slack, à Teams, à votre intranet, à un outil métier majeur. Une seule intégration bien faite change souvent radicalement l’adoption.',
    ),
    paragraph(
      '**Semaine 4 : reformer les managers.** Pas les collaborateurs. Les managers. Donnez-leur des cas d’usage personnels concrets. Faites-les manipuler l’outil devant vous. Attendez d’eux qu’ils en parlent en réunion d’équipe la semaine suivante.',
    ),
    paragraph(
      'À l’issue de ce mois de repositionnement, vous aurez soit relancé l’adoption sur des bases saines, soit compris que votre agent doit être repensé fondamentalement. Dans les deux cas, vous serez sorti de la zone grise où le projet vit sans mourir mais sans produire non plus.',
    ),
    paragraph(
      'La question de l’adoption ne se joue jamais seule. Elle prolonge celle du cadrage amont : pour la vue d’ensemble sur la préparation stratégique du savoir avant même de choisir un agent, voir [Knowledge management et IA : pourquoi vous devez organiser votre savoir avant de déployer un agent](/blog/knowledge-management-ia-organiser-savoir-avant-agent).',
    ),

    h2('En résumé'),
    paragraph(
      'L’échec d’adoption d’un agent IA interne n’est presque jamais technique. Il vient de quatre freins : la friction d’accès, l’absence de confiance dans les réponses, l’absence d’utilité perçue, l’absence de renforcement managérial. Le CIGREF et le Baromètre France Num convergent sur un constat : l’adoption réelle est bien inférieure à l’adoption déclarée, et la valeur ne se réalise que lorsque le temps gagné est effectivement réalloué à des missions à valeur. La méthode qui fonctionne repose sur quatre principes : intégrer l’agent dans les outils du quotidien, produire des réponses sourcées et savoir dire « je ne sais pas », embarquer les managers avant les équipes, mesurer l’usage réel dès la première semaine. Un projet IA interne qui applique ces principes construit une adoption durable en 6 à 12 semaines. Un projet qui les néglige rejoint le cimetière silencieux des outils déployés mais jamais utilisés.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Combien de temps faut-il pour qu’un agent IA interne devienne un réflexe quotidien ?',
      reponse:
        'Sur les projets bien menés que nous accompagnons chez maria, l’adoption stabilisée est observée entre 6 et 12 semaines après le déploiement, à condition que les quatre principes (intégration aux outils, réponses sourcées, embarquement des managers, mesure d’usage) soient appliqués. Sans ce cadrage, l’adoption reste faible bien au-delà de 6 mois.',
    },
    {
      _key: 'faq-2',
      question: 'Faut-il rendre l’usage de l’agent IA obligatoire ?',
      reponse:
        'Non. L’obligation produit de l’usage superficiel, pas de l’adoption réelle. Un agent utilisé par obligation est un agent qu’on cherche à éviter dès que possible. Mieux vaut construire l’utilité perçue et laisser l’usage s’installer par choix. Cela demande plus de temps mais produit un usage durable.',
    },
    {
      _key: 'faq-3',
      question: 'Comment convaincre un manager sceptique ?',
      reponse:
        'Deux leviers marchent, dans cet ordre. Premièrement, lui montrer un cas d’usage concret qui répond à un irritant qu’il vit personnellement (pas celui de ses équipes). Deuxièmement, lui montrer les données d’usage de ses pairs. Un manager qui découvre que 4 de ses collègues sur 5 utilisent l’agent hebdomadairement change de posture plus vite qu’après trois présentations d’ambition stratégique.',
    },
    {
      _key: 'faq-4',
      question: 'Que faire si mes équipes utilisent déjà ChatGPT ou Claude à côté ?',
      reponse:
        'C’est une excellente base de départ, mais ça ne remplace pas un agent IA interne. Un agent générique ne connaît pas votre entreprise, vos procédures, vos clients, vos contrats. Il produit des réponses génériques qui ne répondent qu’à des questions génériques. Un agent IA interne bien conçu, connecté à votre documentation réelle, apporte une valeur que ChatGPT ne peut pas fournir. Mais si vos équipes ne perçoivent pas cette différence, elles resteront sur ChatGPT.',
    },
    {
      _key: 'faq-5',
      question: 'Peut-on relancer un projet d’agent IA interne qui a échoué ?',
      reponse:
        'Oui, à condition de comprendre pourquoi il a échoué. Un relancement sans analyse produit un second échec plus rapidement. Nos observations sur les projets que nous auditons montrent que l’analyse honnête des causes d’un premier échec est l’investissement le plus rentable pour le second essai.',
    },
  ],

  sidebarCta: {
    titre: 'Relancer l’adoption de votre agent IA ?',
    description: '30 minutes pour mesurer l’usage réel et identifier les 2 leviers qui feront décoller votre projet.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Agent IA interne : pourquoi vos équipes ne l’utilisent pas | maria',
    description:
      'Adoption d’un agent IA interne : les vrais freins, les erreurs classiques, la méthode qui fait passer d’un outil ignoré à un réflexe quotidien.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
