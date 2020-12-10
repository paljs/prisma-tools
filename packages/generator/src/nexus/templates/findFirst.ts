export default `
#{import}

#{exportTs}const #{Model}FindFirstQuery = queryField('findFirst#{Model}', {
  type: '#{Model}',
  args: {
    where: '#{Model}WhereInput',
    orderBy: list(arg({ type: '#{Model}OrderByInput' })),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}DistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma, select}) {
    return prisma.#{model}.findFirst({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
