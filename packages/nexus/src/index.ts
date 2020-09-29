import { getInputType, hasEmptyTypeFields, PrismaSelect } from '@paljs/plugins';
import {
  enumType,
  inputObjectType,
  objectType,
  plugin,
  scalarType,
} from '@nexus/schema';
import { NexusAcceptedTypeDef } from '@nexus/schema/dist/builder';
import { dmmf } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';
import { adminNexusSchemaSettings } from './admin';
import { Settings } from './settings';

export { Settings };

const data: DMMF.Schema = dmmf.schema;

export const paljs = (settings?: Settings) =>
  plugin({
    name: 'paljs',
    description:
      'paljs plugin to add Prisma select to your resolver and prisma admin queries and mutations and all models input types',
    onInstall() {
      const nexusSchemaInputs: NexusAcceptedTypeDef[] = [
        objectType({
          name: 'BatchPayload',
          definition(t) {
            t.int('count', { nullable: false });
          },
        }),
        scalarType({
          name: 'Json',
          asNexusMethod: 'json',
          description: 'Json custom scalar type',
          serialize(value) {
            return value;
          },
        }),
      ];
      if (!settings?.isNexus) {
        nexusSchemaInputs.push(
          scalarType({
            name: 'DateTime',
            description: 'Date custom scalar type',
            parseValue(value: any) {
              return value ? new Date(value) : null;
            },
            serialize(value: any) {
              return value ? new Date(value) : null;
            },
            parseLiteral(ast: any) {
              return ast.value ? new Date(ast.value) : null;
            },
          }),
        );
      }
      data.enums.forEach((item) => {
        nexusSchemaInputs.push(
          enumType({
            name: item.name,
            members: item.values,
          }),
        );
      });
      data.inputTypes.forEach((input) => {
        if (input.fields.length > 0) {
          nexusSchemaInputs.push(
            inputObjectType({
              name: input.name,
              definition(t) {
                input.fields.forEach((field) => {
                  const inputType = getInputType(field);
                  const hasEmptyType =
                    inputType.kind === 'object' &&
                    hasEmptyTypeFields(inputType.type as string);
                  if (!hasEmptyType) {
                    const fieldConfig: { [key: string]: any; type: string } = {
                      type: inputType.type as string,
                    };
                    if (field.isRequired) fieldConfig['nullable'] = false;
                    if (inputType.isList) fieldConfig['list'] = true;
                    t.field(field.name, fieldConfig);
                  }
                });
              },
            }),
          );
        }
      });

      data.outputTypes
        .filter((type) => type.name.includes('Aggregate'))
        .forEach((type) => {
          nexusSchemaInputs.push(
            objectType({
              name: type.name,
              definition(t) {
                type.fields.forEach((field) => {
                  const fieldConfig: { [key: string]: any; type: string } = {
                    type: field.outputType.type as string,
                  };
                  if (field.isRequired) fieldConfig['nullable'] = false;
                  if (field.outputType.isList) fieldConfig['list'] = true;
                  t.field(field.name, fieldConfig);
                });
              },
            }),
          );
        });

      if (settings?.includeAdmin) {
        nexusSchemaInputs.push(
          ...adminNexusSchemaSettings(settings?.adminSchemaPath),
        );
      }
      return { types: nexusSchemaInputs };
    },
    onCreateFieldResolver() {
      return async (root, args, ctx, info: any, next) => {
        ctx.select = new PrismaSelect(
          info,
          settings?.prismaSelectDefaultFields,
        ).value;
        return await next(root, args, ctx, info);
      };
    },
  });
