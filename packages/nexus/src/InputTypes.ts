import { schema } from './schema';
import { DMMF } from '@prisma/client/runtime';

export function createInput(nexusSchema?: boolean) {
  let fileContent = `${
    nexusSchema
      ? `import { enumType, scalarType, inputObjectType, objectType } from '@nexus/schema'`
      : `import { schema } from 'nexus'`
  }
  
${nexusSchema ? `export const DateTime = ` : 'schema.'}scalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value: any) {
    return value ? new Date(value) : null
  },
  serialize(value: any) {
    return value ? new Date(value) : null
  },
  parseLiteral(ast: any) {
    return ast.value ? new Date(ast.value) : null
  },
})

${nexusSchema ? `export const BatchPayload = ` : 'schema.'}objectType({
  name: 'BatchPayload',
  definition(t) {
    t.int('count', { nullable: false })
  },
})

`;
  schema.enums.forEach((item) => {
    fileContent += `${
      nexusSchema ? `export const ${item.name} = ` : 'schema.'
    }enumType({
  name: '${item.name}',
  members: ${JSON.stringify(item.values)},
})
  
`;
  });

  schema.inputTypes.forEach((model) => {
    fileContent += `${
      nexusSchema ? `export const ${model.name} = ` : 'schema.'
    }inputObjectType({
  name: '${model.name}',
  definition(t) {
    `;
    model.fields.forEach((field) => {
      let inputType: DMMF.SchemaArgInputType;
      if (
        field.inputType.length > 1 &&
        field.inputType[1].type !== 'null' &&
        field.name !== 'not'
      ) {
        inputType = field.inputType[1];
      } else {
        inputType = field.inputType[0];
      }
      fileContent += `t.field('${field.name}', { type: '${inputType.type}'${
        inputType.isRequired ? ', nullable: false' : ''
      }${inputType.isList ? ', list: true' : ''} })
    `;
    });
    fileContent += `},
})
  
`;
  });
  return fileContent;
}
