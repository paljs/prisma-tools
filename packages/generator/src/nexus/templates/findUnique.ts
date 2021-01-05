export default `
#{import}

#{exportTs}const #{Model}FindUniqueQuery = queryField('findUnique#{Model}', {
  type: '#{Model}',
  args: {
    where: nonNull('#{Model}WhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.#{model}.findUnique({
      where,
      ...select,
    })
  },
});
#{exportJs}
`;
