export default `
#{import}

#{exportTs}const #{Model}UpdateManyMutation = mutationField('updateMany#{Model}', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: '#{Model}WhereInput',
      nullable: true,
    }),
    data: arg({
      type: '#{Model}UpdateManyMutationInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.#{model}.updateMany(args#{as})
  },
});
#{exportJs}
`;
