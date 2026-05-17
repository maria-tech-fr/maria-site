import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// On garde un seul saut de ligne entre la virgule et le « peu », et on
// minuscule « peu » (style éditorial cohérent avec la virgule).
const result = await client
  .patch('accueil')
  .set({ 'constat.titre': 'Tout le monde peut faire de l’IA,\npeu le font bien' })
  .commit()

console.log('PATCHED constat.titre on:', result._id)
