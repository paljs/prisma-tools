import getPrismaSelect from '@prisma-tools/select'
import { plugin } from '@nexus/schema'

export const prismaSelectObject = plugin({
  name: 'prismaSelectObject',
  onCreateFieldResolver() {
    return async (root, args, ctx, info, next) => {
      ctx.select = info.parentType.name === 'Query' ? getPrismaSelect(info) : {}
      return await next(root, args, ctx, info)
    }
  },
})
