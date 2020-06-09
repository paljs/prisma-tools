import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        })
      },
    })
  },
})
