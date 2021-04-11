import { DMMF } from '@prisma/client/runtime';
import { GraphQLSchema } from 'graphql';
import { writeFileSync } from 'fs';

interface OptionsType {
  dmmf?: DMMF.Document;
  doNotUseFieldUpdateOperationsInput?: boolean;
}

const testedTypes: string[] = [];

export const hasEmptyTypeFields = (type: string, options?: OptionsType) => {
  let schema = options?.dmmf?.schema;
  if (!schema) {
    const { Prisma } = require('@prisma/client');
    schema = Prisma.dmmf?.schema;
  }
  testedTypes.push(type);
  const inputObjectTypes = schema ? [...schema?.inputObjectTypes.prisma] : [];
  if (schema?.inputObjectTypes.model)
    inputObjectTypes.push(...schema.inputObjectTypes.model);

  const inputType = inputObjectTypes.find((item) => item.name === type);
  if (inputType) {
    if (inputType.fields.length === 0) return true;
    for (const field of inputType.fields) {
      const fieldType = getInputType(field, options);
      if (
        fieldType.type !== type &&
        fieldType.location === 'inputObjectTypes' &&
        !testedTypes.includes(fieldType.type as string)
      ) {
        const state = hasEmptyTypeFields(fieldType.type as string, options);
        if (state) return true;
      }
    }
  }
  return false;
};

export const getInputType = (
  field: DMMF.SchemaArg,
  options?: { doNotUseFieldUpdateOperationsInput?: boolean },
) => {
  let index: number = 0;
  if (
    options?.doNotUseFieldUpdateOperationsInput &&
    field.inputTypes.length > 1 &&
    (field.inputTypes[1].type as string).endsWith('FieldUpdateOperationsInput')
  ) {
    return field.inputTypes[index];
  }
  if (
    field.inputTypes.length > 1 &&
    (field.inputTypes[1].location === 'inputObjectTypes' ||
      field.inputTypes[1].isList)
  ) {
    index = 1;
  }
  return field.inputTypes[index];
};

function createInput(options?: OptionsType) {
  let schema = options?.dmmf?.schema;
  if (!schema) {
    const { Prisma } = require('@prisma/client');
    schema = Prisma.dmmf?.schema;
  }
  let fileContent = `
  scalar DateTime
  
  type BatchPayload {
  count: Int!
}
`;
  if (schema) {
    const enums = [...schema.enumTypes.prisma];
    if (schema.enumTypes.model) enums.push(...schema.enumTypes.model);
    enums.forEach((item) => {
      fileContent += `enum ${item.name} {`;
      item.values.forEach((item2) => {
        fileContent += `
        ${item2}`;
      });
      fileContent += `}
  
  `;
    });
    const inputObjectTypes = [...schema.inputObjectTypes.prisma];
    if (schema.inputObjectTypes.model)
      inputObjectTypes.push(...schema.inputObjectTypes.model);

    inputObjectTypes.forEach((model) => {
      if (model.fields.length > 0) {
        fileContent += `input ${model.name} {
      `;
        model.fields.forEach((field) => {
          const inputType = getInputType(field, options);
          const hasEmptyType =
            inputType.location === 'inputObjectTypes' &&
            hasEmptyTypeFields(inputType.type as string, options);
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

    schema?.outputObjectTypes.prisma
      .filter((type) => type.name.includes('Aggregate'))
      .forEach((type) => {
        fileContent += `type ${type.name} {
      `;
        type.fields.forEach((field) => {
          fileContent += `${field.name}: ${
            field.outputType.isList
              ? `[${field.outputType.type}!]`
              : field.outputType.type
          }${!field.isNullable ? '!' : ''}
        `;
        });
        fileContent += `}
    
  `;
      });
  }
  return fileContent;
}

export const sdlInputs = (options?: OptionsType) => {
  const gql = require('graphql-tag');
  return gql`
    ${createInput(options)}
  `;
};

export const generateGraphQlSDLFile = (
  schema: GraphQLSchema,
  path: string = 'schema.graphql',
) => {
  const { printSchema } = require('graphql');
  writeFileSync(path, printSchema(schema));
};
