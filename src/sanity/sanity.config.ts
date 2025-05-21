import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './desk/structure'

export default defineConfig({
  name: 'accounting-zone',
  title: 'Accounting Zone CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    deskTool({
      structure
    }), 
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
}) 