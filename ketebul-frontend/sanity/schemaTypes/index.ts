import { type SchemaTypeDefinition } from 'sanity'
import update from './update'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [update],
}