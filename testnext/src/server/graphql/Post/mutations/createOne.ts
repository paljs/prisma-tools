import { mutationField, nonNull } from 'nexus'

export const PostCreateOneMutation = mutationField('createOnePost', {
  type: nonNull('Post'),
  args: {
    data: nonNull('PostCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.post.create({
      data,
      ...select,
    })
  },
})
