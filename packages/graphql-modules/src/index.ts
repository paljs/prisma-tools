import { Options } from "./types";
import { writeFile, mkdir } from "fs";
import { schema, datamodel } from "./schema";
import { format } from "prettier";
import { createQueriesAndMutations } from "./CreateQueriesAndMutations";
import { createCommon } from "./common";
import { DMMF } from "@prisma/client/runtime";

const defaultOptions: Options = {
  modelsOutput: "src/app/",
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function createModules(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };
  createCommon(options);
  let appModules: string[] = ["CommonModule"];
  let appImports = "";
  schema.outputTypes.forEach((model) => {
    let imports = "";
    let modules: string[] = ["CommonModule"];
    let extendsTypes = "";
    if (
      !["Query", "Mutation"].includes(model.name) &&
      !model.name.startsWith("Aggregate") &&
      model.name !== "BatchPayload"
    ) {
      appModules.push(model.name + "Module");
      appImports += `import { ${model.name}Module } from './${model.name}/${model.name}.module';
      `;
      let fileContent = `type ${model.name} {`;
      const fieldsExclude = options.fieldsExclude.concat(
        options.excludeFieldsByModel[model.name]
      );
      const dataModel = datamodel.models.find(
        (item) => item.name === model.name
      );
      model.fields.forEach((field) => {
        if (!fieldsExclude.includes(field.name)) {
          const dataField = dataModel?.fields.find(
            (item) => item.name === field.name
          );
          if (
            dataField?.kind === "object" &&
            dataField.relationFromFields.length > 0
          ) {
            if (!modules.includes(dataField.type + "Module")) {
              modules.push(dataField.type + "Module");
              imports += `import { ${dataField.type}Module } from '../${dataField.type}/${dataField.type}.module';
              `;
              extendsTypes += `extend type ${dataField.type} {`;
              schema.outputTypes
                .find((item) => item.name === dataField.type)
                ?.fields.filter((item) => item.outputType.type === model.name)
                .forEach((item) => {
                  extendsTypes = getField(item, extendsTypes);
                });

              extendsTypes += `}
              
              `;
            }

            fileContent = getField(field, fileContent);
          } else if (
            dataField?.kind !== "object" ||
            modules.includes(dataField.type + "Module")
          ) {
            fileContent = getField(field, fileContent);
          }
        }
      });
      fileContent += `}
  
`;

      fileContent += extendsTypes;

      const operations = createQueriesAndMutations(model.name, options);

      mkdir(`${options.modelsOutput}/${model.name}`, () => {});
      let resolvers = "";
      let resolversComposition = "";

      if (
        !options.disableQueries &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.queries
        )
      ) {
        resolvers += operations.queries.resolver;
        fileContent += operations.queries.type;
        resolversComposition += `Query: [addSelect],`;
      }
      if (
        !options.disableMutations &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.mutations
        )
      ) {
        resolvers += operations.mutations.resolver;
        fileContent += operations.mutations.type;
        resolversComposition += `Mutation: [addSelect],`;
      }

      if (resolvers) {
        resolvers = `import { ModuleContext } from '@graphql-modules/core';
        import { PrismaProvider } from '../common/Prisma.provider';
      
      export default {
        ${resolvers}
      }
        `;
        writeFile(
          `${options.modelsOutput}/${model.name}/resolvers.ts`,
          formatter(resolvers),
          () => {}
        );
      }

      fileContent = `import gql from 'graphql-tag';

      export default gql\`
      ${fileContent}
      \`;
      `;

      writeFile(
        `${options.modelsOutput}/${model.name}/typeDefs.ts`,
        formatter(fileContent),
        () => {}
      );

      writeFile(
        `${options.modelsOutput}/${model.name}/${model.name}.module.ts`,
        formatter(
          getModule(model.name, imports, modules, resolversComposition)
        ),
        () => {}
      );
    }
  });

  writeFile(
    `${options.modelsOutput}/app.module.ts`,
    formatter(AppModule(appImports, appModules)),
    () => {}
  );
}

export const formatter = (content: string) => {
  return format(content, {
    singleQuote: true,
    trailingComma: "all",
    parser: "babel-ts",
  });
};

const getModule = (
  name: string,
  imports: string,
  modules: string[],
  resolversComposition: string
) => {
  return `import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';
${imports}

export const ${name}Module = new GraphQLModule({
  name: '${name}',
  typeDefs,
  resolvers,
  imports: ${JSON.stringify(modules).replace(/"/g, "")},
  ${
    resolversComposition
      ? `resolversComposition: {
    ${resolversComposition}
  },
  `
      : ""
  }
});
`;
};

const AppModule = (imports: string, modules: string[]) => {
  return `import { GraphQLModule } from '@graphql-modules/core';
  import { CommonModule } from './common/common.module';
  ${imports}

  export const AppModule = new GraphQLModule({
    imports: ${JSON.stringify(modules).replace(/"/g, "")},
  });
  `;
};

const getField = (field: DMMF.SchemaField, content: string) => {
  content += `
    ${field.name}`;
  if (field.args.length > 0) {
    content += "(";
    field.args.forEach((arg) => {
      content += `${arg.name}: ${arg.inputType[0].type}
              `;
    });
    content += ")";
  }
  content += `: ${
    field.outputType.isList
      ? `[${field.outputType.type}!]!`
      : field.outputType.type + (field.outputType.isRequired ? "!" : "")
  }`;
  return content;
};
