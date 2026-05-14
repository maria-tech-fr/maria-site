import { defineField, defineType } from 'sanity'

/**
 * Doc type des pages "besoin" (par cas d'usage). Parallèle à pageService.
 * À ce stade : on saisit les métadonnées pour alimenter le sous-menu de la
 * nav. Les pages /besoins/[slug] viendront dans un second temps — on
 * ajoutera alors les champs hero, sections, etc.
 */
export const pageBesoin = defineType({
  name: 'pageBesoin',
  title: 'Page besoin',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Métadonnées', default: true },
  ],
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre de la page (BO uniquement)',
      description: 'Sert au listing dans le studio. Ex : « Industrialiser ma production de contenus ».',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'L’adresse sera /besoins/<slug> quand la page sera publiée.',
      type: 'slug',
      group: 'meta',
      options: { source: 'titre', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ordreMenu',
      title: 'Ordre dans le sous-menu',
      description: 'Numéro d’ordre (1, 2, 3…). Plus petit = en premier.',
      type: 'number',
      group: 'meta',
      validation: (r) => r.required().min(1).max(99),
    }),
    defineField({
      name: 'introCourte',
      title: 'Intro courte (sous-menu)',
      description: 'Phrase courte affichée sous le titre dans le sous-menu.',
      type: 'text',
      rows: 2,
      group: 'meta',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'pictoMenu',
      title: 'Picto sous-menu',
      description: 'Petit picto (SVG ou PNG). Optionnel — un picto par défaut est utilisé sinon.',
      type: 'image',
      group: 'meta',
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'slug.current', media: 'pictoMenu' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Besoin sans titre',
      subtitle: subtitle ? `/besoins/${subtitle}` : '— slug à définir',
      media,
    }),
  },
})
