import { SchemaObject, Options } from './types';
import { writeFile, mkdir } from 'fs';
import { format } from 'prettier';

export function createGraphql(schemaObject: SchemaObject, options: Options) {
  schemaObject.models.forEach((model) => {
    if (options.modelsExclude.includes(model.id)) {
      return;
    }
    const excludeQueriesAndMutations = options.excludeQueriesAndMutations.concat(
      options.excludeQueriesAndMutationsByModel[model.id] ?? []
    );
    let fileContent = `fragment ${model.id}Fragment on ${model.id} {
    `;
    model.fields.forEach((field) => {
      const fieldsExclude = options.fieldsExclude.concat(
        options.excludeFieldsByModel[model.id]
      );
      if (fieldsExclude.includes(field.name)) {
        return;
      }
      if (field.kind !== 'object') {
        fileContent += `${field.name}
        `;
      } else if (!field.list) {
        fileContent += `${field.name} {
          id
        }
        `;
      }
    });
    fileContent += `}
${
  !options.disableQueries &&
  !options.modelsExclude.find(
    (item) => typeof item !== 'string' && item.name === model.id && item.queries
  )
    ? `
${
  !excludeQueriesAndMutations.includes('findOne')
    ? `
query findOne${model.id}($where: ${model.id}WhereUniqueInput!) {
  findOne${model.id}(where: $where) {
    ...${model.id}Fragment
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
  $after: ${model.id}WhereUniqueInput
  $before: ${model.id}WhereUniqueInput
  $skip: Int
  $first: Int
  $last: Int
) {
  findMany${model.id}(
    where: $where
    orderBy: $orderBy
    after: $after
    before: $before
    skip: $skip
    first: $first
    last: $last
  ) {
    ...${model.id}Fragment
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
  $after: ${model.id}WhereUniqueInput
  $before: ${model.id}WhereUniqueInput
  $skip: Int
  $first: Int
  $last: Int
) {
  findMany${model.id}Count(
    where: $where
    orderBy: $orderBy
    after: $after
    before: $before
    skip: $skip
    first: $first
    last: $last
  )
}`
    : ''
}  
`
    : ''
}

${
  !options.disableMutations &&
  !options.modelsExclude.find(
    (item) =>
      typeof item !== 'string' && item.name === model.id && item.mutations
  )
    ? `
${
  !excludeQueriesAndMutations.includes('createOne')
    ? `
mutation createOne${model.id}($data: ${model.id}CreateInput!) {
    createOne${model.id}(data: $data) {
        ...${model.id}Fragment
    }
}`
    : ''
} 

${
  !excludeQueriesAndMutations.includes('updateOne')
    ? `
mutation updateOne${model.id}($where: ${model.id}WhereUniqueInput!, $data: ${model.id}UpdateInput!) {
    updateOne${model.id}(where: $where, data: $data) {
        ...${model.id}Fragment
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
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser: 'graphql',
    });

    mkdir(options.graphqlOutput, () => {});
    writeFile(
      `${options.graphqlOutput}/${model.id}.graphql`,
      fileContent,
      () => {}
    );
  });
}
