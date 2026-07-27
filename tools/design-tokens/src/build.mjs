/**
 * Style Dictionary orchestration.
 *
 * One build, driven entirely by the emissions the rule engine produced. Each
 * emission is an (output file, rule, selector, section) tuple; Style Dictionary
 * writes one temporary block per emission, and blocks sharing an output file
 * are concatenated under a single generated header — grouped by section, each
 * section behind a comment naming it.
 *
 * Nothing here knows what a surface, a tier or a category is; "section" is
 * whatever the config's `section` template resolved to.
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import StyleDictionary from 'style-dictionary';

import { valueHex, valueUnit, nameFromRule, filterEmission } from './sd-transforms.mjs';

const TEMP_DIR = '.design-tokens-tmp';
const HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n';
const VARIABLE = /^\s*(--[\w-]+)\s*:/;

/** Style Dictionary writes one file per emission; this names the temp file. */
const tempName = (index) => `${index}.css`;

/**
 * Strips Style Dictionary's per-file header and surrounding blank lines.
 * Each emission contributes one selector block; we supply a single header for
 * the merged file instead.
 */
function stripHeader(content) {
  return content.replace(/\/\*\*[\s\S]*?\*\/\s*\n/, '').trim();
}

/** The custom-property names declared in one emitted block. */
function declaredNames(block) {
  return block
    .split('\n')
    .map((line) => line.match(VARIABLE)?.[1])
    .filter(Boolean);
}

/**
 * Warns when blocks sharing an output file *and section* declare different
 * variable sets.
 *
 * Each surface is supposed to define the *full* contract, not a delta against
 * another surface — so an asymmetry means a component reading the missing
 * variable inside that surface silently inherits another surface's value
 * through the cascade. In practice this catches Figma naming typos.
 *
 * Sections scope the comparison: blocks are only expected to match their
 * siblings within the same section, so a group that exists on one surface
 * only is not reported against groups it has nothing to do with.
 */
function completenessWarnings(output, blocks) {
  const sets = blocks.map(({ emission, block }) => ({
    selector: emission.selector,
    names: new Set(declaredNames(block)),
  }));
  if (sets.length < 2) return [];

  const where = blocks[0].emission.section ? `${output} [${blocks[0].emission.section}]` : output;
  const union = new Set(sets.flatMap((s) => [...s.names]));
  const warnings = [];
  for (const { selector, names } of sets) {
    const missing = [...union].filter((n) => !names.has(n));
    if (missing.length > 0) {
      warnings.push(
        `${where}: "${selector}" is missing ${missing.length} variable(s) ` +
          `declared by a sibling block: ${missing.join(', ')}`,
      );
    }
  }
  return warnings;
}

/**
 * Splits a file's blocks into sections, preserving first-seen order.
 * A file whose rules declare no `section` yields a single unlabelled group.
 */
function bySection(blocks) {
  const sections = new Map();
  for (const entry of blocks) {
    const key = entry.emission.section ?? '';
    if (!sections.has(key)) sections.set(key, []);
    sections.get(key).push(entry);
  }
  return sections;
}

/** Renders one file: a header, then each section behind its own comment. */
function render(sections) {
  const parts = [];
  for (const [section, blocks] of sections) {
    if (section) parts.push(`/*\n * ${section}\n */`);
    parts.push(...blocks.map((b) => b.block));
  }
  return HEADER + '\n' + parts.join('\n\n') + '\n';
}

/**
 * Runs the Style Dictionary build.
 *
 * @param {object} tokens SD-ready tree from `prepare`
 * @param {Array} emissions from `prepare`
 * @param {string} outDir output root
 * @returns {Promise<{ written: string[], warnings: string[] }>}
 */
export async function build(tokens, emissions, outDir) {
  if (emissions.length === 0) return { written: [], warnings: [] };

  const tempRoot = resolve(outDir, TEMP_DIR);
  mkdirSync(tempRoot, { recursive: true });

  const files = emissions.map((emission, index) => ({
    destination: tempName(index),
    format: 'css/variables',
    filter: filterEmission(emission.key),
    options: { selector: emission.selector, outputReferences: emission.outputReferences },
  }));

  const sd = new StyleDictionary({
    tokens,
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [valueHex.name]: valueHex,
        [valueUnit.name]: valueUnit,
        [nameFromRule.name]: nameFromRule,
      },
    },
    platforms: {
      css: {
        transforms: [valueHex.name, 'color/css', valueUnit.name, nameFromRule.name],
        buildPath: tempRoot + '/',
        files,
      },
    },
  });

  try {
    await sd.buildAllPlatforms();

    // Group the emitted blocks by their destination file, preserving order.
    const grouped = new Map();
    for (const [index, emission] of emissions.entries()) {
      const tempPath = join(tempRoot, tempName(index));
      if (!existsSync(tempPath)) continue;
      const block = stripHeader(readFileSync(tempPath, 'utf-8'));
      unlinkSync(tempPath);
      if (!block) continue;
      if (!grouped.has(emission.output)) grouped.set(emission.output, []);
      grouped.get(emission.output).push({ emission, block });
    }

    const written = [];
    const warnings = [];
    for (const [output, blocks] of grouped) {
      const dest = resolve(outDir, output);
      const sections = bySection(blocks);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, render(sections));
      written.push(output);
      for (const group of sections.values()) {
        warnings.push(...completenessWarnings(output, group));
      }
    }
    return { written, warnings };
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

/** Reads and JSON-parses a file, throwing a clear error when missing. */
export function readJson(label, filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
