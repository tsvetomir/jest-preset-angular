import glob from 'glob';
import path from 'path';
import { renameSync, readFileSync, existsSync, writeFileSync } from 'fs';

glob.sync('node_modules/@progress/kendo-angular-*').map((dir) => {
  const packageName = path.basename(dir);
  replaceBundle(packageName);
});

function replaceBundle(packageName) {
  const packageFile = `node_modules/@progress/${packageName}/package.json`;
  const packageDir = path.dirname(packageFile);
  const baseName = `node_modules/@progress/${packageName}/fesm2015/${packageName}`;

  if (existsSync(`${baseName}.js`)) {
    console.log(`Processing ${packageName}`);
    renameSync(`${baseName}.js`, `${baseName}.mjs`);

    const meta = JSON.parse(readFileSync(packageFile));
    meta.main = meta.module = path.relative(packageDir, `${baseName}.mjs`);
    writeFileSync(packageFile, JSON.stringify(meta, null, 2));
  }
}

