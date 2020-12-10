export default `
#{import}

#{exportTs}const #{Model}FindUniqueQuery = queryField('findUnique#{Model}', {
  type: nonNull('#{Model}'),
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
    }),
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
