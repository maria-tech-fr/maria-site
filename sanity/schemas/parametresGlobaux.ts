import { defineField, defineType } from 'sanity'

export const parametresGlobaux = defineType({
  name: 'parametresGlobaux',
  title: 'Paramètres globaux',
  type: 'document',
  fields: [
    defineField({
      name: 'baseline',
      title: 'Baseline',
      description: 'Phrase courte affichée en pied de logo / SEO description',
      type: 'string',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation principale',
      description: 'Liens du header dans l\'ordre d\'affichage',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lienNav',
          title: 'Lien',
          fields: [
            defineField({
              name: 'libelle',
              title: 'Libellé',
              type: 'string',
              validation: (r) => r.required().max(40),
            }),
            defineField({
              name: 'href',
              title: 'Cible (chemin interne ou URL)',
              type: 'string',
              description: 'Ex : /services, /a-propos, /contact',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'libelle', subtitle: 'href' },
          },
        },
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'telephone', title: 'Téléphone', type: 'string' }),
        defineField({
          name: 'calendlyUrl',
          title: 'Lien Calendly',
          type: 'url',
          description: 'URL complète du lien de rendez-vous',
        }),
      ],
    }),
    defineField({
      name: 'reseauxSociaux',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reseau',
          title: 'Réseau',
          fields: [
            defineField({
              name: 'plateforme',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X (Twitter)', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                ],
                layout: 'dropdown',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'plateforme', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'mentionLegales',
          title: 'Mention légale (copyright)',
          type: 'string',
          description: "Ex : « © 2026 maria. Tous droits réservés. »",
        }),
        defineField({
          name: 'liensLegaux',
          title: 'Liens légaux',
          description: 'Mentions, CGU, politique de confidentialité…',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'lienLegal',
              fields: [
                defineField({ name: 'libelle', title: 'Libellé', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'href', title: 'Chemin', type: 'string', validation: (r) => r.required() }),
              ],
              preview: { select: { title: 'libelle', subtitle: 'href' } },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres globaux' }),
  },
})
