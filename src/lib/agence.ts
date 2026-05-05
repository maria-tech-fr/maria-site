import { client } from '../../sanity/client'
import { agenceQuery } from '../../sanity/queries'

export type AgenceHero = {
  surTitre: string
  titre: string
  description: string
}

export type ParagrapheManifeste = {
  texte: string
  emphase: 'aucune' | 'totale' | 'premiere-phrase'
}

export type Manifeste = {
  surTitre: string
  titre: string
  paragraphes: ParagrapheManifeste[] | null
}

export type ValeurIconName = 'maitrise' | 'transparence' | 'securite' | 'humanite'

export type Principe = {
  icone: ValeurIconName
  nom: string
  description: string
}

export type Valeurs = {
  surTitre: string
  titre: string
  principes: Principe[] | null
}

export type PointNonNegociable = { titre: string; description: string }

export type NonNegociables = {
  surTitre: string
  titre: string
  sousTitre: string | null
  points: PointNonNegociable[] | null
}

export type EtapeProcessus = { numero: string; titre: string; description: string }

export type Processus = {
  surTitre: string
  titre: string
  sousTitre: string | null
  etapes: EtapeProcessus[] | null
}

export type CategorieTechno = {
  surTitre: string
  titre: string
  technos: string[] | null
}

export type Technos = {
  surTitre: string
  titre: string
  sousTitre: string | null
  categories: CategorieTechno[] | null
}

export type Engagements = {
  surTitre: string
  titre: string
  points: string[] | null
}

export type QuestionFaq = { question: string; reponse: string }

export type Faq = {
  surTitre: string
  titre: string
  questions: QuestionFaq[] | null
}

export type Agence = {
  hero: AgenceHero | null
  manifeste: Manifeste | null
  valeurs: Valeurs | null
  nonNegociables: NonNegociables | null
  processus: Processus | null
  technos: Technos | null
  engagements: Engagements | null
  faq: Faq | null
} | null

export async function getAgence(): Promise<Agence> {
  return client.fetch(
    agenceQuery,
    {},
    { next: { revalidate: 60, tags: ['agence'] } },
  )
}
