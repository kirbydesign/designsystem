/**
 * Style Dictionary build orchestration.
 *
 * Turns prepped token trees into CSS files under an output root. Each builder
 * is role-specific (primitives, color primitive, semantic) and returns the
 * relative destinations it wrote, so the CLI can report them.
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import StyleDictionary from 'style-dictionary';
import {
  valueHex,
  valuePxUnit,
  createTransforms,
  filterCollection,
  filterSurface,
  filterSurfaceChart,
} from './sd-transforms.mjs';

const SURFACES = ['base', 'raised', 'brand'];
// The default surface. Its semantic mappings are emitted at `:root` (as well as
// under its own class) so the base theme applies without an explicit class.
// This is the tool's one surface-name policy; everything else is structure-driven.
const DEFAULT_SURFACE = 'base';
const TEMP_PREFIX = '_tmp-';
const AUTOGEN_HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n';

/** Ensures a directory exists. */
function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

/**
 * Builds number/string primitive collections into `primitives/<collection>.css`.
 * One file per collection; references emit as `var()`.
 *
 * @returns {string[]} relative destinations written
 */
export async function buildPrimitives(tokens, { prefix, outDir }) {
  const collectionKeys = Object.keys(tokens);
  if (collectionKeys.length === 0) return [];

  const { namePrimitive } = createTransforms(prefix);
  const files = collectionKeys.map((key) => ({
    destination: `primitives/${key.slice(prefix.length + 1)}.css`,
    format: 'css/variables',
    filter: filterCollection(key),
    options: { selector: ':root', outputReferences: true },
  }));

  const sd = new StyleDictionary({
    tokens,
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [namePrimitive.name]: namePrimitive,
        [valuePxUnit.name]: valuePxUnit,
      },
    },
    platforms: {
      css: {
        transforms: [namePrimitive.name, valuePxUnit.name],
        buildPath: outDir + '/',
        files,
      },
    },
  });

  await sd.buildAllPlatforms();
  return files.map((f) => f.destination);
}

/**
 * Builds a color primitive tree into one file per top-level scope under
 * `primitives/`.
 *
 * Each scope (`system`, `brand`, …) is a self-contained export. Names derive
 * directly from the Figma path via `nameColor` (`system/color/green/500` ->
 * `--kirby-system-color-green-500`), so scopes never collide inside one
 * `:root` and a consuming app can layer a brand scope over the system scope.
 *
 * @returns {string[]} relative destinations written
 */
export async function buildColorPrimitive(colorTree, { prefix, outDir }) {
  const scopes = Object.keys(colorTree);
  if (scopes.length === 0) return [];

  const { nameColor } = createTransforms(prefix);
  const files = scopes.map((scope) => ({
    destination: destinationForScope(scope),
    format: 'css/variables',
    filter: (token) => token.path[0] === scope,
    options: { selector: ':root', outputReferences: false },
  }));

  const sd = new StyleDictionary({
    tokens: colorTree,
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [valueHex.name]: valueHex,
        [nameColor.name]: nameColor,
      },
    },
    platforms: {
      css: {
        transforms: [valueHex.name, 'color/css', nameColor.name],
        buildPath: outDir + '/',
        files,
      },
    },
  });

  await sd.buildAllPlatforms();
  return files.map((f) => f.destination);
}

/** Maps a color scope to its output file. `system` -> `primitives/system-color.css`. */
function destinationForScope(scope) {
  return `primitives/${scope}-color.css`;
}

/**
 * Merges the color primitive tree into the semantic tree so references resolve.
 *
 * A color scope can share a top-level key with a semantic surface (`brand`),
 * so a shallow spread would let one clobber the other. Their children are
 * always disjoint — color scopes nest under `color`, surfaces under categories
 * (`fill`, `content`, …) — so a one-level-deep merge combines them safely.
 */
function mergeColorAndSemantic(colorTree, semanticTokens) {
  const merged = { ...colorTree };
  for (const [key, value] of Object.entries(semanticTokens)) {
    merged[key] = key in merged ? { ...merged[key], ...value } : value;
  }
  return merged;
}

/**
 * Builds per-surface semantic tokens into `semantic/color.css` and
 * `semantic/color-chart.css`. `colorTree` is included only so references
 * resolve; it is filtered out of the emitted files.
 *
 * @returns {string[]} relative destinations written
 */
export async function buildSemantic(colorTree, semanticTokens, { prefix, outDir }) {
  const surfaces = SURFACES.filter((s) => semanticTokens[s]);
  if (surfaces.length === 0) return [];

  const { nameSemantic } = createTransforms(prefix);
  const semanticDir = resolve(outDir, 'semantic');
  ensureDir(semanticDir);

  const files = [];
  for (const surface of surfaces) {
    const selector =
      surface === DEFAULT_SURFACE
        ? `:root, .${prefix}-theme-${surface}`
        : `.${prefix}-theme-${surface}`;
    files.push({
      destination: `${TEMP_PREFIX}${surface}.css`,
      format: 'css/variables',
      filter: filterSurface(surface),
      options: { selector, outputReferences: true },
    });
    files.push({
      destination: `${TEMP_PREFIX}chart-${surface}.css`,
      format: 'css/variables',
      filter: filterSurfaceChart(surface),
      options: { selector, outputReferences: true },
    });
  }

  const sd = new StyleDictionary({
    tokens: mergeColorAndSemantic(colorTree, semanticTokens),
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [valueHex.name]: valueHex,
        [nameSemantic.name]: nameSemantic,
      },
    },
    platforms: {
      css: {
        transforms: [valueHex.name, 'color/css', nameSemantic.name],
        buildPath: semanticDir + '/',
        files,
      },
    },
  });

  await sd.buildAllPlatforms();

  const written = [];
  const semantic = mergeSurfaceFiles(semanticDir, 'color.css', surfaces.map((s) => s));
  if (semantic) written.push('semantic/color.css');
  const chart = mergeSurfaceFiles(semanticDir, 'color-chart.css', surfaces.map((s) => `chart-${s}`));
  if (chart) written.push('semantic/color-chart.css');
  return written;
}

/**
 * Merges per-surface temp files into a single output file, stripping the
 * per-file auto-generated header and writing one. Returns true if it wrote a
 * non-empty file, false (and writes nothing) when every block was empty.
 */
function mergeSurfaceFiles(dir, outputName, surfaces) {
  const blocks = [];
  for (const surface of surfaces) {
    const tmpPath = resolve(dir, `${TEMP_PREFIX}${surface}.css`);
    if (!existsSync(tmpPath)) continue;
    const content = readFileSync(tmpPath, 'utf-8');
    const stripped = content.replace(/\/\*\*[\s\S]*?\*\/\s*\n/, '').trim();
    if (stripped) blocks.push(stripped);
    unlinkSync(tmpPath);
  }

  if (blocks.length === 0) return false;
  writeFileSync(resolve(dir, outputName), AUTOGEN_HEADER + '\n' + blocks.join('\n\n') + '\n');
  return true;
}

/** Reads and JSON-parses a file, throwing a clear error when missing. */
export function readJson(label, filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
