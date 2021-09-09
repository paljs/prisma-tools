export default `
#{import}

#{exportTs}const #{Model}UpdateManyMutation = mutationField('updateMany#{Model}', {
  type: nonNull('BatchPayload'),
  #{args}
  resolve(_parent, args, { #{prisma} }) {
    return #{prisma}.#{model}.updateMany(args#{as})
  },
});
#{exportJs}
`;
