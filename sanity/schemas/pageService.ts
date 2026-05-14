import { defineField, defineType } from 'sanity'

/**
 * Doc type des pages services. Une page = un document avec slug administrable.
 * Pour ajouter Service 2/3 ou 3/3, on duplique depuis le studio et on remplit.
 *
 * Convention emphase dans les titres : on entoure le fragment à mettre en
 * accent avec `**...**`. Le composant rendra ce span dans une couleur
 * différente (gris foncé pour le hero, jaune pour le constat).
 */
export const pageService = defineType({
  name: 'pageService',
  title: 'Page service',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Métadonnées', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'pourQui', title: 'Pour qui' },
    { name: 'constat', title: 'Constat' },
    { name: 'livrable', title: 'Livrable' },
    { name: 'methode', title: 'Méthode' },
  ],
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre de la page (BO uniquement)',
      description: 'Sert au listing dans le studio. Ex : « Audit & stratégie IA ».',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'L’adresse de la page sera /services/<slug>.',
      type: 'slug',
      group: 'meta',
      options: { source: 'titre', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', description: 'Ex : « // service — audit & stratégie IA »', type: 'string', validation: (r) => r.required().max(80) }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Multi-lignes via retour à la ligne. Encadrer un fragment avec **...** pour le rendre en gris foncé (#383838) — utile pour mettre une partie du titre en retrait visuel.',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
        defineField({ name: 'ctaLibelle', title: 'CTA — libellé', description: 'Ex : « Démarrer un audit → ». La flèche est ajoutée automatiquement si manquante.', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'ctaHref', title: 'CTA — destination', description: 'Chemin interne (ex : « /contact ») ou URL externe. Laisser vide tant que le contact n’existe pas — le CTA pointera vers # par défaut.', type: 'string' }),
      ],
    }),
    defineField({
      name: 'pourQui',
      title: 'Bloc « Pour qui »',
      type: 'object',
      group: 'pourQui',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({
          name: 'cards',
          title: 'Cards (jusqu’à 4)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'cardPourQui',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', description: 'Affiché en vert. Ex : « 01 ».', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(280) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            },
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),
    defineField({
      name: 'constat',
      title: 'Bloc « Constat »',
      type: 'object',
      group: 'constat',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          description: 'Encadrer un fragment avec **...** pour le rendre en jaune accent.',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes (1 ou 2)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'paragrapheConstat',
              fields: [
                defineField({ name: 'texte', title: 'Texte régulier (gris clair)', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
                defineField({ name: 'emphase', title: 'Emphase (blanc semi-bold, accolée à la fin)', type: 'text', rows: 2, validation: (r) => r.max(280) }),
              ],
              preview: { select: { title: 'texte' } },
            },
          ],
          validation: (r) => r.min(1).max(3),
        }),
      ],
    }),
    defineField({
      name: 'livrable',
      title: 'Bloc « Ce que vous obtenez »',
      type: 'object',
      group: 'livrable',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2, validation: (r) => r.max(240) }),
        defineField({
          name: 'items',
          title: 'Livrables (1 à 12)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'livrableItem',
              fields: [
                defineField({ name: 'picto', title: 'Picto (SVG ou PNG)', description: 'Optionnel — un picto par défaut est utilisé sinon.', type: 'image' }),
                defineField({ name: 'numero', title: 'Numéro', description: 'Affiché en vert. Ex : « 01 ».', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(280) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero', media: 'picto' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),
    defineField({
      name: 'methode',
      title: 'Bloc « Notre approche »',
      type: 'object',
      group: 'methode',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2, validation: (r) => r.max(240) }),
        defineField({
          name: 'etapes',
          title: 'Étapes (jusqu’à 6)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'etapeMethode',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', description: 'Gros chiffre jaune. Ex : « 01 ».', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'libelle', title: 'Libellé court (sur-titre uppercase)', description: 'Ex : « Découverte ». Sera affiché en MAJUSCULES.', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(280) }),
                defineField({ name: 'duree', title: 'Durée', description: 'Ex : « 1 à 2 semaines ». Affichée en jaune.', type: 'string', validation: (r) => r.required().max(40) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'libelle' } },
            },
          ],
          validation: (r) => r.min(1).max(6),
        }),
        defineField({ name: 'lienLibelle', title: 'Lien — libellé', description: 'Ex : « Voir notre méthode complète → ».', type: 'string' }),
        defineField({ name: 'lienHref', title: 'Lien — destination', description: 'Par défaut /agence#processus.', type: 'string', initialValue: '/agence#processus' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Page service sans titre',
      subtitle: subtitle ? `/services/${subtitle}` : '— slug à définir',
    }),
  },
})
