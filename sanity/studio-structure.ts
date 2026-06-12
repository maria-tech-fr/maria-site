import type { StructureResolver } from 'sanity/structure'
import {
  BulbOutlineIcon,
  ClipboardIcon,
  CogIcon,
  CommentIcon,
  DocumentTextIcon,
  EditIcon,
  HomeIcon,
  RocketIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'

const SINGLETONS = [
  'parametresGlobaux',
  'accueil',
  'agence',
  'projets',
  'pageFormation',
  'pageCharteIA',
  'pagePillierServices',
  'pagePillierBesoins',
] as const
const HANDLED_COLLECTIONS = [
  'pageService',
  'pageBesoin',
  'pagePillier',
  'article',
  'articleCategorie',
  'auteur',
  'promoBlog',
  'messageContact',
] as const
const HIDDEN_FROM_FALLBACK = [...SINGLETONS, ...HANDLED_COLLECTIONS] as readonly string[]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Page d’accueil')
        .icon(HomeIcon)
        .child(
          S.editor()
            .id('accueil')
            .schemaType('accueil')
            .documentId('accueil'),
        ),
      S.listItem()
        .title('Page agence')
        .icon(UsersIcon)
        .child(
          S.editor()
            .id('agence')
            .schemaType('agence')
            .documentId('agence'),
        ),
      // Page projets : route /projets dépubliée (return notFound()),
      // doc Sanity conservé en base pour reprise rapide. Entrée Studio
      // masquée pour ne pas distraire l'éditeur — réactivable en réintégrant
      // ce listItem quand la page revient en ligne.
      // Dossier « Services » : regroupe la page pilier /services + les 3 pages
      // services + la page formation (qui est un service transversal singleton).
      S.listItem()
        .title('Services')
        .icon(RocketIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Tous les services')
                .icon(RocketIcon)
                .child(
                  S.editor()
                    .id('pagePillierServices')
                    .schemaType('pagePillier')
                    .documentId('pagePillierServices'),
                ),
              S.listItem()
                .title('Pages services')
                .icon(RocketIcon)
                .child(
                  S.documentTypeList('pageService')
                    .title('Pages services'),
                ),
              S.listItem()
                .title('Page formation')
                .icon(RocketIcon)
                .child(
                  S.editor()
                    .id('pageFormation')
                    .schemaType('pageFormation')
                    .documentId('pageFormation'),
                ),
            ]),
        ),
      // Dossier « Besoins » : page pilier /besoins + liste des pages besoins.
      S.listItem()
        .title('Besoins')
        .icon(BulbOutlineIcon)
        .child(
          S.list()
            .title('Besoins')
            .items([
              S.listItem()
                .title('Tous les besoins')
                .icon(BulbOutlineIcon)
                .child(
                  S.editor()
                    .id('pagePillierBesoins')
                    .schemaType('pagePillier')
                    .documentId('pagePillierBesoins'),
                ),
              S.listItem()
                .title('Pages besoins')
                .icon(BulbOutlineIcon)
                .child(
                  S.documentTypeList('pageBesoin')
                    .title('Pages besoins'),
                ),
            ]),
        ),
      S.listItem()
        .title('Page charte IA')
        .icon(ClipboardIcon)
        .child(
          S.editor()
            .id('pageCharteIA')
            .schemaType('pageCharteIA')
            .documentId('pageCharteIA'),
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .icon(EditIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Articles')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('article').title('Articles')),
              S.listItem()
                .title('Catégories')
                .icon(TagIcon)
                .child(S.documentTypeList('articleCategorie').title('Catégories d’articles')),
              S.listItem()
                .title('Auteurs')
                .icon(UsersIcon)
                .child(S.documentTypeList('auteur').title('Auteurs')),
              S.listItem()
                .title('Vignettes promo')
                .icon(StarIcon)
                .child(S.documentTypeList('promoBlog').title('Vignettes promo (blog)')),
            ]),
        ),
      S.listItem()
        .title('Messages contact')
        .icon(CommentIcon)
        .child(
          S.documentTypeList('messageContact')
            .title('Messages contact')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Paramètres globaux')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('parametresGlobaux')
            .schemaType('parametresGlobaux')
            .documentId('parametresGlobaux'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_FROM_FALLBACK.includes(item.getId() as string),
      ),
    ])
