import { RuntimePlugin } from 'nexus/plugin'
import { prismaSelectObject } from 'nexus-schema-plugin-prisma-select'

export const plugin: RuntimePlugin = () => () => {
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
      plugins: [prismaSelectObject() as any],
    },
  }
}
