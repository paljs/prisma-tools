import { mutationField, nonNull } from 'nexus'

export const PostDeleteManyMutation = mutationField('deleteManyPost', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PostWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.post.deleteMany({ where } as any)
  },
})
