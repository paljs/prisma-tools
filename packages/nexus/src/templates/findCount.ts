export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}FindManyCountQuery = queryField${staticData};
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
  type: '#{Model}',
  nullable: true,
  list: true,
  args: {
    where: '#{Model}WhereInput',
    orderBy: '#{Model}OrderByInput',
    cursor: '#{Model}WhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma, select}) {
    return prisma.#{model}.count(args)
  },
})`;
