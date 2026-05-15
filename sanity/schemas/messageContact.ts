import { defineField, defineType } from 'sanity'

/**
 * Soumission du formulaire de contact. Stocké dans Sanity pour avoir un
 * dashboard des messages reçus, indépendamment de Resend.
 */
export const messageContact = defineType({
  name: 'messageContact',
  title: 'Message contact',
  type: 'document',
  fields: [
    defineField({
      name: 'statut',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '🟡 À lire', value: 'a-lire' },
          { title: '🟢 Traité', value: 'traite' },
          { title: '🗄 Archivé', value: 'archive' },
          { title: '🚫 Spam', value: 'spam' },
        ],
        layout: 'radio',
      },
      initialValue: 'a-lire',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'prenom', title: 'Prénom', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'telephone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 8, validation: (r) => r.required() }),
    defineField({
      name: 'submittedAt',
      title: 'Date de soumission',
      type: 'datetime',
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: 'meta',
      title: 'Métadonnées techniques',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'ip', title: 'IP (hash)', type: 'string' }),
        defineField({ name: 'userAgent', title: 'User-Agent', type: 'string' }),
        defineField({ name: 'referer', title: 'Referer', type: 'string' }),
      ],
    }),
    defineField({ name: 'noteInterne', title: 'Note interne', description: 'Réservé à l\'équipe pour annoter le message.', type: 'text', rows: 3 }),
  ],
  orderings: [
    {
      title: 'Plus récents',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { prenom: 'prenom', nom: 'nom', email: 'email', statut: 'statut', date: 'submittedAt' },
    prepare: ({ prenom, nom, email, statut, date }) => {
      const tag = statut === 'a-lire' ? '🟡' : statut === 'traite' ? '🟢' : statut === 'spam' ? '🚫' : '🗄'
      const d = date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : ''
      return {
        title: `${tag} ${prenom ?? ''} ${nom ?? ''}`,
        subtitle: [email, d].filter(Boolean).join(' · '),
      }
    },
  },
})
