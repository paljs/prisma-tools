import { PrismaClient, Prisma as PrismaTypes } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserId } from './utils'

class Prisma extends PrismaClient {
  constructor(options?: PrismaTypes.PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: Prisma
if (process.env.NODE_ENV === 'production') {
  db = new Prisma()
  console.log('Production: Created DB connection.')
} else {
  // @ts-ignore
  if (!global.db) {
    // @ts-ignore
    global.db = new Prisma()
    console.log('Development: Created DB connection.')
  }

  // @ts-ignore
  db = global.db
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export interface Context extends NextApi {
  prisma: Prisma
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
    prisma: db,
    userId: getUserId(req),
    select: {},
  }
}
