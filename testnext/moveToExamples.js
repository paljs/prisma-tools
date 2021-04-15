/* eslint-disable @typescript-eslint/no-var-requires */
const { existsSync, mkdirSync, readdirSync, lstatSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { readJSONSync, writeJsonSync, copy } = require('fs-extra');
const rimraf = require('rimraf');

const excludedFiles = [
  'node_modules',
  '.next',
  'client',
  'migrations',
  'dev.db',
  'moveToExamples.js',
  'generated',
  'nexus-typegen.ts',
  '_',
];

const destinationPath = join(__dirname, '../packages/create/examples/full-stack-nextjs');

const pathInclude = {
  'src/server/graphql': ['Auth.ts', 'index.ts'],
  'src/pages/admin': ['auth', 'index.tsx'],
};

const newDir = (path) => {
  !existsSync(path) && mkdirSync(path, { recursive: true });
};

const readDir = (path) => {
  const files = readdirSync(path);
  const rootPath = path.replace(__dirname + '/', '');
  for (const file of files) {
    if (!excludedFiles.includes(file) && (!pathInclude[rootPath] || pathInclude[rootPath].includes(file))) {
      if (lstatSync(join(path, file)).isDirectory()) {
        newDir(join(destinationPath, rootPath, file));
        readDir(join(path, file));
      } else {
        if (file === 'adminSettings.json') {
          writeFileSync(
            join(destinationPath, rootPath, file),
            `{
  "models": [],
  "enums": []
}`,
          );
        } else if (rootPath === 'src/pages/admin/auth') {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(
            join(destinationPath, rootPath, file),
            data.replace(/components\/(\w+)\/(\w+)/g, 'components/$2'),
          );
        } else if (rootPath === 'src/server/graphql' && file === 'index.ts') {
          writeFileSync(join(destinationPath, rootPath, file), `export * from './Auth'`);
        } else if (rootPath === 'src/server/multi_context' && ['prisma1.ts', 'prisma2.ts'].includes(file)) {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(
            join(destinationPath, rootPath, file),
            data.replace(/..\/..\/..\/(\w+)\/(\w+)\/client/g, '../../../$2/client'),
          );
        } else if (file === 'multi_nexusSchema.ts') {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(
            join(destinationPath, rootPath, file),
            data.replace(/..\/..\/(\w+)\/(\w+)\/client/g, '../../$2/client'),
          );
        } else if (['package.json', 'multi_package.json'].includes(file)) {
          const data = readJSONSync(join(path, file));
          for (const dep of ['dependencies', 'devDependencies']) {
            if (data[dep]) {
              for (const pkgKey in data[dep]) {
                if (data[dep].hasOwnProperty(pkgKey) && !pkgKey.startsWith('@paljs')) {
                  data[dep][pkgKey] = data[dep][pkgKey].split('.')[0] + '.x';
                }
              }
            }
          }
          writeJsonSync(join(destinationPath, rootPath, file), data, { spaces: 2 });
        } else if (file === '.gitignore') {
          copy(join(path, file), join(destinationPath, rootPath, 'gitignore'));
        } else {
          copy(join(path, file), join(destinationPath, rootPath, file));
        }
      }
    }
  }
};
rimraf.sync(destinationPath);
newDir(join(destinationPath));
readDir(__dirname);
