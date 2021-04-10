import { mutationField, nonNull } from 'nexus'

export const UserDeleteManyMutation = mutationField('deleteManyUser', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'UserWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.deleteMany({ where } as any)
  },
})
