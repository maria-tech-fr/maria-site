/**
 * Patch ponctuel page /agence — 3 corrections rédactionnelles.
 *
 *  1. Hero sous-titre : recentrage sur l'angle « interne » (efficacité +
 *     organisation), suppression de la mention « sites / outils / contenus »
 *     (ancien positionnement multi-canal).
 *  2. Manifeste § 3 (« notre conviction ») : recentrage « mettre l'IA au
 *     service de votre interne » + retrait du verbe « orchestre ».
 *  3. Engagements : « Formation des équipes incluse dans chaque projet. »
 *     → « proposée avec chaque projet. » (positionnement plus juste —
 *     option, pas inclus systématique).
 *
 *  Lancement :
 *    node --env-file=.env.local scripts/patch-agence-corrections.mjs
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

const NEW_HERO_DESCRIPTION =
  'maria conçoit l’IA qui rend vos équipes plus efficaces et mieux organisées. Cadrée, sécurisée, maîtrisée par des experts qui ne lâchent rien.'

const NEW_MANIFESTE_MP3 =
  'Notre métier, c’est de mettre l’IA au service de votre interne — vos équipes, votre organisation — sans jamais vous déposséder de la décision. Vous restez aux commandes. On cadre, on construit, on protège. Toujours avec des humains au bon endroit.'

const NEW_ENGAGEMENT_FORMATION = 'Formation des équipes proposée avec chaque projet.'
const OLD_ENGAGEMENT_FORMATION = 'Formation des équipes incluse dans chaque projet.'

/* Étape 1 — Hero + manifeste § 3 (par _key, plus sûr que l'index) */
const r1 = await client
  .patch('agence')
  .set({
    'hero.description': NEW_HERO_DESCRIPTION,
    'manifeste.paragraphes[_key=="mp3"].texte': NEW_MANIFESTE_MP3,
  })
  .commit()
console.log('PATCHED hero + manifeste — rev:', r1._rev)

/* Étape 2 — Engagement formation : on récupère la liste, on remplace la ligne
 * concernée, on re-set le tableau complet (le champ est un array<string>,
 * on ne peut pas patcher par _key sur un array de strings). */
const current = await client.fetch('*[_id == "agence"][0].engagements.points')
if (Array.isArray(current)) {
  const updated = current.map((p) => (p === OLD_ENGAGEMENT_FORMATION ? NEW_ENGAGEMENT_FORMATION : p))
  if (JSON.stringify(updated) !== JSON.stringify(current)) {
    const r2 = await client.patch('agence').set({ 'engagements.points': updated }).commit()
    console.log('PATCHED engagement formation — rev:', r2._rev)
  } else {
    console.log('Engagement formation déjà à jour, rien à patcher.')
  }
} else {
  console.warn('engagements.points absent ou non-array, skip.')
}
