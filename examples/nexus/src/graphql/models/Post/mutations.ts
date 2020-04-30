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
      resolve(_, { data }, { prisma, select }) {
        return prisma.post.create({
          data,
          ...select,
        })
      },
    })

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
      resolve(_, { data, where }, { prisma, select }) {
        return prisma.post.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('deleteOnePost', {
      type: 'Post',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select }) => {
        return prisma.post.delete({
          where,
          ...select,
        })
      },
    })

    t.field('updateManyPost', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'PostWhereInput',
          nullable: true,
        }),
        data: schema.arg({
          type: 'PostUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_, { where, data }, { prisma, select }) {
        return prisma.post.updateMany({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
