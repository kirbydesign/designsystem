#!/usr/bin/env node

'use strict';

var cpx = require('cpx');

cpx.copySync('readme.md', 'dist-lib');
cpx.copySync('src/kirby/**/!(*.spec.ts)', 'dist-lib');

var fs = require('fs');
var rootPkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
var pkgJson = JSON.parse(fs.readFileSync('dist-lib/package.json', 'utf-8'));
pkgJson.version = rootPkgJson.version;
fs.writeFileSync('dist-lib/package.json', JSON.stringify(pkgJson, null, 2));

var cp = require('child_process');
var result = cp.spawnSync('npm', ['publish', 'dist-lib']);
if (result.status != 0) {
    console.error('Unable to publish package');
    console.error('stdout: ' + result.stdout);
    console.error('stderr: ' + result.stderr);
    process.exitCode = 1;
}
