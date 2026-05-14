import { defineField, defineType } from 'sanity'

/**
 * Catégorie d'article du blog. Doc type partagé par tous les articles.
 * Le slug sert à la fois pour le filtre `/blog?category=X` et pour la
 * page catégorie dédiée `/blog/categorie/X` (indexable SEO).
 */
export const articleCategorie = defineType({
  name: 'articleCategorie',
  title: 'Catégorie d’article',
  type: 'document',
  fields: [
    defineField({
      name: 'libelle',
      title: 'Libellé',
      description: 'Ex : « Stratégie IA ». Utilisé partout : chips de filtre, titres SEO, etc.',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Identifiant URL. Ex : « strategie-ia ».',
      type: 'slug',
      options: { source: 'libelle', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (SEO page catégorie)',
      description: 'Phrase qui apparaît en haut de la page /blog/categorie/<slug> et dans la meta description. Max 240 caractères.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
  ],
  preview: {
    select: { title: 'libelle', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Catégorie sans libellé',
      subtitle: subtitle ? `/${subtitle}` : '— slug à définir',
    }),
  },
})
