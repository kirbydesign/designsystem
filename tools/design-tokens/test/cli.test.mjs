import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { parseArgs, run } from '../src/cli.mjs';

describe('parseArgs', () => {
  test('reads a set and its space-separated files', () => {
    const opts = parseArgs(['--in', 'palette=a.json', 'b.json', '--out', 'dist']);
    assert.deepEqual(opts.inputs, [
      { set: 'palette', disposition: 'in', path: 'a.json' },
      { set: 'palette', disposition: 'in', path: 'b.json' },
    ]);
    assert.equal(opts.out, 'dist');
  });

  test('accepts repeated input flags with different sets', () => {
    const opts = parseArgs(['--in', 'palette=a.json', '--in', 'theme=b.json', '--out', 'd']);
    assert.deepEqual(opts.inputs.map((i) => i.set), ['palette', 'theme']);
  });

  test('distinguishes the three dispositions', () => {
    const opts = parseArgs(['--ref', 'p=a.json', '--in', 'p=b.json', '--delta', 't=c.json', '--out', 'd']);
    assert.deepEqual(opts.inputs.map((i) => i.disposition), ['ref', 'in', 'delta']);
  });

  test('defaults the config path', () => {
    assert.equal(parseArgs(['--out', 'd']).config, 'design-tokens.config.mjs');
  });

  test('rejects an input without <set>=', () => {
    assert.throws(() => parseArgs(['--in', 'a.json', '--out', 'd']), /requires <set>=<file>/);
  });

  test('rejects an input with an empty set name', () => {
    assert.throws(() => parseArgs(['--in', '=a.json', '--out', 'd']), /requires <set>=<file>/);
  });

  test('rejects an unknown flag', () => {
    assert.throws(() => parseArgs(['--nope']), /Unknown argument/);
  });

  test('rejects --out without a value', () => {
    assert.throws(() => parseArgs(['--out']), /--out requires a value/);
  });

  test('recognises --help', () => {
    assert.equal(parseArgs(['--help']).help, true);
  });
});

// --- End-to-end, on synthetic exports -------------------------------------

const CONFIG = `export default {
  prefix: 'kirby',
  units: { px: { scopes: ['GAP'] } },
  ruleSets: {
    palette: [
      { id: 'color', match: '{scope}/color/**', variable: '{prefix}-{scope}-color-{rest}',
        output: 'primitives/{scope}-color.css', outputReferences: false },
      { id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}',
        output: 'primitives/{collection}.css' },
    ],
    theme: [
      { id: 'skip', match: 'font/weight/**', ignore: true },
      { id: 'surface-base', match: 'base surface/**', variable: '{prefix}-color-{rest}',
        selector: ':root, .{prefix}-surface-base', output: 'semantic/color.css' },
      { id: 'surface', match: '{surface} surface/**', variable: '{prefix}-color-{rest}',
        selector: '.{prefix}-surface-{surface}', output: 'semantic/color.css' },
    ],
  },
};`;

const swatch = (hex, target, override) => ({
  $type: 'color',
  $value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex },
  $extensions: {
    ...(target ? { 'com.figma.aliasData': { targetVariableName: target } } : {}),
    ...(override ? { 'com.figma.isOverride': true } : {}),
  },
});

const PALETTE = {
  system: { color: { green: { 500: swatch('#00FF00'), 600: swatch('#00CC00') } } },
};

const THEME = {
  'base surface': { fill: { base: swatch('#00FF00', 'system/color/green/500') } },
  'raised surface': { fill: { base: swatch('#00CC00', 'system/color/green/600') } },
  font: { weight: { light: { $type: 'number', $value: 300 } } },
};

/** Writes a config plus named JSON exports into a fresh temp dir. */
function workspace(files, config = CONFIG) {
  const dir = mkdtempSync(join(tmpdir(), 'dt-cli-'));
  writeFileSync(join(dir, 'config.mjs'), config);
  for (const [name, data] of Object.entries(files)) {
    writeFileSync(join(dir, name), JSON.stringify(data));
  }
  mkdirSync(join(dir, 'out'), { recursive: true });
  return dir;
}

const inputsFor = (dir, spec) =>
  spec.map(([set, disposition, name]) => ({ set, disposition, path: join(dir, name) }));

const runIn = (dir, spec) =>
  run({ config: join(dir, 'config.mjs'), out: join(dir, 'out'), inputs: inputsFor(dir, spec) });

const read = (dir, file) => readFileSync(join(dir, 'out', file), 'utf-8');

describe('run — default build', () => {
  test('writes one file per rule output', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    const { written } = await runIn(dir, [
      ['palette', 'in', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    assert.deepEqual(written.sort(), ['primitives/system-color.css', 'semantic/color.css']);
  });

  test('names variables from the rules and resolves aliases to var()', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    await runIn(dir, [
      ['palette', 'in', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    const css = read(dir, 'semantic/color.css');
    assert.match(css, /--kirby-color-fill-base: var\(--kirby-system-color-green-500\)/);
  });

  test('merges several selectors into one output file, in rule order', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    await runIn(dir, [
      ['palette', 'in', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    const css = read(dir, 'semantic/color.css');
    assert.ok(css.indexOf(':root, .kirby-surface-base') < css.indexOf('.kirby-surface-raised'));
    assert.equal(css.match(/Do not edit directly/g).length, 1, 'exactly one generated header');
  });

  test('reports ignored leaves per rule', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    const { ignored } = await runIn(dir, [
      ['palette', 'in', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    assert.equal(ignored.get('theme/skip'), 1);
  });

  test('applies units from the config', async () => {
    const dir = workspace({
      'p.json': { spacing: { s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } } } },
    });
    await runIn(dir, [['palette', 'in', 'p.json']]);
    assert.match(read(dir, 'primitives/spacing.css'), /--kirby-spacing-s: 16px;/);
  });

  test('resolves a DTCG reference without the tree being reshaped', async () => {
    const dir = workspace({
      'p.json': {
        spacing: { xxxxs: { $type: 'number', $value: 2, $extensions: { 'com.figma.scopes': ['GAP'] } } },
        'border-radius': { xxs: { $type: 'number', $value: '{spacing.xxxxs}' } },
      },
    });
    await runIn(dir, [['palette', 'in', 'p.json']]);
    assert.match(read(dir, 'primitives/border-radius.css'), /--kirby-border-radius-xxs: var\(--kirby-spacing-xxxxs\)/);
  });
});

describe('run — reference-only inputs', () => {
  test('a --ref file resolves references but produces no file of its own', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    const { written } = await runIn(dir, [
      ['palette', 'ref', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    assert.deepEqual(written, ['semantic/color.css']);
    assert.match(read(dir, 'semantic/color.css'), /var\(--kirby-system-color-green-500\)/);
  });
});

describe('run — delta build', () => {
  test('emits only flagged leaves whose value differs from the baseline', async () => {
    const override = {
      'base surface': { fill: { base: swatch('#00CC00', 'system/color/green/600', true) } },
      'raised surface': { fill: { base: swatch('#00CC00', 'system/color/green/600', true) } },
    };
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME, 'o.json': override });
    const { deltaStats } = await runIn(dir, [
      ['palette', 'ref', 'p.json'],
      ['theme', 'ref', 't.json'],
      ['theme', 'delta', 'o.json'],
    ]);
    // base changed green-500 -> green-600; raised was already green-600.
    assert.equal(deltaStats.included, 1);
    const css = read(dir, 'semantic/color.css');
    assert.match(css, /:root, \.kirby-surface-base/);
    assert.doesNotMatch(css, /\.kirby-surface-raised/);
  });
});

describe('run — failure modes', () => {
  test('rejects a set name the config does not declare', async () => {
    const dir = workspace({ 'p.json': PALETTE });
    await assert.rejects(() => runIn(dir, [['nope', 'in', 'p.json']]), /Unknown rule set "nope"/);
  });

  test('rejects a missing input file', async () => {
    const dir = workspace({ 'p.json': PALETTE });
    await assert.rejects(() => runIn(dir, [['palette', 'in', 'absent.json']]), /file not found/);
  });

  test('requires --out', async () => {
    await assert.rejects(() => run({ config: 'c.mjs', out: null, inputs: [] }), /--out <dir> is required/);
  });

  test('requires at least one input', async () => {
    await assert.rejects(() => run({ config: 'c.mjs', out: 'x', inputs: [] }), /at least one --in/);
  });

  test('fails on a leaf no rule matches, rather than dropping it', async () => {
    const dir = workspace({ 'p.json': { mystery: { thing: swatch('#000') } }, 't.json': THEME });
    await assert.rejects(
      () => runIn(dir, [['theme', 'in', 'p.json']]),
      /No rule matched leaf "mystery\/thing"/,
    );
  });
});

describe('run — contract completeness', () => {
  test('warns when one surface omits a variable its sibling declares', async () => {
    const lopsided = {
      'base surface': { fill: { base: swatch('#000'), extra: swatch('#111') } },
      'raised surface': { fill: { base: swatch('#222') } },
    };
    const dir = workspace({ 't.json': lopsided });
    const { warnings } = await runIn(dir, [['theme', 'in', 't.json']]);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /\.kirby-surface-raised.*missing.*--kirby-color-fill-extra/s);
  });

  test('stays quiet when the surfaces agree', async () => {
    const dir = workspace({ 'p.json': PALETTE, 't.json': THEME });
    const { warnings } = await runIn(dir, [
      ['palette', 'in', 'p.json'],
      ['theme', 'in', 't.json'],
    ]);
    assert.deepEqual(warnings, []);
  });
});
