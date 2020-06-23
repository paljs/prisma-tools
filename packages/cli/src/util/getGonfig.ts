import { join } from 'path';
import { log } from '@paljs/display';
import chalk from 'chalk';
import { Config } from '@paljs/types';

export const getConfig = async (flags: any, isRequire: boolean = true) => {
  try {
    const userConfig = await import(join(process.cwd(), flags.config));
    const config: Config = userConfig?.default ?? userConfig;
    return config;
  } catch (e) {
    if (isRequire) {
      log.error(`Error: ${chalk.blue('pal')} config file is not found`);
      process.exit();
    }
  }
};
