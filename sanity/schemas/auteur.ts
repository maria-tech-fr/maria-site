import { defineField, defineType } from 'sanity'

/**
 * Auteur d'article. Doc type réutilisable — un article référence un auteur.
 * Permet d'ajouter autant d'auteurs que nécessaire depuis le Studio.
 */
export const auteur = defineType({
  name: 'auteur',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      description: 'Ex : « Mathieu Hernandez » ou « L’équipe maria ».',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / fonction',
      description: 'Optionnel. Ex : « Co-fondateur », « Agence digitale 100% IA ».',
      type: 'string',
      validation: (r) => r.max(120),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar / photo',
      description: 'Optionnel. Photo carrée idéalement.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      description: 'Optionnel. 1-2 phrases affichées sous l’article ou sur sa page profil.',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(300),
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'role', media: 'avatar' },
  },
})
