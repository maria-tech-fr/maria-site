import { defineArrayMember, defineField, defineType } from 'sanity'
import { seoField } from './fields/seo'

/**
 * Page Charte de gouvernance IA — singleton.
 * Document daté et versionné. La date `lastUpdated` est affichée publiquement
 * et utilisée comme `lastmod` dans le sitemap (changefreq yearly).
 */
export const pageCharteIA = defineType({
  name: 'pageCharteIA',
  title: 'Page Charte IA',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'contenu', title: 'Contenu' },
    { name: 'engagements', title: 'Engagements & lignes rouges' },
    { name: 'meta', title: 'Révision & SEO' },
  ],
  fields: [
    // -- HERO --
    defineField({
      name: 'hero',
      title: 'Bloc 1 — Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// charte de gouvernance ia' }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Encadrer un fragment avec **...** pour le mettre en jaune accent.',
          type: 'text',
          rows: 2,
          validation: (r) => r.required().max(240),
        }),
        defineField({
          name: 'sousTitre',
          title: 'Sous-titre',
          type: 'text',
          rows: 3,
          validation: (r) => r.max(500),
        }),
      ],
    }),

    // -- PRÉAMBULE --
    defineField({
      name: 'preambule',
      title: 'Bloc 2 — Préambule',
      type: 'object',
      group: 'contenu',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// préambule' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes',
          description: 'Encadrer un fragment avec **...** pour mettre en blanc emphase (sur fond clair, sera lu comme accent fort).',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),

    // -- ENGAGEMENTS (11) --
    defineField({
      name: 'engagements',
      title: 'Bloc 3 — Engagements',
      type: 'object',
      group: 'engagements',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// nos engagements' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Engagements (11 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'engagement',
              fields: [
                defineField({ name: 'numero', title: 'Numéro (01, 02, ...)', type: 'string', validation: (r) => r.required().max(3) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(160) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(800) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            }),
          ],
          validation: (r) => r.min(1).max(15),
        }),
      ],
    }),

    // -- LIGNES ROUGES (5) --
    defineField({
      name: 'lignesRouges',
      title: 'Bloc 4 — Lignes rouges',
      type: 'object',
      group: 'engagements',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// lignes rouges' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'intro', title: 'Intro courte', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Lignes rouges (5 typiquement)',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),

    // -- DISCLAIMER --
    defineField({
      name: 'disclaimer',
      title: 'Bloc 5 — Disclaimer « ce que ce n’est pas »',
      type: 'object',
      group: 'contenu',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// ce que cette charte n’est pas' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (r) => r.min(1).max(5),
        }),
      ],
    }),

    // -- CTA --
    defineField({
      name: 'cta',
      title: 'Bloc 7 — CTA final',
      type: 'object',
      group: 'contenu',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// engagement réciproque' }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          description: 'Encadrer un fragment avec **...** pour le rendre en jaune.',
          type: 'text',
          rows: 2,
        }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2 }),
        defineField({ name: 'ctaLibelle', title: 'CTA libellé', type: 'string', initialValue: 'Parler à maria' }),
        defineField({ name: 'ctaHref', title: 'CTA destination', type: 'string', initialValue: '/contact' }),
      ],
    }),

    // -- RÉVISION (Bloc 6) --
    defineField({
      name: 'revision',
      title: 'Bloc 6 — Date de révision',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({
          name: 'lastUpdated',
          title: 'Dernière mise à jour',
          description: 'Date qui pilote le bloc « révision » et le lastmod du sitemap.',
          type: 'date',
          options: { dateFormat: 'YYYY-MM-DD' },
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'mention',
          title: 'Mention sous la date',
          type: 'text',
          rows: 2,
          initialValue: 'Toute modification matérielle de ces engagements sera datée et explicitée.',
        }),
      ],
    }),

    // -- SEO --
    seoField('meta'),
  ],
  preview: {
    select: { lastUpdated: 'revision.lastUpdated' },
    prepare: ({ lastUpdated }) => ({
      title: 'Charte de gouvernance IA',
      subtitle: lastUpdated ? `Mise à jour : ${lastUpdated}` : '— à éditer',
    }),
  },
})
