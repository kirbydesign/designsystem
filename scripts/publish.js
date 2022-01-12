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
//    - Polyfills (required by kirby)
//    - SCSS sources files (containing utilities exposed by kirby)
//    - SVG Icons (icons provided / used by kirby)
//    - README.md file
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
const { forwardScssFiles } = require('./forward-scss-files');

const packageAlias = '@kirbydesign';

const libsRootDir = `libs`;

const angularLibDir = `${libsRootDir}/designsystem`;
const angularLibSrcDir = `${angularLibDir}/src/lib`;
const coreLibDir = `${libsRootDir}/core`;
const dist = `dist`;
const distTarget = `${dist}/${angularLibDir}`;
const distPackageJsonPath = `${distTarget}/package.json`;

const pathsToForwardCoreScssFilesTo = [`${distTarget}/scss`];

const {
  version,
  description,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
} = require('../package.json');

function npm(args, options) {
  return new Promise((resolve, reject) => {
    console.log(`Spawning "npm ${args.join(' ')}"...`);
    const result = cp.spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', args);

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
  return npm(['run', 'dist:designsystem'], {
    onFailMessage: 'Unable to build designsystem package (with ng-packagr)',
  });
}

function enhancePackageJson() {
  return fs.readJson(distPackageJsonPath, 'utf-8').then((distPackageJson) => {
    // Modify contents
    distPackageJson.version = version;
    distPackageJson.description = description;
    distPackageJson.repository = repository;
    distPackageJson.keywords = keywords;
    distPackageJson.author = author;
    distPackageJson.license = license;
    distPackageJson.bugs = bugs;
    distPackageJson.homepage = homepage;

    // (over-)write destination package.json file
    const json = JSON.stringify(distPackageJson, null, 2);
    console.log(`Writing new package.json (to: ${distPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distPackageJsonPath, distPackageJson, { spaces: 2 });
  });
}

function copyReadme() {
  console.log('Copying README.md file...');
  return fs.copy('readme.md', `${distTarget}/readme.md`);
}

function forwardCoreScssFiles() {
  console.log('Forwarding core SCSS files...');

  const sourceRootDir = `${coreLibDir}/scss`;
  const sharedRootDir = libsRootDir;

  return new Promise((resolve) => {
    pathsToForwardCoreScssFilesTo.forEach((targetRootDir) => {
      forwardScssFiles({ sourceRootDir, targetRootDir, packageAlias, sharedRootDir });
      resolve();
    });
  });
}

function copyIcons() {
  console.log('Copying Icons...');
  const onlySvgFiles = (input) => ['', '.svg'].includes(path.extname(input));
  return fs.copy(`${angularLibSrcDir}/icons/svg`, `${distTarget}/icons/svg`, {
    filter: onlySvgFiles,
  });
}

function copyPolyfills() {
  console.log('Copying Polyfills...');
  const onlyLoadersAndMinified = (input) =>
    path.extname(input) === '' || input.endsWith('-loader.js') || input.endsWith('.min.js');
  return fs.copy(`${angularLibSrcDir}/polyfills`, `${distTarget}/polyfills`, {
    filter: onlyLoadersAndMinified,
  });
}

function createTarballPackage() {
  return npm(['pack', distTarget], {
    onFailMessage: 'Unable to create gzipped tar-ball package',
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

    // Make sure any local core changes (proxies etc.) are included in the local .tgz package
    // For CI, we build and publish this package separately.
    npm(['run', 'build:core'], {
      onFailMessage: 'Unable to build core package (stencil compiler)',
    })
      .then(createTarballPackage)
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
  .then(forwardCoreScssFiles)
  .then(copyIcons)
  .then(copyPolyfills)
  .then(publish)
  .catch((err) => console.warn('*** ERROR WHEN PUBLISHING ***', err));
