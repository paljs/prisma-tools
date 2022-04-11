import { objectType } from 'nexus'

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'User',
  definition(t) {
    t.int('id')
    t.field('createdAt', { type: 'DateTime' })
    t.string('email')
    t.nullable.string('name')
    t.string('password')
    t.list.field('posts', {
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByWithRelationInput',
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PostScalarFieldEnum',
      },
      resolve(root: any) {
        return root.posts
      },
    })
    t.nullable.field('group', {
      type: 'Group',
      resolve(root: any) {
        return root.group
      },
    })
    t.nullable.int('groupId')
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
    t.field('_count', {
      type: 'UserCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
