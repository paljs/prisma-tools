export default `
#{import}

#{exportTs}const #{Model}FindUniqueQuery = queryField('findUnique#{Model}', {
  type: '#{ModelName}',
  #{args}
  resolve(_parent, { where }, { #{prisma}, select }) {
    return #{prisma}.#{model}.findUnique({
      where,
      ...select,
    })
  },
});
#{exportJs}
`;
