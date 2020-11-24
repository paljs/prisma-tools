import { PrismaClient, Prisma as PrismaTypes } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'

class Prisma extends PrismaClient {
  constructor(options?: PrismaTypes.PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
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
