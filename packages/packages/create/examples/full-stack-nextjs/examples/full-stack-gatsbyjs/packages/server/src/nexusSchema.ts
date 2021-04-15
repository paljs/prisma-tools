import { makeSchema } from 'nexus'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'
import { join } from 'path'

export const schema = makeSchema({
  types,
  plugins: [paljs({ includeAdmin: true })],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
})
