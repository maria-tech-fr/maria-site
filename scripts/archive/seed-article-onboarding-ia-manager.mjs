/**
 * Seed de l'article « Onboarding IA : ce que le manager gagne
 * (et ce qu'il ne doit pas perdre) »
 *
 * Auteur : Matthieu SEILLER (Directeur stratégique) — `auteur-matthieu-seiller`
 * en base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false.
 *
 * Cross-links bidirectionnels avec l'article Assistant IA d'onboarding
 * (Mathieu HERNANDEZ, publié 2026-09-30) :
 *  - Cet article renvoie vers /blog/assistant-ia-onboarding-nouveau-collaborateur-autonome
 *    dans un paragraphe transitionnel juste avant "En résumé" (vue posture
 *    manager → guide de cadrage complet).
 *  - Le lien retour est ajouté dans le seed de l'article HERNANDEZ, dans la
 *    Condition 3 (articulation avec l'accompagnement humain).
 *
 * Sources cliquables (option B mixte) :
 *  - Moortgat : URL directe article de blog → LIEN sur la première mention.
 *  - DARES et APEC : présentes dans le frontmatter du brief mais jamais
 *    citées dans le corps → non intégrées (pas de champ sources dédié dans
 *    notre schema Sanity).
 *
 * Choix éditoriaux :
 *  - inArticleCta yellow ajouté après le TABLEAU des moments qui doivent
 *    rester humains (moment "cadrage" naturel).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria :
 *    pas de bloc CTA en fin de body).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-onboarding-ia-manager.mjs
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
  _id: 'article-onboarding-ia-ce-que-le-manager-gagne',
  _type: 'article',
  slug: { _type: 'slug', current: 'onboarding-ia-ce-que-le-manager-gagne' },
  titre: 'Onboarding IA : ce que le manager gagne (et ce qu’il ne doit pas perdre)',
  sousTitre:
    'Le vrai sujet d’un assistant IA d’onboarding n’est pas ce qu’il fait à la place du manager. C’est ce qu’il rend possible en libérant son temps.',
  intro:
    'La mode parle de l’IA qui accueille les nouveaux. Notre conviction est inverse : ce qui compte, c’est ce que le manager peut enfin faire quand il n’est plus interrompu par des questions logistiques.',
  publishedAt: '2026-09-26T09:00:00.000Z',
  readingTime: 8,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-matthieu-seiller' },

  tldr: [
    'Le manager est le pilier reconnu de tout onboarding réussi, mais il est aussi celui dont le temps est le plus difficile à protéger dans les premiers jours d’une recrue.',
    'Selon une étude Moortgat sur 800 salariés, 60 % des nouveaux arrivants attendent en priorité que leur manager clarifie leurs missions et soit disponible pour les écouter.',
    'Un assistant IA bien conçu ne remplace pas le manager, il absorbe les questions logistiques qui l’interrompent en continu et lui rendent le temps pour ce qui compte vraiment.',
    'Ce que le manager ne doit pas perdre : le premier café, le cadrage de mission, les retours à 30-60-90 jours, la lecture des signaux faibles.',
    'Ce qu’il gagne : du temps disponible, de l’énergie mentale, et une meilleure capacité à décider en connaissance de cause sur la période d’essai.',
  ],

  body: [
    h2('Un dilemme managérial connu de tous'),
    paragraph(
      'Tout manager qui a accueilli un nouveau collaborateur connaît ce dilemme. Les premiers jours d’une recrue sont critiques pour son intégration, sa perception de l’entreprise, et sa décision inconsciente de rester ou de partir. Ils sont aussi la période où le manager est le plus sollicité : questions logistiques toutes les dix minutes, présentations à faire, procédures à rappeler, accès à débloquer.',
    ),
    paragraph(
      'Ces sollicitations sont légitimes. Un nouveau ne peut pas savoir. Mais leur cumul produit deux effets pervers. Premier effet : le manager n’a plus le temps de mener les vrais entretiens qui structurent l’intégration (cadrage de mission, feedback régulier, écoute active). Deuxième effet : le nouveau finit par éviter de solliciter son manager qu’il sent débordé, et cherche ses réponses ailleurs, souvent moins bien.',
    ),
    paragraph(
      'L’[étude Moortgat](https://www.moortgat.com/blog/role-manager-integration-salarie/) menée auprès de 800 salariés est éclairante sur ce point. 60 % des nouveaux arrivants déclarent attendre en priorité que leur manager clarifie leurs missions et soit disponible pour les écouter. Ce sont précisément les deux activités que la surcharge logistique empêche de mener sérieusement. Le manager se retrouve à faire tout sauf ce que son équipe attend vraiment de lui.',
    ),
    paragraph(
      'C’est dans cet écart que se joue l’intérêt d’un assistant IA d’onboarding. Pas dans le remplacement du rôle managérial. Dans sa protection.',
    ),
    callout(
      'À retenir',
      'Le manager n’est pas surchargé parce qu’il fait mal son travail d’accueil. Il l’est parce que la structure actuelle de l’onboarding le condamne à répondre en continu à des questions logistiques qui n’ont pas besoin de lui. Le problème n’est pas le manager, c’est le système qui l’entoure.',
    ),

    h2('Ce que l’IA doit absorber pour libérer le manager'),
    paragraph(
      'Un assistant IA d’onboarding bien conçu ne rêve pas de remplacer l’humain. Il cible précisément les sollicitations qui interrompent le manager sans nécessiter son intervention.',
    ),
    paragraph(
      '**Les questions procédurales.** Comment demander un accès, où se trouve le formulaire de note de frais, comment poser un jour de congé, quel est le processus de commande de matériel. Ces questions ont une réponse univoque, documentable, et se répètent à chaque arrivée. Elles n’apportent aucune valeur ajoutée à traiter par le manager.',
    ),
    paragraph(
      '**Les questions d’orientation.** Qui contacter pour tel sujet, où trouver telle information, comment fonctionne tel outil interne. Ces questions supposent une cartographie de l’organisation que la recrue met normalement plusieurs semaines à reconstituer, alors qu’elle est parfaitement documentable en amont.',
    ),
    paragraph(
      '**Les rappels de calendrier.** Formations obligatoires, entretiens à passer, documents à signer, sessions d’accueil collectives. Ces rappels sont mécaniques, ils gagnent à être automatisés plutôt que de reposer sur la mémoire du manager déjà chargée.',
    ),
    paragraph(
      '**Les demandes de ressources.** Charte graphique, templates de présentation, procédures qualité, guides métier. Ces contenus existent, ils sont juste souvent introuvables. Un assistant qui les localise fait gagner du temps à tout le monde.',
    ),
    paragraph(
      'Cette liste peut sembler modeste. Elle représente pourtant, sur les projets que nous accompagnons chez maria, entre 60 et 80 % des sollicitations qu’un manager reçoit d’une recrue pendant ses trois premières semaines. La libération de ce volume change fondamentalement la disponibilité mentale du manager.',
    ),

    h2('Ce que le manager ne doit surtout pas perdre'),
    paragraph(
      'Le risque de tout projet d’automatisation d’onboarding est de laisser l’outil grignoter progressivement des moments qui doivent absolument rester humains. Voici la liste que nous défendons sur nos projets, sans concession.',
    ),
    tableau({
      enTetes: ['Moment', 'Pourquoi rester humain', 'Ce que l’IA ne remplace pas'],
      lignes: [
        ['Le premier café du premier jour', 'Charge symbolique majeure, ancre l’appartenance', 'Aucune interface ne remplace un regard et une poignée de main'],
        ['Le cadrage initial de mission', 'Définit la relation de travail sur toute la période d’essai', 'L’IA peut préparer, seul le manager peut arbitrer'],
        ['Les entretiens à 30, 60, 90 jours', 'Moments de calibrage, d’ajustement, de décision', 'L’écoute humaine perçoit ce que les mots ne disent pas'],
        ['La lecture des signaux faibles', 'Détection précoce d’un désengagement, d’un blocage', 'Aucun assistant ne remplace l’intuition managériale'],
        ['La transmission de la culture d’entreprise', 'Se fait par les comportements et les décisions, pas par des mots', 'La culture est ce que le manager fait, pas ce qu’il dit'],
        ['Les décisions liées à la période d’essai', 'Enjeu humain et juridique majeur', 'Non délégable, par nature et par droit'],
      ],
    }),
    paragraph(
      'Un assistant qui tente de couvrir ces moments dégrade l’onboarding au lieu de l’améliorer. C’est pourquoi le cadrage d’un projet d’assistant IA d’onboarding doit poser cette frontière avant même de discuter d’outil.',
    ),
    warning(
      'Point de vigilance',
      'Le glissement typique consiste à laisser l’assistant IA « aussi faire les rappels aux managers ». Puis à lui confier « aussi les retours à 30 jours automatisés ». Puis à lui déléguer « aussi la synthèse pour la décision de fin de période d’essai ». Chaque pas semble raisonnable pris isolément. L’accumulation vide le manager de son rôle d’intégrateur.',
    ),
    inArticleCta({
      titre: 'Poser la frontière avant de choisir l’outil',
      description:
        '30 minutes pour cadrer ce que l’assistant IA doit absorber et ce que vos managers doivent garder, avant tout choix technique.',
      lienLibelle: 'Voir comment maria cadre ce type de projet →',
      lienHref: '/besoins/faciliter-onboarding',
      variant: 'yellow',
    }),

    h2('Ce que le manager peut enfin faire quand son temps est protégé'),
    paragraph(
      'C’est le point que la plupart des projets d’assistant IA d’onboarding oublient de mesurer. Ils suivent des indicateurs côté recrue (satisfaction, autonomie, temps de prise en main) et côté RH (temps équipe libéré, rupture de période d’essai). Ils oublient l’indicateur central : qu’est-ce que le manager fait de son temps désormais disponible ?',
    ),
    paragraph(
      'Sur les projets que nous accompagnons, nous observons trois usages récurrents du temps libéré. Ils font la différence entre un onboarding structurel qui tient et un onboarding qui repose sur la bonne volonté.',
    ),
    paragraph(
      '**Des cadrages de mission plus longs et plus précis.** Un manager qui n’est pas interrompu toutes les vingt minutes peut prendre 90 minutes pour clarifier les priorités, expliquer les enjeux, calibrer les attentes. C’est le fondement d’une relation de travail saine sur toute la période d’essai.',
    ),
    paragraph(
      '**Des feedbacks plus fréquents et de meilleure qualité.** Un feedback bien mené prend du temps mental. C’est incompatible avec un manager qui court d’une interruption à l’autre. La libération de son temps permet des retours réguliers, courts mais denses, qui construisent la confiance dans les deux sens.',
    ),
    paragraph(
      '**Une meilleure lecture des signaux faibles.** Un désengagement précoce, un blocage sur un projet, un malentendu avec un collègue, cela se lit dans des micro-signaux que le manager captera s’il a l’esprit disponible. C’est précisément cette capacité de perception qui distingue un manager qui retient ses recrues d’un manager qui les voit partir à trois mois.',
    ),
    paragraph(
      'Le retour sur investissement d’un assistant IA d’onboarding ne se mesure donc pas seulement en heures gagnées. Il se mesure aussi en qualité managériale rendue possible, ce qui est bien plus difficile à quantifier mais bien plus déterminant sur le long terme.',
    ),
    avisMaria({
      texte:
        'La mode parle de l’IA qui accueille les nouveaux. Notre conviction est inverse. Un assistant IA n’accueille personne, il libère celui dont l’accueil dépend vraiment : le manager. La bonne question à se poser en début de projet n’est pas « que va faire l’IA à la place du manager ? » mais « que le manager va-t-il pouvoir faire enfin, avec le temps rendu disponible ? ». Cette inversion change tout le cadrage.',
      signature: 'Matthieu SEILLER',
    }),

    h2('Comment cadrer un projet d’assistant IA qui protège vraiment le rôle managérial'),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, trois principes structurent le cadrage.',
    ),
    paragraph(
      '**Principe 1 : cartographier avec les managers, pas seulement avec les RH.** Le projet est souvent porté par la direction RH, ce qui est logique. Mais si les managers ne sont pas consultés en début de cadrage, l’assistant sera calibré sur les besoins vus par les RH, pas sur les vraies interruptions vécues sur le terrain. Interviewer 5 à 10 managers d’équipe avant tout choix technique est un investissement modeste qui change l’orientation du projet.',
    ),
    paragraph(
      '**Principe 2 : mesurer côté manager, pas seulement côté recrue.** Les indicateurs classiques (satisfaction du nouveau, temps d’autonomisation) sont utiles mais insuffisants. Il faut aussi mesurer, avant et après le déploiement, le temps que le manager consacre aux interruptions logistiques versus aux entretiens de cadrage et de feedback. C’est cette réallocation qui produit la valeur réelle.',
    ),
    paragraph(
      '**Principe 3 : outiller le manager pour tirer parti du temps libéré.** Un temps libéré qui n’est pas utilisé pour autre chose n’est pas un temps gagné. Il faut accompagner les managers pour qu’ils investissent effectivement le temps rendu dans les moments qui comptent : plus de feedbacks, plus de cadrages, plus d’écoute. Sans cet accompagnement, le temps libéré est simplement consommé par d’autres urgences.',
    ),

    h2('Le signal d’alerte à surveiller'),
    paragraph(
      'Un signal simple révèle si le projet d’assistant IA respecte ou non le rôle managérial : la fréquence des entretiens réels entre le manager et sa recrue pendant les trois premiers mois.',
    ),
    paragraph(
      'Si cette fréquence augmente après le déploiement de l’assistant, le projet est réussi : le manager utilise le temps libéré pour être plus présent. Si elle reste stable ou baisse, quelque chose a mal tourné : soit l’assistant absorbe plus que ce qu’il devrait, soit le manager utilise le temps gagné ailleurs, soit le cadrage a manqué le rôle central du manager.',
    ),
    paragraph(
      'Ce signal se mesure facilement à partir des agendas partagés. Il devrait figurer dans tout tableau de bord de projet d’onboarding IA sérieux, à côté des indicateurs d’usage et de satisfaction.',
    ),
    quoteAttribuee({
      texte:
        'Un projet d’assistant IA d’onboarding qui réduit le temps que le manager passe avec sa recrue est un projet qui a échoué, même si tous les autres indicateurs sont au vert. La valeur d’un onboarding tient à la qualité de la relation qui s’installe entre le nouveau et son responsable direct. L’IA doit renforcer cette relation, pas la diluer.',
      auteur: 'Matthieu SEILLER',
      role: 'Directeur stratégique, maria',
    }),

    h2('Par où commencer pour cadrer un projet qui respecte le rôle managérial'),
    paragraph(
      'Trois actions concrètes pour amorcer un projet dans le bon état d’esprit.',
    ),
    paragraph(
      '**Interviewer trois managers sur leurs vraies interruptions.** Pas les RH. Pas les recrues. Les managers eux-mêmes, sur ce qui les interrompt vraiment pendant les premières semaines d’un nouveau. Cette écoute révèle presque toujours des priorités que le cadrage initial avait manquées.',
    ),
    paragraph(
      '**Lister ce qui doit rester humain, avant tout choix d’outil.** La liste évoquée plus haut (premier café, cadrage de mission, entretiens à 30-60-90 jours, lecture des signaux faibles, transmission de culture, décision de période d’essai) doit être posée explicitement. Elle guide toute la suite du projet.',
    ),
    paragraph(
      '**Prévoir un accompagnement managérial en parallèle du déploiement.** Le succès du projet ne dépend pas seulement de l’assistant IA, il dépend de la capacité des managers à investir le temps libéré dans les moments qui comptent. Cet accompagnement fait partie du budget du projet, pas d’une ligne à part.',
    ),
    paragraph(
      'La question du rôle managérial n’est qu’une facette du cadrage d’un projet d’assistant IA d’onboarding. Pour la méthode complète (paliers de solution, budgets, délais, conditions de réussite), voir notre article [Assistant IA d’onboarding : comment rendre un nouveau collaborateur autonome rapidement](/blog/assistant-ia-onboarding-nouveau-collaborateur-autonome).',
    ),

    h2('En résumé'),
    paragraph(
      'Un assistant IA d’onboarding n’est pas là pour accueillir les nouveaux à la place du manager. Il est là pour libérer le manager des questions logistiques répétitives qui l’empêchent d’être vraiment présent sur ce qui compte : le cadrage de mission, les feedbacks réguliers, la lecture des signaux faibles, la décision de période d’essai. Ce que le manager gagne, c’est du temps mental disponible pour ces moments à forte valeur. Ce qu’il ne doit surtout pas perdre, c’est le premier café, les entretiens de calibrage, les moments symboliques d’appartenance et la responsabilité de la décision. Un projet bien cadré mesure cette frontière et outille les managers pour qu’ils investissent le temps libéré dans la relation qui, seule, fait la différence sur la rétention des recrues.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Un assistant IA peut-il conduire l’entretien de fin de période d’essai ?',
      reponse:
        'Non, et c’est une ligne rouge à ne pas franchir. La décision de valider ou non une période d’essai engage juridiquement l’entreprise, elle repose sur une appréciation humaine et contextuelle qui ne se délègue pas. L’assistant peut préparer des synthèses factuelles, il ne doit jamais formuler ou porter la décision elle-même.',
    },
    {
      _key: 'faq-2',
      question: 'L’IA doit-elle envoyer les feedbacks à la place du manager ?',
      reponse:
        'Non. Un feedback envoyé par un assistant IA n’a ni la même valeur ni le même impact qu’un feedback donné en face à face par le manager. L’IA peut rappeler au manager de programmer un feedback, elle ne doit pas s’y substituer. Le contenu du retour doit venir du manager, pas de l’outil.',
    },
    {
      _key: 'faq-3',
      question: 'Comment convaincre un manager sceptique face à l’introduction d’un assistant IA sur son équipe ?',
      reponse:
        'Deux leviers marchent. Premièrement, lui montrer le décompte réel des interruptions qu’il subit pendant les trois premières semaines d’une recrue, la plupart sont sidérés par le chiffre. Deuxièmement, lui expliquer que l’assistant absorbe uniquement les questions procédurales et laisse intact tout ce qui touche à la mission et au relationnel. La résistance managériale tombe presque toujours quand la frontière est claire.',
    },
    {
      _key: 'faq-4',
      question: 'Que faire si le manager préfère répondre lui-même à toutes les questions ?',
      reponse:
        'C’est une posture respectable mais insoutenable à long terme, surtout dans les équipes qui recrutent régulièrement. Le projet peut être différé le temps que le manager expérimente concrètement le poids des interruptions, ou peut être lancé avec un cadrage plus doux (assistant en support, pas en première ligne). Ce qu’il ne faut pas faire, c’est imposer l’outil contre la posture du manager.',
    },
    {
      _key: 'faq-5',
      question: 'Faut-il former les managers à l’usage de l’assistant IA ?',
      reponse:
        'Oui, mais pas pour qu’ils apprennent à l’utiliser. Pour qu’ils comprennent ce qu’ils gagnent à ce qu’il existe et ce qu’ils doivent continuer à faire personnellement. Cette clarification en amont est la meilleure garantie que l’assistant sera adopté par les managers comme un allié, pas subi comme une contrainte.',
    },
  ],

  sidebarCta: {
    titre: 'Protéger le rôle de vos managers ?',
    description: '30 minutes pour cadrer ce que l’assistant IA doit absorber et ce que vos managers doivent garder pour bien intégrer vos recrues.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Onboarding IA : ce que le manager gagne et ce qu’il ne doit pas perdre | maria',
    description:
      'Comment l’IA d’onboarding libère du temps managérial pour ce qui compte vraiment dans l’intégration d’un nouveau collaborateur. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
