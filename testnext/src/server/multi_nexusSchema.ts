import { makeSchema } from 'nexus'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'
import { join } from 'path'
import { Prisma as Prisma1 } from '../../multi_prisma/prisma1/client'
import { Prisma as Prisma2 } from '../../multi_prisma/prisma2/client'

export const schema = makeSchema({
  types,
  plugins: [
    paljs({
      includeAdmin: true,
      dmmf: [Prisma1.dmmf, Prisma2.dmmf],
      prismaSelectOptions: { dmmf: [Prisma1.dmmf, Prisma2.dmmf] },
    }),
  ],
  outputs: {
    schema: join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), 'src', 'server', 'context', 'index.ts'),
    export: 'Context',
  },
})
