import { Command, Flags } from '@oclif/core';
import { AppGenerator, AppGeneratorOptions, Frameworks } from '@paljs/create';
import { prompt } from 'enquirer';
import { CliGeneratedExamples } from '@paljs/types';
import { log, chalk } from '@paljs/display';
import { existsSync, readdirSync } from 'fs';

const examples: CliGeneratedExamples[] = [
  'full-stack-nextjs',
  'apollo-nexus-schema',
  'apollo-sdl-first',
  'graphql-modules',
];

const frameworks: Frameworks[] = [
  'Material UI',
  'Material UI + PrismaAdmin UI',
  'Tailwind CSS',
  'Tailwind CSS + PrismaAdmin UI',
  'Chakra UI',
  'Chakra UI + PrismaAdmin UI',
];

export default class Create extends Command {
  static description = 'Start new project from our examples';

  static aliases = ['c'];

  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  dirIsEmpty(path: string) {
    if (!existsSync(path)) return true;
    const dirData = readdirSync(path);
    return dirData.length === 0;
  }

  async run() {
    this.log(
      log.withBrand(`

.______      ___       __             __       _______.
|   _  \\    /   \\     |  |           |  |     /       |
|  |_)  |  /  ^  \\    |  |           |  |    |   (----\`
|   ___/  /  /_\\  \\   |  |     .--.  |  |     \\   \\
|  |     /  _____  \\  |  \`----.|  \`--'  | .----)   |
| _|    /__/     \\__\\ |_______| \\______/  |_______/


      `),
    );
    const question = [
      {
        type: 'input',
        validate: (v: any) => (v ? (this.dirIsEmpty(v) ? true : 'this folder not empty') : 'name is require'),
        name: 'name',
        message: 'please enter your project name',
      },
      {
        type: 'input',
        name: 'description',
        message: 'please enter your project description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'please enter your project author',
      },
      {
        type: 'input',
        name: 'repository',
        message: 'please enter your project repository',
      },
      {
        type: 'select',
        name: 'useGit',
        message: 'Do you need to use Git',
        choices: ['yes', 'no'],
      },
      {
        type: 'select',
        name: 'manager',
        message: 'please select your package manager',
        choices: ['yarn', 'npm'],
      },
      {
        type: 'select',
        name: 'skipInstall',
        message: 'Skip package installation',
        choices: ['yes', 'no'],
      },
    ];

    const { example } = await prompt<AppGeneratorOptions>({
      type: 'select',
      name: 'example',
      message: 'Please select your start example',
      choices: examples,
    });
    let framework: {
      framework?: AppGeneratorOptions['framework'];
      multi?: AppGeneratorOptions['multi'];
    } = {};
    if (example === 'full-stack-nextjs') {
      framework = await prompt<AppGeneratorOptions>([
        {
          type: 'select',
          name: 'framework',
          message: 'Please select your start framework',
          choices: frameworks,
        },
        {
          type: 'select',
          name: 'multi',
          message: 'Use multi schema template',
          choices: ['no', 'yes'],
        },
      ]);
    }
    const answers = {
      ...(await prompt<AppGeneratorOptions>(question)),
      example,
      ...framework,
    };
    const generator = new AppGenerator(answers);

    try {
      this.log('\n' + log.withBrand('Hang tight while we set up your great new app!') + '\n');
      await generator.run();
      this.log('\n' + log.withBrand('Your new great app is ready! Next steps:') + '\n');
      this.log('Go inside your project folder\n');
      this.log(log.withCaret(chalk.bold.blue(`cd ${answers.name}\n`)));
      this.log(`Please open ${chalk.bold.blue('README.md')} file and go with steps\n`);
    } catch (error: any) {
      this.error(error);
    }
  }
}
