const { lstatSync, readdirSync } = require('fs');
const path = require('path');
const { readJSONSync, writeJsonSync } = require('fs-extra');

function loadFiles(pathString) {
  const files = readdirSync(pathString);
  for (const file of files) {
    if (lstatSync(path.join(pathString, file)).isDirectory()) {
      loadFiles(path.join(pathString, file));
    } else {
      if (file === 'package.json' || file === 'multi_package.json') {
        const pkg = readJSONSync(path.join(pathString, file));
        for (const dep of ['dependencies', 'devDependencies']) {
          if (pkg[dep]) {
            for (const pkgKey in pkg[dep]) {
              if (
                Object.prototype.hasOwnProperty.call(pkg[dep], pkgKey) &&
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
        writeJsonSync(path.join(pathString, file), pkg, { spaces: 2 });
      }
    }
  }
}

loadFiles('examples');
loadFiles('../../testnext');
