import 'server-only'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/**
 * Client Sanity avec droits d'écriture. À utiliser uniquement côté serveur.
 * Le token (Editor) doit être généré dans le dashboard Sanity et configuré
 * dans la variable d'environnement SANITY_API_WRITE_TOKEN.
 *
 * L'import `server-only` ci-dessus fait échouer le build si ce module est
 * importé depuis un Client Component, garantissant que le token ne fuit
 * jamais dans le bundle JavaScript envoyé au navigateur.
 *
 * TODO : quand on passera au plan Sanity Team, créer un Custom Role
 * « contact-only » avec uniquement `create:messageContact` et générer un
 * token scopé pour réduire le blast radius en cas de fuite (cf. audit
 * sécu F3.2 / F8.1).
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: 'published',
})
