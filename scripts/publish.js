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
//
// Passing "--dev <package>" performs a dev publish instead of a release publish: the
// package and everything it depends on are published at <version>-dev-<short SHA> under
// the "dev" dist-tag, with peer dependency ranges pinned to those exact versions. Dev
// publishes rewrite source package.json files and so may only run on CI.

import cp from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import isCI from 'is-ci';
import { forwardScssFiles } from './forward-scss-files.js';

const packageAlias = '@kirbydesign';

const libsRootDir = `libs`;
const designsystemLibDir = `${libsRootDir}/designsystem`;
const designsystemLibSrcDir = `${designsystemLibDir}/icon/src`;
const coreLibDir = `${libsRootDir}/core`;
const coreLibSrcDir = `${coreLibDir}/src`;

const extensionsAngularLibDir = `${libsRootDir}/extensions/angular`;

const stylelintPluginLibDir = `./${libsRootDir}/stylelint-plugin`;

const dist = `dist`;
const distDesignsystemTarget = `${designsystemLibDir}/${dist}`;
const distDesignsystemPackageJsonPath = `${distDesignsystemTarget}/package.json`;
const distCoreTarget = `${dist}/${coreLibDir}`;
const distCorePackageJsonPath = `${distCoreTarget}/package.json`;
const distExtensionsAngularTarget = `${extensionsAngularLibDir}/${dist}`;

const sourcePackageJsonPaths = {
  core: `${coreLibDir}/package.json`,
  designsystem: `${designsystemLibDir}/package.json`,
  'extensions-angular': `${extensionsAngularLibDir}/package.json`,
  'stylelint-plugin': `${stylelintPluginLibDir}/package.json`,
};

// Packages published together must be published in this order, and each package
// implicitly depends on every package before it: designsystem peer-depends on core,
// extensions-angular peer-depends on designsystem. stylelint-plugin has no
// @kirbydesign dependencies and so forms a chain of its own.
const publishChains = [['core', 'designsystem', 'extensions-angular'], ['stylelint-plugin']];

const allPackages = publishChains.flat();

function readSourcePackageJson(packageName) {
  return fs.readJsonSync(sourcePackageJsonPaths[packageName]);
}

function resolvePublishClosure(packageName) {
  const chain = publishChains.find((candidate) => candidate.includes(packageName));
  return chain.slice(0, chain.indexOf(packageName) + 1);
}

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
        reject(new Error(`${options.onFailMessage} (npm exited with code ${code})`));
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
    onFailMessage: `Unable to build package "${project}" (with ng-packagr)`,
  });
}

function writeCoreVersionToPackageJson(distPackageJsonPath) {
  const { version: coreVersion } = readSourcePackageJson('core');
  const range = isDevPublish ? coreVersion : `^${coreVersion}`;

  return fs.readJson(distPackageJsonPath, 'utf-8').then((packageJson) => {
    packageJson.peerDependencies['@kirbydesign/core'] = range;

    // (over-)write destination package.json file
    const json = JSON.stringify(packageJson, null, 2);
    console.log(`Writing new package.json (to: ${distPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distPackageJsonPath, packageJson, { spaces: 2 });
  });
}

function writeDesignsystemVersionToPackageJson(distPackageJsonPath) {
  const { version: designsystemVersion } = readSourcePackageJson('designsystem');

  return fs.readJson(distPackageJsonPath, 'utf-8').then((packageJson) => {
    packageJson.peerDependencies['@kirbydesign/designsystem'] = designsystemVersion;

    const json = JSON.stringify(packageJson, null, 2);
    console.log(`Writing new package.json (to: ${distPackageJsonPath}):\n\n${json}`);
    return fs.writeJson(distPackageJsonPath, packageJson, { spaces: 2 });
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

// Official SemVer 2.0.0 grammar, from the "suggested regular expression" section of
// https://semver.org.
const semVerPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

function shortCommitSha() {
  const result = cp.spawnSync('git', ['rev-parse', '--short=7', 'HEAD'], { encoding: 'utf-8' });
  if (result.status !== 0) {
    throw new Error(`Unable to determine the current commit SHA: ${result.stderr}`);
  }
  return result.stdout.trim();
}

function toDevVersion(version, shortSha) {
  const devVersion = `${version}-dev-${shortSha}`;
  if (!semVerPattern.test(devVersion)) {
    throw new Error(`Computed dev version "${devVersion}" is not a valid SemVer version`);
  }
  return devVersion;
}

function applyDevVersions(packageNames, shortSha) {
  return packageNames.map((packageName) => {
    const packageJsonPath = sourcePackageJsonPaths[packageName];
    const packageJson = fs.readJsonSync(packageJsonPath);
    const devVersion = toDevVersion(packageJson.version, shortSha);

    packageJson.version = devVersion;
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    console.log(`Stamped ${packageJson.name} as ${devVersion} (in ${packageJsonPath})`);

    return { name: packageJson.name, version: devVersion };
  });
}

function isAlreadyPublished(packageSpec) {
  return new Promise((resolve) => {
    const child = cp.spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [
      'view',
      packageSpec,
      'version',
    ]);
    child.stdout.on('data', () => {});
    child.stderr.on('data', () => {});
    child.on('close', (code) => resolve(code === 0));
  });
}

async function publish(distTarget, tarballNamePrefix) {
  const findCoreTarball = (files) =>
    files.find(
      (candidate) => candidate.startsWith(tarballNamePrefix) && candidate.endsWith('.tgz')
    );

  if (isCI) {
    // Publish to NPM
    console.log('Running on CI, hence publishing package');

    const { name, version } = fs.readJsonSync(`${distTarget}/package.json`);

    if (isDevPublish && (await isAlreadyPublished(`${name}@${version}`))) {
      console.log(`${name}@${version} is already published, skipping.`);
      return;
    }

    return npm(['publish', distTarget, '--tag', isDevPublish ? 'dev' : 'latest'], {
      onFailMessage: `Unable to publish package from "${distTarget}"`,
    });
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
const isDevPublish = args.includes('--dev');
const unknownOptions = args.filter((value) => value.startsWith('--') && value !== '--dev');
const packageArgs = args.filter((value) => !value.startsWith('--'));

function publishCore() {
  console.log('--- Publishing core ---');
  return cleanDistribution(distCoreTarget)
    .then(() => buildPackage('core'))
    .then(() => copyCoreDistributionFiles(coreLibDir, distCoreTarget))
    .then(() => copyScssFiles(coreLibSrcDir, distCoreTarget))
    .then(() => copyPackageJson(coreLibDir, distCorePackageJsonPath))
    .then(() => publish(distCoreTarget, 'kirbydesign-core'));
}

function publishDesignsystem() {
  console.log('--- Publishing designsystem ---');
  return cleanDistribution(distDesignsystemTarget)
    .then(() => buildPackage('designsystem'))
    .then(() => removeNpmIgnoreNestedPackageJsonRule(distDesignsystemTarget))
    .then(() => writeCoreVersionToPackageJson(distDesignsystemPackageJsonPath))
    .then(() => copyReadme(distDesignsystemTarget))
    .then(() => createScssCoreForwardFiles(coreLibSrcDir, [`${distDesignsystemTarget}/scss`]))
    .then(() => copyIcons(designsystemLibSrcDir, distDesignsystemTarget))
    .then(() => publish(distDesignsystemTarget, 'kirbydesign-designsystem'));
}

function publishExtensionsAngular() {
  console.log('--- Publishing extensions-angular ---');
  return cleanDistribution(distExtensionsAngularTarget)
    .then(() => buildPackage('extensions-angular'))
    .then(() => removeNpmIgnoreNestedPackageJsonRule(distExtensionsAngularTarget))
    .then(() =>
      isDevPublish
        ? writeDesignsystemVersionToPackageJson(`${distExtensionsAngularTarget}/package.json`)
        : undefined
    )
    .then(() => publish(distExtensionsAngularTarget, 'kirbydesign-extensions-angular'));
}

function publishStylelintPlugin() {
  // Publish stylelint-plugin.
  // No build step: the package is plain ESM and its package.json "files" allow-list
  // controls what ships, so we publish the workspace directory directly.
  console.log('--- Publishing stylelint-plugin ---');
  return publish(stylelintPluginLibDir, 'kirbydesign-stylelint-plugin');
}

const publishPipelines = {
  core: publishCore,
  designsystem: publishDesignsystem,
  'extensions-angular': publishExtensionsAngular,
  'stylelint-plugin': publishStylelintPlugin,
};

// A release publishes whatever was asked for, defaulting to core and designsystem.
// A dev publish takes exactly one package and expands it to its publish closure.
function resolvePackagesToPublish() {
  if (unknownOptions.length > 0) {
    throw new Error(`Unknown option "${unknownOptions[0]}". Expected: --dev`);
  }

  if (!isDevPublish) {
    return packageArgs.length === 0
      ? ['core', 'designsystem']
      : allPackages.filter((packageName) => packageArgs.includes(packageName));
  }

  if (packageArgs.length !== 1) {
    throw new Error(
      `A dev publish takes exactly one package, one of: ${allPackages.join(', ')}. ` +
        `Received: ${packageArgs.length === 0 ? '(none)' : packageArgs.join(', ')}`
    );
  }

  const [packageName] = packageArgs;
  if (!allPackages.includes(packageName)) {
    throw new Error(`Unknown package "${packageName}". Expected one of: ${allPackages.join(', ')}`);
  }

  return resolvePublishClosure(packageName);
}

// Packages are published sequentially: designsystem declares a peer dependency on
// core, so core must reach the registry first.
async function main() {
  if (isDevPublish && !isCI) {
    throw new Error(
      'A dev publish rewrites package.json versions in place and may only run on CI.'
    );
  }

  const packagesToPublish = resolvePackagesToPublish();

  if (isDevPublish) {
    const shortSha = shortCommitSha();
    console.log(`--- Dev publish of [${packagesToPublish.join(', ')}] at ${shortSha} ---`);
    applyDevVersions(packagesToPublish, shortSha);
  }

  for (const packageName of packagesToPublish) {
    await publishPipelines[packageName]();
  }
}

main().catch((error) => {
  console.error('*** PUBLISH FAILED ***');
  console.error(error);
  process.exitCode = 1;
});
