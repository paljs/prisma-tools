import { queryField, nonNull, list } from 'nexus'

export const UserFindCountQuery = queryField('findManyUserCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByWithRelationInput'),
    cursor: 'UserWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.count(args as any)
  },
})
