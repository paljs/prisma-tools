import { mutationField, nonNull } from 'nexus'

export const GroupUpdateManyMutation = mutationField('updateManyGroup', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'GroupWhereInput',
    data: nonNull('GroupUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.group.updateMany(args as any)
  },
})
