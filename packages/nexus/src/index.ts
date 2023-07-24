import { PrismaSelect } from '@paljs/plugins';
import type { DMMF } from '@paljs/types';
import { objectType, plugin } from 'nexus';
import { NexusAcceptedTypeDef } from 'nexus/dist/builder';
import { adminNexusSchemaSettings } from './admin';
import type { Settings } from './settings';
import { getScalars } from './defaultScalar';
import { AllNexusOutputTypeDefs } from 'nexus/dist/definitions/wrapping';

export { Settings };

export const paljs = (settings?: Settings) =>
  plugin({
    name: 'paljs',
    description:
      'paljs plugin to add Prisma select to your resolver and prisma admin queries and mutations and all models input types',
    onInstall(builder) {
      const nexusSchemaInputs: (NexusAcceptedTypeDef | AllNexusOutputTypeDefs)[] = [
        objectType({
          name: 'BatchPayload',
          definition(t) {
            t.nonNull.int('count');
          },
        }),
        ...getScalars(settings?.excludeScalar),
      ];

      if (settings?.includeAdmin) {
        nexusSchemaInputs.push(...adminNexusSchemaSettings(settings?.adminSchemaPath));
      }
      for (const type of nexusSchemaInputs) {
        builder.addType(type);
      }
    },
    onCreateFieldResolver() {
      return async (root, args, ctx, info: any, next) => {
        ctx.select = new PrismaSelect(info, {
          ...settings?.prismaSelectOptions,
          dmmf: settings?.prismaSelectOptions?.dmmf as Omit<DMMF.Document, 'schema'>[],
        });
        return await next(root, args, ctx, info);
      };
    },
  });
