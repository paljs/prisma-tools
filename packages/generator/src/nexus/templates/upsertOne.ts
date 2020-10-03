export default `
#{import}

#{exportTs}const #{Model}UpsertOneMutation = mutationField('upsertOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
    create: arg({
      type: '#{Model}CreateInput',
      nullable: false,
    }),
    update: arg({
      type: '#{Model}UpdateInput',
      nullable: false,
    }),
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
