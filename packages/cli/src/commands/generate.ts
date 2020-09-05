import { Command, flags } from '@oclif/command';
import { PartialOptions, AdminPagesOptions } from '@paljs/types';
import { Generator, UIGenerator } from '@paljs/generator';
import chalk from 'chalk';
import { getConfig } from '../util/get-config';
import { ifPrismaExitAndGenerated } from '../util/if-prisma-exit-and-generated';
import { log } from '@paljs/display';

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
    const { args, flags } = this.parse(Generate);
    const config = await getConfig(flags);
    await ifPrismaExitAndGenerated(config);
    const spinner = log.spinner(log.withBrand('Generating your files')).start();

    if (config?.backend?.generator) {
      const options: PartialOptions = {};
      const queries = !args.type || ['queries', 'crud'].includes(args.type);
      const mutations = !args.type || ['mutations', 'crud'].includes(args.type);

      if (args.models && (queries || mutations)) {
        options.models = args.models.split(',');
        options.disableQueries = !queries;
        options.disableMutations = !mutations;
      }
      await new Generator(config.backend.generator, {
        ...config.backend,
        ...options,
      }).run();
    }

    if (config?.frontend) {
      const uiGenerator = new UIGenerator(config.schemaFolder);
      const admin = !args.type || args.type === 'admin';
      const graphql = !args.type || args.type === 'graphql';

      if (config.frontend.admin && admin) {
        uiGenerator.buildSettingsSchema(
          config.backend?.adminSettingsPath ?? config.schemaFolder,
        );
        const options: AdminPagesOptions = {
          ...(typeof config.frontend.admin !== 'boolean'
            ? config.frontend.admin
            : {}),
          models: args.models?.split(','),
        };
        uiGenerator.generateAdminPages(options);
      }

      if (config.frontend.graphql && graphql) {
        const options: PartialOptions = {
          ...(typeof config.frontend.graphql !== 'boolean'
            ? config.frontend.graphql
            : {}),
          models: args.models?.split(','),
        };
        uiGenerator.generateGraphql(options);
      }
    }
    spinner.succeed();
  }
}
