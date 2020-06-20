import { Command, flags } from '@oclif/command';
import { join } from 'path';
import { Config, ConfigGraphql, GeneratePagesOptions } from '@paljs/types';
import {
  buildSettingsSchema,
  createModules,
  createSchema,
  createSdl,
  generateGraphql,
  generatePages,
} from '@paljs/generator';
import { dmmf } from '@prisma/clinet';

export default class Generate extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [];
  static aliases = ['g'];

  async run() {
    if (!dmmf?.schema) {
      console.log('here');
      return;
    }
    const userConfig = await import(join(this.config.root, 'pal'));
    //const userConfig = await import(join(this.config.root, 'package'));
    const config: Config = userConfig.default ?? userConfig;
    if (config.backend?.generator) {
      switch (config.backend.generator) {
        case 'nexus':
          createSchema(config.backend);
          break;
        case 'nexus-schema':
          createSchema({ nexusSchema: true, ...config.backend });
          break;
        case 'graphql-modules':
          createModules(config.backend);
          break;
        case 'sdl':
          createSdl(config.backend);
      }
    }

    if (config.frontEnd) {
      const schema = buildSettingsSchema(config.schemaFolder || './prisma/');
      if (config.frontEnd.pages) {
        const options: GeneratePagesOptions = {
          schema,
          ...(typeof config.frontEnd.pages !== 'boolean'
            ? config.frontEnd.pages
            : {}),
        };
        generatePages(options);
      }
      if (config.frontEnd.graphql) {
        const options: ConfigGraphql = {
          schema,
          ...(typeof config.frontEnd.graphql !== 'boolean'
            ? config.frontEnd.graphql
            : {}),
        };
        generateGraphql(options);
      }
    }
  }
}
