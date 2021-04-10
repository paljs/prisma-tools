import { queryField, nonNull } from 'nexus'

export const GroupFindUniqueQuery = queryField('findUniqueGroup', {
  type: 'Group',
  args: {
    where: nonNull('GroupWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.group.findUnique({
      where,
      ...select,
    })
  },
})
