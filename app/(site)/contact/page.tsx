import type { Metadata } from 'next'
import ContactChannels from '../../../src/components/contact/ContactChannels'
import ContactFaq from '../../../src/components/contact/ContactFaq'
import ContactForm from '../../../src/components/contact/ContactForm'
import ContactHero from '../../../src/components/contact/ContactHero'
import ContactInfo from '../../../src/components/contact/ContactInfo'
import ContactJsonLd from '../../../src/components/contact/ContactJsonLd'
import ContactProcess from '../../../src/components/contact/ContactProcess'
import { getContactPage } from '../../../src/lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maria.tech'

export const metadata: Metadata = {
  title: 'Contact — Parlons de votre projet IA',
  description:
    "4 façons d'entrer en contact avec maria : formulaire, téléphone, rendez-vous Cal.com. Réponse sous 24 h ouvrées, sans engagement.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | maria',
    description: "Parlons de votre projet IA. Réponse sous 24 h.",
    type: 'website',
    url: `${SITE_URL}/contact`,
  },
}

export default async function ContactPage() {
  const data = await getContactPage()
  const contact = data?.contact ?? null
  const page = data?.contactPage ?? null

  return (
    <>
      <ContactJsonLd
        contact={contact}
        faq={page?.faq?.questions ?? []}
      />

      {page?.hero && (
        <ContactHero
          surTitre={page.hero.surTitre || '// contact'}
          titre={page.hero.titre}
          description={page.hero.description}
        />
      )}

      {page?.canaux && page.canaux.cards && page.canaux.cards.length > 0 && (
        <ContactChannels
          surTitre={page.canaux.surTitre || '// vos options'}
          titre={page.canaux.titre || 'Comment souhaitez-vous nous parler ?'}
          sousTitre={page.canaux.sousTitre}
          cards={page.canaux.cards}
          calcomUrl={contact?.calendlyUrl ?? null}
          telephoneAffichage={contact?.telephone ?? null}
        />
      )}

      {page?.formulaire && (
        <ContactForm
          surTitre={page.formulaire.surTitre || '// formulaire'}
          titre={page.formulaire.titre || 'Écrivez-nous.'}
          sousTitre={page.formulaire.sousTitre}
          rgpdMention={page.formulaire.rgpdMention}
          submitLabel={page.formulaire.submitLabel}
          submitMeta={page.formulaire.submitMeta}
        />
      )}

      {page?.infosPratiques && contact && (
        <ContactInfo
          surTitre={page.infosPratiques.surTitre || '// nous trouver'}
          titre={page.infosPratiques.titre || 'En direct.'}
          infos={contact}
        />
      )}

      {page?.processus && page.processus.etapes && page.processus.etapes.length > 0 && (
        <ContactProcess
          surTitre={page.processus.surTitre || '// le processus'}
          titre={page.processus.titre || 'Ce qui se passe après votre message.'}
          sousTitre={page.processus.sousTitre}
          etapes={page.processus.etapes}
        />
      )}

      {page?.faq && page.faq.questions && page.faq.questions.length > 0 && (
        <ContactFaq
          surTitre={page.faq.surTitre || '// vos questions'}
          titre={page.faq.titre || 'Avant de nous écrire.'}
          questions={page.faq.questions}
        />
      )}
    </>
  )
}
