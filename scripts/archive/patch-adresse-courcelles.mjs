/**
 * Patch ponctuel : remplace l'adresse postale du singleton `parametresGlobaux`
 * dans Sanity. L'ancienne valeur seedée par scripts/archive/seed-contact-page.mjs
 * pointait sur « 59 rue Beaubourg, 75003 Paris » — on bascule sur le siège.
 *
 * À lancer une fois :
 *   node --env-file=.env.local scripts/patch-adresse-courcelles.mjs
 *
 * Une fois exécuté avec succès, déplacer ce script dans scripts/archive/
 * pour suivre la convention du repo.
 */

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('SANITY_API_WRITE_TOKEN manquant.')
  process.exit(1)
}

const NEW_RUE = '173 rue de Courcelles'
const NEW_CP_VILLE = '75017 Paris'

const before = await client.fetch(
  `*[_id == "parametresGlobaux"][0]{ "rue": contact.adresse.rue, "cpVille": contact.adresse.codePostalVille }`,
)
console.log('AVANT :', before)

const result = await client
  .patch('parametresGlobaux')
  .set({
    'contact.adresse.rue': NEW_RUE,
    'contact.adresse.codePostalVille': NEW_CP_VILLE,
  })
  .commit()

const after = await client.fetch(
  `*[_id == "parametresGlobaux"][0]{ "rue": contact.adresse.rue, "cpVille": contact.adresse.codePostalVille }`,
)
console.log('APRÈS :', after)
console.log('PATCHED:', result._id, '(rev:', result._rev + ')')
