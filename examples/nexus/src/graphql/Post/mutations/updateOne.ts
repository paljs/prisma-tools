import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
          type: 'PostUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.post.update({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
