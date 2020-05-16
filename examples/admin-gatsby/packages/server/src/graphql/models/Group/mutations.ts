import { extendType, arg } from '@nexus/schema'

export const GroupMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneGroup', {
      type: 'Group',
      nullable: false,
      args: {
        data: arg({
          type: 'GroupCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.group.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOneGroup', {
      type: 'Group',
      nullable: false,
      args: {
        where: arg({
          type: 'GroupWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'GroupUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.group.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('upsertOneGroup', {
      type: 'Group',
      nullable: false,
      args: {
        where: arg({
          type: 'GroupWhereUniqueInput',
          nullable: false,
        }),
        create: arg({
          type: 'GroupCreateInput',
          nullable: false,
        }),
        update: arg({
          type: 'GroupUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.group.upsert({
          ...args,
          ...select,
        })
      },
    })

    t.field('deleteOneGroup', {
      type: 'Group',
      nullable: true,
      args: {
        where: arg({
          type: 'GroupWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'Group', where })
        return prisma.group.delete({
          where,
          ...select,
        })
      },
    })
  },
})
