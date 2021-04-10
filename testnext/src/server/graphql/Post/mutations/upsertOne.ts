import { mutationField, nonNull } from 'nexus'

export const PostUpsertOneMutation = mutationField('upsertOnePost', {
  type: nonNull('Post'),
  args: {
    where: nonNull('PostWhereUniqueInput'),
    create: nonNull('PostCreateInput'),
    update: nonNull('PostUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.upsert({
      ...args,
      ...select,
    })
  },
})
