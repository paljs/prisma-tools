import { mutationField, nonNull } from 'nexus'

export const PostDeleteManyMutation = mutationField('deleteManyPost', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PostWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Post', where })
    return prisma.post.deleteMany({ where } as any)
  },
})
