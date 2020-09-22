export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}DeleteManyMutation = mutationField${staticData};
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

const staticData = `('deleteMany#{Model}', {
  type: 'BatchPayload',
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    #{onDelete}
    return prisma.#{model}.deleteMany({where}#{as})
  },
})`;
