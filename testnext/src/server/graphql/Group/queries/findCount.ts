import { queryField, nonNull, list } from 'nexus'

export const GroupFindCountQuery = queryField('findManyGroupCount', {
  type: nonNull('Int'),
  args: {
    where: 'GroupWhereInput',
    orderBy: list('GroupOrderByWithRelationInput'),
    cursor: 'GroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('GroupScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.group.count(args as any)
  },
})
