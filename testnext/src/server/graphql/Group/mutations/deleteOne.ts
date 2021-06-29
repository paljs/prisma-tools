import { mutationField, nonNull } from 'nexus'

export const GroupDeleteOneMutation = mutationField('deleteOneGroup', {
  type: 'Group',
  args: {
    where: nonNull('GroupWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.group.delete({
      where,
      ...select,
    })
  },
})
