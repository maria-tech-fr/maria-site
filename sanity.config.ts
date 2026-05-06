import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/studio-structure'

const SINGLETONS = ['parametresGlobaux', 'accueil', 'agence', 'projets']

export default defineConfig({
  name: 'maria',
  title: 'maria',
  basePath: '/machine',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      if (SINGLETONS.includes(schemaType)) {
        return prev.filter(({ action }) => !['duplicate', 'delete'].includes(action || ''))
      }
      return prev
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => !SINGLETONS.includes(item.templateId))
      }
      return prev
    },
  },
})
