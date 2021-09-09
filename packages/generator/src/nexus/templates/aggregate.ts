export default `
#{import}

#{exportTs}const #{Model}AggregateQuery = queryField('aggregate#{Model}', {
  type: 'Aggregate#{Model}',
  #{args}
  resolve(_parent, args, { #{prisma}, select }) {
    return #{prisma}.#{model}.aggregate({...args, ...select})#{as}
  },
});
#{exportJs}
`;
