import type { SchemaTypeDefinition } from 'sanity'
import { accueil } from './accueil'
import { agence } from './agence'
import { lien } from './lien'
import { pageBesoin } from './pageBesoin'
import { pageService } from './pageService'
import { parametresGlobaux } from './parametresGlobaux'
import { projets } from './projets'

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  lien,
  // singletons
  parametresGlobaux,
  accueil,
  agence,
  projets,
  // collections
  pageService,
  pageBesoin,
]
