import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Patch des sur-titres + titres de la Charte IA pour matcher les maquettes
 * envoyées par Mathieu (hero sombre, préambule sans H2, etc.).
 */
const result = await client
  .patch('pageCharteIA')
  .set({
    'hero.surTitre': '// charte',
    'hero.titre': 'Notre charte d’usage de l’IA.',
    'hero.sousTitre':
      'Ce que nous nous engageons à respecter sur chaque projet. Publiquement. Pour que vous puissiez nous le rappeler.',
    'preambule.surTitre': '// pourquoi cette charte',
    'engagements.surTitre': '// nos engagements',
    'engagements.titre': 'Onze engagements. Tenus.',
    'engagements.sousTitre': null,
    'lignesRouges.surTitre': '// nos lignes rouges',
    'lignesRouges.titre': 'Ce que nous refusons de faire. Sans négociation.',
    'lignesRouges.intro':
      'Certains projets ne sont pas une question de prix. Nous ne les ferons pas.',
    'disclaimer.surTitre': '// honnêteté',
    'disclaimer.titre': 'Ce que cette charte n’est pas.',
  })
  .commit()

console.log('PATCHED:', result._id)
