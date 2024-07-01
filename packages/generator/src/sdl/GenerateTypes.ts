import { GeneratorOptions, DMMF } from '@paljs/types';
import { format } from 'prettier';
import { getInputType } from '@paljs/utils';

export class GenerateTypes {
  code: string[] = [
    `import * as Client from '@prisma/client'`,
    `import { Context } from './context'`,
    `import { GraphQLResolveInfo } from 'graphql';`,
    `import { GetAggregateResult } from '@prisma/client/runtime/library';`,
    `type Resolver<T extends {}, A extends {}, R extends any> = (parent: T,args: A, context: Context, info: GraphQLResolveInfo) => Promise<R>;`,
    `type NoExpand<T> = T extends unknown ? T : never;`,
    `type AtLeast<O extends object, K extends string> = NoExpand<
      O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
      : never>;`,
  ];
  scalar: Record<string, any> = {
    Int: 'number',
    Float: 'number',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'any',
  };

  testedTypes: string[] = [];

  constructor(
    private dmmf: DMMF.Document,
    private options: Partial<GeneratorOptions>,
  ) {}

  get schema() {
    return this.dmmf.schema;
  }

  isModel(modelName: string) {
    return (
      !!this.dmmf.datamodel.models.find((model) => model.name === modelName) ||
      !!this.dmmf.schema.enumTypes.model?.find((model) => model.name === modelName)
    );
  }

  getParentType(name: string) {
    if (['Query', 'Mutation'].includes(name)) {
      return '{}';
    }
    if (name === 'AffectedRowsOutput') {
      return 'Client.Prisma.BatchPayload';
    }
    if (this.isModel(name)) {
      return `Client.${name}`;
    }
    if (name.startsWith('CreateMany') && name.endsWith('AndReturnOutputType')) {
      const innerType = name.replace(/^CreateMany|AndReturnOutputType$/g, '');
      return `ReturnType<Client.Prisma.${innerType}Delegate["createManyAndReturn"]>`;
    }
    return `Client.Prisma.${name}`;
  }

  capital(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getOutputType(options: DMMF.SchemaField['outputType'] | DMMF.InputTypeRef, input = false) {
    switch (options.location) {
      case 'scalar':
        return `${this.scalar[options.type as string]}${options.isList ? '[]' : ''}`;
      default: {
        if (options.type.toString().startsWith('Aggregate')) {
          return `GetAggregateResult<Client.Prisma.$${options.type.toString().replace('Aggregate', '')}Payload, ${
            options.type
          }Args>`;
        }
        if (options.type.startsWith('CreateMany') && options.type.endsWith('AndReturnOutputType')) {
          const innerType = options.type.replace(/^CreateMany|AndReturnOutputType$/g, '');
          return `ReturnType<Client.Prisma.${innerType}Delegate["createManyAndReturn"]>`;
        }
        const type =
          options.type.toString() === 'AffectedRowsOutput'
            ? 'Prisma.BatchPayload'
            : !this.isModel(options.type.toString()) && !input
              ? `Prisma.${options.type}`
              : options.type;
        return `${!input ? 'Client.' : ''}${type}${options.isList ? '[]' : ''}`;
      }
    }
  }

  hasEmptyTypeFields(type: string) {
    this.testedTypes.push(type);
    const inputType = this.schema.inputObjectTypes.prisma.find((item) => item.name === type);
    if (inputType) {
      if (inputType.fields.length === 0) return true;
      for (const field of inputType.fields) {
        const fieldType = getInputType(field, this.options);
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

  getOutput(typeName: string) {
    return this.dmmf.schema.outputObjectTypes.prisma.find((type) => type.name === typeName);
  }

  run() {
    const outputTypes: string[] = [
      `export type Resolvers = { [key: string]: {[key: string]: Resolver<any, any, any>} } & {`,
    ];
    const argsTypes: string[] = [];
    const resolversTypes: string[] = [];
    // generate Output types
    [...this.schema.outputObjectTypes.model, ...this.schema.outputObjectTypes.prisma].forEach((type) => {
      outputTypes.push(`${type.name}?: ${type.name};`);
      const fields: string[] = [`export type ${type.name} = { [key: string]: Resolver<any, any, any> } & {`];

      // generate fields
      type.fields.forEach((field) => {
        const parentType = this.getParentType(type.name);
        const argsType =
          field.args.length > 0
            ? `${['Query', 'Mutation'].includes(type.name) ? '' : type.name}${this.capital(field.name)}Args`
            : '{}';
        fields.push(
          `${field.name}?: Resolver<${parentType}, ${argsType}, ${this.getOutputType(field.outputType)}${
            field.isNullable ? ' | null' : ''
          }>`,
        );

        // add findManyCount
        if (field.name.startsWith('findMany')) {
          fields.push(`${field.name}Count?: Resolver<${parentType}, ${argsType}, number>`);
        }

        // generate args
        if (argsType !== '{}') {
          const args: string[] = [`export type ${argsType} = {`];
          field.args.forEach((arg) => {
            const inputType = getInputType(arg, this.options);
            args.push(
              `${arg.name}${arg.isRequired ? '' : '?'}: ${this.getOutputType(inputType, true)}${
                arg.isNullable ? ' | null' : ''
              }`,
            );
          });
          if (argsType.startsWith('Aggregate')) {
            const modelName = field.outputType.type.toString().replace('Aggregate', '');
            const output = this.getOutput(field.outputType.type.toString());
            output?.fields.forEach((field) => {
              const name = this.capital(field.name.replace('_', ''));
              args.push(`${field.name}?: Client.Prisma.${modelName}${name}AggregateInputType`);
            });
          }
          args.push('};');
          argsTypes.push(args.join('\n'));
        }
      });
      fields.push('}');
      resolversTypes.push(fields.join('\n'));
    });
    outputTypes.push('}');
    this.code.push(outputTypes.join('\n'), resolversTypes.join('\n\n'), argsTypes.join('\n\n'));

    // generate input types
    const inputTypes: string[] = [];
    const inputModel = this.schema.inputObjectTypes.model || [];
    [...this.schema.inputObjectTypes.prisma, ...inputModel].forEach((input) => {
      if (input.fields.length > 0) {
        const atLeastFields =
          input.constraints?.fields && input.constraints.fields.length > 0
            ? input.constraints.fields.map((f) => `"${f}"`).join(' | ')
            : null;
        const fields: string[] = [`export type ${input.name} = ${atLeastFields ? 'AtLeast<' : ''}{`];
        input.fields.forEach((field) => {
          const inputType = getInputType(field, this.options);
          const hasEmptyType =
            inputType.location === 'inputObjectTypes' && this.hasEmptyTypeFields(inputType.type as string);
          if (!hasEmptyType) {
            fields.push(
              `${field.name}${field.isRequired ? '' : '?'}: ${this.getOutputType(inputType, true)}${
                field.isNullable ? ' | null' : ''
              }`,
            );
          }
        });
        fields.push(`}${atLeastFields ? `, ${atLeastFields}>` : ''}`);
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

    return format(this.code.join('\n\n'), {
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser: 'babel-ts',
    });
  }
}
