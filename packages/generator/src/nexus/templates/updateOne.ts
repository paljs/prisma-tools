export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}UpdateOneMutation = mutationField${staticData};
#{exportJs}
`
    : `
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field${staticData};
  },
});
`
}
`;

const staticData = `('updateOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
    data: #{schema}arg({
      type: '#{Model}UpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.#{model}.update({
      where,
      data,
      ...select,
    })#{as}
  },
})`;
