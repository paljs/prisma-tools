import { join } from 'path';
import { log } from '@paljs/display';
import chalk from 'chalk';
import pkgDir from 'pkg-dir';
const projectRoot = pkgDir.packageDirectorySync() || process.cwd();

export const getConfig = async (
  flags: {
    help: void;
    config: string;
    schema: string | undefined;
    multi: boolean;
  },
  isRequire = true,
) => {
  try {
    const userConfig = await import(join(projectRoot, flags.config));
    return userConfig?.default ?? userConfig;
  } catch (error: any) {
    if (isRequire) {
      log.error(`Error: ${chalk.blue('pal')} config file is not found`);
      process.exit();
    }
  }
};
