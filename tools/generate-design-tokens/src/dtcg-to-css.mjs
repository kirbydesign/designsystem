import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { getReferences } from 'style-dictionary/utils';
import { isVisibleFrom, ROOT_SELECTOR, routeTokens, splitSelectorList } from './routing.mjs';
import { tokenKey } from './tokens.mjs';
import { dimensionTransform, percentageTransform, shadowTransform } from './units.mjs';

const FILE_HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n';
const DECLARATION = /^\s*(--[\w-]+):\s*(.*);\s*$/;
const EMPTY_RULE_BLOCK = /[^{}\n]+\{\s*\}/g;
const ROOT_TOKEN_REFERENCE = /\{([^{}]+\.\$root)\}/g;

/**
 * @param {object} options
 * @param {Map} options.routes from `routeTokens`
 * @param {Array} options.emissions from `routeTokens`
 * @param {string} options.outDir
 * @param {string} options.sourceFile DTCG document that `routes` were computed from
 * @param {object} options.config validated by `validateConfig`
 * @param {{ file: string, tokens: object }|null} [options.baseline] DTCG document to build on;
 *   only declarations that differ from it are written
 * @param {string|null} [options.scssMixin] writes all outputs as one SCSS mixin with this name
 * @returns {Promise<{ written: string[], warnings: string[] }>}
 */
export async function writeCss({
  routes,
  emissions,
  outDir,
  sourceFile,
  config,
  baseline = null,
  scssMixin = null,
}) {
  if (emissions.length === 0 && !baseline) return { written: [], warnings: [] };

  const formattedBaseline = baseline ? await formatBaseline(baseline, config) : null;
  const sourceBlocks =
    emissions.length > 0
      ? await formatEmissionBlocks({
          tokensFile: sourceFile,
          includeFile: baseline?.file ?? null,
          routes,
          emissions,
          config,
          onlySourceTokens: true,
        })
      : [];
  const blocksByOutput = groupBlocksByOutput(emissions, sourceBlocks, formattedBaseline);
  return writeCssFiles(blocksByOutput, outDir, {
    reportMissingSiblingVariables: !baseline,
    scssMixin,
  });
}

async function formatBaseline(baseline, config) {
  const { routes, emissions } = routeTokens(baseline.tokens, config);
  const blocks = await formatEmissionBlocks({
    tokensFile: baseline.file,
    includeFile: null,
    routes,
    emissions,
    config,
    onlySourceTokens: false,
  });
  return {
    emissions,
    blocksByEmissionKey: new Map(emissions.map((emission, index) => [emission.key, blocks[index]])),
  };
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

function writeCssFiles(blocksByOutput, outDir, { reportMissingSiblingVariables, scssMixin }) {
  const sectionsByOutput = new Map(
    [...blocksByOutput].map(([output, blocks]) => [
      output,
      Map.groupBy(blocks, ({ emission }) => emission.section ?? ''),
    ])
  );
  const warnings = reportMissingSiblingVariables
    ? [...sectionsByOutput].flatMap(([output, sections]) =>
        [...sections.values()].flatMap((blocks) => missingSiblingVariableWarnings(output, blocks))
      )
    : [];
  const files = scssMixin
    ? new Map([[`_${scssMixin}.scss`, renderScssMixin(scssMixin, sectionsByOutput)]])
    : new Map([...sectionsByOutput].map(([output, sections]) => [output, renderCssFile(sections)]));
  for (const [file, contents] of files) {
    writeFileCreatingDirectories(resolve(outDir, file), contents);
  }
  return { written: [...files.keys()], warnings };
}

async function formatEmissionBlocks({
  tokensFile,
  includeFile,
  routes,
  emissions,
  config,
  onlySourceTokens,
}) {
  const percentage = percentageTransform(config);
  const variableName = variableNameTransform(routes);
  const styleDictionary = new StyleDictionary({
    source: [tokensFile],
    ...(includeFile ? { include: [includeFile] } : {}),
    log: { warnings: 'disabled', verbosity: 'silent' },
    hooks: {
      transforms: {
        [dimensionTransform.name]: dimensionTransform,
        [shadowTransform.name]: shadowTransform,
        [percentage.name]: percentage,
        [variableName.name]: variableName,
      },
    },
    platforms: {
      css: {
        transforms: [
          'color/css',
          dimensionTransform.name,
          shadowTransform.name,
          percentage.name,
          variableName.name,
        ],
        files: emissions.map((emission) => cssFileFor(emission, routes, onlySourceTokens)),
      },
    },
  });
  const formatted = await styleDictionary.formatPlatform('css');
  return emissions.map((_, index) => withRootAsVariable(formatted[index].output.trim(), routes));
}

function withRootAsVariable(css, routes) {
  return css.replace(ROOT_TOKEN_REFERENCE, (reference, path) => {
    const name = routes.get(path.replaceAll('.', '/'))?.name;
    return name ? `var(--${name})` : reference;
  });
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
      showFileHeader: false,
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
  if (!target?.name || !current) return false;
  return target.name !== current.name && isVisibleFrom(target, current);
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

function missingSiblingVariableWarnings(output, blocks) {
  if (blocks.length < 2) return [];

  const declared = blocks.map(({ emission, block }) => ({
    selector: emission.selector,
    names: new Set(declarationValues(block).keys()),
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

function renderScssMixin(name, sectionsByOutput) {
  const sections = [...sectionsByOutput.values()].flatMap((outputSections) => [...outputSections]);
  const sectionsWhere = (predicate) =>
    sections.map(([section, blocks]) => [section, blocks.filter(predicate)]);
  const parts = [...sectionsWhere(isRootOnly), ...sectionsWhere((block) => !isRootOnly(block))]
    .filter(([, blocks]) => blocks.length > 0)
    .flatMap(([section, blocks]) => [
      ...(section ? [sectionBanner(section)] : []),
      ...blocks.map(renderMixinBlock),
    ]);
  return `${FILE_HEADER}\n@mixin ${name} {\n${indent(parts.join('\n\n'))}\n}\n`;
}

function isRootOnly({ emission }) {
  return emission.selector === ROOT_SELECTOR;
}

function renderMixinBlock({ emission, block }) {
  const [, ...body] = block.split('\n').slice(0, -1);
  if (isRootOnly({ emission })) return body.map((line) => line.replace(/^ {2}/, '')).join('\n');
  return [`${relativeToMixinHost(emission.selector)} {`, ...body, '}'].join('\n');
}

function relativeToMixinHost(selectorList) {
  return splitSelectorList(selectorList)
    .map((selector) => {
      if (selector.startsWith(ROOT_SELECTOR)) return `&${selector.slice(ROOT_SELECTOR.length)}`;
      if (selector.includes(ROOT_SELECTOR)) {
        throw new Error(`Cannot nest "${selector}" in an SCSS mixin: ${ROOT_SELECTOR} must lead`);
      }
      return selector;
    })
    .join(',\n');
}

function indent(text) {
  return text
    .split('\n')
    .map((line) => (line ? `  ${line}` : line))
    .join('\n');
}

function sectionBanner(section) {
  return `/*\n * ${section}\n */`;
}

function writeFileCreatingDirectories(filePath, contents) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}
