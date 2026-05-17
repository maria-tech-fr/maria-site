import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed des 2 besoins du Lot 4 — RH & formation.
 *
 * NOTE besoin 10 (former-equipes-ia) : le brief désigne « Formation IA pour
 * les équipes » comme service principal, mais aucune pageService Formation
 * n'existe encore. En attendant, on met Audit & stratégie IA en card
 * principale et une mention formation enrichie. À mettre à jour quand la
 * page Formation existera.
 */

const SERVICE_OUTILS = { _type: 'reference', _ref: 'pageService-outils-internes-sur-mesure' }
const SERVICE_AGENTS = { _type: 'reference', _ref: 'pageService-agents-ia' }
const SERVICE_AUDIT = { _type: 'reference', _ref: 'pageService-audit-strategie-ia' }

const FORMATION_DEFAULT = {
  lienLibelle: 'formation IA pour les équipes',
  lienHref: '/services/audit-strategie-ia',
}

const BESOIN_9 = {
  _id: 'besoin-trier-candidatures',
  _type: 'pageBesoin',
  titre: 'Trier et qualifier les candidatures plus vite',
  slug: { _type: 'slug', current: 'trier-candidatures' },
  famille: 'rh-formation',
  ordreMenu: 1,
  introCourte:
    'Vos RH croulent sous les CV et perdent les bons profils ? Un tri assisté sur vos critères, auditable, sans déléguer la décision.',

  hero: {
    surTitre: '// besoin',
    titre: '200 CV pour un poste. Vos RH **passent à côté des bons profils**.',
    sousTitre:
      'Le tri manuel des candidatures est long, fatigant, et inégal selon qui s’en charge et à quelle heure. On vous aide à pré-qualifier intelligemment — sans déléguer la décision à une machine, et sans discrimination cachée.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'Le volume écrase la qualité du recrutement.',
    paragraphes: [
      'Pour un poste attractif, les candidatures se comptent en centaines. Les trier prend des heures, parfois des jours. Et comme c’est un travail répétitif et fatigant, la qualité du tri varie : les premiers CV sont lus attentivement, les derniers survolés. Des bons profils passent à la trappe, pas par manque de compétence, mais par épuisement du lecteur.',
      'Pendant ce temps, les meilleurs candidats — ceux qui ont le choix — partent ailleurs parce que votre processus est trop lent. Le tri manuel coûte donc deux fois : il mobilise vos RH, et il vous fait perdre les profils que vous vouliez justement attirer.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vos RH passent des journées entières à dépouiller des CV.',
      'La qualité du tri dépend de la fatigue et du moment.',
      'Les bons candidats acceptent une autre offre avant votre réponse.',
      'Vous savez que de bons profils passent inaperçus, sans pouvoir le prouver.',
      'Le délai entre candidature et premier retour est trop long, et vous le savez.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Un tri lent coûte les candidats que vous vouliez le plus.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Des journées RH absorbées par le dépouillement, sur chaque recrutement, alors que le volume — pas la difficulté — dicte la charge.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Un travail répétitif et ingrat pour les équipes RH, et une expérience candidat dégradée par des délais qui s’allongent.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Le bon profil parti chez un concurrent plus rapide, le poste vacant qui pèse sur l’équipe, le recrutement raté par manque de temps d’analyse. Le coût d’un mauvais ou d’un non-recrutement est le plus lourd.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On pré-qualifie intelligemment. Vos RH décident.',
    sousTitre: 'Pas une IA qui recrute à votre place : un assistant qui fait remonter les bons profils, avec des critères que vous maîtrisez et pouvez auditer.',
    leviers: [
      { _key: 'l1', icone: 'search', titre: 'Pré-qualification sur vos critères',
        description: 'Les candidatures sont analysées selon les critères que vous définissez, explicitement, pas une boîte noire.' },
      { _key: 'l2', icone: 'sparkles', titre: 'Mise en avant des profils pertinents',
        description: 'Les candidats qui correspondent remontent, ceux qui ne correspondent pas sont écartés avec une raison traçable.' },
      { _key: 'l3', icone: 'zap', titre: 'Réduction des délais',
        description: 'Le premier tri est quasi immédiat : vous répondez aux candidats avant qu’ils partent ailleurs.' },
      { _key: 'l4', icone: 'shield', titre: 'Garde-fous anti-discrimination',
        description: 'Les critères sont auditables, la décision finale reste humaine, et on conçoit pour réduire les biais, pas les automatiser.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble un recrutement, une fois le tri assisté.',
    avant: [
      'Des journées RH passées à dépouiller des CV.',
      'Les derniers CV lus en diagonale par fatigue.',
      'Les bons candidats partis avant votre réponse.',
      'Le délai de premier retour se compte en semaines.',
      'Aucune trace de pourquoi un profil a été écarté.',
    ],
    apres: [
      'Le premier tri est quasi immédiat et homogène.',
      'Tous les profils sont évalués avec la même rigueur.',
      'Les bons candidats reçoivent une réponse rapide.',
      'Le délai de premier retour se compte en jours.',
      'Chaque écartement est tracé et justifiable.',
    ],
    closing: 'Les RH arrêtent de dépouiller. Elles recommencent à recruter.',
  },

  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AGENTS, numero: '03', ctaLibelle: 'Découvrir ce service',
        pitch: 'On conçoit un agent de pré-qualification cadré sur vos critères explicites, qui fait remonter les profils pertinents et trace ses décisions — la sélection finale restant entièrement humaine.' },
      { _key: 's2', service: SERVICE_OUTILS, numero: '02', ctaLibelle: 'Découvrir ce service',
        pitch: 'L’outil RH qui orchestre ce tri, suit les candidatures et donne à vos équipes la visibilité sur le pipeline de recrutement.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Vos équipes RH doivent superviser cet outil avec discernement, notamment sur les enjeux de biais — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'N’y a-t-il pas un risque de discrimination algorithmique ?',
        reponse: 'C’est le risque que nous prenons le plus au sérieux. Les critères de tri sont définis par vous, explicites et auditables. La décision finale reste humaine. Et on conçoit le système pour réduire les biais — pas pour les industrialiser. C’est un sujet qu’on cadre formellement au démarrage.' },
      { _key: 'q2', question: 'L’IA va-t-elle décider qui est recruté ?',
        reponse: 'Non. Elle pré-qualifie et fait remonter des profils. Le choix de qui passe en entretien et de qui est recruté reste entièrement à vos équipes. L’IA réduit le volume à traiter, elle ne décide pas.' },
      { _key: 'q3', question: 'Sur quels critères se base le tri ?',
        reponse: 'Uniquement sur ceux que vous définissez (compétences, expérience, prérequis du poste). Pas de critères implicites ou opaques. Tout est documenté et révisable.' },
      { _key: 'q4', question: 'Que devient un candidat écarté ?',
        reponse: 'Chaque écartement est justifié et tracé. Vous pouvez revoir les profils écartés, ajuster les critères, et garder la main. Rien n’est définitif sans contrôle humain.' },
      { _key: 'q5', question: 'Combien de temps pour mettre ça en place ?',
        reponse: '4 à 8 semaines selon vos process RH et vos outils existants (ATS, etc.). On démarre sur un type de poste à fort volume pour un effet rapide.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-faciliter-onboarding' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-conformite-rgpd-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à recruter plus vite **sans sacrifier la rigueur** ?',
    sousTitre: '30 minutes pour cadrer un tri assisté qui respecte vos critères et vos obligations, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Trier et qualifier les candidatures avec l’IA | maria',
    description:
      'Vos RH croulent sous les CV et perdent les bons profils ? maria conçoit un tri assisté sur vos critères, auditable, sans déléguer la décision à une machine.',
  },
}

const BESOIN_10 = {
  _id: 'besoin-former-equipes-ia',
  _type: 'pageBesoin',
  titre: 'Former mes équipes à l’IA en interne',
  slug: { _type: 'slug', current: 'former-equipes-ia' },
  famille: 'rh-formation',
  ordreMenu: 2,
  introCourte:
    'Vos équipes utilisent l’IA sans cadre ni méthode ? Une formation concrète, adaptée à vos métiers, ancrée dans vos usages réels.',

  hero: {
    surTitre: '// besoin',
    titre: 'Vos équipes utilisent déjà l’IA. **Mal, dans leur coin, sans cadre**.',
    sousTitre:
      'ChatGPT en libre service, prompts approximatifs, données sensibles copiées-collées sans réfléchir. L’IA est déjà dans votre entreprise — la question n’est plus « si » mais « comment ». On forme vos équipes à l’utiliser bien, et en sécurité.',
    ctaPrimaireLibelle: 'Parler de ce besoin',
    ctaSecondaireLibelle: 'Voir le service associé',
  },

  probleme: {
    surTitre: '// le problème',
    titre: 'L’IA est déjà là. Personne ne l’a cadrée.',
    paragraphes: [
      'Vos collaborateurs n’ont pas attendu une décision officielle pour utiliser l’IA. Ils l’utilisent déjà : pour rédiger, résumer, analyser, coder. Le problème n’est pas leur initiative — c’est qu’ils le font sans méthode, sans cadre, et parfois en exposant des données qu’ils ne devraient pas.',
      'Interdire ne marche pas (ils continueront en cachette). Laisser faire non plus (résultats médiocres, risques de fuite, dépendance à des outils non maîtrisés). La seule voie tenable, c’est de former : pour que l’IA soit utilisée bien, là où elle aide, en sécurité, avec un esprit critique.',
    ],
    recogSurTitre: '// vous reconnaissez ?',
    recogTitre: 'Quelques situations qu’on entend souvent',
    symptomes: [
      'Vos équipes utilisent l’IA, mais vous ne savez ni comment ni pour quoi.',
      'Des données internes ont peut-être déjà été copiées dans des outils grand public.',
      'Les résultats obtenus sont inégaux : parfois bons, souvent moyens.',
      'Personne n’a défini ce qui est permis, recommandé, ou interdit.',
      'Vous hésitez entre tout interdire et tout laisser faire — sans bonne option.',
    ],
  },

  cout: {
    surTitre: '// le vrai coût',
    titre: 'Une IA non encadrée coûte en qualité, en sécurité, et en confiance.',
    items: [
      { _key: 'c1', icone: 'time', titre: 'Le coût en temps',
        description: 'Le temps perdu à mal utiliser l’outil, à refaire ce qu’une bonne méthode aurait réussi du premier coup.' },
      { _key: 'c2', icone: 'human', titre: 'Le coût humain',
        description: 'Des équipes qui doutent (« ai-je le droit ? »), d’autres qui surinvestissent à tort, et un fossé qui se creuse entre ceux qui maîtrisent et ceux qui subissent.' },
      { _key: 'c3', icone: 'opportunity', titre: 'Le coût d’opportunité',
        description: 'Une donnée sensible exposée, une dépendance à un outil non maîtrisé, et surtout : tout le gain de productivité que l’IA bien utilisée aurait apporté, et qui n’arrive pas.' },
    ],
  },

  reponse: {
    surTitre: '// notre réponse',
    titre: 'On forme vos équipes à utiliser l’IA bien, et en sécurité.',
    sousTitre: 'Pas une conférence théorique : une formation concrète, adaptée à vos métiers, ancrée dans vos usages réels.',
    leviers: [
      { _key: 'l1', icone: 'users', titre: 'Formation par métier',
        description: 'Les usages d’un commercial, d’un juriste ou d’une équipe RH ne sont pas les mêmes : on adapte le contenu à leur quotidien réel.' },
      { _key: 'l2', icone: 'shield', titre: 'Bonnes pratiques et sécurité',
        description: 'Quoi confier à l’IA, quoi ne jamais y mettre, comment vérifier un résultat : les réflexes essentiels, ancrés.' },
      { _key: 'l3', icone: 'gear', titre: 'Cadre d’usage clair',
        description: 'On aide à définir ce qui est recommandé, permis, interdit — pour sortir du flou « interdire ou laisser faire ».' },
      { _key: 'l4', icone: 'search', titre: 'Esprit critique',
        description: 'Reconnaître une hallucination, douter au bon moment, garder l’humain décisionnaire : la compétence clé, pas le gadget.' },
    ],
  },

  transformation: {
    surTitre: '// le quotidien d’après',
    titre: 'À quoi ressemble l’usage de l’IA, une fois les équipes formées.',
    avant: [
      'L’IA est utilisée en cachette, sans méthode.',
      'Des données sensibles circulent sans précaution.',
      'Les résultats sont inégaux et peu fiables.',
      'Personne ne sait ce qui est permis ou non.',
      'L’écart se creuse entre initiés et non-initiés.',
    ],
    apres: [
      'L’IA est utilisée ouvertement, avec méthode.',
      'Les données sensibles sont protégées par réflexe.',
      'Les résultats sont fiables et vérifiés.',
      'Le cadre d’usage est clair et partagé.',
      'Toute l’équipe monte en compétence ensemble.',
    ],
    closing: 'L’IA arrête d’être un risque subi. Elle devient une compétence maîtrisée.',
  },

  // NB : la page Formation n'existant pas encore, on met Audit en card
  // principale et une mention formation enrichie. À remplacer par la
  // référence Formation quand la page sera créée.
  serviceAssocie: {
    surTitre: '// le service qui répond à ce besoin',
    titre: 'Comment on s’y prend concrètement.',
    cards: [
      { _key: 's1', service: SERVICE_AUDIT, numero: '01', ctaLibelle: 'Découvrir ce service',
        pitch: 'Avant ou après la formation, un audit permet de cadrer la gouvernance : ce qui est permis, recommandé, interdit, et comment sécuriser durablement les usages.' },
    ],
    formationMention: {
      ...FORMATION_DEFAULT,
      texte: 'Au cœur de ce besoin : des sessions adaptées à vos métiers, ancrées dans vos usages réels, pour que vos équipes utilisent l’IA avec méthode et en sécurité — la',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose sur ce sujet.',
    questions: [
      { _key: 'q1', question: 'Nos équipes n’y connaissent rien. Est-ce un problème ?',
        reponse: 'Non, c’est le point de départ le plus fréquent. La formation part du niveau réel, sans présupposé technique. L’objectif n’est pas d’en faire des experts, mais des utilisateurs autonomes et lucides.' },
      { _key: 'q2', question: 'Et celles qui se croient déjà à l’aise ?',
        reponse: 'Souvent, ce sont elles qui ont le plus de mauvais réflexes (notamment côté sécurité des données). La formation recadre les pratiques et apporte la méthode qui manque, même aux utilisateurs avancés.' },
      { _key: 'q3', question: 'La formation est-elle générique ou adaptée à nos métiers ?',
        reponse: 'Adaptée. Un module pour des commerciaux n’est pas celui de juristes ou de RH. On construit le contenu à partir de vos usages réels, pas d’exemples génériques.' },
      { _key: 'q4', question: 'Combien de temps dure une formation ?',
        reponse: 'Cela va de la demi-journée de sensibilisation au parcours sur plusieurs sessions, selon le public et l’objectif. Le format se cadre selon vos contraintes et vos métiers. Le détail est sur la page dédiée à la formation.' },
      { _key: 'q5', question: 'La formation peut-elle accompagner un projet (outil, agent) qu’on déploie avec vous ?',
        reponse: 'Oui, c’est même fréquent. La formation est transversale : elle accompagne le déploiement de nos outils et agents pour garantir leur adoption réelle, pas seulement leur livraison.' },
    ],
  },

  besoinsLies: {
    surTitre: '// besoins liés',
    titre: 'Vous pourriez aussi avoir besoin de…',
    references: [
      { _key: 'r1', _type: 'reference', _ref: 'besoin-securiser-usage-ia' },
      { _key: 'r2', _type: 'reference', _ref: 'besoin-faciliter-onboarding' },
      { _key: 'r3', _type: 'reference', _ref: 'besoin-conformite-rgpd-ia' },
    ],
  },

  ctaFinal: {
    surTitre: '// passons à l’action',
    titre: 'Prêt à faire de l’IA **une compétence maîtrisée** chez vous ?',
    sousTitre: '30 minutes pour cadrer un plan de formation adapté à vos métiers, sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaSecondaireLibelle: 'Voir le service associé',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Former vos équipes à l’IA en interne | maria',
    description:
      'Vos équipes utilisent l’IA sans cadre ni méthode ? maria forme vos collaborateurs à un usage efficace et sécurisé, adapté à vos métiers réels.',
  },
}

for (const doc of [BESOIN_9, BESOIN_10]) {
  await client.createOrReplace(doc)
  console.log(`✓ ${doc._id}`)
}

console.log('Done.')
