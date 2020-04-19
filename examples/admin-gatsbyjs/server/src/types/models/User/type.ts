import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false })
    t.field('createdAt', { nullable: false, type: 'DateTime' })
    t.string('email', { nullable: false })
    t.string('name', { nullable: true })
    t.field('role', { nullable: false, type: 'Role' })
    t.field('posts', {
      nullable: false,
      list: [true],
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        skip: 'Int',
        after: 'PostWhereUniqueInput',
        before: 'PostWhereUniqueInput',
        first: 'Int',
        last: 'Int',
      },
    })
    t.field('group', { nullable: true, type: 'Group' })
    t.int('groupId', { nullable: true })
    t.field('comment', {
      nullable: false,
      list: [true],
      type: 'Comment',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        skip: 'Int',
        after: 'CommentWhereUniqueInput',
        before: 'CommentWhereUniqueInput',
        first: 'Int',
        last: 'Int',
      },
    })
  },
})
