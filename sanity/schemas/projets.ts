import { defineField, defineType } from 'sanity'

export const projets = defineType({
  name: 'projets',
  title: 'Page projets',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'etudeDeCas', title: 'Étude de cas' },
    { name: 'savoirFaire', title: 'Savoir-faire' },
    { name: 'projetsPasses', title: 'Projets passés' },
    { name: 'projetsAVenir', title: 'Projets à venir' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H1)', description: 'Multi-lignes via retour à la ligne.', type: 'text', rows: 3, validation: (r) => r.required().max(160) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
      ],
    }),
    defineField({
      name: 'etudeDeCas',
      title: 'Bloc étude de cas',
      type: 'object',
      group: 'etudeDeCas',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre en-tête', description: 'Ex : « // projet en cours »', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titrePrefixe', title: 'Préfixe du titre (en jaune)', description: 'Ex : « Haomy Textiles | ». Optionnel — si renseigné, sera affiché en accent (jaune).', type: 'string' }),
        defineField({ name: 'titre', title: 'Titre principal', description: 'Ex : « Le CRM qui remet le commercial au centre »', type: 'text', rows: 2, validation: (r) => r.required().max(160) }),
        defineField({
          name: 'identite',
          title: 'Bandeau identité',
          type: 'object',
          fields: [
            defineField({ name: 'client', title: 'Client', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'secteur', title: 'Secteur', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'type', title: 'Type de projet', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'outils', title: 'Outils tiers', description: 'Liste séparée par virgules. Ex : Sage, Prestashop', type: 'string', validation: (r) => r.required().max(160) }),
            defineField({
              name: 'statut',
              title: 'Statut',
              type: 'string',
              options: {
                list: [
                  { title: 'TERMINÉ', value: 'termine' },
                  { title: 'EN COURS', value: 'en-cours' },
                  { title: 'À VENIR', value: 'a-venir' },
                ],
                layout: 'radio',
              },
              initialValue: 'termine',
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: 'contexte',
          title: 'Bloc contexte',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'texte', title: 'Texte (régulier)', type: 'text', rows: 4, validation: (r) => r.required().max(500) }),
            defineField({ name: 'emphase', title: 'Mise en valeur (optionnelle)', description: 'Phrase finale rendue en blanc semi-bold, accolée à la fin du texte régulier.', type: 'text', rows: 2, validation: (r) => r.max(240) }),
          ],
        }),
        defineField({
          name: 'defi',
          title: 'Bloc défi',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'texte', title: 'Texte (régulier)', type: 'text', rows: 4, validation: (r) => r.required().max(500) }),
            defineField({ name: 'emphase', title: 'Mise en valeur (optionnelle)', description: 'Phrase finale rendue en blanc semi-bold, accolée à la fin du texte régulier.', type: 'text', rows: 2, validation: (r) => r.max(240) }),
          ],
        }),
        defineField({
          name: 'approche',
          title: 'Bloc approche',
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre (H3)', type: 'string', initialValue: 'Notre approche' }),
            defineField({
              name: 'etapes',
              title: 'Étapes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'etapeApproche',
                  fields: [
                    defineField({ name: 'numeroLibelle', title: 'Numéro et libellé', description: 'Ex : « 01 — Cadrage »', type: 'string', validation: (r) => r.required().max(40) }),
                    defineField({ name: 'titre', title: 'Titre court', type: 'string', validation: (r) => r.required().max(60) }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(240) }),
                  ],
                  preview: { select: { title: 'titre', subtitle: 'numeroLibelle' } },
                },
              ],
              validation: (r) => r.min(1).max(8),
            }),
          ],
        }),
        defineField({
          name: 'fonctionnalites',
          title: 'Bloc fonctionnalités clés',
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre (H3)', type: 'string', initialValue: 'Les fonctionnalités clés' }),
            defineField({
              name: 'items',
              title: 'Fonctionnalités',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'fonctionnalite',
                  fields: [
                    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
                  ],
                  preview: { select: { title: 'titre', subtitle: 'description' } },
                },
              ],
              validation: (r) => r.min(1).max(12),
            }),
          ],
        }),
        defineField({
          name: 'apercuOutil',
          title: 'Bloc aperçu de l’outil',
          description: 'Cadre extérieur avec titre + 1 à 3 captures uploadables. La 1ère capture est affichée en grand à gauche, les 2 suivantes empilées à droite.',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'titre', title: 'Titre (H3)', type: 'string', validation: (r) => r.required().max(120) }),
            defineField({
              name: 'captures',
              title: 'Captures (1 à 3)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'capture',
                  fields: [
                    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                    defineField({ name: 'legende', title: 'Légende / alt', type: 'string', validation: (r) => r.max(120) }),
                  ],
                  preview: { select: { title: 'legende', media: 'image' } },
                },
              ],
              validation: (r) => r.max(3),
            }),
          ],
        }),
        defineField({
          name: 'citation',
          title: 'Citation dirigeant',
          type: 'object',
          fields: [
            defineField({ name: 'texte', title: 'Citation', description: 'Sans guillemets — ils sont ajoutés automatiquement.', type: 'text', rows: 4, validation: (r) => r.required().max(400) }),
            defineField({ name: 'auteur', title: 'Nom de l’auteur', type: 'string', validation: (r) => r.required().max(80) }),
            defineField({ name: 'role', title: 'Rôle', description: 'Ex : « Dirigeant — Haomy textiles »', type: 'string', validation: (r) => r.required().max(120) }),
          ],
        }),
        defineField({
          name: 'technos',
          title: 'Technos / outils utilisés',
          description: 'Liste de pills affichées en bas de l’étude de cas',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.max(20),
        }),
      ],
    }),
    defineField({
      name: 'savoirFaire',
      title: 'Bloc savoir-faire',
      type: 'object',
      group: 'savoirFaire',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
        defineField({
          name: 'cards',
          title: 'Cartes',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'cardSavoirFaire',
              fields: [
                defineField({ name: 'picto', title: 'Picto (SVG ou PNG)', description: 'Optionnel — un picto par défaut est utilisé sinon.', type: 'image' }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', media: 'picto' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),
    defineField({
      name: 'projetsPasses',
      title: 'Bloc projets passés',
      type: 'object',
      group: 'projetsPasses',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
        defineField({
          name: 'projets',
          title: 'Projets',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'projetPasse',
              fields: [
                defineField({ name: 'categorie', title: 'Catégorie', description: 'Ex : « // site e-commerce »', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'categorie' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),
    defineField({
      name: 'projetsAVenir',
      title: 'Bloc projets à venir',
      type: 'object',
      group: 'projetsAVenir',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
        defineField({
          name: 'projets',
          title: 'Projets à venir',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'projetAVenir',
              fields: [
                defineField({ name: 'picto', title: 'Picto (SVG ou PNG)', description: 'Optionnel — un picto par défaut est utilisé sinon.', type: 'image' }),
                defineField({ name: 'categorie', title: 'Catégorie', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
                defineField({ name: 'mention', title: 'Mention', description: 'Ex : « À venir »', type: 'string', initialValue: 'À venir', validation: (r) => r.required().max(40) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'categorie', media: 'picto' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page projets' }),
  },
})
