import { defineField } from 'sanity'

/**
 * Champ SEO réutilisable, à insérer dans les docs/pages éditables.
 *
 * Tous les sous-champs sont optionnels : laissés vides, la page reprend
 * ses valeurs par défaut (définies dans le `generateMetadata` côté code).
 * Renseignés, ils prennent le dessus → SEO pilotable depuis le Studio.
 *
 * @param group Nom du groupe d'onglets dans lequel ranger le champ (doit
 *              exister dans le doc parent). Omettre si le doc n'a pas de
 *              groupes.
 */
export function seoField(group?: string) {
  return defineField({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    ...(group ? { group } : {}),
    description:
      'Optionnel. Laissé vide, le site reprend des valeurs par défaut cohérentes. Renseigné, ces valeurs prennent le dessus.',
    fields: [
      defineField({
        name: 'titre',
        title: 'Balise <title>',
        description: 'Idéalement < 60 caractères. Sinon : titre de la page + « | maria ».',
        type: 'string',
        validation: (r) => r.max(70),
      }),
      defineField({
        name: 'description',
        title: 'Meta description',
        description: 'Idéalement 120–160 caractères. Affichée dans les résultats Google.',
        type: 'text',
        rows: 3,
        validation: (r) => r.max(180),
      }),
      defineField({
        name: 'ogImage',
        title: 'Image de partage (Open Graph, optionnelle)',
        description:
          'Format 1200×630. Affichée lors d’un partage sur LinkedIn, Slack, etc. Sinon, image OG générique du site.',
        type: 'image',
        options: { hotspot: true },
      }),
    ],
  })
}
