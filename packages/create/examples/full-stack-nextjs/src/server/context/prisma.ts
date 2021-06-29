import { PrismaClient } from '@prisma/client'

/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: PrismaClient
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  console.log('Production: Created DB connection.')
} else {
  // @ts-ignore
  if (!global.db) {
    // @ts-ignore
    global.db = new PrismaClient()
    console.log('Development: Created DB connection.')
  }

  // @ts-ignore
  db = global.db
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export default db
