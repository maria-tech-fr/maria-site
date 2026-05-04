import type { StructureResolver } from 'sanity/structure'
import { CogIcon, HomeIcon } from '@sanity/icons'

const SINGLETONS = ['parametresGlobaux', 'accueil'] as const

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
