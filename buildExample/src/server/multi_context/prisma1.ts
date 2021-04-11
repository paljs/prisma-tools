import { PrismaClient, Prisma as PrismaTypes } from '../../../prisma1/client'
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
  console.log('Production: Created DB connection.')
} else {
  // @ts-ignore
  if (!global.db1) {
    // @ts-ignore
    global.db1 = new Prisma()
    console.log('Development: Created DB connection.')
  }

  // @ts-ignore
  db = global.db1
}

db.$executeRaw('PRAGMA foreign_keys = ON')

export default db
