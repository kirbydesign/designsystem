'use strict';

const { exec } = require('child_process');
const fs = require('fs-extra');
const os = require('os');

function hasNodeVersionChanged() {
  return new Promise((resolve, reject) => {
    // Check for changes to engines.node in staged package.json file:
    const nodeRegex = `'"node":'`;
    exec(`git diff -G ${nodeRegex} --cached package.json`, (e, stdout, stderr) => {
      if (e) return reject(e);
      if (stderr) return reject(stderr);
      const diffContainsEnginesNodeVersion = /engines": {\s+-\s+"node":/g.test(stdout.toString());
      return resolve(diffContainsEnginesNodeVersion);
    });
  });
}

hasNodeVersionChanged()
  .then((hasChanged) => {
    if (hasChanged) {
      console.log(
        '[sync-node-version] Node version from package.json changed! Syncing version to .nvmrc file and staging changes...'
      );
      const {
        engines: { node: nodeVersion },
      } = require('../package.json');
      fs.writeFile('.nvmrc', nodeVersion.replace('^', '').replace('~', '') + os.EOL);
      exec('git add .nvmrc');
      console.log(
        '[sync-node-version] ...DONE. Node version synced to .nvmrc file and added to commit.'
      );
    } else {
      console.log(
        '[sync-node-version] Node version from package.json not changed - nothing to do here...'
      );
    }
  })
  .catch((reason) => {
    console.warn('Node version sync check failed!', reason);
  });
