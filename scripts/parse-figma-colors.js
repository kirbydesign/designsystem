/**
 * Parses Figma-exported token files and transforms them into
 * style-dictionary compatible format using the surface-as-override pattern.
 *
 * Inputs (positional CLI arguments):
 *   1. kirby-palette   — Shared Kirby palette primitives (Collection 1, tier 1)
 *   2. brand-palette   — Brand-specific palette primitives (Collection 1, tier 2)
 *   3. semantic-tokens — Semantic tokens with 3 surface modes (Collection 2)
 *
 * Produces:
 *   - tokens/color-palette.json: Palette with two tiers (no brand name in paths):
 *                                   core           = shared Kirby colors
 *                                   brand-palette  = brand-specific colors
 *   - tokens/colors.json:        Semantic tokens using surface-as-override:
 *                                   base   = full token set (~335 tokens)
 *                                   raised = only tokens that differ from base
 *                                   brand  = only tokens that differ from base
 *
 * Usage:
 *   node scripts/parse-figma-colors.js <kirby-palette> <brand-palette> <semantic-tokens>
 *
 * Example:
 *   node scripts/parse-figma-colors.js kirby-tier-1.json jb-tier-1.json jb-sematic-tokens.json
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- CLI argument parsing ---
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: node scripts/parse-figma-colors.js <kirby-palette> <brand-palette> <semantic-tokens>

Positional arguments:
  kirby-palette    Path to shared Kirby palette primitives JSON (e.g. kirby-tier-1.json)
  brand-palette    Path to brand-specific palette primitives JSON (e.g. jb-tier-1.json)
  semantic-tokens  Path to semantic tokens JSON with surface modes (e.g. jb-sematic-tokens.json)

Outputs:
  tokens/color-palette.json   Palette primitives (core + brand-palette tiers)
  tokens/colors.json          Semantic tokens (base full + raised/brand deltas)`);
  process.exit(0);
}

if (args.length !== 3) {
  console.error(
    `Error: expected 3 arguments, got ${args.length}\n` +
      'Usage: node scripts/parse-figma-colors.js <kirby-palette> <brand-palette> <semantic-tokens>\n' +
      'Run with --help for details.',
  );
  process.exit(1);
}

const [kirbyPaletteArg, brandPaletteArg, semanticArg] = args;

// Resolve paths relative to cwd (works for both local and CI invocations)
const kirbyPalettePath = resolve(kirbyPaletteArg);
const brandPalettePath = resolve(brandPaletteArg);
const semanticPath = resolve(semanticArg);

// Validate all input files exist before doing any work
for (const [label, filePath] of [
  ['kirby-palette', kirbyPalettePath],
  ['brand-palette', brandPalettePath],
  ['semantic-tokens', semanticPath],
]) {
  if (!existsSync(filePath)) {
    console.error(`Error: ${label} file not found: ${filePath}`);
    process.exit(1);
  }
}

// --- Output paths ---
const paletteOutputPath = resolve(ROOT, 'tokens/color-palette.json');
const semanticOutputPath = resolve(ROOT, 'tokens/colors.json');

// --- Configuration ---
// Figma collection name for the shared Kirby palette (constant across brands)
const KIRBY_PALETTE_SET = '08 Kirby Palette';
const MODES = ['base', 'raised', 'brand'];

// --- Helpers ---

/**
 * Sets a value at a nested path in an object, creating intermediate objects as needed.
 */
function setNestedValue(obj, pathParts, value) {
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];
    if (!(key in current)) current[key] = {};
    current = current[key];
  }
  current[pathParts[pathParts.length - 1]] = value;
}

/**
 * Checks if an object is a token node (has $type and $value).
 */
function isTokenNode(obj) {
  return obj && typeof obj === 'object' && '$type' in obj && '$value' in obj;
}

/**
 * Recursively collects all token leaf nodes from a nested object.
 * Returns an array of { path: string[], node: object }.
 */
function collectTokens(obj, path = []) {
  const tokens = [];
  if (isTokenNode(obj)) {
    tokens.push({ path, node: obj });
    return tokens;
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue; // Skip $extensions etc. at group level
      tokens.push(...collectTokens(value, [...path, key]));
    }
  }
  return tokens;
}

/**
 * Discovers the brand palette set name from the semantic tokens file.
 *
 * Scans all alias references in the semantic tokens and collects unique
 * targetVariableSetName values. The brand palette set is whichever one
 * isn't the shared Kirby palette.
 */
function detectBrandPaletteSet(semanticData) {
  const sets = new Set();

  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    const aliasData = obj.$extensions?.['com.figma.aliasData'];
    if (aliasData?.targetVariableSetName) {
      sets.add(aliasData.targetVariableSetName);
      return;
    }
    for (const [key, value] of Object.entries(obj)) {
      if (!key.startsWith('$')) walk(value);
    }
  }

  for (const mode of MODES) {
    if (semanticData[mode]) walk(semanticData[mode]);
  }

  // Remove the known Kirby palette set — whatever remains is the brand set
  sets.delete(KIRBY_PALETTE_SET);

  if (sets.size === 0) {
    console.error(
      'Error: could not detect brand palette set name from semantic tokens.\n' +
        `Only found references to "${KIRBY_PALETTE_SET}".`,
    );
    process.exit(1);
  }
  if (sets.size > 1) {
    console.warn(
      `  ⚠ Found multiple non-Kirby palette sets: ${[...sets].join(', ')}\n` +
        `  Using the first one.`,
    );
  }

  return [...sets][0];
}

/**
 * Resolves a Figma alias reference to a DTCG reference string.
 *
 * Kirby palette:  targetVariableName "kirby/color/white/00"  → "{core.white.00}"
 * Brand palette:  targetVariableName "sand/50"               → "{brand-palette.sand.50}"
 */
function resolveAlias(aliasData, brandPaletteSet) {
  if (!aliasData?.targetVariableName) return null;

  const name = aliasData.targetVariableName;
  const setName = aliasData.targetVariableSetName;

  if (setName === KIRBY_PALETTE_SET) {
    // "kirby/color/white/00" → strip "kirby/color/" → "white/00" → "white.00"
    const path = name.replace(/^kirby\/color\//, '').replace(/\//g, '.');
    return `{core.${path}}`;
  }

  if (setName === brandPaletteSet) {
    // "sand/50" → "brand-palette.sand.50" (no brand name in path)
    const path = name.replace(/\//g, '.');
    return `{brand-palette.${path}}`;
  }

  // Unknown palette set — warn and return null (caller will fall back to hex)
  console.warn(`  ⚠ Unknown palette set "${setName}" for variable "${name}"`);
  return null;
}

// --- Step 1: Build palette from both tier-1 files ---

function buildPalette() {
  const palette = {};

  // Kirby tier-1: { kirby: { color: { "light-grey": { "25": {…} } } } }
  // → output under "core" (strip "kirby/color" wrapper)
  const kirbyRaw = JSON.parse(readFileSync(kirbyPalettePath, 'utf-8'));
  const kirbyColors = kirbyRaw.kirby?.color || kirbyRaw.color || kirbyRaw;
  const kirbyTokens = collectTokens(kirbyColors);

  for (const { path, node } of kirbyTokens) {
    const hex = node.$value?.hex ?? node.$value;
    setNestedValue(palette, ['core', ...path], { $type: 'color', $value: hex });
  }

  // Brand tier-1: { "green": { "25": {…} } }
  // → output under "brand-palette" (no brand name in path)
  const brandRaw = JSON.parse(readFileSync(brandPalettePath, 'utf-8'));
  const brandTokens = collectTokens(brandRaw);

  for (const { path, node } of brandTokens) {
    const hex = node.$value?.hex ?? node.$value;
    setNestedValue(palette, ['brand-palette', ...path], {
      $type: 'color',
      $value: hex,
    });
  }

  return palette;
}

// --- Step 2: Build semantic tokens with surface-as-override ---

function buildSemanticTokens() {
  const raw = JSON.parse(readFileSync(semanticPath, 'utf-8'));

  // Auto-detect the brand palette set name from alias references
  const brandPaletteSet = detectBrandPaletteSet(raw);
  console.log(`  Detected brand palette set: "${brandPaletteSet}"`);

  // Collect color tokens per mode
  const modeTokens = {};
  for (const mode of MODES) {
    if (!raw[mode]) {
      console.warn(`  ⚠ Mode "${mode}" not found in semantic tokens`);
      continue;
    }
    modeTokens[mode] = collectTokens(raw[mode]).filter(
      ({ node }) => node.$type === 'color',
    );
  }

  // Build reference map for base mode: "category.token-name" → reference string
  const baseRefMap = new Map();
  for (const { path, node } of modeTokens.base || []) {
    const aliasData = node.$extensions?.['com.figma.aliasData'];
    const ref = resolveAlias(aliasData, brandPaletteSet);
    const value = ref || node.$value?.hex || node.$value;
    baseRefMap.set(path.join('.'), value);
  }

  const result = {};
  const warnings = [];

  // Base mode: include ALL color tokens (full theme definition)
  for (const { path, node } of modeTokens.base || []) {
    const aliasData = node.$extensions?.['com.figma.aliasData'];
    const ref = resolveAlias(aliasData, brandPaletteSet);
    const value = ref || node.$value?.hex || node.$value;

    setNestedValue(result, ['base', ...path], {
      $type: 'color',
      $value: value,
    });
  }

  // Raised & brand modes: only include tokens whose value differs from base
  for (const mode of ['raised', 'brand']) {
    let total = 0;
    let included = 0;
    let skipped = 0;
    let newTokens = 0;

    for (const { path, node } of modeTokens[mode] || []) {
      total++;

      const aliasData = node.$extensions?.['com.figma.aliasData'];
      const ref = resolveAlias(aliasData, brandPaletteSet);
      const value = ref || node.$value?.hex || node.$value;
      const key = path.join('.');
      const baseValue = baseRefMap.get(key);

      // If token exists in base with the same value, skip it (inherit via CSS cascade)
      if (baseValue !== undefined && baseValue === value) {
        skipped++;
        continue;
      }

      // Token is new or differs from base → include in this mode's overrides
      if (baseValue === undefined) {
        newTokens++;
        warnings.push(
          `${mode}.${key}: exists only in "${mode}" mode, not in base`,
        );
      }

      included++;
      setNestedValue(result, [mode, ...path], {
        $type: 'color',
        $value: value,
      });
    }

    // Check for base tokens missing from this mode
    const modeKeys = new Set((modeTokens[mode] || []).map(({ path }) => path.join('.')));
    for (const baseKey of baseRefMap.keys()) {
      if (!modeKeys.has(baseKey)) {
        warnings.push(
          `${mode}: base token "${baseKey}" is missing from "${mode}" mode (will inherit base value)`,
        );
      }
    }

    console.log(
      `  ${mode}: ${included} overrides + ${skipped} inherited = ${total} total` +
        (newTokens ? ` (${newTokens} new tokens not in base)` : ''),
    );
  }

  if (warnings.length) {
    console.log(`\n⚠ Warnings (${warnings.length}):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }

  return result;
}

// --- Main ---

console.log('Building palette from tier-1 files…');
const palette = buildPalette();

console.log('Building semantic tokens with surface-as-override…');
const semanticTokens = buildSemanticTokens();

// Write outputs
writeFileSync(paletteOutputPath, JSON.stringify(palette, null, 2) + '\n');
writeFileSync(semanticOutputPath, JSON.stringify(semanticTokens, null, 2) + '\n');

// Summary
const paletteCount = collectTokens(palette).length;
const baseCount = collectTokens(semanticTokens.base || {}).length;
const raisedCount = collectTokens(semanticTokens.raised || {}).length;
const brandCount = collectTokens(semanticTokens.brand || {}).length;

console.log(`\n✓ Palette: ${paletteCount} primitives → ${paletteOutputPath}`);
console.log(`✓ Semantic tokens → ${semanticOutputPath}`);
console.log(`    base:   ${baseCount} tokens (full theme)`);
console.log(`    raised: ${raisedCount} tokens (overrides only)`);
console.log(`    brand:  ${brandCount} tokens (overrides only)`);
console.log(
  `    Total:  ${baseCount + raisedCount + brandCount} definitions (was ${baseCount * 3} with full duplication)`,
);
