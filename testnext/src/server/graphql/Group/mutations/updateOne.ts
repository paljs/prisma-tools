import { mutationField, nonNull } from 'nexus'

export const GroupUpdateOneMutation = mutationField('updateOneGroup', {
  type: nonNull('Group'),
  args: {
    where: nonNull('GroupWhereUniqueInput'),
    data: nonNull('GroupUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.group.update({
      where,
      data,
      ...select,
    })
  },
})
