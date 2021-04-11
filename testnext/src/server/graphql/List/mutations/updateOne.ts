import { mutationField, nonNull } from 'nexus'

export const ListUpdateOneMutation = mutationField('updateOneList', {
  type: nonNull('List'),
  args: {
    where: nonNull('ListWhereUniqueInput'),
    data: nonNull('ListUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.list.update({
      where,
      data,
      ...select,
    })
  },
})
