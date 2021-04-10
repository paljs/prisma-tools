import { queryField, nonNull } from 'nexus'

export const UserFindUniqueQuery = queryField('findUniqueUser', {
  type: 'User',
  args: {
    where: nonNull('UserWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.user.findUnique({
      where,
      ...select,
    })
  },
})
