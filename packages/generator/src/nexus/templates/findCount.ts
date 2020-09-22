export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}FindCountQuery = queryField${staticData};
#{exportJs}
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

const staticData = `('findMany#{Model}Count', {
  type: 'Int',
  args: {
    where: '#{Model}WhereInput',
    orderBy: #{schema}arg({ type: '#{Model}OrderByInput', list: true }),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}DistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma}) {
    return prisma.#{model}.count(args)
  },
})`;
