import spawn from 'cross-spawn';
import chalk from 'chalk';
import { readJSONSync, writeJsonSync, copySync } from 'fs-extra';
import { resolve, join } from 'path';
import { fetchLatestVersionsFor } from './utils/fetch-latest-version-for';
import { log } from '@paljs/display';
import { CliGeneratedExamples } from '@paljs/types';
import * as path from 'path';
import { readdirSync, lstatSync, renameSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { framework, getPath } from './utils/excludeSettings';

// update to add new FrameWork
export type Frameworks =
  | 'Material UI'
  | 'Material UI + PrismaAdmin UI'
  | 'Tailwind CSS'
  | 'Tailwind CSS + PrismaAdmin UI'
  | 'Chakra UI'
  | 'Chakra UI + PrismaAdmin UI';

export interface AppGeneratorOptions {
  example: CliGeneratedExamples;
  framework?: Frameworks;
  multi?: string | boolean;
  useGit?: string | boolean;
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
    this.options.multi = this.options.multi === 'yes';
    this.options.useGit = this.options.useGit === 'yes';
  }

  sourceRoot: string = resolve(__dirname, './examples/', this.options.example);
  packageJson: string[] = [];

  destinationPath(...paths: string[]): string {
    return path.join(this.options.destinationRoot, ...paths);
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

      writeJsonSync(this.packageJson[i], pkg, { spaces: 2 });
    }
    return fallbackUsed;
  }

  async postWrite() {
    const gitInitResult = this.options.useGit
      ? spawn.sync('git', ['init'], {
          stdio: 'ignore',
        })
      : { status: 1 };
    console.log(''); // New line needed
    const spinner = log.spinner(log.withBrand('Retrieving the freshest of dependencies')).start();
    const fallbackUsed = await this.updatePackages();
    if (!fallbackUsed && !this.options.skipInstall) {
      spinner.succeed();

      await new Promise<void>((resolve) => {
        const logFlag = this.options.yarn ? '--json' : '--loglevel=error';
        const cp = spawn(this.options.yarn ? 'yarn' : 'npm', ['install', logFlag], {
          stdio: ['inherit', 'pipe', 'pipe'],
        });

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
            .spinner(log.withBrand('Installing those dependencies (this will take a few minutes)'))
            .start();
          spinners.push(spinner);
        }

        cp.stdout?.setEncoding('utf8');
        cp.stderr?.setEncoding('utf8');
        cp.stdout?.on('data', (data) => {
          if (this.options.yarn) {
            const json = getJSON(data);
            if (json && json.type === 'step') {
              spinners[spinners.length - 1]?.succeed();
              const spinner = log.spinner(log.withBrand(json.data.message)).start();
              spinners.push(spinner);
            }
            if (json && json.type === 'success') {
              spinners[spinners.length - 1]?.succeed();
            }
          }
        });
        cp.stderr?.on('data', (data) => {
          if (this.options.yarn) {
            const json = getJSON(data);
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
      const formattingSpinner = log.spinner(log.withBrand('Formatting your code')).start();
      const prettierResult = runLocalNodeCLI('prettier --loglevel silent --write .');
      if (prettierResult.status !== 0) {
        formattingSpinner.fail(
          chalk.yellow.bold("We had an error running Prettier, but don't worry your app will still run fine :)"),
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
    } else if (this.options.useGit) {
      log.warning('Failed to run git init.');
      log.warning('Find out more about how to install git here: https://git-scm.com/downloads.');
    }
  }

  commitChanges() {
    const commands: [string, string[], object][] = [
      ['git', ['add', '.'], { stdio: 'ignore' }],
      ['git', ['commit', '-m', 'New paljs app!'], { stdio: 'ignore' }],
    ];
    for (const command of commands) {
      const result = spawn.sync(...command);
      if (result.status !== 0) {
        log.error(`Failed to run command ${command[0]} with ${command[1].join(' ')} options.`);
        break;
      }
    }
  }

  newDir(path: string) {
    !existsSync(path) && mkdirSync(path, { recursive: true });
  }

  excludeMulti(file: string) {
    return (
      (this.options.multi &&
        !['pal.js', 'next.config.js', 'package.json', 'nexusSchema.ts', 'context', 'prisma'].includes(file)) ||
      (!this.options.multi && !file.startsWith('multi_'))
    );
  }

  readDir(path: string) {
    const files = readdirSync(path);
    const frameworkExclude = framework[this.options.framework as Frameworks];
    // update to add new FrameWork
    const withAdmin = !['Tailwind CSS', 'Material UI', 'Chakra UI'].includes(this.options.framework as Frameworks);
    const frameworksFolders = ['material', 'tailwind', 'chakra'].filter((item) => item !== frameworkExclude.folder);
    for (const file of files) {
      if (
        this.excludeMulti(file) &&
        !frameworkExclude.files.includes(file) &&
        !frameworksFolders.includes(file) &&
        file !== '_app'
      ) {
        const newName = file.replace('multi_', '');
        if (lstatSync(join(path, file)).isDirectory()) {
          if (
            !['multi_prisma', frameworkExclude.folder].includes(file) &&
            !path.endsWith('components') &&
            !path.includes(frameworkExclude.folder)
          ) {
            this.newDir(join(this.destinationPath(), getPath(path, this.sourceRoot, frameworkExclude.folder), newName));
          }
          this.readDir(join(path, file));
        } else {
          if (file === '_app.tsx') {
            copySync(
              join(path.replace('pages', '_app'), frameworkExclude.app),
              join(this.destinationPath(), getPath(path, this.sourceRoot, frameworkExclude.folder), newName),
            );
          } else if ((newName === 'pal.config.js' || newName === 'nexusSchema.ts') && !withAdmin) {
            const data = readFileSync(join(path, file), 'utf-8');
            writeFileSync(
              join(this.destinationPath(), getPath(path, this.sourceRoot, frameworkExclude.folder), newName),
              newName === 'nexusSchema.ts'
                ? data.replace('includeAdmin: true,', 'includeAdmin: false,')
                : data.replace(/admin: true,/g, 'admin: false,'),
            );
          } else if (newName === 'package.json') {
            const data = readJSONSync(join(path, file));
            for (const dep of ['dependencies', 'devDependencies']) {
              if (data[dep]) {
                for (const pkgKey in data[dep]) {
                  if (Object.prototype.hasOwnProperty.call(data[dep], pkgKey)) {
                    if (frameworkExclude.packages.includes(pkgKey)) {
                      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                      delete data[dep][pkgKey];
                    }
                  }
                }
              }
            }
            writeJsonSync(join(this.destinationPath(), newName), data, {
              spaces: 2,
            });
          } else {
            copySync(
              join(path, file),
              join(this.destinationPath(), getPath(path, this.sourceRoot, frameworkExclude.folder), newName),
            );
          }
        }
      }
    }
  }

  async run() {
    if (this.options.example === 'full-stack-nextjs') {
      this.readDir(this.sourceRoot);
    } else {
      copySync(this.sourceRoot, this.destinationPath());
    }
    process.chdir(this.options.destinationRoot);
    renameSync('gitignore', '.gitignore');
    this.loadFiles('.');
    await this.postWrite();
  }
}
