import { client } from '../../sanity/client'
import { besoinsMenuQuery } from '../../sanity/queries'

export type BesoinMenuItem = {
  titre: string
  slug: string
  ordreMenu: number
  introCourte: string | null
  pictoMenu: {
    asset: { _id: string; url: string; mimeType: string } | null
  } | null
}

export async function getBesoinsMenu(): Promise<BesoinMenuItem[]> {
  const rows = await client.fetch<BesoinMenuItem[]>(
    besoinsMenuQuery,
    {},
    { next: { revalidate: 60, tags: ['pageBesoin'] } },
  )
  return rows ?? []
}
