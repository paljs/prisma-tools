import { queryField, list } from 'nexus'

export const GroupFindFirstQuery = queryField('findFirstGroup', {
  type: 'Group',
  args: {
    where: 'GroupWhereInput',
    orderBy: list('GroupOrderByInput'),
    cursor: 'GroupWhereUniqueInput',
    distinct: 'GroupScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.group.findFirst({
      ...args,
      ...select,
    })
  },
})
