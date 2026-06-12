import { headers } from 'next/headers'

/**
 * Émet un schéma FAQPage à partir d'un tableau question/réponse.
 * À placer sur n'importe quelle page qui affiche un composant FAQ humain.
 */
export default async function FaqJsonLd({
  questions,
}: {
  questions: { question: string; reponse: string }[] | null | undefined
}) {
  if (!questions || questions.length === 0) return null

  const nonce = (await headers()).get('x-nonce') ?? undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
