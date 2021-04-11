import { mutationField, nonNull } from 'nexus'

export const ListUpsertOneMutation = mutationField('upsertOneList', {
  type: nonNull('List'),
  args: {
    where: nonNull('ListWhereUniqueInput'),
    create: nonNull('ListCreateInput'),
    update: nonNull('ListUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.list.upsert({
      ...args,
      ...select,
    })
  },
})
