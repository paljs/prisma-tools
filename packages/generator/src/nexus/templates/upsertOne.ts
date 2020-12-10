export default `
#{import}

#{exportTs}const #{Model}UpsertOneMutation = mutationField('upsertOne#{Model}', {
  type: nonNull('#{Model}'),
  args: {
    where: nonNull(arg({
      type: '#{Model}WhereUniqueInput',
    })),
    create: nonNull(arg({
      type: '#{Model}CreateInput',
    })),
    update: nonNull(arg({
      type: '#{Model}UpdateInput',
    })),
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
