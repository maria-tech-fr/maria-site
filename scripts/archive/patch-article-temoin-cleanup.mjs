/**
 * Patch ponctuel : retire les champs `relatedOffers` et `keyTakeaways` du
 * doc article témoin. Ces deux champs ont été supprimés du schema (décision
 * produit : sidebar « offres liées » faisait doublon avec sidebarCta, et
 * synthèse « Ce qu'il faut retenir » faisait doublon avec les callouts
 * « À retenir » du corps). Sans ce patch, le Studio Sanity afficherait
 * les valeurs orphelines en « Unknown fields ».
 *
 * Lancement :
 *   node --env-file=.env.local scripts/patch-article-temoin-cleanup.mjs
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Variables manquantes (NEXT_PUBLIC_SANITY_* / SANITY_API_WRITE_TOKEN)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const result = await client
  .patch('article-agent-ia-ou-chatbot-comment-choisir')
  .unset(['relatedOffers', 'keyTakeaways'])
  .commit()

console.log('PATCHED:', result._id, '— revision:', result._rev)
