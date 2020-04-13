import { dmmf } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';

export function createInput() {
  let fileContent = `import { enumType, scalarType, inputObjectType, objectType } from '@nexus/schema'
  
export const DateTime = scalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return value ? new Date(value) : null
  },
  serialize(value) {
    return value ? new Date(value) : null
  },
  parseLiteral(ast: any) {
    return ast.value ? new Date(ast.value) : null
  },
})

export const BatchPayload = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.int('count', { nullable: false })
  },
})

`;
  dmmf.schema.enums.forEach((item) => {
    fileContent += `export const ${item.name} = enumType({
  name: '${item.name}',
  members: ${JSON.stringify(item.values)},
})
  
`;
  });

  dmmf.schema.inputTypes.forEach((model) => {
    fileContent += `export const ${model.name} = inputObjectType({
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
