export default `
#{import}

#{exportTs}const #{Model}CreateOneMutation = mutationField('createOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    data: arg({
      type: '#{Model}CreateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.#{model}.create({
      data,
      ...select,
    })#{as}
  },
});
#{exportJs}
`;
