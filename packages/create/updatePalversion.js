const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { readJSONSync, writeJsonSync } = require('fs-extra');

function loadFiles(path) {
  const files = readdirSync(path);
  for (const file of files) {
    if (lstatSync(join(path, file)).isDirectory()) {
      loadFiles(join(path, file));
    } else {
      if (file === 'package.json' || file === 'multi_package.json') {
        const pkg = readJSONSync(join(path, file));
        for (const dep of ['dependencies', 'devDependencies']) {
          if (pkg[dep]) {
            for (const pkgKey in pkg[dep]) {
              if (
                pkg[dep].hasOwnProperty(pkgKey) &&
                pkgKey.startsWith('@paljs') &&
                !['@paljs/ui', '@paljs/icons'].includes(pkgKey)
              ) {
                let folder = pkgKey.split('/');
                folder = folder.length > 1 ? folder[1] : folder[0];
                const pkg2 = readJSONSync(`../${folder}/package.json`);
                pkg[dep][pkgKey] = pkg2.version;
              }
            }
          }
        }
        writeJsonSync(join(path, file), pkg, { spaces: 2 });
      }
    }
  }
}

loadFiles('examples');
loadFiles('../../testnext');
