export default `
#{import}

#{exportTs}const #{Model}UpdateOneMutation = mutationField('updateOne#{Model}', {
  type: nonNull('#{ModelName}'),
  #{args}
  resolve(_parent, { data, where }, { #{prisma}, select }) {
    return #{prisma}.#{model}.update({
      where,
      data,
      ...select,
    })
  },
});
#{exportJs}
`;
