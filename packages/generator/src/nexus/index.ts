import { DMMF } from '@paljs/types';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { Generators } from '../Generators';
import { getCrud } from './templates';
import { join } from 'path';
import { getInputType } from '@paljs/utils';

export class GenerateNexus extends Generators {
  generatedText: {
    models: Record<
      string,
      { type?: string; queries: Record<string, string>; mutations: Record<string, string>; index?: string }
    >;
    inputs: string;
    index: string;
  } = { models: {}, index: '', inputs: '' };

  private indexPath = this.output(this.withExtension('index'));
  private indexTS = this.readIndex();
  private indexJS: string[] = [];

  async run() {
    await this.createModels();
    await this.createInputs();
    await this.createIndex();
  }

  async createModels() {
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
      const hasList = model.fields.find((f) => f.outputType.isList);
      let fileContent = `${this.getImport(`{ objectType${hasList ? ', list' : ''} }`, 'nexus')}\n\n`;
      fileContent += `${!this.isJS ? 'export ' : ''}const ${model.name} = objectType({
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
          if (this.shouldOmit(fieldDocs)) {
            return;
          }
          if (field.outputType.location === 'scalar' && field.outputType.type !== 'DateTime') {
            fileContent += `t${this.getNullOrList(field)}.${field.outputType.type.toLowerCase()}('${field.name}'${
              fieldDocs ? `, {description: \`${fieldDocs}\`}` : ''
            })\n`;
          } else {
            fileContent += `t${this.getNullOrList(field)}.field('${field.name}'${options})\n`;
          }
        }
      });

      fileContent += `},\n})\n\n${this.isJS ? `module.exports = {${model.name}}` : ''}`;
      const path = this.output(model.name);

      if (this.options.backAsText) {
        this.generatedText.models[model.name] = { type: await this.formation(fileContent), queries: {}, mutations: {} };
      } else {
        this.mkdir(path);
        writeFileSync(join(path, this.withExtension('type')), await this.formation(fileContent));
      }

      await this.createIndex(path, ['type'].concat(await this.createQueriesAndMutations(model.name)));
    }
  }

  async createQueriesAndMutations(name: string) {
    const exclude = this.excludedOperations(name);
    const modelIndex: string[] = [];
    if (!this.disableQueries(name)) {
      const queriesIndex: string[] = [];
      const path = this.output(name, 'queries');
      for (const item of this.queries.filter((item) => !exclude.includes(item))) {
        const itemContent = await getCrud(name, 'query', item, this);
        if (this.options.backAsText) {
          this.generatedText.models[name].queries[item] = await this.formation(itemContent);
        } else {
          this.createFileIfNotfound(path, this.withExtension(item), await this.formation(itemContent));
        }
        queriesIndex.push(item);
      }
      if (queriesIndex) {
        modelIndex.push('queries');
        const indexPath = join(path, this.withExtension('index'));
        const indexContent = await this.formation(this.getIndexContent(queriesIndex, indexPath));
        if (this.options.backAsText) {
          this.generatedText.models[name].queries.index = indexContent;
        } else {
          writeFileSync(indexPath, indexContent);
        }
      }
    }

    if (!this.disableMutations(name)) {
      const mutationsIndex: string[] = [];
      const path = this.output(name, 'mutations');
      for (const item of this.mutations.filter((item) => !exclude.includes(item))) {
        const itemContent = await getCrud(name, 'mutation', item, this);
        if (this.options.backAsText) {
          this.generatedText.models[name].mutations[item] = await this.formation(itemContent);
        } else {
          this.createFileIfNotfound(path, this.withExtension(item), await this.formation(itemContent));
        }
        mutationsIndex.push(item);
      }
      if (mutationsIndex) {
        modelIndex.push('mutations');
        const indexPath = join(path, this.withExtension('index'));
        const indexContent = await this.formation(this.getIndexContent(mutationsIndex, indexPath));
        if (this.options.backAsText) {
          this.generatedText.models[name].mutations.index = indexContent;
        } else {
          writeFileSync(indexPath, indexContent);
        }
      }
    }
    return modelIndex;
  }

  async createInputs() {
    const dmmf = await this.dmmf();
    const data = dmmf.schema;
    if (this.isJS) {
      this.indexJS.push(this.inputName);
    } else {
      const exportString = `export * from './${this.inputName}'`;
      if (!this.indexTS.includes(exportString)) {
        this.indexTS = `export * from './${this.inputName}'\n${this.indexTS}`;
      }
    }
    const text: string[] = [`${this.getImport('{ enumType, inputObjectType, objectType }', 'nexus')}`, ''];
    const exportModels: string[] = [];
    if (data) {
      const enums = [...data.enumTypes.prisma];
      if (data.enumTypes.model) enums.push(...data.enumTypes.model);
      enums.forEach((item) => {
        exportModels.push(item.name);
        text.push(`${!this.isJS ? 'export ' : ''} const ${item.name} = enumType({
              name: "${item.name}",
              members: ${JSON.stringify(item.values)},
            })\n`);
      });
      const inputObjectTypes = [...data.inputObjectTypes.prisma];
      if (data.inputObjectTypes.model) inputObjectTypes.push(...data.inputObjectTypes.model);
      inputObjectTypes.forEach((input) => {
        const inputFields =
          typeof this.options?.filterInputs === 'function' ? this.options.filterInputs(input) : input.fields;
        if (inputFields.length > 0) {
          exportModels.push(input.name);
          text.push(`${!this.isJS ? 'export ' : ''} const ${input.name} = inputObjectType({
            nonNullDefaults: {
              input: false,
            },
            name: "${input.name}",
            definition(t) {`);
          inputFields
            .filter((field) => !this.options.excludeInputFields?.includes(field.name))
            .forEach((field) => {
              const inputType = getInputType(field, this.options);

              const fieldConfig: Record<string, string> = {
                type: inputType.type as any,
              };
              const arg = field.isRequired ? '.nonNull' : inputType.isList ? '.list' : '';
              text.push(`t${arg}.field(${JSON.stringify(field.name)}, ${JSON.stringify(fieldConfig)});`);
            });
          text.push(`},\n});\n`);
        }
      });
      const outputObjectTypes: DMMF.OutputType[] = [...data.outputObjectTypes.prisma, ...data.outputObjectTypes.model];
      outputObjectTypes
        .filter((type) => type.name.includes('Aggregate') || type.name.endsWith('OutputType'))
        .forEach((type) => {
          exportModels.push(type.name);
          text.push(`${!this.isJS ? 'export ' : ''} const ${type.name} = objectType({
            nonNullDefaults: {
              output: true,
            },
            name: "${type.name}",
            definition(t) {`);

          type.fields
            .filter((field) => !this.options.excludeInputFields?.includes(field.name))
            .forEach((field) => {
              const fieldConfig: Record<string, string> = {
                type: field.outputType.type as any,
              };
              const arg = field.isNullable ? '.nullable' : field.outputType.isList ? '.list' : '';
              text.push(`t${arg}.field(${JSON.stringify(field.name)}, ${JSON.stringify(fieldConfig)});`);
            });
          text.push(`},\n});\n`);
        });
      if (this.isJS) {
        text.push(`module.exports = {${exportModels.join(',')}}`);
      }
    }
    if (this.options.backAsText) {
      this.generatedText.inputs = await this.formation(text.join('\n'));
    } else {
      writeFileSync(join(this.output(), this.withExtension(this.inputName)), await this.formation(text.join('\n')));
    }
  }

  async createIndex(path?: string, content?: string[]): Promise<string | void> {
    if (path && content) {
      const indexPath = join(path, this.withExtension('index'));
      const fileContent = await this.formation(this.getIndexContent(content, indexPath));
      if (this.options.backAsText) {
        return fileContent;
      } else {
        writeFileSync(indexPath, fileContent);
      }
    } else {
      const fileContent = await this.formation(this.isJS ? this.getIndexContent(this.indexJS) : this.indexTS);
      if (this.options.backAsText) {
        return fileContent;
      } else {
        writeFileSync(this.output(this.withExtension('index')), fileContent);
      }
    }
  }

  private readIndex() {
    return existsSync(this.indexPath) ? readFileSync(this.indexPath, { encoding: 'utf-8' }) : '';
  }

  private getOptions(field: DMMF.SchemaField, docs?: string) {
    const options: any = docs ? { description: docs } : {};
    if (field.outputType.location !== 'scalar' || field.outputType.type === 'DateTime')
      options['type'] = field.outputType.type;
    let toString = JSON.stringify(options);
    if (field.args.length > 0) {
      toString = toString.slice(0, -1);
      toString += ', ';
      toString += this.getNexusArgs(field.args);
    }
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
    return field.outputType.isList ? '.list' : !field.isNullable ? '' : '.nullable';
  }
}
