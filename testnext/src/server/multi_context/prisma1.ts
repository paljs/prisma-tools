import { PrismaClient } from '../../../multi_prisma/prisma1/client'

/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: PrismaClient
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  console.log('Production: Created DB1 connection.')
} else {
  // @ts-ignore
  if (!global.db1) {
    // @ts-ignore
    global.db1 = new PrismaClient()
    console.log('Development: Created DB1 connection.')
  }

  // @ts-ignore
  db = global.db1
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export default db
