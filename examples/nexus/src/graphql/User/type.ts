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
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['posts']
      },
    })
    t.field('group', {
      nullable: true,
      type: 'Group',
      resolve(parent: any) {
        return parent['group']
      },
    })
    t.int('groupId', { nullable: true })
    t.field('comments', {
      nullable: false,
      list: [true],
      type: 'Comment',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        cursor: 'CommentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['comments']
      },
    })
  },
})
