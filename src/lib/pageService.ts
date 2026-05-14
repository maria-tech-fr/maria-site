import { client } from '../../sanity/client'
import {
  pageServiceQuery,
  pageServiceSlugsQuery,
  servicesMenuQuery,
} from '../../sanity/queries'

export type ServiceMenuItem = {
  titre: string
  slug: string
  ordreMenu: number
  introCourte: string | null
  pictoMenu: {
    asset: { _id: string; url: string; mimeType: string } | null
  } | null
}

export type ServiceHero = {
  surTitre: string
  titre: string
  description: string
  ctaLibelle: string
  ctaHref: string | null
}

export type CardPourQui = {
  numero: string
  titre: string
  description: string
}

export type ServicePourQui = {
  surTitre: string
  titre: string
  cards: CardPourQui[] | null
}

export type ParagrapheConstat = {
  texte: string
  emphase: string | null
}

export type ServiceConstat = {
  surTitre: string
  titre: string
  paragraphes: ParagrapheConstat[] | null
}

export type Picto = {
  asset: { _id: string; url: string; mimeType: string } | null
} | null

export type LivrableItem = {
  numero: string
  titre: string
  description: string
  picto: Picto
}

export type ServiceLivrable = {
  surTitre: string
  titre: string
  sousTitre: string | null
  items: LivrableItem[] | null
}

export type EtapeMethode = {
  numero: string
  libelle: string
  titre: string
  description: string
  duree: string
}

export type ServiceMethode = {
  surTitre: string
  titre: string
  sousTitre: string | null
  etapes: EtapeMethode[] | null
  lienLibelle: string | null
  lienHref: string | null
}

export type GarantieItem = { titre: string; description: string }

export type ServiceGaranties = {
  surTitre: string
  titre: string
  items: GarantieItem[] | null
}

export type ServiceCitation = {
  surTitre: string
  texte: string
  auteur: string
  auteurTag: string | null
}

export type SectionRapport = {
  numero: string
  titre: string
  description: string
  pages: string
}

export type ServiceLivrableRapport = {
  surTitre: string
  titre: string
  sousTitre: string | null
  mockupKicker: string | null
  mockupTitre: string
  mockupMeta: string | null
  sections: SectionRapport[] | null
  annexesTitre: string | null
  annexes: string[] | null
}

export type KpiProjet = { chiffre: string; libelle: string }

export type ServiceProjetPhare = {
  surTitre: string | null
  titre: string | null
  description: string | null
  kpis: KpiProjet[] | null
}

export type ServiceFaqQuestion = { question: string; reponse: string }

export type ServiceFaq = {
  surTitre: string
  titre: string
  questions: ServiceFaqQuestion[] | null
}

export type AutreServiceItem = {
  eyebrow: string
  titre: string
  description: string
  lienLibelle: string | null
  lienHref: string | null
}

export type ServiceAutres = {
  surTitre: string
  titre: string
  services: AutreServiceItem[] | null
}

export type PageService = {
  titre: string
  slug: string
  hero: ServiceHero | null
  pourQui: ServicePourQui | null
  constat: ServiceConstat | null
  livrable: ServiceLivrable | null
  methode: ServiceMethode | null
  garanties: ServiceGaranties | null
  citation: ServiceCitation | null
  livrableRapport: ServiceLivrableRapport | null
  projetPhare: ServiceProjetPhare | null
  faq: ServiceFaq | null
  autresServices: ServiceAutres | null
} | null

export async function getPageService(slug: string): Promise<PageService> {
  return client.fetch(
    pageServiceQuery,
    { slug },
    { next: { revalidate: 60, tags: ['pageService', `pageService:${slug}`] } },
  )
}

export async function getPageServiceSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    pageServiceSlugsQuery,
    {},
    { next: { revalidate: 60, tags: ['pageService'] } },
  )
  return rows.map((r) => r.slug)
}

export async function getServicesMenu(): Promise<ServiceMenuItem[]> {
  const rows = await client.fetch<ServiceMenuItem[]>(
    servicesMenuQuery,
    {},
    { next: { revalidate: 60, tags: ['pageService'] } },
  )
  return rows ?? []
}
