export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}UpdateManyMutation = mutationField${staticData};
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

const staticData = `('updateMany#{Model}', {
  type: 'BatchPayload',
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereInput',
      nullable: true,
    }),
    data: #{schema}arg({
      type: '#{Model}UpdateManyMutationInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.#{model}.updateMany(args)
  },
})`;
