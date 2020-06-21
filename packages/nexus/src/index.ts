import { PrismaSelect } from '@paljs/plugins';
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
      ];
      data.enums.forEach((item) => {
        nexusSchemaInputs.push(
          enumType({
            name: item.name,
            members: item.values,
          }),
        );
      });
      data.inputTypes.forEach((input) => {
        nexusSchemaInputs.push(
          inputObjectType({
            name: input.name,
            definition(t) {
              input.fields.forEach((field) => {
                let inputType: DMMF.SchemaArgInputType;
                if (
                  field.inputType.length > 1 &&
                  field.inputType[1].type !== 'null' &&
                  field.name !== 'not'
                ) {
                  inputType = field.inputType[1];
                } else {
                  inputType = field.inputType[0];
                }
                const fieldConfig: { [key: string]: any; type: string } = {
                  type: inputType.type as string,
                };
                if (inputType.isRequired) fieldConfig['nullable'] = false;
                if (inputType.isList) fieldConfig['list'] = true;
                t.field(field.name, fieldConfig);
              });
            },
          }),
        );
      });

      if (!settings?.excludeAdmin) {
        nexusSchemaInputs.push(
          ...adminNexusSchemaSettings(settings?.adminSchemaPath),
        );
      }
      return { types: nexusSchemaInputs };
    },
    onCreateFieldResolver() {
      return async (root, args, ctx, info: any, next) => {
        ctx.select = new PrismaSelect(info).value;
        return await next(root, args, ctx, info);
      };
    },
  });
