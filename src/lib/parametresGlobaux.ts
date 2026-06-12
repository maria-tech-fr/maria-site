import { client } from '../../sanity/client'
import { parametresGlobauxQuery } from '../../sanity/queries'

export type ParametresGlobaux = {
  contact: {
    email: string | null
    telephone: string | null
    calendlyUrl: string | null
  } | null
}

export async function getParametresGlobaux(): Promise<ParametresGlobaux | null> {
  return client.fetch(
    parametresGlobauxQuery,
    {},
    { next: { revalidate: 300, tags: ['parametresGlobaux'] } },
  )
}
