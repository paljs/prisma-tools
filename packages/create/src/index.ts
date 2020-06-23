import spawn from 'cross-spawn';
import chalk from 'chalk';
import { readJSONSync, writeJson, copy } from 'fs-extra';
import { resolve, join } from 'path';
import { fetchLatestVersionsFor } from './utils/fetch-latest-version-for';
import { log } from '@paljs/display';
import { Examples } from '@paljs/types';
import * as path from 'path';
import { readdirSync, lstatSync, renameSync } from 'fs';

export interface AppGeneratorOptions {
  example: Examples;
  destinationRoot: string;
  name: string;
  description: string;
  author: string;
  yarn: boolean;
  skipInstall: string | boolean;
  repository: string;
  manager: string;
}

export class AppGenerator {
  constructor(private options: AppGeneratorOptions) {
    this.options.destinationRoot = this.options.name;
    this.options.yarn = this.options.manager === 'yarn';
    this.options.skipInstall = this.options.skipInstall === 'yes';
  }

  sourceRoot: string = resolve(__dirname, './examples/', this.options.example);
  packageJson: string[] = [];

  destinationPath(...paths: string[]): string {
    return path.join(this.options.destinationRoot!, ...paths);
  }

  loadFiles(path: string) {
    const files = readdirSync(path);
    for (const file of files) {
      if (lstatSync(join(path, file)).isDirectory()) {
        this.loadFiles(join(path, file));
      } else {
        if (file === 'package.json') this.packageJson.push(join(path, file));
        log.info(chalk.green('create ') + file);
      }
    }
  }

  async updatePackages() {
    let fallbackUsed = false;
    for (let i = 0; i < this.packageJson.length; i++) {
      const pkg = readJSONSync(this.packageJson[i]);
      if (i === 0) {
        pkg.name = this.options.name;
        pkg.repository = this.options.repository;
        pkg.author = this.options.author;
        pkg.description = this.options.description;
      }
      for (const dep of ['dependencies', 'devDependencies']) {
        if (pkg[dep]) {
          const { value, isFallback } = await fetchLatestVersionsFor(pkg[dep]);
          pkg[dep] = value;
          if (!fallbackUsed) fallbackUsed = isFallback;
        }
      }

      await writeJson(this.packageJson[i], pkg, { spaces: 2 });
    }
    return fallbackUsed;
  }

  async postWrite() {
    const gitInitResult = spawn.sync('git', ['init'], {
      stdio: 'ignore',
    });
    console.log(''); // New line needed
    const spinner = log
      .spinner(log.withBrand('Retrieving the freshest of dependencies'))
      .start();
    const fallbackUsed = await this.updatePackages();
    if (!fallbackUsed && !this.options.skipInstall) {
      spinner.succeed();

      await new Promise((resolve) => {
        const logFlag = this.options.yarn ? '--json' : '--loglevel=error';
        const cp = spawn(
          this.options.yarn ? 'yarn' : 'npm',
          ['install', logFlag],
          {
            stdio: ['inherit', 'pipe', 'pipe'],
          },
        );

        const getJSON = (data: string) => {
          try {
            return JSON.parse(data);
          } catch {
            return null;
          }
        };

        const spinners: any[] = [];

        if (!this.options.yarn) {
          const spinner = log
            .spinner(
              log.withBrand(
                'Installing those dependencies (this will take a few minutes)',
              ),
            )
            .start();
          spinners.push(spinner);
        }

        cp.stdout?.setEncoding('utf8');
        cp.stderr?.setEncoding('utf8');
        cp.stdout?.on('data', (data) => {
          if (this.options.yarn) {
            let json = getJSON(data);
            if (json && json.type === 'step') {
              spinners[spinners.length - 1]?.succeed();
              const spinner = log
                .spinner(log.withBrand(json.data.message))
                .start();
              spinners.push(spinner);
            }
            if (json && json.type === 'success') {
              spinners[spinners.length - 1]?.succeed();
            }
          }
        });
        cp.stderr?.on('data', (data) => {
          if (this.options.yarn) {
            let json = getJSON(data);
            if (json && json.type === 'error') {
              spinners[spinners.length - 1]?.fail();
              console.error(json.data);
            }
          } else {
            // Hide the annoying Prisma warning about not finding the schema file
            // because we generate the client ourselves
            if (!data.includes('schema.prisma')) {
              console.error(`\n${data}`);
            }
          }
        });
        cp.on('exit', (code) => {
          if (!this.options.yarn && spinners[spinners.length - 1].isSpinning) {
            if (code !== 0) spinners[spinners.length - 1].fail();
            else {
              spinners[spinners.length - 1].succeed();
            }
          }
          resolve();
        });
      });

      const runLocalNodeCLI = (command: string) => {
        if (this.options.yarn) {
          return spawn.sync('yarn', ['run', ...command.split(' ')]);
        } else {
          return spawn.sync('npx', command.split(' '));
        }
      };

      // Ensure the generated files are formatted with the installed prettier version
      const formattingSpinner = log
        .spinner(log.withBrand('Formatting your code'))
        .start();
      const prettierResult = runLocalNodeCLI(
        'prettier --loglevel silent --write .',
      );
      if (prettierResult.status !== 0) {
        formattingSpinner.fail(
          chalk.yellow.bold(
            "We had an error running Prettier, but don't worry your app will still run fine :)",
          ),
        );
      } else {
        formattingSpinner.succeed();
      }
    } else if (this.options.skipInstall) {
      spinner.succeed();
    } else {
      console.log(''); // New line needed
      spinner.fail(
        chalk.red.bold(
          `We had some trouble connecting to the network, so we'll skip installing your dependencies right now. Make sure to run ${
            this.options.yarn ? "'yarn'" : "'npm install'"
          } once you're connected again.`,
        ),
      );
    }

    if (gitInitResult.status === 0) {
      this.commitChanges();
    } else {
      log.warning('Failed to run git init.');
      log.warning(
        'Find out more about how to install git here: https://git-scm.com/downloads.',
      );
    }
  }

  commitChanges() {
    const commands: Array<[string, string[], object]> = [
      ['git', ['add', '.'], { stdio: 'ignore' }],
      ['git', ['commit', '-m', 'New paljs app!'], { stdio: 'ignore' }],
    ];
    for (let command of commands) {
      const result = spawn.sync(...command);
      if (result.status !== 0) {
        log.error(
          `Failed to run command ${command[0]} with ${command[1].join(
            ' ',
          )} options.`,
        );
        break;
      }
    }
  }
  async run() {
    await copy(this.sourceRoot, this.destinationPath());
    process.chdir(this.options.destinationRoot!);
    renameSync('gitignore', '.gitignore');
    this.loadFiles('.');
    await this.postWrite();
  }
}
