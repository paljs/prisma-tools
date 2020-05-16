import { extendType, arg } from '@nexus/schema'

export const PersonQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('findOnePerson', {
      type: 'Person',
      nullable: true,
      args: {
        where: arg({
          type: 'PersonWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.person.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyPerson', {
      type: 'Person',
      nullable: true,
      list: true,
      args: {
        where: 'PersonWhereInput',
        orderBy: 'PersonOrderByInput',
        after: 'PersonWhereUniqueInput',
        before: 'PersonWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_parent, args, { prisma, select }) => {
        return prisma.person.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyPersonCount', {
      type: 'Int',
      args: {
        where: 'PersonWhereInput',
        orderBy: 'PersonOrderByInput',
        after: 'PersonWhereUniqueInput',
        before: 'PersonWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_parent, args, { prisma }) => {
        return prisma.person.count(args)
      },
    })
  },
})
