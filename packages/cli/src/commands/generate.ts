import { Command, flags } from '@oclif/command';
import { PartialOptions, AdminPagesOptions } from '@paljs/types';
import { Generator, UIGenerator } from '@paljs/generator';
import * as colors from 'colors';
import { getConfig } from '../util/getGonfig';
import { ifPrismaExitAndGenerated } from '../util/ifPrismaExitAndGenerated';

const commandStyle = (text: string) =>
  `${colors.red('>')} ${colors.blue(text)}`;

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
      options: ['queries', 'mutations', 'admin', 'graphql'],
    },
  ];

  static aliases = ['g'];

  static examples = [
    `# To generate everything for all models in your schema\n${commandStyle(
      'pal g',
    )}\n`,
    `${colors.yellow('Note:')} you need to change ${colors.blue(
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
    `# To generate one type or more for one model or more \n${commandStyle(
      'pal g User,Post queries,mutations',
    )}`,
  ];

  async run() {
    const { args, flags } = this.parse(Generate);
    const config = await getConfig(flags);
    await ifPrismaExitAndGenerated();

    if (config?.backend?.generator) {
      const options: PartialOptions = {};
      const queries = !args.type || args.type.split(',').include('queries');
      const mutations = !args.type || args.type.split(',').include('mutations');

      if (args.models && (queries || mutations)) {
        options.models = args.models.split(',');
        options.disableQueries = !queries;
        options.disableMutations = !mutations;
      }
      new Generator(config.backend.generator, {
        ...config.backend,
        ...options,
      }).run();
    }

    if (config?.frontEnd) {
      const uiGenerator = new UIGenerator(config.schemaFolder);
      const admin = !args.type || args.type.split(',').include('admin');
      const graphql = !args.type || args.type.split(',').include('graphql');

      if (config.frontEnd.admin && admin) {
        uiGenerator.buildSettingsSchema();
        const options: AdminPagesOptions = {
          ...(typeof config.frontEnd.admin !== 'boolean'
            ? config.frontEnd.admin
            : {}),
          models: args.models?.split(','),
        };
        uiGenerator.generatePages(options);
      }

      if (config.frontEnd.graphql && graphql) {
        const options: PartialOptions = {
          ...(typeof config.frontEnd.graphql !== 'boolean'
            ? config.frontEnd.graphql
            : {}),
          models: args.models?.split(','),
        };
        uiGenerator.generateGraphql(options);
      }
    }
  }
}
