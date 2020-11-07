import { schema as defaultSchema, DMMF } from './schema';
import gql from 'graphql-tag';
import { GraphQLSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';

interface OptionsType {
  dmmf?: DMMF.Document;
}

const testedTypes: string[] = [];

export const hasEmptyTypeFields = (type: string, options?: OptionsType) => {
  const schema = options?.dmmf?.schema || defaultSchema;
  testedTypes.push(type);
  const inputType = schema?.inputTypes.find((item) => item.name === type);
  if (inputType) {
    if (inputType.fields.length === 0) return true;
    for (const field of inputType.fields) {
      const fieldType = getInputType(field);
      if (
        fieldType.type !== type &&
        fieldType.kind === 'object' &&
        !testedTypes.includes(fieldType.type as string)
      ) {
        const state = hasEmptyTypeFields(fieldType.type as string);
        if (state) return true;
      }
    }
  }
  return false;
};

export const getInputType = (field: DMMF.SchemaArg) => {
  let index: number = 0;
  if (field.inputTypes.length > 1 && field.inputTypes[1].kind === 'object') {
    index = 1;
  }
  return field.inputTypes[index];
};

function createInput(options?: OptionsType) {
  const schema = options?.dmmf?.schema || defaultSchema;
  let fileContent = `
  scalar DateTime
  
  type BatchPayload {
  count: Int!
}
`;
  schema?.enums.forEach((item) => {
    fileContent += `enum ${item.name} {`;
    item.values.forEach((item2) => {
      fileContent += `
      ${item2}`;
    });
    fileContent += `}

`;
  });

  schema?.inputTypes.forEach((model) => {
    if (model.fields.length > 0) {
      fileContent += `input ${model.name} {
    `;
      model.fields.forEach((field) => {
        const inputType = getInputType(field);
        const hasEmptyType =
          inputType.kind === 'object' &&
          hasEmptyTypeFields(inputType.type as string);
        if (!hasEmptyType) {
          fileContent += `${field.name}: ${
            inputType.isList ? `[${inputType.type}!]` : inputType.type
          }${field.isRequired ? '!' : ''}
      `;
        }
      });
      fileContent += `}
  
`;
    }
  });

  schema?.outputTypes
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

export const sdlInputs = (options?: OptionsType) => gql`
  ${createInput(options)}
`;

export const generateGraphQlSDLFile = (
  schema: GraphQLSchema,
  path: string = 'schema.graphql',
) => {
  writeFileSync(path, printSchema(schema));
};
