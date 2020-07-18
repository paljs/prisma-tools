import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { schema, use } from 'nexus'
import { paljs } from 'nexus-plugin-paljs'

export class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

use(paljs())

schema.addToContext(() => {
  return {
    prisma,
  }
})
