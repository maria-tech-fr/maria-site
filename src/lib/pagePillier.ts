import { client } from '../../sanity/client'
import { pagePillierQuery } from '../../sanity/queries'

export type PillierSlug = 'services' | 'besoins'

export type PillierIcone = 'shield' | 'lock' | 'user' | 'question' | 'gear' | 'sparkles'

export type PillierEtape = {
  numero: string
  verbe: string
  titre: string
  description: string
}

export type PillierPilier = {
  icone: PillierIcone | null
  titre: string
  description: string
}

export type PagePillierData = {
  slug: PillierSlug
  hero: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    ctaPrimaireLibelle: string | null
    ctaPrimaireHref: string | null
    ctaSecondaireLibelle: string | null
    ctaSecondaireAncre: string | null
  } | null
  vision: {
    surTitre: string | null
    titre: string | null
    paragraphes: string[] | null
  } | null
  central: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
  } | null
  articulation: {
    surTitre: string | null
    titre: string | null
    intro: string | null
    etapes: PillierEtape[] | null
    transversal: {
      label: string | null
      titre: string | null
      description: string | null
      ctaLibelle: string | null
      ctaHref: string | null
    } | null
  } | null
  whyMaria: {
    surTitre: string | null
    titre: string | null
    piliers: PillierPilier[] | null
    charteLien: {
      texte: string | null
      libelle: string | null
      href: string | null
    } | null
  } | null
  faq: {
    surTitre: string | null
    titre: string | null
    questions: { question: string; reponse: string }[] | null
  } | null
  seo: {
    titre: string | null
    description: string | null
  } | null
} | null

export async function getPagePillier(slug: PillierSlug): Promise<PagePillierData> {
  return client.fetch<PagePillierData>(
    pagePillierQuery,
    { slug },
    { next: { revalidate: 60, tags: ['pagePillier'] } },
  )
}
