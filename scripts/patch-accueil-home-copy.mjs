/**
 * Patch du singleton `accueil` :
 *  - Hero : nouvelle promesse « IA utile, à l'intérieur de votre entreprise »
 *           (suit le positionnement « agence ia pour l'interne »).
 *  - Services : trois cards (audit / outils internes / agents) avec
 *               descriptions distinctes — corrige le bug où 2 descriptions
 *               étaient identiques.
 *  - Methode : CTA secondaire forcé sur /agence (pas de page /methode dédiée,
 *              la méthode vit dans /agence).
 *  - PourquoiMaria : conclusion effacée — phrase jugée « bourrine ».
 *
 *  Lancement (depuis le dossier frontend/) :
 *    node --env-file=.env.local scripts/patch-accueil-home-copy.mjs
 *
 *  Nécessite SANITY_API_WRITE_TOKEN défini dans .env.local.
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-19'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN',
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const HERO = {
  surTitre: "// agence ia pour l'interne",
  titreLigne1: "L’IA utile, à l’intérieur de votre entreprise.",
  titreLigne2: '',
  sousTitre:
    'maria conçoit l’IA qui rend vos équipes plus efficaces et mieux organisées — cadrée, sécurisée, maîtrisée par des experts.',
  ctaSecondaire: {
    libelle: 'Découvrir notre méthode',
    type: 'interne',
    cheminInterne: '/agence',
    urlExterne: '',
  },
}

const SERVICES_CARDS = [
  {
    _key: 'svc-audit',
    icone: 'audit-strategie',
    titre: 'Audit & stratégie IA',
    description:
      'Cartographier vos usages, vos données, vos opportunités. Une feuille de route IA claire et chiffrée — avant la première ligne de code.',
    lien: {
      libelle: 'En savoir plus',
      type: 'interne',
      cheminInterne: '/services/audit-strategie-ia',
      urlExterne: '',
    },
  },
  {
    _key: 'svc-outils',
    icone: 'outils-internes',
    titre: 'Outils internes sur-mesure',
    description:
      'CRM, dashboards, plateformes métier. Pensés pour vos usages réels, intégrant l’IA là où elle apporte vraiment de la valeur.',
    lien: {
      libelle: 'En savoir plus',
      type: 'interne',
      cheminInterne: '/services/outils-internes-sur-mesure',
      urlExterne: '',
    },
  },
  {
    _key: 'svc-agents',
    icone: 'agents-chatbots',
    titre: 'Agents IA',
    description:
      'Copilote commercial, agent de support, assistant documentaire. Des agents spécialisés, supervisés par vos équipes.',
    lien: {
      libelle: 'En savoir plus',
      type: 'interne',
      cheminInterne: '/services/agents-ia',
      urlExterne: '',
    },
  },
]

const METHODE_LIEN = {
  libelle: 'Voir notre méthode en détail',
  type: 'interne',
  cheminInterne: '/agence',
  urlExterne: '',
}

const result = await client
  .patch('accueil')
  .set({
    'hero.surTitre': HERO.surTitre,
    'hero.titreLigne1': HERO.titreLigne1,
    'hero.titreLigne2': HERO.titreLigne2,
    'hero.sousTitre': HERO.sousTitre,
    'hero.ctaSecondaire': HERO.ctaSecondaire,
    'services.cards': SERVICES_CARDS,
    'methode.lien': METHODE_LIEN,
  })
  .unset(['pourquoiMaria.conclusion'])
  .commit()

console.log('PATCHED:', result._id, '— revision:', result._rev)
