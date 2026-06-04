/**
 * Migration : ancien slug `audit-strategie-ia` → nouveau `audit-et-strategie-ia`.
 *
 * Le slug du doc `pageService-audit-strategie-ia` a été modifié dans Sanity
 * (`slug.current`). Le _id du doc reste inchangé. Tous les liens dans la
 * base qui pointent en dur vers `/services/audit-strategie-ia` deviendraient
 * des 404 (sauf le redirect 308 Next.js, mais autant les remettre droits).
 *
 * Champs concernés (audités via grep code) :
 *  - autresServices.services[*].lienHref sur les autres pageService
 *  - serviceAssocie.lienHref sur les pageBesoin (selon schema)
 *  - ctaInline.lienHref dans les body d'articles
 *  - lien.cheminInterne dans diverses sections accueil/agence/etc.
 *
 * Stratégie : on remplace toute occurrence stricte de
 * `/services/audit-strategie-ia` (mais pas de sous-chemins) sur tous les
 * docs textuels via une mutation Sanity ciblée par GROQ.
 *
 * Lancement : node --env-file=.env.local scripts/patch-slug-audit-renomme.mjs
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

/** Couples ancien slug → nouveau slug à remplacer dans tous les champs string. */
const RENAMES = [
  ['/services/audit-strategie-ia', '/services/audit-et-strategie-ia'],
  ['/services/agents-ia', '/services/agents-conversationnels-ia'],
  ['/services/outils-internes-sur-mesure', '/services/outils-IA-internes-sur-mesure'],
]

/* On parcourt tous les docs Sanity et on déserialise, remplace, ré-écrit
 * uniquement ceux qui ont au moins une occurrence. */
function deepReplace(value) {
  if (typeof value === 'string') {
    for (const [old, neu] of RENAMES) {
      if (value === old) return neu
    }
    return value
  }
  if (Array.isArray(value)) return value.map(deepReplace)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = deepReplace(v)
    return out
  }
  return value
}

const docs = await client.fetch(`*[!(_type match "system.*")]`)
let touched = 0
for (const doc of docs) {
  const updated = deepReplace(doc)
  if (JSON.stringify(updated) === JSON.stringify(doc)) continue

  // On reconstruit le patch en ne renvoyant QUE les champs top-level modifiés
  // pour éviter d'écraser inutilement le doc complet.
  const fieldsToSet = {}
  for (const k of Object.keys(updated)) {
    if (k.startsWith('_')) continue
    if (JSON.stringify(updated[k]) !== JSON.stringify(doc[k])) {
      fieldsToSet[k] = updated[k]
    }
  }
  if (Object.keys(fieldsToSet).length === 0) continue

  const r = await client.patch(doc._id).set(fieldsToSet).commit()
  console.log(`  → ${doc._id} (${doc._type}) — rev: ${r._rev}`)
  touched++
}

console.log(`\n✓ ${touched} doc(s) mis à jour.`)
