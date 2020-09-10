export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}CreateOneMutation = mutationField${staticData};
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

const staticData = `('createOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    data: #{schema}arg({
      type: '#{Model}CreateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.#{model}.create({
      data,
      ...select,
    }) as any
  },
})`;
