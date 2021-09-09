export default `
#{import}

#{exportTs}const #{Model}DeleteManyMutation = mutationField('deleteMany#{Model}', {
  type: nonNull('BatchPayload'),
  #{args}
  resolve: async (_parent, { where }, { #{prisma} }) => {
    return #{prisma}.#{model}.deleteMany({where}#{as})
  },
});
#{exportJs}
`;
