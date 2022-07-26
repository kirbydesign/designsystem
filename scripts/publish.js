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
const designsystemLibDir = `${libsRootDir}/designsystem`;
const designsystemLibSrcDir = `${designsystemLibDir}/src/lib`;
const coreLibDir = `${libsRootDir}/core`;
const coreLibSrcDir = `${coreLibDir}/src`;

const dist = `dist`;
const distDesignsystemTarget = `${dist}/${designsystemLibDir}`;
const distDesignsystemPackageJsonPath = `${distDesignsystemTarget}/package.json`;
const distCoreTarget = `${dist}/${coreLibDir}`;
const distCorePackageJsonPath = `${distCoreTarget}/package.json`;

const designsystemSccsCoreForwardFilePaths = [`${distDesignsystemTarget}/scss`];

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
  if (!isCI && fs.existsSync(distDesignsystemTarget)) {
    console.log(`Removing contents of "${distDesignsystemTarget}"`);
    return fs.remove(distDesignsystemTarget);
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
  return fs.readJson(distDesignsystemPackageJsonPath, 'utf-8').then((distPackageJson) => {
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
    console.log(`Writing new package.json (to: ${distDesignsystemPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distDesignsystemPackageJsonPath, distPackageJson, { spaces: 2 });
  });
}

function copyReadme() {
  console.log('Copying README.md file...');
  return fs.copy('readme.md', `${distDesignsystemTarget}/readme.md`);
}

function createScssCoreForwardFiles() {
  const sourceRootDir = `${coreLibDir}/scss`;
  const sharedRootDir = libsRootDir;

  const copySccsCoreTargetFiles = () => {
    console.log('Copying SCSS core target files...');

    const onlyScssFiles = (input) => ['', '.scss'].includes(path.extname(input));
    return fs.copy(`${coreLibSrcDir}/scss`, `${sourceRootDir}`, {
      filter: onlyScssFiles,
    });
  };

  const generateSccsCoreForwardFiles = () => {
    console.log('Creating SCSS core forwarding files...');
    return new Promise((resolve) => {
      designsystemSccsCoreForwardFilePaths.forEach((targetRootDir) => {
        forwardScssFiles({ sourceRootDir, targetRootDir, packageAlias, sharedRootDir });
        resolve();
      });
    });
  };

  const deleteSccsCoreTargetFiles = () => {
    console.log('Deleting SCSS core target files...');
    return fs.remove(`${sourceRootDir}`);
  };

  return copySccsCoreTargetFiles()
    .then(generateSccsCoreForwardFiles)
    .then(deleteSccsCoreTargetFiles);
}

function copyIcons() {
  console.log('Copying Icons...');
  const onlySvgFiles = (input) => ['', '.svg'].includes(path.extname(input));
  return fs.copy(`${designsystemLibSrcDir}/icons/svg`, `${distDesignsystemTarget}/icons/svg`, {
    filter: onlySvgFiles,
  });
}

function copyPolyfills() {
  console.log('Copying Polyfills...');
  const onlyLoadersAndMinified = (input) =>
    path.extname(input) === '' || input.endsWith('-loader.js') || input.endsWith('.min.js');
  return fs.copy(`${designsystemLibSrcDir}/polyfills`, `${distDesignsystemTarget}/polyfills`, {
    filter: onlyLoadersAndMinified,
  });
}

function createTarballPackage() {
  return npm(['pack', distDesignsystemTarget], {
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

    return npm(['publish', distDesignsystemTarget], {
      onFailMessage: 'Unable to publish designsystem package',
    });
  } else {
    // Create a GZipped Tarball
    console.log('Running on non-CI, hence creating a gzipped tar-ball');

    // Make sure any local core changes (proxies etc.) are included in the local .tgz package
    // For CI, we build and publish this package separately.
    return npm(['run', 'build:core'], {
      onFailMessage: 'Unable to build core package (stencil compiler)',
    })
      .then(createTarballPackage)
      .then(() => fs.promises.readdir('.'))
      .then(findTarball)
      .then((filename) => fs.move(filename, `${dist}/${filename}`, { overwrite: true }));
  }
}

function cleanCoreDistribution() {
  if (!isCI && fs.existsSync(distCoreTarget)) {
    console.log(`Removing contents of "${distCoreTarget}"`);
    return fs.remove(distCoreTarget);
  } else {
    return Promise.resolve();
  }
}

function buildCore() {
  return npm(['run', 'dist:core'], {
    onFailMessage: 'Unable to build core package (with ng-packagr)',
  });
}

function copyCoreStencilBuildFiles() {
  console.log('Copying core stencil compiled files...');

  const copyDistFiles = () => fs.copy(`${coreLibDir}/dist`, `${distCoreTarget}/dist`);
  const copyLoaderFiles = () => fs.copy(`${coreLibDir}/loader`, `${distCoreTarget}/loader`);

  return copyDistFiles().then(copyLoaderFiles);
}

function copyCoreScssFiles() {
  console.log('Copying core SCSS files...');
  return fs.copy(`${coreLibSrcDir}/scss`, `${distCoreTarget}/scss`);
}

function copyCorePackageJson() {
  console.log('Copying core package.json file...');
  return fs.copy(`${coreLibDir}/package.json`, `${distCorePackageJsonPath}`);
}

function updateCorePackageJson() {
  return fs.readJson(`${distCorePackageJsonPath}`, 'utf-8').then((distCorePackageJson) => {
    // Modify contents
    const keysWithDistPath = ['module', 'main', 'types', 'collection'];
    keysWithDistPath
      .filter((key) => distCorePackageJson.hasOwnProperty(key))
      .forEach((key) => {
        distCorePackageJson[key] = distCorePackageJson[key].replace(
          '../../dist/libs/core/dist',
          'dist'
        );
      });
    delete distCorePackageJson.files;

    // (over-)write destination package.json file
    const json = JSON.stringify(distCorePackageJson, null, 2);
    console.log(`Writing new core package.json (to: ${distCorePackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distCorePackageJsonPath, distCorePackageJson, { spaces: 2 });
  });
}

function createCoreTarballPackage() {
  return npm(['pack', distCoreTarget], {
    onFailMessage: 'Unable to create gzipped tar-ball package',
  });
}

function publishCore() {
  const findCoreTarball = (files) =>
    files.find(
      (candidate) => candidate.startsWith('kirbydesign-core') && candidate.endsWith('.tgz')
    );

  if (isCI) {
    // Publish to NPM
    console.log('Running on CI, hence publishing core package');

    return npm(['publish', distCoreTarget], { onFailMessage: 'Unable to publish core package' });
  } else {
    // Create a GZipped Tarball
    console.log('Running on non-CI, hence creating core package as a gzipped tar-ball');

    return createCoreTarballPackage()
      .then(() => fs.promises.readdir('.'))
      .then(findCoreTarball)
      .then((filename) => fs.move(filename, `${dist}/${filename}`, { overwrite: true }));
  }
}

// Actual execution of script!

const args = process.argv.slice(2).map((value) => value.toLowerCase());
const doPublishDesignsystem = args.length === 0 || args.includes('designsystem');
const doPublishCore = args.length === 0 || args.includes('core');

if (doPublishDesignsystem) {
  // Publish designsystem
  console.log('--- Publishing designsystem ---');
  cleanDistribution()
    .then(buildPolyfills)
    .then(buildDesignsystem)
    .then(enhancePackageJson)
    .then(copyReadme)
    .then(createScssCoreForwardFiles)
    .then(copyIcons)
    .then(copyPolyfills)
    .then(publish)
    .catch((err) => console.warn('*** ERROR WHEN PUBLISHING DESIGNSYSTEM ***', err));
}

if (doPublishCore) {
  // Publish core
  console.log('--- Publishing core ---');
  cleanCoreDistribution()
    .then(buildCore)
    .then(copyCoreStencilBuildFiles)
    .then(copyCoreScssFiles)
    .then(copyCorePackageJson)
    .then(updateCorePackageJson)
    .then(publishCore)
    .catch((err) => console.warn('*** ERROR WHEN PUBLISHING CORE PACKAGE ***', err));
}
