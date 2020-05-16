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
      resolve(_parent, { data }, { prisma, select }) {
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
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.user.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('upsertOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        create: arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
        update: arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.user.upsert({
          ...args,
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
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'User', where })
        return prisma.user.delete({
          where,
          ...select,
        })
      },
    })
  },
})
