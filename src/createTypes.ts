import { Options } from './types';
import { writeFile, mkdir } from 'fs';
import { dmmf } from '@prisma/client';
import { format } from 'prettier';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { createInput } from './InputTypes';

const defaultOptions: Options = {
  inputTypesOutput: 'src/types',
  modelsOutput: 'src/types/models',
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function createTypes(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };
  let index = '';
  createInput(options.inputTypesOutput);
  dmmf.schema.outputTypes.forEach((model) => {
    if (
      !['Query', 'Mutation'].includes(model.name) &&
      !model.name.startsWith('Aggregate') &&
      model.name !== 'BatchPayload' &&
      !options.modelsExclude.includes(model.name)
    ) {
      index += `export * from './${model.name}';
`;
      let fileContent = `import { objectType, extendType, arg } from '@nexus/schema'
  
`;
      fileContent += `export const ${model.name} = objectType({
  name: '${model.name}',
  definition(t) {
    `;
      const fieldsExclude = options.fieldsExclude.concat(
        options.excludeFieldsByModel[model.name]
      );
      model.fields.forEach((field) => {
        if (!fieldsExclude.includes(field.name)) {
          const options = getOptions(field);
          if (
            field.outputType.kind === 'scalar' &&
            field.outputType.type !== 'DateTime'
          ) {
            fileContent += `t.${(field.outputType
              .type as String).toLowerCase()}('${field.name}'${options})
    `;
          } else {
            fileContent += `t.field('${field.name}'${options})
    `;
          }
        }
      });
      fileContent += `},
})
  
`;
      fileContent += createQueriesAndMutations(model.name, options);
      mkdir(options.modelsOutput, () => {});
      writeFile(
        `${options.modelsOutput}/${model.name}.ts`,
        formation(fileContent),
        () => {}
      );
    }
  });
  writeFile(`${options.modelsOutput}/index.ts`, formation(index), () => {});
}

function getOptions(field) {
  const options = field.outputType.isList
    ? { nullable: false, list: [true] }
    : { nullable: !field.outputType.isRequired };
  if (
    field.outputType.kind !== 'scalar' ||
    field.outputType.type === 'DateTime'
  )
    options['type'] = field.outputType.type;
  if (field.args.length > 0) {
    field.args.forEach((arg) => {
      if (!options['args']) options['args'] = {};
      options['args'][arg.name] = arg.inputType[0].type;
    });
  }
  const toString = JSON.stringify(options);
  return ', ' + toString;
}

export function formation(text: string) {
  return format(text, {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    parser: 'babel',
  });
}
