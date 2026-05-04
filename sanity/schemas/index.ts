import type { SchemaTypeDefinition } from 'sanity'
import { accueil } from './accueil'
import { lien } from './lien'
import { parametresGlobaux } from './parametresGlobaux'

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  lien,
  // singletons
  parametresGlobaux,
  accueil,
]
