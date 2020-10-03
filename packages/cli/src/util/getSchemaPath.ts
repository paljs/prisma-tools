import chalk from 'chalk';
import { relative } from 'path';
import { getSchemaPath as getSchemaPath0 } from '@prisma/sdk';

export const getSchemaPath = async (path?: string) => {
  const schemaPath = await getSchemaPath0(path);
  if (!schemaPath) {
    throw new Error(
      `Could not find a ${chalk.bold(
        'schema.prisma',
      )} file that is required for this command.\nYou can either provide it with ${chalk.greenBright(
        '--schema',
      )}, set it as \`prisma.schema\` in your package.json or put it into the default location ${chalk.greenBright(
        './prisma/schema.prisma',
      )} https://pris.ly/d/prisma-schema-location`,
    );
  }

  console.log(
    chalk.dim(
      `Prisma Schema loaded from ${relative(process.cwd(), schemaPath)}`,
    ),
  );
  return schemaPath;
};
