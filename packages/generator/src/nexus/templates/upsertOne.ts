export default `
#{import}

#{exportTs}const #{Model}UpsertOneMutation = mutationField('upsertOne#{Model}', {
  type: nonNull('#{ModelName}'),
  args: {
    where: nonNull('#{Model}WhereUniqueInput'),
    create: nonNull('#{Model}CreateInput'),
    update: nonNull('#{Model}UpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.#{model}.upsert({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
