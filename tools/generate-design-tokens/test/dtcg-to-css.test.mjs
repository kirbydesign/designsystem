import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validateConfig } from '../src/config.mjs';
import { figmaToDtcg } from '../src/figma-to-dtcg.mjs';
import { routeTokens } from '../src/routing.mjs';
import { writeCss } from '../src/dtcg-to-css.mjs';
import { config } from './fixtures.mjs';

test('inlines surface aliases that map to the same CSS variable', async () => {
  const source = {
    'base surface': {
      color: { fill: { main: { $type: 'color', $value: '{raised surface.color.fill.main}' } } },
    },
    'raised surface': { color: { fill: { main: { $type: 'color', $value: '#eee' } } } },
  };
  const out = mkdtempSync(join(tmpdir(), 'dt-cross-surface-'));
  const file = join(out, 'tokens.json');
  writeFileSync(file, JSON.stringify(source));
  const { routes, emissions } = routeTokens(source, config);
  await writeCss(routes, emissions, out, file);
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
  const { routes, emissions } = routeTokens(source, config);
  await writeCss(routes, emissions, out, file);
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
  const source = figmaToDtcg(
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
  const { routes, emissions } = routeTokens(source, percentConfig);
  await writeCss(routes, emissions, out, file, null, percentConfig.units);
  assert.match(readFileSync(join(out, 'opacity.css'), 'utf8'), /--kirby-opacity-menu: 20%;/);
});

test('filters excluded tokens only at render time', async () => {
  const source = figmaToDtcg(
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
  const { routes, emissions } = routeTokens(source, config);
  await writeCss(routes, emissions, out, file);
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
  const { routes, emissions } = routeTokens(source, config);
  await writeCss(routes, emissions, out, file);
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
  const { routes, emissions } = routeTokens(source, config, baseline);
  await writeCss(routes, emissions, out, sourceFile, baselineFile, config.units, config);
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
  const { routes, emissions } = routeTokens(source, config, baseline);
  await writeCss(routes, emissions, out, sourceFile, baselineFile, config.units, config);

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
  const { routes, emissions } = routeTokens(tokens, config, tokens);
  await writeCss(routes, emissions, out, sourceFile, baselineFile, config.units, config);

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
  const { routes, emissions } = routeTokens(source, config);
  const { warnings } = await writeCss(routes, emissions, out, file);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /s\.css \[color\].*\.kirby-surface-raised.*--kirby-color-fill-extra/);
});
