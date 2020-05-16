import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete'
import { getUserId } from './utils'

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

export interface Context {
  prisma: Prisma
  req: ExpressContext['req']
  res: ExpressContext['res']
  userId: number
  select: any
}

export function createContext({ req, res }): Context {
  return {
    req,
    res,
    prisma,
    userId: getUserId(req),
    select: {},
  }
}
