'use strict';

const execa = require('execa');
const fs = require('fs-extra');
const os = require('os');

function hasNodeVersionChanged() {
  return new Promise((resolve, reject) => {
    execa('git', ['diff', '-G "node":', 'package.json'])
      .then((result) => {
        if (!!result.stdout) {
          const diffContainsEnginesNodeVersion = /engines": {\s+-\s+"node":/g.test(
            result.stdout.toString()
          );
          resolve(diffContainsEnginesNodeVersion);
        } else {
          resolve(false);
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

hasNodeVersionChanged()
  .then((hasChanged) => {
    if (hasChanged) {
      const {
        engines: { node: nodeVersion },
      } = require('../package.json');
      fs.writeFile('.nvmrc', nodeVersion + os.EOL);
    }
  })
  .catch((reason) => {
    console.warn('Node version sync check failed!', reason);
  });
