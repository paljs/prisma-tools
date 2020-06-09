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
  },
})
