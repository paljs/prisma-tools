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

  private resolversPath = this.output('resolvers.ts');
  private resolversIndex = existsSync(this.resolversPath)
    ? readFileSync(this.resolversPath, { encoding: 'utf-8' })
    : defaultResolverFile;
  private resolversExport: string[] = getCurrentExport(this.resolversIndex);

  private typeDefsPath = this.output('typeDefs.ts');
  private typeDefsIndex = existsSync(this.typeDefsPath)
    ? readFileSync(this.typeDefsPath, { encoding: 'utf-8' })
    : defaultTypeFile;
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
      resolvers = `import { Context } from '../../../context'
      
      export default {
        ${resolvers}
      }
        `;
      writeFileSync(
        this.output(model, 'resolvers.ts'),
        this.formation(resolvers, 'babel-ts'),
      );

      if (!this.resolversExport.includes(model)) {
        this.resolversExport.push(model);
        this.resolversIndex = `import ${model} from './${model}/resolvers'\n${this.resolversIndex}`;
      }
    }
  }

  private createTypes(fileContent: string, model: string) {
    fileContent = `import gql from 'graphql-tag';\n
    export default gql\`\n${fileContent}\n\`;\n`;

    writeFileSync(
      this.output(model, 'typeDefs.ts'),
      this.formation(fileContent, 'babel-ts'),
    );

    if (!this.typeDefsExport.includes(model)) {
      this.typeDefsExport.push(model);
      this.typeDefsIndex = `import ${model} from './${model}/typeDefs'\n${this.typeDefsIndex}`;
    }
  }

  private createMaster() {
    writeFileSync(
      this.resolversPath,
      this.formation(
        replaceExports(this.resolversExport, this.resolversIndex),
        'babel-ts',
      ),
    );

    writeFileSync(
      this.resolversPath,
      this.formation(
        replaceExports(this.typeDefsExport, this.typeDefsIndex),
        'babel-ts',
      ),
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

const defaultResolverFile = `export default [];`;
const defaultTypeFile = `import { mergeTypes } from 'merge-graphql-schemas';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypes([sdlInputs]);`;
