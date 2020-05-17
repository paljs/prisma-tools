import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete'
import { schema, use, settings } from 'nexus'
import { prismaSelect } from 'nexus-plugin-prisma-select'

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

settings.change({
  schema: {
    generateGraphQLSDLFile: './schema.graphql',
  },
})

use(prismaSelect())

schema.addToContext(() => {
  return {
    prisma,
  }
})
