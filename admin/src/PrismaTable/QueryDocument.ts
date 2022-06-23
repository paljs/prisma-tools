import { SchemaModel } from '../types';
import tag from 'graphql-tag';
import { fLCapital } from './utils';

const getFields = (
  models: SchemaModel[],
  modelName: string,
  update = false,
) => {
  const model = models.find((item) => item.id === modelName);
  if (!model) {
    return 'id';
  }
  let fieldsString = `${model.idField} `;
  model?.fields.forEach((field) => {
    if (
      (field.read && field.name !== model.idField) ||
      (update && field.update)
    ) {
      if (field.kind !== 'object') {
        fieldsString += `${field.name} `;
      } else if (!(field.list && !update)) {
        const fieldModel = models.find((item) => item.id === field.type);
        if (fieldModel) {
          fieldsString += `${field.name} {`;
          if (fieldModel.idField) {
            fieldsString += `${fieldModel.idField} `;
          } else {
            fieldModel.fields
              .filter((item) => item.kind === 'scalar')
              .forEach((field) => {
                fieldsString += `${field.name} `;
              });
          }
          if (!field.list) {
            fieldModel.displayFields.forEach((item) => {
              const splitItems = item.split('.');
              for (let i = 0; i < splitItems.length; i++) {
                if (i + 1 < splitItems.length) {
                  fieldsString += `${splitItems[i]} { `;
                } else if (
                  !(
                    splitItems.length === 1 &&
                    splitItems[i] === fieldModel.idField
                  )
                ) {
                  fieldsString += `${splitItems[i]} `;
                }
              }
              for (let i = 1; i < splitItems.length; i++) {
                fieldsString += `} `;
              }
            });
          }
          fieldsString += '} ';
        }
      }
    }
  });

  return fieldsString;
};

const allScalar = (model?: SchemaModel) => {
  return model?.fields
    .filter((item) => item.kind === 'scalar')
    .map((item) => item.name)
    .join(' ');
};
export const queryDocument = (
  models: SchemaModel[],
  modelName: string,
  findUnique = false,
  update = false,
) => {
  const fields = getFields(models, modelName, update);
  const modelUpper = fLCapital(modelName);

  if (findUnique) {
    return tag`
query findUnique${modelUpper}($where: ${modelName}WhereUniqueInput!) {
  findUnique${modelUpper}(where: $where) {
    ${fields}
  }
}
`;
  } else {
    return tag`
query findMany${modelUpper}(
  $where: ${modelName}WhereInput
  $orderBy: [${modelName}OrderByWithRelationInput!]
  $cursor: ${modelName}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${modelUpper}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ${fields}
  }
  findMany${modelUpper}Count(where: $where)
}
`;
  }
};

export const mutationDocument = (
  models: SchemaModel[],
  model: string,
  mutation: 'create' | 'update' | 'delete',
) => {
  const fields = getFields(models, model, true);
  const modelUpper = fLCapital(model);

  const modelObject = models.find((item) => item.id === model);
  switch (mutation) {
    case 'create':
      return tag`mutation createOne${modelUpper}($data: ${model}CreateInput!) {
  createOne${modelUpper}(data: $data) {
    ${modelObject?.idField || allScalar(modelObject)}
  }
}`;
    case 'delete':
      return tag`mutation deleteOne${modelUpper} ($where: ${model}WhereUniqueInput!) {
  deleteOne${modelUpper} (where: $where) {
    ${modelObject?.idField || allScalar(modelObject)}
  }
}`;
    case 'update':
      return tag`mutation updateOne${modelUpper} ($where: ${model}WhereUniqueInput!, $data: ${model}UpdateInput!) {
  updateOne${modelUpper} (where: $where, data: $data) {
    ${fields}
  }
}`;
  }
};
