/**
 * Style Dictionary orchestration.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { getReferences } from 'style-dictionary/utils';
import { matchesAny } from './rules.mjs';
import { prepare } from './resolve.mjs';

import { valueDimension, valuePercentage } from './dimension.mjs';

const HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n';
const VARIABLE = /^\s*(--[\w-]+)\s*:/;

/**
 * Strips Style Dictionary's per-file header and surrounding blank lines.
 */
function stripHeader(content) {
  return content.replace(/\/\*\*[\s\S]*?\*\/\s*\n/, '').trim();
}

function declaredNames(block) {
  return block
    .split('\n')
    .map((line) => line.match(VARIABLE)?.[1])
    .filter(Boolean);
}

/**
 * Warns when blocks sharing an output file *and section* declare different
 * variable sets.
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
          `declared by a sibling block: ${missing.join(', ')}`
      );
    }
  }
  return warnings;
}

/**
 * Splits a file's blocks into sections, preserving order.
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

function declarations(block) {
  return new Map(
    block.split('\n').flatMap((line) => {
      const match = line.match(/^\s*(--[\w-]+):\s*(.*);\s*$/);
      return match ? [[match[1], match[2]]] : [];
    })
  );
}

function withoutBaselineDeclarations(block, baselineBlock) {
  const baseline = declarations(baselineBlock);
  return block
    .split('\n')
    .filter((line) => {
      const match = line.match(/^(\s*)(--[\w-]+):\s*(.*);\s*$/);
      return !match || baseline.get(match[2]) !== match[3];
    })
    .join('\n')
    .replace(/[^{}\n]+\{\s*\}/g, '')
    .trim();
}

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
 * @param {Map} routes CSS routing information from `prepare`
 * @param {Array} emissions from `prepare`
 * @param {string} outDir output root
 * @returns {Promise<{ written: string[], warnings: string[] }>}
 */
export async function build(
  routes,
  emissions,
  outDir,
  sourceFile,
  baselineFile = null,
  units = [],
  config = null
) {
  if (emissions.length === 0 && !baselineFile) return { written: [], warnings: [] };

  const format = async (
    tokensFile,
    includeFile,
    tokenRoutes,
    tokenEmissions,
    sourceOnly = true
  ) => {
    const files = tokenEmissions.map((emission) => ({
      format: 'css/variables',
      filter: (token) =>
        (!sourceOnly || token.isSource) &&
        tokenRoutes.get(token.path.join('/'))?.emission === emission.key,
      options: {
        selector: emission.selector,
        outputReferences:
          emission.outputReferences &&
          ((token, { dictionary, usesDtcg }) =>
            getReferences(token.original.$value, dictionary.unfilteredTokens, { usesDtcg }).every(
              (reference) => {
                const name = tokenRoutes.get(reference.path.join('/'))?.name;
                const target = tokenRoutes.get(reference.path.join('/'));
                const current = tokenRoutes.get(token.path.join('/'));
                return (
                  name &&
                  name !== current?.name &&
                  (target?.selector?.split(',').some((part) => part.trim() === ':root') ||
                    target?.selector === current?.selector)
                );
              }
            )),
      },
    }));
    const sd = new StyleDictionary({
      source: [tokensFile],
      ...(includeFile ? { include: [includeFile] } : {}),
      log: { warnings: 'disabled', verbosity: 'silent' },
      hooks: {
        transforms: {
          [valueDimension.name]: valueDimension,
          [valuePercentage.name]: {
            ...valuePercentage,
            filter: (token) =>
              token.$type === 'number' &&
              units.some(
                (unit) =>
                  unit.suffix === '%' &&
                  (token.original?.$extensions?.['com.figma.scopes']?.some((scope) =>
                    unit.scopes.has(scope)
                  ) ||
                    matchesAny(unit.paths, token.path))
              ),
          },
          'name/rule': {
            name: 'name/rule',
            type: 'name',
            transform: (token) =>
              tokenRoutes.get(token.path.join('/'))?.name ?? token.path.join('-'),
          },
        },
      },
      platforms: {
        css: {
          transforms: ['color/css', valueDimension.name, valuePercentage.name, 'name/rule'],
          files,
        },
      },
    });
    return sd.formatPlatform('css');
  };
  let baselineBlocks = new Map();
  let baselineEmissions = [];
  if (baselineFile) {
    if (!config) throw new Error('Config is required when comparing against a baseline');
    const baseline = readJson('baseline tokens', baselineFile);
    const prepared = prepare(baseline, config);
    baselineEmissions = prepared.emissions;
    const baselineFormatted = await format(
      baselineFile,
      null,
      prepared.routes,
      prepared.emissions,
      false
    );
    baselineBlocks = new Map(
      prepared.emissions.map((emission, index) => [
        emission.key,
        stripHeader(baselineFormatted[index].output),
      ])
    );
  }
  const formatted =
    emissions.length > 0 ? await format(sourceFile, baselineFile, routes, emissions) : [];
  const grouped = new Map();
  for (const emission of [...baselineEmissions, ...emissions]) {
    if (!grouped.has(emission.output)) grouped.set(emission.output, []);
  }
  for (const [index, emission] of emissions.entries()) {
    let block = stripHeader(formatted[index].output);
    if (baselineFile)
      block = withoutBaselineDeclarations(block, baselineBlocks.get(emission.key) ?? '');
    if (!block) continue;
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
    if (!baselineFile) {
      for (const group of sections.values()) {
        warnings.push(...completenessWarnings(output, group));
      }
    }
  }
  return { written, warnings };
}

/** Reads and JSON-parses a file, throwing a clear error when missing. */
export function readJson(label, filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
