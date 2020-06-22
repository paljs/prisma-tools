import { Command, flags } from '@oclif/command';
import { AppGenerator, AppGeneratorOptions } from '@paljs/new';
import { prompt } from 'enquirer';
import { Examples } from '@paljs/types';
import chalk from 'chalk';
import { log } from '@paljs/display';
import { readdirSync, existsSync } from 'fs';

const examples: Examples[] = [
  'apollo-nexus-schema',
  'apollo-sdl-first',
  'nexus',
  'graphql-modules',
  'full-stack-nextjs',
  'full-stack-gatsbyjs',
];

export default class Create extends Command {
  static description = 'Start new project from our examples';

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
          !!v
            ? this.dirIsEmpty(v)
              ? true
              : 'this folder not empty'
            : 'name is require',
        name: 'name',
        message: 'please type your project name',
      },
      {
        type: 'input',
        name: 'description',
        message: 'please type your project descriptions',
      },
      {
        type: 'input',
        name: 'author',
        message: 'please type your project author',
      },
      {
        type: 'input',
        name: 'repository',
        message: 'please type your project repository',
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

    let answers = await prompt<AppGeneratorOptions>(question);
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
      this.log(chalk.blue.bold(`   1. cd ${answers.name}`));
      this.log(chalk.blue.bold(`   2. yarn generate`));
      this.log(chalk.blue.bold(`   3. pal g`));
      this.log(chalk.blue.bold(`   4. yarn dev\n`));
    } catch (err) {
      this.error(err);
    }
  }
}
