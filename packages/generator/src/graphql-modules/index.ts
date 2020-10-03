import { Options } from '@paljs/types';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { DMMF } from '../schema';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { Generators } from '../Generators';

export class GenerateModules extends Generators {
  constructor(schemaPath: string, customOptions?: Partial<Options>) {
    super(schemaPath, { output: 'src/app', ...customOptions });
  }

  async run() {
    await this.createModules();
    this.createApp();
  }

  private indexPath = this.output('app.module.ts');
  private index = existsSync(this.indexPath)
    ? readFileSync(this.indexPath, { encoding: 'utf-8' })
    : defaultAppContent;
  private appModules: string[] = getAppModules(this.index);

  private async createModules() {
    const models = await this.models();
    const datamodel = await this.datamodel();
    models.forEach((model) => {
      let imports = '';
      let modules: string[] = ['CommonModule'];
      let extendsTypes = '';

      if (!this.appModules.includes(model.name + 'Module')) {
        this.appModules.push(model.name + 'Module');
        this.index = `import { ${model.name}Module } from './${model.name}/${model.name}.module';${this.index}`;
      }

      let fileContent = `type ${model.name} {`;

      const dataModel = datamodel.models.find(
        (item) => item.name === model.name,
      );
      model.fields.forEach((field) => {
        if (!this.excludeFields(model.name).includes(field.name)) {
          const dataField = dataModel?.fields.find(
            (item) => item.name === field.name,
          );
          if (
            dataField?.kind === 'object' &&
            dataField.relationFromFields.length > 0
          ) {
            if (!modules.includes(dataField.type + 'Module')) {
              modules.push(dataField.type + 'Module');
              imports += `import { ${dataField.type}Module } from '../${dataField.type}/${dataField.type}.module';
              `;
              extendsTypes += `extend type ${dataField.type} {`;
              models
                .find((item) => item.name === dataField.type)
                ?.fields.filter((item) => item.outputType.type === model.name)
                .forEach((item) => {
                  extendsTypes = getField(item, extendsTypes);
                });

              extendsTypes += `}\n\n`;
            }

            fileContent = getField(field, fileContent);
          } else if (
            dataField?.kind !== 'object' ||
            modules.includes(dataField.type + 'Module')
          ) {
            fileContent = getField(field, fileContent);
          }
        }
      });
      fileContent += `}\n\n`;

      fileContent += extendsTypes;
      this.createFiles(model.name, fileContent, imports, modules);
    });
  }

  getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return createQueriesAndMutations(
      model,
      this.smallModel(model),
      exclude,
      this.options.onDelete,
    );
  }

  private createFiles(
    model: string,
    content: string,
    imports: string,
    modules: string[],
  ) {
    const operations = this.getOperations(model);

    this.mkdir(this.output(model));

    let resolvers = '';
    let resolversComposition = '';

    if (this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      content += operations.queries.type;
      resolversComposition += `Query: [addSelect],`;
    }
    if (this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      content += operations.mutations.type;
      resolversComposition += `Mutation: [addSelect],`;
    }

    this.createResolver(resolvers, model);

    this.createTypes(content, model);

    writeFileSync(
      this.output(model, `${model}.module.ts`),
      this.formation(
        getModule(model, imports, modules, resolversComposition),
        'babel-ts',
      ),
    );
  }

  private createTypes(content: string, model: string) {
    content = `import gql from 'graphql-tag';

      export default gql\`
      ${content}
      \`;
      `;

    writeFileSync(
      this.output(model, 'typeDefs.ts'),
      this.formation(content, 'babel-ts'),
    );
  }

  private createResolver(resolvers: string, model: string) {
    if (resolvers) {
      resolvers = `import { ModuleContext } from '@graphql-modules/core';
        import { PrismaProvider } from '../common/Prisma.provider';
      
      export default {
        ${resolvers}
      }
        `;
      writeFileSync(
        this.output(model, 'resolvers.ts'),
        this.formation(resolvers, 'babel-ts'),
      );
    }
  }

  private createApp() {
    writeFileSync(
      this.indexPath,
      this.formation(AppModule(this.appModules, this.index), 'babel-ts'),
    );
  }
}

const getModule = (
  name: string,
  imports: string,
  modules: string[],
  resolversComposition: string,
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
  imports: ${JSON.stringify(modules).replace(/"/g, '')},
  ${
    resolversComposition
      ? `resolversComposition: {
    ${resolversComposition}
  },
  `
      : ''
  }
});
`;
};

const getField = (field: DMMF.SchemaField, content: string) => {
  content += `
    ${field.name}`;
  if (field.args.length > 0) {
    content += '(';
    field.args.forEach((arg) => {
      content += `${arg.name}: ${arg.inputTypes[0].type}
              `;
    });
    content += ')';
  }
  content += `: ${
    field.outputType.isList
      ? `[${field.outputType.type}!]!`
      : field.outputType.type + (field.isRequired ? '!' : '')
  }`;
  return content;
};

const AppModule = (modules: string[], index: string) => {
  const importObject = index.match(/imports:[\S\s]*?]/);
  if (importObject) {
    const modulesMatch = importObject[0].match(/\[[\S\s]*?]/);
    if (modulesMatch) {
      return index.replace(
        modulesMatch[0],
        JSON.stringify(modules).replace(/"/g, ''),
      );
    }
  }
  return '';
};

const getAppModules = (text: string) => {
  const importObject = text.match(/imports:[\S\s]*?]/);
  if (importObject) {
    const modules = importObject[0].match(/\[([\S\s]*?)]/);
    if (modules) {
      return modules[1]
        .split(',')
        .filter((a) => a)
        .map((a) => a.replace(/\s/g, ''));
    }
  }
  return ['CommonModule'];
};

const defaultAppContent = `import { GraphQLModule } from '@graphql-modules/core';
import { CommonModule } from './common/common.module';

export const AppModule = new GraphQLModule({
  imports: [CommonModule],
});`;
