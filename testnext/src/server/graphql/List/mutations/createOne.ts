import { mutationField, nonNull } from 'nexus'

export const ListCreateOneMutation = mutationField('createOneList', {
  type: nonNull('List'),
  args: {
    data: nonNull('ListCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.list.create({
      data,
      ...select,
    })
  },
})
