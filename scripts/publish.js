#!/usr/bin/env node

'use strict';

const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const isCI = require('is-ci');

const libDir = 'libs/designsystem/src/lib';
const dist = `dist`;
const distTarget = `${dist}/libs/designsystem`;
const distPackageJson = `${distTarget}/package.json`;

function npm(args, options) {
  return new Promise((resolve, reject) => {
    console.log(`Spawning "npm ${args.join(' ')}"...`);
    const result = cp.spawn('npm', args);

    result.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    result.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    result.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        console.error(options.onFailMessage);
        reject(code);
      }
    });
  });
}

function remove(path) {
  if (fs.existsSync(path)) {
    console.log(`Removing contents of "${path}"`);
    return fs.remove(path);
  } else {
    return Promise.resolve();
  }
}

function enhancePackageJson() {
  return Promise.all([
    fs.readJson('package.json', 'utf-8'),
    fs.readJson(distPackageJson, 'utf-8'),
  ]).then(([rootPackageJson, destPackageJson]) => {
    // Modify contents
    destPackageJson.version = rootPackageJson.version;

    // (over-)write destination package.json file
    const json = JSON.stringify(destPackageJson, null, 2);
    console.log(`Writing new package.json (to: ${distPackageJson}):\n\n${json}`);
    return fs.writeJson(distPackageJson, destPackageJson);
  });
}

function publish() {
  const findTarball = (files) =>
    files.find(
      (candidate) => candidate.startsWith('kirbydesign-designsystem') && candidate.endsWith('.tgz')
    );

  if (isCI) {
    // Publish to NPM
    console.log('Running on CI, hence publishing package');
    return npm(['publish', distTarget], { onFailMessage: 'Unable to publish package' });
  } else {
    // Create a GZipped Tarball
    console.log('Running on non-CI, hence creating a gzipped tar-ball');
    return npm(['pack', distTarget], {
      onFailMessage: 'Unable to create gzipped tar-ball package',
    })
      .then(() => fs.promises.readdir('.'))
      .then(findTarball)
      .then((filename) => fs.move(filename, `${dist}/${filename}`, { overwrite: true }));
  }
}

const onlyScssFiles = (input) => ['', '.scss'].includes(path.extname(input));

remove(distTarget)
  .then(() =>
    npm(['run', 'build-polyfills'], {
      onFailMessage: 'Unable to build polyfills',
    })
  )
  .then(() =>
    npm(['run', 'dist:designsystem'], {
      onFailMessage: 'Unable to build designsystem package (with ng-packagr)',
    })
  )
  .then(() => enhancePackageJson())
  .then(() => fs.copy('readme.md', path.resolve(distTarget, 'readme.md')))
  .then(() => fs.copy(`${libDir}/scss`, `${distTarget}/scss`, { filter: onlyScssFiles }))
  .then(() => publish());
