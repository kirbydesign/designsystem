import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validateConfig } from '../src/config.mjs';
import { normalize } from '../src/artifact.mjs';
import { prepare } from '../src/resolve.mjs';
import { build } from '../src/build.mjs';

const config = validateConfig({
  prefix: 'kirby',
  units: { px: { scopes: ['GAP'], paths: ['* surface/elevation/**'] } },
  rules: [
    { id: 'skip', match: 'font-size/**', ignore: true },
    {
      id: 'base',
      match: 'base surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: ':root, .{prefix}-surface-base',
      output: 's.css',
      section: '{category}',
    },
    {
      id: 'surface',
      match: '{surface} surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: '.{prefix}-surface-{surface}',
      output: 's.css',
      section: '{category}',
    },
    {
      id: 'primitive',
      match: '{category}/**',
      variable: '{prefix}-{path}',
      output: 'p.css',
      section: '{category}',
    },
  ],
});

test('merges arbitrary exports at original paths and preserves cross-file aliases', () => {
  const inputs = [
    {
      spacing: { s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } } },
    },
    {
      'base surface': {
        color: {
          fill: {
            main: {
              $type: 'number',
              $value: 16,
              $extensions: { 'com.figma.aliasData': { targetVariableName: 'spacing/s' } },
            },
          },
        },
      },
    },
    { 'font-size': { small: { $type: 'number', $value: 14 } } },
  ];
  const tokens = normalize(inputs, config);
  assert.deepEqual(tokens.spacing.s, { $type: 'dimension', $value: { value: 16, unit: 'px' } });
  assert.deepEqual(tokens['base surface'].color.fill.main, {
    $type: 'dimension',
    $value: '{spacing.s}',
  });
  assert.deepEqual(tokens['font-size'].small, { $type: 'number', $value: 14 });
});

test('retains aliases to surface tokens at their Figma paths', () => {
  const inputs = [
    {
      'base surface': {
        color: {
          fill: {
            main: { $type: 'color', $value: '#fff' },
            alias: {
              $type: 'color',
              $value: '#fff',
              $extensions: {
                'com.figma.aliasData': { targetVariableName: 'base surface/color/fill/main' },
              },
            },
          },
        },
      },
    },
  ];
  assert.equal(
    normalize(inputs, config)['base surface'].color.fill.alias.$value,
    '{base surface.color.fill.main}'
  );
});

test('resolves a reference to a baseline-only primitive', () => {
  const baseline = { spacing: { s: { $type: 'dimension', $value: { value: 16, unit: 'px' } } } };
  const tokens = normalize(
    [
      {
        'base surface': {
          color: {
            fill: {
              main: { $type: 'number', $value: '{spacing.s}' },
            },
          },
        },
      },
    ],
    config,
    baseline
  );
  assert.deepEqual(tokens['base surface'].color.fill.main, {
    $type: 'dimension',
    $value: '{spacing.s}',
  });
});

test('resolves dimension alias chains regardless of export order', () => {
  const tokens = normalize(
    [
      {
        'border-radius': {
          a: { $type: 'number', $value: '{border-radius.b}' },
          b: { $type: 'number', $value: '{spacing.s}' },
        },
        spacing: {
          s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } },
        },
      },
    ],
    config
  );
  assert.equal(tokens['border-radius'].a.$type, 'dimension');
  assert.equal(tokens['border-radius'].b.$type, 'dimension');
});

test('rejects duplicate paths and token/group conflicts across exports', () => {
  const token = { $type: 'number', $value: 16 };
  assert.throws(
    () => normalize([{ spacing: { s: token } }, { spacing: { s: token } }], config),
    /Duplicate token: spacing\/s/
  );
  assert.throws(
    () => normalize([{ spacing: { s: token } }, { spacing: { s: { nested: token } } }], config),
    /Token is also a group: spacing\/s/
  );
});

test('retains Figma opacity scope for number tokens at new paths', () => {
  const tokens = normalize(
    [
      {
        opacity: {
          menu: {
            $type: 'number',
            $value: 20,
            $extensions: { 'com.figma.scopes': ['OPACITY'] },
          },
        },
      },
    ],
    validateConfig({
      prefix: 'kirby',
      units: { '%': { scopes: ['OPACITY'] } },
      rules: [
        { id: 'number', match: 'opacity/**', variable: '{prefix}-{path}', output: 'opacity.css' },
      ],
    })
  );
  assert.deepEqual(tokens.opacity.menu.$extensions, { 'com.figma.scopes': ['OPACITY'] });
});

test('inlines cross-surface aliases that map to the same CSS variable', async () => {
  const source = {
    'base surface': {
      color: { fill: { main: { $type: 'color', $value: '{raised surface.color.fill.main}' } } },
    },
    'raised surface': { color: { fill: { main: { $type: 'color', $value: '#eee' } } } },
  };
  const out = mkdtempSync(join(tmpdir(), 'dt-cross-surface-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config);
  await build(routes, emissions, out, file);
  const css = readFileSync(join(out, 's.css'), 'utf8');
  assert.match(css, /:root, \.kirby-surface-base \{\s*--kirby-color-fill-main: #eeeeee;/);
  assert.doesNotMatch(css, /--kirby-color-fill-main: var\(--kirby-color-fill-main\)/);
});

test('inlines aliases to variables unavailable under the current surface', async () => {
  const source = {
    'base surface': {
      color: { fill: { main: { $type: 'color', $value: '{raised surface.color.fill.other}' } } },
    },
    'raised surface': { color: { fill: { other: { $type: 'color', $value: '#eee' } } } },
  };
  const out = mkdtempSync(join(tmpdir(), 'dt-cross-selector-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config);
  await build(routes, emissions, out, file);
  const css = readFileSync(join(out, 's.css'), 'utf8');
  assert.match(css, /--kirby-color-fill-main: #eeeeee;/);
  assert.doesNotMatch(css, /--kirby-color-fill-main: var\(--kirby-color-fill-other\)/);
});

test('renders percentages selected by path when Figma reports ALL_SCOPES', async () => {
  const percentConfig = validateConfig({
    prefix: 'kirby',
    units: { '%': { paths: ['opacity/**'] } },
    rules: [
      { id: 'opacity', match: 'opacity/**', variable: '{prefix}-{path}', output: 'opacity.css' },
    ],
  });
  const source = normalize(
    [
      {
        opacity: {
          menu: {
            $type: 'number',
            $value: 20,
            $extensions: { 'com.figma.scopes': ['ALL_SCOPES'] },
          },
        },
      },
    ],
    percentConfig
  );
  const out = mkdtempSync(join(tmpdir(), 'dt-percent-path-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, percentConfig);
  await build(routes, emissions, out, file, null, percentConfig.units);
  assert.match(readFileSync(join(out, 'opacity.css'), 'utf8'), /--kirby-opacity-menu: 20%;/);
});

test('assigns units by path for ALL_SCOPES and normalizes color alpha', () => {
  const tokens = normalize(
    [
      {
        'base surface': {
          elevation: {
            blur: {
              $type: 'number',
              $value: 24,
              $extensions: { 'com.figma.scopes': ['ALL_SCOPES'] },
            },
            color: {
              $type: 'color',
              $value: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 0.9399999976158142 },
            },
          },
        },
      },
    ],
    config
  );
  assert.deepEqual(tokens['base surface'].elevation.blur.$value, { value: 24, unit: 'px' });
  assert.equal(tokens['base surface'].elevation.color.$value.alpha, 0.94);
});

test('warns when retaining the literal value for an absent Figma alias target', () => {
  const warnings = [];
  const tokens = normalize(
    [
      {
        color: {
          missing: {
            $type: 'color',
            $value: '#123456',
            $extensions: { 'com.figma.aliasData': { targetVariableName: 'not/exported' } },
          },
        },
      },
    ],
    config,
    {},
    warnings
  );
  assert.equal(tokens.color.missing.$value, '#123456');
  assert.deepEqual(warnings, [
    'color/missing: Figma alias target "not/exported" is not present in the import or baseline; retaining its literal value.',
  ]);
});

test('filters excluded tokens only at render time', async () => {
  const source = normalize(
    [
      {
        'font-size': { small: { $type: 'number', $value: 14 } },
        spacing: {
          s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } },
        },
      },
    ],
    config
  );
  const out = mkdtempSync(join(tmpdir(), 'dt-filter-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config);
  await build(routes, emissions, out, file);
  assert.ok(source['font-size'].small);
  assert.doesNotMatch(readFileSync(join(out, 'p.css'), 'utf8'), /font-size/);
  assert.match(readFileSync(join(out, 'p.css'), 'utf8'), /--kirby-spacing-s: 16px/);
});

test('inlines references to ignored tokens but keeps references to emitted tokens', async () => {
  const source = {
    'font-size': { small: { $type: 'number', $value: 14 } },
    spacing: { s: { $type: 'dimension', $value: { value: 16, unit: 'px' } } },
    'border-radius': {
      fallback: { $type: 'number', $value: '{font-size.small}' },
      normal: { $type: 'dimension', $value: '{spacing.s}' },
    },
  };
  const out = mkdtempSync(join(tmpdir(), 'dt-ignored-alias-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config);
  await build(routes, emissions, out, file);
  const css = readFileSync(join(out, 'p.css'), 'utf8');
  assert.match(css, /--kirby-border-radius-fallback: 14;/);
  assert.match(css, /--kirby-border-radius-normal: var\(--kirby-spacing-s\);/);
});

test('app tokens reference included baseline variables without emitting them', async () => {
  const out = mkdtempSync(join(tmpdir(), 'dt-theme-'));
  const baseline = { system: { color: { green: { 500: { $type: 'color', $value: '#00ff00' } } } } };
  const source = {
    'base surface': {
      color: { fill: { main: { $type: 'color', $value: '{system.color.green.500}' } } },
    },
  };
  const baselineFile = join(out, 'baseline.json');
  const sourceFile = join(out, 'custom.json');
  writeFileSync(baselineFile, JSON.stringify(baseline));
  writeFileSync(sourceFile, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config, baseline);
  await build(routes, emissions, out, sourceFile, baselineFile, config.units, config);
  const css = readFileSync(join(out, 's.css'), 'utf8');
  assert.match(css, /--kirby-color-fill-main: var\(--kirby-system-color-green-500\)/);
  assert.doesNotMatch(css, /--kirby-system-color-green-500:/);
});

test('emits only app CSS declarations that differ from the baseline', async () => {
  const out = mkdtempSync(join(tmpdir(), 'dt-app-diff-'));
  const baseline = {
    'base surface': {
      color: {
        fill: {
          main: { $type: 'color', $value: '#fff' },
          brand: { $type: 'color', $value: '#0f0' },
        },
      },
    },
  };
  const source = {
    'base surface': {
      color: {
        fill: {
          main: { $type: 'color', $value: '#fff' },
          brand: { $type: 'color', $value: '#00f' },
        },
      },
    },
  };
  const baselineFile = join(out, 'baseline.json');
  const sourceFile = join(out, 'app.json');
  writeFileSync(baselineFile, JSON.stringify(baseline));
  writeFileSync(sourceFile, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config, baseline);
  await build(routes, emissions, out, sourceFile, baselineFile, config.units, config);

  const css = readFileSync(join(out, 's.css'), 'utf8');
  assert.match(css, /--kirby-color-fill-brand: #0000ff;/);
  assert.doesNotMatch(css, /--kirby-color-fill-main:/);
});

test('clears staged CSS when an app has no differences for an output', async () => {
  const out = mkdtempSync(join(tmpdir(), 'dt-app-no-diff-'));
  const tokens = {
    'base surface': {
      color: { fill: { main: { $type: 'color', $value: '#fff' } } },
    },
  };
  const baselineFile = join(out, 'baseline.json');
  const sourceFile = join(out, 'app.json');
  writeFileSync(baselineFile, JSON.stringify(tokens));
  writeFileSync(sourceFile, JSON.stringify(tokens));
  writeFileSync(join(out, 's.css'), 'stale declarations');
  const { routes, emissions } = prepare(tokens, config, tokens);
  await build(routes, emissions, out, sourceFile, baselineFile, config.units, config);

  const css = readFileSync(join(out, 's.css'), 'utf8');
  assert.match(css, /auto-generated/);
  assert.doesNotMatch(css, /--kirby-color-fill-main:/);
});

test('warns about missing sibling tokens without comparing unrelated sections', async () => {
  const source = {
    'base surface': {
      color: {
        fill: {
          main: { $type: 'color', $value: '#fff' },
          extra: { $type: 'color', $value: '#eee' },
        },
      },
      imagebanner: { fill: { main: { $type: 'color', $value: '#fff' } } },
    },
    'raised surface': { color: { fill: { main: { $type: 'color', $value: '#ddd' } } } },
  };
  const out = mkdtempSync(join(tmpdir(), 'dt-warning-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = prepare(source, config);
  const { warnings } = await build(routes, emissions, out, file);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /s\.css \[color\].*\.kirby-surface-raised.*--kirby-color-fill-extra/);
});
