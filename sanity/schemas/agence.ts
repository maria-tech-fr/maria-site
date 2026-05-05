import { defineField, defineType } from 'sanity'

export const agence = defineType({
  name: 'agence',
  title: 'Page agence',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'manifeste', title: 'Manifeste' },
    { name: 'valeurs', title: 'Valeurs' },
    { name: 'nonNegociables', title: 'Non-négociables' },
    { name: 'processus', title: 'Processus' },
    { name: 'technos', title: 'Technos' },
    { name: 'engagements', title: 'Engagements' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'surTitre',
          title: 'Sur-titre',
          type: 'string',
          validation: (r) => r.required().max(60),
        }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Le H1 de la page. Les retours à la ligne sont respectés.',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(160),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(400),
        }),
      ],
    }),
    defineField({
      name: 'manifeste',
      title: 'Bloc manifeste',
      type: 'object',
      group: 'manifeste',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'surTitre',
          title: 'Sur-titre',
          type: 'string',
          validation: (r) => r.required().max(60),
        }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          type: 'text',
          rows: 2,
          validation: (r) => r.required().max(120),
        }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes',
          description:
            'Texte explicatif. Chaque paragraphe peut être mis en valeur (texte plus appuyé, plus noir).',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'paragrapheManifeste',
              fields: [
                defineField({
                  name: 'texte',
                  title: 'Texte',
                  type: 'text',
                  rows: 4,
                  validation: (r) => r.required().max(500),
                }),
                defineField({
                  name: 'emphase',
                  title: 'Mise en valeur',
                  description:
                    'Aucune : texte régulier · Totale : tout le paragraphe en appuyé · Première phrase : seule la première phrase est appuyée, le reste est régulier (continuum dans le même paragraphe).',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Aucune', value: 'aucune' },
                      { title: 'Totale', value: 'totale' },
                      { title: 'Première phrase uniquement', value: 'premiere-phrase' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'aucune',
                  validation: (r) => r.required(),
                }),
              ],
              preview: {
                select: { title: 'texte', subtitle: 'emphase' },
                prepare: ({ title, subtitle }) => ({
                  title: title || '(sans texte)',
                  subtitle: subtitle ? 'Mis en valeur' : undefined,
                }),
              },
            },
          ],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'valeurs',
      title: 'Bloc valeurs',
      type: 'object',
      group: 'valeurs',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'surTitre',
          title: 'Sur-titre',
          type: 'string',
          validation: (r) => r.required().max(60),
        }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          type: 'string',
          validation: (r) => r.required().max(120),
        }),
        defineField({
          name: 'principes',
          title: 'Principes',
          description: 'Liste des valeurs (3 à 6 recommandés)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'principeValeur',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Pictogramme',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Maîtrise (cible)', value: 'maitrise' },
                      { title: 'Transparence (œil)', value: 'transparence' },
                      { title: 'Sécurité (bouclier)', value: 'securite' },
                      { title: 'Humanité (silhouette)', value: 'humanite' },
                    ],
                    layout: 'dropdown',
                  },
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'nom',
                  title: 'Nom de la valeur',
                  type: 'string',
                  validation: (r) => r.required().max(40),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (r) => r.required().max(240),
                }),
              ],
              preview: { select: { title: 'nom', subtitle: 'icone' } },
            },
          ],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'nonNegociables',
      title: 'Bloc non-négociables',
      type: 'object',
      group: 'nonNegociables',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', validation: (r) => r.required().max(120) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'string', validation: (r) => r.max(160) }),
        defineField({
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'pointNonNegociable',
              fields: [
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'description' } },
            },
          ],
          validation: (r) => r.min(1).max(8),
        }),
      ],
    }),
    defineField({
      name: 'processus',
      title: 'Bloc processus',
      type: 'object',
      group: 'processus',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', validation: (r) => r.required().max(120) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'string', validation: (r) => r.max(160) }),
        defineField({
          name: 'etapes',
          title: 'Étapes',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'etapeProcessus',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            },
          ],
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),
    defineField({
      name: 'technos',
      title: 'Bloc technos',
      type: 'object',
      group: 'technos',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2, validation: (r) => r.max(240) }),
        defineField({
          name: 'categories',
          title: 'Catégories',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'categorieTechno',
              fields: [
                defineField({ name: 'surTitre', title: 'Sur-titre', description: 'Ex : « // catégorie 01 »', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({
                  name: 'technos',
                  title: 'Technos',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (r) => r.min(1).max(12),
                }),
              ],
              preview: { select: { title: 'titre', subtitle: 'surTitre' } },
            },
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),
    defineField({
      name: 'engagements',
      title: 'Bloc engagements',
      type: 'object',
      group: 'engagements',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 3, validation: (r) => r.required().max(120) }),
        defineField({
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Bloc FAQ',
      type: 'object',
      group: 'faq',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'questionFaq',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required().max(160) }),
                defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(800) }),
              ],
              preview: { select: { title: 'question' } },
            },
          ],
          validation: (r) => r.min(1).max(20),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page agence' }),
  },
})
