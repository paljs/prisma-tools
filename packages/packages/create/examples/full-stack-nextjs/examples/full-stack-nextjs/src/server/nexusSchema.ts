import { makeSchema } from 'nexus'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'
import { join } from 'path'

export const schema = makeSchema({
  types,
  plugins: [
    paljs({
      includeAdmin: true,
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
