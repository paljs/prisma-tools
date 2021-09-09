export default `
#{import}

#{exportTs}const #{Model}FindFirstQuery = queryField('findFirst#{Model}', {
  type: '#{ModelName}',
  #{args}
  resolve(_parent, args, {#{prisma}, select}) {
    return #{prisma}.#{model}.findFirst({
      ...args,
      ...select,
    })
  },
});
#{exportJs}
`;
