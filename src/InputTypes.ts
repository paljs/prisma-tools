import { dmmf } from '@prisma/client'
import { DMMF } from '@prisma/client/runtime'
import { formation } from './createTypes'
import { writeFile } from 'fs'

export function createInput(path: string) {
  let fileContent = `import { enumType, scalarType, inputObjectType, objectType } from '@nexus/schema'
  
export const DateTime = scalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return new Date(value)
  },
  parseLiteral(ast: any) {
    return new Date(ast.value)
  },
})

export const BatchPayload = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.int('count', { nullable: false })
  },
})

`
  dmmf.schema.enums.forEach(item => {
    fileContent += `export const ${item.name} = enumType({
  name: '${item.name}',
  members: ${JSON.stringify(item.values)},
})
  
`
  })

  dmmf.schema.inputTypes.forEach(model => {
    fileContent += `export const ${model.name} = inputObjectType({
  name: '${model.name}',
  definition(t) {
    `
    model.fields.forEach(field => {
      let inputType: DMMF.SchemaArgInputType
      if (
        field.inputType.length > 1 &&
        field.inputType[1].type !== 'null' &&
        field.name !== 'not'
      ) {
        inputType = field.inputType[1]
      } else {
        inputType = field.inputType[0]
      }
      fileContent += `t.field('${field.name}', { type: '${inputType.type}'${
        inputType.isRequired ? ', nullable: false' : ''
      }${inputType.isList ? ', list: true' : ''} })
    `
    })
    fileContent += `},
})
  
`
  })
  writeFile(`${path}/inputTypes.ts`, formation(fileContent), () => {})
}
