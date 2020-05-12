import { Options } from "./types";
import { writeFile, mkdir } from "fs";
import { schema } from "./schema";
import { format } from "prettier";
import { createQueriesAndMutations } from "./CreateQueriesAndMutations";
import { createInput } from "./InputTypes";

const defaultOptions: Options = {
  inputTypesOutput: "src/graphql",
  modelsOutput: "src/graphql/models",
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function createTypes(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };
  writeFile(
    `${options.inputTypesOutput}/inputTypes.graphql`,
    format(createInput(), { parser: "graphql" }),
    () => {}
  );
  if (options.onlyInputType) {
    return;
  }
  schema.outputTypes.forEach((model) => {
    if (
      !["Query", "Mutation"].includes(model.name) &&
      !model.name.startsWith("Aggregate") &&
      model.name !== "BatchPayload"
    ) {
      let fileContent = `type ${model.name} {`;
      const fieldsExclude = options.fieldsExclude.concat(
        options.excludeFieldsByModel[model.name]
      );
      model.fields.forEach((field) => {
        if (!fieldsExclude.includes(field.name)) {
          fileContent += `
          ${field.name}`;
          if (field.args.length > 0) {
            fileContent += "(";
            field.args.forEach((arg) => {
              fileContent += `${arg.name}: ${arg.inputType[0].type}
              `;
            });
            fileContent += ")";
          }
          fileContent += `: ${
            field.outputType.isList
              ? `[${field.outputType.type}!]!`
              : field.outputType.type + (field.outputType.isRequired ? "!" : "")
          }`;
        }
      });
      fileContent += `}
  
`;
      const operations = createQueriesAndMutations(model.name, options);

      mkdir(`${options.modelsOutput}/${model.name}`, () => {});
      let resolvers = "";

      if (
        !options.disableQueries &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.queries
        )
      ) {
        resolvers += operations.queries.resolver;
        fileContent += operations.queries.type;
      }
      if (
        !options.disableMutations &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.mutations
        )
      ) {
        resolvers += operations.mutations.resolver;
        fileContent += operations.mutations.type;
      }

      if (resolvers) {
        resolvers = `import { Context } from '../../../context'
      
      export default {
        ${resolvers}
      }
        `;
        writeFile(
          `${options.modelsOutput}/${model.name}/resolvers.ts`,
          format(resolvers, {
            singleQuote: true,
            semi: false,
            trailingComma: "all",
            parser: "babel-ts",
          }),
          () => {}
        );
      }

      writeFile(
        `${options.modelsOutput}/${model.name}/typeDefs.graphql`,
        format(fileContent, { parser: "graphql" }),
        () => {}
      );
    }
  });
}
