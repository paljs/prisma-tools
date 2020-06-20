import { createFile } from './createFile';
import {Schema} from '@paljs/types';
import { GenerateGraphqlOptions } from '@paljs/types';
import { format } from 'prettier';

export function createGraphql(
  schemaObject: Schema,
  options: GenerateGraphqlOptions,
) {
  schemaObject.models.forEach((model) => {
    const excludeQueriesAndMutations = options.excludeQueriesAndMutations.concat(
      options.excludeQueriesAndMutationsByModel[model.id] ?? [],
    );
    let fileContent = `fragment ${model.id}Fields on ${model.id} {
    `;
    model.fields.forEach((field) => {
      const fieldsExclude = options.excludeFields.concat(
        options.excludeFieldsByModel[model.id],
      );
      if (fieldsExclude.includes(field.name)) {
        return;
      }
      if (field.kind !== 'object') {
        fileContent += `${field.name}
        `;
      }
    });
    fileContent += `}
    
    fragment ${model.id} on ${model.id} {
      ...${model.id}Fields
      `;
    model.fields.forEach((field) => {
      const fieldsExclude = options.excludeFields.concat(
        options.excludeFieldsByModel[model.id],
      );
      if (fieldsExclude.includes(field.name)) {
        return;
      }
      if (field.kind === 'object' && !field.list) {
        fileContent += `${field.name} {
            ...${field.type}Fields
          }
          `;
      }
    });

    fileContent += `}
${
  !options.disableQueries &&
  !options.excludeModels.find(
    (item) =>
      item.name === model.id && item.queries,
  )
    ? `
${
  !excludeQueriesAndMutations.includes('findOne')
    ? `
query findOne${model.id}($where: ${model.id}WhereUniqueInput!) {
  findOne${model.id}(where: $where) {
    ...${model.id}
  }
}`
    : ''
}    

${
  !excludeQueriesAndMutations.includes('findMany')
    ? `
query findMany${model.id}(
  $where: ${model.id}WhereInput
  $orderBy: ${model.id}OrderByInput
  $cursor: ${model.id}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${model.id}(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  ) {
    ...${model.id}
  }
}`
    : ''
}  

${
  !excludeQueriesAndMutations.includes('findCount')
    ? `
query findMany${model.id}Count(
  $where: ${model.id}WhereInput
  $orderBy: ${model.id}OrderByInput
  $cursor: ${model.id}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${model.id}Count(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  )
}`
    : ''
}  
`
    : ''
}

${
  !options.disableMutations &&
  !options.excludeModels.find(
    (item) =>
      item.name === model.id && item.mutations,
  )
    ? `
${
  !excludeQueriesAndMutations.includes('createOne')
    ? `
mutation createOne${model.id}($data: ${model.id}CreateInput!) {
    createOne${model.id}(data: $data) {
        ...${model.id}
    }
}`
    : ''
} 

${
  !excludeQueriesAndMutations.includes('updateOne')
    ? `
mutation updateOne${model.id}($where: ${model.id}WhereUniqueInput!, $data: ${model.id}UpdateInput!) {
    updateOne${model.id}(where: $where, data: $data) {
        ...${model.id}
    }
}`
    : ''
} 

${
  !excludeQueriesAndMutations.includes('deleteOne')
    ? `
mutation deleteOne${model.id}($where: ${model.id}WhereUniqueInput!) {
    deleteOne${model.id}(where: $where) {
        id
    }
}`
    : ''
}

${
  !excludeQueriesAndMutations.includes('deleteMany')
    ? `
mutation deleteMany${model.id}($where: ${model.id}WhereInput) {
    deleteMany${model.id}(where: $where) {
        count
    }
}`
    : ''
}

${
  !excludeQueriesAndMutations.includes('updateMany')
    ? `
mutation updateMany${model.id}($where: ${model.id}WhereInput, $data: ${model.id}UpdateManyMutationInput!) {
    updateMany${model.id}(where: $where, data: $data) {
        count
    }
}`
    : ''
}
`
    : ''
}
`;
    fileContent = format(fileContent, {
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: 'graphql',
    });

    createFile(options.output, `${model.id}.graphql`, fileContent);
  });
}
