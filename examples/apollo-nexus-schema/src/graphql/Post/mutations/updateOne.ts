import { mutationField, arg } from '@nexus/schema'

export const PostUpdateOneMutation = mutationField('updateOnePost', {
  type: 'Post',
  nullable: false,
  args: {
    where: arg({
      type: 'PostWhereUniqueInput',
      nullable: false,
    }),
    data: arg({
      type: 'PostUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.post.update({
      where,
      data,
      ...select,
    })
  },
})
