export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}UpsertOneMutation = mutationField${staticData};
`
    : `
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field${staticData};
  },
});
`
}
`;

const staticData = `('upsertOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
    create: #{schema}arg({
      type: '#{Model}CreateInput',
      nullable: false,
    }),
    update: #{schema}arg({
      type: '#{Model}UpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.#{model}.upsert({
      ...args,
      ...select,
    })
  },
})`;
