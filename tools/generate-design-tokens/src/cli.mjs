/**
 * CLI for the Kirby design-token pipeline.
 */

import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
import { loadConfig } from './config.mjs';
import { build, readJson } from './build.mjs';
import { normalize } from './artifact.mjs';
import { prepare } from './resolve.mjs';

const DEFAULT_CONFIG = fileURLToPath(new URL('../../../design-tokens.config.mjs', import.meta.url));
const OUTPUT_ROOT = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));

export const HELP = `Usage: design-tokens [--baseline <tokens.json>] <figma.json...>
       design-tokens --css-only <tokens.json> [--baseline <tokens.json>]

By default, merges Figma exports into one DTCG document at their original paths
and generates CSS. Outputs are staged for manual promotion.

Flags:
  --css-only <file>        Generate CSS from an existing DTCG document only.
  --baseline <file>        Build on a token set without emitting its tokens.
  -h, --help               Show this help.

Pass Figma exports as positional paths. Output is written to this package's dist/ directory.

Example:
  design-tokens specs.json primitive.color.system.json primitive.color.brand.json semantic.color.brand.json
  design-tokens --baseline libs/core/src/scss/themes/tokens.json \\
    <name>.brand.json <name>.semantic.json`;

/** Parses argv (already sliced past node + script). */
export function parseArgs(argv) {
  const opts = { inputs: [], cssOnly: null, baseline: null, help: false };

  let i = 0;
  const takeValue = (name) => {
    i++;
    if (i >= argv.length || argv[i].startsWith('--')) throw new Error(`${name} requires a value`);
    return argv[i++];
  };

  while (i < argv.length) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      opts.help = true;
      i++;
    } else if (arg === '--css-only') {
      opts.cssOnly = takeValue('--css-only');
    } else if (arg === '--baseline') {
      opts.baseline = takeValue('--baseline');
    } else if (!arg.startsWith('-')) {
      opts.inputs.push(arg);
      i++;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (opts.cssOnly && opts.inputs.length > 0) {
    throw new Error('Use positional Figma inputs or --css-only, not both');
  }
  if (!opts.cssOnly && opts.inputs.length === 0 && !opts.help) {
    throw new Error('Provide Figma input files or --css-only <file>');
  }

  return opts;
}

/**
 * Runs the pipeline.
 * @returns {Promise<{ outRoot, written, warnings }>}
 */
export async function run(opts) {
  const inputs = opts.inputs ?? [];
  const cssOnly = opts.cssOnly ?? null;
  if (cssOnly && inputs.length > 0)
    throw new Error('Use positional Figma inputs or --css-only, not both');
  if (!cssOnly && inputs.length === 0)
    throw new Error('Provide Figma input files or --css-only <file>');

  const configPath = opts.config ? resolve(opts.config) : DEFAULT_CONFIG;
  const config = await loadConfig(configPath);

  const outRoot = OUTPUT_ROOT;
  const baselineFile = opts.baseline ? resolve(opts.baseline) : null;
  const baseline = baselineFile ? readJson('baseline tokens', baselineFile) : {};
  const warnings = [];
  const artifact = cssOnly
    ? readJson('design tokens', resolve(cssOnly))
    : normalize(
        inputs.map((path) => readJson('Figma input', resolve(path))),
        config,
        baseline,
        warnings
      );
  const prepared = prepare(artifact, config, baseline);
  const sourceFile = cssOnly ? resolve(cssOnly) : join(outRoot, 'tokens.json');
  if (!cssOnly) {
    mkdirSync(outRoot, { recursive: true });
    writeFileSync(sourceFile, JSON.stringify(artifact, null, 2) + '\n');
  }
  const { written, warnings: buildWarnings } = await build(
    prepared.routes,
    prepared.emissions,
    outRoot,
    sourceFile,
    baselineFile,
    config.units,
    config
  );
  warnings.push(...buildWarnings);
  if (!cssOnly) written.push('tokens.json');

  return { outRoot, written, warnings };
}

/** CLI entry point. Returns a process exit code. */
export async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    console.error(`Error: ${err.message}\n`);
    console.error(HELP);
    return 1;
  }

  if (opts.help) {
    console.log(HELP);
    return 0;
  }

  try {
    const { outRoot, written, warnings } = await run(opts);
    for (const warning of warnings) console.warn(`Warning: ${warning}`);
    for (const dest of written) console.log(`  ${dest} -> ${resolve(outRoot, dest)}`);
    if (written.length === 0) console.log('No output produced (no emitting inputs).');

    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}
