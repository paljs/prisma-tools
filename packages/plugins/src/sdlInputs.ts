import { schema, DMMF } from './schema';
import gql from 'graphql-tag';
import { GraphQLSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';

function createInput() {
  let fileContent = `
  scalar DateTime
  
  type BatchPayload {
  count: Int!
}
`;
  schema.enums.forEach((item) => {
    fileContent += `enum ${item.name} {`;
    item.values.forEach((item2) => {
      fileContent += `
      ${item2}`;
    });
    fileContent += `}

`;
  });

  schema.inputTypes.forEach((model) => {
    fileContent += `input ${model.name} {
    `;
    model.fields.forEach((field) => {
      let inputType: DMMF.SchemaArgInputType;
      if (
        field.inputTypes.length > 1 &&
        field.inputTypes[1].type !== 'null' &&
        field.name !== 'not'
      ) {
        inputType = field.inputTypes[1];
      } else {
        inputType = field.inputTypes[0];
      }
      fileContent += `${field.name}: ${
        inputType.isList ? `[${inputType.type}!]` : inputType.type
      }${field.isRequired ? '!' : ''}
      `;
    });
    fileContent += `}
  
`;
  });

  schema.outputTypes
    .filter((type) => type.name.includes('Aggregate'))
    .forEach((type) => {
      fileContent += `type ${type.name} {
    `;
      type.fields.forEach((field) => {
        fileContent += `${field.name}: ${
          field.outputType.isList
            ? `[${field.outputType.type}!]`
            : field.outputType.type
        }${field.isRequired ? '!' : ''}
      `;
      });
      fileContent += `}
  
`;
    });
  return fileContent;
}

export const sdlInputs = gql`
  ${createInput()}
`;

export const generateGraphQlSDLFile = (
  schema: GraphQLSchema,
  path: string = 'schema.graphql',
) => {
  writeFileSync(path, printSchema(schema));
};
