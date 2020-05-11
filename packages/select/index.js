const graphqlFields = require('graphql-fields');

function getPrismaSelect(info) {
  const fields = graphqlFields(
    info,
    {},
    { excludedFields: ['__typename'], processArguments: true }
  );
  return getSelect(fields);
}

const availableArgs = [
  'where',
  'orderBy',
  'skip',
  'after',
  'before',
  'first',
  'last',
];

function getSelect(fields) {
  const selectObject = { select: {} };
  Object.keys(fields).forEach((key) => {
    if (Object.keys(fields[key]).length === 0) {
      selectObject.select[key] = true;
    } else if (key === '__arguments') {
      fields[key].forEach((arg) => {
        Object.keys(arg).forEach((key2) => {
          if (availableArgs.includes(key2)) {
            selectObject[key2] = arg[key2].value;
          }
        });
      });
    } else {
      selectObject.select[key] = getSelect(fields[key]);
    }
  });
  return selectObject;
}

module.exports = getPrismaSelect;
