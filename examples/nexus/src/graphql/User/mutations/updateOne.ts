import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data, where }, { prisma, select }) {
        return prisma.user.update({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
