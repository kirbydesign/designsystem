#!/usr/bin/env node
/**
 * Lists custom UI that may duplicate a Kirby component (lookalikes), and the legacy Kirby design tokens
 * used next to it.
 *
 * Usage:
 *   node find-lookalikes.mjs [paths...] [--json] [--skip-hardcoded] [--all-findings]
 *
 * Paths default to the current working directory. No dependencies.
 * Styling findings are only reported in directories that also contain lookalikes, unless --all-findings is set.
 * Overrides of component variables (e.g. --kirby-card-main-color) are allowed: custom colors are not reported,
 * legacy values are reported in the `override` category, with a suggestion when a no-brainer replacement exists.
 * Component variables are verified against the installed Kirby packages (@kirbydesign/core, designsystem,
 * extensions-angular): other --kirby-* variables are reported in the `unknown-variable` category.
 */
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const STYLE_EXTENSIONS = new Set(['.scss', '.sass', '.css', '.less']);
const TEMPLATE_EXTENSIONS = new Set(['.html']);
const SCRIPT_EXTENSIONS = new Set(['.ts', '.js', '.mjs']);
const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  'dist',
  '.git',
  '.angular',
  '.nx',
  'coverage',
  'www',
  'tmp',
]);

const LEGACY_COLOR_NAMES = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'background-color',
  'white',
  'light',
  'semi-light',
  'medium',
  'semi-dark',
  'dark',
  'black',
].join('|');
const LEGACY_COLOR_SUFFIXES =
  '(?:-contrast-rgb|-contrast|-shade-rgb|-shade|-tint-rgb|-tint|-rgb|-color-brightness)?';
const END = '(?![\\w-])';

const LEGACY_VARIABLE = new RegExp(
  `^--kirby-(?:(?:${LEGACY_COLOR_NAMES})${LEGACY_COLOR_SUFFIXES}|text-color-[\\w-]+|(?:white|dark)-overlay(?:-\\d+)?|decoration-color-[\\w-]+|inputs-[\\w-]+|divider-color|focus-ring-color)$`
);

// Global token families. Other --kirby-* variables found in the installed Kirby packages are component variables (e.g. --kirby-card-main-color)
const GLOBAL_VARIABLE =
  /^--kirby-(?:color-|system-color-|brand-color-|spacing-|font-|line-height-|border-radius-|elevation-|z-index-|transition-|icon-font-size|relative-size-|size-|page-|focus-ring-|error-ring-|safe-area-|statusbar-|loading-overlay-|opacity-|stroke-|breakpoint-)/;

/*
 * Replacements that hold regardless of context ("no-brainers"), keyed by the role of the CSS property
 * the value is assigned to. A property only gets a token of its own role (fill, content or border).
 * Anything not listed here depends on context and needs a decision.
 */
const NO_BRAINERS = {
  fill: {
    'background-color': 'fill-base',
    primary: 'fill-brand-loud',
    'success-tint': 'fill-success-quiet',
    'warning-tint': 'fill-warning-quiet',
    'danger-tint': 'fill-danger-quiet',
    'inputs-background-color': 'fill-raised',
    'inputs-background-color-hover': 'fill-raised-hover',
    'inputs-background-color-active': 'fill-raised-active',
    'inputs-indicator-background-color': 'fill-brand',
    '#f6f6f6': 'fill-base',
    '#00e89a': 'fill-brand-loud',
  },
  content: {
    'text-color-black': 'content-base',
    'text-color-positive': 'content-positive',
    'text-color-negative': 'content-negative',
    'primary-contrast': 'content-brand-loud',
    'inputs-color': 'content-raised',
    'inputs-placeholder-color': 'content-raised-quiet',
    'inputs-indicator-color': 'content-brand',
    '#1c1c1c': 'content-base',
  },
  border: {
    'focus-ring-color': 'border-focus',
    '#238cec': 'border-focus',
  },
};

function propertyRole(property) {
  if (!property) return null;
  if (/border|outline|divider|separator|stroke|box-shadow/.test(property)) return 'border';
  if (/background|(?:^|-)bg(?:-|$)|(?:^|-)fill(?:-|$)|indicator-color/.test(property))
    return 'fill';
  if (/(?:^|-)color(?:-|$)/.test(property)) return 'content';
  return null;
}

function suggestion(property, key) {
  const role = propertyRole(property);
  const token = key && role && NO_BRAINERS[role][key];
  return token ? `var(--kirby-color-${token})` : null;
}

// The CSS property a match at `index` is assigned to, e.g. `background-color` or `--kirby-card-main-color`
function propertyAt(line, index) {
  const statement = line.slice(0, index).split(/[;{}]/).pop();
  return statement.match(/^\s*(--[\w-]+|[a-z-]+)\s*:/i)?.[1].toLowerCase() ?? null;
}

const tokenKey = (match) => match.replace(/^--kirby-/, '');
const hexKey = (match) => {
  const hex = match.toLowerCase();
  return /^#[0-9a-f]{3}$/.test(hex) ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex;
};

const RULES = [
  {
    id: 'primitive-color',
    category: 'color-primitive',
    files: 'all',
    pattern: /--kirby-(?:brand|system)-color-[\w-]+/g,
    hint: 'Color primitive: not part of Kirby semantic versioning and may break in any release. Use the --kirby-color-{fill|content|border}-* token for its role (see references/token-mapping.md), or ask the user. Other primitives (opacity, spacing …) are fine.',
  },
  {
    id: 'legacy-color',
    category: 'token',
    key: tokenKey,
    files: 'all',
    pattern: new RegExp(`--kirby-(?:${LEGACY_COLOR_NAMES})${LEGACY_COLOR_SUFFIXES}${END}`, 'g'),
    hint: 'Legacy palette color. Pick a --kirby-color-{fill|content|border}-* token by role (see references/token-mapping.md).',
  },
  {
    id: 'legacy-text-color',
    category: 'token',
    key: tokenKey,
    files: 'all',
    pattern: /--kirby-text-color-[\w-]+/g,
    hint: 'Legacy text color. Use --kirby-color-content-* (black → base, semi-dark → base-quiet or raised-quiet inside controls, white → brand-loud on brand fills, positive/negative → positive/negative).',
  },
  {
    id: 'legacy-overlay',
    category: 'token',
    key: tokenKey,
    files: 'all',
    pattern: /--kirby-(?:white|dark)-overlay(?:-\d+)?(?![\w-])/g,
    hint: 'Overlay colors were used for hover/active/backgrounds. Use the *-hover/*-active variant of the fill token, or a fill token of the surface.',
  },
  {
    id: 'legacy-decoration-color',
    category: 'token',
    key: tokenKey,
    files: 'all',
    pattern: /--kirby-decoration-color-[\w-]+/g,
    hint: 'Decoration colors have no semantic replacement. Ask the user/designer which role (fill/content/border + status) applies.',
  },
  {
    id: 'legacy-theme-variable',
    category: 'token',
    key: tokenKey,
    files: 'all',
    pattern: /--kirby-(?:inputs-[\w-]+|divider-color|focus-ring-color)(?![\w-])/g,
    hint: 'Legacy theme variable, no longer used by Kirby components. Replace reads with the suggested token where shown; otherwise see references/token-mapping.md (inputs, divider, focus).',
  },
  {
    id: 'legacy-scss-color-function',
    category: 'scss',
    files: 'style',
    pattern: /\bget-(text-|decoration-)?color\(\s*['"]?([\w-]*)['"]?\s*\)?/g,
    key: (_match, [prefix, name]) =>
      prefix === 'decoration-' ? null : prefix === 'text-' ? `text-color-${name}` : name,
    hint: 'get-color()/get-text-color()/get-decoration-color() emit legacy tokens. Replace with var(--kirby-color-*).',
  },
  {
    id: 'legacy-interaction-state',
    category: 'scss',
    files: 'style',
    pattern:
      /\binteraction-state\.(?!transition\b|\$)[\w-]+|\b(?:apply-hover|apply-active|get-state-color|initialize-layer|apply-state)\b/g,
    hint: 'Replace with utils.hover { …-hover token } and &:active { …-active token }. Keep interaction-state.transition() if used for transitions.',
  },
  {
    id: 'legacy-scss-color-map',
    category: 'scss',
    files: 'style',
    pattern:
      /(?:[\w-]+\.)?\$(?:brand-colors|notification-colors|system-colors|text-colors|kirby-colors|kirby-text-colors|main-colors|decoration-colors[\w-]*|shade-tint-colors|focus-ring-color|white-overlay-colors|dark-overlay-colors)(?![\w-])/g,
    hint: 'Legacy SCSS color map/variable. Use var(--kirby-color-*) so the value follows the surface.',
  },
  {
    id: 'legacy-dark-context',
    category: 'scss',
    files: 'style',
    pattern:
      /\.kirby-color-brightness-[\w-]+|\bapply-(?:dark|white|light)-theme\b|\$make-lighter\b/g,
    hint: 'Dark-context theming is replaced by surfaces. Put class="kirby-surface-brand" (or raised/base) on the container and use surface-aware tokens.',
  },
  {
    id: 'legacy-state-layer',
    category: 'scss',
    files: 'style-and-template',
    pattern: /(?<![\w-])(?:state-layer|content-layer)(?![\w-])/g,
    hint: 'State/content layer markup was removed from Kirby button and card. Remove the wrappers and selectors; style states with -hover/-active tokens.',
  },
  {
    id: 'legacy-ts-color-helper',
    category: 'typescript',
    files: 'script',
    pattern:
      /\bDesignTokenHelper\.(?:getColor|getTextColor|getDecorationColor|backgroundColor)\b|\bColorHelper\.[\w]+/g,
    hint: 'Resolves legacy palette values in TS. Prefer CSS classes/tokens; if a raw value is required, read the new token with getComputedStyle().',
  },
];

const HARDCODED_RULE = {
  id: 'hardcoded-color',
  category: 'hardcoded',
  files: 'style',
  // Functional notations wrapping a token, e.g. rgba(var(--kirby-primary-rgb), 0.5), are reported as tokens
  pattern:
    /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])|\b(?:rgba?|hsla?)\((?![^)]*var\()[^)]*\)/g,
  // ID selectors such as `#face {` look like hex colors
  ignore: (line, match) =>
    match[0].startsWith('#') &&
    !propertyAt(line, match.index) &&
    /^[^;]*\{/.test(line.slice(match.index)),
  key: hexKey,
  hint: 'Hardcoded color does not adapt to surfaces. Replace with a --kirby-color-* token, or confirm it is intentional (e.g. brand artwork).',
};

const LOOKALIKE_WORD =
  '(?:card|panel|tile|badge|chip|pill|tag|avatar|btn|button|toggle|switch|checkbox|radio|spinner|loader|skeleton|divider|separator|accordion|tabs?|toast|snackbar|alert|modal|dialog|flag|empty-state|list-item|dropdown|select|segmented|progress|slider|stepper|banner|sidebar|menu)';
// Only the first (block) or last (type) part of a class name, e.g. `card-title` or `user-card`, not `variant-card-container`
const LOOKALIKE_CLASS_NAME = new RegExp(
  `^${LOOKALIKE_WORD}(?:[-_][\\w-]*)?$|^[\\w-]*[-_]${LOOKALIKE_WORD}$`
);

const LAYOUT_WRAPPER_CLASS_NAME = /[-_](?:container|wrapper|section|content)$/;

const isLookalikeClassName = (name) =>
  Boolean(name) &&
  !name.startsWith('kirby-') &&
  LOOKALIKE_CLASS_NAME.test(name) &&
  !LAYOUT_WRAPPER_CLASS_NAME.test(name);

// Class names in a style selector, skipping those compounded with a Kirby element, e.g. `kirby-card.promo`
function lookalikeSelectorClassNames(line) {
  if (!/\{|,\s*$/.test(line)) return [];
  const selector = line.split('{')[0];
  return selector
    .split(/[\s>+~,]+/)
    .filter((compound) => !/^kirby-|\[kirby-/.test(compound))
    .flatMap((compound) => [...compound.matchAll(/\.([\w-]+)/g)].map(([, name]) => name))
    .filter(isLookalikeClassName);
}

const NATIVE_CONTROL_RULE = {
  id: 'lookalike-native-control',
  category: 'lookalike',
  hint: 'Native control styled by hand? Check kirby-button / kirby-checkbox / kirby-radio / kirby-range / kirby-dropdown / kirby-progress-circle / kirby-divider before building or converting a custom one (see references/kirby-lookalikes.md).',
};

const CLASS_NAME_RULE = {
  id: 'lookalike-class-name',
  category: 'lookalike',
  hint: 'Class name suggests a hand-rolled version of a Kirby component. Climb the component ladder and ask the user before converting it (see references/kirby-lookalikes.md).',
};

// Start tags often span several lines, so templates are scanned tag by tag instead of line by line
function scanTemplateTags(content, report, kirbyClasses) {
  const withoutComments = content.replace(/<!--[\s\S]*?-->/g, (comment) =>
    comment.replace(/[^\n]/g, ' ')
  );
  const startTag = /<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;
  for (const { 0: tag, 1: name, 2: attributes, index } of withoutComments.matchAll(startTag)) {
    const attributeNames = attributes.replace(/"[^"]*"|'[^']*'/g, '');
    const isKirby = name.startsWith('kirby-') || /(?:^|\s)kirby-[\w-]+/.test(attributeNames);

    const isNativeControl =
      /^(?:button|select|progress|hr)$/i.test(name) ||
      (/^input$/i.test(name) && /\btype=["'](?:checkbox|radio|range)["']/.test(attributes));
    if (isNativeControl && !isKirby) report(index, NATIVE_CONTROL_RULE, `<${name}`);

    const classNames = /\bclass=["']([^"']*)["']|\[class\.([\w-]+)\]/g;
    for (const { 1: value, 2: binding, index: offset } of tag.matchAll(classNames)) {
      for (const className of value?.split(/\s+/) ?? [binding]) {
        if (isKirby) kirbyClasses.add(className);
        else if (isLookalikeClassName(className))
          report(index + offset, CLASS_NAME_RULE, className);
      }
    }
  }
}

const LOOKALIKE_RULES = [
  {
    ...CLASS_NAME_RULE,
    files: 'style',
    extract: lookalikeSelectorClassNames,
  },
  {
    id: 'lookalike-item-background-transparent',
    category: 'lookalike',
    files: 'style',
    pattern: /--kirby-item-background\s*:\s*transparent\b/g,
    hint: 'kirby-item now uses the fill of the surface it sits on, so it already looks transparent. Very likely redundant – remove it unless the item sits on a non-surface background (see references/kirby-lookalikes.md#items).',
  },
  {
    id: 'lookalike-item-background',
    category: 'lookalike',
    files: 'style',
    pattern: /--kirby-item-background\s*:\s*(?![\s]|transparent\b)[^;]+/g,
    hint: 'Item background override, usually faking a raised list group. Prefer kirby-list or wrapping the items in kirby-card; as a last resort give the container the raised look (see references/kirby-lookalikes.md#items).',
  },
];

const isComponentVariable = (name, knownVariables) =>
  name.startsWith('--kirby-') &&
  !GLOBAL_VARIABLE.test(name) &&
  !LEGACY_VARIABLE.test(name) &&
  (knownVariables?.has(name) ?? true);

const unknownVariableRule = (knownVariables) => ({
  id: 'unknown-kirby-variable',
  category: 'unknown-variable',
  files: 'all',
  pattern: /--kirby-[\w-]+/g,
  ignore: (_line, [name]) =>
    GLOBAL_VARIABLE.test(name) || LEGACY_VARIABLE.test(name) || knownVariables.has(name),
  hint: 'Not a Kirby token and not used by any installed Kirby component. A custom variable must not use the reserved kirby- prefix: rename it (e.g. --promo-card-fill). If it is a component variable Kirby has removed, the override has no effect – tell the user.',
});

const KIRBY_PACKAGES = ['core', 'designsystem', 'extensions-angular'];
const PACKAGE_EXTENSIONS = new Set(['.mjs', '.js', '.css', '.scss', '.ts']);

function kirbyPackagesIn(nodeModules) {
  const pnpm = join(nodeModules, '.pnpm');
  const pnpmEntries = existsSync(pnpm) ? readdirSync(pnpm) : [];
  return KIRBY_PACKAGES.flatMap((name) => [
    join(nodeModules, '@kirbydesign', name),
    ...pnpmEntries
      .filter((entry) => entry.startsWith(`@kirbydesign+${name}@`))
      .map((entry) => join(pnpm, entry, 'node_modules', '@kirbydesign', name)),
  ]).filter((directory) => existsSync(directory));
}

function findKirbyPackages(paths) {
  const packages = new Set();
  for (const start of [process.cwd(), ...paths]) {
    for (let directory = resolve(start); ; directory = dirname(directory)) {
      const found = kirbyPackagesIn(join(directory, 'node_modules'));
      found.forEach((path) => packages.add(realpathSync(path)));
      if (found.length || dirname(directory) === directory) break;
    }
  }
  return [...packages];
}

function readKirbyVariables(packages) {
  if (!packages.length) return null;
  const variables = new Set();
  for (const file of packages.flatMap((path) => [...walk(path, new Set(['node_modules']))])) {
    if (!PACKAGE_EXTENSIONS.has(extname(file))) continue;
    for (const [name] of readFileSync(file, 'utf8').matchAll(/--kirby-[\w-]+/g))
      variables.add(name);
  }
  return variables;
}

const USAGE =
  'Usage: node find-lookalikes.mjs [paths...] [--json] [--skip-hardcoded] [--all-findings]';
const FLAGS = new Set(['--json', '--skip-hardcoded', '--all-findings', '--help']);

function exitWithError(message) {
  console.error(`${message}\n${USAGE}`);
  process.exit(1);
}

function parseArgs(argv) {
  const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
  const paths = argv.filter((arg) => !arg.startsWith('--'));
  if (flags.has('--help')) {
    console.log(USAGE);
    process.exit(0);
  }
  const unknownFlags = [...flags].filter((flag) => !FLAGS.has(flag));
  if (unknownFlags.length) exitWithError(`Unknown option: ${unknownFlags.join(', ')}`);
  const missingPaths = paths.filter((path) => !existsSync(path));
  if (missingPaths.length) exitWithError(`Path not found: ${missingPaths.join(', ')}`);
  return {
    json: flags.has('--json'),
    hardcoded: !flags.has('--skip-hardcoded'),
    allFindings: flags.has('--all-findings'),
    paths: paths.length ? paths : ['.'],
  };
}

function fileKind(path) {
  const extension = extname(path);
  if (STYLE_EXTENSIONS.has(extension)) return 'style';
  if (TEMPLATE_EXTENSIONS.has(extension)) return 'template';
  if (SCRIPT_EXTENSIONS.has(extension) && !/\.(spec|test|stories)\.[mc]?[jt]s$/.test(path))
    return 'script';
  return null;
}

function* walk(path, ignoredDirectories = IGNORED_DIRECTORIES) {
  const stats = statSync(path);
  if (stats.isFile()) {
    yield path;
    return;
  }
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name) && !entry.name.startsWith('.')) {
        yield* walk(join(path, entry.name), ignoredDirectories);
      }
    } else if (entry.isFile()) {
      yield join(path, entry.name);
    }
  }
}

function appliesTo(rule, kind) {
  if (rule.files === 'all') return true;
  if (rule.files === 'style-and-template') return kind === 'style' || kind === 'template';
  return rule.files === kind;
}

function stripComments(line, kind, state) {
  if (kind !== 'style') return line;
  let result = '';
  let index = 0;
  while (index < line.length) {
    if (state.inBlockComment) {
      const end = line.indexOf('*/', index);
      if (end === -1) return result;
      state.inBlockComment = false;
      index = end + 2;
    } else if (line.startsWith('/*', index)) {
      state.inBlockComment = true;
      index += 2;
    } else if (line.startsWith('//', index) && line[index - 1] !== ':') {
      return result;
    } else {
      result += line[index++];
    }
  }
  return result;
}

const HINTS = {
  componentOverride:
    'Component variable override: allowed, keep it. A no-brainer replacement exists for the legacy value – apply the suggestion.',
  componentOverrideLegacy:
    'Component variable override: allowed, keep it. The legacy value has no context-free replacement – ask the user which new token to use, or leave it as is and list it as an open question in the report.',
  deadOverride:
    'Assigns a legacy theme variable that migrated Kirby components no longer read, so it has no effect on them. Dark/white theme intent → kirby-surface-* class; brand re-theming → brand token pipeline; otherwise ask the user. Keep it only if custom code still reads it.',
};

function scanFile(path, rules, kirbyClasses, knownVariables) {
  const kind = fileKind(path);
  if (!kind) return [];
  const applicable = rules.filter((rule) => appliesTo(rule, kind));

  const findings = [];
  const state = { inBlockComment: false };
  const content = readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const reportAt = (lineIndex, rule, match, extra = {}) =>
    findings.push({
      file: path,
      line: lineIndex + 1,
      rule: rule.id,
      category: rule.category,
      match: match.trim(),
      source: lines[lineIndex].trim(),
      hint: rule.hint,
      ...extra,
    });

  if (kind === 'template') {
    const lineOf = (index) => content.slice(0, index).split('\n').length - 1;
    scanTemplateTags(
      content,
      (index, rule, match) => reportAt(lineOf(index), rule, match),
      kirbyClasses
    );
  }

  lines.forEach((rawLine, index) => {
    const line = stripComments(rawLine, kind, state);
    const report = (rule, match, extra) => reportAt(index, rule, match, extra);

    // Assigning a legacy variable, e.g. `--kirby-inputs-color: red;`
    const assigned = kind === 'style' ? line.match(/^\s*(--kirby-[\w-]+)\s*:/)?.[1] : null;
    const assignsLegacyVariable = assigned && LEGACY_VARIABLE.test(assigned);
    if (assignsLegacyVariable) {
      report(
        { id: 'legacy-variable-override', category: 'override', hint: HINTS.deadOverride },
        assigned
      );
    }

    for (const rule of applicable) {
      if (rule.extract) {
        for (const match of rule.extract(line, kind)) report(rule, match);
        continue;
      }
      for (const match of line.matchAll(rule.pattern)) {
        // The whole declaration is reported as one dead override
        if (assignsLegacyVariable) break;
        if (rule.ignore?.(line, match)) continue;

        const property = propertyAt(line, match.index);
        const suggested = rule.key
          ? suggestion(property, rule.key(match[0], match.slice(1)))
          : null;
        const isComponentOverride = property && isComponentVariable(property, knownVariables);

        if (isComponentOverride && rule.category === 'hardcoded') {
          // Custom colors on component variables are allowed, unless they are an old Kirby value with a 1:1 replacement
          if (suggested)
            report(rule, match[0], {
              category: 'override',
              hint: HINTS.componentOverride,
              suggestion: suggested,
            });
          continue;
        }
        if (isComponentOverride && rule.category === 'token') {
          report(rule, match[0], {
            category: 'override',
            hint: suggested ? HINTS.componentOverride : HINTS.componentOverrideLegacy,
            ...(suggested && { suggestion: suggested }),
          });
          continue;
        }
        report(rule, match[0], suggested ? { suggestion: suggested } : {});
      }
    }
  });
  return findings;
}

function groupBy(items, key) {
  const groups = new Map();
  for (const item of items) {
    const value = key(item);
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item);
  }
  return groups;
}

// A class that styles a Kirby component, e.g. <button kirby-button class="menu-button">, is not a lookalike,
// unless it is also used on a custom element in the same directory
function dropKirbyComponentClasses(findings, kirbyClassesByDirectory) {
  const isClassNameFinding = (finding) => finding.rule === CLASS_NAME_RULE.id;
  const customTemplateClasses = new Set(
    findings
      .filter((finding) => isClassNameFinding(finding) && fileKind(finding.file) === 'template')
      .map((finding) => `${dirname(finding.file)}\0${finding.match}`)
  );
  return findings.filter(
    (finding) =>
      !isClassNameFinding(finding) ||
      fileKind(finding.file) !== 'style' ||
      !kirbyClassesByDirectory.get(dirname(finding.file))?.has(finding.match) ||
      customTemplateClasses.has(`${dirname(finding.file)}\0${finding.match}`)
  );
}

// Styling only matters where there is a lookalike to convert, so keep it in directories with lookalikes
function scopeFindings(findings, allFindings) {
  if (allFindings) return findings;
  const directoriesWithLookalikes = new Set(
    findings
      .filter((finding) => finding.category === 'lookalike')
      .map((finding) => dirname(finding.file))
  );
  return findings.filter((finding) => directoriesWithLookalikes.has(dirname(finding.file)));
}

function printReport(findings, root, hidden) {
  const hiddenNote = hidden
    ? `\n${hidden} styling findings outside lookalike directories are hidden. Use --all-findings to list them.`
    : '';
  if (!findings.length) {
    console.log(`No Kirby lookalikes found.${hiddenNote}`);
    return;
  }
  const byCategory = groupBy(findings, (finding) => finding.category);
  const order = [
    'lookalike',
    'override',
    'unknown-variable',
    'color-primitive',
    'token',
    'scss',
    'typescript',
    'hardcoded',
  ];
  for (const category of order) {
    const group = byCategory.get(category);
    if (!group) continue;
    console.log(`\n## ${category} (${group.length})`);
    for (const [file, items] of groupBy(group, (finding) => finding.file)) {
      console.log(`\n${relative(root, file)}`);
      for (const item of items) {
        const suggested = item.suggestion ? `  ⇒ ${item.suggestion}` : '';
        console.log(`  ${item.line}: [${item.rule}] ${item.match}${suggested}    ${item.source}`);
      }
    }
    const hints = new Map(group.map((item) => [item.hint, item.rule]));
    console.log('');
    for (const [hint, rule] of hints) console.log(`  → ${rule}: ${hint}`);
  }
  console.log('\n## summary');
  for (const category of order) {
    const group = byCategory.get(category);
    if (group)
      console.log(
        `  ${category}: ${group.length} in ${new Set(group.map((f) => f.file)).size} files`
      );
  }
  if (hiddenNote) console.log(hiddenNote);
}

const options = parseArgs(process.argv.slice(2));
const knownVariables = readKirbyVariables(findKirbyPackages(options.paths));
if (!knownVariables) {
  console.error(
    'Warning: no @kirbydesign packages found in node_modules, so --kirby-* variables are not checked against Kirby component variables.'
  );
}
const rules = [
  ...LOOKALIKE_RULES,
  ...RULES,
  ...(knownVariables ? [unknownVariableRule(knownVariables)] : []),
  ...(options.hardcoded ? [HARDCODED_RULE] : []),
];
const kirbyClassesByDirectory = new Map();
const scannedFindings = options.paths.flatMap((path) =>
  [...walk(path)].flatMap((file) => {
    const directory = dirname(file);
    if (!kirbyClassesByDirectory.has(directory)) kirbyClassesByDirectory.set(directory, new Set());
    return scanFile(file, rules, kirbyClassesByDirectory.get(directory), knownVariables);
  })
);
const allFindings = dropKirbyComponentClasses(scannedFindings, kirbyClassesByDirectory);
const findings = scopeFindings(allFindings, options.allFindings);

if (options.json) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  printReport(findings, process.cwd(), allFindings.length - findings.length);
}
