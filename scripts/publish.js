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

const libDir = 'libs/designsystem/src/lib';
const dist = `dist`;
const distTarget = `${dist}/libs/designsystem`;
const distPackageJsonPath = `${distTarget}/package.json`;

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
  if (isCI) {
    // We're relying on the fact that CI has performed the build (run the "dist:designsystem"-target)
    // - hence, we'll immediately resolve this (and skip executing the "dist:designsystem"-target)
    return Promise.resolve();
  } else {
    return npm(['run', 'dist:designsystem'], {
      onFailMessage: 'Unable to build designsystem package (with ng-packagr)',
    });
  }
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
  return fs.copy('readme.md', path.resolve(distTarget, 'readme.md'));
}

function copyScssFiles() {
  console.log('Copying SCSS files...');
  const onlyScssFiles = (input) => ['', '.scss'].includes(path.extname(input));
  return fs.copy(`${libDir}/scss`, `${distTarget}/scss`, { filter: onlyScssFiles });
}

function copyIcons() {
  console.log('Copying Icons...');
  const onlySvgFiles = (input) => ['', '.svg'].includes(path.extname(input));
  return fs.copy(`${libDir}/icons/svg`, `${distTarget}/icons/svg`, { filter: onlySvgFiles });
}

function copyPolyfills() {
  console.log('Copying Polyfills...');
  const onlyLoadersAndMinified = (input) =>
    path.extname(input) === '' || input.endsWith('-loader.js') || input.endsWith('.min.js');
  return fs.copy(`${libDir}/polyfills`, `${distTarget}/polyfills`, {
    filter: onlyLoadersAndMinified,
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

// Actual execution of script!
cleanDistribution()
  .then(buildPolyfills)
  .then(buildDesignsystem)
  .then(enhancePackageJson)
  .then(copyReadme)
  .then(copyScssFiles)
  .then(copyIcons)
  .then(copyPolyfills)
  .then(publish);
