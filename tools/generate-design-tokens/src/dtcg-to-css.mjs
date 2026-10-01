import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { getReferences } from 'style-dictionary/utils';
import { routeTokens, splitSelectorList } from './routing.mjs';
import { readJson, tokenKey } from './tokens.mjs';
import { dimensionTransform, percentageTransform } from './units.mjs';

const FILE_HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n';
const STYLE_DICTIONARY_FILE_HEADER = /\/\*\*[\s\S]*?\*\/\s*\n/;
const VARIABLE_NAME = /^\s*(--[\w-]+)\s*:/;
const DECLARATION = /^\s*(--[\w-]+):\s*(.*);\s*$/;
const EMPTY_RULE_BLOCK = /[^{}\n]+\{\s*\}/g;
const ROOT_SELECTOR = ':root';

/**
 * @param {Map} routes from `routeTokens`
 * @param {Array} emissions from `routeTokens`
 * @returns {Promise<{ written: string[], warnings: string[] }>}
 */
export async function writeCss(
  routes,
  emissions,
  outDir,
  sourceFile,
  baselineFile = null,
  units = [],
  config = null
) {
  if (emissions.length === 0 && !baselineFile) return { written: [], warnings: [] };

  const baseline = baselineFile ? await formatBaseline(baselineFile, config, units) : null;
  const sourceBlocks = await formatSourceBlocks({
    sourceFile,
    baselineFile,
    routes,
    emissions,
    units,
  });
  const blocksByOutput = groupBlocksByOutput(emissions, sourceBlocks, baseline);
  return writeCssFiles(blocksByOutput, outDir, { reportMissingSiblingVariables: !baseline });
}

async function formatBaseline(baselineFile, config, units) {
  if (!config) throw new Error('Config is required when comparing against a baseline');
  const { routes, emissions } = routeTokens(readJson('baseline tokens', baselineFile), config);
  const blocks = await formatEmissionBlocks({
    tokensFile: baselineFile,
    includeFile: null,
    routes,
    emissions,
    units,
    onlySourceTokens: false,
  });
  return {
    emissions,
    blocksByEmissionKey: new Map(emissions.map((emission, index) => [emission.key, blocks[index]])),
  };
}

async function formatSourceBlocks({ sourceFile, baselineFile, routes, emissions, units }) {
  if (emissions.length === 0) return [];
  return formatEmissionBlocks({
    tokensFile: sourceFile,
    includeFile: baselineFile,
    routes,
    emissions,
    units,
    onlySourceTokens: true,
  });
}

function groupBlocksByOutput(emissions, sourceBlocks, baseline) {
  const allEmissions = [...(baseline?.emissions ?? []), ...emissions];
  const blocksByOutput = new Map(allEmissions.map((emission) => [emission.output, []]));
  for (const [index, emission] of emissions.entries()) {
    const block = baseline
      ? withoutDeclarationsSameAsBaseline(
          sourceBlocks[index],
          baseline.blocksByEmissionKey.get(emission.key) ?? ''
        )
      : sourceBlocks[index];
    if (block) blocksByOutput.get(emission.output).push({ emission, block });
  }
  return blocksByOutput;
}

function writeCssFiles(blocksByOutput, outDir, { reportMissingSiblingVariables }) {
  const written = [];
  const warnings = [];
  for (const [output, blocks] of blocksByOutput) {
    const sections = Map.groupBy(blocks, ({ emission }) => emission.section ?? '');
    writeFileCreatingDirectories(resolve(outDir, output), renderCssFile(sections));
    written.push(output);
    if (reportMissingSiblingVariables) {
      for (const sectionBlocks of sections.values()) {
        warnings.push(...missingSiblingVariableWarnings(output, sectionBlocks));
      }
    }
  }
  return { written, warnings };
}

async function formatEmissionBlocks({
  tokensFile,
  includeFile,
  routes,
  emissions,
  units,
  onlySourceTokens,
}) {
  const percentage = percentageTransform(units);
  const variableName = variableNameTransform(routes);
  const styleDictionary = new StyleDictionary({
    source: [tokensFile],
    ...(includeFile ? { include: [includeFile] } : {}),
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [dimensionTransform.name]: dimensionTransform,
        [percentage.name]: percentage,
        [variableName.name]: variableName,
      },
    },
    platforms: {
      css: {
        transforms: ['color/css', dimensionTransform.name, percentage.name, variableName.name],
        files: emissions.map((emission) => cssFileFor(emission, routes, onlySourceTokens)),
      },
    },
  });
  const formatted = await styleDictionary.formatPlatform('css');
  return emissions.map((_, index) => withoutFileHeader(formatted[index].output));
}

function variableNameTransform(routes) {
  return {
    name: 'name/rule',
    type: 'name',
    transform: (token) => routes.get(tokenKey(token.path))?.name ?? token.path.join('-'),
  };
}

function cssFileFor(emission, routes, onlySourceTokens) {
  return {
    format: 'css/variables',
    filter: (token) =>
      (!onlySourceTokens || token.isSource) &&
      routes.get(tokenKey(token.path))?.emission === emission.key,
    options: {
      selector: emission.selector,
      outputReferences: emission.outputReferences && referencesRenderableAsVariables(routes),
    },
  };
}

function referencesRenderableAsVariables(routes) {
  return (token, { dictionary, usesDtcg }) => {
    const current = routes.get(tokenKey(token.path));
    return getReferences(token.original.$value, dictionary.unfilteredTokens, { usesDtcg }).every(
      (reference) => canReferenceAsVariable(routes.get(tokenKey(reference.path)), current)
    );
  };
}

function canReferenceAsVariable(target, current) {
  if (!target?.name) return false;
  const isAnotherVariable = target.name !== current?.name;
  const isVisibleFromCurrent =
    includesRootSelector(target.selector) || target.selector === current?.selector;
  return isAnotherVariable && isVisibleFromCurrent;
}

function includesRootSelector(selectorList) {
  return splitSelectorList(selectorList ?? '').includes(ROOT_SELECTOR);
}

function withoutFileHeader(css) {
  return css.replace(STYLE_DICTIONARY_FILE_HEADER, '').trim();
}

function withoutDeclarationsSameAsBaseline(block, baselineBlock) {
  const baselineValues = declarationValues(baselineBlock);
  return block
    .split('\n')
    .filter((line) => {
      const [, name, value] = line.match(DECLARATION) ?? [];
      return !name || baselineValues.get(name) !== value;
    })
    .join('\n')
    .replace(EMPTY_RULE_BLOCK, '')
    .trim();
}

function declarationValues(block) {
  return new Map(
    block.split('\n').flatMap((line) => {
      const [, name, value] = line.match(DECLARATION) ?? [];
      return name ? [[name, value]] : [];
    })
  );
}

function declaredVariableNames(block) {
  return block
    .split('\n')
    .map((line) => line.match(VARIABLE_NAME)?.[1])
    .filter(Boolean);
}

function missingSiblingVariableWarnings(output, blocks) {
  if (blocks.length < 2) return [];

  const declared = blocks.map(({ emission, block }) => ({
    selector: emission.selector,
    names: new Set(declaredVariableNames(block)),
  }));
  const allNames = new Set(declared.flatMap(({ names }) => [...names]));
  const location = sectionLocation(output, blocks[0].emission.section);
  return declared
    .map(({ selector, names }) => ({
      selector,
      missing: [...allNames].filter((name) => !names.has(name)),
    }))
    .filter(({ missing }) => missing.length > 0)
    .map(
      ({ selector, missing }) =>
        `${location}: "${selector}" is missing ${missing.length} variable(s) ` +
        `declared by a sibling block: ${missing.join(', ')}`
    );
}

function sectionLocation(output, section) {
  return section ? `${output} [${section}]` : output;
}

function renderCssFile(sections) {
  const parts = [];
  for (const [section, blocks] of sections) {
    if (section) parts.push(sectionBanner(section));
    parts.push(...blocks.map(({ block }) => block));
  }
  return `${FILE_HEADER}\n${parts.join('\n\n')}\n`;
}

function sectionBanner(section) {
  return `/*\n * ${section}\n */`;
}

function writeFileCreatingDirectories(filePath, contents) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}
