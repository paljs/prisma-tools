export default `
#{import}

#{exportTs}const #{Model}UpdateOneMutation = mutationField('updateOne#{Model}', {
  type: nonNull('#{ModelName}'),
  args: {
    where: nonNull('#{Model}WhereUniqueInput'),
    data: nonNull('#{Model}UpdateInput'),
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
