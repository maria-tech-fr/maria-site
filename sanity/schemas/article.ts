import { defineField, defineType } from 'sanity'

/**
 * Article du blog. Body en Portable Text Sanity (rich text natif).
 * Pour V1 le `readingTime` est saisi manuellement. On pourra l'auto-calculer
 * plus tard depuis le décompte de mots du body.
 */
export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Métadonnées', default: true },
    { name: 'contenu', title: 'Contenu' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'L’adresse sera /blog/<slug>.',
      type: 'slug',
      group: 'meta',
      options: { source: 'titre', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Résumé de 2-3 phrases affiché dans la vignette de la grille. Max 240 caractères.',
      type: 'text',
      rows: 3,
      group: 'meta',
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'articleCategorie' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'auteur' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'meta',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm' },
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      description: 'Saisi manuellement pour V1. Compter ~200 mots/minute.',
      type: 'number',
      group: 'meta',
      validation: (r) => r.required().min(1).max(120),
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Article en vedette',
      description: 'Cocher pour mettre l’article en avant en haut de /blog. Un seul article featured devrait être actif à la fois — sinon on prend le plus récent featured.',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          description: 'Description de l’image pour l’accessibilité et le SEO. Obligatoire.',
          type: 'string',
          validation: (r) => r.required().max(160),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      group: 'contenu',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraphe', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL', validation: (r) => r.required() }),
                  defineField({ name: 'blank', type: 'boolean', title: 'Ouvrir dans un nouvel onglet', initialValue: false }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'legende',
              title: 'Légende',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO (overrides)',
      type: 'object',
      group: 'seo',
      description: 'Optionnel. Laisser vide pour reprendre le titre / excerpt / cover de l’article.',
      fields: [
        defineField({
          name: 'titre',
          title: 'Titre SEO',
          description: 'Si différent du titre principal. Max 70 caractères.',
          type: 'string',
          validation: (r) => r.max(70),
        }),
        defineField({
          name: 'description',
          title: 'Meta description',
          description: 'Max 160 caractères. Sinon excerpt est utilisé.',
          type: 'text',
          rows: 2,
          validation: (r) => r.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Image Open Graph',
          description: 'Si différente de l’image de couverture. Format 1200x630 idéal.',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Plus récents',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Plus anciens',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      categorie: 'categorie.libelle',
      auteur: 'auteur.nom',
      featured: 'featured',
      media: 'coverImage',
    },
    prepare: ({ title, categorie, auteur, featured, media }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [categorie, auteur].filter(Boolean).join(' · ') || '— catégorie & auteur à définir',
      media,
    }),
  },
})
