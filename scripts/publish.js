#!/usr/bin/env node

// Publish script.
// ---------------
// Serves two distinct purposes:
//
// 1. Produces a distribution bundle (npm package) for publishing to NPM.js
//
//    The created bundle contains:
//    - Transpiled distribution bundle
//    - SCSS sources files (containing utilities exposed by kirby)
//    - SVG Icons (icons provided / used by kirby)
//    - README.md file
//
// or
//
// 2. Produces a npm package tarball (gzipped) that can be installed using "npm install <path to tarball>"
//
// NOTICE: This script automatically determines if running on CI, or a local developer machine.

import cp from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import isCI from 'is-ci';
import { forwardScssFiles } from './forward-scss-files.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const packageAlias = '@kirbydesign';

const libsRootDir = `libs`;
const designsystemLibDir = `${libsRootDir}/designsystem`;
const designsystemLibSrcDir = `${designsystemLibDir}/icon/src`;
const coreLibDir = `${libsRootDir}/core`;
const coreLibSrcDir = `${coreLibDir}/src`;

const extensionsAngularLibDir = `${libsRootDir}/extensions/angular`;

// The stylelint-plugin is plain ESM with no build step: its package directory
// is already publishable as-is, with the package.json "files" allow-list
// controlling what ships.
const stylelintPluginLibDir = `${libsRootDir}/stylelint-plugin`;

const dist = `dist`;
const distDesignsystemTarget = `${designsystemLibDir}/${dist}`;
const distDesignsystemPackageJsonPath = `${distDesignsystemTarget}/package.json`;
const distCoreTarget = `${dist}/${coreLibDir}`;
const distCorePackageJsonPath = `${distCoreTarget}/package.json`;
const distExtensionsAngularTarget = `${extensionsAngularLibDir}/${dist}`;

const { version: coreVersion } = require('../libs/core/package.json');

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

function cleanDistribution(distTarget) {
  if (!isCI && fs.existsSync(distTarget)) {
    console.log(`Removing contents of "${distTarget}"`);
    return fs.remove(distTarget);
  } else {
    return Promise.resolve();
  }
}

function buildPackage(project) {
  return npm(['run', 'build', '--', '-p', project], {
    onFailMessage: 'Unable to build package (with ng-packagr)',
  });
}

function writeCoreVersionToPackageJson(distPackageJsonPath) {
  return fs.readJson(distPackageJsonPath, 'utf-8').then((packageJson) => {
    packageJson.peerDependencies['@kirbydesign/core'] = '^' + coreVersion;

    // (over-)write destination package.json file
    const json = JSON.stringify(packageJson, null, 2);
    console.log(`Writing new package.json (to: ${distDesignsystemPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distDesignsystemPackageJsonPath, packageJson, { spaces: 2 });
  });
}

function copyReadme(distTarget) {
  console.log('Copying README.md file...');
  return fs.copy('readme.md', `${distTarget}/readme.md`);
}

function createScssCoreForwardFiles(coreLibSrcDir, scssCoreForwardFilePaths) {
  const sourceRootDir = `${coreLibDir}/scss`;
  const sharedRootDir = libsRootDir;

  const copyScssCoreTargetFiles = () => {
    console.log('Copying SCSS core target files...');

    const onlyScssFiles = (input) => ['', '.scss'].includes(path.extname(input));
    return fs.copy(`${coreLibSrcDir}/scss`, `${sourceRootDir}`, {
      filter: onlyScssFiles,
    });
  };

  const generateScssCoreForwardFiles = () => {
    console.log('Creating SCSS core forwarding files...');
    return new Promise((resolve) => {
      scssCoreForwardFilePaths.forEach((targetRootDir) => {
        forwardScssFiles({ sourceRootDir, targetRootDir, packageAlias, sharedRootDir });
        resolve();
      });
    });
  };

  const deleteScssCoreTargetFiles = () => {
    console.log('Deleting SCSS core target files...');
    return fs.remove(`${sourceRootDir}`);
  };

  return copyScssCoreTargetFiles()
    .then(generateScssCoreForwardFiles)
    .then(deleteScssCoreTargetFiles);
}

function copyIcons(libSrcDir, distTarget) {
  console.log('Copying Icons...');
  const onlySvgFiles = (input) => ['', '.svg'].includes(path.extname(input));
  return fs.copy(`${libSrcDir}/icons/svg`, `${distTarget}/icons/svg`, {
    filter: onlySvgFiles,
  });
}

function copyCoreDistributionFiles(coreLibDir, distTarget) {
  console.log('Copying core distribution files...');

  const copyDistFiles = () => fs.copy(`${coreLibDir}/dist`, `${distTarget}/dist`);

  return copyDistFiles();
}

function copyScssFiles(libSrcDir, distTarget) {
  console.log('Copying SCSS files...');
  return fs.copy(`${libSrcDir}/scss`, `${distTarget}/scss`);
}

function copyPackageJson(libDir, distJsonPath) {
  console.log('Copying package.json file...');
  return fs.copy(`${libDir}/package.json`, distJsonPath);
}

function removeNpmIgnoreNestedPackageJsonRule(distTarget) {
  // ng-packagr 21 generates a .npmignore that excludes **/package.json,
  // stripping the subdirectory package.json (e.g. button/package.json) that consumers
  // with moduleResolution: "node" need to resolve subpath imports.
  const npmignorePath = `${distTarget}/.npmignore`;
  if (fs.existsSync(npmignorePath)) {
    const content = fs.readFileSync(npmignorePath, 'utf-8');
    const updated = content
      .split('\n')
      .filter((line) => line.trim() !== '**/package.json')
      .join('\n');
    fs.writeFileSync(npmignorePath, updated, 'utf-8');
    console.log('Removed **/package.json rule from .npmignore to preserve subpath imports');
  }
}

function createTarballPackage(distTarget) {
  return npm(['pack', distTarget], {
    onFailMessage: 'Unable to create gzipped tar-ball package',
  });
}

function publish(distTarget, tarballNamePrefix) {
  const findCoreTarball = (files) =>
    files.find(
      (candidate) => candidate.startsWith(tarballNamePrefix) && candidate.endsWith('.tgz')
    );

  if (isCI) {
    // Publish to NPM
    console.log('Running on CI, hence publishing package');

    return npm(['publish', distTarget], { onFailMessage: 'Unable to publish package' });
  } else {
    // Create a GZipped Tarball
    console.log('Running on non-CI, hence creating package as a gzipped tar-ball');

    return createTarballPackage(distTarget)
      .then(() => fs.promises.readdir('.'))
      .then(findCoreTarball)
      .then((filename) => fs.move(filename, `${dist}/${filename}`, { overwrite: true }));
  }
}

// Actual execution of script!

const args = process.argv.slice(2).map((value) => value.toLowerCase());
const doPublishCore = args.length === 0 || args.includes('core');
const doPublishDesignsystem = args.length === 0 || args.includes('designsystem');
const doPublishExtensionsAngular = args.includes('extensions-angular');
const doPublishStylelintPlugin = args.includes('stylelint-plugin');

if (doPublishCore) {
  // Publish core
  console.log('--- Publishing core ---');
  cleanDistribution(distCoreTarget)
    .then(() => buildPackage('core'))
    .then(() => copyCoreDistributionFiles(coreLibDir, distCoreTarget))
    .then(() => copyScssFiles(coreLibSrcDir, distCoreTarget))
    .then(() => copyPackageJson(coreLibDir, distCorePackageJsonPath))
    .then(() => publish(distCoreTarget, 'kirbydesign-core'))
    .catch((err) => console.warn('*** ERROR WHEN PUBLISHING CORE PACKAGE ***', err));
}

if (doPublishDesignsystem) {
  // Publish designsystem
  console.log('--- Publishing designsystem ---');
  cleanDistribution(distDesignsystemTarget)
    .then(() => buildPackage('designsystem'))
    .then(() => removeNpmIgnoreNestedPackageJsonRule(distDesignsystemTarget))
    .then(() => writeCoreVersionToPackageJson(distDesignsystemPackageJsonPath))
    .then(() => copyReadme(distDesignsystemTarget))
    .then(() => createScssCoreForwardFiles(coreLibSrcDir, [`${distDesignsystemTarget}/scss`]))
    .then(() => copyIcons(designsystemLibSrcDir, distDesignsystemTarget))
    .then(() => publish(distDesignsystemTarget, 'kirbydesign-designsystem'))
    .catch((err) => console.warn('*** ERROR WHEN PUBLISHING DESIGNSYSTEM ***', err));
}

if (doPublishExtensionsAngular) {
  // Publish extensions-angular
  console.log('--- Publishing extensions-angular ---');
  cleanDistribution(distExtensionsAngularTarget)
    .then(() => buildPackage('extensions-angular'))
    .then(() => removeNpmIgnoreNestedPackageJsonRule(distExtensionsAngularTarget))
    .then(() => publish(distExtensionsAngularTarget, 'kirbydesign-extensions-angular'))
    .catch((err) => console.warn('*** ERROR WHEN PUBLISHING EXTENSIONS-ANGULAR ***', err));
}

if (doPublishStylelintPlugin) {
  // Publish stylelint-plugin. No build step: the package is plain ESM and its
  // package.json "files" allow-list controls what ships, so we publish the
  // workspace directory directly.
  console.log('--- Publishing stylelint-plugin ---');
  publish(stylelintPluginLibDir, 'kirbydesign-stylelint-plugin').catch((err) =>
    console.warn('*** ERROR WHEN PUBLISHING STYLELINT-PLUGIN ***', err)
  );
}
