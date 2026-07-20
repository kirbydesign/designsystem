#!/usr/bin/env node
/**
 * Transforms Figma variable exports into CSS custom property files.
 *
 * Wraps the two-step pipeline (parse → style-dictionary build) into a
 * single command that accepts the three Figma export files as arguments.
 *
 * Usage:
 *   node scripts/build-figma-tokens.js <kirby-palette> <brand-palette> <semantic-tokens>
 *
 * Example:
 *   node scripts/build-figma-tokens.js kirby-tier-1.json jb-tier-1.json jb-sematic-tokens.json
 */

import { execFileSync, execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: node scripts/build-figma-tokens.js <kirby-palette> <brand-palette> <semantic-tokens>

Transforms three Figma variable export files into CSS custom property files.

Positional arguments:
  kirby-palette    Path to shared Kirby palette primitives JSON
  brand-palette    Path to brand-specific palette primitives JSON
  semantic-tokens  Path to semantic tokens JSON with surface modes

Pipeline:
  1. parse-figma-colors.js  →  tokens/color-palette.json + tokens/colors.json
  2. style-dictionary build →  css/color-palette-core.css
                               css/color-palette-brand.css
                               css/theme-base.css
                               css/theme-raised.css
                               css/theme-brand.css`);
  process.exit(0);
}

if (args.length !== 3) {
  console.error(
    `Error: expected 3 arguments, got ${args.length}\n` +
      'Usage: node scripts/build-figma-tokens.js <kirby-palette> <brand-palette> <semantic-tokens>\n' +
      'Run with --help for details.',
  );
  process.exit(1);
}

// Step 1: Parse Figma exports into style-dictionary token files
console.log('=== Step 1/2: Parsing Figma exports ===\n');
try {
  execFileSync('node', [resolve(ROOT, 'scripts/parse-figma-colors.js'), ...args], {
    stdio: 'inherit',
    cwd: ROOT,
  });
} catch {
  process.exit(1);
}

// Step 2: Build CSS from tokens
console.log('\n=== Step 2/2: Building CSS with Style Dictionary ===\n');
try {
  execSync('npx style-dictionary@4 build --config sd.config.mjs', {
    stdio: 'inherit',
    cwd: ROOT,
  });
} catch {
  process.exit(1);
}

console.log('\nDone. CSS files written to css/');
