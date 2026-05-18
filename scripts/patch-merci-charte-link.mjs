import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// Met à jour le lien de la suggestion « Lire la charte IA » dans
// parametresGlobaux.contactPage.merciSuggestions.cards.
// Avant : lienHref="#" (placeholder). Après : /charte-ia.
const result = await client
  .patch('parametresGlobaux')
  .set({
    'contactPage.merciSuggestions.cards[_key=="s2"].lienHref': '/charte-ia',
  })
  .commit()

console.log('PATCHED:', result._id)
