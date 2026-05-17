/**
 * Émet un schéma FAQPage à partir d'un tableau question/réponse.
 * À placer sur n'importe quelle page qui affiche un composant FAQ humain.
 */
export default function FaqJsonLd({
  questions,
}: {
  questions: { question: string; reponse: string }[] | null | undefined
}) {
  if (!questions || questions.length === 0) return null

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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
