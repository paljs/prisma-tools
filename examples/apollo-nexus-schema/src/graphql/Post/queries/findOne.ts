import { queryField, arg } from '@nexus/schema'

export const PostFindOneQuery = queryField('findOnePost', {
  type: 'Post',
  nullable: true,
  args: {
    where: arg({
      type: 'PostWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.post.findOne({
      where,
      ...select,
    })
  },
})
