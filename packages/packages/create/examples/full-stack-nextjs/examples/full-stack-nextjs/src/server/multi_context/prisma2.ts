import { PrismaClient, Prisma as PrismaTypes } from '../../../prisma2/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'

class Prisma extends PrismaClient {
  constructor(options?: PrismaTypes.PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this, { dmmf: PrismaTypes.dmmf })
    await prismaDelete.onDelete(args)
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: Prisma
if (process.env.NODE_ENV === 'production') {
  db = new Prisma()
  console.log('Production: Created DB2 connection.')
} else {
  // @ts-ignore
  if (!global.db2) {
    // @ts-ignore
    global.db2 = new Prisma()
    console.log('Development: Created DB2 connection.')
  }

  // @ts-ignore
  db = global.db2
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export default db
