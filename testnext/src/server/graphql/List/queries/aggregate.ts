import { queryField, list } from 'nexus'

export const ListAggregateQuery = queryField('aggregateList', {
  type: 'AggregateList',
  args: {
    where: 'ListWhereInput',
    orderBy: list('ListOrderByInput'),
    cursor: 'ListWhereUniqueInput',
    distinct: 'ListScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.list.aggregate({ ...args, ...select }) as any
  },
})
