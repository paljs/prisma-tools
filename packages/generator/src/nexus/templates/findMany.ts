export default `
#{import}

#{exportTs}const #{Model}FindManyQuery = queryField('findMany#{Model}', {
  type: nonNull(list(nonNull('#{ModelName}'))),
  #{args}
  resolve(_parent, args, {#{prisma}, select}) {
    return #{prisma}.#{model}.findMany({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
