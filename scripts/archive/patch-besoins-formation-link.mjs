import { getCliClient } from 'sanity/cli'

const client = getCliClient()

/**
 * Met à jour le lien `formationMention.lienHref` des besoins qui pointaient
 * vers /services/audit-strategie-ia (placeholder) → /services/formation
 * (page Formation dédiée désormais).
 */
const SLUGS = [
  'besoin-gagner-du-temps-commerciaux',
  'besoin-reduire-charge-service-client',
  'besoin-industrialiser-traitement-documents',
  'besoin-organiser-connaissance-entreprise',
  'besoin-faciliter-onboarding',
  'besoin-capitaliser-expertise-interne',
  'besoin-vision-claire-donnees-metier',
  'besoin-alertes-intelligentes',
  'besoin-trier-candidatures',
  'besoin-former-equipes-ia',
  'besoin-securiser-usage-ia',
  'besoin-conformite-rgpd-ia',
]

for (const id of SLUGS) {
  await client
    .patch(id)
    .set({ 'serviceAssocie.formationMention.lienHref': '/services/formation' })
    .commit()
  console.log(`✓ ${id}`)
}
console.log('Done.')
