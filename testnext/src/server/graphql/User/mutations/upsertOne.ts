import { mutationField, nonNull } from 'nexus'

export const UserUpsertOneMutation = mutationField('upsertOneUser', {
  type: nonNull('User'),
  args: {
    where: nonNull('UserWhereUniqueInput'),
    create: nonNull('UserCreateInput'),
    update: nonNull('UserUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.upsert({
      ...args,
      ...select,
    })
  },
})
