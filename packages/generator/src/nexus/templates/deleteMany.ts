export default `
#{import}

#{exportTs}const #{Model}DeleteManyMutation = mutationField('deleteMany#{Model}', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: '#{Model}WhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    #{onDelete}
    return prisma.#{model}.deleteMany({where}#{as})
  },
});
#{exportJs}
`;
