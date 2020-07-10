export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}AggregateQuery = queryField${staticData};
`
    : `
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field${staticData};
  },
});
`
}
`;

const staticData = `('aggregate#{Model}', {
  type: 'Aggregate#{Model}',
  nullable: true,
  resolve(_parent, _args, { prisma, select }) {
    return prisma.#{model}.aggregate(select) as any
  },
})`;
