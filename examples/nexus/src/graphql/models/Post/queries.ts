import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOnePost', {
      type: 'Post',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.post.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyPost', {
      type: 'Post',
      nullable: true,
      list: true,
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        after: 'PostWhereUniqueInput',
        before: 'PostWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_parent, args, { prisma, select }) => {
        return prisma.post.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyPostCount', {
      type: 'Int',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        after: 'PostWhereUniqueInput',
        before: 'PostWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_parent, args, { prisma }) => {
        return prisma.post.count(args)
      },
    })
  },
})
