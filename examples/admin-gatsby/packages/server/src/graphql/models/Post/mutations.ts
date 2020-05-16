import { extendType, arg } from '@nexus/schema'

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        data: arg({
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

    t.field('updateOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        where: arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'PostUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.post.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('upsertOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        where: arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
        create: arg({
          type: 'PostCreateInput',
          nullable: false,
        }),
        update: arg({
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

    t.field('deleteOnePost', {
      type: 'Post',
      nullable: true,
      args: {
        where: arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'Post', where })
        return prisma.post.delete({
          where,
          ...select,
        })
      },
    })
  },
})
