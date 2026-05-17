import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// Vide la phrase de clôture du bloc Transformation du besoin témoin.
// (Le champ reste optionnel côté schema : on peut le re-remplir plus tard.)
const result = await client
  .patch('besoin-gagner-du-temps-commerciaux')
  .unset(['transformation.closing'])
  .commit()

console.log('PATCHED:', result._id)
