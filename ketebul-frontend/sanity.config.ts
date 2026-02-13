import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
// FIX: Import 'schema' instead of 'schemaTypes' to match your index.ts export
import { schema } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Ketebul Music CMS',
  projectId,
  dataset,
  basePath: '/studio',
  schema: schema, // This now correctly references the types array inside the schema object
  plugins: [structureTool(), visionTool()], 
})