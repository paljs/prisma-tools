export default `
#{import}

#{exportTs}const #{Model}FindManyQuery = queryField('findMany#{Model}', {
  type: nonNull(list(nonNull('#{Model}'))),
  args: {
    where: '#{Model}WhereInput',
    orderBy: list('#{Model}OrderByInput'),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}ScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma, select}) {
    return prisma.#{model}.findMany({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
