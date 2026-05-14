import type { StructureResolver } from 'sanity/structure'
import { BulbOutlineIcon, CogIcon, FolderIcon, HomeIcon, RocketIcon, UsersIcon } from '@sanity/icons'

const SINGLETONS = ['parametresGlobaux', 'accueil', 'agence', 'projets'] as const
const HANDLED_COLLECTIONS = ['pageService', 'pageBesoin'] as const
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
      S.listItem()
        .title('Page projets')
        .icon(FolderIcon)
        .child(
          S.editor()
            .id('projets')
            .schemaType('projets')
            .documentId('projets'),
        ),
      S.listItem()
        .title('Pages services')
        .icon(RocketIcon)
        .child(
          S.documentTypeList('pageService')
            .title('Pages services'),
        ),
      S.listItem()
        .title('Pages besoins')
        .icon(BulbOutlineIcon)
        .child(
          S.documentTypeList('pageBesoin')
            .title('Pages besoins'),
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
