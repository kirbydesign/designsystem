import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validateConfig, loadConfig } from '../src/config.mjs';

/** A minimal valid config, spread-and-override in each test. */
const base = () => ({
  prefix: 'kirby',
  ruleSets: {
    palette: [{ id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}', output: 'p/{collection}.css' }],
  },
});

describe('validateConfig — shape', () => {
  test('accepts a minimal config', () => {
    assert.deepEqual(validateConfig(base()).prefix, 'kirby');
  });

  test('rejects a missing prefix', () => {
    const c = base();
    delete c.prefix;
    assert.throws(() => validateConfig(c), /prefix/);
  });

  test('rejects a config with no rule sets', () => {
    assert.throws(() => validateConfig({ prefix: 'kirby', ruleSets: {} }), /at least one rule set/);
  });

  test('rejects a rule set that is not an array', () => {
    assert.throws(() => validateConfig({ prefix: 'kirby', ruleSets: { palette: {} } }), /must be an array/);
  });

  test('rejects an empty rule set', () => {
    assert.throws(() => validateConfig({ prefix: 'kirby', ruleSets: { palette: [] } }), /is empty/);
  });
});

describe('validateConfig — rules', () => {
  test('rejects a duplicate id within a set', () => {
    const c = base();
    c.ruleSets.palette.push({ ...c.ruleSets.palette[0] });
    assert.throws(() => validateConfig(c), /duplicate rule id "scalar"/);
  });

  test('allows the same id in two different sets', () => {
    const c = base();
    c.ruleSets.theme = [{ id: 'scalar', match: '{g}/**', variable: '{prefix}-{path}', output: 's/{g}.css' }];
    assert.doesNotThrow(() => validateConfig(c));
  });

  test('rejects a rule with no match', () => {
    const c = base();
    delete c.ruleSets.palette[0].match;
    assert.throws(() => validateConfig(c), /requires "match"/);
  });

  test('rejects a rule with no variable', () => {
    const c = base();
    delete c.ruleSets.palette[0].variable;
    assert.throws(() => validateConfig(c), /requires "variable"/);
  });

  test('rejects a rule with no output', () => {
    const c = base();
    delete c.ruleSets.palette[0].output;
    assert.throws(() => validateConfig(c), /requires "output"/);
  });

  test('surfaces a bad pattern with the rule id attached', () => {
    const c = base();
    c.ruleSets.palette[0].match = '**/color';
    assert.throws(() => validateConfig(c), /palette\/scalar.*must be the last segment/s);
  });
});

describe('validateConfig — ignore rules', () => {
  test('accepts an ignore rule with only id and match', () => {
    const c = base();
    c.ruleSets.palette.unshift({ id: 'skip', match: 'font/weight/**', ignore: true });
    assert.doesNotThrow(() => validateConfig(c));
  });

  test('rejects an ignore rule that also declares a variable', () => {
    const c = base();
    c.ruleSets.palette.unshift({ id: 'skip', match: 'x/**', ignore: true, variable: '{prefix}-x' });
    assert.throws(() => validateConfig(c), /must not declare "variable"/);
  });

  test('rejects an ignore rule that also declares an output', () => {
    const c = base();
    c.ruleSets.palette.unshift({ id: 'skip', match: 'x/**', ignore: true, output: 'x.css' });
    assert.throws(() => validateConfig(c), /must not declare "output"/);
  });
});

describe('validateConfig — template variables are checked statically', () => {
  test('rejects a variable template referencing a capture the pattern does not define', () => {
    const c = base();
    c.ruleSets.palette[0].variable = '{prefix}-{surface}-{path}';
    assert.throws(() => validateConfig(c), /unknown template variable "surface"/);
  });

  test('rejects {rest} when the pattern has no ** tail', () => {
    const c = base();
    c.ruleSets.palette[0] = { id: 'x', match: '{a}/{b}', variable: '{prefix}-{rest}', output: 'x.css' };
    assert.throws(() => validateConfig(c), /unknown template variable "rest"/);
  });

  test('allows {rest} when the pattern has a ** tail', () => {
    const c = base();
    c.ruleSets.palette[0] = { id: 'x', match: '{a}/**', variable: '{prefix}-{rest}', output: 'x.css' };
    assert.doesNotThrow(() => validateConfig(c));
  });

  test('always allows {prefix} and {path}', () => {
    const c = base();
    c.ruleSets.palette[0] = { id: 'x', match: 'a/b', variable: '{prefix}-{path}', output: 'x.css' };
    assert.doesNotThrow(() => validateConfig(c));
  });

  test('checks the selector template too', () => {
    const c = base();
    c.ruleSets.palette[0].selector = '.{prefix}-surface-{surface}';
    assert.throws(() => validateConfig(c), /unknown template variable "surface"/);
  });

  test('checks the output template too', () => {
    const c = base();
    c.ruleSets.palette[0].output = '{tier}/x.css';
    assert.throws(() => validateConfig(c), /unknown template variable "tier"/);
  });
});

describe('validateConfig — units', () => {
  test('defaults to no units', () => {
    assert.deepEqual(validateConfig(base()).units, []);
  });

  test('normalizes scopes and compiles path patterns', () => {
    const c = { ...base(), units: { px: { scopes: ['GAP'], paths: ['background-blur/**'] } } };
    const [unit] = validateConfig(c).units;
    assert.equal(unit.suffix, 'px');
    assert.deepEqual(unit.scopes, new Set(['GAP']));
    assert.equal(unit.paths.length, 1);
  });

  test('accepts a unit declared with paths only', () => {
    const c = { ...base(), units: { '%': { paths: ['transparency/**'] } } };
    const [unit] = validateConfig(c).units;
    assert.equal(unit.suffix, '%');
    assert.deepEqual(unit.scopes, new Set());
  });

  test('rejects a unit declaring neither scopes nor paths', () => {
    const c = { ...base(), units: { px: {} } };
    assert.throws(() => validateConfig(c), /must declare "scopes" or "paths"/);
  });

  test('surfaces a bad unit path pattern with the unit attached', () => {
    const c = { ...base(), units: { px: { paths: ['**/x'] } } };
    assert.throws(() => validateConfig(c), /units\.px.*must be the last segment/s);
  });
});

describe('validateConfig — deltaFlag', () => {
  test('defaults to the Figma override extension key', () => {
    assert.equal(validateConfig(base()).deltaFlag, 'com.figma.isOverride');
  });

  test('can be overridden', () => {
    assert.equal(validateConfig({ ...base(), deltaFlag: 'x.y' }).deltaFlag, 'x.y');
  });
});

describe('loadConfig', () => {
  test('loads the default export of an .mjs module', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'dt-config-'));
    const file = join(dir, 'c.mjs');
    writeFileSync(
      file,
      `export default ${JSON.stringify(base())};`,
    );
    const config = await loadConfig(file);
    assert.equal(config.prefix, 'kirby');
    assert.ok(config.ruleSets.palette);
  });

  test('throws a clear error when the file is missing', async () => {
    await assert.rejects(() => loadConfig('/nope/missing.config.mjs'), /config file not found/i);
  });

  test('throws when the module has no default export', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'dt-config-'));
    const file = join(dir, 'c.mjs');
    writeFileSync(file, 'export const notDefault = 1;');
    await assert.rejects(() => loadConfig(file), /default export/);
  });
});

describe('validateConfig — unreachable rules', () => {
  const rule = (id, match) => ({ id, match, variable: '{prefix}-{path}', output: 'o.css' });
  const withRules = (...rules) => ({ prefix: 'kirby', ruleSets: { s: rules } });

  test('rejects a catch-all placed before a longer rule', () => {
    assert.throws(
      () => validateConfig(withRules(rule('group', '{g}/**'), rule('surface', 'base surface/{c}/**'))),
      /rule "surface" is unreachable — "group" \("\{g\}\/\*\*"\) matches every path/,
    );
  });

  test('rejects a catch-all placed before an equal-length rule', () => {
    assert.throws(
      () => validateConfig(withRules(rule('group', '{g}/**'), rule('other', '{a}/{b}/**'))),
      /unreachable/,
    );
  });

  test('accepts a catch-all placed last', () => {
    assert.doesNotThrow(() =>
      validateConfig(withRules(rule('surface', 'base surface/{c}/**'), rule('group', '{g}/**'))),
    );
  });

  test('a pattern carrying literal text is not a catch-all', () => {
    assert.doesNotThrow(() =>
      validateConfig(withRules(rule('color', '*/color/**'), rule('collection', '{c}/**'))),
    );
  });

  test('a literal suffix inside a segment is not a wildcard', () => {
    assert.doesNotThrow(() =>
      validateConfig(withRules(rule('surface', '{s} surface/{c}/**'), rule('group', '{g}/**'))),
    );
  });

  test('a catch-all does not shadow a rule matching shorter paths', () => {
    assert.doesNotThrow(() =>
      validateConfig(withRules(rule('deep', '{x}/{y}/**'), rule('shallow', '{z}/**'))),
    );
  });

  test('an ignore rule can be a catch-all too', () => {
    assert.throws(
      () => validateConfig(withRules({ id: 'skip', match: '{g}/**', ignore: true }, rule('r', '{a}/{b}/**'))),
      /unreachable/,
    );
  });
});
