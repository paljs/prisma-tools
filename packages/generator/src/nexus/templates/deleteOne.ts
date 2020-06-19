export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}DeleteOneMutation = mutationField${staticData};
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

const staticData = `('deleteOne#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    #{onDelete}
    return prisma.#{model}.delete({
      where,
      ...select,
    })
  },
})`;
