import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        create: schema.arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
        update: schema.arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.user.upsert({
          ...args,
          ...select,
        })
      },
    })
  },
})
