export default `
#{import}

#{exportTs}const #{Model}FindCountQuery = queryField('findMany#{Model}Count', {
  type: nonNull('Int'),
  #{args}
  resolve(_parent, args, {#{prisma}}) {
    return #{prisma}.#{model}.count(args#{as})
  },
});
#{exportJs}
`;
