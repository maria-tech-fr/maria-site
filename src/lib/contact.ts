import { client } from '../../sanity/client'
import { contactPageQuery } from '../../sanity/queries'

export type ContactInfos = {
  email: string | null
  telephone: string | null
  calendlyUrl: string | null
  linkedinUrl: string | null
  adresse: {
    rue: string | null
    codePostalVille: string | null
    pays: string | null
    mention: string | null
  } | null
  horaires: {
    plage: string | null
    mention: string | null
    opens: string | null
    closes: string | null
  } | null
} | null

export type ContactCanalAction = 'form' | 'infos' | 'calcom' | 'disabled' | 'link'

export type CardCanal = {
  action: ContactCanalAction
  titre: string
  description: string
  cta: string
  href: string | null
  accent: 'green' | 'yellow' | 'muted' | null
}

export type EtapeProcessusContact = {
  numero: string
  titre: string
  description: string
}

export type QuestionFaqContact = {
  question: string
  reponse: string
}

export type ContactPageContent = {
  hero: {
    surTitre: string | null
    titre: string
    description: string | null
  } | null
  canaux: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    cards: CardCanal[] | null
  } | null
  formulaire: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    rgpdMention: string | null
    submitLabel: string | null
    submitMeta: string | null
  } | null
  infosPratiques: {
    surTitre: string | null
    titre: string | null
  } | null
  processus: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    etapes: EtapeProcessusContact[] | null
  } | null
  faq: {
    surTitre: string | null
    titre: string | null
    questions: QuestionFaqContact[] | null
  } | null
  merciHero: {
    surTitre: string | null
    titre: string | null
    description: string | null
  } | null
} | null

export type ContactPageData = {
  contact: ContactInfos
  contactPage: ContactPageContent
} | null

export async function getContactPage(): Promise<ContactPageData> {
  return client.fetch<ContactPageData>(
    contactPageQuery,
    {},
    { next: { revalidate: 60, tags: ['parametresGlobaux'] } },
  )
}
