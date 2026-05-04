import { client } from '../../sanity/client'
import { parametresGlobauxQuery } from '../../sanity/queries'

export type LienNav = { libelle: string; href: string }

export type ParametresGlobaux = {
  baseline: string | null
  navigation: LienNav[] | null
  contact: {
    email: string | null
    telephone: string | null
    calendlyUrl: string | null
  } | null
  reseauxSociaux:
    | {
        plateforme: 'linkedin' | 'twitter' | 'github' | 'instagram' | 'youtube'
        url: string
      }[]
    | null
  footer: {
    mentionLegales: string | null
    liensLegaux: { libelle: string; href: string }[] | null
  } | null
}

export async function getParametresGlobaux(): Promise<ParametresGlobaux | null> {
  return client.fetch(
    parametresGlobauxQuery,
    {},
    { next: { revalidate: 300, tags: ['parametresGlobaux'] } },
  )
}
