import { PrismaClient } from '@prisma/client'
import DeleteCascade from '@prisma-tools/delete'
import schemaObject from './onDeleteSchema'
import { schema, use, settings } from 'nexus'
import { prismaSelect } from 'nexus-plugin-prisma-select'

settings.change({
  schema: {
    generateGraphQLSDLFile: './schema.graphql',
  },
})

use(prismaSelect())

const prisma = new PrismaClient()
schema.addToContext(() => {
  return {
    prisma,
    onDelete: new DeleteCascade(prisma, schemaObject),
  }
})
