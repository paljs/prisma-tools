export default `
#{import}

#{exportTs}const #{Model}FindManyQuery = queryField('findMany#{Model}', {
  type: '#{Model}',
  list: [true],
  args: {
    where: '#{Model}WhereInput',
    orderBy: arg({ type: '#{Model}OrderByInput', list: true }),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}DistinctFieldEnum',
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
