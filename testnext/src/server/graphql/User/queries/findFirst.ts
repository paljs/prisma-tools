import { queryField, list } from 'nexus'

export const UserFindFirstQuery = queryField('findFirstUser', {
  type: 'User',
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByWithRelationInput'),
    cursor: 'UserWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.findFirst({
      ...args,
      ...select,
    })
  },
})
