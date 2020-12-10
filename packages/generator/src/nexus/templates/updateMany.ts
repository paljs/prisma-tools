export default `
#{import}

#{exportTs}const #{Model}UpdateManyMutation = mutationField('updateMany#{Model}', {
  type: nonNull('BatchPayload'),
  args: {
    where: arg({
      type: '#{Model}WhereInput',
    }),
    data: nonNull(arg({
      type: '#{Model}UpdateManyMutationInput',
    })),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.#{model}.updateMany(args#{as})
  },
});
#{exportJs}
`;
