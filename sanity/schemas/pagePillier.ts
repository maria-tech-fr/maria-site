import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Doc-type des pages piliers — gabarit mutualisé entre /services et /besoins.
 * 6 blocs communs (hero, vision, articulation, whyMaria, faq, finalCta).
 * Le 7e bloc — central — diffère selon le pilier et est injecté côté code
 * (ServicesCentralBlock pour services, NeedsCentralBlock pour besoins).
 *
 * Convention : un document par pilier, identifié par le champ `slug`.
 * IDs Sanity recommandés : pagePillierServices, pagePillierBesoins.
 */
export const pagePillier = defineType({
  name: 'pagePillier',
  title: 'Page pilier',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Méta', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'vision', title: 'Vision' },
    { name: 'central', title: 'Bloc central (en-tête)' },
    { name: 'articulation', title: 'Articulation' },
    { name: 'why', title: 'Pourquoi maria' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug pilier',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Services (/services)', value: 'services' },
          { title: 'Besoins (/besoins)', value: 'besoins' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),

    // -- HERO --
    defineField({
      name: 'hero',
      title: 'Bloc 1 — Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// services' }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Encadrer un fragment avec **...** pour le surligner en jaune.',
          type: 'text',
          rows: 2,
          validation: (r) => r.required().max(240),
        }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 4, validation: (r) => r.max(500) }),
        defineField({ name: 'ctaPrimaireLibelle', title: 'CTA primaire', type: 'string', initialValue: 'Parler de votre projet' }),
        defineField({ name: 'ctaPrimaireHref', title: 'CTA primaire destination', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'ctaSecondaireLibelle', title: 'CTA secondaire (lien ancre)', type: 'string', initialValue: 'Voir les 3 services' }),
        defineField({ name: 'ctaSecondaireAncre', title: 'Ancre du CTA secondaire', type: 'string', initialValue: '#central' }),
      ],
    }),

    // -- VISION --
    defineField({
      name: 'vision',
      title: 'Bloc 2 — Vision / Constat',
      type: 'object',
      group: 'vision',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// notre approche' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes',
          description: 'Encadrer un fragment avec **...** pour mettre en gras emphase (color ink, weight 500).',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),

    // -- BLOC CENTRAL (en-tête) --
    defineField({
      name: 'central',
      title: 'Bloc 3 — Bloc central (en-tête)',
      description: 'Sur-titre + titre + sous-titre de la section qui liste les 3 services (ou les besoins). Les cards elles-mêmes sont alimentées automatiquement depuis les pages Services / Besoins.',
      type: 'object',
      group: 'central',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.max(80) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.max(200) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 3, validation: (r) => r.max(400) }),
      ],
    }),

    // -- ARTICULATION (Bloc 4) --
    defineField({
      name: 'articulation',
      title: 'Bloc 4 — Articulation',
      type: 'object',
      group: 'articulation',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// comment ça s’articule' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'etapes',
          title: 'Étapes de la frise',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'etapePillier',
              fields: [
                defineField({ name: 'numero', title: 'Numéro (01...)', type: 'string', validation: (r) => r.required().max(3) }),
                defineField({ name: 'verbe', title: 'Verbe (Cadrer / Construire...)', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'titre', title: 'Sous-titre (nom du service)', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description courte', type: 'string', validation: (r) => r.required().max(160) }),
              ],
              preview: { select: { title: 'verbe', subtitle: 'numero' } },
            }),
          ],
          validation: (r) => r.min(2).max(6),
        }),
        defineField({
          name: 'transversal',
          title: 'Bandeau transversal (optionnel)',
          description: 'Pour signaler un élément qui traverse toute l’offre (ex: Formation sur /services).',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label mono', type: 'string', initialValue: '// transversal' }),
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(120) }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.max(400) }),
            defineField({ name: 'ctaLibelle', title: 'CTA libellé', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA destination', type: 'string' }),
          ],
        }),
      ],
    }),

    // -- POURQUOI MARIA --
    defineField({
      name: 'whyMaria',
      title: 'Bloc 5 — Pourquoi maria',
      type: 'object',
      group: 'why',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// pourquoi maria' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'piliers',
          title: 'Piliers (4 typiquement)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'pilier',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Bouclier + coche (maîtrise)', value: 'shield' },
                      { title: 'Cadenas (sécurité)', value: 'lock' },
                      { title: 'Silhouette (humain)', value: 'user' },
                      { title: 'Point d’interrogation (anti-bullshit)', value: 'question' },
                      { title: 'Engrenage', value: 'gear' },
                      { title: 'Étincelle', value: 'sparkles' },
                    ],
                    layout: 'dropdown',
                  },
                  initialValue: 'shield',
                }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'icone' } },
            }),
          ],
          validation: (r) => r.min(2).max(6),
        }),
        defineField({
          name: 'charteLien',
          title: 'Lien Charte IA (sous la grille)',
          type: 'object',
          fields: [
            defineField({ name: 'texte', title: 'Phrase d’intro', type: 'string', initialValue: 'Ces engagements sont publics et opposables.' }),
            defineField({ name: 'libelle', title: 'Libellé du lien', type: 'string', initialValue: 'Lire notre charte de gouvernance IA' }),
            defineField({ name: 'href', title: 'Destination', type: 'string', initialValue: '/charte-ia' }),
          ],
        }),
      ],
    }),

    // -- FAQ (Bloc 6) --
    defineField({
      name: 'faq',
      title: 'Bloc 6 — FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', initialValue: '// vos questions' }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2 }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'qa',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
                defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(800) }),
              ],
              preview: { select: { title: 'question' } },
            }),
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),

    // Note : pas de CTA final propre à la page pilier. Le bloc CTA
    // « Un projet IA en tête » du footer global tient ce rôle pour les
    // 2 piliers (services + besoins).

    // -- SEO --
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'titre', title: 'Balise <title>', type: 'string', validation: (r) => r.max(80) }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (r) => r.max(200) }),
      ],
    }),
  ],
  preview: {
    select: { slug: 'slug' },
    prepare: ({ slug }) => ({
      title: slug === 'services' ? 'Page pilier — Services' : slug === 'besoins' ? 'Page pilier — Besoins' : 'Page pilier (slug à définir)',
      subtitle: slug ? `/${slug}` : undefined,
    }),
  },
})
