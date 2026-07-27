/**
 * Structure-driven, flag-driven CLI for the Kirby design-token pipeline (ADR-001).
 *
 *   design-tokens --primitive <file...> \
 *                 --semantic  <file...> \
 *                 [--override <name>] \
 *                 [--prefix <name>] \
 *                 --out <dir>
 *
 * The tool is organized by token role, not by source file:
 *   --primitive  number collections  -> primitives/<collection>.css   (:root)
 *                color  scopes        -> primitives/<scope>-color.css  (:root)
 *   --semantic   color, per surface   -> semantic/color.css + semantic/color-chart.css
 *   --override <n> modifier: computes a semantic delta vs the default files in the
 *                same run and routes all output under <out>/overrides/<n>/
 *
 * The Figma structure dictates the output: a color leaf at `system/color/green/500`
 * becomes `--kirby-system-color-green-500`, and a semantic alias resolves to it by
 * membership (its variable name matching a primitive leaf), never by collection name.
 */

import { resolve } from 'node:path';
import { firstLeafType } from './tokens.mjs';
import { extractPrimitives } from './extract-primitives.mjs';
import {
  prepColorPrimitives,
  buildMembershipMap,
  prepSemantic,
  prepSemanticOverrideDelta,
} from './prep-colors.mjs';
import { buildPrimitives, buildColorPrimitive, buildSemantic, readJson } from './build.mjs';

const DEFAULT_PREFIX = 'kirby';

export const HELP = `Usage: design-tokens --primitive <file...> --semantic <file...> [--override <name>] [--prefix <name>] --out <dir>

Turns Figma variable exports into Kirby design-token CSS custom properties.

Flags:
  --primitive <file...>  Primitive token exports. Number collections become
                         primitives/<collection>.css; color scopes become
                         primitives/<scope>-color.css (e.g. system-color.css,
                         brand-color.css).
  --semantic  <file...>  Semantic (per-surface) color exports. Become
                         semantic/color.css + semantic/color-chart.css.
  --override <name>      Build an external theme as a semantic delta vs the
                         default files in this run. Pass default files first,
                         the override file last, in both --primitive and
                         --semantic. Output lands under <out>/overrides/<name>/.
  --prefix <name>        Variable/reference namespace (default: ${DEFAULT_PREFIX}).
  --out <dir>            Output root (required).
  -h, --help             Show this help.`;

/**
 * Parses argv (already sliced past node + script).
 * Collects space-separated values after --primitive/--semantic until the next flag.
 */
export function parseArgs(argv) {
  const opts = {
    primitive: [],
    semantic: [],
    override: null,
    prefix: DEFAULT_PREFIX,
    out: null,
    help: false,
  };

  let i = 0;
  const takeList = (target) => {
    i++;
    while (i < argv.length && !argv[i].startsWith('--')) target.push(argv[i++]);
  };
  const takeValue = (name) => {
    i++;
    if (i >= argv.length || argv[i].startsWith('--')) {
      throw new Error(`${name} requires a value`);
    }
    return argv[i++];
  };

  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case '-h':
      case '--help':
        opts.help = true;
        i++;
        break;
      case '--primitive':
        takeList(opts.primitive);
        break;
      case '--semantic':
        takeList(opts.semantic);
        break;
      case '--override':
        opts.override = takeValue('--override');
        break;
      case '--prefix':
        opts.prefix = takeValue('--prefix');
        break;
      case '--out':
        opts.out = takeValue('--out');
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return opts;
}

/** Loads a list of file paths as `{ path, data }`. */
function loadFiles(paths, label) {
  return paths.map((p) => ({ path: p, data: readJson(label, resolve(p)) }));
}

/**
 * Splits primitive files into non-color collections (for the generic extractor)
 * and color files (for palette handling).
 */
function classifyPrimitiveFiles(files) {
  const numberCollections = {};
  const colorFiles = [];

  for (const file of files) {
    let hasColor = false;
    for (const [name, data] of Object.entries(file.data)) {
      if (name.startsWith('$')) continue;
      if (firstLeafType(data) === 'color') {
        hasColor = true;
      } else {
        numberCollections[name] = data;
      }
    }
    if (hasColor) colorFiles.push(file);
  }

  return { numberCollections, colorFiles };
}

/** Merges color primitive files into one scope tree (system, brand, …). */
function mergeColorFiles(colorFiles) {
  return prepColorPrimitives(colorFiles.map((f) => f.data));
}

/** Merges an array of `{ data }` into one object (later files win). */
function mergeData(files) {
  return Object.assign({}, ...files.map((f) => f.data));
}

/**
 * Runs the pipeline. Returns `{ outRoot, written: string[], stats? }`.
 */
export async function run(opts) {
  if (!opts.out) throw new Error('--out <dir> is required');
  if (opts.primitive.length === 0 && opts.semantic.length === 0) {
    throw new Error('Provide at least one of --primitive or --semantic');
  }

  const prefix = opts.prefix;
  const outRoot = opts.override
    ? resolve(opts.out, 'overrides', opts.override)
    : resolve(opts.out);
  const written = [];

  const primitiveFiles = loadFiles(opts.primitive, 'primitive');
  const semanticFiles = loadFiles(opts.semantic, 'semantic');

  return opts.override
    ? runOverride({ prefix, outRoot, primitiveFiles, semanticFiles, written })
    : runDefault({ prefix, outRoot, primitiveFiles, semanticFiles, written });
}

async function runDefault({ prefix, outRoot, primitiveFiles, semanticFiles, written }) {
  const { numberCollections, colorFiles } = classifyPrimitiveFiles(primitiveFiles);

  const numberTokens = extractPrimitives(numberCollections, prefix);
  written.push(...(await buildPrimitives(numberTokens, { prefix, outDir: outRoot })));

  const colorTree = mergeColorFiles(colorFiles);
  written.push(...(await buildColorPrimitive(colorTree, { prefix, outDir: outRoot })));

  if (semanticFiles.length > 0) {
    const membership = buildMembershipMap(colorTree);
    const semanticTokens = prepSemantic(mergeData(semanticFiles), membership);
    written.push(...(await buildSemantic(colorTree, semanticTokens, { prefix, outDir: outRoot })));
  }

  return { outRoot, written };
}

async function runOverride({ prefix, outRoot, primitiveFiles, semanticFiles, written }) {
  // Convention: default files first, the override file last.
  const { colorFiles } = classifyPrimitiveFiles(primitiveFiles);
  const overrideColorFile = colorFiles.at(-1);

  // Full color tree (default scopes + the override's own scope) resolves
  // references and backs the membership map.
  const colorTree = mergeColorFiles(colorFiles);
  const membership = buildMembershipMap(colorTree);

  // The override's own color scope is what gets emitted for the theme.
  let stats;
  if (overrideColorFile) {
    const overrideColor = prepColorPrimitives([overrideColorFile.data]);
    written.push(...(await buildColorPrimitive(overrideColor, { prefix, outDir: outRoot })));
  }

  if (semanticFiles.length >= 2) {
    const overrideSemantic = semanticFiles.at(-1).data;
    const defaultSemantic = mergeData(semanticFiles.slice(0, -1));
    const delta = prepSemanticOverrideDelta(overrideSemantic, defaultSemantic, membership);
    stats = delta.stats;
    written.push(...(await buildSemantic(colorTree, delta.tokens, { prefix, outDir: outRoot })));
  }

  return { outRoot, written, stats };
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
    const { outRoot, written, stats } = await run(opts);
    if (stats) {
      console.log(
        `Override delta: ${stats.included} tokens included ` +
          `(${stats.overrides} overrides checked, ${stats.total} total)`,
      );
    }
    for (const dest of written) {
      console.log(`  ${dest} -> ${resolve(outRoot, dest)}`);
    }
    if (written.length === 0) console.log('No output produced (no matching collections).');
    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}
