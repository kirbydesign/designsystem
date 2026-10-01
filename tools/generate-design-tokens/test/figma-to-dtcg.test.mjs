import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validateConfig } from '../src/config.mjs';
import { figmaToDtcg } from '../src/figma-to-dtcg.mjs';
import { config } from './fixtures.mjs';

test('merges arbitrary exports at original paths and preserves aliases across files', () => {
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
  const tokens = figmaToDtcg(inputs, config);
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
    figmaToDtcg(inputs, config)['base surface'].color.fill.alias.$value,
    '{base surface.color.fill.main}'
  );
});

test('resolves a reference to a baseline-only primitive', () => {
  const baseline = { spacing: { s: { $type: 'dimension', $value: { value: 16, unit: 'px' } } } };
  const tokens = figmaToDtcg(
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

test('resolves aliases regardless of export order', () => {
  const tokens = figmaToDtcg(
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
    () => figmaToDtcg([{ spacing: { s: token } }, { spacing: { s: token } }], config),
    /Duplicate token: spacing\/s/
  );
  assert.throws(
    () => figmaToDtcg([{ spacing: { s: token } }, { spacing: { s: { nested: token } } }], config),
    /Token is also a group: spacing\/s/
  );
});

test('retains Figma opacity scope for number tokens at new paths', () => {
  const tokens = figmaToDtcg(
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

test('assigns units by path for ALL_SCOPES and normalizes color alpha', () => {
  const tokens = figmaToDtcg(
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

test('warns when retaining the literal value for a Figma alias target that does not exist', () => {
  const warnings = [];
  const tokens = figmaToDtcg(
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
