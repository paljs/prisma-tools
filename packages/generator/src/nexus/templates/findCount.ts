export default `
#{import}

#{exportTs}const #{Model}FindCountQuery = queryField('findMany#{Model}Count', {
  type: nonNull('Int'),
  args: {
    where: '#{Model}WhereInput',
    orderBy: list(arg({ type: '#{Model}OrderByInput' })),
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
