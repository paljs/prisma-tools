export default `
#{import}

#{exportTs}const #{Model}UpsertOneMutation = mutationField('upsertOne#{Model}', {
  type: nonNull('#{ModelName}'),
  #{args}
  resolve(_parent, args, { #{prisma}, select }) {
    return #{prisma}.#{model}.upsert({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
