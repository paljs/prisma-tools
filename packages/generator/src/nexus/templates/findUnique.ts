export default `
#{import}

#{exportTs}const #{Model}FindUniqueQuery = queryField('findUnique#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
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
