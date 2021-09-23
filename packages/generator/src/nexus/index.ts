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
    const dataModels = await this.datamodel();
    for (const model of models) {
      if (this.isJS) {
        this.indexJS.push(model.name);
      } else {
        const exportString = `export * from './${model.name}'`;
        if (!this.indexTS.includes(exportString)) {
          this.indexTS = `export * from './${model.name}'\n${this.indexTS}`;
        }
      }
      const dataModel = this.dataModel(dataModels.models, model.name);
      const modelDocs = this.filterDocs(dataModel?.documentation);
      let fileContent = `${this.getImport('{ objectType }', 'nexus')}\n\n`;
      fileContent += `${!this.isJS ? 'export ' : ''}const ${
        model.name
      } = objectType({
        nonNullDefaults: {
          output: true,
          input: false,
        },
  name: '${model.name}',${modelDocs ? `\ndescription: \`${modelDocs}\`,` : ''}
  definition(t) {
    `;
      model.fields.forEach((field) => {
        if (!this.excludeFields(model.name).includes(field.name)) {
          const dataField = this.dataField(field.name, dataModel);
          const fieldDocs = this.filterDocs(dataField?.documentation);
          const options = this.getOptions(field, fieldDocs);
          if (this.shouldOmit(fieldDocs, 'output')) {
            return;
          }
          if (
            field.outputType.location === 'scalar' &&
            field.outputType.type !== 'DateTime'
          ) {
            fileContent += `t${this.getNullOrList(field)}.${(
              field.outputType.type as String
            ).toLowerCase()}('${field.name}'${
              fieldDocs ? `, {description: \`${fieldDocs}\`}` : ''
            })\n`;
          } else {
            fileContent += `t${this.getNullOrList(field)}.field('${
              field.name
            }'${options})\n`;
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
        ['type'].concat(await this.createQueriesAndMutations(model.name)),
      );
    }
  }

  private async createQueriesAndMutations(name: string) {
    const exclude = this.excludedOperations(name);
    let modelIndex: string[] = [];
    if (!this.disableQueries(name)) {
      const queriesIndex: string[] = [];
      const path = this.output(name, 'queries');
      for (const item of this.queries.filter(
        (item) => !exclude.includes(item),
      )) {
        const itemContent = await getCrud(name, 'query', item, this);
        this.createFileIfNotfound(
          path,
          this.withExtension(item),
          this.formation(itemContent),
        );
        queriesIndex.push(item);
      }
      if (queriesIndex) {
        modelIndex.push('queries');
        const indexPath = join(path, this.withExtension('index'));
        writeFileSync(
          indexPath,
          this.formation(this.getIndexContent(queriesIndex, indexPath)),
        );
      }
    }

    if (!this.disableMutations(name)) {
      const mutationsIndex: string[] = [];
      const path = this.output(name, 'mutations');
      for (const item of this.mutations.filter(
        (item) => !exclude.includes(item),
      )) {
        const itemContent = await getCrud(name, 'mutation', item, this);
        this.createFileIfNotfound(
          path,
          this.withExtension(item),
          this.formation(itemContent),
        );
        mutationsIndex.push(item);
      }
      if (mutationsIndex) {
        modelIndex.push('mutations');
        const indexPath = join(path, this.withExtension('index'));
        writeFileSync(
          indexPath,
          this.formation(this.getIndexContent(mutationsIndex, indexPath)),
        );
      }
    }
    return modelIndex;
  }

  private createIndex(path?: string, content?: string[]) {
    if (path && content) {
      const indexPath = join(path, this.withExtension('index'));
      writeFileSync(
        indexPath,
        this.formation(this.getIndexContent(content, indexPath)),
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

  private getOptions(field: DMMF.SchemaField, docs?: string) {
    const options: any = docs ? { description: docs } : {};
    if (
      field.outputType.location !== 'scalar' ||
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
    if (field.outputType.location === 'outputObjectTypes') {
      toString = toString.slice(0, -1);
      toString += `, resolve(root${this.isJS ? '' : ': any'}) {
      return root.${field.name}
    },
    }`;
    }
    return ', ' + toString;
  }

  private getNullOrList(field: DMMF.SchemaField) {
    return field.outputType.isList
      ? '.list'
      : !field.isNullable
      ? ''
      : '.nullable';
  }
}
