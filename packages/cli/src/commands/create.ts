import { Command, flags } from '@oclif/command';
import { AppGenerator, AppGeneratorOptions } from '@paljs/create';
import { prompt } from 'enquirer';
import { Examples } from '@paljs/types';
import chalk from 'chalk';
import { log } from '@paljs/display';
import { existsSync, readdirSync } from 'fs';

const examples: Examples[] = [
  'full-stack-nextjs',
  'full-stack-gatsbyjs',
  'apollo-nexus-schema',
  'apollo-sdl-first',
  'graphql-modules',
];

export default class Create extends Command {
  static description = 'Start new project from our examples';

  static aliases = ['c'];

  static flags = {
    help: flags.help({ char: 'h' }),
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
        type: 'select',
        name: 'example',
        message: 'Please select your start example',
        choices: examples,
      },
      {
        type: 'input',
        validate: (v: any) =>
          v
            ? this.dirIsEmpty(v)
              ? true
              : 'this folder not empty'
            : 'name is require',
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

    const answers = await prompt<AppGeneratorOptions>(question);
    const generator = new AppGenerator(answers);

    try {
      this.log(
        '\n' +
          log.withBrand('Hang tight while we set up your great new app!') +
          '\n',
      );
      await generator.run();
      this.log(
        '\n' + log.withBrand('Your new great app is ready! Next steps:') + '\n',
      );
      this.log('Go inside your project folder\n');
      this.log(log.withCaret(chalk.bold.blue(`cd ${answers.name}\n`)));
      this.log(
        `Please open ${chalk.bold.blue('README.md')} file and go with steps\n`,
      );
    } catch (error) {
      this.error(error);
    }
  }
}
