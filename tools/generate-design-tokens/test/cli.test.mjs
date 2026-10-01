import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { parseArgs, run } from '../src/cli.mjs';

test('parses positional Figma inputs around a --baseline flag', () => {
  const opts = parseArgs(['a.json', 'b.json', '--baseline', 'base.json', 'c.json']);
  assert.deepEqual(opts.inputs, ['a.json', 'b.json', 'c.json']);
  assert.equal(opts.baseline, 'base.json');
});

test('accepts a CSS-only input file and an explicit baseline', () => {
  const opts = parseArgs(['--baseline', 'base.json', '--css-only', 'app.json']);
  assert.equal(opts.cssOnly, 'app.json');
  assert.equal(opts.baseline, 'base.json');
});

test('does not accept custom output flags', () => {
  assert.throws(() => parseArgs(['--out', 'elsewhere']), /Unknown argument: --out/);
  assert.throws(() => parseArgs(['--import']), /Unknown argument: --import/);
});

test('imports multiple Figma files and rebuilds the CSS from their merged JSON', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dt-cli-'));
  const outRoot = join(dir, 'out');
  const config = join(dir, 'config.mjs');
  const first = join(dir, 'first.json');
  const second = join(dir, 'second.json');
  writeFileSync(
    config,
    `export default {
    prefix: 'kirby', units: { px: { scopes: ['GAP'] } },
    rules: [
      { id: 'spacing', match: 'spacing/**', variable: '{prefix}-{path}', output: 'spacing.css' },
      { id: 'radius', match: 'border-radius/**', variable: '{prefix}-{path}', output: 'radius.css' },
    ]
  }`
  );
  writeFileSync(
    first,
    JSON.stringify({
      spacing: { s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } } },
    })
  );
  writeFileSync(
    second,
    JSON.stringify({ 'border-radius': { s: { $type: 'number', $value: '{spacing.s}' } } })
  );
  await run({ config, inputs: [first, second], outRoot });
  const tokens = JSON.parse(readFileSync(join(outRoot, 'tokens.json'), 'utf8'));
  assert.equal(tokens['border-radius'].s.$value, '{spacing.s}');
  assert.equal(tokens['border-radius'].s.$type, 'dimension');
  const cssFiles = ['spacing.css', 'radius.css'];
  const importedCss = cssFiles.map((file) => readFileSync(join(outRoot, file), 'utf8'));
  for (const file of cssFiles) rmSync(join(outRoot, file));

  await run({ config, cssOnly: join(outRoot, 'tokens.json'), outRoot });
  const rebuiltCss = cssFiles.map((file) => readFileSync(join(outRoot, file), 'utf8'));
  assert.deepEqual(rebuiltCss, importedCss);
});

test('app import compares against Kirby tokens without emitting them', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dt-app-'));
  const outRoot = join(dir, 'out');
  const input = join(dir, 'app.json');
  const baseline = join(dir, 'baseline.json');
  writeFileSync(
    baseline,
    JSON.stringify({ system: { color: { green: { 500: { $type: 'color', $value: '#00ff00' } } } } })
  );
  writeFileSync(
    input,
    JSON.stringify({
      'base surface': {
        color: {
          fill: {
            base: {
              $type: 'color',
              $value: '#000000',
              $extensions: {
                'com.figma.aliasData': { targetVariableName: 'system/color/green/500' },
              },
            },
          },
        },
      },
    })
  );
  await run({ baseline, inputs: [input], outRoot });
  const tokens = JSON.parse(readFileSync(join(outRoot, 'tokens.json'), 'utf8'));
  assert.equal(tokens['base surface'].color.fill.base.$value, '{system.color.green.500}');
  assert.equal(tokens.system, undefined);
  const css = readFileSync(join(outRoot, 'surfaces.css'), 'utf8');
  assert.match(css, /--kirby-color-fill-base: var\(--kirby-system-color-green-500\)/);
  assert.doesNotMatch(css, /--kirby-system-color-green-500:/);
  rmSync(join(outRoot, 'surfaces.css'));

  await run({ baseline, cssOnly: join(outRoot, 'tokens.json'), outRoot });
  assert.equal(readFileSync(join(outRoot, 'surfaces.css'), 'utf8'), css);
});

test('returns warnings for Figma aliases whose targets are not exported', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dt-alias-warning-'));
  const config = join(dir, 'config.mjs');
  const input = join(dir, 'app.json');
  writeFileSync(
    config,
    `export default {
      prefix: 'kirby', units: {},
      rules: [{ id: 'colors', match: 'color/**', variable: '{prefix}-{path}', output: 'spacing.css' }]
    }`
  );
  writeFileSync(
    input,
    JSON.stringify({
      color: {
        accent: {
          $type: 'color',
          $value: '#00f',
          $extensions: { 'com.figma.aliasData': { targetVariableName: 'missing/token' } },
        },
      },
    })
  );
  const result = await run({ config, inputs: [input], outRoot: join(dir, 'out') });
  assert.deepEqual(result.warnings, [
    'color/accent: Figma alias target "missing/token" is not present in the import or baseline; retaining its literal value.',
  ]);
});

test('requires one input mode', async () => {
  await assert.rejects(() => run({ inputs: [] }), /Provide Figma input files or --css-only/);
  await assert.rejects(
    () => run({ cssOnly: 'tokens.json', inputs: ['input.json'] }),
    /Use positional Figma inputs or --css-only, not both/
  );
});
