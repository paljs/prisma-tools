import { Options } from '@paljs/types';
import { writeFileSync } from 'fs';
import { Generators } from './Generators';
import pluralize from 'pluralize';

export class GenerateNexusPrismaPlugin extends Generators {
  constructor(schemaPath: string, customOptions?: Partial<Options>) {
    super(schemaPath, customOptions);
  }

  async run() {
    this.mkdir(this.options.output);
    await this.createModels();
    await this.createIndex();
  }

  private async createModels() {
    const models = await this.models();
    models.forEach((model) => {
      const fileContent: string[] = [
        this.getImport(
          `{ objectType, arg${
            !(
              this.disableQueries(model.name) &&
              this.disableMutations(model.name)
            )
              ? ', extendType'
              : ''
          }}`,
          '@nexus/schema',
        ),
        '\n',
      ];

      fileContent.push(
        `${this.isJS ? '' : 'export '}const ${model.name} = objectType({`,
        `name: '${model.name}',`,
        `definition(t) {`,
        ``,
      );

      model.fields.forEach((field) => {
        fileContent.push(`t.model.${field.name}()`);
      });
      fileContent.push('},', '})', '\n');

      const modelName = {
        plural: pluralize(this.smallModel(model.name)),
        singular: this.smallModel(model.name),
      };
      const exclude = this.excludedOperations(model.name);
      if (!this.disableQueries(model.name)) {
        fileContent.push(
          `${this.isJS ? '' : 'export '}const ${
            modelName.singular
          }Query = extendType({`,
          `type: 'Query',`,
          `definition(t) {`,
        );
        this.queries
          .filter((item) => !exclude.includes(item))
          .forEach((item) => {
            switch (item) {
              case 'findOne':
                fileContent.push(`t.crud.${modelName.singular}()`);
                break;
              case 'findMany':
                fileContent.push(
                  `t.crud.${modelName.plural}({ filtering: true, ordering: true })`,
                );
                break;
              case 'findCount':
                fileContent.push(`t.field('${modelName.plural}Count', {
                  type: 'Int',
                  args: {
                    where: '${model.name}WhereInput',
                  },
                  async resolve(_root, args, ctx) {
                    return ctx.prisma.${modelName.singular}.count(args)
                  },
                })`);
                break;
              case 'findFirst':
                fileContent.push(`t.field('findFirst${model.name}', {
                    type: '${model.name}',
                    args: {
                      where: '${model.name}WhereInput',
                      orderBy: arg({ type: '${model.name}OrderByInput', list: true }),
                      cursor: '${model.name}WhereUniqueInput',
                      skip: 'Int',
                      take: 'Int',
                    },
                    async resolve(_root, args, ctx) {
                      return ctx.prisma.${modelName.singular}.findFirst(args)
                    },
                  })`);
                break;
              default:
                break;
            }
          });
        fileContent.push('},', '})', '\n');
      }
      if (!this.disableMutations(model.name)) {
        fileContent.push(
          `${this.isJS ? '' : 'export '}const ${
            modelName.singular
          }Mutation = extendType({`,
          `type: 'Mutation',`,
          `definition(t) {`,
        );
        this.mutations
          .filter((item) => !exclude.includes(item))
          .forEach((item) => {
            fileContent.push(`t.crud.${item}${model.name}()`);
          });
        fileContent.push('},', '})', '\n');
      }

      if (this.isJS) {
        fileContent.push(`module.exports = {`, `${model.name},`);
        if (!this.disableQueries(model.name)) {
          fileContent.push(`${modelName.singular}Query,`);
        }
        if (!this.disableMutations(model.name)) {
          fileContent.push(`${modelName.singular}Mutation,`);
        }
        fileContent.push('}\n');
      }

      writeFileSync(
        this.output(this.withExtension(model.name)),
        this.formation(fileContent.join('\n')),
      );
    });
  }

  private async createIndex() {
    const models = await this.models();
    writeFileSync(
      this.output(this.withExtension('index')),
      this.formation(this.getIndexContent(models.map((item) => item.name))),
    );
  }
}
