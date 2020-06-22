import pkgDir from 'pkg-dir';
import { join } from 'path';
import { log } from '@paljs/display';
import chalk from 'chalk';
const projectRoot = pkgDir.sync() || process.cwd();

export const ifPrismaExitAndGenerated = async () => {
  try {
    const { dmmf } = await import(
      join(projectRoot, 'node_modules', '@prisma/client')
    );
    if (!dmmf?.schema) {
      log.error(
        `${chalk.red('Error:')} please run ${chalk.blue(
          'prisma generate',
        )} before ${chalk.blue('pal generate')}`,
      );
      process.exit();
    }
  } catch (e) {
    log.error(
      `${chalk.red('Error:')} ${chalk.blue('@prisma/client')} is not found`,
    );
    process.exit(e.code);
  }
};
