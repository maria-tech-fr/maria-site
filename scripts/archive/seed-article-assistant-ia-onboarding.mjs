/**
 * Seed de l'article « Assistant IA d'onboarding : comment rendre un nouveau
 * collaborateur autonome rapidement »
 *
 * Auteur : Mathieu HERNANDEZ (Directeur produit) — `auteur-equipe-maria` en base.
 * Catégorie : Méthode & gouvernance.
 * Featured : false.
 *
 * Cross-links :
 *  - Vers /blog/knowledge-management-ia-organiser-savoir-avant-agent dans la
 *    Condition 1 (documentation d'accueil = prérequis, sujet traité en amont
 *    par l'article KM).
 *  - Le lien retour est à ajouter côté seed KM dans un chantier séparé si
 *    besoin (l'article KM restera pertinent tel quel).
 *
 * Sources cliquables (option B mixte) :
 *  - DARES 1er trim. 2026 : URL directe vers les données officielles → LIEN.
 *  - APEC : URL hub trop générique → mention en clair sans lien.
 *  - HeyTeam : URL blog générique → mention en clair sans lien.
 *
 * Choix éditoriaux :
 *  - inArticleCta yellow ajouté après le 2e CALLOUT À RETENIR de la section
 *    "Combien ça coûte" (moment budget / décision typique).
 *  - Le "[CTA]" final du brief est absorbé par sidebarCta (pattern maria :
 *    pas de bloc CTA en fin de body).
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-assistant-ia-onboarding.mjs
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
  _id: 'article-assistant-ia-onboarding-nouveau-collaborateur-autonome',
  _type: 'article',
  slug: { _type: 'slug', current: 'assistant-ia-onboarding-nouveau-collaborateur-autonome' },
  titre: 'Assistant IA d’onboarding : comment rendre un nouveau collaborateur autonome rapidement',
  sousTitre:
    'Un guide de cadrage pour concevoir un assistant IA qui accompagne vos recrues sans mobiliser vos équipes ni déshumaniser l’accueil.',
  intro:
    'En France, 27 % des embauches en CDI se terminent par une rupture de période d’essai. L’onboarding est un enjeu économique majeur, un assistant IA bien pensé peut changer la donne, sous conditions.',
  publishedAt: '2026-09-30T09:00:00.000Z',
  readingTime: 11,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-methode-gouvernance' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Selon la DARES (données 1er trimestre 2026), 265 600 fins de période d’essai ont été enregistrées en France pour 964 300 embauches en CDI, soit 27 % des embauches.',
    'Un onboarding raté coûte, selon les études françaises, entre 15 000 et 60 000 euros par salarié en tenant compte des coûts directs et indirects.',
    'Un assistant IA d’onboarding bien conçu s’attaque à un problème précis : la dépendance excessive du nouveau à la disponibilité de ses collègues pour comprendre « comment ça marche ici ».',
    'Sur les projets que nous accompagnons, comptez 6 à 10 semaines pour un assistant en production, selon le nombre de parcours métier et l’état de votre documentation d’accueil.',
    'Trois conditions non négociables : documentation d’accueil à jour, périmètre borné explicitement, articulation claire entre l’assistant et l’accompagnement humain.',
  ],

  body: [
    h2('Ce qui se joue vraiment sur les 90 premiers jours'),
    paragraph(
      'Les chiffres officiels publiés par la [DARES](https://dares.travail-emploi.gouv.fr/donnees/les-mouvements-de-main-doeuvre) début 2026 donnent une photographie précise du problème. Au 1er trimestre 2026, 265 600 fins de période d’essai ont été enregistrées en France métropolitaine, pour 964 300 embauches en CDI signées sur la même période. Autrement dit, l’équivalent de 27 % des embauches CDI se termine avant la fin de la période d’essai. Ce chiffre est en hausse de 29 % depuis 2019.',
    ),
    paragraph(
      'Ces départs ne sont pas tous liés à l’onboarding. Certains relèvent d’une inadéquation profil-poste qu’aucun accueil n’aurait rattrapée. Mais une étude HeyTeam menée sur 500 CDI en France montre que 60 % des salariés déclarent avoir vécu une intégration infructueuse, et que 40 % d’entre eux ont rompu leur période d’essai, 20 % ont envisagé de le faire. Le lien entre qualité de l’onboarding et rupture précoce est établi par toutes les études sérieuses françaises sur le sujet.',
    ),
    paragraph(
      'Économiquement, un onboarding raté coûte cher. Les estimations varient selon les sources et les postes concernés, mais convergent sur une fourchette : entre 15 000 et 60 000 euros par collaborateur pour un poste standard, jusqu’à 150 000 euros pour un poste cadre à responsabilité, en intégrant les coûts de recrutement (APEC : plus de 7 000 euros en moyenne), le salaire versé pendant la période partiellement productive, le temps équipe mobilisé, et le coût de re-recrutement.',
    ),
    paragraph(
      'Ce contexte donne tout son sens à la question qui se pose aujourd’hui : peut-on utiliser un assistant IA pour améliorer l’expérience d’onboarding, réduire les ruptures précoces, et rendre les nouveaux collaborateurs autonomes plus rapidement ? La réponse est oui, mais pas dans les conditions vendues par la plupart des éditeurs SaaS.',
    ),
    callout(
      'À retenir',
      'L’onboarding n’est pas un sujet RH sympa ou une préoccupation de marque employeur. C’est un chantier économique majeur, mesurable en euros. Un onboarding raté coûte, en France, entre 15 000 et 60 000 euros par collaborateur selon les études. Investir sérieusement dans l’accueil des recrues n’est pas un luxe, c’est un calcul rationnel.',
    ),

    h2('Qu’est-ce qu’un assistant IA d’onboarding, concrètement ?'),
    paragraph(
      'Le terme couvre plusieurs réalités techniques qu’il faut distinguer pour bien cadrer un projet.',
    ),
    definition(
      'Assistant IA d’onboarding',
      'Système conversationnel qui accompagne un nouveau collaborateur pendant sa période d’intégration, en répondant à ses questions logistiques et procédurales à partir de la documentation interne, et en le guidant dans les étapes clés de sa prise de poste. Il ne remplace pas l’accueil humain, il décharge les collègues des interruptions répétitives et rend la recrue autonome plus vite.',
    ),
    paragraph('Trois familles d’assistants coexistent sur le marché en 2026.'),
    paragraph(
      '**Les modules IA embarqués dans les plateformes RH.** Workelo, Lucca, HeyTeam et d’autres proposent des chatbots intégrés à leur suite de gestion des ressources humaines. Rapides à activer, adaptés aux processus RH standards, mais souvent limités à des scénarios prédéfinis et peu personnalisables sur les spécificités métier.',
    ),
    paragraph(
      '**Les chatbots RH génériques.** Des solutions comme Heeya ou Botpress permettent de construire des assistants sur mesure à partir de templates. Plus flexibles que les modules embarqués, mais nécessitent une intégration avec les outils internes existants (SharePoint, Notion, drives, etc.).',
    ),
    paragraph(
      '**Les assistants IA sur-mesure.** Développements dédiés qui combinent LLM, base documentaire interne structurée, intégration profonde avec l’écosystème de l’entreprise (Slack, Teams, intranet, SIRH). Ce sont les plus alignés avec les processus réels, mais aussi les plus exigeants en cadrage.',
    ),
    paragraph(
      'Le choix dépend de trois critères : la maturité documentaire de l’entreprise, la complexité des parcours d’onboarding par métier, et le niveau d’intégration souhaité avec l’écosystème existant.',
    ),

    h2('Que peut absorber un assistant IA (et que doit-il laisser à l’humain) ?'),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, une grille de discernement s’est stabilisée. Elle distingue ce qui se prête à l’automatisation de ce qui doit absolument rester porté par l’humain.',
    ),
    tableau({
      enTetes: ['Type de question ou situation', 'Peut être absorbée par l’IA ?', 'Pourquoi'],
      lignes: [
        ['Questions procédurales (accès, outils, congés, notes de frais)', 'Oui', 'Réponses documentées, factuelles, répétitives'],
        ['Orientation dans l’organisation (qui fait quoi)', 'Oui', 'Information cartographiable et à jour'],
        ['Rappels de parcours (formations obligatoires, entretiens)', 'Oui', 'Automatisation pertinente sur des étapes calendaires'],
        ['Accueil du premier jour, présentation de l’équipe', 'Non', 'Moment relationnel critique, symboliquement fort'],
        ['Retours sur les premières semaines, ressenti', 'Non', 'Nécessite l’écoute humaine, ne se textualise pas'],
        ['Cadrage de la mission, priorités, attentes', 'Non', 'Rôle managérial par nature, non délégable'],
        ['Décisions liées à la période d’essai', 'Non', 'Enjeu humain et juridique, jugement managérial'],
        ['Questions sensibles (relationnel, conflit, difficulté)', 'Non', 'Nécessite empathie, contexte, discrétion'],
      ],
    }),
    paragraph(
      'Cette grille n’est pas universelle. Elle donne une base de travail. Elle traduit surtout un principe : l’assistant IA doit alléger l’humain sur les questions à faible valeur relationnelle, pour qu’il puisse se concentrer sur les moments où sa présence fait vraiment la différence.',
    ),
    warning(
      'Point de vigilance',
      'Le piège classique consiste à vouloir automatiser l’ensemble du parcours, y compris les moments symboliques (accueil, tour de bureau, premier café). Ces moments sont précisément ceux qui ne coûtent pas grand-chose en temps mais qui structurent l’expérience de la recrue. Les automatiser détruit plus de valeur qu’ils n’en économisent.',
    ),

    h2('La méthode maria en 4 étapes pour concevoir un assistant IA d’onboarding'),
    paragraph(
      'Sur les projets d’assistant IA d’onboarding que nous cadrons, une méthode s’est stabilisée en quatre étapes. Elle permet d’arriver à un assistant utile en 6 à 10 semaines selon les contextes.',
    ),

    h3('Étape 1 : Cartographier les questions réelles des nouveaux arrivants (1 à 2 semaines)'),
    paragraph(
      'Avant tout choix technique, il faut savoir précisément ce que vos recrues demandent. Concrètement : entretiens avec 5 à 10 collaborateurs arrivés dans les 6 derniers mois, entretiens avec les référents onboarding actuels, analyse des tickets support IT et RH sur les 3 premiers mois d’ancienneté.',
    ),
    paragraph(
      'Cette étape produit la matière première du projet : une liste ordonnée des motifs de question, avec leur fréquence et leur criticité. Sans cette cartographie, l’assistant est calibré sur des hypothèses, pas sur la réalité.',
    ),

    h3('Étape 2 : Auditer et consolider la documentation d’accueil (2 à 4 semaines)'),
    paragraph(
      'C’est l’étape que la plupart des projets sous-estiment. Un assistant IA n’invente pas ses réponses. Il s’appuie sur ce que vous lui donnez à lire. Si votre documentation d’accueil est éclatée entre Drive, SharePoint, Notion et emails de bienvenue, si elle n’a pas été mise à jour depuis 18 mois, si elle est contradictoire d’un service à l’autre, l’assistant produira des réponses incohérentes.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons, cette phase de consolidation représente en moyenne 40 à 60 % du temps de cadrage total. Elle produit un livrable de valeur bien au-delà du projet IA : une base documentaire propre qui sert à tous, IA ou non.',
    ),

    h3('Étape 3 : Concevoir le parcours et les points de bascule humaine (2 à 3 semaines)'),
    paragraph(
      'Un bon assistant d’onboarding n’est pas un chatbot passif qui attend qu’on l’interroge. C’est un compagnon actif qui propose les bonnes ressources au bon moment : lancement des formations obligatoires en semaine 1, rappel de l’entretien à 30 jours, check-in sur les accès en semaine 2.',
    ),
    paragraph(
      'Cette étape définit également les points de bascule vers l’humain : quelles questions doivent systématiquement remonter au manager ? Au référent RH ? Au parrain ? Ces règles doivent être posées explicitement, pas laissées à l’appréciation de l’assistant.',
    ),

    h3('Étape 4 : Pilote sur les prochaines arrivées (3 à 4 semaines)'),
    paragraph(
      'Le pilote couvre les 2 à 5 prochaines recrues sur un ou deux parcours métier, avec un suivi rapproché. Indicateurs à mesurer : taux d’utilisation de l’assistant, taux de réponses jugées utiles, temps d’autonomisation ressenti, satisfaction des nouveaux, temps équipe libéré côté référents.',
    ),
    paragraph(
      'L’objectif n’est pas de démontrer que « l’IA marche » en général. C’est de valider que **sur vos parcours, avec votre documentation, avec vos recrues, l’assistant produit des résultats mesurables**.',
    ),
    avisMaria({
      texte:
        'La mode pousse à voir l’assistant IA d’onboarding comme un outil marketing RH sympa, à greffer sur une plateforme existante. Notre conviction est inverse. Un assistant d’onboarding est un projet économique majeur, qui se juge sur des indicateurs concrets : temps d’autonomisation, taux de rupture précoce, temps équipe libéré. Ces résultats se construisent par la méthode, pas par l’outil.',
      signature: 'Mathieu HERNANDEZ',
    }),

    h2('Combien ça coûte ? Les 3 paliers de solution'),
    paragraph(
      'Le marché des assistants IA d’onboarding est structuré en trois grandes catégories. Voici les fourchettes que nous constatons sur nos projets.',
    ),

    h3('Palier 1 : Module IA embarqué dans une plateforme RH (200 à 800 euros par mois)'),
    paragraph(
      'Solutions type Workelo, HeyTeam, Lucca. L’assistant est un composant additionnel à un abonnement SIRH existant. Adapté aux entreprises qui utilisent déjà ces plateformes et dont les parcours d’onboarding sont standards.',
    ),
    paragraph(
      '**Ce qu’on obtient** : mise en place rapide (2 à 4 semaines), intégration native avec le SIRH, parcours prédéfinis.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : personnalisation fine des réponses métier, intégration profonde avec les autres outils internes, maîtrise complète du comportement.',
    ),
    paragraph(
      '**Coût annuel typique** : d’après notre pratique, 5 000 à 15 000 euros tout compris pour une PME de 30 à 80 personnes.',
    ),

    h3('Palier 2 : Chatbot RH semi-personnalisé (5 000 à 20 000 euros de setup + coût d’usage)'),
    paragraph(
      'Solutions type Heeya, Botpress configurés par un intégrateur. Personnalisation possible sur les parcours métier, les règles de bascule, la charte conversationnelle.',
    ),
    paragraph(
      '**Ce qu’on obtient** : adaptation aux parcours métier spécifiques, intégration avec Slack ou Teams, contrôle sur les réponses.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : intégration profonde avec les systèmes internes complexes (SIRH sur mesure, bases documentaires propriétaires).',
    ),
    paragraph(
      '**Coût annuel typique** : d’après notre pratique, 15 000 à 35 000 euros tout compris.',
    ),

    h3('Palier 3 : Assistant sur-mesure (20 000 à 60 000 euros de développement + exploitation)'),
    paragraph(
      'Développement dédié combinant LLM, base documentaire structurée, intégration profonde avec l’écosystème de l’entreprise. C’est le palier recommandé quand les parcours d’onboarding sont très différenciés par métier, quand la documentation existante est complexe, ou quand l’assistant doit s’intégrer à des outils internes sur mesure.',
    ),
    paragraph(
      '**Ce qu’on obtient** : maîtrise complète du comportement, adaptation fine aux parcours métier, capacité d’évolution sans dépendance à un éditeur.',
    ),
    paragraph(
      '**Ce qu’on n’obtient pas** : la simplicité d’un déploiement clé en main. Ce palier suppose une équipe interne engagée sur la durée.',
    ),
    paragraph(
      '**Coût annuel typique** : d’après notre pratique, 40 000 à 100 000 euros tout compris pour une entreprise de taille intermédiaire, incluant développement initial, exploitation et accompagnement.',
    ),
    callout(
      'À retenir',
      'Le coût ne se réduit jamais à la licence ou au développement initial. Comptez 30 à 40 % de budget en accompagnement au changement, structuration documentaire, formation des managers et référents. C’est ce budget invisible qui fait la différence entre un assistant qui tourne et un assistant qui apporte de la valeur.',
    ),
    inArticleCta({
      titre: 'Cadrer votre projet d’assistant IA d’onboarding',
      description:
        '30 minutes pour poser le bon palier, estimer le budget réel et prioriser la consolidation documentaire qui conditionne le résultat.',
      lienLibelle: 'Voir comment maria cadre ce type de projet →',
      lienHref: '/besoins/faciliter-onboarding',
      variant: 'yellow',
    }),

    h2('Combien de temps pour être opérationnel ?'),
    paragraph(
      'Les délais annoncés par les éditeurs sont souvent optimistes parce qu’ils supposent que la documentation d’accueil est déjà prête et propre. Ce qui est rarement le cas.',
    ),
    paragraph(
      '**Module IA embarqué** : 2 à 4 semaines pour un premier déploiement, à condition que la documentation soit déjà bien tenue. Si elle ne l’est pas, ajoutez 4 à 6 semaines de préparation documentaire.',
    ),
    paragraph(
      '**Chatbot semi-personnalisé** : 6 à 10 semaines pour un pilote en production, 3 à 5 mois pour une généralisation à tous les parcours métier.',
    ),
    paragraph(
      '**Assistant sur-mesure** : 10 à 16 semaines pour la première version productive, avec une montée en périmètre progressive sur 6 à 12 mois.',
    ),
    paragraph(
      'Ces délais supposent trois conditions : un sponsor identifié côté direction (RH ou direction générale selon la taille), une personne dédiée côté RH pour le cadrage et le pilotage, une équipe technique disponible pour les intégrations.',
    ),

    h2('Les 3 conditions non négociables pour que ça marche'),
    paragraph(
      'Sur les projets qui échouent, les mêmes causes reviennent. Trois conditions doivent être réunies dès le départ.',
    ),
    paragraph(
      '**Condition 1 : Une documentation d’accueil à jour, structurée, validée.** Un assistant IA d’onboarding n’est pas meilleur que la documentation sur laquelle il s’appuie. Si vos procédures d’accueil, votre organigramme, vos processus internes sont dispersés, contradictoires ou obsolètes, aucun assistant ne compensera. La consolidation documentaire est le prérequis, pas une option, c’est le sujet traité en profondeur dans notre article [Knowledge management et IA : organiser votre savoir avant de déployer un agent](/blog/knowledge-management-ia-organiser-savoir-avant-agent).',
    ),
    paragraph(
      '**Condition 2 : Un périmètre borné explicitement.** L’assistant traite les questions procédurales, logistiques et organisationnelles. Il transfère systématiquement les questions sensibles, relationnelles ou managériales à l’humain. Cette frontière doit être claire pour le nouveau (il sait ce qu’il peut demander et ce qui relève de son manager) et pour l’assistant (règles de bascule paramétrées).',
    ),
    paragraph(
      '**Condition 3 : Une articulation claire avec l’accompagnement humain.** L’assistant IA ne supprime pas les rituels d’onboarding humains, il les recentre sur ce qui compte : accueil du premier jour, présentation de l’équipe, cadrage de mission avec le manager, entretiens à 30, 60, 90 jours. Ces moments doivent être maintenus, voire renforcés, en profitant du temps libéré par l’assistant.',
    ),
    quoteAttribuee({
      texte:
        'Les projets d’assistant d’onboarding qui produisent vraiment de la valeur ne sont pas ceux qui automatisent le plus. Ce sont ceux où l’entreprise a compris que l’IA doit décharger l’humain des questions logistiques pour lui permettre d’être vraiment présent sur les moments qui comptent. C’est un rééquilibrage, pas un remplacement.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer si vous êtes convaincu'),
    paragraph(
      'Voici l’ordre d’action que nous recommandons pour amorcer proprement.',
    ),
    paragraph(
      '**Semaine 1** : interviewer 5 collaborateurs arrivés dans les 6 derniers mois. Écouter leurs vraies frustrations d’onboarding, sans les orienter. Ces entretiens révèlent presque toujours des points aveugles insoupçonnés.',
    ),
    paragraph(
      '**Semaine 2** : auditer l’état de votre documentation d’accueil. Existe-t-elle ? Est-elle à jour ? Est-elle accessible sans droits particuliers ? Est-elle cohérente entre services ? Cette étape révèle souvent que le vrai chantier n’est pas l’IA, c’est la documentation.',
    ),
    paragraph(
      '**Semaine 3** : identifier le sponsor du projet côté RH ou direction. Sans porteur engagé, aucun projet d’onboarding ne tient. Cette personne doit avoir l’autorité pour trancher les désaccords internes sur les procédures.',
    ),
    paragraph(
      '**Semaine 4** : consulter deux ou trois prestataires ou éditeurs sur votre cadrage. Comparer non pas sur le prix affiché, mais sur leur capacité à parler juste du sujet documentation et sur la clarté des points de bascule humaine. Un prestataire qui vend l’outil sans creuser ces deux points passe à côté de l’essentiel.',
    ),
    paragraph(
      'À l’issue de ces quatre semaines, vous aurez soit décidé de démarrer un projet, soit compris ce qu’il vous faut préparer d’abord.',
    ),

    h2('En résumé'),
    paragraph(
      'L’onboarding est un chantier économique majeur en France, avec 27 % des embauches CDI qui se terminent en rupture de période d’essai et un coût par onboarding raté qui va de 15 000 à 60 000 euros selon les études. Un assistant IA bien conçu s’attaque à une part précise du problème : la dépendance excessive du nouveau à la disponibilité de ses collègues pour comprendre « comment ça marche ici ». La méthode qui fonctionne repose sur quatre étapes : cartographier les questions réelles, consolider la documentation d’accueil, concevoir les parcours et points de bascule, piloter sur les prochaines arrivées. Les budgets vont de 5 000 à 100 000 euros par an selon le palier. Les délais réalistes vont de 6 à 16 semaines. Le vrai facteur de réussite n’est pas l’outil choisi, c’est la qualité de la documentation et la clarté de la frontière entre ce que l’assistant traite et ce que l’humain garde.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Un assistant IA d’onboarding remplace-t-il le référent humain d’accueil ?',
      reponse:
        'Non. Il le décharge des questions logistiques et répétitives, mais ne remplace ni le rôle du manager, ni celui du parrain (mentor), ni les moments symboliques comme l’accueil du premier jour. Le référent humain reste indispensable pour tout ce qui touche au relationnel, au sens, à la culture d’entreprise.',
    },
    {
      _key: 'faq-2',
      question: 'Faut-il informer les nouveaux collaborateurs qu’ils interagissent avec une IA ?',
      reponse:
        'Oui, obligatoirement. Le RGPD impose la transparence sur l’usage d’un système automatisé. Cette transparence n’est pas un frein : sur les projets bien menés, elle renforce même la confiance, à condition d’être accompagnée d’une possibilité claire de basculer vers un humain à tout moment.',
    },
    {
      _key: 'faq-3',
      question: 'Combien de temps avant d’observer un vrai gain sur le temps équipe ?',
      reponse:
        'Sur un projet bien cadré, les premiers effets sont visibles dès l’arrivée des premières recrues accompagnées par l’assistant, soit 6 à 10 semaines après le lancement. Un impact mesurable sur les indicateurs RH (rupture de période d’essai, satisfaction, temps d’autonomisation) demande 6 à 12 mois pour être significatif statistiquement.',
    },
    {
      _key: 'faq-4',
      question: 'Peut-on démarrer sans équipe technique interne ?',
      reponse:
        'Oui, sur les paliers 1 (module embarqué) et 2 (chatbot semi-personnalisé). Sur le palier 3 (sur-mesure), la présence d’une compétence technique interne est recommandée, ou à défaut un partenaire qui prend la responsabilité de l’infrastructure sur la durée.',
    },
    {
      _key: 'faq-5',
      question: 'Est-ce adapté à une PME de moins de 50 personnes ?',
      reponse:
        'Oui, à condition d’être réaliste sur le retour attendu. Une PME qui recrute 5 personnes par an ne rentabilisera pas un assistant sur-mesure. En revanche, un module embarqué dans une plateforme RH ou un chatbot semi-personnalisé peut être pertinent dès que la fréquence d’arrivées atteint une dizaine par an.',
    },
  ],

  sidebarCta: {
    titre: 'Concevoir votre assistant IA d’onboarding ?',
    description: '30 minutes pour poser le cadrage, le bon palier de solution et la préparation documentaire adaptée à vos parcours.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Assistant IA d’onboarding : rendre vos recrues autonomes | maria',
    description:
      'Comment concevoir un assistant IA d’onboarding utile, sans déshumaniser l’accueil. Méthode, chiffres, budget et pièges à éviter. Un guide maria.',
  },
}

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
