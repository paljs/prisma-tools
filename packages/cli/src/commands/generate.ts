import { Command, flags } from '@oclif/command';
import { PartialOptions, AdminPagesOptions } from '@paljs/types';
import { Generator, UIGenerator } from '@paljs/generator';
import chalk from 'chalk';
import { getConfig } from '../util/getConfig';
import { log } from '@paljs/display';
import { getSchemaPath } from '../util/getSchemaPath';
import { Config } from '@paljs/types';
import createPlugin from '../util/zshPlugin';

const commandStyle = (text: string) => `${chalk.red('>')} ${chalk.blue(text)}`;

export default class Generate extends Command {
  static description =
    'Generate CRUD system, admin pages and GraphQL queries and mutations for Frontend';

  static flags = {
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      default: 'pal',
      description: 'You can pass custom config file name',
    }),
    schema: flags.string({
      char: 's',
      description:
        'You can pass a schema name from pal config file to work with',
    }),
    multi: flags.boolean({
      char: 'm',
      description: 'Add this flag to work with config file as multi schema',
    }),
    autoComplete: flags.string({
      char: 'a',
      description:
        'Add this flag with ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/ path to generate CLI auto complete for oh-my-zsh',
    }),
  };

  static args = [
    {
      name: 'models',
      required: false,
      description:
        'schema model name to generate files for. You can pass one or more models like User,Post',
    },
    {
      name: 'type',
      required: false,
      description:
        'Type of files to generate you can send one or more like queries,mutations',
      options: ['crud', 'queries', 'mutations', 'admin', 'graphql'],
    },
  ];

  static aliases = ['g'];

  static examples = [
    `# To generate everything for all models in your schema\n${commandStyle(
      'pal g',
    )}\n`,
    `${chalk.yellow('Note:')} you need to change ${chalk.blue(
      'User,Post',
    )} with your schema models\n`,
    `# To generate everything for model or more \n${commandStyle(
      'pal g User,Post',
    )}\n`,
    `# To generate queries for one model or more \n${commandStyle(
      'pal g User,Post queries',
    )}\n`,
    `# To generate mutations for one model or more \n${commandStyle(
      'pal g User,Post mutations',
    )}\n`,
    `# To generate admin for one model or more \n${commandStyle(
      'pal g User,Post admin',
    )}\n`,
    `# To generate graphql for one model or more \n${commandStyle(
      'pal g User,Post graphql',
    )}\n`,
    `# To generate queries and mutations for one model or more \n${commandStyle(
      'pal g User,Post crud',
    )}`,
  ];

  async run() {
    try {
      const { args, flags } = this.parse(Generate);
      const config = await getConfig(flags);

      const configObject: { [key: string]: Config } = flags.multi
        ? config
        : { schema: config };

      if (flags.autoComplete) {
        const schemaPaths: string[] = [];
        for (const key of Object.keys(configObject)) {
          schemaPaths.push(await getSchemaPath(configObject[key].schema));
        }
        const uiGenerator = new UIGenerator(schemaPaths);
        createPlugin(
          uiGenerator.schema.models.map((model) => model.name),
          flags.autoComplete,
        );
      } else {
        for (const key of Object.keys(configObject)) {
          if (flags.schema && flags.schema !== key) {
            continue;
          }
          const config = configObject[key];
          const schemaPath = await getSchemaPath(config.schema);

          const spinner = log
            .spinner(log.withBrand('Generating your files'))
            .start();

          // backend generator
          if (config?.backend?.generator) {
            const options: PartialOptions = {};
            const queries =
              (!args.type && !config.backend.disableQueries) ||
              ['queries', 'crud'].includes(args.type);
            const mutations =
              (!args.type && !config.backend.disableMutations) ||
              ['mutations', 'crud'].includes(args.type);

            if (queries || mutations || !args.type) {
              options.models = args.models
                ? args.models.split(',')
                : config.backend.models;
              options.disableQueries = !queries;
              options.disableMutations = !mutations;
              await new Generator(
                { name: config.backend.generator, schemaPath },
                {
                  ...config.backend,
                  ...options,
                },
              ).run();
            }
          }

          // frontend generator
          const admin =
            (config?.frontend?.admin && !args.type) || args.type === 'admin';
          const graphql =
            (config?.frontend?.graphql && !args.type) ||
            args.type === 'graphql';

          if (config && (admin || graphql)) {
            const schemaPaths: string[] = [];
            for (const key of Object.keys(configObject)) {
              schemaPaths.push(await getSchemaPath(configObject[key].schema));
            }
            const frontend = config.frontend;
            const uiGenerator = new UIGenerator(schemaPaths);

            if (admin) {
              uiGenerator.buildSettingsSchema(
                config.backend?.adminSettingsPath,
              );
              const options: AdminPagesOptions = {
                ...(typeof frontend?.admin === 'object' ? frontend.admin : {}),
                models: args.models?.split(','),
              };
              uiGenerator.generateAdminPages(options);
            }

            if (graphql) {
              const options: PartialOptions = {
                ...(typeof frontend?.graphql === 'object'
                  ? frontend.graphql
                  : {}),
                models: args.models?.split(','),
              };
              uiGenerator.generateGraphql(options);
            }
          }
          spinner.succeed();
        }
      }
    } catch (error: any) {
      throw error;
    }
  }
}
