export default `
#{import}

#{exportTs}const #{Model}CreateOneMutation = mutationField('createOne#{Model}', {
  type: nonNull('#{Model}'),
  args: {
    data: nonNull(arg({
      type: '#{Model}CreateInput'
    })),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.#{model}.create({
      data,
      ...select,
    })
  },
});
#{exportJs}
`;
