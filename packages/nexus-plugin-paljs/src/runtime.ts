import { RuntimePlugin } from 'nexus/plugin'
import { paljs, Settings } from '@paljs/nexus'

export const plugin: RuntimePlugin<Settings> = (settings) => () => {
  return {
    context: {
      create: (_req) => {
        return {
          select: {},
        }
      },
      typeGen: {
        fields: {
          select: 'any',
        },
      },
    },
    schema: {
      plugins: [paljs({ isNexus: true, ...settings })],
    },
  }
}
