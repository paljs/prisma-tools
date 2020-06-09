import { mutationField, arg } from '@nexus/schema'

export const UserDeleteManyMutation = mutationField('deleteManyUser', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'UserWhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.deleteMany({ where })
  },
})
