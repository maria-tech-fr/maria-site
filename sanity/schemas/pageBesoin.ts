import { defineArrayMember, defineField, defineType } from 'sanity'
import { seoField } from './fields/seo'

const FAMILLES = [
  { title: 'Productivité opérationnelle', value: 'productivite-operationnelle' },
  { title: 'Organisation & connaissance', value: 'organisation-connaissance' },
  { title: 'Pilotage & décision', value: 'pilotage-decision' },
  { title: 'RH & formation', value: 'rh-formation' },
  { title: 'Gouvernance & conformité', value: 'gouvernance-conformite' },
]

/**
 * Doc type des pages "besoin" (par cas d'usage). Parallèle à pageService.
 * Structure du gabarit en 9 blocs : hero, problème, coût, réponse, transformation,
 * services associés, FAQ, besoins liés, CTA final.
 */
export const pageBesoin = defineType({
  name: 'pageBesoin',
  title: 'Page besoin',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Métadonnées', default: true },
    { name: 'menu', title: 'Sous-menu nav' },
    { name: 'content', title: 'Contenu de page' },
    { name: 'maillage', title: 'Maillage (services + besoins liés)' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // -- Métadonnées --
    defineField({
      name: 'titre',
      title: 'Titre de la page (BO uniquement)',
      description: 'Sert au listing dans le studio. Ex : « Tâches répétitives qui plombent les équipes ».',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'L’adresse sera /besoins/<slug>. Ex : « gagner-du-temps-commerciaux ».',
      type: 'slug',
      group: 'meta',
      options: { source: 'titre', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'famille',
      title: 'Famille de besoin',
      description: 'Sert au groupement dans le mega-menu et dans la page index /besoins.',
      type: 'string',
      group: 'meta',
      options: { list: FAMILLES, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),

    // -- Sous-menu nav --
    defineField({
      name: 'ordreMenu',
      title: 'Ordre dans la famille (sous-menu)',
      description: 'Numéro d’ordre au sein de la famille. Plus petit = en premier.',
      type: 'number',
      group: 'menu',
      validation: (r) => r.required().min(1).max(99),
    }),
    defineField({
      name: 'introCourte',
      title: 'Intro courte (sous-menu et besoins liés)',
      description: 'Phrase courte affichée sous le titre dans le sous-menu et dans les cards de la section « Besoins liés ».',
      type: 'text',
      rows: 2,
      group: 'menu',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'pictoMenu',
      title: 'Picto sous-menu (optionnel)',
      type: 'image',
      group: 'menu',
    }),

    // -- Bloc 1 : Hero --
    defineField({
      name: 'hero',
      title: 'Bloc 1 — Hero',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// besoin' }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Encadrer le mot-clé central avec **...** pour le surligner en jaune.',
          type: 'text',
          rows: 2,
          validation: (r) => r.required().max(240),
        }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 3, validation: (r) => r.max(400) }),
        defineField({ name: 'ctaPrimaireLibelle', title: 'CTA primaire', type: 'string', initialValue: 'Parler de ce besoin' }),
        defineField({ name: 'ctaSecondaireLibelle', title: 'CTA secondaire', type: 'string', initialValue: 'Voir le service associé' }),
      ],
    }),

    // -- Bloc 2 : Le problème --
    defineField({
      name: 'probleme',
      title: 'Bloc 2 — Le problème',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le problème' }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          description: 'Encadrer le mot-clé avec **...** pour le surligner en jaune.',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes (2 typiquement)',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (r) => r.min(1).max(4),
        }),
        defineField({ name: 'recogSurTitre', title: 'Sur-titre encadré', type: 'string', initialValue: '// vous reconnaissez ?' }),
        defineField({ name: 'recogTitre', title: 'Titre encadré', type: 'string', initialValue: 'Quelques situations qu’on entend souvent' }),
        defineField({
          name: 'symptomes',
          title: 'Symptômes (4-5)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),

    // -- Bloc 3 : Le vrai coût --
    defineField({
      name: 'cout',
      title: 'Bloc 3 — Le vrai coût',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le vrai coût' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Cartes coût (3 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'coutItem',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Sablier / Temps', value: 'time' },
                      { title: 'Cœur / Humain', value: 'human' },
                      { title: 'Cible / Opportunité', value: 'opportunity' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'time',
                }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(280) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'icone' } },
            }),
          ],
          validation: (r) => r.min(1).max(3),
        }),
      ],
    }),

    // -- Bloc 4 : Notre réponse --
    defineField({
      name: 'reponse',
      title: 'Bloc 4 — Notre réponse',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// notre réponse' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({
          name: 'leviers',
          title: 'Leviers (3 ou 4)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'levier',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Loupe (audit)', value: 'search' },
                      { title: 'Étincelle (IA)', value: 'sparkles' },
                      { title: 'Bouclier (sécurité)', value: 'shield' },
                      { title: 'Équipe (humain)', value: 'users' },
                      { title: 'Engrenage (process)', value: 'gear' },
                      { title: 'Éclair (vitesse)', value: 'zap' },
                    ],
                    layout: 'dropdown',
                  },
                  initialValue: 'search',
                }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'icone' } },
            }),
          ],
          validation: (r) => r.min(2).max(6),
        }),
      ],
    }),

    // -- Bloc 5 : Transformation (avant / après) --
    defineField({
      name: 'transformation',
      title: 'Bloc 5 — Le quotidien d’après',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le quotidien d’après' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'avant',
          title: 'Aujourd’hui (4-5 réalités)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.min(2).max(6),
        }),
        defineField({
          name: 'apres',
          title: 'Avec maria (4-5 réalités)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.min(2).max(6),
        }),
      ],
    }),

    // -- Bloc 6 : Service associé --
    defineField({
      name: 'serviceAssocie',
      title: 'Bloc 6 — Service associé',
      type: 'object',
      group: 'maillage',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le service qui répond à ce besoin' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Comment on s’y prend concrètement.' }),
        defineField({
          name: 'cards',
          title: 'Cards service (1 ou 2)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'serviceCard',
              fields: [
                defineField({
                  name: 'service',
                  title: 'Référence vers le service',
                  type: 'reference',
                  to: [{ type: 'pageService' }],
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'numero', title: 'Numéro affiché (01, 02, 03)', type: 'string', validation: (r) => r.max(3) }),
                defineField({ name: 'pitch', title: 'Pitch (pourquoi ce service répond à ce besoin)', type: 'text', rows: 3, validation: (r) => r.required().max(320) }),
                defineField({ name: 'ctaLibelle', title: 'CTA libellé', type: 'string', initialValue: 'Découvrir ce service' }),
              ],
              preview: { select: { title: 'service.titre', subtitle: 'pitch' } },
            }),
          ],
          validation: (r) => r.min(1).max(2),
        }),
        defineField({
          name: 'formationMention',
          title: 'Bandeau formation (optionnel)',
          description: 'Mention transversale qui pointe vers la page formation. Laisser vide pour masquer.',
          type: 'object',
          fields: [
            defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
            defineField({ name: 'lienLibelle', title: 'Libellé du lien', type: 'string' }),
            defineField({ name: 'lienHref', title: 'Lien (URL)', type: 'string' }),
          ],
        }),
      ],
    }),

    // -- Bloc 7 : FAQ --
    defineField({
      name: 'faq',
      title: 'Bloc 7 — FAQ',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// vos questions' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Les questions qu’on nous pose sur ce sujet.' }),
        defineField({
          name: 'questions',
          title: 'Questions (4-5)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'qaItem',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'text', rows: 2, validation: (r) => r.required().max(200) }),
                defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(800) }),
              ],
              preview: { select: { title: 'question' } },
            }),
          ],
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),

    // -- Bloc 7bis : Besoins liés --
    defineField({
      name: 'besoinsLies',
      title: 'Bloc 7bis — Besoins liés',
      type: 'object',
      group: 'maillage',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// besoins liés' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', initialValue: 'Vous pourriez aussi avoir besoin de…' }),
        defineField({
          name: 'references',
          title: 'Références (2 ou 3 besoins)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'pageBesoin' }],
              options: {
                filter: ({ document }) => ({
                  // Évite de se référencer soi-même.
                  filter: '_id != $self',
                  params: { self: document._id?.replace(/^drafts\./, '') ?? '' },
                }),
              },
            }),
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),

    // -- SEO --
    seoField('seo'),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'slug.current', media: 'pictoMenu', famille: 'famille' },
    prepare: ({ title, subtitle, media, famille }) => ({
      title: title || 'Besoin sans titre',
      subtitle: [famille, subtitle ? `/besoins/${subtitle}` : '— slug à définir'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
