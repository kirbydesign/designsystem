import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { compilePattern, matchPattern, interpolate, slug, resolveRule } from '../src/rules.mjs';
import { validateConfig } from '../src/config.mjs';

describe('slug', () => {
  test('lowercases and collapses non-alphanumerics to single dashes', () => {
    assert.equal(slug('Component Specs'), 'component-specs');
  });

  test('trims leading and trailing dashes', () => {
    assert.equal(slug('  --Dark Blue--  '), 'dark-blue');
  });
});

describe('matchPattern — literal segments', () => {
  test('matches an exact path', () => {
    const p = compilePattern('font/family');
    assert.deepEqual(matchPattern(p, ['font', 'family']), {});
  });

  test('returns null when the path is longer than the pattern', () => {
    const p = compilePattern('font/family');
    assert.equal(matchPattern(p, ['font', 'family', 'extra']), null);
  });
});

describe('matchPattern — placeholders', () => {
  test('* matches any one segment without capturing', () => {
    const p = compilePattern('*/color');
    assert.deepEqual(matchPattern(p, ['system', 'color']), {});
  });

  test('{name} captures one segment', () => {
    const p = compilePattern('{scope}/color');
    assert.deepEqual(matchPattern(p, ['system', 'color']), { scope: 'system' });
  });

  test('a placeholder does not match across a segment boundary', () => {
    const p = compilePattern('{scope}');
    assert.equal(matchPattern(p, ['system', 'color']), null);
  });

  test('{name} surface captures only the leading part of the segment', () => {
    const p = compilePattern('{surface} surface');
    assert.deepEqual(matchPattern(p, ['raised surface']), { surface: 'raised' });
  });

  test('{name} surface does not match a segment lacking the suffix', () => {
    const p = compilePattern('{surface} surface');
    assert.equal(matchPattern(p, ['system']), null);
  });

  test('* surface matches the suffix without capturing', () => {
    const p = compilePattern('* surface/elevation');
    assert.deepEqual(matchPattern(p, ['base surface', 'elevation']), {});
  });

  test('regex metacharacters in literal text are escaped', () => {
    const p = compilePattern('a.b/{x}');
    assert.equal(matchPattern(p, ['axb', 'y']), null);
    assert.deepEqual(matchPattern(p, ['a.b', 'y']), { x: 'y' });
  });
});

describe('matchPattern — ** tail', () => {
  test('captures the remaining segments as a dash-joined rest', () => {
    const p = compilePattern('{scope}/color/**');
    assert.deepEqual(matchPattern(p, ['system', 'color', 'green', '500']), {
      scope: 'system',
      rest: 'green-500',
    });
  });

  test('requires at least one remaining segment', () => {
    const p = compilePattern('{scope}/color/**');
    assert.equal(matchPattern(p, ['system', 'color']), null);
  });

  test('rejects ** anywhere but the last segment', () => {
    assert.throws(() => compilePattern('**/color'), /\*\* must be the last segment/);
  });
});

describe('interpolate', () => {
  test('substitutes captures and the prefix', () => {
    assert.equal(
      interpolate('{prefix}-{scope}-color-{rest}', {
        prefix: 'kirby',
        scope: 'system',
        rest: 'green-500',
      }),
      'kirby-system-color-green-500'
    );
  });

  test('slugs interpolated values', () => {
    assert.equal(
      interpolate('{prefix}-{category}', { prefix: 'kirby', category: 'Chart Colors' }),
      'kirby-chart-colors'
    );
  });

  test('leaves literal text including dots and slashes intact', () => {
    assert.equal(
      interpolate('semantic/{category}.css', { category: 'color' }),
      'semantic/color.css'
    );
  });

  test('throws on an unknown placeholder', () => {
    assert.throws(
      () => interpolate('{prefix}-{nope}', { prefix: 'kirby' }),
      /unknown template variable "nope"/
    );
  });
});

describe('resolveRule', () => {
  const validated = (rules) => validateConfig({ prefix: 'kirby', rules }).rules;
  const ruleDefinitions = [
    {
      id: 'color',
      match: '{scope}/color/**',
      variable: '{prefix}-{scope}-color-{rest}',
      output: 'primitives/{scope}-color.css',
    },
    {
      id: 'scalar',
      match: '{collection}/**',
      variable: '{prefix}-{path}',
      output: 'primitives/{collection}.css',
    },
  ];
  const rules = validated(ruleDefinitions);

  test('returns the first matching rule, not the most specific', () => {
    const r = resolveRule(rules, ['system', 'color', 'green', '500'], 'kirby');
    assert.equal(r.rule.id, 'color');
    assert.equal(r.variable, 'kirby-system-color-green-500');
    assert.equal(r.output, 'primitives/system-color.css');
  });

  test('falls through to a later rule when the earlier one does not match', () => {
    const r = resolveRule(rules, ['spacing', 's'], 'kirby');
    assert.equal(r.rule.id, 'scalar');
    assert.equal(r.variable, 'kirby-spacing-s');
    assert.equal(r.output, 'primitives/spacing.css');
  });

  test('defaults the selector to :root', () => {
    const r = resolveRule(rules, ['spacing', 's'], 'kirby');
    assert.equal(r.selector, ':root');
  });

  test('interpolates the selector template', () => {
    const surfaceRules = validated([
      {
        id: 'surface',
        match: '{surface} surface/**',
        variable: '{prefix}-color-{rest}',
        selector: '.{prefix}-surface-{surface}',
        output: 'semantic/color.css',
      },
    ]);
    const r = resolveRule(surfaceRules, ['raised surface', 'fill', 'base'], 'kirby');
    assert.equal(r.selector, '.kirby-surface-raised');
    assert.equal(r.variable, 'kirby-color-fill-base');
  });

  test('returns null when no rule matches', () => {
    assert.equal(resolveRule(rules, [], 'kirby'), null);
  });

  test('reports an ignore rule without producing a name or output', () => {
    const withIgnore = validated([
      { id: 'skip', match: 'font/weight/**', ignore: true },
      ...ruleDefinitions,
    ]);
    const r = resolveRule(withIgnore, ['font', 'weight', 'light'], 'kirby');
    assert.equal(r.rule.id, 'skip');
    assert.equal(r.ignored, true);
    assert.equal(r.variable, undefined);
    assert.equal(r.output, undefined);
  });

  test('defaults outputReferences to true and honours an explicit false', () => {
    assert.equal(resolveRule(rules, ['spacing', 's'], 'kirby').outputReferences, true);
    const noRefs = validated([{ ...ruleDefinitions[0], outputReferences: false }]);
    assert.equal(
      resolveRule(noRefs, ['system', 'color', 'green', '500'], 'kirby').outputReferences,
      false
    );
  });
});
