export default `
#{import}

#{exportTs}const #{Model}FindCountQuery = queryField('findMany#{Model}Count', {
  type: nonNull('Int'),
  args: {
    where: '#{Model}WhereInput',
    orderBy: list('#{Model}OrderBy#{orderBy}Input'),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}ScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {#{prisma}}) {
    return #{prisma}.#{model}.count(args#{as})
  },
});
#{exportJs}
`;
