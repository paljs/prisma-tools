import { queryField } from '@nexus/schema'

export const UserFindManyQuery = queryField('findManyUser', {
  type: 'User',
  nullable: true,
  list: true,
  args: {
    where: 'UserWhereInput',
    orderBy: 'UserOrderByInput',
    cursor: 'UserWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.findMany({
      ...args,
      ...select,
    })
  },
})
