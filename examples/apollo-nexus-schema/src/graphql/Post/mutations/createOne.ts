import { mutationField, arg } from '@nexus/schema'

export const PostCreateOneMutation = mutationField('createOnePost', {
  type: 'Post',
  nullable: false,
  args: {
    data: arg({
      type: 'PostCreateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.post.create({
      data,
      ...select,
    })
  },
})
