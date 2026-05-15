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
      name: 'sousTitre',
      title: 'Sous-titre (chapô)',
      description: 'Optionnel. Affiché sous le H1 sur la page article.',
      type: 'text',
      rows: 2,
      group: 'meta',
      validation: (r) => r.max(200),
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
      name: 'intro',
      title: 'Intro',
      description: 'Optionnelle. 2-3 phrases. Affichée uniquement sur le bloc « article à la une » (l\'article featured) — non affichée dans la grille du listing.',
      type: 'text',
      rows: 3,
      group: 'meta',
      validation: (r) => r.max(280),
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
      description: 'Optionnelle. Si non renseignée, un placeholder gradient maria est affiché.',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          description: 'Description de l’image pour l’accessibilité et le SEO. Obligatoire si une image est uploadée.',
          type: 'string',
          validation: (r) => r.max(160),
        }),
      ],
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
          name: 'imageBody',
          title: 'Image inline',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'legende', title: 'Légende', type: 'string' }),
          ],
        },
        {
          type: 'object',
          name: 'fullWidthImage',
          title: 'Image pleine largeur',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Texte alternatif', type: 'string', validation: (r) => r.required() }),
              ],
              validation: (r) => r.required(),
            }),
            defineField({ name: 'legende', title: 'Légende', type: 'string', validation: (r) => r.max(200) }),
          ],
          preview: {
            select: { title: 'image.alt', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Image pleine largeur', media }),
          },
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Encart « À retenir »',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(80) }),
            defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
          ],
          preview: {
            select: { title: 'titre', subtitle: 'texte' },
            prepare: ({ title, subtitle }) => ({
              title: title || 'À retenir',
              subtitle: subtitle ? subtitle.slice(0, 60) : undefined,
            }),
          },
        },
        {
          type: 'object',
          name: 'warning',
          title: 'Encart « Point de vigilance »',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(80) }),
            defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
          ],
          preview: {
            select: { title: 'titre', subtitle: 'texte' },
            prepare: ({ title, subtitle }) => ({
              title: title || 'Point de vigilance',
              subtitle: subtitle ? subtitle.slice(0, 60) : undefined,
            }),
          },
        },
        {
          type: 'object',
          name: 'video',
          title: 'Vidéo',
          fields: [
            defineField({
              name: 'source',
              title: 'Source',
              description: 'Lien YouTube/Vimeo/Loom OU fichier MP4 uploadé.',
              type: 'string',
              options: {
                list: [
                  { title: 'Lien (YouTube, Vimeo, Loom…)', value: 'url' },
                  { title: 'Fichier vidéo (MP4)', value: 'file' },
                ],
                layout: 'radio',
              },
              initialValue: 'url',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL de la vidéo',
              description: 'Lien public — YouTube, Vimeo, Loom. L\'embed est généré automatiquement.',
              type: 'url',
              hidden: ({ parent }) => parent?.source === 'file',
            }),
            defineField({
              name: 'fichier',
              title: 'Fichier vidéo (MP4)',
              description: 'Format recommandé : MP4 H.264. Affiché avec contrôles natifs HTML5.',
              type: 'file',
              options: { accept: 'video/mp4,video/webm' },
              hidden: ({ parent }) => parent?.source !== 'file',
            }),
            defineField({
              name: 'cover',
              title: 'Image de cover (optionnelle)',
              description: 'Affichée avant lecture (poster du <video>). Recommandée pour les MP4.',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.source !== 'file',
            }),
            defineField({
              name: 'legende',
              title: 'Légende',
              type: 'string',
              validation: (r) => r.max(200),
            }),
          ],
          preview: {
            select: { title: 'legende', subtitle: 'url', source: 'source' },
            prepare: ({ title, subtitle, source }) => ({
              title: title || 'Vidéo',
              subtitle: source === 'file' ? '(MP4 uploadé)' : subtitle,
            }),
          },
        },
        {
          type: 'object',
          name: 'inArticleCta',
          title: 'CTA en cours d\'article',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(120) }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
            defineField({ name: 'lienLibelle', title: 'Libellé du lien', type: 'string', initialValue: 'Découvrir →', validation: (r) => r.required().max(60) }),
            defineField({ name: 'lienHref', title: 'Destination', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'variant',
              title: 'Variante visuelle',
              type: 'string',
              options: {
                list: [
                  { title: 'Vert clair', value: 'green' },
                  { title: 'Jaune clair', value: 'yellow' },
                ],
                layout: 'radio',
              },
              initialValue: 'yellow',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'titre', subtitle: 'lienHref' },
          },
        },
      ],
    }),
    defineField({
      name: 'tocItems',
      title: 'Sommaire — overrides',
      description: 'Optionnel. Si laissé vide, le sommaire est généré automatiquement à partir de tous les H2 du contenu. Pour personnaliser, ajouter des entrées : chaque entrée doit pointer vers l\'anchor d\'un H2 (slug auto-généré depuis le texte du H2). Permet d\'exclure un H2 ou de modifier son libellé dans le sommaire.',
      type: 'array',
      group: 'contenu',
      of: [
        {
          type: 'object',
          name: 'tocItem',
          fields: [
            defineField({ name: 'anchor', title: 'Anchor du H2 (slug)', description: 'Ex : si le H2 est « Le constat », l\'anchor est « le-constat ».', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Libellé personnalisé (optionnel)', type: 'string', validation: (r) => r.max(80) }),
            defineField({ name: 'exclure', title: 'Exclure du sommaire', description: 'Si coché, ce H2 ne sera pas affiché dans le sommaire malgré sa présence dans le contenu.', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'label', subtitle: 'anchor', exclure: 'exclure' }, prepare: ({ title, subtitle, exclure }) => ({ title: title || subtitle, subtitle: exclure ? '⊘ exclu' : subtitle }) },
        },
      ],
    }),
    defineField({
      name: 'sidebarCta',
      title: 'CTA latéral (sous le sommaire)',
      description: 'Optionnel. Affiché en bas du sommaire sticky sur desktop.',
      type: 'object',
      group: 'contenu',
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(80) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.max(160) }),
        defineField({ name: 'lienLibelle', title: 'Libellé du lien', type: 'string', initialValue: 'En parler →', validation: (r) => r.max(40) }),
        defineField({ name: 'lienHref', title: 'Destination', type: 'string' }),
        defineField({
          name: 'variant',
          title: 'Variante visuelle',
          type: 'string',
          options: {
            list: [
              { title: 'Vert clair', value: 'green' },
              { title: 'Jaune clair', value: 'yellow' },
            ],
            layout: 'radio',
          },
          initialValue: 'green',
        }),
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
