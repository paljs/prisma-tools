import { Options } from './types'
import { schema } from './schema'
import { writeFile, mkdir } from 'fs'

const defaultOptions: Options = {
    inputTypesOutput: 'src/graphql',
    modelsOutput: 'src/graphql/schema/schema.json',
    fieldsExclude: [],
    modelsExclude: [],
    excludeFieldsByModel: {},
    excludeQueriesAndMutations: [],
    excludeQueriesAndMutationsByModel: {},
}

export function createFields(customOptions: Partial<Options>) {
    const output = { models: [], enums: [] }
    const options: Options = { ...defaultOptions, ...customOptions }
    if (options.onlyInputType) {
        return
    }
    schema.outputTypes.forEach((model) => {
        if (
            !['Query', 'Mutation'].includes(model.name) &&
            !model.name.startsWith('Aggregate') &&
            model.name !== 'BatchPayload'
        ) {
            const modelObject = {
                id: model.name,
                name: model.name,
                create: true,
                update: true,
                delete: true,
                fields: [],
                idField: 'id',
                displayFields: ['id'],
            }
            // let fileContent = `type ${model.name} {`;
            // const fieldsExclude = options.fieldsExclude.concat(
            //   options.excludeFieldsByModel[model.name]
            // );
            model.fields.forEach((field, index) => {
                modelObject.fields.push({
                    id: `${model.name}.${field.name}`,
                    name: field.name,
                    title: field.name
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function (str) {
                            return str.toUpperCase()
                        }),
                    type: field.outputType.type,
                    list: field.outputType.isList,
                    required: field.outputType.isRequired,
                    isId: field.name === 'id' ? true : false,
                    unique: false,
                    create: false,
                    update: false,
                    read: true,
                    filter: true,
                    sort: true,
                    order: index + 1,
                    kind: field.outputType.kind,
                    relationField: field.name.endsWith('Id') ? true : false,
                })
            })
            output.models.push(modelObject)
        }
    })
    writeFile(options.modelsOutput, JSON.stringify(output), () => { })
}
createFields({
    onDelete: true,
    // nexusSchema: true,
    excludeFieldsByModel: {
        User: ['password'],
    },
    excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
})