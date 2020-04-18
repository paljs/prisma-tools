import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import DeleteCascade from 'prisma-delete'
import schema from './onDeleteSchema'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: ExpressContext['req']
  res: ExpressContext['res']
  user: Token
  select: any
  onDelete: DeleteCascade
}

export function createContext({ req, res }): Context {
  return {
    req,
    res,
    prisma,
    user: getUser(req),
    select: {},
    onDelete: new DeleteCascade(prisma, schema),
  }
}

interface Token {
  id: number
  email: string
}

export const code = 'secretpass'
function getUser(req: ExpressContext['req']) {
  const { token } = req.cookies

  if (token) {
    return verify(token, code) as Token
  }
  return {
    id: 0,
    email: '',
  }
}
