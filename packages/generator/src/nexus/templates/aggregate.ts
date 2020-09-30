export default `
#{import}

#{exportTs}const #{Model}AggregateQuery = queryField('aggregate#{Model}', {
  type: 'Aggregate#{Model}',
  nullable: true,
  args: {
    where: '#{Model}WhereInput',
    orderBy: arg({ type: '#{Model}OrderByInput', list: true }),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}DistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.#{model}.aggregate({...args, ...select})#{as}
  },
});
#{exportJs}
`;
