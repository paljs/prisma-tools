import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneGroup', {
      type: 'Group',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'GroupWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.group.findOne({
          where,
          ...select,
        })
      },
    })
  },
})
