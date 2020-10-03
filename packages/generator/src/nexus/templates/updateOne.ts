export default `
#{import}

#{exportTs}const #{Model}UpdateOneMutation = mutationField('updateOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
    data: arg({
      type: '#{Model}UpdateInput',
      nullable: false,
    }),
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
