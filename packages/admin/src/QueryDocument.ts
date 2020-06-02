import { SchemaModel } from './types';
import tag from 'graphql-tag';

const getTag = (name: string, fields: string) => tag`
query findMany${name}(
  $where: ${name}WhereInput
  $orderBy: ${name}OrderByInput
  $cursor: ${name}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${name}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ${fields}
  }
  findMany${name}Count(where: $where)
}
`;

export const generateFindManyQuery = (
  models: SchemaModel[],
  modelName: string,
) => {
  const model = models.find((item) => item.id === modelName);
  if (!model) {
    return getTag(modelName, 'id');
  }
  let fieldsString = `${model.idField} `;
  model?.fields.forEach((field) => {
    if (field.read && field.name !== model.idField) {
      if (field.kind !== 'object') {
        fieldsString += `${field.name} `;
      } else if (!field.list) {
        const fieldModel = models.find((item) => item.id === field.type);
        if (fieldModel) {
          fieldsString += `${field.name} {${fieldModel.idField} `;
          fieldModel.displayFields.forEach((item) => {
            fieldsString += `${item} `;
          });
          fieldsString += '} ';
        }
      }
    }
  });

  return getTag(modelName, fieldsString);
};
