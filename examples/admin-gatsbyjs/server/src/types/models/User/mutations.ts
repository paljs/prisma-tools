import { extendType, arg } from '@nexus/schema'

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      nullable: false,
      args: {
        data: arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
      },
      resolve(_, { data }, { prisma, select }) {
        return prisma.user.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_, { data, where }, { prisma, select }) {
        return prisma.user.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('deleteOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('User', where, false)
        return prisma.user.delete({
          where,
          ...select,
        })
      },
    })

    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('User', where, false)
        return prisma.user.deleteMany({
          where,
          ...select,
        })
      },
    })

    t.field('updateManyUser', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
        data: arg({
          type: 'UserUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_, { where, data }, { prisma, select }) {
        return prisma.user.updateMany({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
