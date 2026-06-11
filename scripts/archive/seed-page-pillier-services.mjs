import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed initial du pilier /services.
 * Contenu transposé depuis la maquette `Maria - Page Services.html` /
 * `Brief original — Page pilier Services` fournis par Mathieu.
 */

const PAGE_PILLIER_SERVICES = {
  _id: 'pagePillierServices',
  _type: 'pagePillier',
  slug: 'services',

  hero: {
    surTitre: '// services',
    titre: 'L’IA utile, **à l’intérieur de votre entreprise**.',
    sousTitre:
      'maria ne fait pas de l’IA pour faire de l’IA. On conçoit ce qui rend vos équipes plus efficaces et mieux organisées : du cadrage stratégique aux outils sur-mesure, jusqu’aux agents qui travaillent à leurs côtés. Toujours avec des humains aux commandes.',
    ctaPrimaireLibelle: 'Parler de votre projet',
    ctaPrimaireHref: '/contact',
    ctaSecondaireLibelle: 'Voir les 3 services',
    ctaSecondaireAncre: '#central',
  },

  vision: {
    surTitre: '// notre approche',
    titre: 'Tout le monde fait de l’IA. Peu la mettent au service de l’interne.',
    paragraphes: [
      'La plupart des projets IA visent la vitrine : un chatbot sur le site, une campagne « augmentée », un effet d’annonce. Pendant ce temps, là où l’IA changerait vraiment la vie — **à l’intérieur de l’entreprise, dans le quotidien des équipes** — il ne se passe souvent rien.',
      'C’est précisément là que nous intervenons. maria conçoit l’IA qui fait gagner du temps aux commerciaux, qui soulage le service client, qui organise la connaissance, qui sécurise les usages. L’IA qui ne se voit pas de l’extérieur, mais qui se ressent chaque jour en interne.',
      'Notre conviction est simple : **la puissance de l’IA ne vaut rien sans la maîtrise.** Un projet IA réussi, c’est d’abord un projet cadré, sécurisé, validé par des humains. La technologie vient après, jamais avant.',
      'C’est pour ça que notre offre suit toujours le même ordre logique : **on cadre, on construit, on déploie, on forme.** Trois services complémentaires, une exigence commune.',
    ],
  },

  articulation: {
    surTitre: '// comment ça s’articule',
    titre: 'Vous pouvez entrer par n’importe quelle porte.',
    intro:
      'Pas besoin de tout prendre, ni dans l’ordre. Mais quand on suit la logique complète, elle ressemble à ça :',
    etapes: [
      {
        _key: 'a1',
        numero: '01',
        verbe: 'Cadrer',
        titre: 'Audit & stratégie IA',
        description: 'On définit quoi faire, et pourquoi.',
      },
      {
        _key: 'a2',
        numero: '02',
        verbe: 'Construire',
        titre: 'Outils internes',
        description: 'On bâtit la plateforme métier.',
      },
      {
        _key: 'a3',
        numero: '03',
        verbe: 'Déployer',
        titre: 'Agents IA',
        description: 'On met des assistants au travail.',
      },
      {
        _key: 'a4',
        numero: '04',
        verbe: 'Ancrer',
        titre: 'Formation',
        description: 'On rend vos équipes autonomes.',
      },
    ],
    transversal: {
      label: '// transversal',
      titre: 'La formation traverse tout.',
      description:
        'Un outil sans appropriation finit inutilisé. Un agent sans équipe formée crée de la défiance. C’est pourquoi la formation accompagne chacun de nos services — elle n’est pas une option, c’est le ciment.',
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
          'Vos données restent vos données. RGPD intégré dès la conception, hébergement européen privilégié.',
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
    titre: 'Les questions qu’on nous pose sur notre offre.',
    questions: [
      {
        _key: 'q1',
        question: 'Par quel service faut-il commencer ?',
        reponse:
          'Cela dépend de votre maturité. Si vous ne savez pas encore quoi faire de l’IA : commencez par l’audit. Si vous avez un besoin métier précis : on attaque directement l’outil ou l’agent. Le premier échange sert justement à le déterminer ensemble, sans engagement.',
      },
      {
        _key: 'q2',
        question: 'Faut-il prendre les trois services ?',
        reponse:
          'Non. Chaque service se suffit à lui-même. Beaucoup de projets ne sont qu’un audit, ou qu’un agent. On ne vend pas un package : on répond à un besoin.',
      },
      {
        _key: 'q3',
        question: 'Vous faites des sites web, du e-commerce, de la communication ?',
        reponse:
          'Notre cœur de métier, c’est l’IA pour l’interne : ce qui rend vos équipes plus efficaces et mieux organisées. Si un projet interne nécessite une extension (un portail connecté à votre outil, par exemple), on le conçoit dans la continuité. Mais nous ne faisons pas de site vitrine ou de communication digitale comme produit principal.',
      },
      {
        _key: 'q4',
        question: 'Combien coûte un projet avec maria ?',
        reponse:
          'Cela dépend entièrement du service et du périmètre. Un audit, un outil sur-mesure et un agent n’ont pas le même ordre de grandeur. Chaque page service détaille des fourchettes. Le prix est toujours fixe, défini avant de démarrer.',
      },
      {
        _key: 'q5',
        question: 'La formation est-elle incluse ?',
        reponse:
          'La formation est transversale : elle accompagne le déploiement de nos outils et agents pour garantir leur adoption réelle. Elle peut aussi être suivie seule. Le détail est sur la page dédiée.',
      },
    ],
  },

  finalCta: {
    surTitre: '// passons à l’action',
    titre: 'Un projet IA en tête, ou juste **une intuition** ?',
    sousTitre:
      '30 minutes pour comprendre votre contexte et identifier le bon point de départ. Sans engagement.',
    ctaPrimaireLibelle: 'Réserver un échange',
    ctaPrimaireHref: '/contact',
    ctaSecondaireLibelle: 'Découvrir notre méthode',
    ctaSecondaireHref: '/agence#processus',
    mention: 'RÉPONSE SOUS 24 H · SANS ENGAGEMENT',
  },

  seo: {
    titre: 'Services — Agence IA pour l’interne | maria',
    description:
      'maria conçoit l’IA utile en interne : audit & stratégie, outils sur-mesure, agents IA, formation. Pour des équipes plus efficaces et mieux organisées.',
  },
}

await client.createOrReplace(PAGE_PILLIER_SERVICES)
console.log(`✓ ${PAGE_PILLIER_SERVICES._id}`)
