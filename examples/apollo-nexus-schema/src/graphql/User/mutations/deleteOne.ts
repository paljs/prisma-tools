import { mutationField, arg } from '@nexus/schema'

export const UserDeleteOneMutation = mutationField('deleteOneUser', {
  type: 'User',
  nullable: true,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'User', where })
    return prisma.user.delete({
      where,
      ...select,
    })
  },
})
