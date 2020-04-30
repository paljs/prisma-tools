import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('email', { nullable: false })
    t.string('name', { nullable: true })
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
