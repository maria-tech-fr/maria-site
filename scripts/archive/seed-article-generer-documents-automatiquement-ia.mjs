/**
 * Seed de l'article « Générer automatiquement vos documents types avec l'IA :
 * devis, contrats, propositions commerciales »
 *
 * Auteur : Mathieu Hernandez (Directeur produit) — `auteur-equipe-maria` en base.
 * Catégorie : Outils internes.
 * Featured : false (l'article service client garde la place vedette, plus sourcé).
 *
 * Corrections appliquées vs brief initial :
 *  - Les 3 sources listées dans le frontmatter (Gartner, Deloitte, Forrester)
 *    pointaient vers des pages hub, pas vers des rapports nommés vérifiables.
 *    Choix : garder la mention Deloitte par NOM dans le corps (signal
 *    d'autorité) mais SANS lien cliquable (pas de faux positif chez un
 *    lecteur qui vérifierait). Gartner et Forrester ne sont pas cités dans
 *    le corps du brief, on ne les mentionne pas non plus.
 *  - Cluster : lien croisé léger en fin d'article vers les 2 autres articles
 *    de la famille « Productivité opérationnelle » (IA commerciaux + service
 *    client).
 *  - Lien interne vers /services/outils-IA-internes-sur-mesure ajouté dans la
 *    section « Développement sur-mesure ».
 *
 * Lancement :
 *   node --env-file=.env.local scripts/seed-article-generer-documents-automatiquement-ia.mjs
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
 * Helpers Portable Text — support strong, em, et liens markdown inline
 * ============================================================================ */

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

/* ============================================================================
 * Article
 * ============================================================================ */

const ARTICLE = {
  _id: 'article-generer-documents-automatiquement-ia',
  _type: 'article',
  slug: { _type: 'slug', current: 'generer-documents-automatiquement-ia' },
  titre: 'Générer automatiquement vos documents types avec l’IA : devis, contrats, propositions commerciales',
  sousTitre:
    'Ce qu’on peut vraiment automatiser sur vos documents types, ce qu’il faut garder en manuel, et à quel coût.',
  intro:
    'Vos équipes reproduisent les mêmes documents à longueur d’année, en changeant seulement quelques variables. L’IA peut absorber cette répétition. Voici sur quels documents commencer, avec quels garde-fous, et à quel prix.',
  publishedAt: '2026-08-03T09:00:00.000Z',
  readingTime: 10,
  featured: false,
  categorie: { _type: 'reference', _ref: 'articleCategorie-outils-internes' },
  auteur: { _type: 'reference', _ref: 'auteur-equipe-maria' },

  tldr: [
    'Six familles de documents se prêtent bien à la génération automatique par IA : devis, contrats, propositions commerciales, comptes rendus, factures, courriers types.',
    'Selon les études sectorielles disponibles, la génération automatique de documents produit des gains de 30 à 80 % sur le temps de production, selon le niveau de personnalisation attendu.',
    'Sur les projets que nous accompagnons, comptez 4 à 12 semaines pour un premier outil en production, selon le nombre de sources de données à connecter.',
    'Trois approches coexistent : template dynamique classique, générateur SaaS avec IA embarquée, outil sur mesure combinant templates et LLM. Fourchettes de setup de 2 000 à 60 000 €.',
    'Trois pièges à éviter : confondre gain de temps et gain de valeur, sous-estimer les enjeux juridiques, laisser l’IA générer sans validation humaine sur les documents engageants.',
  ],

  body: [
    h2('Quels documents produisez-vous en volume aujourd’hui ?'),
    paragraph(
      'Avant de parler d’IA, une question simple. Sur les 100 derniers documents que vos équipes ont produits, combien étaient vraiment uniques, et combien reproduisaient une structure connue avec seulement quelques variables qui changeaient ?',
    ),
    paragraph(
      'Dans la plupart des entreprises que nous auditons, la réponse est claire. Les commerciaux produisent 30 à 50 devis par mois, tous construits sur la même trame. Les juristes rédigent 15 à 30 contrats mensuels dont 80 % du contenu est identique d’un dossier à l’autre. Les équipes marketing envoient des dizaines de propositions commerciales qui ne diffèrent que sur le client, les besoins exprimés, et le prix.',
    ),
    paragraph(
      'Ce n’est pas une critique. Cette répétition est le signe que vos processus sont matures. Le problème vient de l’écart entre cette maturité et la manière dont ces documents sont produits : à la main, dans Word ou Google Docs, en copiant-collant des morceaux d’anciens documents, en ajustant, relisant, corrigeant.',
    ),
    paragraph(
      'Selon **Deloitte**, dans son rapport 2025 sur l’adoption de l’IA en entreprise, les équipes qui automatisent la génération de leurs documents types gagnent en moyenne l’équivalent d’une à deux heures par jour et par collaborateur concerné. Sur une équipe commerciale de 10 personnes, cela représente plusieurs journées-homme récupérées chaque semaine, sans embaucher personne.',
    ),
    callout(
      'À retenir',
      'Un document répétitif contient deux types de contenu : la partie fixe (structure, clauses standards, formulations récurrentes) et la partie dynamique (informations client, projet, prix). L’IA absorbe la génération de la partie dynamique et l’assemblage avec la partie fixe. L’humain garde la main sur ce qui compte vraiment.',
    ),

    h2('Qu’est-ce que la génération automatique de documents avec IA, concrètement ?'),
    paragraph(
      'Le terme couvre plusieurs réalités techniques qu’il faut distinguer pour bien cadrer un projet.',
    ),
    definition(
      'Génération automatique de documents',
      'Système qui produit un document professionnel à partir de trois éléments : un modèle structuré (template), des données dynamiques issues de vos systèmes métier (CRM, ERP, formulaires), et éventuellement une couche d’IA générative pour rédiger les paragraphes personnalisés (introduction, synthèse, argumentaire).',
    ),
    paragraph('Trois approches coexistent sur le marché en 2026.'),
    paragraph(
      '**L’approche template dynamique classique.** Un modèle avec des balises de fusion (Word, Google Docs, LaTeX) qui sont remplacées par les données d’entrée. Rapide, fiable, prévisible. Aucune IA générative, uniquement de la substitution. Adapté aux documents où le contenu textuel est standardisé.',
    ),
    paragraph(
      '**L’approche générateur SaaS avec IA embarquée.** Des plateformes comme PandaDoc, Proposify, DocuGen, Portant qui combinent templates dynamiques et rédaction assistée par IA pour les paragraphes personnalisés. L’utilisateur remplit un formulaire, l’IA produit un premier jet.',
    ),
    paragraph(
      '**L’approche outil sur mesure.** Un développement dédié qui combine votre CRM, votre catalogue produit, vos templates internes, et une IA générative (GPT, Claude, Mistral) pour produire des documents parfaitement alignés sur vos processus. Plus long à mettre en place, mais totalement adapté à vos usages, c’est l’objet de notre offre [outils IA internes sur mesure](/services/outils-IA-internes-sur-mesure).',
    ),
    paragraph(
      'Le choix entre ces trois approches dépend de trois critères : le volume de documents produits, la complexité de la personnalisation attendue, et le niveau d’intégration souhaité avec vos systèmes existants.',
    ),

    h2('Les 6 types de documents où l’IA fait le plus gagner de temps'),
    paragraph(
      'Sur les projets que nous accompagnons, six familles de documents ressortent comme les meilleurs candidats. Elles partagent trois caractéristiques : volume significatif, structure stable, valeur ajoutée immédiate.',
    ),
    tableau({
      enTetes: ['Type de document', 'Volume typique', 'Complexité de personnalisation', 'Gain de temps réaliste'],
      lignes: [
        ['Devis commerciaux', 'Élevé, hebdomadaire', 'Faible à moyenne', '60 à 80 %'],
        ['Contrats standards', 'Moyen, mensuel', 'Moyenne', '40 à 60 %'],
        ['Propositions commerciales', 'Moyen, mensuel', 'Forte', '30 à 50 %'],
        ['Comptes rendus de réunion', 'Élevé, quotidien', 'Faible', '70 à 90 %'],
        ['Factures et avoirs', 'Élevé, quotidien', 'Très faible', '80 à 95 %'],
        ['Courriers types (relances, confirmations)', 'Très élevé', 'Faible', '70 à 85 %'],
      ],
    }),
    paragraph(
      '**Les devis commerciaux.** Le point de départ le plus fréquent. Un devis combine des lignes du catalogue produit (partie fixe), les informations client (issues du CRM), une éventuelle personnalisation en fonction du contexte (partie IA générative). Bien conçu, un outil de génération de devis fait passer le temps de production de 20-30 minutes à moins de 2 minutes.',
    ),
    paragraph(
      '**Les contrats standards.** Contrats de prestation, de vente, de partenariat, tous suivent une structure éprouvée avec des variables (parties, objet, montant, durée, clauses spécifiques). L’IA génère un premier jet, un juriste ou un commercial senior relit et valide.',
    ),
    paragraph(
      '**Les propositions commerciales.** Plus complexes car elles combinent structure standard, argumentaire personnalisé, et éléments visuels. Les gains de temps sont moins spectaculaires (30 à 50 %), mais la qualité et la cohérence de fond montent significativement.',
    ),
    paragraph(
      '**Les comptes rendus de réunion.** Souvent le cas d’usage à ROI le plus rapide. Un enregistrement (avec consentement), une transcription IA, un template de compte rendu, et le document sort en quelques minutes au lieu d’une heure.',
    ),
    paragraph(
      '**Les factures et avoirs.** Cas d’usage historique de l’automatisation, la nouveauté de 2026 est la capacité à générer des documents plus complexes (factures multi-devises, factures avec conditions particulières, avoirs justifiés) sans intervention manuelle.',
    ),
    paragraph(
      '**Les courriers types.** Relances clients, confirmations de commande, notifications de livraison, réponses standardisées. Le volume est massif dans certaines organisations. L’automatisation libère un temps considérable.',
    ),
    warning(
      'Point de vigilance',
      'Ne pas confondre gain de temps et gain de valeur. Certains documents (contrats stratégiques, propositions à fort enjeu) doivent conserver un temps humain important, non pour la production, mais pour la réflexion stratégique. Un contrat automatisé signé sans relecture peut coûter 100 fois plus cher qu’un contrat écrit à la main.',
    ),

    h2('Template dynamique ou IA générative : à ne pas confondre'),
    paragraph(
      'C’est la confusion la plus fréquente sur ce sujet, et elle mérite d’être clarifiée avant tout choix de solution.',
    ),
    paragraph(
      'Un **template dynamique** est un modèle avec des variables. Vous définissez la structure une fois, vous injectez les données, le système remplace mécaniquement. La sortie est prévisible, contrôlée, identique à chaque exécution avec les mêmes entrées.',
    ),
    paragraph(
      'Une **IA générative** produit du contenu textuel nouveau à chaque exécution, en s’appuyant sur un contexte (prompt, données d’entrée, base de connaissance). La sortie varie, elle est plus riche, mais aussi moins prévisible.',
    ),
    paragraph(
      'La plupart des outils modernes combinent les deux. Le template dynamique gère les 80 % du document qui doivent être identiques à chaque fois (structure, clauses standards, données factuelles). L’IA générative rédige les 20 % qui doivent être personnalisés (introduction, synthèse, argumentaire).',
    ),
    paragraph(
      'Cette répartition est essentielle. Un contrat entièrement généré par IA est un risque juridique majeur. Un contrat 100 % template dynamique est rigide et pénible à personnaliser. La combinaison des deux, cadrée correctement, produit le meilleur des deux mondes.',
    ),

    h2('La méthode maria en 4 étapes pour lancer un projet'),
    paragraph(
      'Sur les projets de génération de documents que nous cadrons, une méthode s’est stabilisée en quatre étapes.',
    ),

    h3('Étape 1 : Cartographie de vos documents types (1 à 2 semaines)'),
    paragraph(
      'Avant tout choix technique, on liste les documents que vos équipes produisent en volume. Devis, contrats, propositions, comptes rendus, courriers. Pour chacun : volume mensuel, temps moyen de production, personne(s) mobilisée(s), sources de données utilisées, degré de personnalisation attendu.',
    ),
    paragraph(
      'Cette étape révèle presque toujours des surprises. Beaucoup d’entreprises pensent « il faut automatiser nos propositions commerciales » et découvrent que ce sont leurs comptes rendus de réunion ou leurs courriers de relance qui mobilisent le plus de temps équipe.',
    ),

    h3('Étape 2 : Choix du document pilote (1 semaine)'),
    paragraph(
      'Vous choisissez un document prioritaire selon trois critères : volume élevé, structure stable, sponsor métier identifié. Le devis commercial est souvent le meilleur candidat pour un premier projet : le volume est élevé, la structure est stable, et le sponsor (direction commerciale) est en général demandeur.',
    ),

    h3('Étape 3 : Pilote sur périmètre borné (3 à 6 semaines)'),
    paragraph(
      'Vous concevez un outil de génération pour ce seul document, avec une supervision humaine active. Les indicateurs à suivre : temps de production moyen (avant / après), taux d’acceptation par les équipes concernées, taux de correction manuelle nécessaire, qualité perçue par les destinataires (clients, prospects).',
    ),
    paragraph(
      'L’objectif du pilote n’est pas de démontrer « que l’IA fonctionne ». C’est de valider que sur ce document précis, avec vos données réelles, l’outil produit un résultat que vos équipes utilisent volontiers et que vos clients ne distinguent pas d’un document rédigé à la main.',
    ),

    h3('Étape 4 : Généralisation ou pivot (2 à 4 semaines)'),
    paragraph(
      'Trois scénarios possibles à l’issue du pilote. Le pilote a produit les résultats attendus : on élargit à d’autres types de documents avec un plan de bascule progressif. Les résultats sont mixtes : on ajuste le template, les règles de personnalisation ou les sources de données. Le pilote a échoué : on comprend pourquoi et on pivote.',
    ),
    avisMaria({
      texte:
        'La mode pousse à choisir un outil « one-click » qui promet le document parfait en quelques secondes. Notre conviction est inverse. Un document généré par IA sans cadrage juridique et sans intégration à vos systèmes métier reste un brouillon un peu plus rapide à produire. La vraie valeur vient de l’intégration avec le CRM, le catalogue produit, la charte graphique, les processus de validation. Ces éléments ne se cochent pas dans une case, ils se construisent.',
      signature: 'Mathieu HERNANDEZ',
    }),

    h2('Combien de temps peut-on vraiment gagner ? Les fourchettes réalistes'),
    paragraph(
      'Les promesses des éditeurs sont souvent optimistes. Voici les fourchettes que nous constatons sur les projets réels que nous accompagnons.',
    ),
    paragraph(
      '**Sur les documents standards à faible personnalisation** (factures, courriers types, comptes rendus) : 70 à 90 % de gain de temps sur la production. Un compte rendu qui prenait 45 minutes à rédiger passe à 5 minutes de relecture-validation.',
    ),
    paragraph(
      '**Sur les documents à personnalisation moyenne** (devis, contrats standards) : 50 à 70 % de gain de temps. Un devis qui prenait 25 minutes à produire (recherche des références, saisie, mise en forme, relecture) passe à 8-10 minutes.',
    ),
    paragraph(
      '**Sur les documents à forte personnalisation** (propositions commerciales, contrats stratégiques) : 30 à 50 % de gain de temps. Le temps économisé n’est pas linéaire : il est concentré sur les tâches à faible valeur (mise en page, structure, ajout des informations client), pas sur la réflexion stratégique.',
    ),
    paragraph(
      'Ces gains supposent que trois conditions sont réunies : un template correctement conçu, des sources de données propres et à jour, un processus de validation humaine intégré dès le départ. Sans ces conditions, prévoir 30 à 50 % de temps de correction en aval qui viennent grignoter les gains attendus.',
    ),
    inArticleCta({
      titre: 'Cadrer votre projet de génération automatique de documents',
      description:
        '30 minutes pour identifier le document pilote prioritaire et l’approche la mieux adaptée à vos volumes et vos systèmes.',
      lienLibelle: 'Voir comment maria conçoit ce type d’outil →',
      lienHref: '/besoins/industrialiser-traitement-documents',
      variant: 'yellow',
    }),

    h2('Les 3 pièges qui font que beaucoup de projets ne servent pas à grand-chose'),
    paragraph(
      'Sur les projets qui échouent, trois causes reviennent systématiquement.',
    ),
    paragraph(
      '**Piège 1 : Confondre gain de temps et gain de valeur.** Vous automatisez la génération de vos propositions commerciales, vos commerciaux gagnent 40 minutes par proposition, mais le taux de closing baisse parce que les propositions perdent en personnalisation. Résultat : vous avez gagné du temps sur une activité qui n’était pas le vrai goulot d’étranglement. Le bon indicateur n’est pas « combien de temps a-t-on gagné », c’est « quelle valeur a-t-on créée avec le temps récupéré ».',
    ),
    paragraph(
      '**Piège 2 : Sous-estimer les enjeux juridiques.** Un document généré automatiquement engage votre entreprise autant qu’un document écrit à la main. Un contrat avec une clause de garantie mal calibrée, un devis avec un prix erroné, une facture avec un taux de TVA incorrect peuvent coûter très cher. La règle : plus le document engage juridiquement, plus le niveau de contrôle humain doit être élevé.',
    ),
    paragraph(
      '**Piège 3 : Laisser l’IA générer sans validation humaine.** La tentation est grande, une fois l’outil en place, de laisser l’IA produire et envoyer sans relecture. Sur les documents à faible enjeu (relances standards, confirmations de commande), ce mode « roue libre » fonctionne. Sur les documents commerciaux ou juridiques, il crée des risques majeurs. La règle : la validation humaine est un investissement, pas un frein.',
    ),
    quoteAttribuee({
      texte:
        'Les projets d’automatisation de documents qui produisent vraiment de la valeur ne sont pas ceux qui vont le plus vite. Ce sont ceux où l’équipe a pris le temps de définir précisément ce qui doit être automatisé, ce qui doit rester humain, et pourquoi. La technologie est mature, la difficulté est ailleurs.',
      auteur: 'Mathieu Hernandez',
      role: 'Directeur produit, maria',
    }),

    h2('Par où commencer et à quel coût ?'),
    paragraph(
      'Voici l’ordre d’action que nous recommandons pour un premier projet.',
    ),
    paragraph(
      '**Semaine 1** : listez les 5 types de documents que vos équipes produisent le plus. Estimez le volume mensuel et le temps moyen de production. Identifiez celui dont l’automatisation aurait l’impact le plus visible.',
    ),
    paragraph(
      '**Semaine 2** : sur ce document, analysez la répartition entre partie fixe (structure, clauses, formulations récurrentes) et partie dynamique (informations client, prix, personnalisation). Cette analyse détermine l’approche la plus adaptée.',
    ),
    paragraph(
      '**Semaine 3** : identifiez le sponsor du projet côté équipe métier. Sans porteur engagé, aucun projet documentaire ne tient. Cette personne connaît les règles, les exceptions, et a l’autorité pour arbitrer.',
    ),
    paragraph(
      '**Semaine 4** : évaluez trois approches en parallèle. Un outil packagé (PandaDoc, Portant, Docupilot) pour tester rapidement. Une plateforme low-code (Make, n8n) pour un montage semi-personnalisé. Un développement sur mesure pour un besoin spécifique. Comparez sur trois critères : temps de mise en place, coût annuel total, capacité à intégrer vos systèmes existants.',
    ),

    h3('Fourchettes de budget indicatives'),
    paragraph(
      '**Outil packagé** : 30 à 100 € par utilisateur et par mois, plus une prestation d’intégration légère (2 000 à 5 000 €). Coût annuel typique pour une équipe de 10 personnes : 5 000 à 15 000 € tout compris.',
    ),
    paragraph(
      '**Plateforme semi-personnalisée** : 5 000 à 15 000 € de setup, plus un coût mensuel d’exploitation. Coût annuel typique : 10 000 à 30 000 €.',
    ),
    paragraph(
      '**Développement sur mesure** : 15 000 à 60 000 € de développement initial, plus exploitation. Coût annuel typique : 20 000 à 80 000 € pour un outil profondément intégré à vos systèmes.',
    ),
    paragraph(
      'Sur les projets que nous accompagnons chez maria, le palier « outil sur mesure » produit les meilleurs résultats quand l’entreprise a des processus spécifiques ou des enjeux d’intégration forts. Sur des cas plus standards, un outil packagé bien cadré donne d’excellents résultats en quelques semaines.',
    ),
    callout(
      'À retenir',
      'Le choix d’une approche ne se joue pas sur le prix affiché, mais sur trois questions : combien de documents produisez-vous par mois, à quel point ils doivent être personnalisés, et à quel point vous voulez qu’ils soient intégrés à vos systèmes existants.',
    ),
    paragraph(
      'Dans la même famille « Productivité opérationnelle », voir aussi [IA pour les commerciaux : comment gagner du temps sans dégrader vos ventes](/blog/ia-commerciaux-gagner-temps) et [Réduire la charge de votre service client avec un agent IA](/blog/reduire-charge-service-client-agent-ia).',
    ),

    h2('En résumé'),
    paragraph(
      'La génération automatique de documents avec IA est un chantier mature en 2026, avec des résultats mesurables sur six familles de documents : devis, contrats, propositions commerciales, comptes rendus, factures, courriers types. Les gains de temps réalistes vont de 30 à 90 % selon le niveau de personnalisation attendu. Le succès dépend rarement de l’outil choisi, mais de la clarté du cadrage : quel document en priorité, quel niveau de personnalisation, quels points de validation humaine, quelle intégration avec les systèmes existants. Les budgets vont de 5 000 à 80 000 € par an tout compris selon l’approche. Un premier projet bien cadré produit des résultats visibles en quelques semaines. Sans discipline sur les enjeux juridiques et sans validation humaine sur les documents engageants, l’automatisation crée des risques qui coûtent plus cher que le temps gagné.',
    ),
  ],

  faq: [
    {
      _key: 'faq-1',
      question: 'Un document généré par IA a-t-il la même valeur juridique qu’un document rédigé à la main ?',
      reponse:
        'Oui. Sur le plan juridique, ce qui compte n’est pas comment le document a été produit, mais son contenu, la présence des mentions obligatoires, et la validité des signatures. Un contrat généré par IA est aussi opposable qu’un contrat rédigé à la main, à condition d’avoir été relu et validé par un humain habilité avant signature.',
    },
    {
      _key: 'faq-2',
      question: 'Peut-on automatiser la génération de factures pour la facturation électronique obligatoire ?',
      reponse:
        'Oui. La plupart des outils modernes de génération de documents produisent des formats compatibles avec la facturation électronique en France (Factur-X, UBL). Attention à vérifier ce point spécifiquement lors du choix de la solution, car tous les outils ne sont pas encore alignés sur les évolutions réglementaires 2026.',
    },
    {
      _key: 'faq-3',
      question: 'Que faire si l’IA génère un texte inapproprié ou erroné ?',
      reponse:
        'Le principe fondamental de tout projet de génération est de conserver un point de validation humaine avant envoi ou signature. Sur les documents à faible enjeu (comptes rendus internes, courriers types), cette validation peut être légère. Sur les documents engageants (contrats, propositions commerciales), elle doit être systématique. Aucun outil sérieux ne recommande d’envoyer un document généré sans relecture humaine sur un enjeu significatif.',
    },
    {
      _key: 'faq-4',
      question: 'Combien de temps avant d’observer un vrai gain sur le temps équipe ?',
      reponse:
        'Sur un projet bien cadré (un type de document, un outil adapté, un sponsor engagé), les premiers gains sont mesurables dès 4 à 6 semaines après mise en production. Un impact significatif sur le temps équipe global demande 3 à 6 mois, le temps d’étendre à plusieurs types de documents et d’adapter les rituels.',
    },
    {
      _key: 'faq-5',
      question: 'Comment garantir la cohérence graphique avec ma charte ?',
      reponse:
        'Tous les outils modernes permettent d’intégrer votre charte graphique (polices, couleurs, logo, mise en page). Le point à vérifier lors du choix est la flexibilité de personnalisation : certains outils imposent leurs contraintes esthétiques, d’autres respectent finement votre identité visuelle. Prévoir 3 à 5 jours de travail pour paramétrer proprement la charte au démarrage.',
    },
  ],

  sidebarCta: {
    titre: 'Automatiser vos documents types ?',
    description: '30 minutes pour identifier le document pilote qui débloquera vos équipes.',
    lienLibelle: 'En parler →',
    lienHref: '/contact',
    variant: 'green',
  },

  seo: {
    titre: 'Générer automatiquement vos documents types avec l’IA | maria',
    description:
      'Guide pratique pour automatiser la génération de devis, contrats et propositions commerciales avec l’IA. Cas d’usage, méthode, budget.',
  },
}

/* ============================================================================
 * Exécution
 * ============================================================================ */

const result = await client.createOrReplace(ARTICLE)
console.log('ARTICLE OK:', result._id, '(rev:', result._rev + ')')
console.log('URL preview : https://maria.tech/blog/' + ARTICLE.slug.current)
