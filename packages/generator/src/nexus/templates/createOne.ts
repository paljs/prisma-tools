export default `
#{import}

#{exportTs}const #{Model}CreateOneMutation = mutationField('createOne#{Model}', {
  type: nonNull('#{ModelName}'),
  #{args}
  resolve(_parent, { data }, { #{prisma}, select }) {
    return #{prisma}.#{model}.create({
      data,
      ...select,
    })
  },
});
#{exportJs}
`;
