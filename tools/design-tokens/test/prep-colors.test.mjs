/**
 * Tests for src/prep-colors.mjs
 *
 * Resolution is membership-based (ADR-001): a semantic alias resolves to a
 * DTCG reference only when its Figma variable name matches a color-primitive
 * leaf path. No collection display names, no palette tiers.
 *
 * Run: node --test
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  prepColorPrimitives,
  buildMembershipMap,
  prepSemantic,
  prepSemanticOverrideDelta,
} from '../src/prep-colors.mjs';

const colorObj = (hex) => ({ hex, colorSpace: 'srgb', components: [0, 0, 0], alpha: 1 });

// A small system + brand palette used across the semantic tests.
const systemFile = {
  system: {
    color: {
      'light-grey': { 100: { $type: 'color', $value: colorObj('#F6F6F6'), $extensions: { id: 'a' } } },
      white: { '00': { $type: 'color', $value: colorObj('#FFFFFF'), $extensions: { id: 'b' } } },
      green: { 500: { $type: 'color', $value: colorObj('#336859'), $extensions: {} } },
    },
  },
};
const brandFile = {
  brand: {
    color: {
      'dark-blue': { 950: { $type: 'color', $value: colorObj('#003366'), $extensions: {} } },
      green: { 500: { $type: 'color', $value: colorObj('#C1EF43'), $extensions: {} } },
    },
  },
};

describe('prepColorPrimitives', () => {
  it('merges color files into one tree, preserving full Figma paths', () => {
    const tree = prepColorPrimitives([systemFile, brandFile]);
    assert.equal(tree.system.color['light-grey'][100].$value.hex, '#F6F6F6');
    assert.equal(tree.brand.color['dark-blue'][950].$value.hex, '#003366');
  });

  it('carries the full color object through (no hex extraction) and drops extensions', () => {
    const tree = prepColorPrimitives([systemFile]);
    const leaf = tree.system.color.white['00'];
    assert.deepEqual(Object.keys(leaf).sort(), ['$type', '$value']);
    assert.equal(typeof leaf.$value, 'object');
    assert.equal(leaf.$value.hex, '#FFFFFF');
  });

  it('ignores non-color leaves', () => {
    const tree = prepColorPrimitives([{ scope: { n: { $type: 'number', $value: 4 } } }]);
    assert.deepEqual(tree, {});
  });
});

describe('buildMembershipMap', () => {
  it('maps each leaf variable name to its DTCG reference', () => {
    const map = buildMembershipMap(prepColorPrimitives([systemFile, brandFile]));
    assert.equal(map.get('system/color/light-grey/100'), '{system.color.light-grey.100}');
    assert.equal(map.get('brand/color/dark-blue/950'), '{brand.color.dark-blue.950}');
    assert.equal(map.get('nope/1'), undefined);
  });
});

describe('prepSemantic', () => {
  const membership = buildMembershipMap(prepColorPrimitives([systemFile, brandFile]));

  it('resolves aliasData to references by membership', () => {
    const semanticData = {
      base: {
        fill: {
          'base-default': {
            $type: 'color',
            $value: colorObj('#F6F6F6'),
            $extensions: {
              'com.figma.aliasData': {
                targetVariableName: 'system/color/light-grey/100',
                targetVariableSetName: '08 System Palette',
              },
            },
          },
        },
      },
      brand: {
        fill: {
          'loud-default': {
            $type: 'color',
            $value: colorObj('#003366'),
            $extensions: {
              'com.figma.aliasData': {
                targetVariableName: 'brand/color/dark-blue/950',
                targetVariableSetName: '09 Default Brand Palette',
              },
            },
          },
        },
      },
    };

    const result = prepSemantic(semanticData, membership);

    assert.equal(result.base.fill['base-default'].$value, '{system.color.light-grey.100}');
    assert.equal(result.brand.fill['loud-default'].$value, '{brand.color.dark-blue.950}');
  });

  it('inlines the color object when the alias target is not an emitted primitive', () => {
    const semanticData = {
      base: {
        border: {
          'focus-loud': {
            $type: 'color',
            $value: colorObj('#238CEC'),
            $extensions: {
              'com.figma.aliasData': {
                targetVariableName: 'focus',
                targetVariableSetName: '03 Color palette',
              },
            },
          },
        },
      },
    };

    const result = prepSemantic(semanticData, membership);

    assert.equal(result.base.border['focus-loud'].$value.hex, '#238CEC');
  });

  it('inlines the color object when there is no aliasData', () => {
    const semanticData = {
      base: { border: { x: { $type: 'color', $value: colorObj('#238CEC'), $extensions: {} } } },
    };
    const result = prepSemantic(semanticData, membership);
    assert.equal(result.base.border.x.$value.hex, '#238CEC');
  });

  it('outputs all present surfaces', () => {
    const semanticData = {
      base: { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: {} } } },
      raised: { fill: { a: { $type: 'color', $value: colorObj('#BBB'), $extensions: {} } } },
      brand: { fill: { a: { $type: 'color', $value: colorObj('#CCC'), $extensions: {} } } },
    };
    const result = prepSemantic(semanticData, membership);
    assert.deepEqual(Object.keys(result).sort(), ['base', 'brand', 'raised']);
  });

  it('normalizes the Figma " surface" suffix to canonical surface ids', () => {
    const semanticData = {
      'base surface': { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: {} } } },
      'raised surface': { fill: { a: { $type: 'color', $value: colorObj('#BBB'), $extensions: {} } } },
      'brand surface': { fill: { a: { $type: 'color', $value: colorObj('#CCC'), $extensions: {} } } },
      // non-surface groups are ignored
      spot: { fill: { a: { $type: 'color', $value: colorObj('#DDD'), $extensions: {} } } },
      font: { size: { a: { $type: 'number', $value: 12 } } },
    };
    const result = prepSemantic(semanticData, membership);
    assert.deepEqual(Object.keys(result).sort(), ['base', 'brand', 'raised']);
    assert.equal(result.base.fill.a.$value.hex, '#AAA');
    assert.equal(result.brand.fill.a.$value.hex, '#CCC');
  });
});

describe('prepSemanticOverrideDelta', () => {
  const membership = buildMembershipMap(prepColorPrimitives([systemFile, brandFile]));

  const alias = (name) => ({ 'com.figma.aliasData': { targetVariableName: name } });
  const override = (name) => ({
    'com.figma.isOverride': true,
    'com.figma.aliasData': { targetVariableName: name },
  });

  it('includes only overrides that differ from default', () => {
    const defaultSemantic = {
      base: {
        fill: {
          // default success points at the system green
          success: { $type: 'color', $value: colorObj('#336859'), $extensions: alias('system/color/green/500') },
          // stays the same in the override
          neutral: { $type: 'color', $value: colorObj('#FFFFFF'), $extensions: alias('system/color/white/00') },
        },
      },
    };

    const overrideSemantic = {
      base: {
        fill: {
          // override re-points success at the brand green -> differs -> included
          success: { $type: 'color', $value: colorObj('#C1EF43'), $extensions: override('brand/color/green/500') },
          // same target as default -> excluded
          neutral: { $type: 'color', $value: colorObj('#FFFFFF'), $extensions: override('system/color/white/00') },
        },
      },
    };

    const { tokens, stats } = prepSemanticOverrideDelta(overrideSemantic, defaultSemantic, membership);

    assert.equal(tokens.base.fill.success.$value, '{brand.color.green.500}');
    assert.equal(tokens.base.fill.neutral, undefined);
    assert.equal(stats.included, 1);
    assert.equal(stats.overrides, 2);
  });

  it('excludes tokens not marked as override', () => {
    const defaultSemantic = {
      base: { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: alias('system/color/green/500') } } },
    };
    const overrideSemantic = {
      base: { fill: { a: { $type: 'color', $value: colorObj('#BBB'), $extensions: alias('brand/color/green/500') } } },
    };

    const { tokens, stats } = prepSemanticOverrideDelta(overrideSemantic, defaultSemantic, membership);

    assert.equal(tokens.base, undefined);
    assert.equal(stats.overrides, 0);
    assert.equal(stats.included, 0);
  });

  it('handles multiple surfaces', () => {
    const defaultSemantic = {
      base: { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: alias('system/color/green/500') } } },
      raised: { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: alias('system/color/green/500') } } },
    };
    const overrideSemantic = {
      base: { fill: { a: { $type: 'color', $value: colorObj('#BBB'), $extensions: override('brand/color/green/500') } } },
      raised: { fill: { a: { $type: 'color', $value: colorObj('#CCC'), $extensions: override('brand/color/dark-blue/950') } } },
    };

    const { tokens } = prepSemanticOverrideDelta(overrideSemantic, defaultSemantic, membership);

    assert.equal(tokens.base.fill.a.$value, '{brand.color.green.500}');
    assert.equal(tokens.raised.fill.a.$value, '{brand.color.dark-blue.950}');
  });

  it('normalizes the " surface" suffix and matches default against override', () => {
    const defaultSemantic = {
      'base surface': { fill: { a: { $type: 'color', $value: colorObj('#AAA'), $extensions: alias('system/color/green/500') } } },
    };
    const overrideSemantic = {
      'base surface': { fill: { a: { $type: 'color', $value: colorObj('#BBB'), $extensions: override('brand/color/green/500') } } },
    };

    const { tokens, stats } = prepSemanticOverrideDelta(overrideSemantic, defaultSemantic, membership);

    assert.equal(tokens.base.fill.a.$value, '{brand.color.green.500}');
    assert.equal(stats.included, 1);
  });
});
