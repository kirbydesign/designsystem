import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { valueHex, valueUnit, nameFromRule, filterEmission } from '../src/sd-transforms.mjs';

/** Builds the token shape Style Dictionary hands to a transform. */
const token = ({ value, original, extensions = {} }) => ({
  $value: value,
  original: { $value: original ?? value, $extensions: extensions },
});

describe('value/hex', () => {
  const figmaColor = (hex, alpha, components) => ({
    colorSpace: 'srgb',
    components: components ?? [0, 0, 0],
    ...(alpha === undefined ? {} : { alpha }),
    hex,
  });

  test('extracts hex from a fully opaque Figma colour', () => {
    const t = token({ value: figmaColor('#1C1C1C', 1) });
    assert.equal(valueHex.filter(t), true);
    assert.equal(valueHex.transform(t), '#1C1C1C');
  });

  test('extracts hex when the colour carries no alpha at all', () => {
    assert.equal(valueHex.transform(token({ value: figmaColor('#1C1C1C') })), '#1C1C1C');
  });

  test('preserves partial alpha as rgba rather than silently dropping it', () => {
    const t = token({
      value: figmaColor('#1C1C1C', 0.05999999865889549, [0.10980392, 0.10980392, 0.10980392]),
    });
    assert.equal(valueHex.transform(t), 'rgba(28, 28, 28, 0.06)');
  });

  test('preserves a fully transparent colour, which hex alone would render opaque', () => {
    const t = token({ value: figmaColor('#1C1C1C', 0, [0.10980392, 0.10980392, 0.10980392]) });
    assert.equal(valueHex.transform(t), 'rgba(28, 28, 28, 0)');
  });

  test('rounds components to whole channel values', () => {
    const t = token({ value: figmaColor('#FFFFFF', 0.5199999809265137, [1, 1, 1]) });
    assert.equal(valueHex.transform(t), 'rgba(255, 255, 255, 0.52)');
  });

  test('ignores a resolved reference', () => {
    assert.equal(valueHex.filter(token({ value: '{system.color.green.500}' })), false);
  });

  test('ignores a plain number', () => {
    assert.equal(valueHex.filter(token({ value: 16 })), false);
  });

  test('ignores an object without a hex field', () => {
    assert.equal(valueHex.filter(token({ value: { colorSpace: 'srgb' } })), false);
  });

  test('ignores a null value', () => {
    assert.equal(valueHex.filter(token({ value: null })), false);
  });
});

describe('value/unit', () => {
  test('appends the unit the rule engine assigned', () => {
    const t = token({ value: 16, extensions: { 'kirby.unit': 'px' } });
    assert.equal(valueUnit.filter(t), true);
    assert.equal(valueUnit.transform(t), '16px');
  });

  test('supports a non-px unit', () => {
    const t = token({ value: 6, extensions: { 'kirby.unit': '%' } });
    assert.equal(valueUnit.transform(t), '6%');
  });

  test('appends to zero, which would otherwise look unitless by accident', () => {
    const t = token({ value: 0, extensions: { 'kirby.unit': 'px' } });
    assert.equal(valueUnit.filter(t), true);
    assert.equal(valueUnit.transform(t), '0px');
  });

  test('skips a leaf with no unit annotation', () => {
    assert.equal(valueUnit.filter(token({ value: 300 })), false);
  });

  test('skips a string value even when annotated', () => {
    const t = token({ value: 'italic', extensions: { 'kirby.unit': 'px' } });
    assert.equal(valueUnit.filter(t), false);
  });

  test('skips a reference, whose original value is not a number', () => {
    const t = token({ value: 'var(--kirby-spacing-s)', original: '{spacing.s}', extensions: { 'kirby.unit': 'px' } });
    assert.equal(valueUnit.filter(t), false);
  });
});

describe('name/rule', () => {
  test('reads the name resolved at load time', () => {
    const t = token({ value: 1, extensions: { 'kirby.name': 'kirby-spacing-s' } });
    assert.equal(nameFromRule.transform(t), 'kirby-spacing-s');
  });
});

describe('filterEmission', () => {
  const leaf = (emit, emission) => token({ value: 1, extensions: { 'kirby.emit': emit, 'kirby.emission': emission } });

  test('matches an emitted leaf belonging to the emission', () => {
    assert.equal(filterEmission('theme/surface\u0000.kirby-surface-base')(leaf(true, 'theme/surface\u0000.kirby-surface-base')), true);
  });

  test('rejects a leaf from a different emission', () => {
    assert.equal(filterEmission('a')(leaf(true, 'b')), false);
  });

  test('rejects a reference-only leaf even when the emission matches', () => {
    assert.equal(filterEmission('a')(leaf(false, 'a')), false);
  });
});
