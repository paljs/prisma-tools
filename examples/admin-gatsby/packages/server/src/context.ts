import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import DeleteCascade from '@prisma-tools/delete'
import schema from './onDeleteSchema'
import { getUserId } from './utils'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: ExpressContext['req']
  res: ExpressContext['res']
  userId: number
  select: any
  onDelete: DeleteCascade
}

export function createContext({ req, res }): Context {
  return {
    req,
    res,
    prisma,
    userId: getUserId(req),
    select: {},
    onDelete: new DeleteCascade(prisma, schema),
  }
}
