import { NextApiRequest, NextApiResponse } from 'next'
//import { getUserId } from '../utils'
import prisma from './prisma'

export interface Context extends NextApi {
  prisma: typeof prisma
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
    prisma,
    //userId: getUserId(req),
    select: {},
  }
}
