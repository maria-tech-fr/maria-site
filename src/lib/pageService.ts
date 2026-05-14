import { client } from '../../sanity/client'
import { pageServiceQuery, pageServiceSlugsQuery } from '../../sanity/queries'

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

export type PageService = {
  titre: string
  slug: string
  hero: ServiceHero | null
  pourQui: ServicePourQui | null
  constat: ServiceConstat | null
  livrable: ServiceLivrable | null
  methode: ServiceMethode | null
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
