import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure' // Add this
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Ketebul Music CMS',
  projectId,
  dataset,
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  // Adding structureTool allows you to actually edit content
  plugins: [structureTool(), visionTool()], 
})