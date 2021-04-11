import { mutationField, nonNull } from 'nexus'

export const ListUpdateManyMutation = mutationField('updateManyList', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ListWhereInput',
    data: nonNull('ListUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.list.updateMany(args as any)
  },
})
