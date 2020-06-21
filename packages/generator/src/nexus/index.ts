import { Options } from '@paljs/types';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { DMMF } from '../schema';
import { Generators } from '../Generators';
import { getCrud } from './templates';

export class GenerateNexus extends Generators {
  constructor(customOptions?: Partial<Options>) {
    super(customOptions);
  }

  private indexPath = `${this.options.output}/index.ts`;
  private index = this.readIndex();

  run() {
    this.createModels();
    this.createIndex();
  }

  private createModels() {
    this.models.forEach((model) => {
      const exportString = `export * from './${model.name}'`;
      if (!this.index.includes(exportString)) {
        this.index = `export * from './${model.name}'\n${this.index}`;
      }

      let fileContent = `${
        this.options.nexusSchema
          ? `import { objectType } from '@nexus/schema'`
          : `import { schema } from 'nexus'`
      }\n\n`;

      fileContent += `${
        this.options.nexusSchema ? `export const ${model.name} = ` : 'schema.'
      }objectType({
  name: '${model.name}',
  definition(t) {
    `;
      model.fields.forEach((field) => {
        if (!this.excludeFields(model.name).includes(field.name)) {
          const options = this.getOptions(field);
          if (
            field.outputType.kind === 'scalar' &&
            field.outputType.type !== 'DateTime'
          ) {
            fileContent += `t.${(field.outputType
              .type as String).toLowerCase()}('${field.name}'${options})\n`;
          } else {
            fileContent += `t.field('${field.name}'${options})\n`;
          }
        }
      });

      fileContent += `},\n})\n\n`;
      const path = `${this.options.output}/${model.name}`;
      this.mkdir(path);
      writeFileSync(`${path}/type.ts`, this.formation(fileContent));

      let modelIndex = `export * from './type'\n`;
      modelIndex += this.createQueriesAndMutations(model.name);
      this.createIndex(path, modelIndex);
    });
  }

  private createQueriesAndMutations(name: string) {
    const exclude = this.excludedOperations(name);
    let modelIndex = '';
    if (this.disableQueries(name)) {
      let queriesIndex = '';
      const path = `${this.options.output}/${name}/queries`;
      this.queries
        .filter((item) => !exclude.includes(item))
        .map((item) => {
          const itemContent = getCrud(
            name,
            'query',
            item,
            this.options.onDelete,
            this.options.nexusSchema,
          );
          this.createFileIfNotfound(
            path,
            `${item}.ts`,
            this.formation(itemContent),
          );
          queriesIndex += `export * from './${item}'
`;
        });
      if (queriesIndex && this.options.nexusSchema) {
        modelIndex += `export * from './queries'
`;
        writeFileSync(`${path}/index.ts`, this.formation(queriesIndex));
      }
    }

    if (this.disableMutations(name)) {
      let mutationsIndex = '';
      const path = `${this.options.output}/${name}/mutations`;
      this.mutations
        .filter((item) => !exclude.includes(item))
        .map((item) => {
          const itemContent = getCrud(
            name,
            'mutation',
            item,
            this.options.onDelete,
            this.options.nexusSchema,
          );
          this.createFileIfNotfound(
            path,
            `${item}.ts`,
            this.formation(itemContent),
          );
          mutationsIndex += `export * from './${item}'
`;
        });
      if (mutationsIndex && this.options.nexusSchema) {
        modelIndex += `export * from './mutations'`;
        writeFileSync(`${path}/index.ts`, this.formation(mutationsIndex));
      }
    }
    return modelIndex;
  }

  private createIndex(path?: string, content?: string) {
    if (this.options.nexusSchema) {
      if (path && content) {
        writeFileSync(`${path}/index.ts`, this.formation(content));
      } else {
        writeFileSync(
          `${this.options.output}/index.ts`,
          this.formation(this.index),
        );
      }
    }
  }

  private readIndex() {
    return existsSync(this.indexPath)
      ? readFileSync(this.indexPath, { encoding: 'utf-8' })
      : '';
  }

  private getOptions(field: DMMF.SchemaField) {
    const options: any = field.outputType.isList
      ? { nullable: false, list: [true] }
      : { nullable: !field.outputType.isRequired };
    if (
      field.outputType.kind !== 'scalar' ||
      field.outputType.type === 'DateTime'
    )
      options['type'] = field.outputType.type;
    if (field.args.length > 0) {
      field.args.forEach((arg) => {
        if (!options['args']) options['args'] = {};
        options['args'][arg.name] = arg.inputType[0].type;
      });
    }
    let toString = JSON.stringify(options);
    if (field.outputType.kind === 'object') {
      toString = toString.slice(0, -1);
      toString += `, resolve(parent: any) {
      return parent['${field.name}']
    },
    }`;
    }
    return ', ' + toString;
  }
}
