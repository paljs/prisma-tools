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

  private indexPath = this.output('application.ts');
  private index = existsSync(this.indexPath)
    ? readFileSync(this.indexPath, { encoding: 'utf-8' })
    : defaultAppContent;
  private appModules: string[] = getApplication(this.index);

  private async createModules() {
    const models = await this.models();
    const datamodel = await this.datamodel();
    for (const model of models) {
      let extendsTypes = '';

      if (!this.appModules.includes(model.name + 'Module')) {
        this.appModules.push(model.name + 'Module');
        this.index = `import { ${model.name}Module } from './${model.name}/${model.name}.module';${this.index}`;
      }
      const dataModel = this.dataModel(datamodel.models, model.name);
      const modelDocs = this.filterDocs(dataModel?.documentation);
      let fileContent = `${modelDocs ? `"""${modelDocs}"""\n` : ''}type ${
        model.name
      } {`;

      model.fields.forEach((field) => {
        if (!this.excludeFields(model.name).includes(field.name)) {
          const dataField = this.dataField(field.name, dataModel);
          const fieldDocs = this.filterDocs(dataField?.documentation);
          if (dataField?.kind === 'object' && model.name !== dataField.type) {
            if (!extendsTypes.includes(`extend type ${dataField.type}`)) {
              extendsTypes += `extend type ${dataField.type} {`;
              models
                .find((item) => item.name === dataField.type)
                ?.fields.filter((item) => item.outputType.type === model.name)
                .forEach((item) => {
                  extendsTypes = getField(item, extendsTypes, fieldDocs);
                });

              extendsTypes += `}\n\n`;
            }
          } else {
            fileContent = getField(field, fileContent, fieldDocs);
          }
        }
      });
      fileContent += `\n}\n\n`;

      fileContent += extendsTypes;
      this.createFiles(model.name, fileContent);
    }
  }

  async getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return await createQueriesAndMutations(model, exclude, this);
  }

  private async createFiles(model: string, content: string) {
    const operations = await this.getOperations(model);

    this.mkdir(this.output(model));

    let resolvers = '';

    if (!this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      content += operations.queries.type;
    }
    if (!this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      content += operations.mutations.type;
    }

    this.createResolver(resolvers, model);

    this.createTypes(content, model);

    writeFileSync(
      this.output(model, `${model}.module.ts`),
      this.formation(getModule(model), 'babel-ts'),
    );
  }

  private createTypes(content: string, model: string) {
    content = `import { gql } from 'graphql-modules';

      export default gql\`
      ${this.formation(content, 'graphql')}
      \`;
      `;

    writeFileSync(
      this.output(model, 'typeDefs.ts'),
      this.formation(content, 'babel-ts'),
    );
  }

  private createResolver(resolvers: string, model: string) {
    if (resolvers) {
      resolvers = `import { PrismaProvider } from '../Prisma.provider';
      
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
      this.formation(App(this.appModules, this.index), 'babel-ts'),
    );
  }
}

const getModule = (name: string) => {
  return `import { createModule } from 'graphql-modules';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export const ${name}Module = createModule({
  id: '${name}',
  typeDefs,
  resolvers,
});
`;
};

const getField = (field: DMMF.SchemaField, content: string, docs?: string) => {
  content += `
  ${docs ? `"""${docs}"""\n` : ''}${field.name}`;
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
      : field.outputType.type + (!field.isNullable ? '!' : '')
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
        .filter((a) => !!a.replace(/\s/g, ''))
        .map((a) => a.replace(/\s/g, ''));
    }
  }
  return ['CommonModule'];
};

const defaultAppContent = `import { createApplication } from 'graphql-modules';
import { InputsModule } from './inputs/inputs.module'
import { CommonModule } from './common/common.module';
import { addSelect } from './addSelect';
import { PrismaProvider } from './Prisma.provider';

export const application = createApplication({
  modules: [InputsModule, CommonModule],
  providers: [PrismaProvider],
  middlewares: {
    "*": { "*": [addSelect] }
  },
});`;
