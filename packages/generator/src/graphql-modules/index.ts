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
  private appModules: string[] = getApplication(this.index);

  private async createModules() {
    const models = await this.models();
    const datamodel = await this.datamodel();
    models.forEach((model) => {
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
            if (!modules.includes(dataField.type + 'Module') && model.name !== dataField.type) {
              modules.push(dataField.type + 'Module');
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
            modules.includes(dataField.type + 'Module') ||
            model.name === dataField.type
          ) {
            fileContent = getField(field, fileContent);
          }
        }
      });
      fileContent += `}\n\n`;

      fileContent += extendsTypes;
      this.createFiles(model.name, fileContent);
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
  ) {
    const operations = this.getOperations(model);

    this.mkdir(this.output(model));

    let resolvers = '';
    let middlewares = '';

    if (!this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      content += operations.queries.type;
      middlewares += `Query: { "*": [addSelect] },`;
    }
    if (!this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      content += operations.mutations.type;
      middlewares += `Mutation:{ "*": [addSelect] },`;
    }

    this.createResolver(resolvers, model);

    this.createTypes(content, model);

    writeFileSync(
      this.output(model, `${model}.module.ts`),
      this.formation(
        getModule(model, middlewares),
        'babel-ts',
      ),
    );
  }

  private createTypes(content: string, model: string) {
    content = `import { gql } from 'graphql-modules';

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
      resolvers = `export default {
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
      this.formation(App(this.appModules, this.index), 'babel-ts'),
    );
  }
}

const getModule = (
  name: string,
  middlewares: string,
) => {
  return `import { createModule } from 'graphql-modules';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';

export const ${name}Module = createModule({
  id: '${name}',
  typeDefs,
  resolvers,
  ${
    middlewares
      ? `middlewares: {
    ${middlewares}
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

const App = (modules: string[], index: string) => {
  const importObject = index.match(/modules:[\S\s]*?]/);
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

const getApplication = (text: string) => {
  const importObject = text.match(/modules:[\S\s]*?]/);
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

const defaultAppContent = `import { createApplication } from 'graphql-modules';
import { CommonModule } from './common/common.module';

export const application = createApplication({
  modules: [CommonModule],
});`;
