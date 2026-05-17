import type { SchemaTypeDefinition } from 'sanity'
import { accueil } from './accueil'
import { agence } from './agence'
import { article } from './article'
import { articleCategorie } from './articleCategorie'
import { auteur } from './auteur'
import { lien } from './lien'
import { messageContact } from './messageContact'
import { pageBesoin } from './pageBesoin'
import { pageFormation } from './pageFormation'
import { pageService } from './pageService'
import { parametresGlobaux } from './parametresGlobaux'
import { projets } from './projets'
import { promoBlog } from './promoBlog'

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  lien,
  // singletons
  parametresGlobaux,
  accueil,
  agence,
  projets,
  pageFormation,
  // collections
  pageService,
  pageBesoin,
  // blog
  article,
  articleCategorie,
  auteur,
  promoBlog,
  // contact
  messageContact,
]
