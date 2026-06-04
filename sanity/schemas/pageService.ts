import { defineField, defineType } from 'sanity'
import { seoField } from './fields/seo'

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
    { name: 'garanties', title: 'Engagements' },
    { name: 'citation', title: 'Citation' },
    { name: 'livrableRapport', title: 'Rapport (mockup)' },
    { name: 'projetPhare', title: 'Projet phare' },
    { name: 'repartition', title: 'Répartition' },
    { name: 'faq', title: 'FAQ' },
    { name: 'autresServices', title: 'Autres services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    seoField('seo'),
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
      name: 'ordreMenu',
      title: 'Ordre dans le sous-menu',
      description: 'Numéro d’ordre (1, 2, 3…). Plus petit = en premier. Sert au tri du sous-menu de la nav et à l’affichage du numéro 01/02/03.',
      type: 'number',
      group: 'meta',
      validation: (r) => r.required().min(1).max(99),
    }),
    defineField({
      name: 'introCourte',
      title: 'Intro courte (sous-menu)',
      description: 'Phrase courte (max 80 car.) affichée sous le titre dans le sous-menu de la nav. Sera aussi reprise sur la HP.',
      type: 'text',
      rows: 2,
      group: 'meta',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'pictoMenu',
      title: 'Picto sous-menu',
      description: 'Petit picto (SVG ou PNG) affiché dans la card du sous-menu. Optionnel — un picto par défaut est utilisé sinon.',
      type: 'image',
      group: 'meta',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        // Champ remplacé par le fil d'Ariane signature côté front. Conservé en
        // base pour rétro-compat mais masqué dans le Studio (hidden: true) et
        // validation `required` retirée pour ne plus bloquer la sauvegarde.
        defineField({ name: 'surTitre', title: 'Sur-titre (obsolète)', description: 'Plus utilisé : remplacé par le fil d’Ariane.', type: 'string', hidden: true, validation: (r) => r.max(80) }),
        defineField({
          name: 'titre',
          title: 'Titre (H1)',
          description: 'Multi-lignes via retour à la ligne. Encadrer un fragment avec **...** pour le mettre en couleur (cf. champ ci-dessous).',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: 'titreEmphaseTone',
          title: 'Couleur du fragment **...**',
          description: 'Jaune accent par défaut. Gris foncé pour un effet plus discret (utilisé sur la page audit).',
          type: 'string',
          options: {
            list: [
              { title: 'Jaune accent', value: 'accent' },
              { title: 'Gris foncé', value: 'ink-soft' },
            ],
            layout: 'radio',
          },
          initialValue: 'accent',
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
    defineField({
      name: 'garanties',
      title: 'Bloc « Nos engagements »',
      type: 'object',
      group: 'garanties',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({
          name: 'items',
          title: 'Engagements (1 à 12)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'garantieItem',
              fields: [
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
              ],
              preview: { select: { title: 'titre' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
      ],
    }),
    defineField({
      name: 'citation',
      title: 'Bloc « Citation »',
      type: 'object',
      group: 'citation',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({
          name: 'texte',
          title: 'Texte de la citation',
          description: 'Sans guillemets — ils sont ajoutés automatiquement. Encadrer un fragment avec **...** pour le mettre en valeur.',
          type: 'text',
          rows: 4,
          validation: (r) => r.required().max(400),
        }),
        defineField({ name: 'auteur', title: 'Auteur', type: 'string', validation: (r) => r.required().max(80) }),
        defineField({ name: 'auteurTag', title: 'Tag auteur', description: 'Ex : « Agence digitale 100% IA ». Rendu en MAJUSCULES.', type: 'string', validation: (r) => r.max(80) }),
      ],
    }),
    defineField({
      name: 'livrableRapport',
      title: 'Bloc « Mockup rapport »',
      type: 'object',
      group: 'livrableRapport',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 3, validation: (r) => r.required().max(200) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2, validation: (r) => r.max(240) }),
        defineField({ name: 'mockupKicker', title: 'Mockup — kicker', description: 'Ex : « RAPPORT D’AUDIT IA — CONFIDENTIEL ». Rendu en gris mono.', type: 'string', validation: (r) => r.max(80) }),
        defineField({ name: 'mockupTitre', title: 'Mockup — titre principal', description: 'Ex : « Stratégie & feuille de route IA ».', type: 'string', validation: (r) => r.required().max(120) }),
        defineField({ name: 'mockupMeta', title: 'Mockup — méta', description: 'Ex : « Préparé par maria · 60-80 pages · format PDF + restitution ».', type: 'string', validation: (r) => r.max(160) }),
        defineField({
          name: 'sections',
          title: 'Sections du rapport (1 à 12)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'sectionRapport',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required().max(200) }),
                defineField({ name: 'pages', title: 'Pages', description: 'Ex : « 5 p. » ou « 15-20 p. ».', type: 'string', validation: (r) => r.required().max(20) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            },
          ],
          validation: (r) => r.min(1).max(12),
        }),
        defineField({ name: 'annexesTitre', title: 'Annexes — titre', description: 'Ex : « Documents d’accompagnement ».', type: 'string', validation: (r) => r.max(80) }),
        defineField({
          name: 'annexes',
          title: 'Annexes (lignes simples)',
          type: 'array',
          of: [{ type: 'string', validation: (r) => r.max(120) }],
          validation: (r) => r.max(8),
        }),
      ],
    }),
    defineField({
      name: 'projetPhare',
      title: 'Bloc « Projet phare »',
      description: 'Bloc sombre mettant en avant un projet de référence avec 3 KPIs. Alternative au mockup rapport selon les services. Laisser vide si non utilisé.',
      type: 'object',
      group: 'projetPhare',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', description: 'Ex : « // projet en cours »', type: 'string', validation: (r) => r.max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 3, validation: (r) => r.max(200) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 5, validation: (r) => r.max(600) }),
        defineField({
          name: 'kpis',
          title: 'KPIs (jusqu’à 4)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'kpiProjet',
              fields: [
                defineField({ name: 'chiffre', title: 'Chiffre (mis en avant)', description: 'Ex : « 5 mois », « 100 % », « 6 ».', type: 'string', validation: (r) => r.required().max(20) }),
                defineField({ name: 'libelle', title: 'Libellé', description: 'Phrase courte sous le chiffre. Ex : « de conception co-construite ».', type: 'string', validation: (r) => r.required().max(80) }),
              ],
              preview: { select: { title: 'chiffre', subtitle: 'libelle' } },
            },
          ],
          validation: (r) => r.max(4),
        }),
      ],
    }),
    defineField({
      name: 'repartition',
      title: 'Bloc « La juste répartition »',
      description: 'Bloc deux colonnes sur fond jaune pâle. Colonne A = vert pastel (typiquement « ce que fait l’agent / la machine »). Colonne B = jaune pastel (typiquement « ce que font vos équipes »).',
      type: 'object',
      group: 'repartition',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 3, validation: (r) => r.max(200) }),
        defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 2, validation: (r) => r.max(240) }),
        defineField({
          name: 'colonneA',
          title: 'Colonne A (vert pastel)',
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(80) }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string', validation: (r) => r.max(120) }],
              validation: (r) => r.max(12),
            }),
          ],
        }),
        defineField({
          name: 'colonneB',
          title: 'Colonne B (jaune pastel)',
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.max(80) }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string', validation: (r) => r.max(120) }],
              validation: (r) => r.max(12),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Bloc « FAQ »',
      type: 'object',
      group: 'faq',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 3, validation: (r) => r.required().max(160) }),
        defineField({
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'questionFaq',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'text', rows: 2, validation: (r) => r.required().max(200) }),
                defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 5, validation: (r) => r.required().max(600) }),
              ],
              preview: { select: { title: 'question' } },
            },
          ],
          validation: (r) => r.min(1).max(20),
        }),
      ],
    }),
    defineField({
      name: 'autresServices',
      title: 'Bloc « Autres services »',
      type: 'object',
      group: 'autresServices',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'string', validation: (r) => r.required().max(120) }),
        defineField({
          name: 'services',
          title: 'Services (1 à 3)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'autreServiceItem',
              fields: [
                defineField({ name: 'eyebrow', title: 'Eyebrow', description: 'Ex : « Service 02 ». Rendu en MAJUSCULES.', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
                defineField({ name: 'lienLibelle', title: 'Lien — libellé', description: 'Ex : « En savoir plus → ».', type: 'string', initialValue: 'En savoir plus →' }),
                defineField({ name: 'lienHref', title: 'Lien — destination', description: 'Slug interne ou URL. Ex : « /services/conception-outils-sur-mesure ».', type: 'string' }),
              ],
              preview: { select: { title: 'titre', subtitle: 'eyebrow' } },
            },
          ],
          validation: (r) => r.min(1).max(3),
        }),
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
