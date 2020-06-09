export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}CreateOneMutation = mutationField${staticData};
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
    })
  },
})`;
