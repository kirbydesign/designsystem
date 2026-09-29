import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseArgs, run } from '../src/cli.mjs';

const outRoot = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const artifacts = ['tokens.json', 'spacing.css', 'radius.css', 'surfaces.css'];
const hadOutputRoot = existsSync(outRoot);
const originalArtifacts = new Map(
  artifacts.map((file) => {
    const path = join(outRoot, file);
    return [file, existsSync(path) ? readFileSync(path) : null];
  })
);

test.after(() => {
  for (const [file, contents] of originalArtifacts) {
    const path = join(outRoot, file);
    if (contents === null) rmSync(path, { force: true });
    else writeFileSync(path, contents);
  }
  if (!hadOutputRoot) rmSync(outRoot, { recursive: true, force: true });
});

test('uses positional Figma inputs for token and CSS generation', () => {
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
  const imported = await run({ config, inputs: [first, second] });
  assert.equal(imported.outRoot, outRoot);
  const tokens = JSON.parse(readFileSync(join(outRoot, 'tokens.json'), 'utf8'));
  assert.equal(tokens['border-radius'].s.$value, '{spacing.s}');
  assert.equal(tokens['border-radius'].s.$type, 'dimension');
  const rebuilt = await run({ config, cssOnly: join(outRoot, 'tokens.json') });
  assert.equal(rebuilt.outRoot, outRoot);
  for (const file of ['spacing.css', 'radius.css']) {
    assert.equal(
      readFileSync(join(outRoot, file), 'utf8'),
      readFileSync(join(rebuilt.outRoot, file), 'utf8')
    );
  }
});

test('app import compares against Kirby tokens without emitting them', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dt-app-'));
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
  await run({ baseline, inputs: [input] });
  const tokens = JSON.parse(readFileSync(join(outRoot, 'tokens.json'), 'utf8'));
  assert.equal(tokens['base surface'].color.fill.base.$value, '{system.color.green.500}');
  assert.equal(tokens.system, undefined);
  const css = readFileSync(join(outRoot, 'surfaces.css'), 'utf8');
  assert.match(css, /--kirby-color-fill-base: var\(--kirby-system-color-green-500\)/);
  assert.doesNotMatch(css, /--kirby-system-color-green-500:/);

  await run({ baseline, cssOnly: join(outRoot, 'tokens.json') });
  assert.equal(readFileSync(join(outRoot, 'surfaces.css'), 'utf8'), css);
});

test('generates from positional exports without a baseline', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dt-no-baseline-'));
  const input = join(dir, 'app.json');
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

  await run({ inputs: [input] });
  const tokens = JSON.parse(readFileSync(join(outRoot, 'tokens.json'), 'utf8'));
  assert.equal(tokens['base surface'].color.fill.base.$value, '#000000');
  assert.equal(tokens.system, undefined);
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
  const result = await run({ config, inputs: [input] });
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
