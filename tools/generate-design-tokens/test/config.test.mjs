import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validateConfig, loadConfig } from '../src/config.mjs';
import { figmaToDtcg } from '../src/figma-to-dtcg.mjs';

/** A minimal valid config, spread-and-override in each test. */
const base = () => ({
  variableName: (path) => ['kirby', ...path],
  outputs: { 'p.css': [{ include: ['**'] }] },
});

describe('validateConfig', () => {
  test('accepts a minimal config', () => {
    assert.doesNotThrow(() => validateConfig(base()));
  });

  test('rejects invalid entries with their location', () => {
    const cases = [
      [{ variableName: undefined }, /requires a "variableName\(path\)" function/],
      [{ outputs: {} }, /requires "outputs"/],
      [{ outputs: { 'p.css': [] } }, /outputs\["p.css"\] must be a non-empty array/],
      [{ outputs: { 'p.css': [{}] } }, /outputs\["p.css"\]\[0\]\.include must be an array/],
      [{ outputs: { 'p.css': [{ include: 'x/**' }] } }, /\[0\]\.include must be an array/],
      [{ outputs: { 'p.css': [{ include: [] }] } }, /\[0\] requires a non-empty "include"/],
      [{ outputs: { 'p.css': [{ include: ['**'], section: 1 }] } }, /\[0\]\.section must be/],
      [{ outputs: { 'p.css': [{ include: ['**'], selector: [] }] } }, /\[0\]\.selector must be/],
      [{ ignore: 'font/**' }, /ignore must be an array of path globs/],
      [{ units: { px: {} } }, /units\["px"\] must declare "scopes" or "include"/],
    ];
    for (const [override, message] of cases) {
      assert.throws(() => validateConfig({ ...base(), ...override }), message);
    }
  });

  test('leaves numbers unitless when no units are configured', () => {
    const tokens = figmaToDtcg(
      [{ spacing: { s: { $type: 'number', $value: 16 } } }],
      validateConfig(base())
    );
    assert.deepEqual(tokens.spacing.s, { $type: 'number', $value: 16 });
  });
});

describe('loadConfig', () => {
  test('loads the default export of an .mjs module', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'dt-config-'));
    const file = join(dir, 'c.mjs');
    writeFileSync(
      file,
      `export default {
        variableName: (path) => ['kirby', ...path],
        outputs: { 'p.css': [{ include: ['**'] }] },
      };`
    );
    const config = await loadConfig(file);
    assert.equal(config.route(['spacing', 's']).output, 'p.css');
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
