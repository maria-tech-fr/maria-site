import type { StructureResolver } from 'sanity/structure'
import { CogIcon, HomeIcon, UsersIcon } from '@sanity/icons'

const SINGLETONS = ['parametresGlobaux', 'accueil', 'agence'] as const

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
        (item) => !SINGLETONS.includes(item.getId() as (typeof SINGLETONS)[number]),
      ),
    ])
