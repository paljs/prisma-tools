import { NextApiRequest, NextApiResponse } from 'next'
import { getUserId } from '../utils'
import prisma1 from './prisma1'
import prisma2 from './prisma2'

export interface Context extends NextApi {
  prisma1: typeof prisma1
  prisma2: typeof prisma2
  userId?: number
  select: any
}

interface NextApi {
  req: NextApiRequest
  res: NextApiResponse
}

export function createContext({ req, res }: NextApi): Context {
  return {
    req,
    res,
    prisma1,
    prisma2,
    userId: getUserId(req),
    select: {},
  }
}
