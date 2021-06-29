import { PrismaClient } from '../../../prisma2/client'
/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: PrismaClient
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  console.log('Production: Created DB2 connection.')
} else {
  // @ts-ignore
  if (!global.db2) {
    // @ts-ignore
    global.db2 = new PrismaClient()
    console.log('Development: Created DB2 connection.')
  }

  // @ts-ignore
  db = global.db2
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export default db
