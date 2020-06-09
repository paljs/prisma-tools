import { mutationField, arg } from '@nexus/schema'

export const PostUpsertOneMutation = mutationField('upsertOnePost', {
  type: 'Post',
  nullable: false,
  args: {
    where: arg({
      type: 'PostWhereUniqueInput',
      nullable: false,
    }),
    create: arg({
      type: 'PostCreateInput',
      nullable: false,
    }),
    update: arg({
      type: 'PostUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.upsert({
      ...args,
      ...select,
    })
  },
})
