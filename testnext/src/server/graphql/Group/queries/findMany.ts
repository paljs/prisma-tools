import { queryField, nonNull, list } from 'nexus'

export const GroupFindManyQuery = queryField('findManyGroup', {
  type: nonNull(list(nonNull('Group'))),
  args: {
    where: 'GroupWhereInput',
    orderBy: list('GroupOrderByWithRelationInput'),
    cursor: 'GroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('GroupScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.group.findMany({
      ...args,
      ...select,
    })
  },
})
