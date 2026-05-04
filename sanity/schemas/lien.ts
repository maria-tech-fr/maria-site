import { defineField, defineType } from 'sanity'

export const lien = defineType({
  name: 'lien',
  title: 'Lien',
  type: 'object',
  fields: [
    defineField({
      name: 'libelle',
      title: 'Libellé',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'type',
      title: 'Type de destination',
      type: 'string',
      options: {
        list: [
          { title: 'Interne (page du site)', value: 'interne' },
          { title: 'Externe (URL complète)', value: 'externe' },
        ],
        layout: 'radio',
      },
      initialValue: 'interne',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cheminInterne',
      title: 'Chemin interne',
      description: 'Ex : /contact, /services, /projets/mon-projet',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'interne',
      validation: (r) =>
        r.custom((value, { parent }) => {
          const p = parent as { type?: string } | undefined
          if (p?.type !== 'interne') return true
          if (!value) return 'Requis pour un lien interne'
          if (typeof value !== 'string' || !value.startsWith('/')) {
            return 'Doit commencer par /'
          }
          return true
        }),
    }),
    defineField({
      name: 'urlExterne',
      title: 'URL externe',
      description: 'URL complète, https:// inclus',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'externe',
      validation: (r) =>
        r.custom((value, { parent }) => {
          const p = parent as { type?: string } | undefined
          if (p?.type !== 'externe') return true
          if (!value) return 'Requis pour un lien externe'
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'libelle',
      type: 'type',
      interne: 'cheminInterne',
      externe: 'urlExterne',
    },
    prepare: ({ title, type, interne, externe }) => ({
      title: title || '(sans libellé)',
      subtitle: type === 'interne' ? interne || '—' : externe || '—',
    }),
  },
})
