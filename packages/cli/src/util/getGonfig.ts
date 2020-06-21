import { join } from 'path';
import * as colors from 'colors';
import { Config } from '@paljs/types';
import pkgDir from 'pkg-dir';
const projectRoot = pkgDir.sync() || process.cwd();

export const getConfig = async (flags: any, require: boolean = true) => {
  try {
    const userConfig = await import(join(projectRoot, flags.config));
    const config: Config = userConfig?.default ?? userConfig;
    return config;
  } catch (e) {
    if (require) {
      console.error(
        `${colors.red('Error:')} ${colors.blue(
          'pal',
        )} config file is not found`,
      );
      process.exit();
    }
  }
};
