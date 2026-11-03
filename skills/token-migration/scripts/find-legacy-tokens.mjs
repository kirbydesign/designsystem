#!/usr/bin/env node
/**
 * Lists usages of the legacy Kirby design tokens and custom UI that may duplicate a Kirby component.
 *
 * Usage:
 *   node find-legacy-tokens.mjs [paths...] [--json] [--skip-hardcoded] [--skip-lookalikes] [--all-lookalikes]
 *
 * Paths default to the current working directory. No dependencies.
 * Lookalikes are only reported in directories that also contain styling findings, unless --all-lookalikes is set.
 * Overrides of component variables (e.g. --kirby-card-main-color) are allowed: custom colors are not reported,
 * legacy values are reported in the `override` category, with a suggestion when a no-brainer replacement exists.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';

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

// Global token families. Any other --kirby-* variable is a component variable (e.g. --kirby-card-main-color)
const GLOBAL_VARIABLE =
  /^--kirby-(?:color-|system-color-|brand-color-|spacing-|font-|line-height-|border-radius-|elevation-|z-index-|transition-|icon-font-size|relative-size-|size-|page-|focus-ring-|error-ring-|safe-area-|statusbar-|loading-overlay-)/;

/*
 * Replacements that hold regardless of context ("no-brainers"), keyed by the role of the CSS property
 * the value is assigned to. Anything not listed here depends on context and needs a decision.
 */
const NO_BRAINERS = {
  any: {
    'text-color-black': 'content-base',
    'text-color-positive': 'content-positive',
    'text-color-negative': 'content-negative',
    'primary-contrast': 'content-brand-loud',
    'focus-ring-color': 'border-focus',
    'inputs-background-color': 'fill-raised',
    'inputs-background-color-hover': 'fill-raised-hover',
    'inputs-background-color-active': 'fill-raised-active',
    'inputs-color': 'content-raised',
    'inputs-placeholder-color': 'content-raised-quiet',
    'inputs-indicator-background-color': 'fill-brand',
    'inputs-indicator-color': 'content-brand',
    '#238cec': 'border-focus',
  },
  fill: {
    'background-color': 'fill-base',
    primary: 'fill-brand-loud',
    'success-tint': 'fill-success-quiet',
    'warning-tint': 'fill-warning-quiet',
    'danger-tint': 'fill-danger-quiet',
    '#f6f6f6': 'fill-base',
    '#00e89a': 'fill-brand-loud',
  },
  content: {
    '#1c1c1c': 'content-base',
  },
  border: {},
};

function propertyRole(property) {
  if (!property) return null;
  if (/border|outline|divider|separator|stroke/.test(property)) return 'border';
  if (/background|(?:^|-)bg(?:-|$)|(?:^|-)fill(?:-|$)|indicator-color/.test(property))
    return 'fill';
  if (/(?:^|-)color(?:-|$)/.test(property)) return 'content';
  return null;
}

function suggestion(property, key) {
  if (!key) return null;
  const role = propertyRole(property);
  const token = NO_BRAINERS.any[key] ?? (role && NO_BRAINERS[role][key]);
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
  pattern: /#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g,
  key: hexKey,
  hint: 'Hardcoded color does not adapt to surfaces. Replace with a --kirby-color-* token, or confirm it is intentional (e.g. brand artwork).',
};

const LOOKALIKE_WORDS =
  /^(?:[\w-]*-)?(card|badge|chip|pill|tag|avatar|btn|button|toggle|switch|checkbox|radio|spinner|loader|skeleton|divider|separator|accordion|tabs?|toast|snackbar|alert|modal|dialog|flag|empty-state|list-item|dropdown|select|segmented|progress|slider|stepper|banner|sidebar|menu)(?:[-_][\w-]*)?$/;

function lookalikeClassNames(line, kind) {
  let classNames = [];
  if (kind === 'template') {
    for (const [, value] of line.matchAll(/\bclass=["']([^"']*)["']/g))
      classNames.push(...value.split(/\s+/));
    for (const [, name] of line.matchAll(/\[class\.([\w-]+)\]/g)) classNames.push(name);
  } else if (kind === 'style' && /\{|,\s*$/.test(line)) {
    const selector = line.split('{')[0];
    for (const [, name] of selector.matchAll(/\.([\w-]+)/g)) classNames.push(name);
  }
  return classNames.filter(
    (name) => name && !name.startsWith('kirby-') && LOOKALIKE_WORDS.test(name)
  );
}

const LOOKALIKE_RULES = [
  {
    id: 'lookalike-native-control',
    category: 'lookalike',
    files: 'template',
    pattern:
      /<button(?![^>]*\bkirby-(?:button|fab|segment|tab)\b)[\s>]|<input\b[^>]*type=["'](?:checkbox|radio|range)["']|<select\b|<progress\b|<hr\b/g,
    hint: 'Native control styled by hand? Check kirby-button / kirby-checkbox / kirby-radio / kirby-range / kirby-dropdown / kirby-progress-circle / kirby-divider before migrating.',
  },
  {
    id: 'lookalike-class-name',
    category: 'lookalike',
    files: 'style-and-template',
    extract: lookalikeClassNames,
    hint: 'Class name suggests a hand-rolled version of a Kirby component. Ask the user before migrating it (see references/kirby-lookalikes.md).',
  },
];

function parseArgs(argv) {
  const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
  const paths = argv.filter((arg) => !arg.startsWith('--'));
  return {
    json: flags.has('--json'),
    hardcoded: !flags.has('--skip-hardcoded'),
    lookalikes: !flags.has('--skip-lookalikes'),
    allLookalikes: flags.has('--all-lookalikes'),
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

function* walk(path) {
  const stats = statSync(path);
  if (stats.isFile()) {
    yield path;
    return;
  }
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name) && !entry.name.startsWith('.')) {
        yield* walk(join(path, entry.name));
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
    'Component variable override: allowed, keep it. The legacy value has no context-free replacement – ask the user which new token to use, or leave it with a TODO.',
  deadOverride:
    'Assigns a legacy theme variable that migrated Kirby components no longer read, so it has no effect on them. Dark/white theme intent → kirby-surface-* class; brand re-theming → brand token pipeline; otherwise ask the user. Keep it only if custom code still reads it.',
};

function scanFile(path, rules) {
  const kind = fileKind(path);
  if (!kind) return [];
  const applicable = rules.filter((rule) => appliesTo(rule, kind));
  if (!applicable.length) return [];

  const findings = [];
  const state = { inBlockComment: false };
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  lines.forEach((rawLine, index) => {
    const line = stripComments(rawLine, kind, state);
    const report = (rule, match, extra = {}) =>
      findings.push({
        file: path,
        line: index + 1,
        rule: rule.id,
        category: rule.category,
        match: match.trim(),
        source: rawLine.trim(),
        hint: rule.hint,
        ...extra,
      });

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

        const property = propertyAt(line, match.index);
        const suggested = rule.key
          ? suggestion(property, rule.key(match[0], match.slice(1)))
          : null;
        const isComponentOverride =
          property?.startsWith('--kirby-') &&
          !GLOBAL_VARIABLE.test(property) &&
          !LEGACY_VARIABLE.test(property);

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

// Lookalikes only matter where there is styling to migrate, so keep those in directories with other findings
function scopeLookalikes(findings, allLookalikes) {
  if (allLookalikes) return findings;
  const directoriesWithStyling = new Set(
    findings
      .filter((finding) => finding.category !== 'lookalike')
      .map((finding) => dirname(finding.file))
  );
  return findings.filter(
    (finding) =>
      finding.category !== 'lookalike' || directoriesWithStyling.has(dirname(finding.file))
  );
}

function printReport(findings, root) {
  if (!findings.length) {
    console.log('No legacy Kirby tokens found.');
    return;
  }
  const byCategory = groupBy(findings, (finding) => finding.category);
  const order = ['lookalike', 'override', 'token', 'scss', 'typescript', 'hardcoded'];
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
}

const options = parseArgs(process.argv.slice(2));
const rules = [
  ...RULES,
  ...(options.hardcoded ? [HARDCODED_RULE] : []),
  ...(options.lookalikes ? LOOKALIKE_RULES : []),
];
const findings = scopeLookalikes(
  options.paths.flatMap((path) => [...walk(path)].flatMap((file) => scanFile(file, rules))),
  options.allLookalikes
);

if (options.json) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  printReport(findings, process.cwd());
}
