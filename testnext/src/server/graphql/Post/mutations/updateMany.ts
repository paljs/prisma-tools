import { mutationField, nonNull } from 'nexus'

export const PostUpdateManyMutation = mutationField('updateManyPost', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PostUpdateManyMutationInput'),
    where: 'PostWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.post.updateMany(args as any)
  },
})
