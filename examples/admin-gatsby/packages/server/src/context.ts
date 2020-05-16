import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import PrismaDelete from './onDeleteSchema'
import { getUserId } from './utils'

const prisma = new PrismaClient({ log: ['query'] })

export interface Context {
  prisma: PrismaClient
  req: ExpressContext['req']
  res: ExpressContext['res']
  userId: number
  select: any
  onDelete: PrismaDelete
}

export function createContext({ req, res }): Context {
  return {
    req,
    res,
    prisma,
    userId: getUserId(req),
    select: {},
    onDelete: new PrismaDelete(prisma),
  }
}
