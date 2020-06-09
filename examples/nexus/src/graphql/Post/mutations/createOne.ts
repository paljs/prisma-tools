import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        data: schema.arg({
          type: 'PostCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.post.create({
          data,
          ...select,
        })
      },
    })
  },
})
