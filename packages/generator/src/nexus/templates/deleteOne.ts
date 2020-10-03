export default `
#{import}

#{exportTs}const #{Model}DeleteOneMutation = mutationField('deleteOne#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    #{onDelete}
    return prisma.#{model}.delete({
      where,
      ...select,
    })
  },
});
#{exportJs}
`;
