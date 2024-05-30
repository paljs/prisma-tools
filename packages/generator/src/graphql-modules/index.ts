import { GeneratorOptions, DMMF } from '@paljs/types';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { Generators } from '../Generators';
import { getInputType } from '@paljs/utils';

export class GenerateModules extends Generators {
  generatedText: {
    models: Record<string, { resolvers?: string; typeDefs?: string; module?: string }>;
    inputs: string;
  } = { models: {}, inputs: '' };

  constructor(schemaPath: string, customOptions?: Partial<GeneratorOptions>) {
    super(schemaPath, { output: 'src/app', ...customOptions });
  }

  async run() {
    await this.createModules();
    await this.createInputs();
    await this.createApp();
  }

  private indexPath = this.output('application.ts');
  private index = existsSync(this.indexPath) ? readFileSync(this.indexPath, { encoding: 'utf-8' }) : defaultAppContent;
  private appModules: string[] = getApplication(this.index);

  async createModules() {
    const models = await this.models();
    const datamodel = await this.datamodel();
    for (const model of models) {
      const dataModel = this.dataModel(datamodel.models, model.name);
      let extendsTypes = '';

      if (!this.appModules.includes(model.name + 'Module')) {
        this.appModules.push(model.name + 'Module');
        this.index = `import { ${model.name}Module } from './${model.name}/${model.name}.module';${this.index}`;
      }
      const modelDocs = this.filterDocs(dataModel?.documentation);
      let fileContent = `${modelDocs ? `"""${modelDocs}"""\n` : ''}type ${model.name} {`;

      model.fields.forEach((field) => {
        if (!this.excludeFields(model.name).includes(field.name)) {
          const dataField = this.dataField(field.name, dataModel);
          const fieldDocs = this.filterDocs(dataField?.documentation);
          if (this.shouldOmit(fieldDocs)) {
            return;
          }
          if (dataField?.kind === 'object' && model.name !== dataField.type) {
            if (!extendsTypes.includes(`extend type ${dataField.type}`)) {
              extendsTypes += `extend type ${dataField.type} {`;
              models
                .find((item) => item.name === dataField.type)
                ?.fields.filter((item) => item.outputType.type === model.name)
                .forEach((item) => {
                  extendsTypes = this.getField(item, extendsTypes, fieldDocs);
                });

              extendsTypes += `}\n\n`;
            }
          } else {
            fileContent = this.getField(field, fileContent, fieldDocs);
          }
        }
      });
      fileContent += `\n}\n\n`;

      fileContent += extendsTypes;
      await this.createFiles(model.name, fileContent);
    }
  }

  async getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return await createQueriesAndMutations(model, exclude, this);
  }

  private async createFiles(model: string, content: string) {
    const operations = await this.getOperations(model);

    !this.options.backAsText && this.mkdir(this.output(model));

    let resolvers = '';

    if (!this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      content += operations.queries.type;
    }
    if (!this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      content += operations.mutations.type;
    }

    await this.createResolver(resolvers, model);

    await this.createTypes(content, model);
    if (this.options.backAsText) {
      this.generatedText.models[model].module = await this.formation(getModule(model), 'babel-ts');
    } else {
      writeFileSync(this.output(model, `${model}.module.ts`), await this.formation(getModule(model), 'babel-ts'));
    }
  }

  private async createTypes(content: string, model: string) {
    content = `import { gql } from 'graphql-modules';

      export default gql\`
      ${await this.formation(content, 'graphql')}
      \`;
      `;
    if (this.options.backAsText) {
      this.generatedText.models[model].typeDefs = await this.formation(content, 'babel-ts');
    } else {
      writeFileSync(this.output(model, 'typeDefs.ts'), await this.formation(content, 'babel-ts'));
    }
  }

  private async createResolver(resolvers: string, model: string) {
    if (resolvers) {
      resolvers = `import { PrismaProvider } from '../Prisma.provider';
      
      export default {
        ${resolvers}
      }
        `;
      if (this.options.backAsText) {
        this.generatedText.models[model] = { resolvers: await this.formation(resolvers, 'babel-ts') };
      } else {
        writeFileSync(this.output(model, 'resolvers.ts'), await this.formation(resolvers, 'babel-ts'));
      }
    }
  }

  async createInputs() {
    let content = await this.generateSDLInputsString();

    content = `import { gql } from 'graphql-modules';\n
    export default gql\`\n${content}\n\`;\n`;

    if (this.options.backAsText) {
      this.generatedText.inputs = content;
    } else {
      writeFileSync(this.output('inputs', this.withExtension(this.inputName)), await this.formation(content));
    }
  }

  async createApp(): Promise<string | void> {
    const content = await this.formation(App(this.appModules, this.index), 'babel-ts');
    if (this.options.backAsText) {
      return content;
    } else {
      writeFileSync(this.indexPath, content);
    }
  }

  getField(field: DMMF.SchemaField, content: string, docs?: string) {
    content += `
  ${docs ? `"""${docs}"""\n` : ''}${field.name}`;
    if (field.args.length > 0) {
      content += '(';
      field.args.forEach((arg) => {
        const inputType = getInputType(arg, this.options);
        content += `${arg.name}: ${inputType.isList ? `[${inputType.type}]` : inputType.type}
              `;
      });
      content += ')';
    }
    content += `: ${
      field.outputType.isList
        ? `[${field.outputType.type}!]!`
        : `${field.outputType.type}${!field.isNullable ? '!' : ''}`
    }`;
    return content;
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

const App = (modules: string[], index: string) => {
  const importObject = index.match(/modules:[\S\s]*?]/);
  if (importObject) {
    const modulesMatch = importObject[0].match(/\[[\S\s]*?]/);
    if (modulesMatch) {
      return index.replace(modulesMatch[0], JSON.stringify(modules).replace(/"/g, ''));
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
