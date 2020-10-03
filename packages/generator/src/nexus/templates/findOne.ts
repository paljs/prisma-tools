export default `
#{import}

#{exportTs}const #{Model}FindOneQuery = queryField('findOne#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.#{model}.findOne({
      where,
      ...select,
    })
  },
});
#{exportJs}
`;
