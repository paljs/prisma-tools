import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete'
import { schema } from '../prisma/schema'

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this, schema)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

export interface Context {
  prisma: Prisma
  select: any
}

export function createContext(): Context {
  return {
    prisma,
    select: {},
  }
}
