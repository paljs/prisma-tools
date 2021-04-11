export default `
#{import}

#{exportTs}const #{Model}DeleteManyMutation = mutationField('deleteMany#{Model}', {
  type: nonNull('BatchPayload'),
  args: {
    where: '#{Model}WhereInput',
  },
  resolve: async (_parent, { where }, { #{prisma} }) => {
    #{onDelete}
    return #{prisma}.#{model}.deleteMany({where}#{as})
  },
});
#{exportJs}
`;
