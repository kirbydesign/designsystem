#!/usr/bin/env node

'use strict';

// Publish script.
// ---------------
// Serves two distinct purposes:
//
// 1. Produces a distribution bundle (npm package) for publishing to NPM.js
//
//    The created bundle contains:
//    - Transpiled distribution bundle
//    - Required polyfills (by kirby)
//    - README.md file
//    - SCSS sources files (containing utilities exposed by kirby)
//
// or
//
// 2. Produces a npm package tarball (gzipped) that can be installed using "npm install <path to tarball>"
//
// NOTICE: This script automatically determines if running on CI, or a local developer machine.

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

function cleanDistribution() {
  if (!isCI && fs.existsSync(distTarget)) {
    console.log(`Removing contents of "${distTarget}"`);
    return fs.remove(distTarget);
  } else {
    return Promise.resolve();
  }
}

function buildPolyfills() {
  return npm(['run', 'build-polyfills'], {
    onFailMessage: 'Unable to build polyfills',
  });
}

function buildDesignsystem() {
  if (isCI) {
    return Promise.resolve();
  } else {
    return npm(['run', 'dist:designsystem'], {
      onFailMessage: 'Unable to build designsystem package (with ng-packagr)',
    });
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

function copyReadme() {
  return fs.copy('readme.md', path.resolve(distTarget, 'readme.md'));
}

function copyScssFiles() {
  const onlyScssFiles = (input) => ['', '.scss'].includes(path.extname(input));
  return fs.copy(`${libDir}/scss`, `${distTarget}/scss`, { filter: onlyScssFiles });
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

// Actual execution of script!
cleanDistribution()
  .then(buildPolyfills)
  .then(buildDesignsystem)
  .then(enhancePackageJson)
  .then(copyReadme)
  .then(copyScssFiles)
  .then(publish);
