import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// Le client a décidé de retirer le bloc CTA final sur les 2 piliers
// (services + besoins). Le composant PillarPageTemplate ne rend ce bloc que
// si data.finalCta?.titre est défini → on vide le champ et c'est OK.
const result = await client
  .patch('pagePillierServices')
  .unset(['finalCta'])
  .commit()

console.log('PATCHED:', result._id)
