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

const destinationPath = '../packages/create/examples/full-stack-nextjs';

const pathInclude = {
  'src/server/graphql': ['Auth.ts', 'index.ts'],
  'src/pages/admin': ['auth', 'index.tsx'],
};

const newDir = (path) => {
  !existsSync(path) && mkdirSync(path, { recursive: true });
};

const readDir = (path) => {
  const files = readdirSync(path);
  for (const file of files) {
    if (!excludedFiles.includes(file) && (!pathInclude[path] || pathInclude[path].includes(file))) {
      if (lstatSync(join(path, file)).isDirectory()) {
        newDir(join(destinationPath, path, file));
        readDir(join(path, file));
      } else {
        if (file === 'adminSettings.json') {
          writeFileSync(
            join(destinationPath, path, file),
            `{
  "models": [],
  "enums": []
}`,
          );
        } else if (path === 'src/pages/admin/auth') {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(join(destinationPath, path, file), data.replace(/components\/(\w+)\/(\w+)/g, 'components/$2'));
        } else if (path === 'src/server/graphql' && file === 'index.ts') {
          writeFileSync(join(destinationPath, path, file), `export * from './Auth'`);
        } else if (path === 'src/server/multi_context' && ['prisma1.ts', 'prisma2.ts']) {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(
            join(destinationPath, path, file),
            data.replace(/..\/..\/..\/(\w+)\/(\w+)\/client/g, '../../../$2/client'),
          );
        } else if (file === 'multi_nexusSchema.ts') {
          const data = readFileSync(join(path, file), 'utf-8');
          writeFileSync(
            join(destinationPath, path, file),
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
          writeJsonSync(join(destinationPath, path, file), data, { spaces: 2 });
        } else if (file === '.gitignore') {
          copy(join(path, file), join(destinationPath, path, 'gitignore'));
        } else {
          copy(join(path, file), join(destinationPath, path, file));
        }
      }
    }
  }
};
rimraf.sync(destinationPath);
newDir(join(destinationPath));
readDir('./');
