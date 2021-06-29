import { mutationField, nonNull } from 'nexus'

export const GroupDeleteManyMutation = mutationField('deleteManyGroup', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'GroupWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.group.deleteMany({ where } as any)
  },
})
