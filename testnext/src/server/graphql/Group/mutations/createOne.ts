import { mutationField, nonNull } from 'nexus'

export const GroupCreateOneMutation = mutationField('createOneGroup', {
  type: nonNull('Group'),
  args: {
    data: nonNull('GroupCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.group.create({
      data,
      ...select,
    })
  },
})
