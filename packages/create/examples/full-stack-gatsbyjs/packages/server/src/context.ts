import { PrismaClient, Prisma as PrismaTypes } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { getUserId } from './utils'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
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
