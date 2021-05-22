import { Options } from '@paljs/types';
import { DMMF } from '../schema';

export class GenerateTypes {
  code: string[] = [
    `import * as Client from '@prisma/client'`,
    `import { Context } from './context'`,
    `import { GraphQLResolveInfo } from 'graphql';`,
    `type Resolver<T extends {}, A extends {}, R extends any> = (parent: T,args: A, context: Context, info: GraphQLResolveInfo) => Promise<R>;`,
  ];
  scalar: { [key: string]: any } = {
    Int: 'number',
    Float: 'number',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'any',
  };

  testedTypes: string[] = [];

  constructor(private dmmf: DMMF.Document, private options: Partial<Options>) {}

  get schema() {
    return this.dmmf.schema;
  }

  isModel(modelName: string) {
    return !!this.dmmf.datamodel.models.find(
      (model) => model.name === modelName,
    );
  }

  capital(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getOutputType(
    options: DMMF.SchemaField['outputType'] | DMMF.SchemaArgInputType,
    input = false,
  ) {
    switch (options.location) {
      case 'scalar':
        return `${this.scalar[options.type as string]}${
          options.isList ? '[]' : ''
        }`;
      default:
        const type = options.type.toString().startsWith('Aggregate')
          ? `Prisma.Get${options.type
              .toString()
              .replace('Aggregate', '')}AggregateType<${options.type}Args>`
          : options.type.toString() === 'AffectedRowsOutput'
          ? 'Prisma.BatchPayload'
          : !this.isModel(options.type.toString()) && !input
          ? `Prisma.${options.type}`
          : options.type;
        return `${!input ? 'Client.' : ''}${type}${options.isList ? '[]' : ''}`;
    }
  }

  hasEmptyTypeFields(type: string) {
    this.testedTypes.push(type);
    const inputType = this.schema.inputObjectTypes.prisma.find(
      (item) => item.name === type,
    );
    if (inputType) {
      if (inputType.fields.length === 0) return true;
      for (const field of inputType.fields) {
        const fieldType = this.getInputType(field);
        if (
          fieldType.type !== type &&
          fieldType.location === 'inputObjectTypes' &&
          !this.testedTypes.includes(fieldType.type as string)
        ) {
          const state = this.hasEmptyTypeFields(fieldType.type as string);
          if (state) return true;
        }
      }
    }
    return false;
  }

  getInputType(field: DMMF.SchemaArg) {
    let index = 0;
    if (
      this.options.doNotUseFieldUpdateOperationsInput &&
      field.inputTypes.length > 1 &&
      (field.inputTypes[1].type as string).endsWith(
        'FieldUpdateOperationsInput',
      )
    ) {
      return field.inputTypes[index];
    }
    if (
      field.inputTypes.length > 1 &&
      field.inputTypes[1].location === 'inputObjectTypes'
    ) {
      index = 1;
    }
    return field.inputTypes[index];
  }

  getOutput(typeName: string) {
    return this.dmmf.schema.outputObjectTypes.prisma.find(
      (type) => type.name === typeName,
    );
  }

  run() {
    const outputTypes: string[] = [
      `export interface Resolvers {`,
      `[key: string]: {[key: string]: Resolver<any, any, any>}`,
    ];
    const argsTypes: string[] = [];
    const resolversTypes: string[] = [];
    // generate Output types
    [
      ...this.schema.outputObjectTypes.model,
      ...this.schema.outputObjectTypes.prisma,
    ].forEach((type) => {
      outputTypes.push(`${type.name}?: ${type.name};`);
      const fields: string[] = [
        `export interface ${type.name} {`,
        `[key: string]: Resolver<any, any, any>`,
      ];

      // generate fields
      type.fields.forEach((field) => {
        const parentType = ['Query', 'Mutation'].includes(type.name)
          ? '{}'
          : `Client.${
              type.name === 'AffectedRowsOutput'
                ? 'Prisma.BatchPayload'
                : !this.isModel(type.name)
                ? 'Prisma.' + type.name
                : type.name
            }`;
        const argsType =
          field.args.length > 0 ? `${this.capital(field.name)}Args` : '{}';
        fields.push(
          `${
            field.name
          }?: Resolver<${parentType}, ${argsType}, ${this.getOutputType(
            field.outputType,
          )}${field.isNullable ? ' | null' : ''}>`,
        );

        // add findManyCount
        if (field.name.startsWith('findMany')) {
          fields.push(
            `${field.name}Count?: Resolver<${parentType}, ${argsType}, number>`,
          );
        }

        // generate args
        if (argsType !== '{}') {
          const args: string[] = [`export interface ${argsType} {`];
          field.args.forEach((arg) => {
            args.push(
              `${arg.name}${arg.isRequired ? '' : '?'}: ${this.getOutputType(
                arg.inputTypes[0],
                true,
              )}${field.isNullable ? ' | null' : ''}`,
            );
          });
          if (argsType.startsWith('Aggregate')) {
            const modelName = field.outputType.type
              .toString()
              .replace('Aggregate', '');
            const output = this.getOutput(field.outputType.type.toString());
            output?.fields.forEach((field) => {
              const name = this.capital(field.name.replace('_', ''));
              args.push(
                `${field.name}?: Client.Prisma.${modelName}${name}AggregateInputType`,
              );
            });
          }
          args.push('}');
          argsTypes.push(args.join('\n'));
        }
      });
      fields.push('}');
      resolversTypes.push(fields.join('\n'));
    });
    outputTypes.push('}');
    this.code.push(
      outputTypes.join('\n'),
      resolversTypes.join('\n\n'),
      argsTypes.join('\n\n'),
    );

    // generate input types
    const inputTypes: string[] = [];
    const inputModel = this.schema.inputObjectTypes.model || [];
    [...this.schema.inputObjectTypes.prisma, ...inputModel].forEach((input) => {
      if (input.fields.length > 0) {
        const fields: string[] = [`export interface ${input.name} {`];
        input.fields.forEach((field) => {
          const inputType = this.getInputType(field);
          const hasEmptyType =
            inputType.location === 'inputObjectTypes' &&
            this.hasEmptyTypeFields(inputType.type as string);
          if (!hasEmptyType) {
            fields.push(
              `${field.name}${
                field.isRequired ? '' : '?'
              }: ${this.getOutputType(inputType, true)}${
                field.isNullable ? ' | null' : ''
              }`,
            );
          }
        });
        fields.push('}');
        inputTypes.push(fields.join('\n'));
      }
    });
    this.code.push(inputTypes.join('\n\n'));

    // generate enums
    const enumsTypes: string[] = [];
    const enumModel = this.schema.enumTypes.model || [];
    [...this.schema.enumTypes.prisma, ...enumModel].forEach((item) => {
      const values: string[] = [`export enum ${item.name} {`];
      item.values.forEach((item2) => {
        values.push(`${item2} = "${item2}",`);
      });
      values.push('}');
      enumsTypes.push(values.join('\n'));
    });
    this.code.push(enumsTypes.join('\n'));

    return this.code.join('\n\n');
  }
}
