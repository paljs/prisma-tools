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
  args: {
    where: '#{Model}WhereInput',
    orderBy:  #{schema}arg({ type: '#{Model}OrderByInput', list: true }),,
    cursor: '#{Model}WhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.#{model}.aggregate({...args, ...select}) as any
  },
})`;
