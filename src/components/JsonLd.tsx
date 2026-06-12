import { headers } from 'next/headers'

/**
 * Composant générique pour injecter un script JSON-LD dans la page.
 *
 * Usage :
 *   import { buildBreadcrumbSchema } from '@/lib/schema'
 *   <JsonLd data={buildBreadcrumbSchema([...])} />
 *
 * Accepte aussi `null` (no-op) pour permettre des appels conditionnels
 * sans `&&` dans les pages :
 *   <JsonLd data={buildFaqSchema(faq)} />
 *
 * Le nonce CSP est lu côté serveur via `headers()` et attaché au <script>
 * pour que le navigateur l'autorise sous le CSP nonce-based émis par le
 * middleware. Sans nonce, le script serait bloqué.
 */

type Props = {
  data: object | null | undefined
}

export default async function JsonLd({ data }: Props) {
  if (!data) return null
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // Sanitisation : Schema.org est rendu via JSON.stringify côté serveur,
      // jamais d'input utilisateur direct → sûr pour dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
