import { mutationField, nonNull } from 'nexus'

export const GroupUpdateOneMutation = mutationField('updateOneGroup', {
  type: nonNull('Group'),
  args: {
    data: nonNull('GroupUpdateInput'),
    where: nonNull('GroupWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.group.update({
      where,
      data,
      ...select,
    })
  },
})
