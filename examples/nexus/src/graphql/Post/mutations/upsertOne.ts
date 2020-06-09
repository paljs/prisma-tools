import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
        create: schema.arg({
          type: 'PostCreateInput',
          nullable: false,
        }),
        update: schema.arg({
          type: 'PostUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.post.upsert({
          ...args,
          ...select,
        })
      },
    })
  },
})
