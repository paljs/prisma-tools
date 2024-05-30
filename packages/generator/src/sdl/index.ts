import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { Generators } from '../Generators';
import { GenerateTypes } from './GenerateTypes';
import { getInputType } from '@paljs/utils';

export class GenerateSdl extends Generators {
  generatedText: {
    models: Record<string, { resolvers: string; typeDefs: string }>;
    inputs: string;
  } = { models: {}, inputs: '' };

  async run() {
    await this.createModels();
    await this.createInputs();
    await this.createMaster();
    if (!this.isJS) {
      const generateTypes = new GenerateTypes(await this.dmmf(), this.options);
      const code = await generateTypes.run();
      writeFileSync(this.output('../resolversTypes.ts'), await this.formation(code));
    }
  }

  resolversPath = this.output(this.withExtension('resolvers'));
  resolversIndex = existsSync(this.resolversPath)
    ? readFileSync(this.resolversPath, { encoding: 'utf-8' })
    : defaultResolverFile(this.isJS);
  resolversExport: string[] = getCurrentExport(this.resolversIndex);

  typeDefsPath = this.output(this.withExtension('typeDefs'));
  typeDefsIndex = existsSync(this.typeDefsPath)
    ? readFileSync(this.typeDefsPath, { encoding: 'utf-8' })
    : defaultTypeFile(this.isJS);
  typeDefsExport: string[] = getCurrentExport(this.typeDefsIndex);

  async createModels() {
    const dataModels = await this.datamodel();
    for (const model of await this.models()) {
      const dataModel = this.dataModel(dataModels.models, model.name);
      const modelDocs = this.filterDocs(dataModel?.documentation);
      let fileContent = `${modelDocs ? `"""${modelDocs}"""\n` : ''}type ${model.name} {`;
      const excludeFields = this.excludeFields(model.name);
      model.fields.forEach((field) => {
        if (!excludeFields.includes(field.name)) {
          const dataField = this.dataField(field.name, dataModel);
          const fieldDocs = this.filterDocs(dataField?.documentation);
          if (this.shouldOmit(fieldDocs)) {
            return;
          }
          fileContent += `
          ${fieldDocs ? `"""${fieldDocs}"""\n` : ''}${field.name}`;
          if (field.args.length > 0) {
            fileContent += '(';
            field.args.forEach((arg) => {
              const inputType = getInputType(arg, this.options);
              fileContent += `${arg.name}: ${inputType.isList ? `[${inputType.type}]` : inputType.type}
              `;
            });
            fileContent += ')';
          }
          fileContent += `: ${
            field.outputType.isList
              ? `[${field.outputType.type}!]!`
              : `${field.outputType.type}${!field.isNullable ? '!' : ''}`
          }`;
        }
      });

      fileContent += `\n}\n\n`;
      await this.createFiles(model.name, fileContent);
    }
  }

  private async getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return await createQueriesAndMutations(model, exclude, this);
  }

  private async createFiles(model: string, typeContent: string) {
    const operations = await this.getOperations(model);
    !this.options.backAsText && this.mkdir(this.output(model));

    let resolvers = '';
    if (!this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      typeContent += operations.queries.type;
    }
    if (!this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      typeContent += operations.mutations.type;
    }
    const resolverFile = await this.createResolvers(resolvers, model);
    const typeFile = await this.createTypes(typeContent, model);
    if (this.options.backAsText) {
      this.generatedText.models[model] = { resolvers: resolverFile || '', typeDefs: typeFile || '' };
    }
  }

  private async createResolvers(resolvers: string, model: string): Promise<string | void> {
    if (resolvers) {
      if (this.isJS) {
        resolvers = `
      const ${model} = {
        ${resolvers}
      }
      
      module.exports = { 
      ${model}
      }
        `;
      } else {
        resolvers = `import { Resolvers } from '../../resolversTypes';
      
      const resolvers: Resolvers = {
        ${resolvers}
      }
      export default resolvers;
        `;
      }

      if (!this.resolversExport.includes(model)) {
        this.resolversExport.push(model);
        this.resolversIndex = `${this.getImport(this.isJS ? `{ ${model} }` : model, `./${model}/resolvers`)}\n${
          this.resolversIndex
        }`;
      }

      if (this.options.backAsText) {
        return this.formation(resolvers);
      } else {
        writeFileSync(this.output(model, this.withExtension('resolvers')), await this.formation(resolvers));
      }
    }
  }

  private async createTypes(fileContent: string, model: string): Promise<string | void> {
    if (this.isJS) {
      fileContent = `const { default: gql } = require('graphql-tag');\n
    const ${model} = gql\`\n${await this.formation(fileContent, 'graphql')}\n\`;\n
    module.exports = { 
      ${model}
      }`;
    } else {
      fileContent = `import gql from 'graphql-tag';\n
    export default gql\`\n${await this.formation(fileContent, 'graphql')}\n\`;\n`;
    }

    if (!this.typeDefsExport.includes(model)) {
      this.typeDefsExport.push(model);
      this.typeDefsIndex = `${this.getImport(this.isJS ? `{ ${model} }` : model, `./${model}/typeDefs`)}\n${
        this.typeDefsIndex
      }`;
    }

    if (this.options.backAsText) {
      return this.formation(fileContent);
    } else {
      writeFileSync(this.output(model, this.withExtension('typeDefs')), await this.formation(fileContent));
    }
  }

  async createInputs() {
    let content = await this.generateSDLInputsString();

    if (this.isJS) {
      content = `const { default: gql } = require('graphql-tag');\n
    const ${this.inputName} = gql\`\n${content}\n\`;\n
    module.exports = { 
      ${this.inputName}
      }`;
    } else {
      content = `import gql from 'graphql-tag';\n
    export default gql\`\n${content}\n\`;\n`;
    }

    if (!this.typeDefsExport.includes(this.inputName)) {
      this.typeDefsExport.push(this.inputName);
      this.typeDefsIndex = `${this.getImport(
        this.isJS ? `{ ${this.inputName} }` : this.inputName,
        `./${this.inputName}`,
      )}\n${this.typeDefsIndex}`;
    }
    if (this.options.backAsText) {
      this.generatedText.inputs = await this.formation(content);
    } else {
      writeFileSync(this.output(this.withExtension(this.inputName)), await this.formation(content));
    }
  }

  async createMaster() {
    writeFileSync(this.resolversPath, await this.formation(replaceExports(this.resolversExport, this.resolversIndex)));

    writeFileSync(this.typeDefsPath, await this.formation(replaceExports(this.typeDefsExport, this.typeDefsIndex)));
  }
}

export const replaceExports = (exports: string[], text: string) => {
  const matchText = text.match(/\[([\S\s]*?)]/);
  if (matchText) {
    return text.replace(matchText[0], JSON.stringify(exports).replace(/"/g, ''));
  }
  return '';
};

const getCurrentExport = (text: string) => {
  const matchText = text.match(/\[([\S\s]*?)]/);
  if (matchText) {
    return matchText[1]
      .split(',')
      .filter((a) => a)
      .map((a) => a.replace(/\s/g, ''));
  }
  return [];
};

const defaultResolverFile = (isJs?: boolean) =>
  isJs
    ? `
    const resolvers = [];
    
    module.exports = {resolvers};`
    : `export default [];`;
const defaultTypeFile = (isJs?: boolean) =>
  isJs
    ? `const { mergeTypeDefs } = require('@graphql-tools/merge');
const { InputTypes } = require('./InputTypes');

const typeDefs = mergeTypeDefs([InputTypes]);

module.exports = {typeDefs};`
    : `import { mergeTypeDefs } from '@graphql-tools/merge';
import InputTypes from './InputTypes';

export default mergeTypeDefs([InputTypes]);`;
