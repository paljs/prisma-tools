export default `
#{import}

#{exportTs}const #{Model}FindCountQuery = queryField('findMany#{Model}Count', {
  type: 'Int',
  args: {
    where: '#{Model}WhereInput',
    orderBy: arg({ type: '#{Model}OrderByInput', list: true }),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}DistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {prisma}) {
    return prisma.#{model}.count(args#{as})
  },
});
#{exportJs}
`;
