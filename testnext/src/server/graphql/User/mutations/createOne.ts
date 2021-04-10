import { mutationField, nonNull } from 'nexus'

export const UserCreateOneMutation = mutationField('createOneUser', {
  type: nonNull('User'),
  args: {
    data: nonNull('UserCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.user.create({
      data,
      ...select,
    })
  },
})
