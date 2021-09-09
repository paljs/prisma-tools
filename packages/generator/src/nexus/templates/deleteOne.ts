export default `
#{import}

#{exportTs}const #{Model}DeleteOneMutation = mutationField('deleteOne#{Model}', {
  type: '#{ModelName}',
  #{args}
  resolve: async (_parent, { where }, { #{prisma}, select }) => {
    return #{prisma}.#{model}.delete({
      where,
      ...select,
    })
  },
});
#{exportJs}
`;
