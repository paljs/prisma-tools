import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  select: any
}

export function createContext(): Context {
  return {
    prisma,
    select: {},
  }
}
