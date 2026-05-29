import { defineField, defineType } from 'sanity'
import { seoField } from './fields/seo'

export const accueil = defineType({
  name: 'accueil',
  title: 'Page d’accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'reassurance', title: 'Réassurance' },
    { name: 'constat', title: 'Constat' },
    { name: 'services', title: 'Services' },
    { name: 'methode', title: 'Méthode' },
    { name: 'projetVedette', title: 'Étude de cas' },
    { name: 'pourquoiMaria', title: 'Pourquoi maria' },
    { name: 'experts', title: 'Experts' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    seoField('seo'),
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
          description: 'Petit texte affiché au-dessus du titre. Ex : « // agence digitale × ia »',
          type: 'string',
          validation: (r) => r.required().max(80),
        }),
        defineField({
          name: 'titreLigne1',
          title: 'Titre — ligne 1',
          description: 'Premier segment du H1 (rendu en noir foncé)',
          type: 'string',
          validation: (r) => r.required().max(60),
        }),
        defineField({
          name: 'titreLigne2',
          title: 'Titre — ligne 2 (optionnel)',
          description:
            'Second segment du H1 (rendu en gris). Le curseur clignotant est positionné à la fin de la dernière ligne renseignée.',
          type: 'string',
          validation: (r) => r.max(60),
        }),
        defineField({
          name: 'sousTitre',
          title: 'Sous-titre',
          description: 'Description courte affichée sous le titre',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(300),
        }),
        defineField({
          name: 'ctaPrincipal',
          title: 'CTA principal',
          type: 'lien',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'ctaSecondaire',
          title: 'CTA secondaire (optionnel)',
          type: 'lien',
        }),
      ],
    }),
    defineField({
      name: 'reassurance',
      title: 'Bandeau de réassurance',
      description:
        'Liste d’éléments affichés sous le hero. 3 à 4 éléments recommandés pour un rendu équilibré.',
      type: 'array',
      group: 'reassurance',
      of: [
        {
          type: 'object',
          name: 'reassuranceItem',
          title: 'Élément de réassurance',
          fields: [
            defineField({
              name: 'icone',
              title: 'Pictogramme',
              type: 'string',
              options: {
                list: [
                  { title: 'Sécurité (bouclier)', value: 'securite' },
                  { title: 'Validation humaine (silhouettes)', value: 'validation' },
                  { title: 'Livraison rapide (éclair)', value: 'livraison' },
                  { title: 'Données privées (cadenas)', value: 'donnees' },
                ],
                layout: 'dropdown',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'libelle',
              title: 'Libellé',
              description:
                'Phrase courte d’une seule ligne. Le retour à la ligne se fait automatiquement selon la largeur — éviter les retours manuels qui causent des wraps imprévisibles en responsive.',
              type: 'string',
              validation: (r) => r.required().max(80),
            }),
          ],
          preview: {
            select: { title: 'libelle', subtitle: 'icone' },
            prepare: ({ title, subtitle }) => ({
              title: title || '(sans libellé)',
              subtitle,
            }),
          },
        },
      ],
      validation: (r) => r.min(1).max(6),
    }),
    defineField({
      name: 'constat',
      title: 'Bloc constat',
      type: 'object',
      group: 'constat',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'surTitre',
          title: 'Sur-titre',
          description: 'Petit texte de section au-dessus du titre. Ex : « // le constat »',
          type: 'string',
          validation: (r) => r.required().max(60),
        }),
        defineField({
          name: 'titre',
          title: 'Titre (H2)',
          description:
            'Le titre principal du bloc. Les retours à la ligne saisis ici sont respectés à l’affichage.',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(160),
        }),
        defineField({
          name: 'paragraphes',
          title: 'Paragraphes',
          description:
            'Texte explicatif. Chaque paragraphe peut être mis en valeur (texte plus blanc, plus appuyé) via la case correspondante.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'paragrapheConstat',
              title: 'Paragraphe',
              fields: [
                defineField({
                  name: 'texte',
                  title: 'Texte',
                  type: 'text',
                  rows: 3,
                  validation: (r) => r.required().max(400),
                }),
                defineField({
                  name: 'emphase',
                  title: 'Mettre en valeur',
                  description: 'Affiche le paragraphe en blanc et un peu plus appuyé',
                  type: 'boolean',
                  initialValue: false,
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
        defineField({
          name: 'citation',
          title: 'Citation (optionnelle)',
          description:
            'Phrase courte rendue en gros, avec une barre verticale jaune à gauche. Les guillemets sont à inclure manuellement.',
          type: 'text',
          rows: 3,
          validation: (r) => r.max(240),
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Bloc services',
      type: 'object',
      group: 'services',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
        defineField({
          name: 'cards',
          title: 'Cartes services',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'serviceCard',
              fields: [
                defineField({
                  name: 'icone',
                  title: 'Pictogramme',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Audit & stratégie (loupe sur grille)', value: 'audit-strategie' },
                      { title: 'Outils internes (fenêtre)', value: 'outils-internes' },
                      { title: 'Agents & Chatbots (robot)', value: 'agents-chatbots' },
                      { title: 'Communication (bulle)', value: 'communication' },
                    ],
                    layout: 'dropdown',
                  },
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(200) }),
                defineField({ name: 'lien', title: 'Lien', type: 'lien', validation: (r) => r.required() }),
              ],
              preview: {
                select: { title: 'titre', subtitle: 'icone' },
              },
            },
          ],
          validation: (r) => r.min(1).max(4),
        }),
      ],
    }),
    defineField({
      name: 'methode',
      title: 'Bloc méthode',
      type: 'object',
      group: 'methode',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
        defineField({
          name: 'etapes',
          title: 'Étapes',
          description: 'Étapes affichées en colonnes (3 à 5 recommandées)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'etapeMethode',
              fields: [
                defineField({ name: 'numero', title: 'Numéro', description: 'Ex : 01, 02…', type: 'string', validation: (r) => r.required().max(4) }),
                defineField({ name: 'categorie', title: 'Catégorie', description: 'Ex : Cadrer, Concevoir', type: 'string', validation: (r) => r.required().max(40) }),
                defineField({ name: 'titre', title: 'Titre court', description: 'Phrase courte. Ex : « Comprendre, vraiment. »', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required().max(300) }),
              ],
              preview: { select: { title: 'titre', subtitle: 'numero' } },
            },
          ],
          validation: (r) => r.min(1).max(6),
        }),
        defineField({ name: 'lien', title: 'Lien CTA', type: 'lien' }),
      ],
    }),
    defineField({
      name: 'projetVedette',
      title: 'Bloc étude de cas',
      type: 'object',
      group: 'projetVedette',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 3, validation: (r) => r.required().max(180) }),
        defineField({
          name: 'metriques',
          title: 'Métriques chiffrées',
          description: '3 chiffres clés à mettre en avant',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'metrique',
              fields: [
                defineField({ name: 'valeur', title: 'Valeur', description: 'Ex : −67%, +40%, 100%', type: 'string', validation: (r) => r.required().max(10) }),
                defineField({ name: 'libelle', title: 'Libellé', type: 'string', validation: (r) => r.required().max(80) }),
                defineField({
                  name: 'couleur',
                  title: 'Couleur de la barre',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Jaune (accent)', value: 'accent' },
                      { title: 'Vert (success)', value: 'success' },
                      { title: 'Noir (ink)', value: 'ink' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'accent',
                  validation: (r) => r.required(),
                }),
              ],
              preview: { select: { title: 'valeur', subtitle: 'libelle' } },
            },
          ],
          validation: (r) => r.length(3),
        }),
        defineField({ name: 'lien', title: 'Lien vers l’étude', type: 'lien' }),
        defineField({ name: 'surTitreClients', title: 'Sur-titre clients', description: 'Texte au-dessus de la rangée de clients', type: 'string', validation: (r) => r.max(60) }),
        defineField({
          name: 'clients',
          title: 'Logos clients',
          description:
            'Une entrée par client. Le nom est obligatoire (sert de texte alternatif et de fallback). Le logo est optionnel : sans logo, le nom s’affiche dans une plaque grise.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'clientLogo',
              fields: [
                defineField({ name: 'nom', title: 'Nom du client', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({
                  name: 'logo',
                  title: 'Logo (optionnel)',
                  description: 'PNG ou SVG sur fond transparent idéalement. Affiché en niveaux de gris, couleur au survol.',
                  type: 'image',
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: { title: 'nom', media: 'logo' },
              },
            },
          ],
          validation: (r) => r.max(12),
        }),
      ],
    }),
    defineField({
      name: 'pourquoiMaria',
      title: 'Bloc pourquoi maria',
      type: 'object',
      group: 'pourquoiMaria',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({
          name: 'cardMachine',
          title: 'Carte « Machine »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(40) }),
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (r) => r.min(1).max(8),
            }),
          ],
        }),
        defineField({
          name: 'cardHumain',
          title: 'Carte « Humain »',
          type: 'object',
          fields: [
            defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(40) }),
            defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required().max(80) }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (r) => r.min(1).max(8),
            }),
          ],
        }),
        defineField({ name: 'conclusion', title: 'Conclusion (texte, optionnel)', description: 'Phrase centrale finale, affichée sous les deux cartes. Laisser vide pour ne pas afficher de phrase de conclusion.', type: 'text', rows: 2, validation: (r) => r.max(240) }),
      ],
    }),
    defineField({
      name: 'experts',
      title: 'Bloc experts',
      type: 'object',
      group: 'experts',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surTitre', title: 'Sur-titre', type: 'string', validation: (r) => r.required().max(60) }),
        defineField({ name: 'titre', title: 'Titre (H2)', type: 'text', rows: 2, validation: (r) => r.required().max(120) }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
        defineField({
          name: 'membres',
          title: 'Membres',
          description: 'Liste des membres mis en avant (3 recommandé)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'membreExpert',
              fields: [
                defineField({ name: 'nom', title: 'Nom complet', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({ name: 'role', title: 'Rôle', description: 'Ex : Directeur technique', type: 'string', validation: (r) => r.required().max(60) }),
                defineField({
                  name: 'photo',
                  title: 'Photo (optionnelle)',
                  description: 'Portrait carré idéalement. Sans photo, on affiche les initiales sur un dégradé maria.',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'badge',
                  title: 'Badge (optionnel)',
                  description: 'Petit libellé affiché sur la photo (ex : « cofondateur »). Laisser vide pour ne rien afficher.',
                  type: 'string',
                  validation: (r) => r.max(40),
                }),
              ],
              preview: { select: { title: 'nom', subtitle: 'role', media: 'photo' } },
            },
          ],
          validation: (r) => r.min(1).max(6),
        }),
        defineField({ name: 'lien', title: 'Lien CTA', type: 'lien' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page d’accueil' }),
  },
})
