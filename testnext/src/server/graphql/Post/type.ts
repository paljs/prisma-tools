import { objectType } from 'nexus'

export const Post = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Post',
  definition(t) {
    t.int('id')
    t.boolean('published')
    t.string('title')
    t.nullable.field('author', {
      type: 'User',
      resolve(root: any) {
        return root.author
      },
    })
    t.nullable.int('authorId')
    t.list.field('comments', {
      type: 'Comment',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByWithRelationInput',
        cursor: 'CommentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.comments
      },
    })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('_count', {
      type: 'PostCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
