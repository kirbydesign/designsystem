import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
import { loadConfig } from './config.mjs';
import { writeCss } from './dtcg-to-css.mjs';
import { figmaToDtcg } from './figma-to-dtcg.mjs';
import { routeTokens } from './routing.mjs';
import { readJson } from './tokens.mjs';

const DEFAULT_CONFIG = fileURLToPath(new URL('../../../design-tokens.config.mjs', import.meta.url));
const OUTPUT_ROOT = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const GENERATED_TOKENS_FILE = 'tokens.json';
const HELP_FLAGS = new Set(['-h', '--help']);
const OPTION_BY_VALUE_FLAG = new Map([
  ['--css-only', 'cssOnly'],
  ['--baseline', 'baseline'],
]);

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

export function parseArgs(userArgs) {
  const options = { inputs: [], cssOnly: null, baseline: null, help: false };
  const remaining = [...userArgs];
  while (remaining.length > 0) {
    const arg = remaining.shift();
    if (HELP_FLAGS.has(arg)) {
      options.help = true;
    } else if (OPTION_BY_VALUE_FLAG.has(arg)) {
      options[OPTION_BY_VALUE_FLAG.get(arg)] = takeFlagValue(arg, remaining);
    } else if (!arg.startsWith('-')) {
      options.inputs.push(arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  assertNotBothInputModes(options.cssOnly, options.inputs);
  if (!options.help) assertAnInputMode(options.cssOnly, options.inputs);
  return options;
}

function takeFlagValue(flag, remaining) {
  if (remaining.length === 0 || remaining[0].startsWith('--')) {
    throw new Error(`${flag} requires a value`);
  }
  return remaining.shift();
}

function assertNotBothInputModes(cssOnly, inputs) {
  if (cssOnly && inputs.length > 0) {
    throw new Error('Use positional Figma inputs or --css-only, not both');
  }
}

function assertAnInputMode(cssOnly, inputs) {
  if (!cssOnly && inputs.length === 0) {
    throw new Error('Provide Figma input files or --css-only <file>');
  }
}

/**
 * `outRoot` is for programmatic callers only; the CLI always stages in this package's dist/.
 * @returns {Promise<{ outRoot, written, warnings }>}
 */
export async function run(options) {
  const inputs = options.inputs ?? [];
  const cssOnly = options.cssOnly ?? null;
  assertNotBothInputModes(cssOnly, inputs);
  assertAnInputMode(cssOnly, inputs);

  const config = await loadConfig(options.config ? resolve(options.config) : DEFAULT_CONFIG);
  const baselineFile = options.baseline ? resolve(options.baseline) : null;
  const baseline = baselineFile ? readJson('baseline tokens', baselineFile) : {};
  const outRoot = options.outRoot ? resolve(options.outRoot) : OUTPUT_ROOT;
  const context = { config, baselineFile, baseline, outRoot };
  return cssOnly ? regenerateCss(cssOnly, context) : importFigmaExports(inputs, context);
}

async function importFigmaExports(inputs, context) {
  const importWarnings = [];
  const tokens = figmaToDtcg(
    inputs.map(readFigmaExport),
    context.config,
    context.baseline,
    importWarnings
  );
  const { routes, emissions } = routeTokens(tokens, context.config, context.baseline);
  const tokensFile = writeGeneratedTokens(tokens, context.outRoot);
  const built = await buildCss(routes, emissions, tokensFile, context);
  return {
    outRoot: context.outRoot,
    written: [...built.written, GENERATED_TOKENS_FILE],
    warnings: [...importWarnings, ...built.warnings],
  };
}

async function regenerateCss(tokensPath, context) {
  const tokensFile = resolve(tokensPath);
  const tokens = readJson('design tokens', tokensFile);
  const { routes, emissions } = routeTokens(tokens, context.config, context.baseline);
  const built = await buildCss(routes, emissions, tokensFile, context);
  return { outRoot: context.outRoot, written: built.written, warnings: built.warnings };
}

function buildCss(routes, emissions, tokensFile, { config, baselineFile, outRoot }) {
  return writeCss(routes, emissions, outRoot, tokensFile, baselineFile, config.units, config);
}

function readFigmaExport(path) {
  return readJson('Figma input', resolve(path));
}

function writeGeneratedTokens(tokens, outRoot) {
  const tokensFile = join(outRoot, GENERATED_TOKENS_FILE);
  mkdirSync(outRoot, { recursive: true });
  writeFileSync(tokensFile, JSON.stringify(tokens, null, 2) + '\n');
  return tokensFile;
}

/** @returns {Promise<number>} process exit code */
export async function main(userArgs) {
  let options;
  try {
    options = parseArgs(userArgs);
  } catch (error) {
    console.error(`Error: ${error.message}\n`);
    console.error(HELP);
    return 1;
  }

  if (options.help) {
    console.log(HELP);
    return 0;
  }

  try {
    reportResult(await run(options));
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 1;
  }
}

function reportResult({ outRoot, written, warnings }) {
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  for (const file of written) console.log(`  ${file} -> ${resolve(outRoot, file)}`);
  if (written.length === 0) console.log('No output produced (no emitting inputs).');
}
