import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/**
 * Client Sanity avec droits d'écriture. À utiliser uniquement côté serveur.
 * Le token (Editor) doit être généré dans le dashboard Sanity et configuré
 * dans la variable d'environnement SANITY_API_WRITE_TOKEN.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: 'published',
})
