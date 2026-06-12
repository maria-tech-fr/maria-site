import { client } from '../../sanity/client'
import { pageCharteIAQuery } from '../../sanity/queries'

export type Engagement = {
  numero: string
  titre: string
  description: string
}

export type PageCharteIAData = {
  hero: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
  } | null
  preambule: {
    surTitre: string | null
    titre: string | null
    paragraphes: string[] | null
  } | null
  engagements: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    items: Engagement[] | null
  } | null
  lignesRouges: {
    surTitre: string | null
    titre: string | null
    intro: string | null
    items: string[] | null
  } | null
  disclaimer: {
    surTitre: string | null
    titre: string | null
    paragraphes: string[] | null
  } | null
  revision: {
    lastUpdated: string | null
    mention: string | null
  } | null
  seo: {
    titre: string | null
    description: string | null
    ogImage: { asset: { _id: string; url: string } | null } | null
  } | null
} | null

export async function getPageCharteIA(): Promise<PageCharteIAData> {
  return client.fetch<PageCharteIAData>(
    pageCharteIAQuery,
    {},
    { next: { revalidate: 60, tags: ['pageCharteIA'] } },
  )
}
