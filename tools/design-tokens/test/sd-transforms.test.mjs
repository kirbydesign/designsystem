/**
 * Tests for src/sd-transforms.mjs
 *
 * Run: node --test
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  valueHex,
  valuePxUnit,
  createTransforms,
  filterCollection,
  filterSurface,
  filterSurfaceChart,
  isChartToken,
} from '../src/sd-transforms.mjs';

describe('valueHex', () => {
  it('extracts hex from a Figma color object', () => {
    const token = { $value: { hex: '#FFFFFF', colorSpace: 'srgb', components: [1, 1, 1], alpha: 1 } };
    assert.equal(valueHex.filter(token), true);
    assert.equal(valueHex.transform(token), '#FFFFFF');
  });

  it('ignores references and plain strings', () => {
    assert.equal(valueHex.filter({ $value: '{core.white.00}' }), false);
    assert.equal(valueHex.filter({ $value: '#abcabc' }), false);
    assert.equal(valueHex.filter({ $value: 16 }), false);
  });
});

describe('valuePxUnit', () => {
  const dimension = (value) => ({
    $value: value,
    original: { $value: value, $extensions: { 'com.figma.scopes': ['GAP'] } },
  });

  it('appends px to dimension-scoped numeric values', () => {
    assert.equal(valuePxUnit.transform(dimension(16)), '16px');
  });

  it('fires for dimension scopes', () => {
    assert.equal(valuePxUnit.filter(dimension(16)), true);
    assert.equal(
      valuePxUnit.filter({ original: { $value: 8, $extensions: { 'com.figma.scopes': ['CORNER_RADIUS'] } } }),
      true,
    );
  });

  it('leaves non-dimension numbers unitless (font-weight, loudness)', () => {
    assert.equal(
      valuePxUnit.filter({ original: { $value: 700, $extensions: { 'com.figma.scopes': ['FONT_STYLE'] } } }),
      false,
    );
    assert.equal(
      valuePxUnit.filter({ original: { $value: 4, $extensions: { 'com.figma.scopes': ['ALL_SCOPES'] } } }),
      false,
    );
  });

  it('never fires for references or strings', () => {
    assert.equal(
      valuePxUnit.filter({ original: { $value: '{kirby-spacing.s}', $extensions: { 'com.figma.scopes': ['CORNER_RADIUS'] } } }),
      false,
    );
    assert.equal(
      valuePxUnit.filter({ original: { $value: 'italic', $extensions: { 'com.figma.scopes': ['FONT_STYLE'] } } }),
      false,
    );
  });

  it('leaves numbers without scopes unitless', () => {
    assert.equal(valuePxUnit.filter({ original: { $value: 16 } }), false);
  });
});

describe('createTransforms', () => {
  const { namePrimitive, nameColor, nameSemantic } = createTransforms('kirby');

  it('namePrimitive joins the prefixed collection path', () => {
    assert.equal(namePrimitive.transform({ path: ['kirby-spacing', 's'] }), 'kirby-spacing-s');
    assert.equal(
      namePrimitive.transform({ path: ['kirby-border-radius', 'xxs'] }),
      'kirby-border-radius-xxs',
    );
  });

  it('nameColor prefixes the full Figma path (no tier slicing)', () => {
    assert.equal(
      nameColor.transform({ path: ['system', 'color', 'green', '100'] }),
      'kirby-system-color-green-100',
    );
    assert.equal(
      nameColor.transform({ path: ['brand', 'color', 'dark-blue', '950'] }),
      'kirby-brand-color-dark-blue-950',
    );
  });

  it('nameSemantic handles color-primitive refs and surface tokens', () => {
    assert.equal(
      nameSemantic.transform({ path: ['system', 'color', 'green', '100'] }),
      'kirby-system-color-green-100',
    );
    assert.equal(
      nameSemantic.transform({ path: ['base', 'fill', 'base-default'] }),
      'kirby-theme-color-fill-base-default',
    );
    assert.equal(
      nameSemantic.transform({ path: ['brand', 'border', 'focus-loud'] }),
      'kirby-theme-color-border-focus-loud',
    );
    // A `brand` color primitive must NOT be mistaken for the `brand` surface:
    // `color` at path[1] marks it as a primitive ref, keeping its full path.
    assert.equal(
      nameSemantic.transform({ path: ['brand', 'color', 'green', '500'] }),
      'kirby-brand-color-green-500',
    );
  });

  it('honors a custom prefix', () => {
    const { nameColor: acmeColor } = createTransforms('acme');
    assert.equal(
      acmeColor.transform({ path: ['system', 'color', 'green', '100'] }),
      'acme-system-color-green-100',
    );
  });
});

describe('filters', () => {
  it('filterCollection matches by leading collection key', () => {
    const f = filterCollection('kirby-spacing');
    assert.equal(f({ path: ['kirby-spacing', 's'] }), true);
    assert.equal(f({ path: ['kirby-border-radius', 'n'] }), false);
  });

  it('isChartToken detects chart tokens by path[1]', () => {
    assert.equal(isChartToken({ path: ['base', 'chart', 'positive', '01', 'default'] }), true);
    assert.equal(isChartToken({ path: ['base', 'fill', 'base-default'] }), false);
  });

  it('filterSurface excludes chart tokens', () => {
    assert.equal(filterSurface('base')({ path: ['base', 'fill', 'a'] }), true);
    assert.equal(filterSurface('base')({ path: ['base', 'chart', 'x', '01', 'default'] }), false);
    assert.equal(filterSurface('base')({ path: ['raised', 'fill', 'a'] }), false);
  });

  it('filterSurface excludes merged-in color primitives sharing the surface key', () => {
    // The `brand` color scope must NOT leak into the `brand` surface; it is
    // merged in only so references resolve.
    assert.equal(filterSurface('brand')({ path: ['brand', 'fill', 'loud-default'] }), true);
    assert.equal(filterSurface('brand')({ path: ['brand', 'color', 'green', '500'] }), false);
  });

  it('filterSurfaceChart matches only chart tokens on the surface', () => {
    assert.equal(filterSurfaceChart('base')({ path: ['base', 'chart', 'x', '01', 'default'] }), true);
    assert.equal(filterSurfaceChart('base')({ path: ['base', 'fill', 'a'] }), false);
    assert.equal(filterSurfaceChart('raised')({ path: ['base', 'chart', 'x', '01', 'default'] }), false);
  });
});
