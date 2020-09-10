import { Mutation, Options, Query } from '@paljs/types';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { format, Options as PrettierOptions } from 'prettier';
import pkgDir from 'pkg-dir';
import { join } from 'path';
import { DMMF } from '@prisma/client/runtime';
const projectRoot = pkgDir.sync() || process.cwd();

export class Generators {
  protected options: Options = {
    output: join(projectRoot, 'src/graphql'),
    excludeFields: [],
    excludeModels: [],
    excludeFieldsByModel: {},
    excludeQueriesAndMutations: [],
    excludeQueriesAndMutationsByModel: {},
  };

  protected isJS = false;

  protected queries: Query[] = [
    'findOne',
    'findMany',
    'findCount',
    'aggregate',
  ];
  protected mutations: Mutation[] = [
    'createOne',
    'updateOne',
    'upsertOne',
    'deleteOne',
    'updateMany',
    'deleteMany',
  ];

  constructor(customOptions?: Partial<Options>) {
    this.options = { ...this.options, ...customOptions };
    this.isJS = this.options.javaScript;
  }

  protected async dmmf() {
    const { dmmf } = await import(
      this.options.prismaClientPath ??
        join(projectRoot, 'node_modules', '@prisma/client')
    );
    return dmmf;
  }

  protected async datamodel() {
    const { datamodel }: { datamodel: DMMF.Datamodel } = await this.dmmf();
    return datamodel;
  }

  protected async models() {
    const { schema }: { schema: DMMF.Schema } = await this.dmmf();
    return schema.outputTypes.filter(
      (model) =>
        !['Query', 'Mutation'].includes(model.name) &&
        !model.name.includes('Aggregate') &&
        model.name !== 'BatchPayload' &&
        (!this.options.models || this.options.models.includes(model.name)),
    );
  }

  protected withExtension(filename: string) {
    return filename + (this.isJS ? '.js' : '.ts');
  }

  protected excludeFields(model: string) {
    return this.options.excludeFields.concat(
      this.options.excludeFieldsByModel[model],
    );
  }

  protected disableQueries(model: string) {
    return (
      !this.options.disableQueries &&
      !this.options.excludeModels.find(
        (item) => item.name === model && item.queries,
      )
    );
  }

  protected disableMutations(model: string) {
    return (
      !this.options.disableMutations &&
      !this.options.excludeModels.find(
        (item) => item.name === model && item.mutations,
      )
    );
  }

  protected smallModel(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  protected excludedOperations(model: string) {
    return this.options.excludeQueriesAndMutations.concat(
      this.options.excludeQueriesAndMutationsByModel[model] ?? [],
    );
  }

  protected mkdir(path: string) {
    !existsSync(path) && mkdirSync(path, { recursive: true });
  }

  protected output(...paths: string[]): string {
    return join(this.options.output, ...paths);
  }

  protected getIndexContent(files: string[]) {
    const lines: string[] = [];
    if (this.isJS) lines.push('module.exports = {');
    files.forEach((file) => {
      if (this.isJS) {
        files.push(`  ...require('./${file}'),`);
      } else {
        files.push(`export * from './${file}'`);
      }
    });
    if (this.isJS) lines.push('}');

    return lines.join('\n');
  }

  protected getImport(content: string, path: string) {
    return this.isJS
      ? `const ${content} = require('${path}')`
      : `import ${content} from '${path}'`;
  }

  protected createFileIfNotfound(
    path: string,
    fileName: string,
    content: string,
  ) {
    !existsSync(path) && this.mkdir(path);
    !existsSync(join(path, fileName)) &&
      writeFileSync(join(path, fileName), content);
  }

  protected get parser() {
    return this.isJS ? 'babel' : 'babel-ts';
  }

  protected formation(
    text: string,
    parser: PrettierOptions['parser'] = this.parser,
  ) {
    return format(text, {
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser,
    });
  }
}
