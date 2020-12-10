export default `
#{import}

#{exportTs}const #{Model}AggregateQuery = queryField('aggregate#{Model}', {
  type: 'Aggregate#{Model}',
  args: {
    where: '#{Model}WhereInput',
    orderBy: list(arg({ type: '#{Model}OrderByInput' })),
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
