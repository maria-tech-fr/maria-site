import { client } from '../../sanity/client'
import {
  besoinsMenuQuery,
  pageBesoinQuery,
  pageBesoinSlugsQuery,
} from '../../sanity/queries'

export type BesoinFamilleKey =
  | 'productivite-operationnelle'
  | 'organisation-connaissance'
  | 'pilotage-decision'
  | 'rh-formation'
  | 'gouvernance-conformite'

export type BesoinFamilleMeta = {
  key: BesoinFamilleKey
  titre: string
  tagline: string
}

export const FAMILLES: BesoinFamilleMeta[] = [
  { key: 'productivite-operationnelle', titre: 'Productivité opérationnelle', tagline: 'Faire mieux, plus vite, au quotidien.' },
  { key: 'organisation-connaissance', titre: 'Organisation & connaissance', tagline: 'Capter et partager le savoir interne.' },
  { key: 'pilotage-decision', titre: 'Pilotage & décision', tagline: 'Voir clair pour bien arbitrer.' },
  { key: 'rh-formation', titre: 'RH & formation', tagline: 'Soutenir les équipes humaines.' },
  { key: 'gouvernance-conformite', titre: 'Gouvernance & conformité', tagline: 'Cadrer pour éviter les dérives.' },
]

export function getFamilleMeta(key: string | null): BesoinFamilleMeta | null {
  return FAMILLES.find((f) => f.key === key) ?? null
}

/* ----------------------------------------------------------------------------
 * Sous-menu nav (mega-menu Besoins)
 * -------------------------------------------------------------------------- */
export type BesoinMenuItem = {
  titre: string
  slug: string
  famille: BesoinFamilleKey | null
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

/* ----------------------------------------------------------------------------
 * Page /besoins/[slug]
 * -------------------------------------------------------------------------- */

export type CoutIcone = 'time' | 'human' | 'opportunity'
export type LevierIcone = 'search' | 'sparkles' | 'shield' | 'users' | 'gear' | 'zap'

export type PageBesoinData = {
  titre: string
  slug: string
  famille: BesoinFamilleKey | null
  introCourte: string | null
  hero: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    ctaPrimaireLibelle: string | null
    ctaSecondaireLibelle: string | null
  } | null
  probleme: {
    surTitre: string | null
    titre: string | null
    paragraphes: string[] | null
    recogSurTitre: string | null
    recogTitre: string | null
    symptomes: string[] | null
  } | null
  cout: {
    surTitre: string | null
    titre: string | null
    items: { icone: CoutIcone | null; titre: string; description: string }[] | null
  } | null
  reponse: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    leviers: { icone: LevierIcone | null; titre: string; description: string }[] | null
  } | null
  transformation: {
    surTitre: string | null
    titre: string | null
    avant: string[] | null
    apres: string[] | null
    closing: string | null
  } | null
  serviceAssocie: {
    surTitre: string | null
    titre: string | null
    cards: {
      numero: string | null
      pitch: string
      ctaLibelle: string | null
      service: { titre: string; slug: string } | null
    }[] | null
    formationMention: {
      texte: string | null
      lienLibelle: string | null
      lienHref: string | null
    } | null
  } | null
  faq: {
    surTitre: string | null
    titre: string | null
    questions: { question: string; reponse: string }[] | null
  } | null
  besoinsLies: {
    surTitre: string | null
    titre: string | null
    references: { titre: string; slug: string; introCourte: string | null }[] | null
  } | null
  ctaFinal: {
    surTitre: string | null
    titre: string | null
    sousTitre: string | null
    ctaPrimaireLibelle: string | null
    ctaSecondaireLibelle: string | null
    mention: string | null
  } | null
  seo: {
    titre: string | null
    description: string | null
  } | null
} | null

export async function getPageBesoinBySlug(slug: string): Promise<PageBesoinData> {
  return client.fetch<PageBesoinData>(
    pageBesoinQuery,
    { slug },
    { next: { revalidate: 60, tags: ['pageBesoin'] } },
  )
}

export async function getPageBesoinSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    pageBesoinSlugsQuery,
    {},
    { next: { revalidate: 60, tags: ['pageBesoin'] } },
  )
  return (rows ?? []).map((r) => r.slug).filter(Boolean)
}

