import { queryField, nonNull } from 'nexus'

export const ListFindUniqueQuery = queryField('findUniqueList', {
  type: 'List',
  args: {
    where: nonNull('ListWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.list.findUnique({
      where,
      ...select,
    })
  },
})
