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
 */

type Props = {
  data: object | null | undefined
}

export default function JsonLd({ data }: Props) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      // Sanitisation : Schema.org est rendu via JSON.stringify côté serveur,
      // jamais d'input utilisateur direct → sûr pour dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
