import 'server-only'
import { Redis } from '@upstash/redis'

/*
  Rate-limit distribué via Upstash Redis (KV Vercel).

  Pourquoi Redis : sur Vercel l'app tourne en serverless multi-instances.
  Un rate-limit en Map mémoire (l'ancienne implémentation) est court-circuité
  par le scale horizontal — chaque nouvelle instance démarre avec un
  compteur vierge. Redis centralise le compteur entre toutes les instances.

  Fallback in-memory : si les env vars Upstash ne sont pas posées (cas du
  dev local par défaut), on retombe sur une Map locale. La sémantique
  fonctionne, mais sans propriété distribuée. Aucun crash, aucun warning
  bloquant.
*/

const WINDOW_SECONDS = 15 * 60 // 15 minutes
const MAX_REQUESTS = 3

type CheckResult = {
  limited: boolean
  /** Nombre de tentatives observées dans la fenêtre (pour debug / logs). */
  count: number
}

// ---------------------------------------------------------------------------
// Backend Redis
// ---------------------------------------------------------------------------

let cachedRedis: Redis | null | undefined = undefined

function getRedis(): Redis | null {
  if (cachedRedis !== undefined) return cachedRedis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    cachedRedis = null
    return null
  }
  cachedRedis = new Redis({ url, token })
  return cachedRedis
}

async function checkRedis(key: string): Promise<CheckResult> {
  const redis = getRedis()!
  // Pattern Redis classique : INCR + EXPIRE conditionnel sur la première
  // requête. La compteur atomique INCR évite toute race entre instances.
  const fullKey = `rl:contact:${key}`
  const count = await redis.incr(fullKey)
  if (count === 1) {
    await redis.expire(fullKey, WINDOW_SECONDS)
  }
  return { limited: count > MAX_REQUESTS, count }
}

// ---------------------------------------------------------------------------
// Backend in-memory (fallback dev local)
// ---------------------------------------------------------------------------

const localStore = new Map<string, number[]>()

function checkLocal(key: string): CheckResult {
  const now = Date.now()
  const windowMs = WINDOW_SECONDS * 1000
  const history = (localStore.get(key) ?? []).filter((t) => now - t < windowMs)
  history.push(now)
  localStore.set(key, history)
  return { limited: history.length > MAX_REQUESTS, count: history.length }
}

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

/**
 * Incrémente le compteur de tentatives pour `key` dans la fenêtre courante
 * et indique si le seuil est dépassé.
 *
 * À appeler UNE fois par tentative (l'appel incrémente). Le compteur expire
 * automatiquement après la fenêtre de temps.
 */
export async function checkContactRateLimit(key: string): Promise<CheckResult> {
  if (getRedis()) {
    try {
      return await checkRedis(key)
    } catch (err) {
      // Redis indisponible (incident Upstash, réseau) : on dégrade sur
      // l'in-memory plutôt que de bloquer le formulaire. On logue pour
      // monitoring.
      console.error('[rateLimit] Redis check failed, falling back to local:', err)
      return checkLocal(key)
    }
  }
  return checkLocal(key)
}
