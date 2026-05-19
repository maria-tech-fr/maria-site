/**
 * Patch ponctuel page Service 01 (Audit & stratégie IA) + harmonisation
 * du sur-titre Hero des 3 pages services.
 *
 *  - Audit : lien méthode → libellé « Découvrir l'agence → » + href /agence
 *  - Audit : signature citation → Matthieu SEILLER, Directeur stratégique
 *  - 3 services : sur-titre Hero harmonisé sur le format « // service 0X »
 *
 *  Lancement :
 *    node --env-file=.env.local scripts/patch-service-audit-corrections.mjs
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

/* ---- 1. Page Audit : lien méthode + signature citation ---- */
const audit = await client
  .patch('pageService-audit-strategie-ia')
  .set({
    'methode.lienLibelle': "Découvrir l’agence →",
    'methode.lienHref': '/agence',
    'citation.auteur': 'Matthieu SEILLER',
    'citation.auteurTag': 'Directeur stratégique, maria',
  })
  .commit()
console.log('PATCHED audit:', audit._id, '— rev:', audit._rev)

/* ---- 2. Sur-titres Hero — harmonisation « // service 0X » ---- */
const heroPatches = [
  { id: 'pageService-audit-strategie-ia', surTitre: '// service 01' },
  { id: 'pageService-outils-internes-sur-mesure', surTitre: '// service 02' },
  { id: 'pageService-agents-ia', surTitre: '// service 03' },
]

for (const { id, surTitre } of heroPatches) {
  const r = await client.patch(id).set({ 'hero.surTitre': surTitre }).commit()
  console.log(`PATCHED hero ${id} → « ${surTitre} » — rev: ${r._rev}`)
}
