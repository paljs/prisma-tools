import { Options } from '@paljs/types';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { DMMF } from '../schema';
import { Generators } from '../Generators';
import { getCrud } from './templates';
import { join } from 'path';

export class GenerateNexus extends Generators {
  constructor(schemaPath: string, customOptions?: Partial<Options>) {
    super(schemaPath, customOptions);
  }

  private indexPath = this.output(this.withExtension('index'));
  private indexTS = this.readIndex();
  private indexJS: string[] = [];

  async run() {
    await this.createModels();
    this.createIndex();
  }

  private async createModels() {
    const models = await this.models();
    models.forEach((model) => {
      if (this.isJS) {
        this.indexJS.push(model.name);
      } else {
        const exportString = `export * from './${model.name}'`;
        if (!this.indexTS.includes(exportString)) {
          this.indexTS = `export * from './${model.name}'\n${this.indexTS}`;
        }
      }

      let fileContent = `${this.getImport(
        '{ objectType }',
        '@nexus/schema',
      )}\n\n`;

      fileContent += `${!this.isJS ? 'export ' : ''}const ${
        model.name
      } = objectType({
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

      fileContent += `},\n})\n\n${
        this.isJS ? `module.exports = {${model.name}}` : ''
      }`;
      const path = this.output(model.name);
      this.mkdir(path);
      writeFileSync(
        join(path, this.withExtension('type')),
        this.formation(fileContent),
      );

      this.createIndex(
        path,
        ['type'].concat(this.createQueriesAndMutations(model.name)),
      );
    });
  }

  private createQueriesAndMutations(name: string) {
    const exclude = this.excludedOperations(name);
    let modelIndex: string[] = [];
    if (!this.disableQueries(name)) {
      const queriesIndex: string[] = [];
      const path = this.output(name, 'queries');
      this.queries
        .filter((item) => !exclude.includes(item))
        .map((item) => {
          const itemContent = getCrud(
            name,
            'query',
            item,
            this.options.onDelete,
            this.isJS,
          );
          this.createFileIfNotfound(
            path,
            this.withExtension(item),
            this.formation(itemContent),
          );
          queriesIndex.push(item);
        });
      if (queriesIndex) {
        modelIndex.push('queries');
        writeFileSync(
          join(path, this.withExtension('index')),
          this.formation(this.getIndexContent(queriesIndex)),
        );
      }
    }

    if (!this.disableMutations(name)) {
      const mutationsIndex: string[] = [];
      const path = this.output(name, 'mutations');
      this.mutations
        .filter((item) => !exclude.includes(item))
        .map((item) => {
          const itemContent = getCrud(
            name,
            'mutation',
            item,
            this.options.onDelete,
            this.isJS,
          );
          this.createFileIfNotfound(
            path,
            this.withExtension(item),
            this.formation(itemContent),
          );
          mutationsIndex.push(item);
        });
      if (mutationsIndex) {
        modelIndex.push('mutations');
        writeFileSync(
          join(path, this.withExtension('index')),
          this.formation(this.getIndexContent(mutationsIndex)),
        );
      }
    }
    return modelIndex;
  }

  private createIndex(path?: string, content?: string[]) {
    if (path && content) {
      writeFileSync(
        join(path, this.withExtension('index')),
        this.formation(this.getIndexContent(content)),
      );
    } else {
      writeFileSync(
        this.output(this.withExtension('index')),
        this.formation(
          this.isJS ? this.getIndexContent(this.indexJS) : this.indexTS,
        ),
      );
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
      : { nullable: !field.isRequired };
    if (
      field.outputType.kind !== 'scalar' ||
      field.outputType.type === 'DateTime'
    )
      options['type'] = field.outputType.type;
    if (field.args.length > 0) {
      field.args.forEach((arg) => {
        if (!options['args']) options['args'] = {};
        options['args'][arg.name] = arg.inputTypes[0].type;
      });
    }
    let toString = JSON.stringify(options);
    if (field.outputType.kind === 'object') {
      toString = toString.slice(0, -1);
      toString += `, resolve(parent${this.isJS ? '' : ': any'}) {
      return parent['${field.name}']
    },
    }`;
    }
    return ', ' + toString;
  }
}
