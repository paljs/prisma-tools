export default `
#{import}

#{exportTs}const #{Model}DeleteOneMutation = mutationField('deleteOne#{Model}', {
  type: '#{Model}',
  args: {
    where: nonNull(arg({
      type: '#{Model}WhereUniqueInput',
    })),
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
