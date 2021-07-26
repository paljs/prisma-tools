export default `
#{import}

#{exportTs}const #{Model}AggregateQuery = queryField('aggregate#{Model}', {
  type: 'Aggregate#{Model}',
  args: {
    where: '#{Model}WhereInput',
    orderBy: list('#{Model}OrderBy#{orderBy}Input'),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}ScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { #{prisma}, select }) {
    return #{prisma}.#{model}.aggregate({...args, ...select})#{as}
  },
});
#{exportJs}
`;
