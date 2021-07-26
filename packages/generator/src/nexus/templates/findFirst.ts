export default `
#{import}

#{exportTs}const #{Model}FindFirstQuery = queryField('findFirst#{Model}', {
  type: '#{ModelName}',
  args: {
    where: '#{Model}WhereInput',
    orderBy: list('#{Model}OrderBy#{orderBy}Input'),
    cursor: '#{Model}WhereUniqueInput',
    distinct: '#{Model}ScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, {#{prisma}, select}) {
    return #{prisma}.#{model}.findFirst({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
