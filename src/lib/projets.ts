import { client } from '../../sanity/client'
import { projetsQuery } from '../../sanity/queries'

export type ProjetsHero = {
  surTitre: string
  titre: string
  description: string
}

export type IdentiteEtude = {
  client: string
  secteur: string
  type: string
  outils: string
  statut: 'termine' | 'en-cours' | 'a-venir'
}

export type EtapeApproche = {
  numeroLibelle: string
  titre: string
  description: string
}

export type Fonctionnalite = {
  titre: string
  description: string
}

export type CitationDirigeant = {
  texte: string
  auteur: string
  role: string
}

export type Capture = {
  legende: string | null
  image: {
    asset: {
      _id: string
      url: string
      metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } }
    } | null
  } | null
}

export type ApercuOutil = {
  surTitre: string
  titre: string
  captures: Capture[] | null
}

export type EtudeDeCas = {
  surTitre: string
  titrePrefixe: string | null
  titre: string
  identite: IdentiteEtude
  contexte: { surTitre: string; texte: string; emphase: string | null }
  defi: { surTitre: string; texte: string; emphase: string | null }
  approche: { titre: string; etapes: EtapeApproche[] | null }
  fonctionnalites: { titre: string; items: Fonctionnalite[] | null }
  apercuOutil: ApercuOutil | null
  citation: CitationDirigeant
  technos: string[] | null
}

export type Picto = {
  asset: { _id: string; url: string; mimeType: string } | null
} | null

export type CardSavoirFaire = {
  titre: string
  description: string
  picto: Picto
}

export type SavoirFaire = {
  surTitre: string
  titre: string
  description: string
  cards: CardSavoirFaire[] | null
}

export type ProjetPasse = {
  categorie: string
  titre: string
  description: string
}

export type ProjetsPasses = {
  surTitre: string
  titre: string
  description: string
  projets: ProjetPasse[] | null
}

export type ProjetAVenir = {
  categorie: string
  titre: string
  mention: string
  picto: Picto
}

export type ProjetsAVenir = {
  surTitre: string
  titre: string
  description: string
  projets: ProjetAVenir[] | null
}

export type Projets = {
  hero: ProjetsHero | null
  etudeDeCas: EtudeDeCas | null
  savoirFaire: SavoirFaire | null
  projetsPasses: ProjetsPasses | null
  projetsAVenir: ProjetsAVenir | null
} | null

export async function getProjets(): Promise<Projets> {
  return client.fetch(
    projetsQuery,
    {},
    { next: { revalidate: 60, tags: ['projets'] } },
  )
}
