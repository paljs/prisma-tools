export default `
#{import}

#{exportTs}const #{Model}FindFirstQuery = queryField('findFirst#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: '#{Model}WhereInput',
    orderBy: arg({ type: '#{Model}OrderByInput', list: true }),
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
