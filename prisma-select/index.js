const graphqlFields = require('graphql-fields');

export default function getPrismaSelect(info) {
  const fields = graphqlFields(
    info,
    {},
    { excludedFields: ['__typename'], processArguments: true }
  );
  return getSelect(fields);
}

function getSelect(fields) {
  const selectObject = { select: {} };
  Object.keys(fields).forEach((key) => {
    if (Object.keys(fields[key]).length === 0) {
      selectObject.select[key] = true;
    } else if (key === '__arguments') {
      fields[key].forEach((arg) => {
        Object.keys(arg).forEach((key2) => {
          selectObject[key2] = arg[key2].value;
        });
      });
    } else {
      selectObject.select[key] = getSelect(fields[key]);
    }
  });
  return selectObject;
}
