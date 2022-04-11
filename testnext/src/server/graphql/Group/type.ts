import { objectType } from 'nexus'

export const Group = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Group',
  definition(t) {
    t.int('id')
    t.string('name')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.list.field('users', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByWithRelationInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.users
      },
    })
    t.field('_count', {
      type: 'GroupCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
