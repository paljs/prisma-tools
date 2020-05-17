import { schema } from 'nexus'

schema.objectType({
  name: 'Group',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('name', { nullable: false })
    t.field('users', {
      nullable: false,
      list: [true],
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        skip: 'Int',
        after: 'UserWhereUniqueInput',
        before: 'UserWhereUniqueInput',
        first: 'Int',
        last: 'Int',
      },
      resolve(parent) {
        return parent['users']
      },
    })
  },
})
