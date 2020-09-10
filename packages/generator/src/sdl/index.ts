import { Options } from '@paljs/types';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { Generators } from '../Generators';

export class GenerateSdl extends Generators {
  constructor(customOptions?: Partial<Options>) {
    super(customOptions);
  }

  async run() {
    await this.createModels();
    this.createMaster();
  }

  private resolversPath = this.output(this.withExtension('resolvers'));
  private resolversIndex = existsSync(this.resolversPath)
    ? readFileSync(this.resolversPath, { encoding: 'utf-8' })
    : defaultResolverFile(this.isJS);
  private resolversExport: string[] = getCurrentExport(this.resolversIndex);

  private typeDefsPath = this.output(this.withExtension('typeDefs'));
  private typeDefsIndex = existsSync(this.typeDefsPath)
    ? readFileSync(this.typeDefsPath, { encoding: 'utf-8' })
    : defaultTypeFile(this.isJS);
  private typeDefsExport: string[] = getCurrentExport(this.typeDefsIndex);

  private async createModels() {
    (await this.models()).forEach((model) => {
      let fileContent = `type ${model.name} {`;
      const excludeFields = this.excludeFields(model.name);
      model.fields.forEach((field) => {
        if (!excludeFields.includes(field.name)) {
          fileContent += `
          ${field.name}`;
          if (field.args.length > 0) {
            fileContent += '(';
            field.args.forEach((arg) => {
              fileContent += `${arg.name}: ${arg.inputType[0].type}
              `;
            });
            fileContent += ')';
          }
          fileContent += `: ${
            field.outputType.isList
              ? `[${field.outputType.type}!]!`
              : field.outputType.type + (field.outputType.isRequired ? '!' : '')
          }`;
        }
      });

      fileContent += `}\n\n`;
      this.createFiles(model.name, fileContent);
    });
  }

  private getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return createQueriesAndMutations(
      model,
      this.smallModel(model),
      exclude,
      this.options.onDelete,
      this.isJS,
    );
  }

  private createFiles(model: string, typeContent: string) {
    const operations = this.getOperations(model);
    this.mkdir(this.output(model));

    let resolvers = '';
    if (this.disableQueries(model)) {
      resolvers += operations.queries.resolver;
      typeContent += operations.queries.type;
    }
    if (this.disableMutations(model)) {
      resolvers += operations.mutations.resolver;
      typeContent += operations.mutations.type;
    }
    this.createResolvers(resolvers, model);
    this.createTypes(typeContent, model);
  }

  private createResolvers(resolvers: string, model: string) {
    if (resolvers) {
      if (this.isJS) {
        resolvers = `
      const ${model}Resolvers = {
        ${resolvers}
      }
      
      module.exports = { 
      ${model}Resolvers
      }
        `;
      } else {
        resolvers = `import { Context } from '../../context'
      
      export default {
        ${resolvers}
      }
        `;
      }
      writeFileSync(
        this.output(model, this.withExtension('resolvers')),
        this.formation(resolvers),
      );

      if (!this.resolversExport.includes(model)) {
        this.resolversExport.push(model);
        this.resolversIndex = `${this.getImport(
          this.isJS ? `{ ${model}Resolvers }` : model,
          `${model}/resolvers`,
        )}\n${this.resolversIndex}`;
      }
    }
  }

  private createTypes(fileContent: string, model: string) {
    if (this.isJS) {
      fileContent = `const { default: gql } = require('graphql-tag');\n
    const ${model}TypeDefs = gql\`\n${fileContent}\n\`;\n
    module.exports = { 
      ${model}TypeDefs
      }`;
    } else {
      fileContent = `import gql from 'graphql-tag';\n
    export default gql\`\n${fileContent}\n\`;\n`;
    }

    writeFileSync(
      this.output(model, this.withExtension('typeDefs')),
      this.formation(fileContent),
    );

    if (!this.typeDefsExport.includes(model)) {
      this.typeDefsExport.push(model);
      this.typeDefsIndex = `${this.getImport(
        this.isJS ? `{ ${model}TypeDefs }` : model,
        `${model}/typeDefs`,
      )}\n${this.typeDefsIndex}`;
    }
  }

  private createMaster() {
    writeFileSync(
      this.resolversPath,
      this.formation(replaceExports(this.resolversExport, this.resolversIndex)),
    );

    writeFileSync(
      this.typeDefsPath,
      this.formation(replaceExports(this.typeDefsExport, this.typeDefsIndex)),
    );
  }
}

const replaceExports = (exports: string[], text: string) => {
  const matchText = text.match(/\[([\S\s]*?)]/);
  if (matchText) {
    return text.replace(
      matchText[0],
      JSON.stringify(exports).replace(/"/g, ''),
    );
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
    ? `const resolvers = [];
    module.exports = {resolvers};`
    : `export default [];`;
const defaultTypeFile = (isJs?: boolean) =>
  isJs
    ? `const { mergeTypeDefs } require('@graphql-tools/merge');
const { sdlInputs } require('@paljs/plugins');

const typeDevs = mergeTypeDefs([sdlInputs]);
module.exports = {typeDevs};`
    : `import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypeDefs([sdlInputs]);`;
