import { client } from '../../sanity/client'
import { pageFormationQuery } from '../../sanity/queries'

export type AudienceIcone = 'compass' | 'users' | 'wrench'
export type FormatIcone = 'grid' | 'building' | 'monitor' | 'chart'

export type FormationItem = {
  numero: string
  titre: string
  public: string
  description: string
  duree: string
}

export type FormationFamille = {
  label: string
  tagline: string
  formations: FormationItem[]
}

export type ServiceRef = {
  titre: string
  slug: string
} | null

export type PageFormationData = {
  hero: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    ctaPrimaireLibelle: string | null
    ctaSecondaireLibelle: string | null
  } | null
  audiences: {
    surTitre: string | null
    titre: string | null
    cards: { icone: AudienceIcone | null; titre: string; description: string }[] | null
  } | null
  constat: {
    surTitre: string | null
    titre: string | null
    paragraphes: string[] | null
  } | null
  catalogue: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    familles: FormationFamille[] | null
  } | null
  pedagogie: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    principes: { numero: string; titre: string; description: string }[] | null
  } | null
  formats: {
    surTitre: string | null
    titre: string | null
    cards: { icone: FormatIcone | null; titre: string; description: string }[] | null
  } | null
  transversale: {
    surTitre: string | null
    titre: string | null
    intro: string | null
    liens: { numero: string | null; pitch: string; service: ServiceRef }[] | null
  } | null
  faq: {
    surTitre: string | null
    titre: string | null
    questions: { question: string; reponse: string }[] | null
  } | null
  ctaFinal: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    ctaPrimaireLibelle: string | null
    ctaSecondaireLibelle: string | null
    mention: string | null
  } | null
  services: {
    surTitre: string | null
    titre: string | null
    cards: { eyebrow: string | null; pitch: string; service: ServiceRef }[] | null
  } | null
  seo: {
    titre: string | null
    description: string | null
    ogImage: { asset: { _id: string; url: string } | null } | null
  } | null
} | null

export async function getPageFormation(): Promise<PageFormationData> {
  return client.fetch<PageFormationData>(
    pageFormationQuery,
    {},
    { next: { revalidate: 60, tags: ['pageFormation'] } },
  )
}
