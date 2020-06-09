import { queryField, arg } from '@nexus/schema'

export const GroupFindOneQuery = queryField('findOneGroup', {
  type: 'Group',
  nullable: true,
  args: {
    where: arg({
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
