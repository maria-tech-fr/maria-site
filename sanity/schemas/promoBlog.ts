import { defineField, defineType } from 'sanity'

/**
 * Vignette promo affichée dans la grille du listing /blog.
 * Plusieurs vignettes possibles, chacune avec sa position (7, 15, etc.)
 * dans la grille. Elles ne sont pas filtrables/triables.
 */
export const promoBlog = defineType({
  name: 'promoBlog',
  title: 'Vignette promo (blog)',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position dans la grille',
      description: 'À quelle position de la grille la vignette doit apparaître. Ex : 7 = à la 7ᵉ position. Éviter les fins de ligne (positions multiples de 3 sur grille 3-cols).',
      type: 'number',
      validation: (r) => r.required().min(1).max(48),
    }),
    defineField({
      name: 'label',
      title: 'Eyebrow / Label',
      description: 'Ex : « // nos services ». Rendu en MAJUSCULES mono.',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: 'lienLibelle',
      title: 'CTA — libellé',
      description: 'Ex : « Découvrir nos services →». La flèche est ajoutée automatiquement si manquante.',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'lienHref',
      title: 'CTA — destination',
      description: 'Chemin interne (ex : « /services/agents-ia ») ou URL externe.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variante de fond',
      type: 'string',
      options: {
        list: [
          { title: 'Jaune (accent)', value: 'yellow' },
          { title: 'Vert (success)', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'yellow',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'actif',
      title: 'Actif',
      description: 'Décocher pour masquer temporairement la vignette sans la supprimer.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Par position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'label', position: 'position', actif: 'actif' },
    prepare: ({ title, subtitle, position, actif }) => ({
      title: actif === false ? `[inactive] ${title}` : title,
      subtitle: `Position ${position} · ${subtitle}`,
    }),
  },
})
