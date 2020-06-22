const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { readJSONSync, writeJsonSync } = require('fs-extra');

const pkg = readJSONSync('package.json');
const version = pkg.version;

function loadFiles(path) {
  const files = readdirSync(path);
  for (const file of files) {
    if (lstatSync(join(path, file)).isDirectory()) {
      loadFiles(join(path, file));
    } else {
      if (file === 'package.json') {
        const pkg = readJSONSync(join(path, file));
        for (const dep of ['dependencies', 'devDependencies']) {
          if (pkg[dep]) {
            for (const pkgKey in pkg[dep]) {
              if (
                pkg[dep].hasOwnProperty(pkgKey) &&
                (pkgKey.startsWith('@paljs') || pkgKey === 'nexus-plugin-paljs')
              ) {
                pkg[dep][pkgKey] = version;
              }
            }
          }
        }
        writeJsonSync(join(path, file), pkg, { spaces: 2 });
      }
    }
  }
}

loadFiles('dist/examples');
