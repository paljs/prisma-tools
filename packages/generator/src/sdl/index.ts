import { Options } from '@paljs/types';
import { writeFileSync } from 'fs';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { Generators } from '../Generators';

interface Index {
  import: string;
  export: string[];
}

export class GenerateSdl extends Generators {
  constructor(customOptions?: Partial<Options>) {
    super(customOptions);
  }

  run() {
    this.createModels();
    this.createMaster();
  }

  resolversIndex: Index = {
    import: '',
    export: [],
  };

  typeDefs: Index = {
    import: `import { mergeTypes } from 'merge-graphql-schemas';
    import {sdlInputs} from '@paljs/plugins'
    `,
    export: ['sdlInputs'],
  };

  createModels() {
    this.models.forEach((model) => {
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

  getOperations(model: string) {
    const exclude = this.excludedOperations(model);
    return createQueriesAndMutations(
      model,
      this.smallModel(model),
      exclude,
      this.options.onDelete,
    );
  }

  createFiles(model: string, typeContent: string) {
    const operations = this.getOperations(model);
    this.mkdir(`${this.options.output}/${model}`);

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

  createResolvers(resolvers: string, model: string) {
    if (resolvers) {
      resolvers = `import { Context } from '../../../context'
      
      export default {
        ${resolvers}
      }
        `;
      writeFileSync(
        `${this.options.output}/${model}/resolvers.ts`,
        this.formation(resolvers, 'babel-ts'),
      );

      this.resolversIndex.import += `import ${model} from './${model}/resolvers'\n`;
      this.resolversIndex.export.push(model);
    }
  }

  createTypes(fileContent: string, model: string) {
    fileContent = `import gql from 'graphql-tag';\n
    export default gql\`\n${fileContent}\n\`;\n`;

    this.typeDefs.import += `import ${model} from './${model}/typeDefs'\n`;
    this.typeDefs.export.push(model);

    writeFileSync(
      `${this.options.output}/${model}/typeDefs.ts`,
      this.formation(fileContent, 'babel-ts'),
    );
  }

  createMaster() {
    writeFileSync(
      this.options.output,
      'resolvers.ts',
      this.formation(
        `${this.resolversIndex.import}

    export default ${JSON.stringify(this.resolversIndex.export).replace(
      /"/g,
      '',
    )}
    `,
        'babel-ts',
      ),
    );

    writeFileSync(
      `${this.options.output}/typeDefs.ts`,
      this.formation(
        `${this.typeDefs.import}

    export default mergeTypes(${JSON.stringify(this.typeDefs.export).replace(
      /"/g,
      '',
    )})
    `,
        'babel-ts',
      ),
    );
  }
}
