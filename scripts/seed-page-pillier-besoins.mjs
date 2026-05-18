import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed initial du pilier /besoins.
 * Contenu transposé depuis la maquette `Maria - Page Besoins.html`.
 *
 * Différences notables avec le pilier services :
 * - Vision sur fond gris (gérée par PillarPageTemplate selon le slug)
 * - Articulation : 3 étapes au lieu de 4 (logique besoin → réponse plus directe)
 * - finalCta absent : la page se termine sur la FAQ (décision client).
 */

const PAGE_PILLIER_BESOINS = {
  _id: 'pagePillierBesoins',
  _type: 'pagePillier',
  slug: 'besoins',

  hero: {
    surTitre: '// besoins',
    titre: 'Dites-nous ce qui vous ralentit. On vous dira ce que l’IA peut y faire.',
    sousTitre:
      'Pas besoin de savoir ce que vous voulez « comme techno ». Vous savez ce qui coince dans votre quotidien : du temps perdu, des équipes saturées, des données introuvables. Partez de là. On s’occupe du reste.',
    ctaPrimaireLibelle: 'Parler de votre situation',
    ctaPrimaireHref: '/contact',
    ctaSecondaireLibelle: 'Voir les 12 besoins',
    ctaSecondaireAncre: '#central',
  },

  vision: {
    surTitre: '// notre conviction',
    titre: 'On ne part jamais de la techno. On part de ce qui coince.',
    paragraphes: [
      'La plupart des entreprises abordent l’IA à l’envers : « il nous faut un chatbot », « on devrait faire de l’IA générative », « les autres ont un agent, et nous ? ». **On part de la solution avant d’avoir nommé le problème.** C’est le meilleur moyen de dépenser de l’argent sans rien régler.',
      'Chez maria, on commence toujours par la question simple : **qu’est-ce qui vous fait perdre du temps, de l’énergie, de la sérénité au quotidien ?** Une fois le problème nommé clairement, la bonne réponse technique devient évidente — et souvent plus simple qu’on ne l’imaginait.',
      'Cette page liste les besoins qu’on rencontre le plus souvent, classés par famille. Reconnaissez le vôtre. Chaque besoin renvoie vers la façon concrète dont on le traite.',
    ],
  },

  articulation: {
    surTitre: '// comment ça marche',
    titre: 'Un besoin n’attend pas une techno. Il attend une réponse.',
    intro:
      'Chaque besoin renvoie vers le ou les services qui le traitent concrètement. Vous n’avez pas à savoir si c’est « un outil » ou « un agent » — c’est notre travail de le déterminer.',
    etapes: [
      {
        _key: 'a1',
        numero: '01',
        verbe: 'Reconnaître',
        titre: 'Vous reconnaissez un besoin',
        description: 'Une situation qui ressemble à votre quotidien.',
      },
      {
        _key: 'a2',
        numero: '02',
        verbe: 'Identifier',
        titre: 'On identifie la bonne réponse',
        description: 'Audit, outil, agent, ou combinaison. Cadré avec vous.',
      },
      {
        _key: 'a3',
        numero: '03',
        verbe: 'Déployer',
        titre: 'On déploie et on forme',
        description: 'Avec validation humaine, et vos équipes autonomes à la fin.',
      },
    ],
    transversal: {
      label: '// transversal',
      titre: 'Quel que soit le besoin, la formation suit.',
      description:
        'Résoudre un besoin sans former les équipes qui vivront avec la solution, c’est régler le problème à moitié. La formation accompagne chaque réponse qu’on apporte.',
      ctaLibelle: 'Découvrir la formation',
      ctaHref: '/services/formation',
    },
  },

  whyMaria: {
    surTitre: '// pourquoi maria',
    titre: 'La puissance de l’IA ne vaut rien sans la maîtrise.',
    piliers: [
      {
        _key: 'w1',
        icone: 'shield',
        titre: 'Maîtrise',
        description:
          'On ne déploie que ce qu’on comprend et qu’on peut expliquer. Pas de boîte noire.',
      },
      {
        _key: 'w2',
        icone: 'lock',
        titre: 'Sécurité',
        description:
          'Vos données restent vos données. RGPD dès la conception, hébergement européen privilégié.',
      },
      {
        _key: 'w3',
        icone: 'user',
        titre: 'Humain aux commandes',
        description:
          'L’IA prépare et assiste. La décision finale revient toujours à un humain désigné.',
      },
      {
        _key: 'w4',
        icone: 'question',
        titre: 'Anti-bullshit',
        description:
          'On vous dit ce que l’IA ne sait pas faire, même quand ça nous fait perdre une vente.',
      },
    ],
    charteLien: {
      texte: 'Ces engagements sont publics et opposables.',
      libelle: 'Lire notre charte de gouvernance IA',
      href: '/charte-ia',
    },
  },

  faq: {
    surTitre: '// vos questions',
    titre: 'Les questions qu’on nous pose avant de commencer.',
    questions: [
      {
        _key: 'q1',
        question: 'Et si mon besoin n’est pas dans la liste ?',
        reponse:
          'La liste couvre les cas les plus fréquents, pas tous. Si votre situation ressemble de loin à l’un de ces besoins, ou ne ressemble à aucun, parlez-nous-en directement : le premier échange sert justement à clarifier ce qui coince vraiment chez vous.',
      },
      {
        _key: 'q2',
        question: 'Je reconnais plusieurs besoins à la fois. C’est normal ?',
        reponse:
          'Très fréquent. Les besoins sont liés (gagner du temps, c’est souvent aussi mieux organiser la connaissance). On part du plus douloureux ou du plus stratégique, et on traite le reste ensuite si c’est pertinent.',
      },
      {
        _key: 'q3',
        question: 'Comment savoir si c’est « un outil » ou « un agent » qu’il me faut ?',
        reponse:
          'Vous n’avez pas à le savoir. C’est précisément notre travail de traduire un besoin en bonne réponse technique. Vous décrivez le problème, on propose la solution la plus simple qui le règle.',
      },
      {
        _key: 'q4',
        question: 'Combien coûte la résolution d’un besoin ?',
        reponse:
          'Cela dépend entièrement du besoin et de son périmètre. Un même besoin peut se traiter modestement ou ambitieusement. Les pages de chaque besoin et de chaque service donnent des ordres de grandeur. Le prix est toujours fixe, défini avant de démarrer.',
      },
      {
        _key: 'q5',
        question: 'Vous traitez ces besoins pour quel type d’entreprise ?',
        reponse:
          'Des professionnels exigeants, de la PME à l’organisation plus structurée. Le point commun de nos clients : ils veulent de l’IA utile en interne, maîtrisée et sécurisée — pas un effet vitrine.',
      },
    ],
  },

  // Pas de finalCta : la page se termine sur la FAQ (décision client).

  seo: {
    titre: 'Besoins — Que peut faire l’IA pour votre entreprise | maria',
    description:
      'Gagner du temps, soulager vos équipes, organiser la connaissance, sécuriser l’IA… maria répond à 12 besoins concrets de l’entreprise. Trouvez le vôtre.',
  },
}

await client.createOrReplace(PAGE_PILLIER_BESOINS)
console.log(`✓ ${PAGE_PILLIER_BESOINS._id}`)
