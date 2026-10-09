import { basename, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
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
  design-tokens primitives.json system-color-primitives.json brand-color-primitives.json brand-semantics.json
  design-tokens --baseline libs/core/src/scss/themes/tokens.json \\
    <name>-color-primitives.json <name>-semantics.json`;

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
 * `outRoot` is a staging directory: CSS and tokens.json files left there by earlier runs are
 * removed unless this run produced them or reads them as input.
 * @returns {Promise<{ outRoot, written, removed, warnings }>}
 */
export async function run(options) {
  const inputs = options.inputs ?? [];
  const cssOnly = options.cssOnly ?? null;
  assertNotBothInputModes(cssOnly, inputs);
  assertAnInputMode(cssOnly, inputs);

  const config = await loadConfig(options.config ? resolve(options.config) : DEFAULT_CONFIG);
  const baselineFile = options.baseline ? resolve(options.baseline) : null;
  const baseline = baselineFile
    ? { file: baselineFile, tokens: readJson('baseline tokens', baselineFile) }
    : null;
  const outRoot = options.outRoot ? resolve(options.outRoot) : OUTPUT_ROOT;
  const context = { config, baseline, outDir: outRoot };
  const result = cssOnly
    ? await regenerateCss(cssOnly, context)
    : await importFigmaExports(inputs, context);
  const inputFiles = [...(cssOnly ? [cssOnly] : inputs), baselineFile].filter(Boolean);
  return { outRoot, ...result, removed: removeStaleOutputs(outRoot, result.written, inputFiles) };
}

/** `context` carries the `writeCss` options shared by both input modes. */
async function importFigmaExports(inputs, context) {
  const importWarnings = [];
  const tokens = figmaToDtcg(
    inputs.map(readFigmaExport),
    context.config,
    context.baseline?.tokens,
    importWarnings
  );
  const { routes, emissions } = routeTokens(tokens, context.config, context.baseline?.tokens);
  const sourceFile = writeGeneratedTokens(tokens, context.outDir);
  const built = await writeCss({ ...context, routes, emissions, sourceFile });
  return {
    written: [...built.written, GENERATED_TOKENS_FILE],
    warnings: [...importWarnings, ...built.warnings],
  };
}

async function regenerateCss(tokensPath, context) {
  const sourceFile = resolve(tokensPath);
  const tokens = readJson('design tokens', sourceFile);
  const { routes, emissions } = routeTokens(tokens, context.config, context.baseline?.tokens);
  return writeCss({ ...context, routes, emissions, sourceFile });
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

/** @returns {string[]} removed files, relative to `outRoot` */
function removeStaleOutputs(outRoot, written, inputFiles) {
  if (!existsSync(outRoot)) return [];
  const keep = new Set(
    [...written.map((file) => resolve(outRoot, file)), ...inputFiles.map((file) => resolve(file))]
      .filter(existsSync)
      .map((file) => realpathSync(file))
  );
  const stale = readdirSync(outRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && isGeneratedFileName(entry.name))
    .map((entry) => join(entry.parentPath, entry.name))
    .filter((file) => !keep.has(realpathSync(file)));
  for (const file of stale) rmSync(file);
  return stale.map((file) => relative(outRoot, file));
}

function isGeneratedFileName(name) {
  return extname(name) === '.css' || basename(name) === GENERATED_TOKENS_FILE;
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

function reportResult({ outRoot, written, removed, warnings }) {
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  for (const file of written) console.log(`  ${file} -> ${resolve(outRoot, file)}`);
  for (const file of removed) console.log(`  removed stale ${resolve(outRoot, file)}`);
  if (written.length === 0) console.log('No output produced (no emitting inputs).');
}
