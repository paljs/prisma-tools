import { extendType, arg } from '@nexus/schema'

export const PersonMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOnePerson', {
      type: 'Person',
      nullable: false,
      args: {
        data: arg({
          type: 'PersonCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.person.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOnePerson', {
      type: 'Person',
      nullable: false,
      args: {
        where: arg({
          type: 'PersonWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'PersonUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.person.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('upsertOnePerson', {
      type: 'Person',
      nullable: false,
      args: {
        where: arg({
          type: 'PersonWhereUniqueInput',
          nullable: false,
        }),
        create: arg({
          type: 'PersonCreateInput',
          nullable: false,
        }),
        update: arg({
          type: 'PersonUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.person.upsert({
          ...args,
          ...select,
        })
      },
    })

    t.field('deleteOnePerson', {
      type: 'Person',
      nullable: true,
      args: {
        where: arg({
          type: 'PersonWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('Person', where, false)
        return prisma.person.delete({
          where,
          ...select,
        })
      },
    })

    t.field('deleteManyPerson', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'PersonWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_parent, { where }, { prisma, onDelete }) => {
        await onDelete.cascade('Person', where, false)
        return prisma.person.deleteMany({ where })
      },
    })

    t.field('updateManyPerson', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'PersonWhereInput',
          nullable: true,
        }),
        data: arg({
          type: 'PersonUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma }) {
        return prisma.person.updateMany(args)
      },
    })
  },
})
