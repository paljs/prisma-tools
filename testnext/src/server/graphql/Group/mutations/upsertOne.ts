import { mutationField, nonNull } from 'nexus'

export const GroupUpsertOneMutation = mutationField('upsertOneGroup', {
  type: nonNull('Group'),
  args: {
    where: nonNull('GroupWhereUniqueInput'),
    create: nonNull('GroupCreateInput'),
    update: nonNull('GroupUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.group.upsert({
      ...args,
      ...select,
    })
  },
})
