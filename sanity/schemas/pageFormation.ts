import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Page Formation — singleton.
 * Service transversal qui accompagne les 3 services principaux.
 * ⚠️ Aucune mention Qualiopi / OPCO / CPF / financement.
 */
export const pageFormation = defineType({
  name: 'pageFormation',
  title: 'Page Formation',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'content', title: 'Contenu' },
    { name: 'catalogue', title: 'Catalogue' },
    { name: 'pedagogie', title: 'Pédagogie & formats' },
    { name: 'maillage', title: 'Maillage services' },
    { name: 'faq', title: 'FAQ + CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // -- HERO --
    defineField({
      name: 'hero',
      title: 'Bloc 1 — Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// formation' }),
        defineField({ name: 'titre', title: 'Titre (H1)', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 4, validation: (r) => r.max(500) }),
        defineField({ name: 'ctaPrimaireLibelle', title: 'CTA primaire', type: 'string', initialValue: 'Parler de vos besoins de formation' }),
        defineField({ name: 'ctaSecondaireLibelle', title: 'CTA secondaire (lien ancre)', type: 'string', initialValue: 'Voir nos formations' }),
      ],
    }),

    // -- AUDIENCES (Bloc 2) --
    defineField({
      name: 'audiences',
      title: 'Bloc 2 — Pour qui',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// pour qui' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'cards',
          title: 'Cards publics (3 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'audienceCard',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Boussole (décideurs)', value: 'compass' },
                      { title: 'Équipes (métier)', value: 'users' },
                      { title: 'Clé (projet/déploiement)', value: 'wrench' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'compass',
                }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(280) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'icone' } },
            }),
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),

    // -- CONSTAT (Bloc 3) --
    defineField({
      name: 'constat',
      title: 'Bloc 3 — Le constat',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// le constat' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes (3 typiquement). Encadrer un fragment avec **...** pour le mettre en blanc emphase.',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (r) => r.min(1).max(5),
        }),
      ],
    }),

    // -- CATALOGUE (Bloc 4) --
    defineField({
      name: 'catalogue',
      title: 'Bloc 4 — Catalogue (familles + formations)',
      type: 'object',
      group: 'catalogue',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// nos formations' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({
          name: 'familles',
          title: 'Familles (3 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'famille',
              fields: [
                defineField({ name: 'label', title: 'Label mono', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'tagline', title: 'Tagline / intention', type: 'string', validation: (r) => r.required().max(120) }),
                defineField({
                  name: 'formations',
                  title: 'Formations',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      name: 'formation',
                      fields: [
                        defineField({ name: 'numero', title: 'Numéro (01, 02, ...)', type: 'string', validation: (r) => r.required().max(3) }),
                        defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(120) }),
                        defineField({ name: 'public', title: 'Public cible', type: 'string', validation: (r) => r.required().max(120) }),
                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(320) }),
                        defineField({ name: 'duree', title: 'Durée', type: 'string', validation: (r) => r.required().max(80) }),
                      ],
                      preview: { select: { title: 'titre', subtitle: 'numero' } },
                    }),
                  ],
                  validation: (r) => r.min(1).max(6),
                }),
              ],
              preview: { select: { title: 'tagline', subtitle: 'label' } },
            }),
          ],
          validation: (r) => r.min(1).max(5),
        }),
      ],
    }),

    // -- PÉDAGOGIE (Bloc 5) --
    defineField({
      name: 'pedagogie',
      title: 'Bloc 5 — Pédagogie',
      type: 'object',
      group: 'pedagogie',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// notre pédagogie' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({
          name: 'principes',
          title: 'Principes (4 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'principe',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', type: 'string', validation: (r) => r.required().max(3) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            }),
          ],
          validation: (r) => r.min(2).max(6),
        }),
      ],
    }),

    // -- FORMATS (Bloc 6) --
    defineField({
      name: 'formats',
      title: 'Bloc 6 — Formats',
      type: 'object',
      group: 'pedagogie',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// formats' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'cards',
          title: 'Cards formats (4 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'formatCard',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Grid (sur-mesure)', value: 'grid' },
                      { title: 'Bâtiment (intra)', value: 'building' },
                      { title: 'Écran (présentiel/distanciel)', value: 'monitor' },
                      { title: 'Chart (modulable)', value: 'chart' },
                    ],
                    layout: 'dropdown',
                  },
                  initialValue: 'grid',
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

    // -- TRANSVERSALE (Bloc 7) --
    defineField({
      name: 'transversale',
      title: 'Bloc 7 — Transversale (services associés)',
      type: 'object',
      group: 'maillage',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// transversale' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'liens',
          title: 'Liens services (3 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'lienService',
              fields: [
                defineField({
                  name: 'service',
                  title: 'Service référencé',
                  type: 'reference',
                  to: [{ type: 'pageService' }],
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'numero', title: 'Numéro affiché (01, 02, 03)', type: 'string', validation: (r) => r.max(3) }),
                defineField({ name: 'pitch', title: 'Pitch (1 ligne)', type: 'string', validation: (r) => r.required().max(180) }),
              ],
              preview: { select: { title: 'service.titre', subtitle: 'pitch' } },
            }),
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),

    // -- FAQ (Bloc 8) --
    defineField({
      name: 'faq',
      title: 'Bloc 8 — FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// vos questions' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'qa',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
                defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(800) }),
              ],
              preview: { select: { title: 'question' } },
            }),
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),

    // -- CTA FINAL (Bloc 9) --
    defineField({
      name: 'ctaFinal',
      title: 'Bloc 9 — CTA final',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// commencer' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({ name: 'ctaPrimaireLibelle', title: 'CTA primaire', type: 'string', initialValue: 'Parler de vos besoins de formation' }),
        defineField({ name: 'ctaSecondaireLibelle', title: 'CTA secondaire', type: 'string', initialValue: 'Découvrir nos services' }),
        defineField({ name: 'mention', title: 'Mention discrète', type: 'string', initialValue: 'Réponse sous 24 h · Sans engagement' }),
      ],
    }),

    // -- SERVICES LINKS (Bloc 10) --
    defineField({
      name: 'services',
      title: 'Bloc 10 — Cards services',
      type: 'object',
      group: 'maillage',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// nos expertises' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'cards',
          title: 'Cards (3 services)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'serviceLinkCard',
              fields: [
                defineField({
                  name: 'service',
                  title: 'Service référencé',
                  type: 'reference',
                  to: [{ type: 'pageService' }],
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'eyebrow', title: 'Eyebrow (« Service 01 »)', type: 'string', validation: (r) => r.max(40) }),
                defineField({ name: 'pitch', title: 'Pitch (1 ligne)', type: 'string', validation: (r) => r.required().max(160) }),
              ],
              preview: { select: { title: 'service.titre', subtitle: 'eyebrow' } },
            }),
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),

    // -- SEO --
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'titre', title: 'Balise <title>', type: 'string', validation: (r) => r.max(70) }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (r) => r.max(180) }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Formation' }),
  },
})
