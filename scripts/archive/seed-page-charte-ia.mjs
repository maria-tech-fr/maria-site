import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Seed initial de la Charte IA.
 *
 * NB : le contenu ci-dessous est une PREMIÈRE VERSION cohérente avec le
 * positionnement maria. Le brief mentionne « contenu complet rédigé »
 * (11 engagements + 5 lignes rouges + préambule + disclaimer) — quand
 * Mathieu m'enverra le contenu finalisé, on relancera un seed ou un patch
 * ciblé pour remplacer les blocs concernés.
 *
 * La date `lastUpdated` pilote l'affichage public + le sitemap (lastmod).
 */

const PAGE_CHARTE = {
  _id: 'pageCharteIA',
  _type: 'pageCharteIA',

  hero: {
    surTitre: '// charte de gouvernance ia',
    titre: 'Nos **engagements publics** sur l’usage de l’IA.',
    sousTitre:
      'Une charte opposable. Pas un manifeste marketing. Voici ce que nous nous engageons à faire — et ce que nous refusons.',
  },

  preambule: {
    surTitre: '// préambule',
    titre: 'Pourquoi écrire ce que nous ne ferons pas.',
    paragraphes: [
      'Le marché de l’IA est saturé de promesses. Beaucoup de prestataires vendent l’automatisation totale, l’IA-magique, le « tout remplacer ». Nous prenons le parti inverse : **on fait moins, on cadre mieux, on documente tout**.',
      'Cette charte rend ce parti pris opérationnel. Elle fixe par écrit ce que nous nous engageons à faire — et ce que nous refusons de faire — quels que soient le client, le projet ou la pression commerciale.',
      'Elle est publique, datée, versionnée. Toute modification matérielle sera explicitée dans la section de révision.',
    ],
  },

  engagements: {
    surTitre: '// nos engagements',
    titre: 'Ce que nous nous engageons à faire.',
    sousTitre: 'Onze engagements concrets, applicables à chaque projet.',
    items: [
      {
        _key: 'e01',
        numero: '01',
        titre: 'Validation humaine systématique sur les décisions à enjeu',
        description:
          'Aucun output IA n’engage l’entreprise sans relecture humaine quand il porte sur une décision client, RH, juridique ou stratégique. Nous identifions ces points dès le cadrage et nous les documentons.',
      },
      {
        _key: 'e02',
        numero: '02',
        titre: 'Transparence sur les modèles utilisés',
        description:
          'Pour chaque projet, nous documentons quel(s) modèle(s) IA sont employés, pour quel usage, avec quelles limites connues. Le client a le droit de savoir ce qui tourne sous le capot.',
      },
      {
        _key: 'e03',
        numero: '03',
        titre: 'Propriété des données et des modèles entraînés',
        description:
          'Les données clients restent la propriété du client. Les modèles fine-tunés sur ses données lui appartiennent. Aucune réutilisation pour d’autres clients sans accord explicite et formel.',
      },
      {
        _key: 'e04',
        numero: '04',
        titre: 'Pas de dépendance forcée',
        description:
          'Nous concevons des solutions documentées, reprises possibles par d’autres équipes. Le code, les prompts, les configurations, les pipelines sont remis au client. Pas de boîte noire, pas de vendor lock-in.',
      },
      {
        _key: 'e05',
        numero: '05',
        titre: 'Documentation du rôle humain dans la boucle',
        description:
          'Sur chaque livrable IA, nous documentons explicitement où l’humain intervient, sur quelle décision, avec quelle latitude. Ni « tout automatique », ni « approbation cosmétique ».',
      },
      {
        _key: 'e06',
        numero: '06',
        titre: 'Mesure et tracabilité des outputs',
        description:
          'Chaque agent ou outil IA déployé en production est tracé : qui a déclenché quoi, à quelle source, avec quel résultat. Le client peut auditer à tout moment.',
      },
      {
        _key: 'e07',
        numero: '07',
        titre: 'Refus d’automatiser ce qui doit rester humain',
        description:
          'Certaines tâches gagnent à être faites par un humain — relation directe, sensibilité, décision irréversible. Nous l’indiquons et refusons de les automatiser, même si le client le demande.',
      },
      {
        _key: 'e08',
        numero: '08',
        titre: 'Formation systématique des équipes utilisatrices',
        description:
          'Aucun outil IA n’est livré sans formation des équipes qui vont l’utiliser. La formation est intégrée au projet, pas vendue à part en option.',
      },
      {
        _key: 'e09',
        numero: '09',
        titre: 'Hébergement encadré et contractualisé',
        description:
          'Nous privilégions des modèles et infrastructures hébergés en Europe quand le cas d’usage le permet. Lorsque ce n’est pas possible, nous documentons les flux, les sous-traitants, les transferts hors UE et les garanties contractuelles applicables.',
      },
      {
        _key: 'e10',
        numero: '10',
        titre: 'Conformité RGPD intégrée dès la conception',
        description:
          'Pour tout projet impliquant des données personnelles, nous documentons bases légales, durées de conservation, droits des personnes et sous-traitants — au cadrage, pas en post-production. Sans nous substituer au DPO ou conseil juridique du client.',
      },
      {
        _key: 'e11',
        numero: '11',
        titre: 'Sobriété : on ne déploie pas pour déployer',
        description:
          'L’IA n’est pas une fin. Si une solution non-IA suffit, nous le disons. Nous arbitrons en faveur du plus simple, du plus auditable, du moins coûteux — y compris quand cela réduit notre prestation.',
      },
    ],
  },

  lignesRouges: {
    surTitre: '// lignes rouges',
    titre: 'Ce que nous refusons de faire.',
    intro: 'Quelques choses ne se négocient pas. Peu importe le client, le budget, l’urgence.',
    items: [
      'Nous ne livrons jamais un agent IA qui prendrait seul une décision RH (recrutement, sanction, licenciement). La pré-qualification oui ; la décision finale, jamais.',
      'Nous ne mettons jamais en place un système de surveillance individuelle des collaborateurs déguisé en « monitoring de productivité ».',
      'Nous n’entraînons pas un modèle sur les données d’un client pour servir un autre client, même de manière anonymisée, sans accord écrit explicite et précis.',
      'Nous ne déployons pas d’IA générative en contact direct avec le client final sans garde-fous explicites, périmètre cadré et possibilité d’escalade humaine immédiate.',
      'Nous n’acceptons pas de mission dont le but premier est de remplacer des équipes sans plan de transition, de formation et de redéploiement humain documenté.',
    ],
  },

  disclaimer: {
    surTitre: '// ce que cette charte n’est pas',
    titre: 'Pour être honnête sur ce qu’on signe.',
    paragraphes: [
      'Cette charte n’est pas une certification qualité. Nous ne sommes pas Qualiopi, ni audités par un tiers, ni labellisés. Ce sont nos engagements à nous, vérifiables par les clients qui nous font confiance, pas par un organisme.',
      'Cette charte n’est pas exhaustive. Elle couvre les sujets que nous avons identifiés comme les plus structurants. D’autres viendront — et seront ajoutés, datés.',
      'Cette charte n’est pas une garantie d’infaillibilité. Nous nous trompons aussi. Mais nous nous engageons à le reconnaître vite, le corriger, et à mettre à jour ce document si une situation a fait apparaître un manque.',
    ],
  },

  cta: {
    surTitre: '// engagement réciproque',
    titre: 'Un projet IA mérite une **conversation cadrée**.',
    sousTitre:
      'Si ces engagements vous parlent — ou si certains vous interrogent — on prend 30 minutes. Sans engagement, sans baratin.',
    ctaLibelle: 'Parler à maria',
    ctaHref: '/contact',
  },

  revision: {
    lastUpdated: '2026-05-18',
    mention:
      'Toute modification matérielle de ces engagements sera datée et explicitée. Versions précédentes disponibles sur demande.',
  },

  seo: {
    titre: 'Charte de gouvernance IA | maria',
    description:
      'Les engagements publics de maria sur l’usage de l’IA : validation humaine, transparence, propriété des données, lignes rouges. Une charte opposable.',
  },
}

await client.createOrReplace(PAGE_CHARTE)
console.log(`✓ ${PAGE_CHARTE._id}`)
