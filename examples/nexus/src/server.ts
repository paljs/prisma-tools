import { PrismaClient } from '@prisma/client'
import DeleteCascade from '@prisma-tools/delete'
import schemaObject from './onDeleteSchema'
import { schema, use } from 'nexus'
import { prismaSelect } from 'nexus-plugin-prisma-select'

use(prismaSelect())

const prisma = new PrismaClient()
schema.addToContext(() => {
  return {
    prisma,
    onDelete: new DeleteCascade(prisma, schemaObject),
  }
})
