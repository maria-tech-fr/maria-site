/**
 * Migration ponctuelle : convertit le champ `accueil.projetVedette.clients`
 * d'un tableau de strings vers un tableau d'objets { nom, logo? }.
 *
 * Le champ a changé de type (string[] → objet[]) pour permettre l'upload de
 * logos depuis le Studio. Sans cette migration, les anciennes valeurs
 * textuelles s'afficheraient en « Unknown / invalid » dans le Studio.
 *
 * Chaque string devient { _type: 'clientLogo', nom: <string> } (sans logo)
 * → le rendu retombe sur la plaque grise + nom, comportement d'origine.
 *
 * Lancement :
 *   node --env-file=.env.local scripts/patch-accueil-clients-logos.mjs
 */
import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes (NEXT_PUBLIC_SANITY_* / SANITY_API_WRITE_TOKEN)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const current = await client.fetch('*[_id == "accueil"][0].projetVedette.clients')

if (!Array.isArray(current) || current.length === 0) {
  console.log('Aucun client à migrer.')
  process.exit(0)
}

// Si déjà migré (objets), on ne touche pas.
if (typeof current[0] === 'object') {
  console.log('Clients déjà au format objet, rien à migrer.')
  process.exit(0)
}

const migrated = current.map((nom) => ({
  _type: 'clientLogo',
  _key: randomUUID().replace(/-/g, '').slice(0, 12),
  nom: String(nom),
}))

const result = await client
  .patch('accueil')
  .set({ 'projetVedette.clients': migrated })
  .commit()

console.log('MIGRÉ:', result._id, '—', migrated.length, 'clients convertis en { nom }')
console.log('Tu peux maintenant uploader un logo par client depuis le Studio.')
