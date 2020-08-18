export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}FindManyQuery = queryField${staticData};
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

const staticData = `('findMany#{Model}', {
  type: '#{Model}',
  nullable: true,
  list: true,
  args: {
    where: '#{Model}WhereInput',
    orderBy: #{schema}arg({ type: '#{Model}OrderByInput', list: true }),
    cursor: '#{Model}WhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma, select}) {
    return prisma.#{model}.findMany({
      ...args,
      ...select,
    }) as any
  },
})`;
