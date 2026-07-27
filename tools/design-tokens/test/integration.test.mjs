/**
 * Integration gate against the real Figma exports.
 *
 * Phase 1 compared output byte-for-byte against a snapshot of the pre-rewrite
 * pipeline. That snapshot has been retired: the export has since been
 * restructured *and* re-pointed at a different brand, so there is no prior
 * output left to diff against.
 *
 * What replaces it is structural. These assertions describe the contract
 * between the export shape, the config and the emitted CSS — so they keep
 * holding when palette values change, and break when the shape moves.
 *
 * The exports are gitignored build input, so this suite skips itself when they
 * are absent. Everything else in test/ runs on committed fixtures.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { run } from '../src/cli.mjs';

const REPO = resolve(import.meta.dirname, '../../..');
const PALETTE = ['specs.json', 'primitive.color.system.json', 'primitive.color.brand.json'];
const THEME = 'semantic.color.brand.json';

const available = [...PALETTE, THEME].every((f) => existsSync(join(REPO, f)));

describe('integration against the real Figma exports', { skip: available ? false : 'Figma exports not present' }, () => {
  let cached;

  /** Builds once with the real config and exports; memoised across tests. */
  const build = async () => {
    cached ??= (async () => {
      const out = mkdtempSync(join(tmpdir(), 'dt-integration-'));
      const result = await run({
        config: join(REPO, 'design-tokens.config.mjs'),
        out,
        inputs: [
          ...PALETTE.map((f) => ({ set: 'palette', disposition: 'in', path: join(REPO, f) })),
          { set: 'theme', disposition: 'in', path: join(REPO, THEME) },
        ],
      });
      return { out, ...result };
    })();
    return cached;
  };

  const css = async (file) => readFileSync(join((await build()).out, file), 'utf-8');

  test('routes the whole build into three files', async () => {
    const { written } = await build();
    assert.deepEqual(written.filter((f) => f.endsWith('.css')).sort(), [
      'primitives/collection.css',
      'primitives/color.css',
      'semantic/theme.css',
    ]);
  });

  test('groups surface blocks by category behind a section comment', async () => {
    const theme = await css('semantic/theme.css');
    const order = [...theme.matchAll(/^\/\*\n \* (.+)\n \*\/$/gm)].map((m) => m[1]);
    assert.deepEqual(order, [
      'color',
      'input',
      'badge',
      'spot',
      'skeleton',
      'toggle',
      'imagebanner',
      'elevation',
      'font',
    ]);
    // Each section re-declares the contract under all three surface selectors.
    const spot = theme.slice(theme.indexOf('* spot'), theme.indexOf('* skeleton'));
    assert.deepEqual(
      [...spot.matchAll(/^(\S[^{\n]*) \{$/gm)].map((m) => m[1]),
      [':root, .kirby-surface-base', '.kirby-surface-raised', '.kirby-surface-brand'],
    );
  });

  test('scopes the completeness check to a section, so base-only groups stay quiet', async () => {
    const { warnings } = await build();
    // imageBanner exists on the base surface only; it must not be reported
    // against the groups that are defined on all three.
    assert.ok(
      !warnings.some((w) => w.includes('imagebanner')),
      `expected no imagebanner warnings, got: ${JSON.stringify(warnings)}`,
    );
  });

  test('names standard surface tokens without a component segment', async () => {
    assert.match(await css('semantic/theme.css'), /--kirby-color-fill-base:/);
  });

  test('names component tokens with the component in front', async () => {
    const theme = await css('semantic/theme.css');
    assert.match(theme, /--kirby-spot-color-content-base:/);
    assert.match(theme, /--kirby-toggle-color-fill:/);
  });

  test('re-declares each surface contract under its own selector', async () => {
    const theme = await css('semantic/theme.css');
    for (const selector of [':root, .kirby-surface-base', '.kirby-surface-raised', '.kirby-surface-brand']) {
      assert.ok(theme.includes(selector), `expected block for ${selector}`);
    }
    assert.equal(theme.match(/Do not edit directly/g).length, 1, 'exactly one generated header');
  });

  test('resolves semantic aliases to var() rather than inlining values', async () => {
    assert.match(await css('semantic/theme.css'), /--kirby-color-fill-base: var\(--kirby-[\w-]+\)/);
  });

  test('units elevation atomics, which Figma scopes ALL_SCOPES', async () => {
    const theme = await css('semantic/theme.css');
    assert.match(theme, /--kirby-elevation-2-blur: \d+px;/);
    assert.doesNotMatch(theme, /--kirby-elevation-2-blur: \d+;/);
  });

  test('preserves alpha on translucent colours instead of flattening to hex', async () => {
    assert.match(await css('semantic/theme.css'), /--kirby-skeleton-color-fill: rgba\(\d+, \d+, \d+, 0\.\d+\);/);
    assert.match(await css('primitives/color.css'), /--kirby-system-color-white-00-94: rgba\(255, 255, 255, 0\.94\);/);
  });

  test('emits the opacity values Figma stores inside the colour scope', async () => {
    assert.match(await css('primitives/color.css'), /--kirby-system-color-transparency-20: 20%;/);
  });

  test('resolves DTCG references between primitive collections', async () => {
    assert.match(await css('primitives/collection.css'), /--kirby-border-radius-xxs: var\(--kirby-spacing-xxxxs\)/);
  });

  test('ignores only what the config excludes deliberately', async () => {
    const { ignored } = await build();
    assert.deepEqual([...ignored.keys()].sort(), ['theme/ignore-chart', 'theme/ignore-font-weight']);
  });

  test('emits no chart tokens while the ignore rule is in place', async () => {
    assert.doesNotMatch(await css('semantic/theme.css'), /chart/);
  });

  test('resolves every alias except the values Figma holds inline', async () => {
    const { unresolvedAliases } = await build();
    assert.deepEqual(
      [...unresolvedAliases.keys()],
      ['focus'],
      'an unexpected unresolved target usually means a palette export is stale',
    );
  });

  test('flags surfaces whose contracts disagree', async () => {
    const { warnings } = await build();
    // `spot/raised/color/fill/spot-danger` should be `danger`, as on the other
    // two surfaces. Remove this expectation once the export is corrected.
    assert.ok(
      warnings.some((w) => w.includes('theme.css [spot]') && w.includes('spot-danger')),
      `expected the spot asymmetry to be reported, got: ${JSON.stringify(warnings)}`,
    );
  });
});
