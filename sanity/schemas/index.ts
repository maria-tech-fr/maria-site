import type { SchemaTypeDefinition } from 'sanity'
import { accueil } from './accueil'
import { agence } from './agence'
import { article } from './article'
import { articleCategorie } from './articleCategorie'
import { auteur } from './auteur'
import { lien } from './lien'
import { messageContact } from './messageContact'
import { pageBesoin } from './pageBesoin'
import { pageCharteIA } from './pageCharteIA'
import { pageFormation } from './pageFormation'
import { pagePillier } from './pagePillier'
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
  pageCharteIA,
  pagePillier,
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
