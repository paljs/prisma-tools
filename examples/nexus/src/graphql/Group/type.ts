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
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['users']
      },
    })
  },
})
