/* eslint-disable unicorn/filename-case */
import { join } from 'path';
import { log } from '@paljs/display';
import chalk from 'chalk';
import { Config } from '@paljs/types';
import pkgDir from 'pkg-dir';
const projectRoot = pkgDir.sync() || process.cwd();

export const getConfig = async (flags: any, isRequire = true) => {
  try {
    const userConfig = await import(join(projectRoot, flags.config));
    const config: Config = userConfig?.default ?? userConfig;
    return config;
  } catch (error) {
    if (isRequire) {
      log.error(`Error: ${chalk.blue('pal')} config file is not found`);
      process.exit();
    }
  }
};
