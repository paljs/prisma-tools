import { getDMMF, getSchemaWithPath } from '@prisma/internals';
import { readFileSync } from 'fs';
import { relative } from 'path';
import { chalk, log } from '@paljs/display';
import { DMMF } from '@paljs/types';

export const getSchemaPath = async (path?: string): Promise<string> => {
  const schema = await getSchemaWithPath(path);
  if (!schema) {
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

  log.d(chalk.dim(`Prisma Schema loaded from ${relative(process.cwd(), schema?.schemaPath)}`));
  return schema?.schemaPath;
};

export const getDMMFBySchemaPath = async (schemaPath?: string): Promise<DMMF.Document> => {
  const schemaPathFromPrisma = await getSchemaPath(schemaPath);
  const schemaString = readFileSync(schemaPathFromPrisma, 'utf-8');
  return await getDMMF({ datamodel: schemaString });
};
