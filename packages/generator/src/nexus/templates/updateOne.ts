export default `
#{import}

#{exportTs}const #{Model}UpdateOneMutation = mutationField('updateOne#{Model}', {
  type: nonNull('#{Model}'),
  args: {
    where: nonNull(arg({
      type: '#{Model}WhereUniqueInput',
    })),
    data: nonNull(arg({
      type: '#{Model}UpdateInput',
    })),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.#{model}.update({
      where,
      data,
      ...select,
    })
  },
});
#{exportJs}
`;
