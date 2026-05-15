import type { Metadata } from 'next'
import { getContactPage } from '../../../../src/lib/contact'
import ThankYouHero from '../../../../src/components/thank-you/ThankYouHero'
import MariaRunner from '../../../../src/components/thank-you/MariaRunner'
import ThankYouSuggestions from '../../../../src/components/thank-you/ThankYouSuggestions'
import ThankYouCalcomCta from '../../../../src/components/thank-you/ThankYouCalcomCta'

export const metadata: Metadata = {
  title: 'Message reçu — Merci',
  description: "Votre message est bien arrivé. On vous répond sous 24 h ouvrées.",
  robots: { index: false, follow: true },
  alternates: { canonical: '/contact/merci' },
}

export default async function ContactMerciPage() {
  const data = await getContactPage()
  const cp = data?.contactPage ?? null

  const hero = cp?.merciHero ?? null
  const surTitreHero = hero?.surTitre || '// merci'
  const titreHero = hero?.titre || 'Votre message est **bien arrivé**'
  const descHero =
    hero?.description ||
    "On vous répond personnellement sous 24 h, par un humain, pas un robot."
  const skipLabel = hero?.skipGameLibelle || 'Passer le jeu et continuer'

  const suggestions = cp?.merciSuggestions ?? null
  const suggSurTitre = suggestions?.surTitre || '// en attendant'
  const suggTitre = suggestions?.titre || 'Vous pouvez aussi…'
  const suggCards = suggestions?.cards ?? []

  const cta = cp?.merciCalcomCta ?? null
  const ctaSurTitre = cta?.surTitre || '// gagner du temps'
  const ctaTitre = cta?.titre || 'Plutôt que d’attendre **notre retour…**'
  const ctaDesc =
    cta?.description ||
    'Réservez directement un créneau de 30 minutes avec nous, à un horaire qui vous arrange.'
  const ctaLibelle = cta?.ctaLibelle || 'Réserver un créneau Cal.com'
  const calcomUrl = data?.contact?.calendlyUrl ?? null

  return (
    <>
      <ThankYouHero surTitre={surTitreHero} titre={titreHero} description={descHero} />
      <MariaRunner skipGameLibelle={skipLabel} />
      {suggCards.length > 0 && (
        <ThankYouSuggestions
          surTitre={suggSurTitre}
          titre={suggTitre}
          cards={suggCards}
        />
      )}
      <ThankYouCalcomCta
        surTitre={ctaSurTitre}
        titre={ctaTitre}
        description={ctaDesc}
        ctaLibelle={ctaLibelle}
        calcomUrl={calcomUrl}
      />
    </>
  )
}
