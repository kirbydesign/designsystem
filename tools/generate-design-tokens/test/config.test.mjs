import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validateConfig, loadConfig } from '../src/config.mjs';

/** A minimal valid config, spread-and-override in each test. */
const base = () => ({
  prefix: 'kirby',
  rules: [
    {
      id: 'scalar',
      match: '{collection}/**',
      variable: '{prefix}-{path}',
      output: 'p/{collection}.css',
    },
  ],
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

  test('rejects a rule set that is not an array', () => {
    assert.throws(() => validateConfig({ prefix: 'kirby', rules: {} }), /non-empty "rules"/);
  });

  test('rejects an empty rule list', () => {
    assert.throws(() => validateConfig({ prefix: 'kirby', rules: [] }), /non-empty "rules"/);
  });
});

describe('validateConfig — rules', () => {
  test('rejects a duplicate id within a set', () => {
    const c = base();
    c.rules.push({ ...c.rules[0] });
    assert.throws(() => validateConfig(c), /Duplicate rule id "scalar"/);
  });

  test('rejects a rule with no match', () => {
    const c = base();
    delete c.rules[0].match;
    assert.throws(() => validateConfig(c), /requires "match"/);
  });

  test('rejects a rule with no variable', () => {
    const c = base();
    delete c.rules[0].variable;
    assert.throws(() => validateConfig(c), /requires "variable"/);
  });

  test('rejects a rule with no output', () => {
    const c = base();
    delete c.rules[0].output;
    assert.throws(() => validateConfig(c), /requires "output"/);
  });

  test('surfaces a bad pattern with the rule id attached', () => {
    const c = base();
    c.rules[0].match = '**/color';
    assert.throws(() => validateConfig(c), /scalar.*must be the last segment/s);
  });
});

describe('validateConfig — ignore rules', () => {
  test('accepts an ignore rule with only id and match', () => {
    const c = base();
    c.rules.unshift({ id: 'skip', match: 'font/weight/**', ignore: true });
    assert.doesNotThrow(() => validateConfig(c));
  });

  test('rejects an ignore rule that also declares a variable', () => {
    const c = base();
    c.rules.unshift({
      id: 'skip',
      match: 'x/**',
      ignore: true,
      variable: '{prefix}-x',
    });
    assert.throws(() => validateConfig(c), /must not declare "variable"/);
  });

  test('rejects an ignore rule that also declares an output', () => {
    const c = base();
    c.rules.unshift({ id: 'skip', match: 'x/**', ignore: true, output: 'x.css' });
    assert.throws(() => validateConfig(c), /must not declare "output"/);
  });
});

describe('validateConfig — template variables are checked statically', () => {
  test('rejects a variable template referencing a capture the pattern does not define', () => {
    const c = base();
    c.rules[0].variable = '{prefix}-{surface}-{path}';
    assert.throws(() => validateConfig(c), /unknown template variable "surface"/);
  });

  test('rejects {rest} when the pattern has no ** tail', () => {
    const c = base();
    c.rules[0] = {
      id: 'x',
      match: '{a}/{b}',
      variable: '{prefix}-{rest}',
      output: 'x.css',
    };
    assert.throws(() => validateConfig(c), /unknown template variable "rest"/);
  });

  test('checks the selector template too', () => {
    const c = base();
    c.rules[0].selector = '.{prefix}-surface-{surface}';
    assert.throws(() => validateConfig(c), /unknown template variable "surface"/);
  });

  test('checks the output template too', () => {
    const c = base();
    c.rules[0].output = '{tier}/x.css';
    assert.throws(() => validateConfig(c), /unknown template variable "tier"/);
  });
});

describe('validateConfig — units', () => {
  test('defaults to no units', () => {
    assert.deepEqual(validateConfig(base()).units, []);
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

describe('loadConfig', () => {
  test('loads the default export of an .mjs module', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'dt-config-'));
    const file = join(dir, 'c.mjs');
    writeFileSync(file, `export default ${JSON.stringify(base())};`);
    const config = await loadConfig(file);
    assert.equal(config.prefix, 'kirby');
    assert.ok(config.rules);
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
  const withRules = (...rules) => ({ prefix: 'kirby', rules });

  test('rejects a catch-all placed before a longer rule', () => {
    assert.throws(
      () =>
        validateConfig(withRules(rule('group', '{g}/**'), rule('surface', 'base surface/{c}/**'))),
      /Rule "surface" is unreachable — "group" \("\{g\}\/\*\*"\) matches every path/
    );
  });

  test('rejects a catch-all placed before an equal-length rule', () => {
    assert.throws(
      () => validateConfig(withRules(rule('group', '{g}/**'), rule('other', '{a}/{b}/**'))),
      /unreachable/
    );
  });

  test('an ignore rule can be a catch-all too', () => {
    assert.throws(
      () =>
        validateConfig(
          withRules({ id: 'skip', match: '{g}/**', ignore: true }, rule('r', '{a}/{b}/**'))
        ),
      /unreachable/
    );
  });
});
