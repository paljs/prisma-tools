import { createFile } from './createFile';
import { SchemaObject, Options } from '@paljs/types';
import { format } from 'prettier';

export function createGraphql(schemaObject: SchemaObject, options: Options) {
  schemaObject.models
    .filter((model) => !options.models || options.models.includes(model.name))
    .forEach((model) => {
      const excludeQueriesAndMutations = options.excludeQueriesAndMutations.concat(
        options.excludeQueriesAndMutationsByModel[model.name] ?? [],
      );
      let fileContent = `fragment ${model.name}Fields on ${model.name} {
    `;
      model.fields.forEach((field) => {
        const fieldsExclude = options.excludeFields.concat(
          options.excludeFieldsByModel[model.name],
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
    
    fragment ${model.name} on ${model.name} {
      ...${model.name}Fields
      `;
      model.fields.forEach((field) => {
        const fieldsExclude = options.excludeFields.concat(
          options.excludeFieldsByModel[model.name],
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
    (item) => item.name === model.name && item.queries,
  )
    ? `
${
  !excludeQueriesAndMutations.includes('findOne')
    ? `
query findOne${model.name}($where: ${model.name}WhereUniqueInput!) {
  findOne${model.name}(where: $where) {
    ...${model.name}
  }
}`
    : ''
}    

${
  !excludeQueriesAndMutations.includes('findMany')
    ? `
query findMany${model.name}(
  $where: ${model.name}WhereInput
  $orderBy: [${model.name}OrderByInput!]
  $cursor: ${model.name}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${model.name}(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  ) {
    ...${model.name}
  }
}`
    : ''
}  

${
  !excludeQueriesAndMutations.includes('findCount')
    ? `
query findMany${model.name}Count(
  $where: ${model.name}WhereInput
  $orderBy: [${model.name}OrderByInput!]
  $cursor: ${model.name}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${model.name}Count(
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
    (item) => item.name === model.name && item.mutations,
  )
    ? `
${
  !excludeQueriesAndMutations.includes('createOne')
    ? `
mutation createOne${model.name}($data: ${model.name}CreateInput!) {
    createOne${model.name}(data: $data) {
        ...${model.name}
    }
}`
    : ''
} 

${
  !excludeQueriesAndMutations.includes('updateOne')
    ? `
mutation updateOne${model.name}($where: ${model.name}WhereUniqueInput!, $data: ${model.name}UpdateInput!) {
    updateOne${model.name}(where: $where, data: $data) {
        ...${model.name}
    }
}`
    : ''
} 

${
  !excludeQueriesAndMutations.includes('deleteOne')
    ? `
mutation deleteOne${model.name}($where: ${model.name}WhereUniqueInput!) {
    deleteOne${model.name}(where: $where) {
        id
    }
}`
    : ''
}

${
  !excludeQueriesAndMutations.includes('deleteMany')
    ? `
mutation deleteMany${model.name}($where: ${model.name}WhereInput) {
    deleteMany${model.name}(where: $where) {
        count
    }
}`
    : ''
}

${
  !excludeQueriesAndMutations.includes('updateMany')
    ? `
mutation updateMany${model.name}($where: ${model.name}WhereInput, $data: ${model.name}UpdateManyMutationInput!) {
    updateMany${model.name}(where: $where, data: $data) {
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

      createFile(options.output, `${model.name}.graphql`, fileContent);
    });
}
