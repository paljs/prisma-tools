export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
#{exportTs}const #{Model}FindOneQuery = queryField${staticData};
#{exportJs}
`
    : `
schema.extendType({
  type: 'Query',
  definition(t) {
    t.field${staticData};
  },
});
`
}
`;

const staticData = `('findOne#{Model}', {
  type: '#{Model}',
  nullable: true,
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.#{model}.findOne({
      where,
      ...select,
    }) as any
  },
})`;
