import { mutationField, nonNull } from 'nexus'

export const UserUpdateManyMutation = mutationField('updateManyUser', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'UserWhereInput',
    data: nonNull('UserUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.updateMany(args as any)
  },
})
