import { queryField } from '@nexus/schema'

export const UserFindManyCountQuery = queryField('findManyUserCount', {
  type: 'Int',
  args: {
    where: 'UserWhereInput',
    orderBy: 'UserOrderByInput',
    cursor: 'UserWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.count(args)
  },
})
