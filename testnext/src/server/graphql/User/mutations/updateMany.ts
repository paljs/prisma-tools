import { mutationField, nonNull } from 'nexus'

export const UserUpdateManyMutation = mutationField('updateManyUser', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('UserUpdateManyMutationInput'),
    where: 'UserWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.updateMany(args as any)
  },
})
