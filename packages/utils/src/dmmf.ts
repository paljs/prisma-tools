import { getDMMF, getSchemaPath as getSchemaPath0 } from '@prisma/internals';
import { readFileSync } from 'fs';
import { relative } from 'path';
import { chalk, log } from '@paljs/display';
import { DMMF } from '@paljs/types';

export const getSchemaPath = async (path?: string): Promise<string> => {
  const schemaPath = await getSchemaPath0(path);
  if (!schemaPath) {
    log.throwError(
      `Could not find a ${chalk.bold(
        'schema.prisma',
      )} file that is required for this command.\nYou can either provide it with ${chalk.greenBright(
        '--schema',
      )}, set it as \`prisma.schema\` in your package.json or put it into the default location ${chalk.greenBright(
        './prisma/schema.prisma',
      )} https://pris.ly/d/prisma-schema-location`,
    );
  }

  log.d(chalk.dim(`Prisma Schema loaded from ${relative(process.cwd(), schemaPath)}`));
  return schemaPath;
};

export const getDMMFBySchemaPath = async (schemaPath?: string): Promise<DMMF.Document> => {
  const schemaPathFromPrisma = await getSchemaPath(schemaPath);
  const schemaString = readFileSync(schemaPathFromPrisma, 'utf-8');
  const dmmf: DMMF.Document = await getDMMF({ datamodel: schemaString });
  return dmmf;
};
