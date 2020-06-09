import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      nullable: false,
      args: {
        data: schema.arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.user.create({
          data,
          ...select,
        })
      },
    })
  },
})
