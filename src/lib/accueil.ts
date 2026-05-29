import { client } from '../../sanity/client'
import { accueilQuery } from '../../sanity/queries'
import type { SanityImageRef } from './article'

export type Lien = {
  libelle: string
  type: 'interne' | 'externe'
  cheminInterne: string | null
  urlExterne: string | null
}

export type Hero = {
  surTitre: string
  titreLigne1: string
  titreLigne2: string | null
  sousTitre: string
  ctaPrincipal: Lien
  ctaSecondaire: Lien | null
}

export type ReassuranceIconName = 'securite' | 'validation' | 'livraison' | 'donnees'

export type ReassuranceItem = {
  icone: ReassuranceIconName
  libelle: string
}

export type ParagrapheConstat = {
  texte: string
  emphase: boolean | null
}

export type Constat = {
  surTitre: string
  titre: string
  paragraphes: ParagrapheConstat[] | null
  citation: string | null
}

export type ServiceIconName =
  | 'outils-internes'
  | 'agents-chatbots'
  | 'communication'
  | 'audit-strategie'

export type ServiceCard = {
  icone: ServiceIconName
  titre: string
  description: string
  lien: Lien
}

export type Services = {
  surTitre: string
  titre: string
  description: string
  cards: ServiceCard[] | null
}

export type EtapeMethode = {
  numero: string
  categorie: string
  titre: string
  description: string
}

export type Methode = {
  surTitre: string
  titre: string
  description: string
  etapes: EtapeMethode[] | null
  lien: Lien | null
}

export type Metrique = {
  valeur: string
  libelle: string
  couleur: 'accent' | 'success' | 'ink'
}

export type ClientLogo = {
  nom: string
  logo: SanityImageRef | null
}

export type ProjetVedette = {
  surTitre: string
  titre: string
  metriques: Metrique[] | null
  lien: Lien | null
  surTitreClients: string | null
  clients: ClientLogo[] | null
}

export type CarteMachineHumain = {
  surTitre: string
  titre: string
  items: string[] | null
}

export type PourquoiMaria = {
  surTitre: string
  titre: string
  cardMachine: CarteMachineHumain | null
  cardHumain: CarteMachineHumain | null
  conclusion: string | null
}

export type MembreExpert = {
  nom: string
  role: string
  badge: string | null
  photo: SanityImageRef | null
}

export type Experts = {
  surTitre: string
  titre: string
  description: string
  membres: MembreExpert[] | null
  lien: Lien | null
}

export type Accueil = {
  hero: Hero | null
  reassurance: ReassuranceItem[] | null
  constat: Constat | null
  services: Services | null
  methode: Methode | null
  projetVedette: ProjetVedette | null
  pourquoiMaria: PourquoiMaria | null
  experts: Experts | null
} | null

export async function getAccueil(): Promise<Accueil> {
  return client.fetch(
    accueilQuery,
    {},
    { next: { revalidate: 60, tags: ['accueil'] } },
  )
}

export function lienHref(lien: Lien): string {
  if (lien.type === 'externe') return lien.urlExterne ?? '#'
  return lien.cheminInterne ?? '#'
}

export function lienExterne(lien: Lien): boolean {
  return lien.type === 'externe'
}
