import { queryField, list } from 'nexus'

export const GroupAggregateQuery = queryField('aggregateGroup', {
  type: 'AggregateGroup',
  args: {
    where: 'GroupWhereInput',
    orderBy: list('GroupOrderByInput'),
    cursor: 'GroupWhereUniqueInput',
    distinct: 'GroupScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.group.aggregate({ ...args, ...select }) as any
  },
})
