#!/usr/bin/env node

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

function buildDesignsystem() {
  return npm(['run', 'dist:designsystem'], {
    onFailMessage: 'Unable to build designsystem package (with ng-packagr)',
  });
}

function enhancePackageJson() {
  return fs.readJson(distPackageJsonPath, 'utf-8').then((distPackageJson) => {
    distPackageJson.version = version;
    distPackageJson.description = description;
    distPackageJson.repository = repository;
    distPackageJson.keywords = keywords;
    distPackageJson.author = author;
    distPackageJson.license = license;
    distPackageJson.bugs = bugs;
    distPackageJson.homepage = homepage;

    const json = JSON.stringify(distPackageJson, null, 2);
    console.log(`Writing new package.json (to: ${distPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distPackageJsonPath, distPackageJson, { spaces: 2 });
  });
}

function copyReadme() {
  console.log('Copying README.md file...');
  return fs.copy('readme.md', `${distTarget}/readme.md`);
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
    console.log('Running on CI, hence publishing package');
    return npm(['publish', distTarget], { onFailMessage: 'Unable to publish package' });
  } else {
    console.log('Running on non-CI, hence creating a gzipped tar-ball');
    return npm(['pack', distTarget], {
      onFailMessage: 'Unable to create gzipped tar-ball package',
    })
      .then(() => fs.promises.readdir('.'))
      .then(findTarball)
      .then((filename) => fs.move(filename, `${dist}/${filename}`, { overwrite: true }));
  }
}

cleanDistribution()
  .then(buildDesignsystem)
  .then(enhancePackageJson)
  .then(copyReadme)
  .then(copyScssFiles)
  .then(copyIcons)
  .then(copyPolyfills);
// .then(publish);
